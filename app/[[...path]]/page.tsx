import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { categories, products, categoryPath, productPath } from "../../lib/catalog";
import { resolvePage, type ResolvedPage } from "../../lib/page-model";
import { site, route, t } from "../../lib/site";
import { Header, Footer } from "../components/SiteShell";
import { HomePage, CatalogPage, ProductPage, ContentView, ContactPage, QuotePage } from "../components/Pages";

type PageProps = { params: Promise<{ path?: string[] }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { path = [] } = await params;
  const page = resolvePage(path);
  if (!page) return { title: path[0] === "fr" ? "Page introuvable" : "Page not found", robots: { index: false, follow: false } };
  const enPath = page.locale === "en" ? page.path : page.alternatePath;
  const frPath = page.locale === "fr" ? page.path : page.alternatePath;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path, languages: { "en-CA": enPath, "fr-CA": frPath, "x-default": enPath } },
    robots: site.publicLaunch && !["quote", "reorder"].includes(page.kind) ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: `${page.title} | PromoMerch`, description: page.description, url: page.path,
      siteName: "PromoMerch", locale: page.locale === "fr" ? "fr_CA" : "en_CA", alternateLocale: page.locale === "fr" ? "en_CA" : "fr_CA", type: "website",
      images: [{ url: page.product?.image || page.category?.image || page.content?.image || "/images/hero-merch.webp", alt: t(page.locale, "Illustrative merchandise collection", "Collection illustrative d’articles promotionnels") }],
    },
    twitter: { card: "summary_large_image", title: `${page.title} | PromoMerch`, description: page.description, images: [page.product?.image || page.category?.image || page.content?.image || "/images/hero-merch.webp"] },
  };
}

function structuredData(page: ResolvedPage) {
  const url = site.origin + page.path;
  const common = { "@context": "https://schema.org" };
  if (page.kind === "home") return {
    ...common, "@graph": [
      { "@type": "Organization", "@id": `${site.origin}/#organization`, name: "PromoMerch", url: site.origin + route(page.locale, "home"), logo: `${site.origin}/brand/logo-en.svg`, telephone: "+1-833-696-9996", email: site.email, description: page.description },
      { "@type": "WebSite", "@id": `${site.origin}/#website`, name: "PromoMerch", url: site.origin, inLanguage: ["en-CA", "fr-CA"], publisher: { "@id": `${site.origin}/#organization` } },
    ],
  };
  const crumbs = [{ name: t(page.locale, "Home", "Accueil"), item: site.origin + route(page.locale, "home") }];
  if (page.kind === "product" || page.kind === "category") crumbs.push({ name: t(page.locale, "Products", "Produits"), item: site.origin + route(page.locale, "products") });
  if (page.product) {
    const category = categories.find((item) => item.id === page.product?.category);
    if (category) crumbs.push({ name: category.name[page.locale], item: site.origin + categoryPath(category, page.locale) });
  }
  crumbs.push({ name: page.title, item: url });
  const graph: Record<string, unknown>[] = [{ "@type": "BreadcrumbList", itemListElement: crumbs.map((item, i) => ({ "@type": "ListItem", position: i + 1, ...item })) }];
  if (page.kind === "catalog" || page.kind === "category") {
    const list = page.category ? products.filter((item) => item.category === page.category?.id) : products;
    graph.push({ "@type": "CollectionPage", name: page.title, description: page.description, url, inLanguage: page.locale === "fr" ? "fr-CA" : "en-CA", mainEntity: { "@type": "ItemList", numberOfItems: list.length, itemListElement: list.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name[page.locale], url: site.origin + productPath(item, page.locale) })) } });
  }
  return { ...common, "@graph": graph };
}

export default async function Page({ params }: PageProps) {
  const { path = [] } = await params;
  if (!path.length) redirect("/en/");
  const page = resolvePage(path);
  if (!page) notFound();
  const { locale } = page;
  let content;
  switch (page.kind) {
    case "home": content = <HomePage locale={locale} />; break;
    case "catalog": content = <CatalogPage locale={locale} />; break;
    case "category": content = <CatalogPage locale={locale} category={page.category} />; break;
    case "product": content = <ProductPage locale={locale} product={page.product!} />; break;
    case "content": content = <ContentView locale={locale} page={page.content!} />; break;
    case "contact": content = <ContactPage locale={locale} />; break;
    case "quote": content = <QuotePage locale={locale} />; break;
    case "reorder": content = <QuotePage locale={locale} reorder />; break;
  }
  return <><Header locale={locale} alternatePath={page.alternatePath} /><main id="main-content">{content}</main><Footer locale={locale} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(page)).replace(/</g, "\\u003c") }} /></>;
}
