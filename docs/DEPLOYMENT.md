# Deployment

## Project mapping and access

| Item | Value |
| --- | --- |
| Sites project | `appgprj_6af541e1e5788191adfbb1e9d18c53cd` |
| Assigned Sites URL | https://promomerch.dimagrafov.chatgpt.site |
| GitHub source | https://github.com/GrafovGroup/PromoMerch |
| Access | Owner-private; preserve this audience when publishing |
| Indexing | `noindex`; this is a private review release |
| Domain changes | No DNS change or PromoMerch.ca cutover is included |

The project ID in [.openai/hosting.json](../.openai/hosting.json) is authoritative. Reuse it; do not create another Site for this checkout. The assigned URL and this guide do not prove a deployment succeeded. Record the release tool's actual result in [PROJECT_STATUS.md](PROJECT_STATUS.md).

## Source histories

GitHub contains the business's repository. Sites maintains a separate source repository/history through its source helper. Do not assume the two repositories have identical commit hashes.

Keep the reviewed application and documentation synchronized to both authorized destinations. Use the exact source commit, saved version and deployment identifiers returned by the corresponding successful tooling. Never invent a hash, substitute a GitHub commit for a Sites commit, or describe an unpushed local commit as published.

## Build, package and publish

Use the installed Sites skill's current workflow and helper paths. Here, `<sites-plugin-root>` means that installed plugin's directory, not a new file to create.

1. **Open the existing project.** Read the hosting manifest, retain the existing project ID and owner-private audience, and obtain source access for that project through Sites. Open/synchronize through the source helper. Preserve unrelated work.
2. **Prepare the release.** Keep `d1: "DB"` and `r2: "BUCKET"`; do not add a static deployment field. This application needs a Worker endpoint. Generate/review schema changes before building, as described in [OPERATIONS.md](OPERATIONS.md).
3. **Run applicable checks and build.** Quote regressions use `node --experimental-strip-types scripts/test-quote.mjs`; TypeScript uses `node node_modules/typescript/bin/tsc --noEmit`. The Sites build entry is `node <sites-plugin-root>/scripts/build-site.mjs`. Preserve the starter's `sites()` build integration. The resulting server artifact is `dist/server/index.js`.
4. **Package the exact source state.** Run `node <sites-plugin-root>/scripts/site-workflow.mjs --project-id appgprj_6af541e1e5788191adfbb1e9d18c53cd`. Supply its workflow JSON through stdin with the returned credential, prior source result when available, remaining checks/builds as ordered command arrays, and an absolute archive path outside the checkout or under ignored `outputs/`. The helper owns source preparation, commit/push and packaging. Credentials must not appear in command arguments, files or logs.
5. **Publish privately.** For the confirmed owner-private Site, pass the helper's verified project ID, exact `commit_sha` and unchanged archive to `save_version_and_deploy_private`. If a matching version is already saved, use `deploy_private_site_version` with its returned version ID instead of saving it again. Preserve the current audience.
6. **Record the actual outcome.** Continue an existing pending deployment rather than starting duplicates. Poll status only while it is non-terminal. Record the returned version, commit, deployment result and literal URL. A saved version is not a completed deployment.

Sites applies pending hosted D1 migrations before uploading the Worker. Local preview and production storage are separate. Keep build archives free of customer submissions, artwork, local databases, secrets and checkout-local tool state.

Do not mark quote intake verified solely because the build or deployment succeeded. Record controlled checks for a persisted quote, private artwork, retry behavior and access restrictions separately. Email delivery remains unconfigured unless an integration and inbox test are explicitly completed.

## Rollback

Select an existing saved version from Sites history and confirm its source and schema compatibility. Deploy that exact saved version using the private deployment operation; preserve owner-private access.

A Worker rollback does not automatically undo D1 migrations, delete newer quote rows or restore an earlier R2 state. A failed deployment may already have applied migrations. Inspect schema state before reverting code, and use reviewed forward migrations when necessary. Do not edit applied migration history to simulate a rollback. Keep customer records and files intact.

## Environment and future hosting

[.env.example](../.env.example) intentionally contains comments only. D1 and R2 are platform bindings, not working connection strings to paste into a local environment file. Mail credentials and an email outbox are not implemented.

This release targets Cloudflare Workers with D1/R2. Moving it to WHC requires a supported server runtime, database/storage adapters, a trustworthy source-IP boundary, and a tested migration/deployment process. It is not a drop-in PHP or static upload. See [OPERATIONS.md](OPERATIONS.md) for those requirements and the separate notification/retention work.

