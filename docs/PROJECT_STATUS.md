# PromoMerch — Project Status

## Current mode

**RESUME.** The owner's subsequent “start” instruction activated the approved brand build. Application source now exists. Continue from it; do not restart branding or regenerate the universal prompt.

## Actual implementation state

| Area | State | Evidence / boundary |
| --- | --- | --- |
| Brand | SELECTED / IMPLEMENTED | 1A Refined Slash, navy/cobalt, aligned descriptor, no .ca in the logo |
| Universal baseline | PRESERVED | Original universal v2.0 and project master remain unchanged |
| Application | IMPLEMENTED | Vinext/React/TypeScript, Workers runtime |
| EN/FR routes | PASS | 98 unique valid paths, 49 reciprocal language pairs; unknown routes rejected by the route resolver |
| Catalogue | IMPLEMENTED | 24 families in six categories; search, filters, sort and quote shortlist |
| Supporting content | IMPLEMENTED | 14 page pairs, including services, guides, coverage and policies |
| Production assets | IMPLEMENTED / REVIEWED | Bilingual vector/PNG lockups and favicon set; reconstruction caveat in MEDIA_MANIFEST.md |
| Imagery | IMPLEMENTED / REVIEWED | Seven generated illustrative collections; originals and responsive WebPs preserved |
| Quote endpoint | IMPLEMENTED / LOCAL PASS | Same-origin POST, D1 persistence, server validation and idempotency |
| Artwork upload | IMPLEMENTED / LOCAL PASS | Small PNG upload saved with private quarantined status in R2/D1 |
| Notifications | NOT CONFIGURED | Saved records explicitly use notification_status = not_configured |
| Form UI | LOCAL PASS | French validation, shortlist continuity/quantity changes, EN/FR saved confirmations, mobile upload flow |
| Responsive/browser review | PASS for checked views | Desktop 1363 px, mobile frame 390 px, tablet frame 768 px; representative templates checked |
| Private review host | CONFIGURED | Existing project appgprj_6af541e1e5788191adfbb1e9d18c53cd; use its deployment record for publish outcome |
| PromoMerch.ca domain/DNS | NOT CHANGED | No DNS activation, transfer or domain migration performed |
| MerchMatters.ca | NOT MIGRATED | Existing site/contact continuity retained; later transition plan is separate |
| Contact mailbox/phone routing | NOT VERIFIED | Intended display values info@promomerch.ca and (833) 696-9996 |
| Legal seller | INHERITED, VERIFY BEFORE PUBLIC LAUNCH | Facility Unlimited Corp. carried from existing business record; no unsupported entity substitution |
| Search submission/indexing | NOT PERFORMED | Review is private/noindex, no search-console or indexing claim |
| Customer communications | NOT SENT | Form tests are synthetic and no outbound message provider is connected |

## Verification records

See [BUILD_VALIDATION.md](BUILD_VALIDATION.md), [CONTENT_REVIEW.md](CONTENT_REVIEW.md), [MEDIA_MANIFEST.md](MEDIA_MANIFEST.md) and [OPERATIONS.md](OPERATIONS.md). Read the current Sites deployment result and current GitHub HEAD when resuming; do not infer either from an older summary.

Local test records and uploaded QA artwork are in ignored local runtime storage. They are not copied to GitHub or included in the deployment archive. Source and marketing asset files are backed up separately from customer/operational data.

## Exact resume point

1. Inspect this checkout and the existing Sites project mapping; use RESUME and preserve the application and brand.
2. Read current deployment/source state. Do not create a second Site or force-push over unrelated GitHub changes.
3. Make owner-requested design/content refinements, using the approved identity.
4. Connect a verified transactional email provider and confirm actual inbox receipt before describing the quote workflow as email-complete.
5. Confirm real contact routing, seller/policy details, product records, data retention and operator access.
6. Select the live runtime/domain setup. A WHC deployment needs backend/storage adapters; the current D1/R2 Worker is not a direct PHP/static upload.
7. Only after the live release is authorized, activate the domain, switch the canonical/public index settings, apply reviewed legacy redirects and perform search-account work.
