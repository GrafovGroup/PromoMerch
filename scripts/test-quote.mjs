import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import {
  inspectArtwork, MAX_ARTWORK_BYTES, todayInToronto, validateQuote,
} from "../lib/quote-validation.ts";

const now = Date.parse("2026-11-12T03:00:00.000Z");
const products = new Set(["everyday-tees", "desk-kits"]);
const base = {
  locale: "en", mode: "quote", name: "Test Buyer", email: "test@example.invalid",
  company: "", phone: "", postalCode: "", description: "A new team welcome project.",
  items: [], quantity: "", flexibleDate: true, deliveryDate: "",
  budget: "", budgetType: "total", reorderReference: "", kitRecipients: "",
  deliveryPlan: "unsure", marketingConsent: false, contactConsent: true,
  website: "", startedAt: now - 5000,
  idempotencyKey: "b07899ed-f82f-42b4-924f-dfbf7c3a6d89",
};
const check = (patch = {}, options = {}) => validateQuote({ ...base, ...patch }, products, { now, ...options });
const rejects = (patch, field) => {
  const result = check(patch);
  assert.equal(result.ok, false);
  assert.ok(result.errors[field], field + " should identify the invalid field");
};

test("accepts a brief without product selections and normalizes contact data", () => {
  const result = check({ name: "  Test Buyer ", email: " TEST@example.invalid ", postalCode: "h2x1y4" });
  assert.equal(result.ok, true);
  assert.equal(result.data.email, "test@example.invalid");
  assert.equal(result.data.postalCode, "H2X 1Y4");
  assert.equal(result.data.name, "Test Buyer");
  assert.equal(result.data.budget, null);
  assert.equal(result.data.deliveryDate, null);
  assert.equal(result.data.marketingConsent, false);
});

test("requires a useful brief, known items, or a valid reorder reference", () => {
  rejects({ description: "Hi" }, "description");
  assert.equal(check({ description: "", items: [{ id: "everyday-tees", quantity: 20 }] }).ok, true);
  rejects({ items: [{ id: "fabricated-product", quantity: 20 }] }, "items");
  rejects({ mode: "reorder", description: "" }, "reorderReference");
  assert.equal(check({ mode: "reorder", description: "", reorderReference: "PM-ABC123" }).ok, true);
});

test("rejects malformed personal fields and invalid Canadian postal codes", () => {
  for (const name of ["X", "A".repeat(121), "Buyer\nInjected"]) rejects({ name }, "name");
  for (const email of ["missing-at", "a@b", "a @example.invalid"]) rejects({ email }, "email");
  for (const postalCode of ["12345", "D1A 1A1", "A1D 1A1"]) rejects({ postalCode }, "postalCode");
  rejects({ phone: "123" }, "phone");
  assert.equal(check({ phone: "+1 (416) 555-0100", postalCode: "" }).ok, true);
});

test("enforces integer quantity bounds and combines duplicate items safely", () => {
  for (const quantity of [0, -1, 1.5, 100001, "one", {}, true]) {
    rejects({ quantity }, "quantity");
    rejects({ items: [{ id: "everyday-tees", quantity }] }, "items");
  }
  assert.equal(check({ quantity: 100000 }).ok, true);
  const merged = check({ items: [{ id: "everyday-tees", quantity: 10 }, { id: "everyday-tees", quantity: 20 }] });
  assert.equal(merged.ok, true);
  assert.deepEqual(merged.data.items, [{ id: "everyday-tees", quantity: 30 }]);
  rejects({ items: [{ id: "everyday-tees", quantity: 100000 }, { id: "everyday-tees", quantity: 1 }] }, "items");
  rejects({ items: Array.from({ length: 51 }, () => ({ id: "everyday-tees", quantity: 1 })) }, "items");
  rejects({ items: "everyday-tees" }, "items");
});

test("uses Toronto calendar dates rather than UTC midnight or parsed local timestamps", () => {
  assert.equal(todayInToronto(now), "2026-11-11");
  assert.equal(check({ flexibleDate: false, deliveryDate: "2026-11-11" }).ok, true);
  rejects({ flexibleDate: false, deliveryDate: "2026-11-10" }, "deliveryDate");
  rejects({ flexibleDate: false, deliveryDate: "2027-02-30" }, "deliveryDate");
  rejects({ flexibleDate: false, deliveryDate: "2027-01-01T12:00:00Z" }, "deliveryDate");
  rejects({ flexibleDate: false, deliveryDate: "" }, "deliveryDate");
  const flexible = check({ flexibleDate: true, deliveryDate: "2020-01-01" });
  assert.equal(flexible.ok, true);
  assert.equal(flexible.data.deliveryDate, null);
});

test("accepts optional CAD budgets and requires an explicit budget basis", () => {
  for (const budget of [-20, 0, "no", Infinity, 10000001, true]) rejects({ budget }, "budget");
  rejects({ budget: 25, budgetType: "" }, "budgetType");
  const perItem = check({ budget: "25.50", budgetType: "per_item" });
  assert.equal(perItem.ok, true);
  assert.equal(perItem.data.budget, 25.5);
  assert.equal(perItem.data.budgetType, "per_item");
});

test("rejects absent consent, honeypots, invalid request keys and timing failures", () => {
  rejects({ contactConsent: false }, "contactConsent");
  rejects({ website: "https://spam.invalid" }, "form");
  rejects({ idempotencyKey: "predictable-key" }, "form");
  rejects({ startedAt: now - 100 }, "form");
  rejects({ startedAt: now + 1000 }, "form");
  rejects({ startedAt: now - 8 * 86400000 }, "form");
  assert.equal(check({ startedAt: now }, { enforceTiming: false }).ok, true);
  assert.equal(check({ marketingConsent: "true" }).data.marketingConsent, false);
});

test("returns French validation copy for a French form", () => {
  const result = check({ locale: "fr", email: "bad" });
  assert.equal(result.ok, false);
  assert.equal(result.errors.email, "Indiquez une adresse courriel valide.");
});

const png = new Uint8Array(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6wYQAAAAASUVORK5CYII=", "base64"));
const jpg = new Uint8Array([255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 255, 217]);
const pdf = new TextEncoder().encode("%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF");

test("accepts matching PNG, JPG and PDF signatures while ignoring claimed MIME", () => {
  assert.deepEqual(inspectArtwork(png, "logo.PNG"), { ok: true, extension: "png", contentType: "image/png" });
  assert.deepEqual(inspectArtwork(jpg, "logo.jpeg"), { ok: true, extension: "jpg", contentType: "image/jpeg" });
  assert.deepEqual(inspectArtwork(pdf, "logo.pdf"), { ok: true, extension: "pdf", contentType: "application/pdf" });
});

test("rejects renamed files, truncated images, active PDFs and oversized uploads", () => {
  for (const [bytes, name] of [
    [png, "logo.pdf"], [pdf, "logo.png"], [new TextEncoder().encode("<svg></svg>"), "logo.png"],
    [png.slice(0, 20), "logo.png"], [jpg.slice(0, -2), "logo.jpg"],
    [new TextEncoder().encode("%PDF-1.4 no ending"), "logo.pdf"],
  ]) assert.equal(inspectArtwork(bytes, name).ok, false, name);
  const active = new TextEncoder().encode("%PDF-1.4\n<< /OpenAction 1 0 R /JavaScript (alert) >>\n%%EOF");
  assert.deepEqual(inspectArtwork(active, "logo.pdf"), { ok: false, reason: "active_pdf" });
  assert.deepEqual(inspectArtwork(new Uint8Array(), "logo.png"), { ok: false, reason: "size" });
  assert.deepEqual(inspectArtwork(new Uint8Array(MAX_ARTWORK_BYTES + 1), "logo.png"), { ok: false, reason: "size" });
});


// Run the real route handler with private in-memory provider doubles. These
// regressions exercise acknowledgement failures and body admission, not deployed
// D1/R2 connectivity (which is verified separately by the integration workflow).
const routeSource = readFileSync(new URL("../app/api/quotes/route.ts", import.meta.url), "utf8");
const routeCode = ts.transpileModule(routeSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function routeHarness(insertMode = "normal") {
  const state = { records: new Map(), files: new Map(), deleted: [], rates: new Map(), reads: 0, rateCalls: 0 };
  const database = {
    prepare(statement) {
      return {
        bind(...values) {
          return {
            async first() {
              assert.match(statement, /^INSERT INTO quote_rate_limits/);
              state.rateCalls++;
              const [key, windowStart] = values;
              const previous = state.rates.get(key);
              const count = previous?.windowStart === windowStart ? previous.count + 1 : 1;
              state.rates.set(key, { windowStart, count });
              return { count };
            },
            async run() { return { success: true }; },
          };
        },
      };
    },
  };
  const db = {
    select() {
      return { from() { return { where(condition) { return { async limit() {
        state.reads++;
        if (insertMode === "unresolved" && state.reads > 1) throw new Error("Read acknowledgement unavailable");
        const record = state.records.get(condition.value);
        return record ? [record] : [];
      } }; } }; } };
    },
    insert() {
      return { async values(record) {
        if (insertMode === "unresolved" || insertMode === "empty_after_insert") throw new Error("Commit outcome unknown");
        if (insertMode === "race_same" || insertMode === "race_conflict") {
          state.records.set(record.idempotencyKey, {
            ...record, id: "another-request", reference: "PM-AABBCCDDEEFF",
            artworkKey: "quarantine/quotes/another-request/artwork.png",
            payloadHash: insertMode === "race_conflict" ? "another-payload" : record.payloadHash,
          });
          throw new Error("Concurrent insert");
        }
        state.records.set(record.idempotencyKey, record);
        if (insertMode === "commit_then_throw") throw new Error("Commit response unavailable");
      } };
    },
  };
  const modules = {
    "cloudflare:workers": { env: {
      DB: database,
      BUCKET: {
        async put(key, bytes) { state.files.set(key, bytes); },
        async delete(key) { state.deleted.push(key); state.files.delete(key); },
      },
    } },
    "drizzle-orm": { eq: (column, value) => ({ column, value }) },
    "../../../db": { getDb: () => db },
    "../../../db/schema": { quoteRequests: new Proxy({}, { get: (_, key) => String(key) }) },
    "../../../lib/catalog": { products: [{ id: "everyday-tees", name: { en: "Everyday tees", fr: "T-shirts" } }] },
    "../../../lib/quote-validation": { inspectArtwork, validateQuote },
  };
  const exports = {};
  const routeModule = { exports };
  new Function("require", "module", "exports", routeCode)((name) => {
    assert.ok(Object.hasOwn(modules, name), "Unexpected route import: " + name);
    return modules[name];
  }, routeModule, exports);
  return { state, POST: routeModule.exports.POST };
}

function apiRequest(payload, { artwork = false, headers = {} } = {}) {
  const body = new FormData();
  body.set("payload", JSON.stringify(payload));
  if (artwork) body.set("artwork", new File([png], "logo.png", { type: "image/png" }));
  return new Request("https://promomerch.example/api/quotes", {
    method: "POST", headers: { origin: "https://promomerch.example", ...headers }, body,
  });
}
const currentPayload = () => ({ ...base, startedAt: Date.now() - 5000 });

test("keeps artwork owned by a quote committed before an acknowledgement failure", async () => {
  const { POST, state } = routeHarness("commit_then_throw");
  const response = await POST(apiRequest(currentPayload(), { artwork: true }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).replayed, true);
  const record = [...state.records.values()][0];
  assert.ok(state.files.has(record.artworkKey));
  assert.equal(state.deleted.length, 0);
});

test("removes only this attempt's orphan when a concurrent request owns another file", async () => {
  for (const mode of ["race_same", "race_conflict"]) {
    const { POST, state } = routeHarness(mode);
    const response = await POST(apiRequest(currentPayload(), { artwork: true }));
    assert.equal(response.status, mode === "race_same" ? 200 : 409);
    const record = [...state.records.values()][0];
    assert.equal(state.deleted.length, 1);
    assert.notEqual(state.deleted[0], record.artworkKey);
    assert.equal(state.files.size, 0);
  }
});

test("retains private artwork when a failed insert cannot be reconciled", async () => {
  for (const mode of ["unresolved", "empty_after_insert"]) {
    const { POST, state } = routeHarness(mode);
    const response = await POST(apiRequest(currentPayload(), { artwork: true }));
    assert.equal(response.status, 503);
    assert.equal(state.deleted.length, 0);
    assert.equal(state.files.size, 1);
  }
});

test("bounds malformed requests before reading bodies and ignores forwarded source claims", async () => {
  const { POST, state } = routeHarness();
  for (let attempt = 1; attempt <= 61; attempt++) {
    const request = new Request("https://promomerch.example/api/quotes", {
      method: "POST", body: "{",
      headers: {
        origin: "https://promomerch.example", "content-type": "application/json",
        "x-forwarded-for": "198.51.100." + attempt,
        "x-real-ip": "203.0.113." + attempt,
        "cf-connecting-ip": "not-an-ip-" + attempt,
      },
    });
    const response = await POST(request);
    assert.equal(response.status, attempt <= 60 ? 400 : 429);
    assert.equal(request.bodyUsed, attempt <= 60);
  }
  assert.equal(state.rates.size, 1);
  assert.equal(state.records.size, 0);
});

test("permits bounded idempotent retries without consuming new-quote email limits", async () => {
  const { POST, state } = routeHarness();
  const payload = currentPayload();
  let reference;
  for (let attempt = 1; attempt <= 61; attempt++) {
    const request = apiRequest(payload, { headers: { "cf-connecting-ip": "203.0.113.10" } });
    const response = await POST(request);
    assert.equal(response.status, attempt === 1 ? 201 : attempt <= 60 ? 200 : 429);
    if (attempt <= 60) {
      const saved = await response.json();
      reference ??= saved.reference;
      assert.equal(saved.reference, reference);
    } else {
      assert.equal(request.bodyUsed, false);
    }
  }
  assert.equal(state.records.size, 1);
  assert.deepEqual([...state.rates.values()].map((entry) => entry.count).sort((a, b) => a - b), [1, 1, 61]);
});


