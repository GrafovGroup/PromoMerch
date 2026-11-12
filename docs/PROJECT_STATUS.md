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
| Notifications | HOSTED PROVIDER ACCEPTANCE PASS | EN quote and FR reorder accepted by Formspree; identical retries preserve accepted state. Inbox receipt awaits owner confirmation. See FORMSPREE_VERIFICATION.md. |
| Form UI | LOCAL PASS | French validation, shortlist continuity/quantity changes, EN/FR saved confirmations, mobile upload flow |
| Responsive/browser review | PASS for checked views | Desktop 1363 px, mobile frame 390 px, tablet frame 768 px; representative templates checked |
| Private review host | CONFIGURED | Existing project appgprj_6af541e1e5788191adfbb1e9d18c53cd; use its deployment record for publish outcome |
| PromoMerch.ca domain/DNS | NOT CHANGED | No DNS activation, transfer or domain migration performed |
| MerchMatters.ca | NOT MIGRATED | Existing site/contact continuity retained; later transition plan is separate |
| Contact mailbox/phone routing | NOT VERIFIED | Intended display values info@promomerch.ca and (833) 696-9996 |
| Legal seller | INHERITED, VERIFY BEFORE PUBLIC LAUNCH | Facility Unlimited Corp. carried from existing business record; no unsupported entity substitution |
| Search submission/indexing | NOT PERFORMED | Review is private/noindex, no search-console or indexing claim |
| Customer communications | NO CUSTOMER ANNOUNCEMENTS | Formspree integration tests use labelled synthetic data; see current verification record. |

## Verification records

See [BUILD_VALIDATION.md](BUILD_VALIDATION.md), [CONTENT_REVIEW.md](CONTENT_REVIEW.md), [MEDIA_MANIFEST.md](MEDIA_MANIFEST.md) and [OPERATIONS.md](OPERATIONS.md). Read the current Sites deployment result and current GitHub HEAD when resuming; do not infer either from an older summary.

Local test records and uploaded QA artwork are in ignored local runtime storage. They are not copied to GitHub or included in the deployment archive. Source and marketing asset files are backed up separately from customer/operational data.

## Exact resume point

1. Inspect this checkout and the existing Sites project mapping; use RESUME and preserve the application and brand.
2. Read current deployment/source state. Do not create a second Site or force-push over unrelated GitHub changes.
3. Make owner-requested design/content refinements, using the approved identity.
4. Verify Formspree recipient settings and actual info@promomerch.ca inbox receipt before describing notifications as email-complete.
5. Confirm real contact routing, seller/policy details, product records, data retention and operator access.
6. Select the live runtime/domain setup. A WHC deployment needs backend/storage adapters; the current D1/R2 Worker is not a direct PHP/static upload.
7. Only after the live release is authorized, activate the domain, switch the canonical/public index settings, apply reviewed legacy redirects and perform search-account work.

## November 12, 2026 — Formspree update

- Owner-selected notification inbox: info@promomerch.ca. Owner-supplied form: xzerbjjy.
- IMPLEMENTED: server-side Formspree forwarding after private persistence, atomic notification claims, accepted/failed/uncertain states, preserved form on notification failure, localized quote details and updated EN/FR privacy disclosures.
- PASS: 22 validation/notification regressions; TypeScript; production build; English desktop (1440 px) and French mobile (390 px) Chrome checks using controlled API responses for rejection, uncertain delivery and success. Retries retained the request key; errors retained form values/shortlist; accepted requests cleared the shortlist; no browser errors or horizontal overflow in checked states.
- CONFIGURED: Sites FORMSPREE_ENDPOINT runtime value. No secrets required and no schema migration.
- Hosted deployment and provider acceptance: recorded in docs/FORMSPREE_VERIFICATION.md after publication.
- Inbox receipt and Formspree recipient configuration: NOT YET VERIFIED. Endpoint acceptance must not be described as delivered email.
