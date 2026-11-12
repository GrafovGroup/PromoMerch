import { Check, Mail, Phone } from "lucide-react";
import { contentPages } from "../../lib/content";
import { portfolioProjects } from "../../lib/projects";
import { route, site, t, type Locale } from "../../lib/site";

export function ProjectGallery({ locale, detail = false }: { locale: Locale; detail?: boolean }) {
  return <div className={`portfolio-grid ${detail ? "portfolio-detail" : ""}`}>
    {portfolioProjects.map(project => <article className="portfolio-card" key={project.id}>
      <a className={`portfolio-image portfolio-image-${project.id}`} href={detail ? route(locale, "quote") : route(locale, "projects")} aria-label={detail ? t(locale, "Discuss a project like ", "Discuter d’un projet comme : ") + project.title[locale] : project.title[locale]}>
        <img src={project.image} srcSet={`${project.image.replace(".webp", "-640.webp")} 640w, ${project.image} ${project.width}w`} sizes="(max-width:760px) 90vw, 45vw" width={project.width} height={project.height} alt={project.alt[locale]} loading="lazy" />
      </a>
      <div className="portfolio-copy"><span className="eyebrow">{project.focus[locale]}</span><h3>{project.title[locale]}</h3><p>{project.description[locale]}</p>
        <a className="text-link" href={detail ? route(locale, "quote") : route(locale, "projects")}>{detail ? t(locale, "Discuss a similar project", "Discuter d’un projet semblable") : t(locale, "See the project details", "Voir les détails du projet")}</a>
      </div>
    </article>)}
  </div>;
}

export function ProjectShowcase({ locale }: { locale: Locale }) {
  return <section className="section portfolio-section"><div className="container">
    <div className="section-heading"><div><span className="eyebrow">{t(locale, "FROM OUR MERCH MATTERS PORTFOLIO", "DU PORTFOLIO MERCH MATTERS")}</span><h2>{t(locale, "See the finished details.", "Voyez les détails du résultat.")}</h2></div>
      <p>{t(locale, "A closer look at two projects from our Merch Matters work, from embroidered teamwear to coordinated accessories.", "Deux exemples de notre travail sous Merch Matters, des vêtements d’équipe brodés aux accessoires assortis.")}</p>
    </div><ProjectGallery locale={locale} />
  </div></section>;
}

export function ContentShortcuts({ locale, kind }: { locale: Locale; kind: "services" | "resources" }) {
  const cards = kind === "services" ? [
    { id: "decoration", title: t(locale, "Branding & decoration", "Marquage et personnalisation"), body: t(locale, "Compare printing, embroidery and other finishes around your product and artwork.", "Comparez l’impression, la broderie et les autres finitions selon l’article et le visuel."), action: t(locale, "EXPLORE DECORATION", "VOIR LA PERSONNALISATION") },
    { id: "kitting", title: t(locale, "Kits & fulfilment", "Coffrets et expédition"), body: t(locale, "Plan the contents, packaging and delivery approach for welcome kits and gifts.", "Planifiez le contenu, l’emballage et la livraison des coffrets d’accueil et cadeaux."), action: t(locale, "PLAN A KIT", "PLANIFIER UN COFFRET") },
    { id: "company-programs", title: t(locale, "Company programmes", "Programmes d’entreprise"), body: t(locale, "Organize recurring merchandise, approved selections and a practical reorder process.", "Organisez les besoins récurrents, les sélections approuvées et les nouvelles commandes."), action: t(locale, "EXPLORE PROGRAMMES", "VOIR LES PROGRAMMES") },
  ] : [
    { id: "planning", title: t(locale, "How do I choose the right merchandise?", "Comment choisir les bons articles?"), body: t(locale, "Work through audience, use, quantities and budget before building your shortlist.", "Précisez le public, l’usage, les quantités et le budget avant de faire votre sélection."), action: t(locale, "PLAN YOUR BRIEF", "PRÉPARER VOTRE PROJET") },
    { id: "artwork", title: t(locale, "Which logo files should I send?", "Quels fichiers de logo envoyer?"), body: t(locale, "Prepare artwork, colour references and the details to check on a proof.", "Préparez les fichiers, les références de couleurs et les points à vérifier sur l’épreuve."), action: t(locale, "PREPARE YOUR ARTWORK", "PRÉPARER VOS FICHIERS") },
    { id: "decoration", title: t(locale, "Printing, embroidery or engraving?", "Impression, broderie ou gravure?"), body: t(locale, "Consider the product surface, logo detail and intended result together.", "Examinez ensemble la surface, les détails du logo et le résultat souhaité."), action: t(locale, "COMPARE THE OPTIONS", "COMPARER LES OPTIONS") },
    { id: "coverage", title: t(locale, "How should I plan delivery?", "Comment planifier la livraison?"), body: t(locale, "Separate production and transit, and account for the destination and in-hand date.", "Distinguez production et transport selon la destination et la date de réception."), action: t(locale, "PLAN THE DELIVERY", "PLANIFIER LA LIVRAISON") },
  ];
  return <nav className={`discovery-grid discovery-${kind}`} aria-label={t(locale, kind === "services" ? "Explore merchandise services" : "Choose a merchandise guide", kind === "services" ? "Explorer les services" : "Choisir un guide")}>
    {cards.map(card => {
      const page = contentPages.find(p => p.id === card.id)!;
      return <a className="discovery-card" key={card.id} href={`/${locale}/${page.slug[locale]}/`}><h2>{card.title}</h2><p>{card.body}</p><span>{card.action}</span></a>;
    })}
  </nav>;
}

export function CustomEnquiry({ locale }: { locale: Locale }) {
  return <aside className="custom-enquiry"><div><span className="eyebrow">{t(locale, "HAVE SOMETHING ELSE IN MIND?", "VOUS AVEZ UNE AUTRE IDÉE?")}</span><h2>{t(locale, "Start with the idea. We’ll explore the options.", "Partez de l’idée. Explorons les options.")}</h2><p>{t(locale, "The collection is a starting point. Describe the item or share a reference, who it’s for, your approximate quantity, budget and required date. We’ll review what can be sourced and branded for your project.", "La collection est un point de départ. Décrivez l’article ou partagez une référence, le public, la quantité, le budget et la date souhaitée. Nous examinerons les possibilités d’approvisionnement et de personnalisation.")}</p></div><a className="button button-primary" href={route(locale, "quote")}>{t(locale, "TELL US WHAT YOU NEED", "DÉCRIVEZ VOTRE BESOIN")}</a></aside>;
}

export function QuoteBriefHelp({ locale }: { locale: Locale }) {
  return <aside className="brief-help" aria-label={t(locale, "What to include in your request", "Renseignements utiles pour votre demande")}>
    <div><h2>{t(locale, "Start with what you know.", "Commencez par ce que vous savez.")}</h2><p>{t(locale, "You can ask for help choosing. These four details give us a useful starting point:", "Vous pouvez demander conseil. Ces quatre renseignements nous donnent un bon point de départ :")}</p>
      <ul>{[t(locale, "Who it’s for", "Le public"), t(locale, "Approximate quantity", "La quantité approximative"), t(locale, "Budget", "Le budget"), t(locale, "In-hand date", "La date de réception")].map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul>
    </div><div className="brief-contact"><span>{t(locale, "Prefer to talk it through?", "Vous préférez en discuter?")}</span><a href={site.phoneHref}><Phone size={16}/>{site.phone}</a><a href={`mailto:${site.email}`}><Mail size={16}/>{site.email}</a></div>
  </aside>;
}
