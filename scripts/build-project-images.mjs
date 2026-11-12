import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
const output = new URL('../public/images/projects/', import.meta.url);
await mkdir(output, {recursive: true});
for (const name of ['embroidered-vest', 'tie-pocket-square']) {
  const input = new URL(`../assets/merchmatters/${name}.jpg`, import.meta.url);
  await sharp(input.pathname).webp({quality:86}).toFile(new URL(`${name}.webp`, output).pathname);
  await sharp(input.pathname).resize({width:640, withoutEnlargement:true}).webp({quality:86}).toFile(new URL(`${name}-640.webp`, output).pathname);
}
