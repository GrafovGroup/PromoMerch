# MerchMatters-informed PromoMerch update

Released on WHC on November 12, 2026. The owner requested a review of their MerchMatters.ca site, adoption of useful patterns on PromoMerch.ca, and subsequent Google/Bing submission. The separate MerchMatters site remains active; this release is not a domain migration.

## Review and implementation

| Source reviewed | Useful observation | Published application |
| --- | --- | --- |
| [Projects](https://merchmatters.ca/projects/) | Actual finished work helps buyers understand decoration and coordinated merchandise. | Two historical photo examples on the homepage and new `/en/projects/` / `/fr/realisations/` pages, explicitly attributed to Merch Matters. |
| [Services](https://merchmatters.ca/services/) | Early service choices make relevant detail pages easier to find. | Three service cards before the detailed content: decoration, kitting and company programmes. |
| [Resources](https://merchmatters.ca/resources/) and buyer guides | Questions about product choice, artwork, decoration and timing match project decisions. | Four question-led links to the existing substantive guides, plus in-page section navigation. |
| [Custom requests](https://merchmatters.ca/custom/) | Buyers need a route when the visible catalogue does not contain their idea. | Custom-enquiry panel on catalogue/category pages and a direct quote link in empty search results. |
| [Order](https://merchmatters.ca/order/) | A useful brief and contact details make it easier to start an enquiry. | Audience, approximate quantity, budget and in-hand date checklist, with phone/email immediately before the existing form. |

The photographs show embroidered vests and matching green ties/pocket squares. Original files and export provenance are in MEDIA_MANIFEST.md. The mismatched legacy “Baseball caps”/stencil image was excluded. No testimonials, client results, inventory or software-platform claims were inferred. These changes are based on observed content and usability; conversion uplift has not been measured.

Also corrected the public privacy description to reflect private hosted database/file storage, retained Formspree handling, allowed crawling of noindex quote/reorder pages, added public search verification assets and used actual portfolio photography for the new pages’ social previews.

## Verification

| Check | Result |
| --- | --- |
| TypeScript | PASS |
| Quote/notification regression suite | PASS — 22 checks |
| WHC ingress regression suite | PASS — 3 checks |
| WHC production build | PASS |
| Local and live route/SEO sweep | PASS — 100 routes, 50 reciprocal locale pairs, 96 sitemap URLs, self-canonicals, x-default, public index settings and four noindex form pages |
| Private path denial | PASS — database, quarantine, operations and environment paths denied |
| Browser review, local and live | PASS — 24 page/viewport combinations each, EN 1440/360 px and FR 390/768 px |
| Changed page behavior | PASS — portfolio images/attribution, three service cards, four guide cards, section targets, unmatched search/custom quote link, filter reset, brief checklist |
| Browser errors, overflow and broken images | PASS — none in the checked views |
| Photo exports | PASS — four WebPs reproduce byte-for-byte from unchanged JPEGs |
| Search verification and submissions | See SEARCH_SUBMISSION.md for actual outcomes |

One first live crawl attempt immediately after restart returned a page without the expected canonical tag. The page was fetched independently with its correct canonical, the complete follow-up live sweep passed, and all 24 live browser checks passed. No persistent fault was reproduced.

The quote backend, schema, ingress, notification configuration and corrected logo are unchanged. No additional live quote/email tests were sent: the previous WHC receipt is already owner-confirmed, and this release changes guidance/layout rather than processing.

## WHC release and recovery

- Build ID: `905d72f0-be55-43d8-a061-ca0397334a35`.
- Archive: `promomerch-merch-refresh-20261112.tar.gz`, 10,666,306 bytes.
- Archive SHA-256: `b09fa397f02ae11dabe044341e8c0484e2af695be0d6c1856a5a3823dbfb88bb`.
- PASS: all 2,804 release-file hashes checked in staging and after installation. CloudLinux returned restart success for `promomerch-app`.
- Private backup: `~/promomerch-staging/before-merch-refresh-20261112/`, containing previous application archive, web rules, SQLite backup and artwork. SQLite backup API and independent integrity check passed at 2026-11-12 06:50 UTC.
- Current data directory, mail records, DNS, web-server configuration and other domains were preserved. Only PromoMerch’s app restarted.
- For rollback, restore that application archive and web rules, preserve current data, and restart only PromoMerch. Follow WHC_DEPLOYMENT.md. Keep verification files/tags available if rolling back to a pre-verification release.

Ignored evidence is in `outputs/merch-refresh/` and `outputs/merchmatters-audit/`; private account and customer data are excluded from GitHub. The Sites preview was not republished.
