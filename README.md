# PromoMerch

Bilingual, quote-led merchandise website for the planned PromoMerch.ca brand, built from the selected **1A — Refined Slash** identity and the complete Grafov Group universal master-prompt baseline.

## Review and source

- **Private review destination:** https://promomerch.dimagrafov.chatgpt.site
- **GitHub backup:** https://github.com/GrafovGroup/PromoMerch
- **Sites project:** `appgprj_6af541e1e5788191adfbb1e9d18c53cd`
- **Live brand domain:** PromoMerch.ca is a launch target. This build does not activate its DNS or migrate MerchMatters.ca.

The publishing tool's deployment record is authoritative for the live version. A source commit or archive alone does not prove a deployment succeeded. The review site remains owner-private and `noindex`.

## Implemented

- Equivalent English and Québec French routes: 49 page pairs, including 24 merchandise families, six categories and 14 supporting pages in each language.
- Searchable catalogue, category filters, sorting, a persistent product shortlist, editable quantities and an equivalent-page language switch.
- Quote, project-brief and reorder enquiry journeys; contact and service pages; artwork/planning guides; privacy, terms and accessibility pages.
- Actual private D1 request storage and R2 artwork storage, server validation, idempotent retries and persistent abuse limits.
- Formspree quote notifications with bilingual details, durable attempt status, duplicate-send protection and truthful saved-request/error confirmations. **Live EN/FR submissions are accepted by Formspree, and the owner confirmed both test emails arrived at info@promomerch.ca.** See [Formspree verification](docs/FORMSPREE_VERIFICATION.md).
- Colour, white and black bilingual logo exports; compact wordmarks; real ICO/PNG/SVG favicons; seven illustrative merchandise image collections with original sources preserved.
- Metadata, canonical/language alternatives, structured navigation data, localized missing-page content and responsive layouts.

The catalogue contains **product families and illustrative collection imagery**, not a supplier inventory feed. Final models, materials, prices, branding and availability are confirmed through a quote.

## Runtime

This implementation uses **Vinext, React and TypeScript on Cloudflare Workers**, with **D1** for private quote records and **R2** for private artwork. It is prepared for the Sites runtime.

The source is recoverable and can be adapted for another host. **It is not a drop-in static/PHP build for WHC.** Moving there requires a supported server runtime or a frontend export plus replacement quote/storage adapters. See [operations and portability](docs/OPERATIONS.md).

## Local setup

Use Node 22.13 or newer and the committed lockfile. In the managed Sites environment, use the Sites dependency helper and preview workflow. In an ordinary development checkout:

```sh
npm ci
npm run build
```

Generate a new migration only when the schema changes:

```sh
npm run db:generate
```

After the first build, apply the committed initial migration to the local binding:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_tired_weapon_omega.sql
```

For the managed review browser, use `sites-preview start` with this checkout's absolute path; use its exact returned URL. Sites applies the committed migrations to the hosted binding during publication.

```sh
node node_modules/typescript/bin/tsc --noEmit
node --experimental-strip-types scripts/test-quote.mjs
npm run lint
```

Keep customer submissions, artwork, secrets, local database files, build outputs and environment credentials outside Git. The public `assets/` directory contains brand and generated marketing sources, never uploaded customer artwork.

## Project records

| Record | Purpose |
| --- | --- |
| [MASTER_PROMPT.md](MASTER_PROMPT.md) | Full inherited project brief and delivery requirements |
| [AGENTS.md](AGENTS.md) | Instructions for subsequent work |
| [PROJECT_STATUS.md](docs/PROJECT_STATUS.md) | Actual implementation state and resume point |
| [DECISIONS.md](docs/DECISIONS.md) | Owner choices and implementation decisions |
| [BUILD_VALIDATION.md](docs/BUILD_VALIDATION.md) | Checks performed and practical limitations |
| [OPERATIONS.md](docs/OPERATIONS.md) | Quote storage, migrations, uploads, mail integration and hosting portability |
| [MEDIA_MANIFEST.md](docs/MEDIA_MANIFEST.md) | Asset provenance, hashes, exports and logo fidelity |
| [CONTENT_REVIEW.md](docs/CONTENT_REVIEW.md) | Bilingual content and business-claim review |
| [MERCHMATTERS_MIGRATION.md](docs/MERCHMATTERS_MIGRATION.md) | Later legacy transition procedure |
| [Universal baseline](docs/standards/GRAFOV_GROUP_UNIVERSAL_CODEX_MASTER_PROMPT_v2.md) | Unchanged November 4 universal v2.0 source |
| [UNIVERSAL_ALIGNMENT.md](docs/UNIVERSAL_ALIGNMENT.md) | Baseline mapping and project-specific choices |

## Brand and launch dependencies

The original selected concept board is unchanged at `assets/brand/promomerch-1a-refined-slash-reference.png`. Production vectors are an editable reconstruction of that direction, with minor contour/spacing differences documented in the media manifest. The English descriptor is **BRANDED MERCHANDISE**; the French implementation uses **ARTICLES PROMOTIONNELS**.

Before a customer launch: verify the contact inbox and phone routing, connect and test email notifications, confirm the legal seller and operational policies, finalize the real product/supplier catalogue, and authorize the chosen public hosting/domain setup. The MerchMatters migration, redirects, search-account submissions and customer announcements remain separate release work.
