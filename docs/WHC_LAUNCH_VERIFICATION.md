# WHC public launch — November 12, 2026

**LIVE:** https://promomerch.ca/en/ and https://promomerch.ca/fr/.

The owner authorized connecting the domain and hosting at WHC and publishing publicly. The existing WHC hosting plan and domain were reused; no purchase or nameserver transfer was needed.

## Release

| Item | Verified value |
| --- | --- |
| Runtime | Vinext/React standalone, Node 24.22.1, LiteSpeed/CloudLinux |
| Final archive | `promomerch-whc-final-20261112.tar.gz` |
| Archive SHA-256 | `4fe1b7ace69614f6632a6f0afde5baaed97b12a363c00b170fbd99d81dc01cf9` |
| Application build ID | `e3a8f7c0-465a-4cf8-8b32-15d82a78b7a9` |
| Apex DNS | A `51.161.57.68`, TTL 300 |
| www DNS | CNAME `promomerch.ca.` retained |
| Nameservers | Existing WHC parking1/parking2 retained |
| TLS | Valid AutoSSL certificate verified for apex and www, without disabling verification |
| Storage | Private SQLite database and quarantined artwork outside the public document root |

The final archive was checksum-verified on WHC before extraction and installation. All **2,792 files** in the extracted release matched their installed counterparts byte-for-byte. It contains compiled code, assets, dependencies and deployment operations, not quote data or credentials. The private review at `promomerch.dimagrafov.chatgpt.site` remains separate and owner-private.

## Checks

| Check | Outcome |
| --- | --- |
| Shared quote/notification regressions | PASS — 22 tests |
| WHC SQLite, file-permission and ingress tests | PASS — 3 tests |
| TypeScript and production WHC build | PASS |
| Route/canonical sweep | PASS — all 98 EN/FR paths returned 200 with their correct public canonical |
| Sitemap and robots | PASS — public content included, production origin used |
| Missing/private paths | PASS — nonexistent route, database, artwork, environment and operations probes denied |
| English desktop / French mobile | PASS — 1440 px / 390 px; hydrated, correct language, no horizontal overflow or page errors |
| Domain redirects | PASS — WHC origin HTTP → HTTPS, www → apex, preserving the path |
| Mail DNS continuity | PASS — existing Forward Email MX and TXT/SPF preserved |
| Live client-source trust | PASS — forged client headers did not select the rate key; external and server-side requests produced distinct hashed keys |
| Live duplicate handling | PASS — both exact retries returned 200, the original reference and accepted notification state |
| Artwork privacy | PASS — English test stored as quarantined/unreviewed, 68 bytes, file mode 0600 |
| Backup read/verification | PASS — SQLite backup opened separately and linked artwork bytes matched |

Authoritative WHC nameservers plus public resolvers 1.1.1.1 and 8.8.8.8 returned the new web address. Public HTTPS was also checked using ordinary DNS. Some caches may retain the previous parking address until their earlier TTL expires; that is distinct from the verified WHC origin.

## Live notifications and receipt

| Language / flow | Reference | Persistence | Formspree | Inbox |
| --- | --- | --- | --- | --- |
| English quote with PNG | PM-A2EA5FD2027E | PASS | accepted | PASS — owner confirmed |
| French reorder | PM-C85C73545770 | PASS | accepted | PASS — owner confirmed |

These were clearly labelled launch tests, not customer orders. They were submitted through the real production forms in Chrome and independently confirmed in the private WHC database. The owner confirmed both emails arrived at **info@promomerch.ca**. Identical retries did not resend notifications. Uploaded artwork was retained privately and was not attached to the emails.

## Boundaries

MerchMatters.ca and other hosted sites were not migrated. No customer announcement, search-console submission, indexing claim, phone-routing test or verified supplier-SKU expansion is included. The public catalogue remains an honest product-family catalogue. Existing legal seller and content were preserved.

The manual private backup was verified; no new recurring backup or retention schedule was configured. There is still no public/admin quote inbox or automated malware review. See OPERATIONS.md and WHC_DEPLOYMENT.md for operator handling.
