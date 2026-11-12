# PromoMerch media manifest

Prepared for the initial website build on 12 November 2026.

## Usage and truthfulness

The seven merchandise photographs are generated editorial illustrations of product categories. They are not verified supplier products, saleable SKUs, photographs of stock, customer work, or evidence of any completed order. Use them for category discovery and merchandise inspiration. Confirm the actual product, availability, decoration, packaging and price through the quote workflow before making a commercial promise.

All scenes were generated for this project with the built-in OpenAI image generation tool. The model name was not provided by that tool. No external stock photography, supplier imagery, recognizable third-party marks, people, certification symbols or customer logos were used. No text or logos were added to the merchandise. Do not use these images as evidence for environmental, technical, sourcing or certification claims.

The source PNGs are retained without edits in `assets/generated/`. Public WebP files are format and size exports only: no objects, branding, backgrounds or colours were retouched after generation. The original tool output files also remain in the generation workspace. Repository source files are the durable copies required to reproduce the public exports.

## Public photograph files

All source PNGs are 1536 × 1024 pixels (3:2). WebP exports use Sharp with quality 84, effort 6; the optional 640-pixel exports use quality 82, effort 6. Resizing preserves the image proportions. The 640-pixel versions round the output height to 427 pixels.

| Public file | Size | Bytes | Intended content |
|---|---:|---:|---|
| `/images/hero-merch.webp` | 1536 × 1024 | 117,248 | Presentation box, tote, tumbler, folded crewneck, notebook and pen |
| `/images/category-apparel.webp` | 1200 × 800 | 78,800 | Hoodie, T-shirt, cap and toque |
| `/images/category-drinkware.webp` | 1200 × 800 | 57,940 | Bottle, mug and insulated tumbler |
| `/images/category-bags.webp` | 1200 × 800 | 129,234 | Tote, backpack and duffel |
| `/images/category-office.webp` | 1200 × 800 | 68,236 | Blank notebooks, pens, cards and card holder |
| `/images/category-tech.webp` | 1200 × 800 | 83,276 | Charging stand, power bank, cable and pouch |
| `/images/category-kits.webp` | 1200 × 800 | 79,228 | Open welcome box with bottle, apparel, notebook and pen; tote alongside |

Matching responsive exports exist at `/images/{name}-640.webp` for every file above. They are 15–28 KB each. Use descriptive alternative text for the visible objects. Avoid alt text that implies a verified SKU, proprietary product or real client job. The same photograph can serve English and French pages with translated alternative text.

## Photograph source records

| Source file in `assets/generated/` | Original tool output filename | SHA-256 |
|---|---|---|
| `hero-merch.png` | `exec-ac1b8b59-30b2-48f1-854e-406ce7edd33d.png` | `07e1c1e6665a887c59ff1a4251078696d06338c5a0225037e265a0f2bbd81173` |
| `category-apparel.png` | `exec-fe6327d0-0fb9-4294-ba77-940cfb68a242.png` | `a6b9fee4629ed9eee45982f1b6b04995a5a16165ac2072fde71b40b333040230` |
| `category-drinkware.png` | `exec-8a03eafd-4a2e-4405-b3ed-176d08cadcaf.png` | `3917cf5397f4e113c10343f09097fe477ee622058de3839a8d6cb1bc343c984b` |
| `category-bags.png` | `exec-39c82719-f61a-4086-9427-18556a762776.png` | `44745da84b82a0fd50e9701cc1cf7947461cdf4f8be930e277de31e5a028eeb0` |
| `category-office.png` | `exec-1cb20f94-eca5-4080-8d5b-1e76ea17cfb1.png` | `bbfe57035ebe684988cb4de6a5bf4c127e23626864e999d7a5f7ffcb3502f322` |
| `category-tech.png` | `exec-bea8f574-677d-43a0-9061-0baa3c2a3323.png` | `d30beeec119743636c73075a99c516817bd42ca1fc18b513894fd9dd37418960` |
| `category-kits.png` | `exec-eec9b3e8-8ba2-4510-b357-57ca25a2318f.png` | `e4f738963daf8e41a9cd9228aa671959775c5c495817fd568552cb37cd05fe6c` |

### Shared generation direction

Use case: product mockup. Asset type: website editorial merchandise category photography. Landscape 3:2 composition. Contemporary high-end commercial photography, highly realistic physical products, tactile details, natural soft directional daylight, soft grounded shadows, premium calm editorial feel. Cohesive palette: navy `#062A54`, cobalt `#2454FF`, natural offwhite, small warm neutral accents. Clean warm offwhite seamless backdrop, no busy environment. No people, graphic overlays, watermarks, text, brands or arrows. This is an illustrative collection, not a photograph of actual inventory.

### Scene directions

- **Hero:** A premium merchandise still-life for a contemporary Canadian branded merchandise studio homepage. Matte navy presentation box partly open, structured natural canvas tote, cobalt insulated tumbler, neatly folded deep navy crewneck sweatshirt, cream notebook and simple pen, arranged as a sculptural collection on low warm ivory plinths. Subtle tactile cotton, paper and powder-coated surfaces. Three-quarter camera viewpoint, objects grouped to fill the frame with generous clean breathing room.
- **Apparel:** Folded heavy navy hoodie, elegantly folded white T-shirt, navy six-panel cap and cobalt ribbed toque on a warm ivory studio surface. Believable cotton and rib-knit texture. Three-quarter top view, layered arrangement, no people or hangers.
- **Drinkware:** Matte deep navy refillable bottle with clean screw lid, simple white ceramic mug and cobalt insulated tumbler with lid on a soft warm ivory studio surface with small overlapping plinths. Three-quarter front viewpoint, realistic reflections and believable materials. Objects distinct and completely visible.
- **Bags:** Natural canvas tote in front, minimal navy backpack behind and compact navy weekender duffel beside them on a warm ivory studio backdrop. Crisp textile texture, realistic strap construction and natural folds, balanced three-quarter composition.
- **Office:** Editorial flat-lay of a navy hardbound notebook open enough to show cream blank pages, a second closed cream notebook, simple navy and cobalt pens, memo cards and a compact card holder. Warm ivory background, deliberate spacing and diagonal shadows from soft window light. No printed words or illegible text.
- **Tech:** Generic useful technology merchandise on a warm ivory studio desk: matte navy wireless charging stand with no phone, compact cobalt power bank, neatly coiled USB cable and zipped natural textile cable pouch. Small varied ivory risers, technically plausible product forms and soft shadows. No screens, certification symbols or lettering.
- **Kits:** Open deep navy employee welcome presentation box with neatly folded ivory tissue paper holding a navy refillable bottle, folded ivory T-shirt, navy notebook and cobalt pen, with canvas tote folded beside the box. Three-quarter slightly elevated view, believable packaging, material texture and warm ivory background. No greeting-card lettering.

## Logo source and reconstruction

The owner selected **1A Refined Slash** in the prior brand exploration. The unchanged approval reference is `assets/brand/promomerch-1a-refined-slash-reference.png`, SHA-256 `db7b7f6e4b969b8c116e1f0344eeaa9c9766037742f7c0a52efb74c399aac67b`. It is a raster concept board containing a heading and two logo presentations, not a production logo file.

The production assets in `public/brand/` are a manual vector reconstruction based on that visual reference. They preserve the heavy geometric wordmark, navy “Promo”, cobalt “Merch”, rising transparent slash through the capital M, no `.ca`, and descriptor aligned beneath the wordmark. They contain editable SVG paths, not a raster image wrapped inside an SVG.

This reconstruction is not a pixel-exact trace, and it does not identify or claim the original source typeface. Letter contours, spacing and descriptor typography may differ slightly from the raster reference. Treat the reconstructed production artwork as a faithful implementation of the selected direction, pending owner review of those details before external print production. The original approval reference has not been cropped, overwritten or otherwise altered.

The English descriptor is **BRANDED MERCHANDISE**. The French descriptor is **ARTICLES PROMOTIONNELS**, an implementation translation for the French website, not a separately approved historic slogan. The wordmark remains PromoMerch in both languages.

### Logo inventory

| Files in `public/brand/` | Use |
|---|---|
| `logo-en.svg`, `logo-fr.svg` | Navy/cobalt full lockups on white or light backgrounds |
| `logo-white-en.svg`, `logo-white-fr.svg` | White full lockups on navy/dark backgrounds |
| `logo-black-en.svg`, `logo-black-fr.svg` | Single-colour black full lockups |
| `logo-en.png`, `logo-fr.png` | Transparent 1600 × 318 pixel colour PNG exports |
| `logo-white-en.png`, `logo-white-fr.png` | Transparent 1600 × 318 pixel white PNG exports |
| `wordmark.svg`, `wordmark-white.svg` | Compact wordmark without descriptor for constrained placements |
| `FONT-LICENSE.txt` | Required licence for the outlined descriptor typeface |

All SVGs have transparent backgrounds. The M slash is a transparent mask, so it reveals the placement background rather than introducing a white rectangle. Full lockup viewBox is `0 0 1227 244`; compact wordmark viewBox is `0 0 1227 176`. Use the full lockup for normal navigation and footer identity. The compact wordmark is available when a descriptor would be too small to read.

The wordmark lettering is manually drawn vector geometry. Descriptor letters are outlines derived from **DejaVu Sans Bold**, with tracking fitted to the wordmark width without horizontally distorting glyphs. The original font is not required at runtime; the applicable Bitstream Vera/DejaVu licence is retained in `FONT-LICENSE.txt`.

### Icon inventory

The favicon is an implementation derivative of the M/slash. It is a white M on a cobalt rounded square and is used only as a compact browser/app icon, not as a replacement primary brand mark.

- `/favicon.svg`: scalable native SVG icon.
- `/favicon.ico`: genuine ICO container with 16 × 16, 32 × 32 and 48 × 48 PNG-backed, 32-bit entries.
- `/favicon-16.png`, `/favicon-32.png`, `/favicon-48.png`: PNG icon exports.
- `/apple-touch-icon.png`: 180 × 180 PNG.
- `/icon-192.png`: 192 × 192 PNG.
- `/icon-512.png`: 512 × 512 PNG.

## Verification completed

- Inspected all seven final scenes at a useful preview size. Objects are recognizable, category-specific and free of visible text, third-party marks or faces.
- Preserved the generated source files byte-for-byte and recorded their SHA-256 hashes.
- Confirmed WebP dimensions and byte sizes, transparent logo PNG alpha channels, and ICO header/frame data.
- Compared the colour vector lockup with the unchanged selected reference and inspected the white French lockup.
- Confirmed SVG assets contain native paths and retain the selected rising M slash, aligned descriptors and transparent background.

Browser placement, visual contrast, responsive cropping, network loading and locale routing must be checked in the integrated site. This manifest does not assert those application checks have passed.
