# Formspree integration verification

Verified November 12, 2026 (America/Toronto).

## Published application

- Private URL: https://promomerch.dimagrafov.chatgpt.site
- Sites source: `a767567a747400d350f6b5c91418f91dfb8c14c0`
- Saved version: `appgprj_6af541e1e5788191adfbb1e9d18c53cd~appgver_d9c6150c453c81918cd4d8bcb9eee528`
- Deployment: `appgdep_6af54f79945881919058a13090a74303` — **succeeded**
- Runtime environment revision: 1
- Endpoint: https://formspree.io/f/xzerbjjy
- Owner-selected receiving inbox: info@promomerch.ca; provider dashboard recipient setting and inbox receipt remain unverified by the agent.

## Checks

| Check | Result |
| --- | --- |
| Validation, artwork, idempotency and notification regressions | PASS — 22 tests |
| TypeScript and production build | PASS |
| Chrome desktop EN / mobile FR | PASS — controlled API rejection/uncertainty/success, preserved fields and shortlist, stable retry key, no JS errors or horizontal overflow |
| Hosted EN quote | PASS — HTTP 201, reference PM-CE2C0B66F545, notificationStatus accepted |
| Hosted FR reorder | PASS — HTTP 201, reference PM-06878E6EC795, notificationStatus accepted |
| Identical hosted retries | PASS — HTTP 200, same references, accepted/replayed |
| Independent live D1 read | PASS — both references have accepted notification status and matching languages |
| Actual destination inbox receipt | NOT VERIFIED — owner confirmation requested |
| Public domain / MerchMatters migration | NOT PERFORMED |

Formspree acceptance means HTTP success plus JSON `ok: true`; it is not evidence that an email reached the inbox. No customer enquiries or uploaded customer artwork were used in these checks. Hosted test records are labelled synthetic and remain private.

## Runtime correction and diagnostic records

Initial hosted tests PM-4CB9852A2FAE and PM-0402CA8DC7C1 saved successfully but recorded unknown notification status. Local Worker reproduction identified that `redirect: "error"` throws before sending in Cloudflare Workers. The final implementation uses `manual` and checks response status, preventing automatic redirection of quote details. See [Cloudflare Request documentation](https://developers.cloudflare.com/workers/runtime-apis/request/).

Those initial synthetic records were not automatically resent. A separate direct diagnostic test (RESPONSE-CHECK) was accepted by Formspree. The final EN/FR hosted tests above establish the corrected Worker path. Tests include 302, 422, 500, malformed JSON, lost acknowledgements and concurrent requests.

Bounded runtime diagnostics record only the failure category, HTTP status or exception class. They omit payloads, contacts, credentials, artwork and provider response bodies. Uncertain attempts require operator reconciliation by quote reference; no background delivery scheduler is claimed.

## Reproduction

Run `node --experimental-strip-types scripts/test-quote.mjs`, `node node_modules/typescript/bin/tsc --noEmit`, and the Sites build helper from this checkout. Local outbound delivery is disabled when FORMSPREE_ENDPOINT is absent. Use controlled API responses for repeated browser tests; avoid generating unnecessary real notifications.

Confirm the receiving address under Formspree → form xzerbjjy → Workflow → Email. See [Formspree's recipient configuration guide](https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address/). Check the two hosted references in the destination inbox and the Formspree submissions dashboard. No access/audience or DNS change is required.

