import { categories, products, categoryPath, productPath, type Category, type Product } from "./catalog";
import { contentPages, type ContentPage } from "./content";
import { routes, route, t, type Locale } from "./site";

export type ResolvedPage = {
  locale: Locale;
  kind: "home" | "catalog" | "category" | "product" | "content" | "contact" | "quote" | "reorder";
  title: string;
  description: string;
  path: string;
  alternatePath: string;
  category?: Category;
  product?: Product;
  content?: ContentPage;
};

export function resolvePage(segments: string[]): ResolvedPage | null {
  const locale = segments[0];
  if (locale !== "en" && locale !== "fr") return null;
  const other: Locale = locale === "en" ? "fr" : "en";
  const slug = segments.slice(1).join("/");
  const common: Pick<ResolvedPage, "locale" | "path"> = { locale, path: `/${locale}/${slug ? slug + "/" : ""}` };
  if (!slug) return { ...common, kind: "home", alternatePath: route(other, "home"), title: t(locale, "Branded merchandise for Canadian teams", "Articles promotionnels pour les équipes canadiennes"), description: t(locale, "Branded apparel, useful promotional products and gift kits for Canadian teams, events and clients. Explore the ideas and request a tailored quote.", "Vêtements personnalisés, articles promotionnels utiles et coffrets pour vos équipes, événements et clients au Canada. Découvrez les idées et demandez une soumission.") };
  if (slug === routes.products[locale]) return { ...common, kind: "catalog", alternatePath: route(other, "products"), title: t(locale, "Explore merchandise ideas", "Découvrez les idées d’articles"), description: t(locale, "Browse 24 merchandise families across apparel, drinkware, bags, office, tech and gift kits. Build a shortlist for your quote.", "Explorez 24 familles d’articles : vêtements, bouteilles, sacs, papeterie, accessoires technologiques et coffrets. Préparez votre sélection pour une soumission.") };
  if (slug === routes.contact[locale]) return { ...common, kind: "contact", alternatePath: route(other, "contact"), title: t(locale, "Contact PromoMerch", "Contacter PromoMerch"), description: t(locale, "Tell us about your next merchandise project. Start a quote, call the team or send your brief by email.", "Parlez-nous de votre prochain projet. Demandez une soumission, appelez-nous ou envoyez votre demande par courriel.") };
  for (const kind of ["quote", "reorder"] as const) {
    if (slug === routes[kind][locale]) return { ...common, kind, alternatePath: route(other, kind), title: kind === "quote" ? t(locale, "Request a merchandise quote", "Demander une soumission") : t(locale, "Start a reorder enquiry", "Demander une nouvelle commande"), description: t(locale, "Share your merchandise shortlist, quantity, budget, delivery date and artwork. Your request starts a quote conversation, not a purchase.", "Transmettez votre sélection, vos quantités, votre budget, votre date et votre visuel. La demande ouvre une discussion; elle ne constitue pas un achat.") };
  }
  const category = categories.find((item) => item.slug[locale] === slug);
  if (category) return { ...common, kind: "category", category, alternatePath: categoryPath(category, other), title: category.name[locale], description: category.summary[locale] };
  const product = products.find((item) => `${routes.products[locale]}/${item.slug[locale]}` === slug);
  if (product) return { ...common, kind: "product", product, alternatePath: productPath(product, other), title: product.name[locale], description: product.summary[locale] };
  const content = contentPages.find((item) => item.slug[locale] === slug);
  if (content) return { ...common, kind: "content", content, alternatePath: `/${other}/${content.slug[other]}/`, title: content.title[locale], description: content.intro[locale] };
  return null;
}

export function publicPagePaths(): string[] {
  return (["en", "fr"] as const).flatMap((locale) => [
    ...(["home", "products", "contact", "quote", "reorder"] as const).map((key) => route(locale, key)),
    ...categories.map((item) => categoryPath(item, locale)),
    ...products.map((item) => productPath(item, locale)),
    ...contentPages.map((item) => `/${locale}/${item.slug[locale]}/`),
  ]);
}
