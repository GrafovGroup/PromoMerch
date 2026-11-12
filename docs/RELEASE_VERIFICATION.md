# Private review release — verified

Verified on 2026-11-12 UTC.

## Release mapping

| Item | Verified value |
| --- | --- |
| Private review URL | https://promomerch.dimagrafov.chatgpt.site |
| Sites project | appgprj_6af541e1e5788191adfbb1e9d18c53cd |
| Sites source commit | 85513c601397da6da3e95b7dacbe2633b9a0fae1 |
| Saved version | appgprj_6af541e1e5788191adfbb1e9d18c53cd~appgver_62d1c0248d748191a1c7e49ff59a73b7 |
| Deployment | appgdep_6af54897f0c88191b01f3d24eea7c96d |
| Deployment result | succeeded |
| GitHub application backup commit | 4b3708ca14b51738ee87b0fc86c257b006131fe9 |
| Shared application/source tree | e6373fb1ecca323225cedc8b3f12f0f514958636 |
| Deployment archive SHA-256 | 9983156effc84571f2fe85d3c08e465c951fd8022d142ae932d02403b2935adb |

All 196 files in the application backup were verified against the Sites source tree by path, mode, Git blob SHA and size. The two repositories have separate commit histories but that application commit has an identical complete source tree. This release-verification document is a later documentation-only addition; it does not change the deployed application.

## Hosted verification

Checks used the platform's supported private service access. The site's audience was not changed.

- The English and French homepages returned HTTP 200, their correct `en-CA` / `fr-CA` language attributes, titles and noindex metadata.
- A nonexistent French page returned a real HTTP 404 with French content and noindex.
- robots.txt and sitemap.xml returned HTTP 200. The review disallows crawling and publishes an empty URL set.
- favicon.ico returned HTTP 200 and a genuine ICO signature.
- A labelled synthetic quote with a small PNG attachment returned HTTP 201 and a saved reference.
- Retrying the same request returned HTTP 200 and the identical reference, with replay status.
- Changing the payload under the same idempotency key returned HTTP 409.
- A different Origin header returned HTTP 403.
- The live D1 binding contains `quote_requests` and `quote_rate_limits`.
- A direct bounded database read confirmed the synthetic request's received status, 722-byte artwork attachment, private artwork key, `quarantined_unreviewed` status and marketing preference off.
- The record's notification status remains `not_configured`. No email provider or outbound customer message was used.

The explicitly labelled hosted QA record remains in the private database for traceability. It is not a commercial enquiry. No customer data or artwork was used for these tests or copied into this repository.

The private site's browser access gate requires ChatGPT sign-in. Its access configuration was checked as owner-only, with no additional editor or group access. The locally tested page designs are captured in [the browser validation record](BUILD_VALIDATION.md).

## Remaining launch dependencies

Email notification delivery and inbox receipt, real mailbox/phone routing, seller and policy confirmation, operator workflow, retention and recovery, and verified supplier product data remain launch work. The current runtime uses Workers/D1/R2; a WHC move requires adapters.

PromoMerch.ca DNS, the MerchMatters migration, customer announcements and search-account submissions were not performed. Public launch requires the corresponding owner instruction and verified operational setup.
