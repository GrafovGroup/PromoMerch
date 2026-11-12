export type QuoteLocale = "en" | "fr";
export type QuoteLine = { id: string; quantity: number };
export type QuoteFieldErrors = Record<string, string>;

export const MAX_ARTWORK_BYTES = 5 * 1024 * 1024;
export const MAX_QUOTE_LINES = 50;
export const MAX_QUANTITY = 100000;

export type ValidatedQuote = {
  locale: QuoteLocale;
  mode: "quote" | "reorder";
  name: string;
  email: string;
  company: string;
  phone: string;
  postalCode: string;
  projectType: string;
  description: string;
  quantity: number | null;
  items: QuoteLine[];
  flexibleDate: boolean;
  deliveryDate: string | null;
  budget: number | null;
  budgetType: "per_item" | "total" | null;
  reorderReference: string;
  kitRecipients: number | null;
  deliveryPlan: "single" | "multiple" | "unsure";
  marketingConsent: boolean;
  contactConsent: true;
  idempotencyKey: string;
};

export type QuoteValidation =
  | { ok: true; data: ValidatedQuote }
  | { ok: false; errors: QuoteFieldErrors };

const strings = {
  en: {
    name: "Enter your name (up to 120 characters).",
    email: "Enter a valid email address.",
    company: "Use 160 characters or fewer for the organization name.",
    phone: "Enter a phone number using 7–20 digits, or leave it blank.",
    postalCode: "Enter a Canadian postal code, or leave it blank for now.",
    description: "Tell us a little about your project (at least 10 characters), or add products to your quote.",
    descriptionLong: "Keep project details within 5,000 characters.",
    items: "One of the selected items is no longer available. Remove it and choose another item.",
    quantity: "Use a whole-number quantity from 1 to 100,000, or leave it blank if unsure.",
    deliveryDate: "Choose today or a future delivery date, or select flexible timing.",
    budget: "Enter a positive budget in Canadian dollars, or leave it blank.",
    budgetType: "Choose whether your budget is per item or for the whole project.",
    reorderReference: "Add your previous order or quote reference (3–100 characters).",
    consent: "Please confirm we can contact you about this request.",
    invalid: "Please review the form and try again.",
    timing: "Please wait a moment, then submit again.",
    expired: "This form has been open for a while. Refresh the page and try again.",
  },
  fr: {
    name: "Indiquez votre nom (120 caractères maximum).",
    email: "Indiquez une adresse courriel valide.",
    company: "Le nom de l’organisation doit compter au plus 160 caractères.",
    phone: "Indiquez un numéro de téléphone de 7 à 20 chiffres, ou laissez ce champ vide.",
    postalCode: "Indiquez un code postal canadien, ou laissez ce champ vide pour le moment.",
    description: "Décrivez brièvement votre projet (au moins 10 caractères), ou ajoutez des produits à votre demande.",
    descriptionLong: "La description doit compter au plus 5 000 caractères.",
    items: "Un article sélectionné n’est plus disponible. Retirez-le et choisissez un autre article.",
    quantity: "Indiquez une quantité entière de 1 à 100 000, ou laissez ce champ vide si vous hésitez.",
    deliveryDate: "Choisissez la date d’aujourd’hui ou une date future, ou un échéancier flexible.",
    budget: "Indiquez un budget positif en dollars canadiens, ou laissez ce champ vide.",
    budgetType: "Précisez si votre budget est par article ou pour l’ensemble du projet.",
    reorderReference: "Indiquez votre ancienne référence de commande ou de soumission (3 à 100 caractères).",
    consent: "Veuillez confirmer que nous pouvons vous contacter au sujet de cette demande.",
    invalid: "Veuillez vérifier le formulaire et réessayer.",
    timing: "Veuillez patienter un instant, puis réessayer.",
    expired: "Ce formulaire est ouvert depuis un certain temps. Actualisez la page et réessayez.",
  },
};

export function todayInToronto(now: number = Date.now()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date(now));
  const part = (type: string) => parts.find((value) => value.type === type)?.value ?? "";
  return [part("year"), part("month"), part("day")].join("-");
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim() : "";
}

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function optionalWhole(value: unknown): number | null {
  if (value === "" || value === null || value === undefined) return null;
  if (typeof value !== "string" && typeof value !== "number") return NaN;
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 && number <= MAX_QUANTITY ? number : NaN;
}

export function validateQuote(
  input: unknown,
  validProductIds: ReadonlySet<string>,
  options: { now?: number; enforceTiming?: boolean } = {},
): QuoteValidation {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: { form: strings.en.invalid } };
  }
  const raw = input as Record<string, unknown>;
  const locale: QuoteLocale = raw.locale === "fr" ? "fr" : "en";
  const t = strings[locale];
  const errors: QuoteFieldErrors = {};
  const now = options.now ?? Date.now();
  const name = clean(raw.name), email = clean(raw.email).toLowerCase();
  const company = clean(raw.company), phone = clean(raw.phone);
  const postalCode = clean(raw.postalCode).toUpperCase().replace(/\s+/g, "");
  const description = clean(raw.description), mode = raw.mode === "reorder" ? "reorder" : "quote";
  const reorderReference = clean(raw.reorderReference);
  const quantity = optionalWhole(raw.quantity), kitRecipients = optionalWhole(raw.kitRecipients);
  const items: QuoteLine[] = [];
  if (name.length < 2 || name.length > 120 || /[\r\n]/.test(name)) errors.name = t.name;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t.email;
  if (company.length > 160 || /[\r\n]/.test(company)) errors.company = t.company;
  if (phone && (!/^[+\d\s().#-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 20 || phone.length > 40)) errors.phone = t.phone;
  if (postalCode && !/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/.test(postalCode)) errors.postalCode = t.postalCode;
  if (Number.isNaN(quantity)) errors.quantity = t.quantity;
  if (Number.isNaN(kitRecipients)) errors.kitRecipients = t.quantity;
  if (raw.items !== undefined && !Array.isArray(raw.items)) errors.items = t.items;
  if (Array.isArray(raw.items)) {
    if (raw.items.length > MAX_QUOTE_LINES) errors.items = t.items;
    for (const line of raw.items.slice(0, MAX_QUOTE_LINES)) {
      if (!line || typeof line !== "object" || Array.isArray(line)) { errors.items = t.items; continue; }
      const id = clean(line.id), amount = optionalWhole(line.quantity);
      if (!validProductIds.has(id)) { errors.items = t.items; continue; }
      if (amount === null || Number.isNaN(amount)) { errors.items = t.quantity; continue; }
      const existing = items.find((item) => item.id === id);
      if (existing) {
        existing.quantity += amount;
        if (existing.quantity > MAX_QUANTITY) errors.items = t.quantity;
      } else items.push({ id, quantity: amount });
    }
  }
  if (!items.length && description.length < 10 && !(mode === "reorder" && reorderReference.length >= 3)) errors.description = t.description;
  if (description.length > 5000) errors.description = t.descriptionLong;
  if (mode === "reorder" && (reorderReference.length < 3 || reorderReference.length > 100)) errors.reorderReference = t.reorderReference;
  if (reorderReference.length > 100) errors.reorderReference = t.reorderReference;
  const flexibleDate = raw.flexibleDate === true;
  const date = clean(raw.deliveryDate);
  if (!flexibleDate && (!validDate(date) || date < todayInToronto(now))) errors.deliveryDate = t.deliveryDate;
  let budget: number | null = null;
  if (raw.budget !== "" && raw.budget !== null && raw.budget !== undefined) {
    budget = typeof raw.budget === "number" || typeof raw.budget === "string" ? Number(raw.budget) : NaN;
    if (!Number.isFinite(budget) || budget <= 0 || budget > 10000000) errors.budget = t.budget;
  }
  const budgetType = raw.budgetType === "per_item" || raw.budgetType === "total" ? raw.budgetType : null;
  if (budget !== null && !budgetType) errors.budgetType = t.budgetType;
  if (raw.contactConsent !== true) errors.contactConsent = t.consent;
  if (clean(raw.website)) errors.form = t.invalid;
  const idempotencyKey = clean(raw.idempotencyKey);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) errors.form = t.invalid;
  if (options.enforceTiming !== false) {
    const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : NaN;
    if (!Number.isFinite(startedAt) || now - startedAt < 1500) errors.form = t.timing;
    if (Number.isFinite(startedAt) && now - startedAt > 7 * 24 * 60 * 60 * 1000) errors.form = t.expired;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  const allowedProjectTypes = new Set(["general", "apparel", "events", "kits", "gifts", "reorder"]);
  const projectType = clean(raw.projectType);
  return { ok: true, data: {
    locale, mode, name, email, company, phone,
    postalCode: postalCode ? postalCode.slice(0, 3) + " " + postalCode.slice(3) : "",
    projectType: allowedProjectTypes.has(projectType) ? projectType : "general",
    description, quantity, items, flexibleDate, deliveryDate: flexibleDate ? null : date,
    budget: budget === null ? null : Math.round(budget * 100) / 100,
    budgetType: budget === null ? null : budgetType,
    reorderReference, kitRecipients,
    deliveryPlan: raw.deliveryPlan === "single" || raw.deliveryPlan === "multiple" ? raw.deliveryPlan : "unsure",
    marketingConsent: raw.marketingConsent === true, contactConsent: true, idempotencyKey,
  } };
}

export type ArtworkInspection =
  | { ok: true; extension: "pdf" | "png" | "jpg"; contentType: string }
  | { ok: false; reason: "size" | "type" | "active_pdf" };

export function inspectArtwork(bytes: Uint8Array, fileName: string): ArtworkInspection {
  if (bytes.length === 0 || bytes.length > MAX_ARTWORK_BYTES) return { ok: false, reason: "size" };
  const extension = fileName.toLowerCase().split(".").pop();
  const begins = (signature: number[]) => signature.every((byte, index) => bytes[index] === byte);
  if (extension === "png" && begins([137, 80, 78, 71, 13, 10, 26, 10]) && bytes.length >= 33) {
    const tail = new TextDecoder("latin1").decode(bytes.slice(-12, -4));
    if (tail === "\0\0\0\0IEND") return { ok: true, extension: "png", contentType: "image/png" };
  }
  if ((extension === "jpg" || extension === "jpeg") && begins([255, 216, 255]) && bytes[bytes.length - 2] === 255 && bytes[bytes.length - 1] === 217) {
    return { ok: true, extension: "jpg", contentType: "image/jpeg" };
  }
  if (extension === "pdf" && begins([37, 80, 68, 70, 45])) {
    const text = new TextDecoder("latin1").decode(bytes);
    if (!text.slice(-1024).includes("%%EOF")) return { ok: false, reason: "type" };
    // Private quarantine only; this is not a malware-scanning or sanitizing guarantee.
    if (/\/(?:JavaScript|JS|OpenAction|AA|Launch|EmbeddedFiles?|RichMedia|XFA)\b/i.test(text)) return { ok: false, reason: "active_pdf" };
    return { ok: true, extension: "pdf", contentType: "application/pdf" };
  }
  return { ok: false, reason: "type" };
}

