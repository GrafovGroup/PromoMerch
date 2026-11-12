# PromoMerch Brand Guide

Updated for the implemented production asset set on 12 November 2026. See the [media manifest](MEDIA_MANIFEST.md) for image provenance, source hashes, export settings and verification details.

## Selected identity

**1A — Refined Slash** is the selected direction, chosen by the owner “for now.” It is the working identity used for the website. This selection replaces the earlier orange PM-monogram exploration. Keep the selected direction; do not introduce a standalone primary emblem or reopen unrelated logo concepts.

The primary mark reads **PromoMerch**, without `.ca`. The very heavy geometric wordmark uses navy **Promo**, cobalt **Merch**, and one rising cut through the capital **M**. The incision remains a simple diagonal cut, not an arrow, lightning bolt or swoosh.

The English descriptor is exactly **BRANDED MERCHANDISE**. It sits underneath the wordmark with its outer edges aligned to the lettering above. The exported descriptor uses adjusted tracking rather than stretched characters. The full lockup is one asset; do not rebuild the descriptor with browser text or place it beside the wordmark.

## Preserved reference and reconstruction

The selected raster concept board is [promomerch-1a-refined-slash-reference.png](../assets/brand/promomerch-1a-refined-slash-reference.png). Its SHA-256 remains:

`db7b7f6e4b969b8c116e1f0344eeaa9c9766037742f7c0a52efb74c399aac67b`

The original PNG is unchanged. It contains the exploration heading, a white presentation background, a large colour treatment and a smaller black treatment. Preserve it for comparison; use the separate production files below for placement.

The production wordmark is a **manual editable-vector reconstruction** of that reference. Its SVGs contain native paths and a mask, not an embedded raster image. The reconstruction preserves the heavy lettering, colour split, rising M slash, absence of `.ca` and aligned descriptor.

It is not a pixel-exact trace, and the original source typeface has not been identified. Letter contours, spacing and descriptor typography differ slightly from the raster. The files implement the selected design direction for the website; review these details with the owner before commissioning external print or physical merchandise production. Do not describe the reconstruction as the original source artwork or a newly approved logo selection.

## Letter alignment and reproducible exports

The November 12 cleanup keeps the original 1A identity. The wordmark uses one baseline at y=156, capitals/ascender at y=0, and flat lowercase tops at y=44. Rounded lowercase contours deliberately extend to y=42/158 for optical alignment. Both o letters and both r letters share exactly the same outlines. The lowercase m has balanced counters; the c aperture is symmetric. The M slash is continuous, with its former inner-corner notch closed.

The descriptor's visible outer edges align to x=0 and x=1211 within the wordmark group. Its font outlines are unchanged in proportion; only tracking/positioning is fitted.

Run `node scripts/build-brand.mjs` from the repository root with locked dependencies installed to regenerate all eight SVGs and four transparent PNGs. Shared letter geometry lives in that script; licensed descriptor outlines live in `assets/brand/descriptor-outlines.json`. No installed font is needed.

## Colour

| Role | Production value |
|---|---|
| Navy: Promo, descriptor, primary headings, dark surfaces | `#062A54` |
| Cobalt: Merch, primary accents, icon tile | `#2454FF` |
| White: reversed wordmark and descriptor | `#FFFFFF` |
| Black: single-colour production treatment | `#000000` |

These are the flat production values used in the SVGs, not a claim that every pixel in the original generated board matches them. Preserve these values when exporting. Do not add gradients, bevels, shadows, outlines or texture to the logo. Check actual interface text, focus states and button contrast independently of the logo palette.

## Typography and licence

| Element | Actual implementation |
|---|---|
| PromoMerch wordmark | Manually drawn vector contours; no runtime font dependency |
| English and French descriptors | Outlined **DejaVu Sans Bold**, with tracking adjusted to the wordmark width |
| Website interface | `Arial, Helvetica, sans-serif`, declared in `app/globals.css` |

The descriptor font's applicable Bitstream Vera/DejaVu licence and notices are retained in [FONT-LICENSE.txt](../public/brand/FONT-LICENSE.txt). Keep that file with distributed asset packages. DejaVu Sans Bold was used for the reconstruction's descriptors; it is not claimed to be the original reference typeface. The supplied outlines render without installing the font.

The website uses the visitor's available system Arial/Helvetica/sans-serif font through CSS. It does not bundle an Arial or Helvetica font file. Keep body copy readable and naturally cased; the logo's extreme weight is specific to the mark.

## Production logo files

Repository files live under `public/brand/`; the same paths without the `public` prefix are their website URLs. Prefer SVG for the website and vector-capable production workflows. PNGs are transparent raster exports for applications that cannot use SVG.

| Treatment | English file | French file | Intended placement |
|---|---|---|---|
| Navy/cobalt SVG lockup | [`public/brand/logo-en.svg`](../public/brand/logo-en.svg) | [`public/brand/logo-fr.svg`](../public/brand/logo-fr.svg) | White or quiet light backgrounds |
| All-white SVG lockup | [`public/brand/logo-white-en.svg`](../public/brand/logo-white-en.svg) | [`public/brand/logo-white-fr.svg`](../public/brand/logo-white-fr.svg) | Navy or other sufficiently dark backgrounds |
| Black SVG lockup | [`public/brand/logo-black-en.svg`](../public/brand/logo-black-en.svg) | [`public/brand/logo-black-fr.svg`](../public/brand/logo-black-fr.svg) | Single-colour black reproduction |
| Navy/cobalt transparent PNG | [`public/brand/logo-en.png`](../public/brand/logo-en.png) | [`public/brand/logo-fr.png`](../public/brand/logo-fr.png) | Raster-only applications |
| All-white transparent PNG | [`public/brand/logo-white-en.png`](../public/brand/logo-white-en.png) | [`public/brand/logo-white-fr.png`](../public/brand/logo-white-fr.png) | Raster-only applications on dark surfaces |

Full lockup SVGs use the viewBox `0 0 1227 244`, approximately **5.03:1**. The four PNG exports are **1600 × 318 pixels** with alpha transparency. Black is currently supplied as SVG; there are no black PNG exports in this set.

The descriptor-free compact wordmarks serve both languages:

- Colour: [`public/brand/wordmark.svg`](../public/brand/wordmark.svg), web URL `/brand/wordmark.svg`.
- White: [`public/brand/wordmark-white.svg`](../public/brand/wordmark-white.svg), web URL `/brand/wordmark-white.svg`.

Compact SVGs use the viewBox `0 0 1227 176`, approximately **6.97:1**. They are available for constrained placements where a descriptor-free wordmark is appropriate. Do not crop the descriptor from a full lockup or use the favicon as the primary site logo. The current website retains the full aligned descriptor in its header and footer.

## Placement, transparency and size

All full and compact logo files have transparent backgrounds. The SVG M slash is a **transparent mask**: the background shows through it. White exports use white lettering with the same transparent incision; no visible white or dark rectangle should surround the mark. Place colour artwork on a plain light surface and white artwork directly on a plain dark surface. Avoid busy photography behind the cut or descriptor.

Preserve the aspect ratio using a width and automatic height. Do not stretch, skew, rotate or separately resize the descriptor. The existing SVG padding is export padding, not the full required clear space.

### Clear space

Use at least **one-quarter of the capital P height** as clear space on every side, measured outside the visible lockup. In the supplied vectors, the P height is 156 units, so the clear-space unit is **39 units**. At a 320-pixel full lockup width, this is approximately **10 pixels** per side. Use at least **8 CSS pixels** around small interface placements even when the proportional calculation is smaller. Keep navigation labels, borders and neighbouring graphics outside this area.

### Practical display sizes

These are recommendations for comfortable legibility derived from the exported geometry, not new mandatory layout constraints or a claim that every current responsive placement has already passed visual review.

| Asset | Recommended CSS width | Preferred normal size | Reason |
|---|---:|---:|---|
| Full EN/FR lockup with descriptor | **260 px** for comfortable descriptor legibility | **320 px or wider** where space permits | The descriptor's 38-unit cap height is about 8 px at 260 px wide and 10 px at 320 px wide |
| Compact wordmark without descriptor | **120 px** | **160–240 px** for constrained navigation | Preserves readable letterforms when the descriptor cannot be supported |
| Browser favicon | Use supplied **16/32/48 px** exports or SVG | Browser-selected | Dedicated M/slash derivative is designed for this role |

The current build uses the full lockup at narrower mobile widths to preserve the owner's requested wordmark with its aligned slogan underneath; the footer also retains the full lockup. **260 pixels is a legibility recommendation, not a hard minimum that requires changing this presentation.** A large source PNG or a high-density display does not increase the descriptor's physical CSS size. For example, a 177-pixel full lockup has a descriptor cap height of about 5.5 pixels. Review both languages at actual display size, including the narrowest supported viewport. Mobile sizing can be refined after that review; do not automatically remove the slogan or introduce a different mark. The supplied compact wordmarks remain available for other constrained uses or a later reviewed placement change.

For print, use the vector file and check the descriptor and slash against the actual decoration method and substrate. Do not assume a screen recommendation guarantees legibility in embroidery, engraving or small-format printing. Complete the reconstruction review before approving external production.

## Favicon and touch icons

The favicon is a white M/slash on a cobalt rounded tile. It is a functional small-format derivative, not a new primary emblem. The existing set is:

| Repository file | Format and dimensions | Web URL |
|---|---|---|
| [`public/favicon.svg`](../public/favicon.svg) | Native scalable SVG | `/favicon.svg` |
| [`public/favicon.ico`](../public/favicon.ico) | Genuine ICO with 16 × 16, 32 × 32 and 48 × 48 entries | `/favicon.ico` |
| [`public/favicon-16.png`](../public/favicon-16.png) | PNG, 16 × 16 | `/favicon-16.png` |
| [`public/favicon-32.png`](../public/favicon-32.png) | PNG, 32 × 32 | `/favicon-32.png` |
| [`public/favicon-48.png`](../public/favicon-48.png) | PNG, 48 × 48 | `/favicon-48.png` |
| [`public/apple-touch-icon.png`](../public/apple-touch-icon.png) | PNG, 180 × 180 | `/apple-touch-icon.png` |
| [`public/icon-192.png`](../public/icon-192.png) | PNG, 192 × 192 | `/icon-192.png` |
| [`public/icon-512.png`](../public/icon-512.png) | PNG, 512 × 512 | `/icon-512.png` |

Use root-relative icon URLs so nested routes and both locales load the same files. Confirm actual browser and touch-icon appearance during integrated site QA; file generation and format checks alone do not establish cross-browser coverage.

## English and French

Keep **PromoMerch** unchanged in both languages. The English descriptor is selected. **ARTICLES PROMOTIONNELS** is implemented as the French localization default and has not yet been separately owner-approved as a slogan. Record any later approval or replacement in the decision log. Do not describe the French wording as an already approved historic brand slogan.

Use `logo-en` files on English pages and `logo-fr` files on French pages, including the appropriate colour or white variant. The shared compact wordmarks have no descriptor and therefore need no locale-specific visual version. Give the linked logo an accessible home label appropriate to the current language.

## Website expression and imagery

Use a wide, clean, modern layout with strong merchandise imagery, clear hierarchy and purposeful spacing. Navigation labels and buttons are uppercase; paragraphs remain naturally cased. Use rounded buttons, visible keyboard focus and a clear French-language control in the top bar.

Keep decorative arrows, ornamental swooshes, logo gradients and unrelated emblems out of the design. Use the white footer logo directly on its dark surface. The generated merchandise photographs illustrate collections, not verified supplier inventory, completed customer work or product certifications. Their original files, optimized website exports and provenance are documented in [MEDIA_MANIFEST.md](MEDIA_MANIFEST.md).
