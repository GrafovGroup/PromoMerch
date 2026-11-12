import { headers } from "next/headers";
import { Header, Footer } from "./components/SiteShell";
import { route, t } from "../lib/site";
export default async function NotFound() {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-promomerch-locale") === "fr" ? "fr" : "en";
  return <><Header locale={locale} alternatePath={locale === "fr" ? "/en/" : "/fr/"} /><main id="main-content" className="container not-found"><p className="eyebrow">404 · {t(locale, "A LITTLE OFF BRAND", "UN PETIT DÉTOUR")}</p><h1>{t(locale, "This page went off the shelf.", "Cette page est introuvable.")}</h1><p>{t(locale, "Let’s get you back to something worth keeping.", "Retournons à des idées qui méritent d’être gardées.")}</p><a className="button button-primary" href={route(locale, "products")}>{t(locale, "EXPLORE PRODUCTS", "DÉCOUVRIR LES ARTICLES")}</a><a className="text-link" href={route(locale, "home")}>{t(locale, "Back to the homepage", "Retour à l’accueil")}</a></main><Footer locale={locale} /></>;
}
