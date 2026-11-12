# MerchMatters → PromoMerch — Migration Plan

**Prepared:** 2026-11-11 · **Status:** proposed procedure; no migration activated

## 1. Scope and evidence

Plan the transition from `merchmatters.ca` to `promomerch.ca` while preserving useful pages, customer access, email, and search visibility. This document is a preparation record, not a completed technical audit or approved redirect map.

The [MerchMatters homepage](https://merchmatters.ca/), checked 2026-11-11, lists `(888) 663-2244`, `info@merchmatters.ca`, a Toronto address, and “Merch Matters is a brand of Facility Unlimited Corp.” These are legacy public statements. Verify current operations and legal details before reusing them. Do not substitute Grafov Group Inc. as the legal seller without approval.

Proposed new contacts are `info@promomerch.ca` and `(833) 696-9996`; delivery and routing are unverified. PromoMerch domain control, the production host, and the form endpoint also remain unverified.

## 2. Preparation sequence

1. **Confirm access and ownership.** Establish control of both domains, hosting, DNS, mail, analytics, and search-console properties. Record owners and renewal responsibility. Preserve the old domain.
2. **Inventory the existing site.** Gather sitemap URLs, a crawl, indexed/valuable landing pages, analytics/search data where available, downloadable files, forms, backlinks, and existing redirects. Record status codes and canonical URLs. Take a recoverable backup and export relevant settings.
3. **Map destinations.** Assign each useful legacy URL to its closest substantive replacement. Preserve paths where practical. Do not redirect every old page to the new homepage. Document consolidation, intentionally retired content, and unresolved destinations individually.
4. **Prepare and validate the new site.** Complete bilingual content, product/quote flows, legal information, forms, images, metadata, self-referencing canonicals, hreflang, and sitemaps. Keep review environments out of search results. Stage the move thoughtfully instead of combining avoidable structural and platform changes.
5. **Plan communications and mail continuity.** Prepare the “MerchMatters is now PromoMerch” notice and revised contact materials. Preserve required MX/TXT records, forwarding, authentication, and old-mailbox handling. Test new mail and phone routes. Customer announcements require separate authorization.
6. **Activate only after launch authorization.** Apply permanent server-side redirects using the approved map, update internal links and canonical references, publish the new sitemap, and follow the applicable search-console move workflow. Verify the new production site is indexable and usable.
7. **Monitor and retain.** Check redirect targets, crawl/indexing signals, quote delivery, missing pages, and customer reports. Retain redirects for at least one year; continued retention is generally useful while old links remain in use.

## 3. Required mapping record

Create the actual mapping after the inventory. This table specifies the fields; it is not a list of discovered legacy URLs.

| Field | Required content |
| --- | --- |
| Old URL and language | Exact observed source URL; EN/FR where applicable |
| Current state | Status, canonical, content purpose, and available traffic/link evidence |
| New URL | Exact relevant destination on PromoMerch |
| Action | Preserve, redirect, consolidate, or retire with rationale |
| Verification | Destination status, language relevance, redirect chain/loop check |
| Owner/status | Responsible person, unresolved issue, approval state |

## 4. Launch record

| Check | Current record |
| --- | --- |
| Domain/host access and backup | Not verified |
| Legacy URL inventory and redirect map | Not produced; required before activation |
| Legal seller and public address | Legacy statements recorded; new presentation requires confirmation |
| New email, phone, and quote endpoint | Defaults documented; operation unverified |
| New-site functional and bilingual acceptance | To be completed during the build |
| DNS/email continuity and recovery procedure | To be recorded before launch |
| Live migration authorization | Not part of the current prompt/upload request |

Before activation, record the responsible operator, launch time, previous hosting/DNS configuration, backup location, and recovery steps. If a material failure occurs, use that record to restore working service rather than making improvised changes. Retest quote and email delivery after any recovery.

## 5. Reference

[Google Search Central — Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), checked 2026-11-11. The mapping, permanent redirects, monitoring, and minimum one-year redirect retention above follow this guidance. Verify the current instructions when the live move is scheduled.
