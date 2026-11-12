# PromoMerch — Site Map

## Current release state

The implemented route model contains **98 unique paths in 49 English/French pairs**. Every path in this register belongs to the owner-private review release and is **noindex, nofollow**. The [review origin](https://promomerch.dimagrafov.chatgpt.site) is configured in `lib/site.ts`. This register does not assert public deployment, search submission or indexing.

Authority: `lib/page-model.ts` resolves routes from `lib/site.ts`, `lib/catalog.ts` and `lib/content.ts`. The inventory below was generated from `publicPagePaths()` and checked for reciprocal locale links. Update those records first when changing routes.

| Route group | Bilingual pairs | Paths |
| --- | ---: | ---: |
| Core pages, including quote and reorder | 5 | 10 |
| Category pages | 6 | 12 |
| Product-family pages | 24 | 48 |
| Supporting content | 14 | 28 |
| **Total** | **49** | **98** |

## Core pages

| Page | English path | French path |
| --- | --- | --- |
| Homepage | `/en/` | `/fr/` |
| Product catalogue | `/en/products/` | `/fr/produits/` |
| Contact | `/en/contact/` | `/fr/contact/` |
| Quote enquiry | `/en/quote/` | `/fr/soumission/` |
| Reorder enquiry | `/en/reorder/` | `/fr/commander-a-nouveau/` |

## Categories

| Page | English path | French path |
| --- | --- | --- |
| Apparel | `/en/apparel/` | `/fr/vetements/` |
| Drinkware | `/en/drinkware/` | `/fr/bouteilles-et-tasses/` |
| Bags | `/en/bags/` | `/fr/sacs/` |
| Office & stationery | `/en/office-stationery/` | `/fr/bureau-papeterie/` |
| Tech accessories | `/en/tech-accessories/` | `/fr/accessoires-technologiques/` |
| Gifts & kits | `/en/gifts-kits/` | `/fr/cadeaux-coffrets/` |

## Product families

These routes describe merchandise families and selection considerations. They do not establish purchasable stock or a verified supplier SKU. Product-family pages must not emit stock, price, availability or `Offer` structured data. A later verified SKU catalogue needs separately sourced product records and attributes. A future public release does not change this evidence requirement.

| Page | English path | French path |
| --- | --- | --- |
| Everyday tees | `/en/products/everyday-tees/` | `/fr/produits/t-shirts/` |
| Team polos | `/en/products/team-polos/` | `/fr/produits/polos-equipe/` |
| Hoodies & layers | `/en/products/hoodies-layers/` | `/fr/produits/chandails-capuchon/` |
| Caps & toques | `/en/products/caps-toques/` | `/fr/produits/casquettes-tuques/` |
| Everyday bottles | `/en/products/everyday-bottles/` | `/fr/produits/bouteilles-quotidien/` |
| Desk tumblers | `/en/products/desk-tumblers/` | `/fr/produits/gobelets/` |
| Coffee mugs | `/en/products/coffee-mugs/` | `/fr/produits/tasses-cafe/` |
| Travel drinkware | `/en/products/travel-drinkware/` | `/fr/produits/tasses-voyage/` |
| Everyday totes | `/en/products/everyday-totes/` | `/fr/produits/sacs-fourre-tout/` |
| Team backpacks | `/en/products/team-backpacks/` | `/fr/produits/sacs-dos/` |
| Drawstring bags | `/en/products/event-drawstring-bags/` | `/fr/produits/sacs-cordon/` |
| Travel pouches | `/en/products/travel-pouches/` | `/fr/produits/pochettes/` |
| Notebooks & journals | `/en/products/notebooks-journals/` | `/fr/produits/carnets/` |
| Branded pens | `/en/products/branded-pens/` | `/fr/produits/stylos/` |
| Desk accessories | `/en/products/desk-accessories/` | `/fr/produits/accessoires-bureau/` |
| Lanyards & badge accessories | `/en/products/lanyards-badge-accessories/` | `/fr/produits/cordons-porte-badges/` |
| Charging accessories | `/en/products/charging-cables/` | `/fr/produits/cables-recharge/` |
| Device stands | `/en/products/device-stands/` | `/fr/produits/supports-appareils/` |
| Tech organizers | `/en/products/tech-organizers/` | `/fr/produits/organisateurs-accessoires/` |
| Power banks | `/en/products/power-banks/` | `/fr/produits/batteries-externes/` |
| Employee welcome kits | `/en/products/employee-welcome-kits/` | `/fr/produits/coffrets-accueil-employes/` |
| Event kits | `/en/products/event-kits/` | `/fr/produits/trousses-evenements/` |
| Recognition gift sets | `/en/products/recognition-gift-sets/` | `/fr/produits/cadeaux-reconnaissance/` |
| Client gift sets | `/en/products/client-gift-sets/` | `/fr/produits/cadeaux-clients/` |

## Supporting content

| Page | English path | French path |
| --- | --- | --- |
| services | `/en/services/` | `/fr/services/` |
| decoration | `/en/services/decoration/` | `/fr/services/personnalisation/` |
| kitting | `/en/services/kitting-fulfilment/` | `/fr/services/assemblage-expedition/` |
| company-programs | `/en/company-programs/` | `/fr/programmes-entreprise/` |
| events | `/en/event-merchandise/` | `/fr/articles-evenements/` |
| industries | `/en/industries/` | `/fr/secteurs/` |
| coverage | `/en/coverage/` | `/fr/couverture/` |
| resources | `/en/resources/` | `/fr/ressources/` |
| artwork | `/en/resources/artwork/` | `/fr/ressources/fichiers-graphiques/` |
| planning | `/en/resources/merch-planning/` | `/fr/ressources/planifier-un-projet/` |
| about | `/en/about/` | `/fr/a-propos/` |
| privacy | `/en/privacy/` | `/fr/confidentialite/` |
| accessibility | `/en/accessibility/` | `/fr/accessibilite/` |
| terms | `/en/terms/` | `/fr/conditions/` |

## Indexing and utility boundaries

- `site.publicLaunch` is `false`. Root and resolved-page metadata apply noindex/nofollow, `app/robots.ts` disallows crawling, and `app/sitemap.ts` returns an empty collection for this release.
- Robots rules and noindex are not access controls. Owner-private review access is a separate hosting setting and must remain independently verified.
- Quote and reorder pages remain noindex utility destinations in the current public-release branch of the metadata logic. They are omitted from the future sitemap generator.
- The locale-independent entry route, unknown-route/404 handling, `/api/quotes/`, and in-page confirmation/error states are outside this 98-path content inventory. They are not additional indexable landing pages.
- Before an authorized public launch, verify the live origin, canonical URLs, reciprocal language links, sitemap output, privacy setting and search controls together. No Search Console submission or observed indexing is recorded here.

## Related records

See [CONTENT_REVIEW.md](CONTENT_REVIEW.md), [COVERAGE_REGISTER.md](COVERAGE_REGISTER.md), [SOURCES_AND_CLAIMS.md](SOURCES_AND_CLAIMS.md) and [PROJECT_STATUS.md](PROJECT_STATUS.md).
