# Original-logo cleanup — November 12, 2026

The owner retained the original 1A Refined Slash identity and requested clean, aligned lettering. The eight SVG and four PNG production assets were corrected and published on WHC.

## Changes

Native letter paths now use consistent cap heights, baselines and rounded overshoots. The lowercase m counters, c opening, e curve and spacing were refined. Repeated o/r letters share their outlines. The M retains its diagonal incision with the small adjacent notch closed. English and French descriptor tracking aligns the visible outside edges to the full wordmark without stretching glyphs.

Reproduce all variants with `node scripts/build-brand.mjs` after installing the locked dependencies. The shared descriptor outline source is `assets/brand/descriptor-outlines.json`; its existing licence remains in `public/brand/FONT-LICENSE.txt`.

## Verification

| Check | Outcome |
| --- | --- |
| Straight-letter baseline and cap height | PASS — y=156 / y=0 |
| Rounded lowercase extents | PASS — y=42 to y=158 |
| Repeated letters | PASS — identical o/r path geometry |
| EN/FR descriptor outer alignment | PASS — x=0 to x=1211, within 0.001 SVG unit |
| Native SVG content | PASS — paths and transparent mask; no embedded images or runtime text |
| Raster exports | PASS — four 1600 × 318 PNGs with alpha |
| Original reference | PASS — unchanged SHA-256 `db7b7f6e4b969b8c116e1f0344eeaa9c9766037742f7c0a52efb74c399aac67b` |
| WHC installed files | PASS — all 12 hashes verified before and after installation |
| Public HTTPS files | PASS — all 12 returned 200 and matched reviewed source bytes |
| Live browser placement | PASS — EN 1440/360 px and FR 390 px; header/footer loaded, preserved proportions, no CSS transform, no page errors or horizontal overflow |

Local review captures and machine-readable measurements are in ignored `outputs/logo-cleanup/`.

## Release and rollback

This is a static asset patch on top of the WHC launch build recorded in WHC_LAUNCH_VERIFICATION.md. The application build ID and compiled code are unchanged. The launch archive is the historical base and does not contain this later patch.

- Patch archive: `logo-cleanup-assets-20261112.tar.gz`.
- SHA-256: `673ff2f2654b724762bd5f63b3f3789fd41b70e008a6beee9a8bf0cb624076a8`.
- Destination: `~/promomerch-app/public/brand/`.
- Previous assets: `~/promomerch-staging/logo-before-cleanup-20261112/`.
- Private installation result and file checksums: `~/promomerch-staging/logo-cleanup-result.json`.

The installer verified the archive and original file hashes, backed up all twelve previous assets, and atomically replaced each file. Restore those twelve files from that backup to roll back this patch. The next complete build takes the corrected assets from `public/brand/`.

No application rebuild, form submission or database change was needed for this asset-only update. The separate private Sites preview was not republished. The unchanged favicon remains the dedicated small-format derivative.
