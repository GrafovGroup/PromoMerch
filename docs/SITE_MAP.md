# PromoMerch — Site Map

## Current release state

The production route model contains **100 unique paths in 50 English/French pairs** at `https://promomerch.ca`. The 96 public content URLs are indexable and included in `/sitemap.xml`. The four quote/reorder URLs remain crawlable with **noindex, nofollow** metadata and are excluded from the sitemap. The separate Sites review build remains private/noindex. Submission outcomes are recorded in [SEARCH_SUBMISSION.md](SEARCH_SUBMISSION.md).

Authority: `lib/page-model.ts` resolves routes from `lib/site.ts`, `lib/catalog.ts` and `lib/content.ts`. The inventory below was generated from `publicPagePaths()` and checked for reciprocal locale links. Update those records first when changing routes.

| Route group | Bilingual pairs | Paths |
| --- | ---: | ---: |
| Core pages, including quote and reorder | 5 | 10 |
| Category pages | 6 | 12 |
| Product-family pages | 24 | 48 |
| Supporting content | 15 | 30 |
| **Total** | **50** | **100** |

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
| projects | `/en/projects/` | `/fr/realisations/` |
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

- The WHC build enables `site.publicLaunch`, production canonicals, public-content indexing and a 96-URL sitemap. The ordinary Sites build keeps the private review origin, noindex metadata and disallow rules.
- Public robots rules allow the site and disallow `/api/`. Quote/reorder pages must be crawlable so search engines can read their noindex metadata; noindex is not a privacy control.
- The root redirects to `/en/`. Unknown routes, `/api/quotes/`, and confirmation/error states are outside this 100-path page inventory.
- Every page has a self-referencing canonical and reciprocal en-CA/fr-CA alternatives; x-default points to its English equivalent.
- PASS on November 12, 2026: all 100 live paths, 50 reciprocal pairs, public sitemap, noindex utility pages, verification files and private-path denial. Search submission does not establish indexing.

## Related records

See [CONTENT_REVIEW.md](CONTENT_REVIEW.md), [COVERAGE_REGISTER.md](COVERAGE_REGISTER.md), [SOURCES_AND_CLAIMS.md](SOURCES_AND_CLAIMS.md) and [PROJECT_STATUS.md](PROJECT_STATUS.md).
