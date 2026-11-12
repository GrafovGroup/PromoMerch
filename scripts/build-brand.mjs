// Native vector construction of the selected 1A Refined Slash identity.
// Baseline: 156; cap/ascender top: 0; lowercase flat top: 44.
// Rounded forms overshoot to 42/158 for optical alignment. No glyph is skewed.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const descriptors = JSON.parse(await readFile(new URL('../assets/brand/descriptor-outlines.json', import.meta.url), 'utf8'));
const output = new URL('../public/brand/', import.meta.url);
const r = 'M0 44H36V58C44 47 54 42 68 42V80H61C45 80 36 90 36 108V156H0Z';
const o = 'M115 100C115 132.032512 89.256372 158 57.5 158C25.743628 158 0 132.032512 0 100C0 67.967488 25.743628 42 57.5 42C89.256372 42 115 67.967488 115 100Z M80 100C80 87.297451 69.926407 77 57.5 77C45.073593 77 35 87.297451 35 100C35 112.702549 45.073593 123 57.5 123C69.926407 123 80 112.702549 80 100Z';
const letters = [
  ['P', 0, 'M0 0H72C107 0 128 22 128 52C128 83 105 104 72 104H42V156H0Z M42 34V71H70C82 71 87 64 87 53C87 42 81 34 70 34Z'],
  ['r', 135, r],
  ['o', 207, o],
  ['m', 328, 'M0 44H36V57C44 47 55 42 68 42C84 42 96 48 103 59C112 48 124 42 138 42C163 42 177 59 177 86V156H141V94C141 82 136 76 125 76C114 76 106.5 84 106.5 97V156H70.5V94C70.5 82 65.5 76 55 76C44 76 36 84 36 97V156H0Z'],
  ['o', 511, o],
  // The small union closes the notch where the inner vertex meets the slash.
  // The mask then cuts one uninterrupted, parallel-sided incision.
  ['M', 634, 'M0 0H34L75.5 54L117 0H151V156H111V82L75.5 130L40 82V156H0Z M40 82L51 96H40Z'],
  ['e', 791, 'M113 106H37C40 118 49 125 62 125C74 125 83 120 91 111L111 133C98 150 82 158 60 158C24 158 0 133 0 100C0 67 23 42 58 42C92 42 113 65 113 100Z M37 85H77C75 75 68 69 58 69C48 69 41 75 37 85Z'],
  ['r', 910, r],
  ['c', 982, 'M112 64L86 90C78 82 72 76 62 76C47 76 37 86 37 100C37 114 47 124 62 124C72 124 78 118 86 110L112 136C99 151 82 158 61 158C25 158 0 132 0 100C0 68 25 42 61 42C82 42 99 49 112 64Z'],
  ['h', 1100, 'M0 0H36V57C45 47 57 42 71 42C97 42 111 59 111 86V156H75V94C75 82 69 76 59 76C45 76 36 84 36 98V156H0Z'],
];

function svg(locale, treatment) {
  const monochrome = treatment === 'white' ? '#FFFFFF' : treatment === 'black' ? '#000000' : null;
  const descriptor = locale ? descriptors[locale].map(p => `      <path d="${p.d}" transform="${p.transform}"/>`).join('\n') : '';
  const name = locale === 'fr' ? 'ARTICLES PROMOTIONNELS' : 'BRANDED MERCHANDISE';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1227 ${locale ? 244 : 176}" role="img" aria-label="PromoMerch${locale ? ' — ' + name : ''}">
  <title>PromoMerch${locale ? ' — ' + name : ''}</title>
  <defs>
    <mask id="slash" maskUnits="userSpaceOnUse" x="0" y="0" width="151" height="156">
      <rect width="151" height="156" fill="white"/>
      <path d="M-3 111L154 48V59L-3 122Z" fill="black"/>
    </mask>
  </defs>
  <g transform="translate(8 8)" fill-rule="evenodd">
${letters.map(([letter,x,d],i)=>`    <g data-letter="${letter}" transform="translate(${x} 0)"><path fill="${monochrome || (i<5 ? '#062A54' : '#2454FF')}" d="${d}"${i===5?' fill-rule="nonzero" mask="url(#slash)"':''}/></g>`).join('\n')}
${locale ? `    <g data-descriptor="${locale}" fill="${monochrome || '#062A54'}">\n${descriptor}\n    </g>\n` : ''}  </g>
</svg>
`;
}

for (const locale of ['en', 'fr']) {
  for (const treatment of ['colour', 'white', 'black']) {
    const stem = treatment === 'colour' ? `logo-${locale}` : `logo-${treatment}-${locale}`;
    const source = svg(locale, treatment);
    await writeFile(new URL(`${stem}.svg`, output), source);
    if (treatment !== 'black') {
      // Rasterize the native vector with its alpha and original aspect ratio.
      await sharp(Buffer.from(source), { density: 192 }).resize({ width: 1600 }).png().toFile(new URL(`${stem}.png`, output).pathname);
    }
  }
}
for (const treatment of ['colour', 'white']) {
  const filename = treatment === 'white' ? 'wordmark-white.svg' : 'wordmark.svg';
  await writeFile(new URL(filename, output), svg(null, treatment));
}
console.log('Generated 8 SVGs and 4 transparent PNGs from the shared logo geometry.');
