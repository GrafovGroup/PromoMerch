"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { products } from "../../lib/catalog";
import {
  MAX_ARTWORK_BYTES, MAX_QUANTITY, MAX_QUOTE_LINES, todayInToronto, validateQuote,
  type QuoteFieldErrors, type QuoteLine, type QuoteLocale,
} from "../../lib/quote-validation";

const STORAGE_KEY = "promomerch-quote-v1";
const CHANGE_EVENT = "promomerch-quote-change";
const productIds = new Set(products.map((product) => product.id));

const copy = {
  en: {
    shortlist: "Your shortlist", shortlistIntro: "A starting point for your quote. Final products, decoration and availability are confirmed with you.",
    empty: "No products selected yet. Tell us what you have in mind and we’ll help you choose.",
    browse: "BROWSE PRODUCTS", clear: "CLEAR LIST", remove: "REMOVE", quantity: "Quantity",
    stale: "Some previously saved items could not be loaded. Please review your shortlist.",
    storage: "Your browser could not save this shortlist. You can still submit this request from this page.",
    contact: "Your details", contactNote: "Fields marked * are required.",
    name: "Full name *", company: "Organization", email: "Email *", phone: "Phone",
    postal: "Delivery postal code", postalHint: "Canadian postal code, if known.",
    project: "Your project", projectType: "What are you planning?",
    types: { general: "Help me choose", apparel: "Team apparel", events: "An event or campaign", kits: "Employee or client kits", gifts: "Corporate gifts", reorder: "A repeat order" },
    totalQuantity: "Approximate quantity", quantityHint: "Leave blank if you’re still deciding.",
    reference: "Previous order or quote reference *",
    flexible: "My timing is flexible", date: "Requested delivery date *",
    dateHint: "We’ll review feasibility before you approve an order.",
    budget: "Budget (CAD)", budgetType: "Budget basis",
    perItem: "Per item", total: "Whole project",
    budgetHint: "Optional. A budget helps us suggest suitable options.",
    recipients: "Number of kit recipients", deliveryPlan: "Delivery preference",
    deliveryOptions: { unsure: "To be decided", single: "One delivery address", multiple: "Multiple addresses" },
    deliveryHint: "Please don’t include recipient addresses here.",
    details: "Tell us about your project", detailsRequired: "Tell us about your project *",
    detailsHint: "Include your audience, occasion, preferred colours and anything that matters. Please leave out payment details and other sensitive information.",
    reorderDetails: "What would you like to repeat or change?",
    artwork: "Logo or artwork", artworkHint: "Optional. One PDF, PNG or JPG, up to 5 MB. Artwork is kept private for review.",
    artworkRemove: "REMOVE FILE",
    artworkError: "Choose a PDF, PNG or JPG of 5 MB or less.",
    consent: "You may contact me about this request. *",
    marketing: "I’d also like occasional PromoMerch ideas and offers. (Optional)",
    privacy: "Read our privacy notice.",
    submit: "REQUEST A QUOTE", reorderSubmit: "REQUEST A REORDER", submitting: "SENDING YOUR REQUEST…",
    requestNote: "Submitting a request does not place an order. Products, pricing, artwork and timing are confirmed before approval.",
    invalid: "Please check the highlighted fields.",
    unavailable: "We could not confirm your request was received. Your details are still here. Please retry, or call (833) 696-9996.",
    received: "Your request was received.",
    successNote: "Keep this reference for any follow-up. Your request is saved; an order has not been placed.",
    referenceLabel: "Your reference", again: "START ANOTHER REQUEST",
    help: "Questions? Call", pending: "Please wait while we save your request.",
  },
  fr: {
    shortlist: "Votre sélection", shortlistIntro: "Un point de départ pour votre soumission. Les produits, le marquage et la disponibilité seront confirmés avec vous.",
    empty: "Aucun produit sélectionné pour le moment. Décrivez votre idée et nous vous aiderons à choisir.",
    browse: "VOIR LES PRODUITS", clear: "VIDER LA LISTE", remove: "RETIRER", quantity: "Quantité",
    stale: "Certains articles enregistrés n’ont pas pu être chargés. Veuillez vérifier votre sélection.",
    storage: "Votre navigateur n’a pas pu enregistrer cette sélection. Vous pouvez tout de même envoyer votre demande à partir de cette page.",
    contact: "Vos coordonnées", contactNote: "Les champs marqués d’un * sont obligatoires.",
    name: "Nom complet *", company: "Organisation", email: "Courriel *", phone: "Téléphone",
    postal: "Code postal de livraison", postalHint: "Code postal canadien, si vous le connaissez.",
    project: "Votre projet", projectType: "Que planifiez-vous?",
    types: { general: "J’aimerais des conseils", apparel: "Des vêtements d’équipe", events: "Un événement ou une campagne", kits: "Des coffrets pour employés ou clients", gifts: "Des cadeaux d’entreprise", reorder: "Une nouvelle commande identique" },
    totalQuantity: "Quantité approximative", quantityHint: "Laissez ce champ vide si vous hésitez.",
    reference: "Ancienne référence de commande ou de soumission *",
    flexible: "Mon échéancier est flexible", date: "Date de livraison souhaitée *",
    dateHint: "La faisabilité sera vérifiée avant l’approbation de la commande.",
    budget: "Budget (CAD)", budgetType: "Type de budget",
    perItem: "Par article", total: "Pour tout le projet",
    budgetHint: "Facultatif. Votre budget nous aide à proposer des options adaptées.",
    recipients: "Nombre de destinataires des coffrets", deliveryPlan: "Préférence de livraison",
    deliveryOptions: { unsure: "À déterminer", single: "Une seule adresse", multiple: "Plusieurs adresses" },
    deliveryHint: "N’inscrivez pas les adresses des destinataires ici.",
    details: "Décrivez votre projet", detailsRequired: "Décrivez votre projet *",
    detailsHint: "Précisez le public, l’occasion, les couleurs et les détails importants. N’incluez pas de renseignements de paiement ni d’autres données sensibles.",
    reorderDetails: "Que souhaitez-vous reprendre ou modifier?",
    artwork: "Logo ou fichier graphique", artworkHint: "Facultatif. Un PDF, PNG ou JPG, de 5 Mo maximum. Le fichier est conservé de façon privée pour examen.",
    artworkRemove: "RETIRER LE FICHIER",
    artworkError: "Choisissez un PDF, PNG ou JPG de 5 Mo ou moins.",
    consent: "Vous pouvez me contacter au sujet de cette demande. *",
    marketing: "Je souhaite aussi recevoir des idées et des offres de PromoMerch à l’occasion. (Facultatif)",
    privacy: "Lire notre avis de confidentialité.",
    submit: "DEMANDER UNE SOUMISSION", reorderSubmit: "DEMANDER UNE NOUVELLE COMMANDE", submitting: "ENVOI DE VOTRE DEMANDE…",
    requestNote: "L’envoi d’une demande ne constitue pas une commande. Les produits, le prix, le visuel et l’échéancier sont confirmés avant votre approbation.",
    invalid: "Veuillez vérifier les champs indiqués.",
    unavailable: "Nous n’avons pas pu confirmer la réception de votre demande. Vos renseignements sont conservés dans le formulaire. Réessayez ou appelez le (833) 696-9996.",
    received: "Votre demande a été reçue.",
    successNote: "Conservez cette référence pour tout suivi. Votre demande est enregistrée; aucune commande n’a été passée.",
    referenceLabel: "Votre référence", again: "FAIRE UNE AUTRE DEMANDE",
    help: "Des questions? Appelez le", pending: "Veuillez patienter pendant l’enregistrement de votre demande.",
  },
};

function readShortlist(): { items: QuoteLine[]; changed: boolean } {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { items: [], changed: false };
  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed)) return { items: [], changed: true };
  const items: QuoteLine[] = [];
  let changed = parsed.length > MAX_QUOTE_LINES;
  for (const line of parsed.slice(0, MAX_QUOTE_LINES)) {
    if (!line || typeof line !== "object" || !productIds.has(line.id) || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > MAX_QUANTITY) {
      changed = true;
      continue;
    }
    if (items.some((item) => item.id === line.id)) { changed = true; continue; }
    items.push({ id: line.id, quantity: line.quantity });
  }
  return { items, changed };
}

export function QuoteExperience({ locale, mode = "quote" }: { locale: QuoteLocale; mode?: "quote" | "reorder" }) {
  const t = copy[locale];
  const [items, setItems] = useState<QuoteLine[]>([]);
  const [notice, setNotice] = useState<"stale" | "storage" | null>(null);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [projectType, setProjectType] = useState(mode === "reorder" ? "reorder" : "general");
  const [flexibleDate, setFlexibleDate] = useState(true);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const startedAt = useRef(0);
  const requestIdentity = useRef({ fingerprint: "", key: "" });
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const artworkInputRef = useRef<HTMLInputElement>(null);
  const isKit = projectType === "kits" || items.some((line) => products.find((product) => product.id === line.id)?.category === "kits");
  const catalogueHref = locale === "fr" ? "/fr/produits/" : "/en/products/";
  const privacyHref = locale === "fr" ? "/fr/confidentialite/" : "/en/privacy/";

  useEffect(() => {
    startedAt.current = Date.now();
    const load = () => {
      try {
        const saved = readShortlist();
        setItems(saved.items);
        if (saved.changed) setNotice("stale");
      } catch { setNotice("storage"); }
    };
    load();
    window.addEventListener(CHANGE_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(CHANGE_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  useEffect(() => {
    if (formError) errorRef.current?.focus();
  }, [formError, errors]);

  useEffect(() => {
    if (reference) successRef.current?.focus();
  }, [reference]);

  function saveItems(next: QuoteLine[]) {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch { setNotice("storage"); }
  }

  function clearFieldError(field: string) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function fieldProps(field: string, hint?: string) {
    return {
      id: "quote-" + field,
      name: field,
      className: "input",
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": [hint, errors[field] ? "quote-error-" + field : null].filter(Boolean).join(" ") || undefined,
      onChange: () => clearFieldError(field),
    };
  }

  function fieldError(field: string) {
    return errors[field] ? <p id={"quote-error-" + field} className="form-error">{errors[field]}</p> : null;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError("");
    setErrors({});
    const form = new FormData(event.currentTarget);
    const raw = {
      locale, mode, name: form.get("name"), company: form.get("company"), email: form.get("email"),
      phone: form.get("phone"), postalCode: form.get("postalCode"), quantity: form.get("quantity"),
      projectType, items, flexibleDate, deliveryDate: form.get("deliveryDate"),
      budget: form.get("budget"), budgetType: form.get("budgetType"),
      reorderReference: form.get("reorderReference"), description: form.get("description"),
      kitRecipients: form.get("kitRecipients"), deliveryPlan: form.get("deliveryPlan"),
      contactConsent: form.get("contactConsent") === "on", marketingConsent: form.get("marketingConsent") === "on",
      website: form.get("website"), startedAt: startedAt.current,
    };
    const fingerprint = JSON.stringify(raw) + "|" + (artwork ? [artwork.name, artwork.size, artwork.lastModified].join(":") : "");
    if (requestIdentity.current.fingerprint !== fingerprint) {
      requestIdentity.current = { fingerprint, key: crypto.randomUUID() };
    }
    const payload = { ...raw, idempotencyKey: requestIdentity.current.key };
    const result = validateQuote(payload, productIds, { enforceTiming: false });
    if (!result.ok) {
      setErrors(result.errors);
      setFormError(t.invalid);
      return;
    }
    if (artwork && (artwork.size === 0 || artwork.size > MAX_ARTWORK_BYTES || !/\.(pdf|png|jpe?g)$/i.test(artwork.name))) {
      setErrors({ artwork: t.artworkError });
      setFormError(t.invalid);
      return;
    }
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));
    if (artwork) body.set("artwork", artwork);
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST", headers: { "x-quote-locale": locale }, body, signal: controller.signal,
      });
      const saved: unknown = await response.json();
      if (!saved || typeof saved !== "object") throw new Error("unconfirmed");
      const value = saved as { ok?: boolean; reference?: string; message?: string; errors?: QuoteFieldErrors };
      if (response.ok && value.ok === true && typeof value.reference === "string" && /^PM-[A-F0-9]{12}$/.test(value.reference)) {
        setReference(value.reference);
        saveItems([]);
        setArtwork(null);
      } else {
        setErrors(value.errors && typeof value.errors === "object" ? value.errors : {});
        setFormError(typeof value.message === "string" ? value.message : t.unavailable);
      }
    } catch { setFormError(t.unavailable); }
    finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  function startAgain() {
    setReference("");
    setErrors({});
    setFormError("");
    setArtwork(null);
    setFlexibleDate(true);
    setProjectType(mode === "reorder" ? "reorder" : "general");
    startedAt.current = Date.now();
    requestIdentity.current = { fingerprint: "", key: "" };
  }

  if (reference) {
    return <div className="quote-panel form-success" role="status" ref={successRef} tabIndex={-1}>
      <h2>{t.received}</h2>
      <p>{t.successNote}</p>
      <p>{t.referenceLabel}: <strong>{reference}</strong></p>
      <p className="form-note">{t.help} <a href="tel:+18336969996">(833) 696-9996</a>.</p>
      <button type="button" className="button button-primary" onClick={startAgain}>{t.again}</button>
    </div>;
  }

  return <div className="quote-experience">
    <section className="quote-panel" aria-labelledby="quote-shortlist-title">
      <h2 id="quote-shortlist-title">{t.shortlist}</h2>
      <p className="form-note">{items.length ? t.shortlistIntro : t.empty}</p>
      {notice ? <p className="form-note" role="status">{t[notice]}</p> : null}
      {items.length ? <div className="quote-items">
        {items.map((line) => {
          const product = products.find((entry) => entry.id === line.id);
          return <div className="quote-line" key={line.id}>
            <div><strong>{product?.name[locale] ?? line.id}</strong><p className="form-note">{product?.summary[locale]}</p></div>
            <div className="field">
              <label htmlFor={"quantity-" + line.id}>{t.quantity}</label>
              <input className="input" id={"quantity-" + line.id} type="number" min="1" max={MAX_QUANTITY} step="1" inputMode="numeric" value={line.quantity} disabled={submitting}
                onChange={(event) => {
                  const value = Number(event.currentTarget.value);
                  if (Number.isInteger(value) && value >= 1 && value <= MAX_QUANTITY) saveItems(items.map((entry) => entry.id === line.id ? { ...entry, quantity: value } : entry));
                  clearFieldError("items");
                }} />
            </div>
            <button type="button" className="button" disabled={submitting} aria-label={t.remove + " " + (product?.name[locale] ?? line.id)} onClick={() => { saveItems(items.filter((entry) => entry.id !== line.id)); clearFieldError("items"); }}>{t.remove}</button>
          </div>;
        })}
      </div> : null}
      {fieldError("items")}
      <div className="quote-list-actions">
        <a href={catalogueHref} className="button">{t.browse}</a>
        {items.length ? <button type="button" className="button" disabled={submitting} onClick={() => { saveItems([]); clearFieldError("items"); }}>{t.clear}</button> : null}
      </div>
    </section>

    <form onSubmit={submit} noValidate aria-busy={submitting} className="quote-panel">
      {formError ? <div className="form-error" role="alert" tabIndex={-1} ref={errorRef}>
        <p><strong>{formError}</strong></p>
        {Object.keys(errors).length ? <ul>{Object.entries(errors).map(([field, message]) => <li key={field}>
          {field === "form" || field === "items" ? message : <a href={"#quote-" + field}>{message}</a>}
        </li>)}</ul> : null}
      </div> : null}
      <fieldset disabled={submitting} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <legend><h2>{t.contact}</h2></legend>
        <p className="form-note">{t.contactNote}</p>
        <div className="form-grid">
          <div className="field"><label htmlFor="quote-name">{t.name}</label><input {...fieldProps("name")} autoComplete="name" maxLength={120} required />{fieldError("name")}</div>
          <div className="field"><label htmlFor="quote-company">{t.company}</label><input {...fieldProps("company")} autoComplete="organization" maxLength={160} />{fieldError("company")}</div>
          <div className="field"><label htmlFor="quote-email">{t.email}</label><input {...fieldProps("email")} type="email" autoComplete="email" maxLength={254} required />{fieldError("email")}</div>
          <div className="field"><label htmlFor="quote-phone">{t.phone}</label><input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={40} />{fieldError("phone")}</div>
          <div className="field"><label htmlFor="quote-postalCode">{t.postal}</label><input {...fieldProps("postalCode", "postal-hint")} autoComplete="postal-code" maxLength={7} /><p id="postal-hint" className="form-note">{t.postalHint}</p>{fieldError("postalCode")}</div>
        </div>
      </fieldset>
      <fieldset disabled={submitting} style={{ border: 0, padding: 0, margin: "2rem 0 0", minWidth: 0 }}>
        <legend><h2>{t.project}</h2></legend>
        <div className="form-grid">
          {mode === "reorder" ? <div className="field field-wide"><label htmlFor="quote-reorderReference">{t.reference}</label><input {...fieldProps("reorderReference")} maxLength={100} required />{fieldError("reorderReference")}</div> : null}
          <div className="field"><label htmlFor="quote-projectType">{t.projectType}</label><select {...fieldProps("projectType")} value={projectType} onChange={(event) => setProjectType(event.currentTarget.value)}>
            {Object.entries(t.types).filter(([value]) => mode === "reorder" || value !== "reorder").map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select></div>
          <div className="field"><label htmlFor="quote-quantity">{t.totalQuantity}</label><input {...fieldProps("quantity", "quantity-hint")} type="number" min="1" max={MAX_QUANTITY} step="1" inputMode="numeric" /><p id="quantity-hint" className="form-note">{t.quantityHint}</p>{fieldError("quantity")}</div>
          <div className="field field-wide"><label className="checkbox-label" htmlFor="quote-flexibleDate"><input id="quote-flexibleDate" name="flexibleDate" type="checkbox" checked={flexibleDate} onChange={(event) => { setFlexibleDate(event.currentTarget.checked); clearFieldError("deliveryDate"); }} /> {t.flexible}</label></div>
          {!flexibleDate ? <div className="field field-wide"><label htmlFor="quote-deliveryDate">{t.date}</label><input {...fieldProps("deliveryDate", "date-hint")} type="date" min={todayInToronto()} required /><p id="date-hint" className="form-note">{t.dateHint}</p>{fieldError("deliveryDate")}</div> : null}
          <div className="field"><label htmlFor="quote-budget">{t.budget}</label><input {...fieldProps("budget", "budget-hint")} type="number" min="0.01" max="10000000" step="0.01" inputMode="decimal" /><p id="budget-hint" className="form-note">{t.budgetHint}</p>{fieldError("budget")}</div>
          <div className="field"><label htmlFor="quote-budgetType">{t.budgetType}</label><select {...fieldProps("budgetType")} defaultValue="total"><option value="total">{t.total}</option><option value="per_item">{t.perItem}</option></select>{fieldError("budgetType")}</div>
          {isKit ? <>
            <div className="field"><label htmlFor="quote-kitRecipients">{t.recipients}</label><input {...fieldProps("kitRecipients")} type="number" min="1" max={MAX_QUANTITY} step="1" inputMode="numeric" />{fieldError("kitRecipients")}</div>
            <div className="field"><label htmlFor="quote-deliveryPlan">{t.deliveryPlan}</label><select {...fieldProps("deliveryPlan", "delivery-hint")} defaultValue="unsure">{Object.entries(t.deliveryOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><p id="delivery-hint" className="form-note">{t.deliveryHint}</p></div>
          </> : null}
          <div className="field field-wide"><label htmlFor="quote-description">{mode === "reorder" ? t.reorderDetails : items.length ? t.details : t.detailsRequired}</label><textarea {...fieldProps("description", "description-hint")} rows={5} maxLength={5000} required={!items.length && mode !== "reorder"} /><p id="description-hint" className="form-note">{t.detailsHint}</p>{fieldError("description")}</div>
          <div className="field field-wide"><label htmlFor="quote-artwork">{t.artwork}</label><input {...fieldProps("artwork", "artwork-hint")} type="file" accept=".pdf,.png,.jpg,.jpeg" ref={artworkInputRef} onChange={(event) => { setArtwork(event.currentTarget.files?.[0] ?? null); clearFieldError("artwork"); }} /><p id="artwork-hint" className="form-note">{t.artworkHint}</p>{fieldError("artwork")}
            {artwork ? <button type="button" className="button" onClick={() => { setArtwork(null); if (artworkInputRef.current) artworkInputRef.current.value = ""; clearFieldError("artwork"); }}>{t.artworkRemove}</button> : null}
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor="quote-website">Website</label><input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="field field-wide">
            <label className="checkbox-label" htmlFor="quote-contactConsent"><input {...fieldProps("contactConsent")} className="" type="checkbox" required /> {t.consent}</label>
            {fieldError("contactConsent")}
            <label className="checkbox-label" htmlFor="quote-marketingConsent"><input id="quote-marketingConsent" name="marketingConsent" type="checkbox" /> {t.marketing}</label>
            <p className="form-note"><a href={privacyHref}>{t.privacy}</a></p>
          </div>
          <div className="field field-wide">
            <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? t.submitting : mode === "reorder" ? t.reorderSubmit : t.submit}</button>
            <p className="form-note" aria-live="polite">{submitting ? t.pending : t.requestNote}</p>
          </div>
        </div>
      </fieldset>
    </form>
  </div>;
}

export default QuoteExperience;

