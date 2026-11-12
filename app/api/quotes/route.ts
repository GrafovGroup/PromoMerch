import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { quoteRequests } from "../../../db/schema";
import { products } from "../../../lib/catalog";
import { inspectArtwork, validateQuote, type QuoteLocale } from "../../../lib/quote-validation";
import { notifySavedQuote, type NotificationStatus } from "../../../lib/quote-notification";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 6 * 1024 * 1024;
const MAX_PAYLOAD_CHARACTERS = 32000;
const MAX_SOURCE_ATTEMPTS_PER_HOUR = 60;
const messages = {
  en: {
    invalid: "Please review your request and try again.",
    origin: "Please submit this request from the PromoMerch website.",
    size: "The request is too large. Artwork must be 5 MB or smaller.",
    file: "Upload a PDF, PNG or JPG file of 5 MB or less. Other formats are not accepted.",
    active: "This PDF contains interactive or embedded content. Please export a flat PDF, PNG or JPG instead.",
    rate: "Several requests have been received recently. Please try again later, or call (833) 696-9996.",
    unavailable: "We could not save your request. Your details are still here. Please try again, or call (833) 696-9996.",
    conflict: "This request was changed after submission. Refresh the page before submitting the updated details.",
  },
  fr: {
    invalid: "Veuillez vérifier votre demande et réessayer.",
    origin: "Veuillez envoyer cette demande à partir du site PromoMerch.",
    size: "La demande est trop volumineuse. Le fichier graphique ne doit pas dépasser 5 Mo.",
    file: "Téléversez un fichier PDF, PNG ou JPG de 5 Mo ou moins. Les autres formats ne sont pas acceptés.",
    active: "Ce PDF contient du contenu interactif ou intégré. Exportez plutôt un PDF aplati, un PNG ou un JPG.",
    rate: "Plusieurs demandes ont été reçues récemment. Réessayez plus tard ou appelez le (833) 696-9996.",
    unavailable: "Votre demande n’a pas pu être enregistrée. Vos renseignements sont conservés dans le formulaire. Réessayez ou appelez le (833) 696-9996.",
    conflict: "Cette demande a été modifiée après son envoi. Actualisez la page avant de soumettre les nouveaux renseignements.",
  },
};

function reply(data: unknown, status: number, extraHeaders: Record<string, string> = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

async function readLimitedBody(request: Request): Promise<ArrayBuffer> {
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_BODY_BYTES)) throw new Error("body_size");
  if (!request.body) throw new Error("body_missing");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      length += next.value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("body_size");
      }
      chunks.push(next.value);
    }
  } finally {
    reader.releaseLock();
  }
  const output = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length; }
  return output.buffer;
}

async function sha256(value: string | Uint8Array): Promise<string> {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  const digest = await crypto.subtle.digest("SHA-256", bytes as BufferSource);
  return Array.from(new Uint8Array(digest), (part) => part.toString(16).padStart(2, "0")).join("");
}

function sourceIdentity(request: Request): string {
  // Workers supplies this header at ingress. The WHC entrypoint overwrites it
  // from WHC's verified REMOTE_ADDR mapping before dispatch. Never trust fallbacks.
  // The route adapter can reconstruct Request and lose request.cf metadata.
  const address = request.headers.get("cf-connecting-ip")?.trim();
  if (!address || address.length > 45) return "unknown-source";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(address)) {
    const parts = address.split(".").map(Number);
    if (parts.every((part) => part <= 255)) return parts.join(".");
  }
  if (/^[0-9a-f:.]+$/i.test(address) && address.includes(":")) {
    try { return new URL("https://[" + address + "]/").hostname.toLowerCase(); }
    catch { /* Malformed addresses share the bounded fallback bucket. */ }
  }
  return "unknown-source";
}

async function consumeLimit(database: D1Database, key: string, maximum: number, now: number): Promise<boolean> {
  const windowStart = Math.floor(now / 3600000) * 3600000;
  const row = await database.prepare(
    "INSERT INTO quote_rate_limits (key, window_start, count) VALUES (?1, ?2, 1) " +
    "ON CONFLICT(key) DO UPDATE SET window_start = excluded.window_start, " +
    "count = CASE WHEN quote_rate_limits.window_start = excluded.window_start " +
    "THEN quote_rate_limits.count + 1 ELSE 1 END RETURNING count"
  ).bind(key, windowStart).first<{ count: number }>();
  return Boolean(row && row.count <= maximum);
}

function success(reference: string, notificationStatus: NotificationStatus, replayed = false) {
  return reply({ ok: true, reference, status: "received", notificationStatus, replayed }, replayed ? 200 : 201);
}

export async function POST(request: Request) {
  let locale: QuoteLocale = request.headers.get("x-quote-locale") === "fr" ? "fr" : "en";
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return reply({ ok: false, code: "origin", message: messages[locale].origin }, 403);
  }
  if (!env.DB) return reply({ ok: false, code: "storage_unavailable", message: messages[locale].unavailable }, 503);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data") && !contentType.startsWith("application/json")) {
    return reply({ ok: false, code: "format", message: messages[locale].invalid }, 415);
  }

  const now = Date.now();
  const source = sourceIdentity(request);
  try {
    // Count every body-bearing attempt before buffering or parsing it, including
    // invalid payloads and idempotent retries. The larger allowance leaves room
    // for ordinary corrections/replays without giving them an unlimited bypass.
    const attemptKey = await sha256("quote-attempts-source:" + source);
    if (!await consumeLimit(env.DB, attemptKey, MAX_SOURCE_ATTEMPTS_PER_HOUR, now)) {
      return reply({ ok: false, code: "rate_limited", message: messages[locale].rate }, 429, { "Retry-After": "3600" });
    }
  } catch {
    return reply({ ok: false, code: "storage_unavailable", message: messages[locale].unavailable }, 503);
  }

  let input: unknown;
  let artwork: File | null = null;
  try {
    const body = await readLimitedBody(request);
    if (contentType.startsWith("application/json")) {
      if (body.byteLength > MAX_PAYLOAD_CHARACTERS * 4) throw new Error("body_size");
      input = JSON.parse(new TextDecoder().decode(body));
    } else {
      const form = await new Response(body, { headers: { "Content-Type": contentType } }).formData();
      if (form.getAll("payload").length !== 1 || form.getAll("artwork").length > 1 || Array.from(form.keys()).length > 3) throw new Error("invalid");
      const payload = form.get("payload");
      if (typeof payload !== "string" || payload.length > MAX_PAYLOAD_CHARACTERS) throw new Error("invalid");
      input = JSON.parse(payload);
      const attachment = form.get("artwork");
      if (attachment && typeof attachment !== "string" && attachment.size > 0) artwork = attachment;
      else if (typeof attachment === "string" && attachment) throw new Error("invalid");
    }
  } catch (error) {
    const size = error instanceof Error && error.message === "body_size";
    return reply({ ok: false, code: size ? "too_large" : "invalid", message: size ? messages[locale].size : messages[locale].invalid }, size ? 413 : 400);
  }

  if (input && typeof input === "object" && "locale" in input && input.locale === "fr") locale = "fr";
  const checked = validateQuote(input, new Set(products.map((product) => product.id)));
  if (!checked.ok) {
    return reply({ ok: false, code: "validation", message: messages[locale].invalid, errors: checked.errors }, 400);
  }
  const data = checked.data;
  const snapshot = {
    ...data,
    items: data.items.map((line) => ({ ...line, name: products.find((product) => product.id === line.id)?.name })),
  };
  const confirmSaved = async (reference: string, replayed = false) => success(reference,
    await notifySavedQuote(env.DB!, env.FORMSPREE_ENDPOINT, reference, snapshot, Boolean(artwork)), replayed);
  let fileBytes: Uint8Array | null = null;
  let fileInfo: { contentType: string; extension: string } | null = null;
  if (artwork) {
    if (!env.BUCKET) return reply({ ok: false, code: "upload_unavailable", message: messages[locale].unavailable }, 503);
    fileBytes = new Uint8Array(await artwork.arrayBuffer());
    const inspected = inspectArtwork(fileBytes, artwork.name);
    if (!inspected.ok) {
      const message = inspected.reason === "active_pdf" ? messages[locale].active : messages[locale].file;
      return reply({ ok: false, code: "artwork", message, errors: { artwork: message } }, inspected.reason === "size" ? 413 : 400);
    }
    fileInfo = inspected;
  }

  let storedKey: string | null = null;
  let insertAttempted = false;
  try {
    const db = getDb();
    const payloadHash = await sha256(JSON.stringify(data) + ":" + (fileBytes ? await sha256(fileBytes) : ""));
    const prior = await db.select({
      reference: quoteRequests.reference, payloadHash: quoteRequests.payloadHash,
    }).from(quoteRequests).where(eq(quoteRequests.idempotencyKey, data.idempotencyKey)).limit(1);
    if (prior.length) {
      return prior[0].payloadHash === payloadHash
        ? await confirmSaved(prior[0].reference, true)
        : reply({ ok: false, code: "idempotency_conflict", message: messages[locale].conflict }, 409);
    }

    const ipKey = await sha256("quote-ip:" + source);
    const emailKey = await sha256("quote-email:" + data.email);
    if (!await consumeLimit(env.DB, ipKey, 20, now) || !await consumeLimit(env.DB, emailKey, 6, now)) {
      return reply({ ok: false, code: "rate_limited", message: messages[locale].rate }, 429, { "Retry-After": "3600" });
    }
    // Only short-lived anti-abuse counters are removed here; quote retention is an owner policy.
    await env.DB.prepare("DELETE FROM quote_rate_limits WHERE window_start < ?1").bind(now - 172800000).run();

    const id = crypto.randomUUID();
    const reference = "PM-" + id.replace(/-/g, "").slice(0, 12).toUpperCase();
    if (artwork && fileBytes && fileInfo && env.BUCKET) {
      storedKey = "quarantine/quotes/" + id + "/artwork." + fileInfo.extension;
      await env.BUCKET.put(storedKey, fileBytes, {
        httpMetadata: { contentType: "application/octet-stream", contentDisposition: "attachment" },
        customMetadata: { reviewStatus: "unreviewed", detectedContentType: fileInfo.contentType },
      });
    }
    try {
      insertAttempted = true;
      await db.insert(quoteRequests).values({
        id, reference, idempotencyKey: data.idempotencyKey, payloadHash,
        locale: data.locale, mode: data.mode, name: data.name, email: data.email,
        company: data.company, phone: data.phone, payload: JSON.stringify(snapshot),
        artworkKey: storedKey,
        artworkName: artwork ? artwork.name.split(/[\\/]/).pop()?.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 160) || "artwork" : null,
        artworkContentType: fileInfo?.contentType ?? null,
        artworkBytes: artwork?.size ?? null,
        artworkReviewStatus: artwork ? "quarantined_unreviewed" : null,
        status: "received", notificationStatus: env.FORMSPREE_ENDPOINT ? "pending" : "not_configured",
        marketingConsent: data.marketingConsent, createdAt: new Date(now).toISOString(),
      });
    } catch (error) {
      // A competing retry may win, or this insert may commit before its response
      // fails. Reconcile ownership before removing an uploaded object.
      const concurrent = await db.select({
        reference: quoteRequests.reference, payloadHash: quoteRequests.payloadHash,
        artworkKey: quoteRequests.artworkKey,
      }).from(quoteRequests).where(eq(quoteRequests.idempotencyKey, data.idempotencyKey)).limit(1);
      // Only another committed row with this unique request key proves that our
      // distinct upload lost the race. An empty read is still an unknown outcome.
      if (storedKey && env.BUCKET && concurrent.length > 0 && concurrent[0].artworkKey !== storedKey) {
        await env.BUCKET.delete(storedKey).catch(() => undefined);
      }
      storedKey = null;
      if (concurrent.length) {
        return concurrent[0].payloadHash === payloadHash
          ? await confirmSaved(concurrent[0].reference, true)
          : reply({ ok: false, code: "idempotency_conflict", message: messages[locale].conflict }, 409);
      }
      throw error;
    }
    return await confirmSaved(reference);
  } catch {
    // If reconciliation itself fails after an insert attempt, the file may
    // belong to a committed quote. Retain it privately for later reconciliation.
    if (!insertAttempted && storedKey && env.BUCKET) await env.BUCKET.delete(storedKey).catch(() => undefined);
    // No customer payloads, filenames, credentials or provider internals are logged or returned.
    return reply({ ok: false, code: "storage_unavailable", message: messages[locale].unavailable }, 503);
  }
}

