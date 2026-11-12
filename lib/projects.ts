import type { Localized } from "./catalog";

export type PortfolioProject = {
  id: string;
  title: Localized;
  description: Localized;
  alt: Localized;
  image: string;
  width: number;
  height: number;
  focus: Localized;
};

// Owner-authorized examples from https://merchmatters.ca/projects/.
// These are historical Merch Matters work, not new PromoMerch case studies.
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "embroidered-vests",
    title: { en: "Embroidered team vests", fr: "Vestes d’équipe brodées" },
    description: {
      en: "Logo embroidery on insulated vests, shown close up so you can see the lettering, stitching and placement on the quilted fabric.",
      fr: "Un logo brodé sur des vestes isolées, photographié de près pour montrer le lettrage, les points et l’emplacement sur le tissu matelassé.",
    },
    alt: { en: "White THE WELL logo embroidered on a grey quilted vest from the Merch Matters portfolio.", fr: "Logo THE WELL brodé en blanc sur une veste matelassée grise du portfolio Merch Matters." },
    image: "/images/projects/embroidered-vest.webp", width: 900, height: 600,
    focus: { en: "Apparel · embroidery", fr: "Vêtements · broderie" },
  },
  {
    id: "coordinated-accessories",
    title: { en: "Matching ties & pocket squares", fr: "Cravates et pochettes assorties" },
    description: {
      en: "Coordinated green accessories from a Merch Matters uniform project. A reference for bringing brand colour into the smaller details of a team’s outfit.",
      fr: "Des accessoires verts assortis provenant d’un projet d’uniformes Merch Matters. Un exemple d’intégration de la couleur de marque aux détails d’une tenue d’équipe.",
    },
    alt: { en: "Matching green tie and pocket square laid on tissue paper, from the Merch Matters portfolio.", fr: "Cravate et pochette vertes assorties, posées sur du papier de soie, du portfolio Merch Matters." },
    image: "/images/projects/tie-pocket-square.webp", width: 1058, height: 1413,
    focus: { en: "Uniforms · coordinated accessories", fr: "Uniformes · accessoires assortis" },
  },
];
