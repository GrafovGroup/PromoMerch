import type { ValidatedQuote } from "./quote-validation";

export type NotificationStatus = "pending" | "submitting" | "accepted" | "failed" | "unknown" | "not_configured";
export type QuoteSnapshot = Omit<ValidatedQuote, "items"> & {
  items: Array<ValidatedQuote["items"][number] & { name?: { en: string; fr: string } }>;
};

const labels = {
  en: {
    quote: "Quote request", reorder: "Reorder request", none: "Not specified", yes: "Yes", no: "No",
    flexible: "Flexible", total: "whole project", perItem: "per item",
    artwork: "Saved privately for review; not attached. Retrieve through the approved operator process using the quote reference.",
    noArtwork: "No artwork supplied",
    types: { general: "Help me choose", apparel: "Team apparel", events: "Event or campaign", kits: "Employee or client kits", gifts: "Corporate gifts", reorder: "Repeat order" },
    delivery: { single: "One address", multiple: "Multiple addresses", unsure: "To be decided" },
  },
  fr: {
    quote: "Demande de soumission", reorder: "Demande de nouvelle commande", none: "Non précisé", yes: "Oui", no: "Non",
    flexible: "Flexible", total: "pour tout le projet", perItem: "par article",
    artwork: "Conservé de façon privée pour examen; aucune pièce jointe. Utilisez le processus autorisé et la référence de la demande pour le récupérer.",
    noArtwork: "Aucun fichier graphique fourni",
    types: { general: "Conseils de sélection", apparel: "Vêtements d’équipe", events: "Événement ou campagne", kits: "Coffrets pour employés ou clients", gifts: "Cadeaux d’entreprise", reorder: "Nouvelle commande identique" },
    delivery: { single: "Une adresse", multiple: "Plusieurs adresses", unsure: "À déterminer" },
  },
};

export function formspreePayload(reference: string, data: QuoteSnapshot, hasArtwork: boolean) {
  const t = labels[data.locale];
  const kind = data.mode === "reorder" ? t.reorder : t.quote;
  return {
    subject: `PromoMerch — ${kind} — ${reference}`,
    name: data.name, email: data.email, company: data.company, phone: data.phone,
    message: data.description || `${kind} — ${reference}`,
    reference, language: data.locale === "fr" ? "fr-CA" : "en-CA", request_type: kind,
    project_type: t.types[data.projectType as keyof typeof t.types] ?? t.types.general,
    products: data.items.map(line => `${line.quantity} × ${line.name?.[data.locale] ?? line.id} [${line.id}]`).join("\n") || t.none,
    approximate_quantity: data.quantity ?? t.none, delivery_postal_code: data.postalCode || t.none,
    requested_delivery_date: data.flexibleDate ? t.flexible : data.deliveryDate,
    budget: data.budget === null ? t.none : `${data.budget.toFixed(2)} CAD — ${data.budgetType === "per_item" ? t.perItem : t.total}`,
    previous_reference: data.reorderReference || t.none, kit_recipients: data.kitRecipients ?? t.none,
    delivery_plan: t.delivery[data.deliveryPlan], contact_consent: t.yes,
    marketing_consent: data.marketingConsent ? t.yes : t.no,
    artwork: hasArtwork ? t.artwork : t.noArtwork,
  };
}

export async function sendToFormspree(
  endpoint: string, payload: ReturnType<typeof formspreePayload>, fetcher: typeof fetch = fetch,
): Promise<"accepted" | "failed" | "unknown"> {
  // No redirects: quote details may only go to the configured Formspree form.
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) return "failed";
  try {
    const response = await fetcher(endpoint, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      // Workers supports manual/follow, but rejects redirect: "error" before sending.
      body: JSON.stringify(payload), redirect: "manual", signal: AbortSignal.timeout(10000),
    });
    if (response.status >= 400 && response.status < 500) return "failed";
    if (!response.ok) {
      console.warn("quote_notification_unconfirmed", { kind: "http", status: response.status });
      return "unknown";
    }
    const result: unknown = await response.json();
    if (result && typeof result === "object" && "ok" in result && result.ok === true) return "accepted";
    console.warn("quote_notification_unconfirmed", { kind: "acknowledgement", status: response.status });
    return "unknown";
  } catch (error) {
    console.warn("quote_notification_unconfirmed", { kind: "transport", error: error instanceof Error ? error.name : "UnknownError" });
    // A timeout or broken acknowledgement may occur after acceptance. Do not
    // automatically resend without reconciling in Formspree by quote reference.
    return "unknown";
  }
}

export async function notifySavedQuote(
  database: D1Database, endpoint: string | undefined, reference: string,
  data: QuoteSnapshot, hasArtwork: boolean, fetcher: typeof fetch = fetch,
): Promise<NotificationStatus> {
  if (!endpoint) return "not_configured";
  try {
    // One atomic claim across concurrent requests. The saved quote is the
    // durable notification record; accepted/uncertain attempts never auto-send again.
    const claim = await database.prepare(
      "UPDATE quote_requests SET notification_status = 'submitting' WHERE reference = ?1 " +
      "AND notification_status IN ('pending', 'failed', 'not_configured') RETURNING reference"
    ).bind(reference).first<{ reference: string }>();
    if (!claim) {
      const current = await database.prepare("SELECT notification_status FROM quote_requests WHERE reference = ?1")
        .bind(reference).first<{ notification_status: NotificationStatus }>();
      return current?.notification_status ?? "unknown";
    }
    const status = await sendToFormspree(endpoint, formspreePayload(reference, data, hasArtwork), fetcher);
    await database.prepare("UPDATE quote_requests SET notification_status = ?1 WHERE reference = ?2 AND notification_status = 'submitting'")
      .bind(status, reference).run();
    return status;
  } catch {
    console.warn("quote_notification_unconfirmed", { kind: "notification_state" });
    // Persistence remains successful even if notification processing fails.
    return "unknown";
  }
}
