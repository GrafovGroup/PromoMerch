# PromoMerch operations

## Scope and release evidence

This document describes the quote intake implemented in this repository. It is an operator guide, not evidence that a deployment, production database check, mailbox delivery test or domain cutover has succeeded. Record those results separately in [PROJECT_STATUS.md](PROJECT_STATUS.md), with the relevant release and observed outcome.

The implementation saves enquiries and optional artwork. It forwards quote notifications to Formspree after saving. It does not place orders, take payments or provide an operator dashboard.

## Runtime and storage

The application uses Vinext/React and a Cloudflare Worker. The tracked [hosting manifest](../.openai/hosting.json) requests these server-side bindings:

| Binding | Use | Implementation |
| --- | --- | --- |
| `DB` | Cloudflare D1 database for private quote records and rate counters | [Database access](../db/index.ts), [schema](../db/schema.ts) |
| `BUCKET` | Cloudflare R2 object storage for private artwork | [Quote endpoint](../app/api/quotes/route.ts) |
| Worker environment | Request handling, Web Crypto, D1/R2 access | [Worker entry](../worker/index.ts) |

Sites provisions and connects hosted resources from the manifest. Binding names are configuration; they are not credentials or evidence that a particular deployed environment has been verified. Keep the bucket private: do not enable public object access, attach it to a public asset host, or expose the quarantine prefix through a route.

Local preview storage under `.wrangler/state` and hosted storage are separate. A local test does not establish production persistence. Generated build configurations can contain local placeholder resource IDs; do not use them to target a remote database.

### Quote records

The private `quote_requests` table stores:

- A random UUID, a customer-facing `PM-` reference, the unique idempotency key and a normalized payload hash.
- Language, enquiry/reorder mode, name, email, organization and optional phone.
- A JSON payload containing the project brief, selected product IDs and localized product-name snapshot, quantities, delivery preferences, optional postal code and CAD budget, reorder details and consent choices.
- Optional artwork object key, cleaned original filename, detected format, size and review status.
- `status = received`, a durable `notification_status`, marketing preference and a UTC creation timestamp.

The contact fields also appear in the JSON payload. A later export, correction or deletion procedure must account for both representations and the linked artwork.

There is no public quote list, quote lookup, administrative route or artwork download endpoint. A reference is an enquiry identifier; it is not a password or a download token. Use approved owner/operator database access to handle enquiries. Do not add a public read route as a shortcut.

The client stores only product IDs and quantities under `promomerch-quote-v1` in browser storage. Personal contact fields and artwork are not saved there. Failed submissions keep their fields in the current page; navigating away or refreshing can lose those unsent details.

### Artwork objects

Files are written to:

```text
quarantine/quotes/<quote-uuid>/artwork.<validated-extension>
```

The application accepts one optional PDF, PNG or JPG, up to 5 MiB. It checks extension/signature agreement, basic file endings and recognizable active PDF features. It stores objects with `application/octet-stream` and attachment metadata. R2 custom metadata marks them `unreviewed`; the quote row uses `quarantined_unreviewed`.

These checks are not antivirus scanning, complete document validation or sanitization. A format can pass its signature checks and still be unsuitable to open. No automatic scanning, isolated rendering, approval queue or release-from-quarantine workflow is implemented.

## Submission and retry behavior

[POST /api/quotes](../app/api/quotes/route.ts) accepts multipart form data with a JSON `payload` field and optional `artwork`. JSON-only requests are supported without artwork. Responses disable caching.

The endpoint requires the request's `Origin` to match its URL origin exactly. It validates the server-side catalogue IDs, quantities from 1 through 100,000, contact details, optional Canadian postal code, CAD budget basis, and date-only delivery timing. It uses the Toronto calendar date for past-date validation. A request can contain a useful project brief without selected products; reorder mode requires a previous reference.

The request body is capped at 6 MiB. Multipart JSON is capped at 32,000 characters; JSON-only bodies are capped at 128,000 bytes. The form includes a honeypot and a start timestamp; submissions less than 1.5 seconds after that timestamp or more than seven days later fail validation. This is lightweight spam resistance, not proof that a person submitted the form.

### Response meanings

| Result | Meaning |
| --- | --- |
| `201`, `ok: true` | A new quote row was saved. |
| `200`, `replayed: true` | An identical request key/payload maps to a confirmed existing row. |
| `400` | Validation, malformed body or rejected artwork; no successful save is claimed. |
| `403` | Origin check failed. |
| `409` | The same idempotency key was reused with different normalized content. |
| `413` / `415` | Request too large or unsupported request format. |
| `429` | A rate limit was reached; response includes `Retry-After: 3600`. |
| `503` | Required storage is unavailable or a successful save could not be confirmed. |

A save response includes `notificationStatus`. Only `accepted` means Formspree acknowledged the notification; it does not establish inbox receipt, artwork approval, a price commitment or an order. Other statuses show a saved-reference warning and preserve the form and shortlist.

An uncertain storage response can occur after a write committed. Keep the same idempotency key for an unchanged retry. The browser does this automatically, including after its 30-second timeout. Do not instruct a customer to generate repeated new requests merely to check whether an earlier one arrived.

### Idempotency and artwork ownership

Each request has a UUID-v4 idempotency key protected by a unique database index. The server compares a hash of the normalized enquiry and artwork bytes. Identical retries return the existing reference; altered content with the same key returns a conflict.

If two inserts compete, or a committed insert's acknowledgement fails, the handler re-reads the saved row. It keeps artwork owned by that row. It removes this attempt's different upload only when a committed competing row with the same key proves that the upload lost the race.

If that read fails or returns no row, the handler retains the upload privately because the write outcome is uncertain. Worker termination or a failed object deletion can also leave an orphan. D1 and R2 are not updated through one cross-service transaction; a separate reconciliation process remains necessary.

### Rate limits and source trust

Rate counters use fixed one-hour windows:

| Counter | Limit | When consumed |
| --- | --- | --- |
| Source attempts | 60/hour | Before the body is read, including malformed requests and idempotent retries. |
| New-request source | 20/hour | After validation and the initial idempotency lookup, before a new save attempt. |
| New-request email | 6/hour | On that new-save path, after the source allowance succeeds. |

The latter counters measure admitted new-save attempts, not guaranteed successful commits. A failed save can consume an allowance. Identical retries bypass these latter counters but remain subject to the early 60-attempt limit.

The source identity uses only a validated/canonicalized `CF-Connecting-IP` from the Cloudflare ingress deployment. It never falls back to `X-Forwarded-For`, `X-Real-IP` or `NextRequest.ip`. Missing/malformed values share one bounded fallback. Recheck this trust boundary if another proxy, same-zone Worker or hosting stack is introduced; a syntactically valid header alone does not authenticate its sender. Cloudflare documents the header and Worker-subrequest caveats in its [HTTP header reference](https://developers.cloudflare.com/fundamentals/reference/http-headers/).

Source and email counter keys are SHA-256 hashes with separate prefixes. Hashing avoids storing raw values in the counter table; it does not make those values anonymous. Old counter rows are opportunistically removed on the new-save path when their window is older than 48 hours. This is not a scheduled deletion guarantee.

## Database migrations

The source of truth is [db/schema.ts](../db/schema.ts), with SQLite migration generation configured by [drizzle.config.ts](../drizzle.config.ts). The initial migration is [0000_tired_weapon_omega.sql](../drizzle/0000_tired_weapon_omega.sql).

For a schema change:

1. Change the schema, then run `npm run db:generate`.
2. Review the generated SQL, journal and snapshot together. Keep migrations schema-only and bounded; handle backfills or customer data separately.
3. Commit the migration and Drizzle metadata with the application source. Never edit an already-applied migration, journal entry or snapshot; append a new migration.
4. Build the Worker, then apply each pending migration to the selected local preview in order.
5. Publish the exact reviewed source through the Sites workflow. Sites applies pending hosted migrations before uploading the Worker.

Example for the initial **local** migration, from the repository root after generating the build configuration:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_tired_weapon_omega.sql
```

Replace the filename for each later pending migration. Do not replay files already applied locally. Use `.wrangler/state`, not its internal versioned subdirectory. This command updates only local preview storage.

A failed hosted deployment may still have applied schema changes. Inspect the actual migration state before retrying, changing history or rolling back code. Do not infer database rollback from a Worker deployment failure. Preserve compatibility between the schema and any code version considered for rollback.

The application does not create or alter these tables during requests. Missing bindings or unapplied schema can produce a truthful `503` instead of a fake confirmation.

## Operator handling and quarantine review

Use approved, authenticated operator tooling for the selected environment. The website itself has no operations inbox. Assign a person to monitor saved enquiries before relying on it for incoming business.

For a request with artwork:

1. Locate the quote in the private database and use its recorded object key. Confirm the environment and quote reference before retrieving anything.
2. Treat the file as untrusted. Use an approved malware scanner and isolated document/image review environment; do not automatically open it on a normal workstation or send it to a third-party preview service.
3. Review whether the artwork is suitable for the actual product and decoration method. A file-format check does not establish ownership, production quality or suitability.
4. Keep the original private. Record the review outcome through the approved operator process. Any future application-controlled approval/release status needs an explicit implementation and audit trail; the current endpoint never promotes files out of quarantine.

Do not attach unreviewed customer artwork to notification emails, publish signed links with indefinite validity, or expose raw database rows in public issue trackers. Keep personal data, artwork, database dumps, credentials and local storage state out of Git and build archives. The endpoint does not log customer payloads, filenames or provider details; additional monitoring must preserve that boundary.

### Orphan reconciliation: pending

No scheduled inventory reconciliation or orphan-expiration job is implemented.

A future job should compare aged quarantine objects against the complete set of referenced artwork keys in the correct database, account for writes still in progress, and recheck ownership immediately before deletion. Use an owner-approved grace period and maintain a private audit of decisions. Do not delete an object just because one temporary read found no matching quote.

Accepted quote files need a different retention rule from confirmed orphans. Avoid a broad bucket lifecycle rule over `quarantine/quotes/`: accepted, still-unreviewed files use that prefix too. Reconciliation must distinguish them before applying any expiry.

## Retention, access and recovery

Retention periods for accepted enquiries and artwork remain an owner decision. No automatic expiry for those records or files is implemented. Establish who can access requests, how long they remain necessary, how corrections/deletions are handled, and how backups follow the same policy.

When adding a deletion process, cover the main columns, JSON payload, linked object, exports and relevant backups. When recovering data, verify both the quote record and its linked object. Source-code backups do not back up customer records or artwork.

Decide the backup/restore method and test it with controlled data in the relevant environment. This document does not claim that a production backup or restore has been verified.

## Formspree notifications

The owner supplied `https://formspree.io/f/xzerbjjy` and selected `info@promomerch.ca` on November 12, 2026. `FORMSPREE_ENDPOINT` is a server-side runtime setting. The endpoint ID is public configuration, not a secret. The recipient is controlled in Formspree's dashboard; source code cannot verify or change it.

The existing React form posts to `/api/quotes`. After validation and private persistence, the Worker sends JSON to Formspree with `Accept: application/json`. This adapts the React/AJAX integration to the existing backend; the browser does not use a second `useForm` submission path. No additional package is required.

The notification includes the reply-to `email`, name, organization, phone, localized subject, saved reference, language, product names/IDs/quantities, project brief, CAD budget/basis, delivery preferences, reorder details and separate consent choices. Artwork is described as privately held for review. File bytes, filenames, bucket keys, service credentials and request idempotency keys are not sent.

The saved quote row is the durable notification record. An atomic conditional update claims each attempt before sending. No schema migration is needed.

| State | Meaning and recovery |
| --- | --- |
| `not_configured` | Endpoint absent. Saved request remains available to operators. |
| `pending` | Quote saved; notification not yet claimed. An identical retry can claim it. |
| `submitting` | Claimed by a request. Concurrent retries do not send again. A worker termination can leave this state requiring reconciliation. |
| `accepted` | Formspree returned successful HTTP status and JSON `ok: true`. Identical retries do not send again. This is not inbox-receipt evidence. |
| `failed` | Definite 4xx rejection or invalid endpoint configuration. An unchanged customer retry may make another attempt using the same quote reference. Fix dashboard/endpoint settings first when applicable. |
| `unknown` | Network timeout, 5xx, malformed acknowledgement, or failed state persistence. Do not automatically resend: reconcile in Formspree using the reference. |

Requests use a 10-second provider timeout, manual redirect handling (required by Workers), and only accept HTTPS Formspree `/f/` URLs. Redirects are not followed. Bounded logs record only failure category, HTTP status or exception class, never payloads or provider response bodies. The existing source-attempt limit also bounds retries. No background scheduler, automatic backlog drain or customer autoresponder is added. Operators must monitor unresolved records through approved private tooling. For an uncertain attempt, verify the Formspree submission before changing its state or replaying; no exactly-once external-delivery guarantee is claimed.

In Formspree, verify the form's email action targets **info@promomerch.ca**, complete any recipient verification, and check spam/domain/captcha settings against the actual hosted request. The server route does not invent a browser captcha token. If Formspree requires one, keep the request saved and resolve the provider configuration or implement its supported challenge flow. Both EN/FR integration-test notifications were confirmed received by the owner on November 12, 2026; see FORMSPREE_VERIFICATION.md. Maintain account quota and recipient settings before public launch.

Optional marketing consent is recorded, not connected to a marketing list. The EN/FR privacy notice identifies Formspree's processing of contact/project details.

Official references checked November 12, 2026:
- https://github.com/formspree/formspree-js/tree/main/packages/formspree-react
- https://formspree.io/blog/type-safe-form-pipeline/
- https://help.formspree.io/articles/building-your-form/special-fields
- https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address/

## WHC and other hosting targets

This is currently a Cloudflare Workers/D1/R2 application. It is not a drop-in PHP package or a static export that can be uploaded unchanged to a conventional web root.

Moving the full application to WHC or another host requires checking the chosen service's runtime and storage capabilities, then adapting:

| Current dependency | Portability work |
| --- | --- |
| `cloudflare:workers` environment and Worker entry | A supported server runtime and environment/configuration adapter. |
| Drizzle D1 driver and D1 prepared statements | A compatible database driver, schema migration path and atomic uniqueness/rate-limit behavior. |
| R2 binding methods | Private object-storage access with equivalent upload, review, ownership and deletion handling. |
| Cloudflare client-IP header | A verified ingress/proxy trust boundary and safe source identification. |
| Worker request handling and same-origin API | A deployed endpoint preserving validation, multipart limits, idempotency and truthful failures. |
| Sites migration/release process | A tested deployment, migration and rollback procedure for the new environment. |

A split deployment could retain the API/storage on Cloudflare while hosting an adapted front end elsewhere, but the present strict same-origin check requires deliberate proxy/origin design. Do not loosen it or trust arbitrary forwarded headers merely to make a cross-host setup work.

HTML, copy, images and React components can be reused, but reproducing the visual site alone does not preserve quote persistence. Verify the complete submission and artwork flow on the selected target before switching traffic.

## Reproducible implementation checks

Run these from the repository root with installed dependencies:

```sh
node --experimental-strip-types scripts/test-quote.mjs
node node_modules/typescript/bin/tsc --noEmit
```

The quote tests cover validation/file boundaries and exercise the real route with in-memory provider doubles, including acknowledgement failures, ownership reconciliation and early rate admission. They do not establish deployed D1/R2 connectivity or mail delivery.

Keep release evidence separate for the actual hosted record, private artwork object, retry behavior, access restrictions and operational notification path. Use controlled test data and avoid copying customer details into release records.

