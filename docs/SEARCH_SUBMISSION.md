# PromoMerch search verification and submissions

Performed November 12, 2026 under the owner’s instruction to submit PromoMerch to Google and Bing after the MerchMatters-informed site update. Canonical property: `https://promomerch.ca/`. Sitemap: [https://promomerch.ca/sitemap.xml](https://promomerch.ca/sitemap.xml).

## Recorded outcomes

| Service/action | Outcome |
| --- | --- |
| Google Search Console ownership | PASS — URL-prefix property verified with the published HTML meta tag. |
| Google sitemap submission | PASS — Search Console showed “Success,” last read November 12, 2026, with 96 discovered pages and 0 videos. |
| Google English homepage | PASS — `/en/` indexing requested; Google confirmed addition to its priority crawl queue. Inspection before the request showed “Discovered - currently not indexed.” |
| Google French homepage | PASS — `/fr/` indexing requested; Google confirmed addition to its priority crawl queue. Inspection before the request showed “Discovered - currently not indexed.” |
| Bing Webmaster Tools ownership | PASS — XML verification completed and PromoMerch’s property/Sitemaps report became available. |
| Bing sitemap submission | SUBMITTED / PROCESSING — one known sitemap; no errors or warnings reported; crawl/discovery processing pending. |
| Bing IndexNow batch | RECEIVED / VALIDATION PENDING — 96 public canonical URLs submitted at 2026-11-12 06:54:19 UTC; HTTP 202 with empty response. This is receipt pending key validation, not an indexing result. |
| Observed indexing | NOT CONFIRMED — no claim that all pages appear in Google or Bing. |

## Persistent verification

- Google’s public HTML verification token is emitted from `app/layout.tsx` only in the public-launch build. The verified root redirects to the English homepage, which contains the tag.
- Bing’s public verification file is `public/BingSiteAuth.xml` and is served unchanged at the domain root.
- IndexNow’s public key file is `public/7d4425eb33c4b6f44d8cc73b8f87173a.txt`. It contains the matching key and is served at `https://promomerch.ca/7d4425eb33c4b6f44d8cc73b8f87173a.txt`.
- These verification artifacts are intentionally public, not account credentials. Retain them during future releases and rollbacks to preserve verification.
- No DNS, mail settings, legacy redirects or Search Console Change of Address were changed. MerchMatters retains its separate property and website.

## Crawl checks and follow-up

PASS: all 100 live content/utility paths return 200 with self-referencing production canonicals and 50 reciprocal English/French pairs. The 96 content URLs appear once each in the sitemap. Four quote/reorder URLs are excluded and carry noindex/nofollow; robots allows them to be crawled so those tags can be read. `/api/` is disallowed. Private database/artwork/environment/operations paths remain inaccessible. The Sites preview retains its separate private/noindex build configuration.

Google and Bing decide when to crawl and index eligible pages. Submission and sitemap discovery are separate from indexing. Review their processing results in the existing accounts after they update; address actual errors if reported. Avoid repeatedly requesting the same homepage merely to change its queue position. No recurring monitoring automation was created.

Evidence remains locally under ignored `outputs/merch-refresh/`: Google sitemap response, homepage indexing confirmations, Bing sitemap state and IndexNow response/URL list. Public source backups exclude account details and customer data.

## Official guidance consulted

- [Google ownership verification](https://support.google.com/webmasters/answer/9008080)
- [Google sitemap construction and submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google noindex rules](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Bing Webmaster Tools getting started](https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/)
- [IndexNow protocol and response codes](https://www.indexnow.org/documentation)
