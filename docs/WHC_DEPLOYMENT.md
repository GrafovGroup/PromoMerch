# PromoMerch on WHC

The owner authorized domain connection, WHC hosting and public publication on November 12, 2026. This is a separate production target from the owner-private Sites review. It does not migrate MerchMatters.ca or change mail providers.

## Runtime and layout

- WHC Web Hosting Pro, cPanel/CloudLinux, LiteSpeed, Node 24.22.1.
- Public origin: `https://promomerch.ca`; `www` and HTTP redirect to that origin after SSL provisioning.
- Existing WHC nameservers retained. Apex A: `51.161.57.68`, TTL 300. Existing `www` CNAME targets the apex. Forward Email MX, verification TXT and existing SPF remain unchanged.
- `~/promomerch.ca`: public domain root with the CloudLinux Passenger settings and `hosting/whc/web.htaccess` rules.
- `~/promomerch-app`: standalone application, outside the domain root. Startup: `app.cjs`, application URI `/`, production mode.
- `~/promomerch-data`: private SQLite database and quarantined artwork. Directory mode 0700; database/artwork mode 0600. Never copy this directory into a source archive or public web root.
- `~/promomerch-staging`: private release archives, checksums and operational verification.

The original Vinext/React application and shared quote logic remain intact. `PROMOMERCH_HOSTING=whc` selects the Node build and aliases the Workers bindings to `hosting/whc/storage.mjs`. The adapter implements the prepared-statement operations used by Drizzle and quote intake against Node's SQLite. It retains the original schema, unique request keys, atomic rate counters and notification claims. Artwork uses a private filesystem directory and the same quarantine keys; its review metadata remains in the database.

The WHC build sets the production origin and enables indexing for public content. The ordinary Sites build keeps its private preview origin/noindex behavior. No SEO account submission or indexing is implied by those settings.

## Build and release

With Node 24 and the locked dependencies installed:

```sh
node scripts/test-quote.mjs
node scripts/test-whc.mjs
node node_modules/typescript/bin/tsc --noEmit
npm run build:whc
```

The deployable output is `dist/standalone/`, including runtime dependencies and the `operations/` folder. Build locally; the hosting account does not need Vite or the complete source checkout. Generate a SHA-256 checksum for the release archive and verify it on the server before unpacking. On macOS use `tar --no-xattrs --no-mac-metadata` to omit Finder metadata.

Create the app with WHC's **Setup Node.js App**, Node 24, production mode, application root `promomerch-app`, URL `promomerch.ca/`, startup `app.cjs`. Set:

```text
PROMOMERCH_DATA_DIR=/home/CPANEL_USER/promomerch-data
PROMOMERCH_ORIGIN=https://promomerch.ca
FORMSPREE_ENDPOINT=https://formspree.io/f/xzerbjjy
```

Replace `CPANEL_USER` with the actual account. Set the private directory's permissions before initialization. Run the deployed `operations/init-db.mjs` with Node 24 and `PROMOMERCH_DATA_DIR` set. This explicitly applies the recorded schema once; requests do not create tables. Add future migrations to the initialization process rather than editing the applied migration.

Keep the CloudLinux-generated Passenger/environment blocks intact. Put the versioned web rules above them after confirming SSL covers both apex and www. Code directories use 0755 and files 0644 so LiteSpeed can discover the application; private data retains its stricter permissions. Restart only `promomerch-app` through the Node selector. Do not change global PHP settings, other domains or their certificate bindings.

For local smoke testing, initialize a disposable private database and run `dist/standalone/app.cjs` with an explicit localhost `PROMOMERCH_ORIGIN` and `PORT`. Omit `FORMSPREE_ENDPOINT` to avoid sending notifications.

## LiteSpeed-specific details

LiteSpeed prepends its own request listener. The entrypoint wraps only Vinext's last handler and preserves the loader listener; removing all listeners breaks dispatch. Built-in ESM exports are synchronized before loading Vinext. The process does not force a restrictive umask on LiteSpeed's Unix socket. Private storage sets its own explicit modes.

WHC's loader exposes loopback as `socket.remoteAddress`. The domain's rewrite rule derives `PM_CLIENT_IP` from server `REMOTE_ADDR`; `RequestHeader` supplies it to the application. LiteSpeed can append its value to a client-supplied header even with `set`, so the adapter validates only the final value and removes all untrusted proxy headers. A missing or invalid trusted value uses the bounded fallback, never an arbitrary forwarded address. Live spoof tests must be repeated if this ingress configuration changes. The Node app must remain behind this configured domain ingress.

AutoSSL initially selected a pre-existing certificate that did not cover PromoMerch. The release workflow recorded certificate-binding metadata, removed only PromoMerch's incorrect virtual-host binding, and requested a fresh AutoSSL certificate. Do not delete a shared certificate or another site's binding to repeat this repair.

## Operations and recovery

Formspree receives the same bilingual notification after a durable save. Accepted provider acknowledgement is separate from inbox receipt; the owner confirmed both earlier Sites test notifications. The WHC launch verification records new-host results separately.

Use authenticated cPanel Terminal/File Manager to inspect the SQLite database or retrieve artwork by its saved key. No public listing, database download or artwork retrieval endpoint exists. Quarantine checks are not malware scanning; keep the review/retention rules in OPERATIONS.md. The filesystem does not automatically generate an operator inbox or retention job.

Before replacing a release, archive its code and web rules privately. Back up the SQLite database with SQLite's backup API (or `VACUUM INTO`), not by copying a live WAL database file alone. Back up the linked artwork directory too. Verify the backup in a separate private directory. Source-code backups do not contain customer data. No automatic data-retention deletion or new scheduled backup is configured by this launch.

Rollback restores the previous code and web rules and restarts only this app. Preserve the data directory and confirm schema compatibility; a code rollback does not roll back quote records or artwork. DNS rollback, if ever required, changes only the apex A record to the recorded previous WHC parking address `149.56.225.6`. Preserve mail records.

## Official references checked November 12, 2026

- [Vinext standalone Node output](https://github.com/cloudflare/vinext)
- [CloudLinux Node selector CLI](https://docs.cloudlinux.com/cloudlinuxos/command-line_tools/)
- [LiteSpeed Node.js](https://docs.litespeedtech.com/lsws/extapp/nodejs/)
- [Apache RequestHeader behavior](https://httpd.apache.org/docs/2.4/mod/mod_headers.html)

See WHC_LAUNCH_VERIFICATION.md for actual release evidence and any remaining limitations.

## November 12, 2026 — content refresh and search verification

The MerchMatters-informed release adds a bilingual portfolio and discovery/brief improvements without changing quote processing. See MERCHMATTERS_REFRESH.md for the exact archive, checksums, backup and live validation. Preserve the Google verification metadata, Bing XML file and IndexNow key file in future public releases; ownership and submission outcomes are recorded in SEARCH_SUBMISSION.md. The separate Sites preview remains private and was not republished.
