export type Locale = "en" | "fr";
export const site = {
  name: "PromoMerch",
  origin: "https://promomerch.dimagrafov.chatgpt.site",
  futureDomain: "https://promomerch.ca",
  phone: "(833) 696-9996",
  phoneHref: "tel:+18336969996",
  email: "info@promomerch.ca",
  publicLaunch: false,
};
export const routes = {
  home: {en:"",fr:""},
  products: {en:"products",fr:"produits"},
  quote: {en:"quote",fr:"soumission"},
  contact: {en:"contact",fr:"contact"},
  reorder: {en:"reorder",fr:"commander-a-nouveau"},
  services: {en:"services",fr:"services"},
  industries: {en:"industries",fr:"secteurs"},
  coverage: {en:"coverage",fr:"couverture"},
  resources: {en:"resources",fr:"ressources"},
  about: {en:"about",fr:"a-propos"},
  privacy: {en:"privacy",fr:"confidentialite"},
  terms: {en:"terms",fr:"conditions"},
  accessibility: {en:"accessibility",fr:"accessibilite"},
  events: {en:"event-merchandise",fr:"articles-evenements"},
  artwork: {en:"resources/artwork",fr:"ressources/fichiers-graphiques"},
  planning: {en:"resources/merch-planning",fr:"ressources/planifier-un-projet"},
} as const;
export function route(locale:Locale,key:keyof typeof routes) {
  const slug=routes[key][locale];
  return `/${locale}/${slug ? slug+"/" : ""}`;
}
export const t = (locale:Locale,en:string,fr:string) => locale === "fr" ? fr : en;

