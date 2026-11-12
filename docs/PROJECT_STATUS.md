# PromoMerch — Project Status

## Current mode

**RESUME.** The owner's subsequent “start” instruction activated the approved brand build. Application source now exists. Continue from it; do not restart branding or regenerate the universal prompt.

## Actual implementation state

| Area | State | Evidence / boundary |
| --- | --- | --- |
| Brand | SELECTED / IMPLEMENTED | 1A Refined Slash, navy/cobalt, aligned descriptor, no .ca in the logo |
| Universal baseline | PRESERVED | Original universal v2.0 and project master remain unchanged |
| Application | IMPLEMENTED | Vinext/React/TypeScript; public WHC Node 24 standalone and private Workers review |
| EN/FR routes | PASS | 100 unique valid paths, 50 reciprocal language pairs; unknown routes rejected by the route resolver |
| Catalogue | IMPLEMENTED | 24 families in six categories; search, filters, sort and quote shortlist |
| Supporting content | IMPLEMENTED | 15 page pairs, including the project portfolio, services, guides, coverage and policies |
| Production assets | IMPLEMENTED / REVIEWED | Bilingual vector/PNG lockups and favicon set; reconstruction caveat in MEDIA_MANIFEST.md |
| Imagery | IMPLEMENTED / REVIEWED | Seven illustrative collections plus two attributed historical Merch Matters project photos; original assets and responsive WebPs preserved |
| Quote endpoint | WHC LIVE PASS | Same-origin POST, private SQLite persistence, server validation and idempotency |
| Artwork upload | WHC LIVE PASS | PNG upload stored outside the web root with quarantined status and 0600 permissions |
| Notifications | HOSTED PROVIDER ACCEPTANCE PASS | EN quote and FR reorder accepted by Formspree; identical retries preserve accepted state. Owner confirmed both notifications arrived at info@promomerch.ca. See FORMSPREE_VERIFICATION.md. |
| Form UI | LOCAL PASS | French validation, shortlist continuity/quantity changes, EN/FR saved confirmations, mobile upload flow |
| Responsive/browser review | PASS for checked views | Current release: 24 local and 24 live page/viewport checks; EN 1440/360 px, FR 390/768 px |
| Private review host | CONFIGURED | Existing project appgprj_6af541e1e5788191adfbb1e9d18c53cd; use its deployment record for publish outcome |
| PromoMerch.ca domain/DNS | LIVE / HTTPS PASS | WHC A record 51.161.57.68; apex/www TLS; HTTPS redirects; mail records preserved |
| MerchMatters.ca | NOT MIGRATED | Existing site/contact continuity retained; later transition plan is separate |
| Contact mailbox/phone routing | MAILBOX PASS; PHONE NOT TESTED | Owner confirmed both WHC launch notifications at info@promomerch.ca; phone remains (833) 696-9996 |
| Legal seller | INHERITED, VERIFY BEFORE PUBLIC LAUNCH | Facility Unlimited Corp. carried from existing business record; no unsupported entity substitution |
| Search submission/indexing | VERIFIED / SUBMITTED | Google sitemap Success with 96 discovered URLs; Bing sitemap and IndexNow submitted. See SEARCH_SUBMISSION.md for processing and indexing status |
| Customer communications | NO CUSTOMER ANNOUNCEMENTS | Formspree integration tests use labelled synthetic data; see current verification record. |

## Verification records

See [BUILD_VALIDATION.md](BUILD_VALIDATION.md), [CONTENT_REVIEW.md](CONTENT_REVIEW.md), [MEDIA_MANIFEST.md](MEDIA_MANIFEST.md) and [OPERATIONS.md](OPERATIONS.md). Read the current Sites deployment result and current GitHub HEAD when resuming; do not infer either from an older summary.

Local test records and uploaded QA artwork are in ignored local runtime storage. They are not copied to GitHub or included in the deployment archive. Source and marketing asset files are backed up separately from customer/operational data.

## Exact resume point

1. Inspect this checkout and the existing Sites project mapping; use RESUME and preserve the application and brand.
2. Read current deployment/source state. Do not create a second Site or force-push over unrelated GitHub changes.
3. Make owner-requested design/content refinements, using the approved identity.
4. Quote-to-inbox workflow is verified for both EN/FR tests by provider acceptance, private database state and owner-confirmed receipt. Monitor unresolved notification states and maintain provider configuration.
5. Confirm real contact routing, seller/policy details, product records, data retention and operator access.
6. Production is WHC. Follow WHC_DEPLOYMENT.md and WHC_LAUNCH_VERIFICATION.md; preserve the separate private Sites preview.
7. Domain activation, production crawl configuration and search-account submissions are complete. Review SEARCH_SUBMISSION.md for pending search-engine processing; a MerchMatters migration remains a separate task.

## November 12, 2026 — Formspree update

- Owner-selected notification inbox: info@promomerch.ca. Owner-supplied form: xzerbjjy.
- IMPLEMENTED: server-side Formspree forwarding after private persistence, atomic notification claims, accepted/failed/uncertain states, preserved form on notification failure, localized quote details and updated EN/FR privacy disclosures.
- PASS: 22 validation/notification regressions; TypeScript; production build; English desktop (1440 px) and French mobile (390 px) Chrome checks using controlled API responses for rejection, uncertain delivery and success. Retries retained the request key; errors retained form values/shortlist; accepted requests cleared the shortlist; no browser errors or horizontal overflow in checked states.
- CONFIGURED: Sites FORMSPREE_ENDPOINT runtime value. No secrets required and no schema migration.
- Hosted deployment and provider acceptance: recorded in docs/FORMSPREE_VERIFICATION.md after publication.
- Inbox receipt: PASS by owner confirmation for both EN/FR hosted references. The provider dashboard was not separately inspected.

## November 12, 2026 — WHC launch

The owner authorized domain connection, WHC hosting and public publication. The existing plan and registered domain were reused without purchase. Production is https://promomerch.ca. Both WHC nameservers and public resolvers return the web server address; mail records were preserved. AutoSSL covers apex and www; HTTP/www redirect to HTTPS apex.

PASS: 98 live routes and canonicals, public sitemap/robots, EN desktop and FR mobile browser checks, private-path denial, real quote/artwork persistence, accepted Formspree notifications and owner-confirmed inbox receipt for PM-A2EA5FD2027E / PM-C85C73545770. Live identical retries preserved those references without sending again. A private SQLite/artwork backup was independently read and checked. See WHC_LAUNCH_VERIFICATION.md.

## November 12, 2026 — logo cleanup

The owner retained the original 1A identity after considering alternatives. Corrected native letter curves, m counters, repeated glyph consistency, optical spacing, the M-slash notch and descriptor-edge alignment. Regenerated all eight SVGs and four transparent PNGs from shared source.

WHC LIVE PASS: all 12 public assets match source SHA-256 checksums. Live EN 1440/360 px and FR 390 px Chrome checks passed for header/footer loading, aspect ratio, no transforms, no horizontal overflow and no page errors. This was an asset-only patch; no application rebuild or quote retest was needed. The separate private Sites preview was not republished. See LOGO_CLEANUP_VERIFICATION.md.

## November 12, 2026 — MerchMatters review, live improvements and search submission

Applied the owner-requested patterns from MerchMatters.ca: two attributed project-photo examples, a bilingual portfolio page, service/guide shortcuts, catalogue custom-enquiry links, section navigation and a brief checklist with direct contact links. Preserved the corrected original logo and quote backend. Privacy storage wording now matches hosting; quote/reorder pages are crawlable so their noindex tags can be read.

WHC LIVE PASS: 2,804 installed file checksums, 100 live routes, 50 reciprocal language pairs, 96 sitemap URLs, private-path denial and 24 browser page/viewport combinations. All 25 backend regressions, TypeScript and the WHC build passed. Previous code/web rules and an independently verified SQLite/artwork backup are retained privately. See MERCHMATTERS_REFRESH.md.

Google ownership is verified and the sitemap reports Success with 96 discovered pages. Bing ownership is verified; sitemap and 96-URL IndexNow submissions were made. Search-engine processing/indexing remains separate from submission; exact outcomes are in SEARCH_SUBMISSION.md. MerchMatters was not redirected or migrated. Source changes and public assets are backed up to the existing GitHub repository; private operational evidence stays out of it.
