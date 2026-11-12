/**
 * Curated merchandise families, not a live supplier or inventory feed.
 * Options describe topics for the quote conversation; they are not SKU promises.
 */
export type Locale = "en" | "fr";
export type Localized<T = string> = { en: T; fr: T };

export type Product = {
  id: string;
  category: string;
  slug: Localized;
  name: Localized;
  summary: Localized;
  description: Localized;
  uses: Localized<string[]>;
  options: Localized<string[]>;
  image: string;
  featured?: boolean;
};

export type Category = {
  id: string;
  slug: Localized;
  name: Localized;
  summary: Localized;
  image: string;
};

const text = (en: string, fr: string): Localized => ({ en, fr });
const list = (en: string[], fr: string[]): Localized<string[]> => ({ en, fr });

export const categories: Category[] = [
  { id: "apparel", slug: text("apparel", "vetements"), name: text("Apparel", "Vêtements"), summary: text("Wear your brand, from the workday to the weekend.", "Votre marque, au travail comme la fin de semaine."), image: "/images/category-apparel.webp" },
  { id: "drinkware", slug: text("drinkware", "bouteilles-et-tasses"), name: text("Drinkware", "Bouteilles et tasses"), summary: text("Everyday favourites for desks, commutes and events.", "Des essentiels pour le bureau, les déplacements et les événements."), image: "/images/category-drinkware.webp" },
  { id: "bags", slug: text("bags", "sacs"), name: text("Bags", "Sacs"), summary: text("Give your brand a place in the daily carry.", "Faites une place à votre marque dans les déplacements quotidiens."), image: "/images/category-bags.webp" },
  { id: "office", slug: text("office-stationery", "bureau-papeterie"), name: text("Office & stationery", "Bureau et papeterie"), summary: text("Useful details for meetings, notebooks and workspaces.", "Des articles utiles pour les réunions et les espaces de travail."), image: "/images/category-office.webp" },
  { id: "tech", slug: text("tech-accessories", "accessoires-technologiques"), name: text("Tech accessories", "Accessoires technologiques"), summary: text("Thoughtful accessories for connected work and travel.", "Des accessoires pratiques pour le travail et les déplacements."), image: "/images/category-tech.webp" },
  { id: "kits", slug: text("gifts-kits", "cadeaux-coffrets"), name: text("Gifts & kits", "Cadeaux et coffrets"), summary: text("Bring a few good ideas together in one considered gift.", "Réunissez de bonnes idées dans un cadeau bien pensé."), image: "/images/category-kits.webp" },
];

type FamilyInput = Omit<Product, "image">;
const family = (item: FamilyInput): Product => ({
  ...item,
  image: `/images/category-${item.category}.webp`,
});

export const products: Product[] = [
  family({
    id: "everyday-tees", category: "apparel", featured: true,
    slug: text("everyday-tees", "t-shirts"),
    name: text("Everyday tees", "T-shirts"),
    summary: text("A familiar starting point for teams, events and campaigns.", "Un point de départ simple pour les équipes, les événements et les campagnes."),
    description: text("Start with who will wear the shirt and where. A staff uniform, an event giveaway and a retail-style campaign may call for different fits, fabrics and artwork. Share your quantity, size mix and preferred look so we can help compare suitable options. The selected garment, colours, decoration and production details are confirmed in your quote.", "Commencez par le public et l’usage. Une tenue d’équipe, un article distribué lors d’un événement et une collection de campagne peuvent demander des coupes, des tissus et des visuels différents. Indiquez la quantité, la répartition des tailles et le style souhaité pour comparer les options. Le modèle, les couleurs, le marquage et la production sont précisés dans la soumission."),
    uses: list(["Team clothing", "Event giveaways", "Campaign merchandise"], ["Tenues d’équipe", "Articles d’événement", "Campagnes promotionnelles"]),
    options: list(["Fit and size range", "Fabric feel and garment colour", "Front, back or sleeve artwork"], ["Coupe et gamme de tailles", "Toucher du tissu et couleur", "Visuel devant, au dos ou sur une manche"]),
  }),
  family({
    id: "team-polos", category: "apparel",
    slug: text("team-polos", "polos-equipe"),
    name: text("Team polos", "Polos d’équipe"),
    summary: text("A coordinated look for people representing your business.", "Une tenue cohérente pour les personnes qui représentent votre entreprise."),
    description: text("Polos can connect a team without making every role feel the same. Consider the work setting, preferred fit and how prominently the logo should appear. Include any existing uniform colours or dress requirements in your brief. We will use those details to narrow the garment and decoration choices before an order is approved.", "Les polos permettent d’unifier la tenue d’une équipe tout en tenant compte de ses différents rôles. Pensez au milieu de travail, à la coupe et à la visibilité souhaitée du logo. Précisez les couleurs déjà utilisées et les exigences vestimentaires. Ces détails aideront à choisir le vêtement et la méthode de personnalisation avant l’approbation de la commande."),
    uses: list(["Customer-facing teams", "Corporate events", "Club clothing"], ["Équipes en contact avec la clientèle", "Événements d’entreprise", "Vêtements de club"]),
    options: list(["Fit and fabric preferences", "Logo placement and scale", "Coordinating colours across roles"], ["Préférences de coupe et de tissu", "Emplacement et dimension du logo", "Couleurs coordonnées selon les rôles"]),
  }),
  family({
    id: "hoodies-layers", category: "apparel", featured: true,
    slug: text("hoodies-layers", "chandails-capuchon"),
    name: text("Hoodies & layers", "Chandails à capuchon"),
    summary: text("Comfortable layers with room for a strong brand statement.", "Des vêtements confortables qui laissent une belle place à votre marque."),
    description: text("A hoodie can be a welcome gift, a team favourite or the centrepiece of a merchandise collection. Decide whether the brief calls for a subtle chest mark or a larger graphic. Tell us about fit preferences, recipient sizes and how the layer will be used. Compare garment styles and decoration approaches together, rather than selecting artwork in isolation.", "Un chandail à capuchon peut servir de cadeau d’accueil, de vêtement d’équipe ou de pièce principale d’une collection. Déterminez si vous souhaitez un logo discret sur la poitrine ou un grand visuel. Précisez les coupes, les tailles et l’usage prévu. Le choix du vêtement et celui du marquage doivent être faits ensemble."),
    uses: list(["Employee welcome gifts", "Team collections", "Community campaigns"], ["Cadeaux d’accueil", "Collections d’équipe", "Campagnes communautaires"]),
    options: list(["Pullover or zip style to explore", "Chest and back artwork", "Coordinating size and colour mix"], ["Modèle à enfiler ou à fermeture à comparer", "Visuel sur la poitrine et au dos", "Répartition des tailles et des couleurs"]),
  }),
  family({
    id: "caps-toques", category: "apparel",
    slug: text("caps-toques", "casquettes-tuques"),
    name: text("Caps & toques", "Casquettes et tuques"),
    summary: text("Small-format branding for everyday wear and seasonal kits.", "Un format compact pour le quotidien et les coffrets saisonniers."),
    description: text("Headwear puts the logo in a compact space, so a simplified mark often deserves consideration. Choose the intended season and audience first, then discuss the shape, fit and decoration area. If your logo includes fine text, send the original artwork so its suitability can be reviewed against the proposed headwear.", "Les couvre-chefs offrent une surface de marquage compacte; une version simplifiée du logo peut donc être utile. Commencez par la saison et le public, puis examinez la forme, l’ajustement et la zone de personnalisation. Si votre logo contient de petits caractères, envoyez le fichier original pour vérifier son adaptation au modèle proposé."),
    uses: list(["Outdoor events", "Team clothing", "Seasonal gifting"], ["Événements extérieurs", "Vêtements d’équipe", "Cadeaux saisonniers"]),
    options: list(["Cap or toque format", "Fit and colour direction", "Logo simplification and placement"], ["Format casquette ou tuque", "Ajustement et couleurs", "Simplification et emplacement du logo"]),
  }),
  family({
    id: "everyday-bottles", category: "drinkware", featured: true,
    slug: text("everyday-bottles", "bouteilles-quotidien"),
    name: text("Everyday bottles", "Bouteilles du quotidien"),
    summary: text("A practical companion for desks, commutes and team days.", "Un article pratique pour le bureau, les déplacements et les activités d’équipe."),
    description: text("Choose a bottle around the recipient's routine. Desk use, travel and active events bring different preferences for size, opening and carry format. Let us know your preferred appearance and branding area. Materials, capacity, care instructions and any performance claims are checked against the actual model proposed in the quote.", "Choisissez la bouteille selon les habitudes de la personne qui la recevra. Le bureau, les déplacements et les activités entraînent des préférences différentes pour le format, l’ouverture et le transport. Indiquez le style et la zone de marquage souhaités. Les matériaux, la capacité, l’entretien et les caractéristiques sont vérifiés pour le modèle proposé."),
    uses: list(["Employee kits", "Wellness initiatives", "Event merchandise"], ["Coffrets employés", "Initiatives de bien-être", "Articles d’événement"]),
    options: list(["Size and carry preferences", "Lid and opening style", "Print or engraving suitability"], ["Format et transport", "Type de couvercle et d’ouverture", "Compatibilité avec l’impression ou la gravure"]),
  }),
  family({
    id: "desk-tumblers", category: "drinkware",
    slug: text("desk-tumblers", "gobelets"),
    name: text("Desk tumblers", "Gobelets"),
    summary: text("A useful addition to a desk set or recognition gift.", "Un complément utile à un ensemble de bureau ou à un cadeau de reconnaissance."),
    description: text("A tumbler offers a different shape and branding opportunity from a bottle. Think about where it will be used, whether a lid is important and how it will fit with other items in a kit. Share your budget and quantity so product, decoration and packaging choices can be considered as one order.", "Le gobelet offre une forme et une surface de marquage différentes de celles d’une bouteille. Pensez à son utilisation, à l’importance d’un couvercle et à sa place dans un coffret. Indiquez le budget et la quantité afin de choisir l’article, la personnalisation et l’emballage dans un même projet."),
    uses: list(["Desk gifts", "Recognition programmes", "Branded collections"], ["Cadeaux de bureau", "Programmes de reconnaissance", "Collections de marque"]),
    options: list(["Shape and size", "Lid preferences", "Decoration and gift packaging"], ["Forme et format", "Préférences de couvercle", "Personnalisation et emballage-cadeau"]),
  }),
  family({
    id: "coffee-mugs", category: "drinkware",
    slug: text("coffee-mugs", "tasses-cafe"),
    name: text("Coffee mugs", "Tasses à café"),
    summary: text("A familiar daily-use item with a visible place for your brand.", "Un article familier qui donne une place visible à votre marque."),
    description: text("Mugs are a useful starting point for office gifts, welcome kits and event collections. Review the artwork from both sides and consider how it relates to the handle. If the mugs will be shipped individually, include that detail early so protective packaging and the delivery plan can be considered alongside the design.", "Les tasses conviennent à la préparation de cadeaux de bureau, de coffrets d’accueil et de collections d’événement. Examinez le visuel des deux côtés et son emplacement par rapport à l’anse. Si les tasses sont expédiées séparément, précisez-le dès le départ pour prévoir l’emballage de protection et la livraison."),
    uses: list(["Office kitchens", "Welcome kits", "Client gifts"], ["Cuisines de bureau", "Coffrets d’accueil", "Cadeaux clients"]),
    options: list(["Mug shape and colour direction", "Artwork on one or both sides", "Individual packaging requirements"], ["Forme et couleurs", "Visuel sur un ou deux côtés", "Besoins d’emballage individuel"]),
  }),
  family({
    id: "travel-drinkware", category: "drinkware",
    slug: text("travel-drinkware", "tasses-voyage"),
    name: text("Travel drinkware", "Tasses de voyage"),
    summary: text("Merchandise planned around a morning routine on the move.", "Des articles pensés pour les routines du matin et les déplacements."),
    description: text("For commuters and travelling teams, the details of the selected drinkware matter. Tell us about the expected use, lid preference and size. Any leak-resistance, insulation, dishwasher or cup-holder claims need confirmation for the proposed model. We can then review the decoration area and packaging with those requirements in mind.", "Pour les personnes qui se déplacent, les détails du modèle comptent. Précisez l’usage, le couvercle et le format souhaités. L’étanchéité, l’isolation, le lavage au lave-vaisselle et la compatibilité avec un porte-gobelet doivent être confirmés pour le modèle proposé. La personnalisation et l’emballage sont ensuite examinés en fonction de ces critères."),
    uses: list(["Commuter gifts", "Travelling teams", "Client thank-you gifts"], ["Cadeaux pour les déplacements", "Équipes en déplacement", "Cadeaux de remerciement"]),
    options: list(["Lid and drinking preference", "Size and carry needs", "Model-specific performance requirements"], ["Préférences de couvercle", "Format et transport", "Caractéristiques à confirmer pour le modèle"]),
  }),
  family({
    id: "everyday-totes", category: "bags", featured: true,
    slug: text("everyday-totes", "sacs-fourre-tout"),
    name: text("Everyday totes", "Sacs fourre-tout"),
    summary: text("A generous canvas for your brand and the things people carry.", "Une belle surface pour votre marque et les essentiels du quotidien."),
    description: text("Start with what the tote needs to hold: event materials, a gift assortment or everyday essentials. That helps determine the size, handle length and construction to explore. Include your artwork and intended quantity. Fabric composition and any recycled-content claims are confirmed for the particular bag selected, not assumed for the category.", "Commencez par le contenu du sac : documents d’événement, cadeaux ou essentiels du quotidien. Cela aide à déterminer le format, les anses et la confection à comparer. Ajoutez votre visuel et la quantité prévue. La composition et toute teneur en matière recyclée sont confirmées pour le sac choisi, sans être présumées pour l’ensemble de la catégorie."),
    uses: list(["Trade shows", "Retail-style merchandise", "Gift packaging"], ["Salons professionnels", "Collections de marque", "Emballage de cadeaux"]),
    options: list(["Dimensions and handle style", "Fabric and construction preferences", "Artwork size and placement"], ["Dimensions et type d’anses", "Tissu et confection", "Dimension et emplacement du visuel"]),
  }),
  family({
    id: "team-backpacks", category: "bags",
    slug: text("team-backpacks", "sacs-dos"),
    name: text("Team backpacks", "Sacs à dos"),
    summary: text("A considered option for work essentials and welcome programmes.", "Une option réfléchie pour les essentiels de travail et les programmes d’accueil."),
    description: text("Backpacks can bring an employee kit together or become a longer-term team item. Tell us what recipients need to carry and whether device storage, pockets or travel use matter. Product dimensions and device fit are checked against the actual model. Logo scale should complement the bag rather than compete with its construction.", "Un sac à dos peut réunir les articles d’un coffret employé ou devenir un article d’équipe durable dans l’usage. Précisez ce que les personnes transportent et leurs besoins de rangement, de poches ou de voyage. Les dimensions et la compatibilité avec les appareils sont vérifiées pour le modèle choisi. Le logo doit s’intégrer à la confection du sac."),
    uses: list(["Employee onboarding", "Team travel", "Recognition gifts"], ["Accueil des employés", "Déplacements d’équipe", "Cadeaux de reconnaissance"]),
    options: list(["Contents and device dimensions", "Pocket and carry preferences", "Subtle or prominent branding"], ["Contenu et dimensions des appareils", "Poches et transport", "Marquage discret ou bien visible"]),
  }),
  family({
    id: "event-drawstring-bags", category: "bags",
    slug: text("event-drawstring-bags", "sacs-cordon"),
    name: text("Drawstring bags", "Sacs à cordon"),
    summary: text("A simple carry format for event essentials and group activities.", "Un format simple pour les essentiels d’événement et les activités de groupe."),
    description: text("A drawstring bag can hold a small selection of participant items while keeping the artwork visible. Share the contents, audience and distribution plan to help narrow the style. Where size, load, construction or age suitability matters, include the requirement in the brief so it can be checked for the proposed product.", "Le sac à cordon peut contenir quelques articles remis aux participants tout en mettant le visuel en évidence. Précisez le contenu, le public et le mode de distribution pour orienter le choix. Ajoutez les exigences de format, de charge, de confection ou d’âge lorsqu’elles sont pertinentes pour permettre la vérification du produit proposé."),
    uses: list(["Event participation packs", "Club activities", "Campaign giveaways"], ["Trousses de participation", "Activités de club", "Articles de campagne"]),
    options: list(["Contents and required dimensions", "Colour and decoration area", "Distribution and packaging plan"], ["Contenu et dimensions nécessaires", "Couleur et surface de marquage", "Distribution et emballage"]),
  }),
  family({
    id: "travel-pouches", category: "bags",
    slug: text("travel-pouches", "pochettes"),
    name: text("Travel pouches", "Pochettes"),
    summary: text("Keep small essentials together with a compact branded piece.", "Rassemblez les petits essentiels dans un article compact à votre image."),
    description: text("A pouch can organize accessories inside a larger bag or serve as the packaging for a small gift. Start with the items it must hold and the intended setting. Then compare opening styles, size and branding placement. For multi-item kits, check the fit of the full assortment before finalizing the selection.", "Une pochette peut organiser les accessoires dans un sac ou servir d’emballage à un petit cadeau. Commencez par les objets qu’elle doit contenir et le contexte d’utilisation. Comparez ensuite l’ouverture, le format et l’emplacement du logo. Pour un coffret, vérifiez que l’ensemble du contenu convient avant de choisir."),
    uses: list(["Travel gifts", "Accessory kits", "Event organization"], ["Cadeaux de voyage", "Trousses d’accessoires", "Organisation d’événement"]),
    options: list(["Pouch dimensions", "Opening and closure preferences", "Contents and logo placement"], ["Dimensions de la pochette", "Ouverture et fermeture", "Contenu et emplacement du logo"]),
  }),
  family({
    id: "notebooks-journals", category: "office", featured: true,
    slug: text("notebooks-journals", "carnets"),
    name: text("Notebooks & journals", "Carnets et cahiers"),
    summary: text("A useful place for new ideas, meeting notes and your brand.", "Une place utile pour les idées, les notes de réunion et votre marque."),
    description: text("Choose a notebook around the way it will be used. A compact event handout and a desk journal may call for different formats, page layouts and cover treatments. Share your preferred look, quantity and whether it will be paired with a pen. Paper, binding and decoration details are confirmed with the selected model.", "Choisissez le carnet selon son utilisation. Un article compact remis lors d’un événement et un cahier de bureau peuvent demander des formats, des pages et des couvertures différents. Indiquez le style, la quantité et si un stylo l’accompagnera. Le papier, la reliure et la personnalisation sont précisés pour le modèle retenu."),
    uses: list(["Meeting essentials", "Conference packs", "Employee gifts"], ["Essentiels de réunion", "Trousses de congrès", "Cadeaux employés"]),
    options: list(["Notebook size and page layout", "Cover and branding treatment", "Pen pairing or gift presentation"], ["Format et présentation des pages", "Couverture et marquage", "Ajout d’un stylo ou présentation-cadeau"]),
  }),
  family({
    id: "branded-pens", category: "office",
    slug: text("branded-pens", "stylos"),
    name: text("Branded pens", "Stylos personnalisés"),
    summary: text("A compact everyday item for counters, conferences and kits.", "Un petit essentiel pour les comptoirs, les congrès et les coffrets."),
    description: text("Small items still deserve a considered selection. Think about the writing experience, the audience and the amount of text in the artwork. A compact logo may read better than a full contact block. Share the intended use and quantity so the proposed pen and branding can be reviewed together.", "Même les petits articles méritent un choix réfléchi. Pensez à l’écriture, au public et à la quantité de texte dans le visuel. Un logo compact peut être plus lisible qu’un bloc de coordonnées complet. Indiquez l’usage et la quantité pour examiner ensemble le stylo et sa personnalisation."),
    uses: list(["Reception counters", "Trade shows", "Notebook pairings"], ["Comptoirs d’accueil", "Salons professionnels", "Ensembles avec carnet"]),
    options: list(["Writing and grip preferences", "Logo size and available space", "Single-item or set presentation"], ["Écriture et prise en main", "Dimension du logo et espace disponible", "Présentation individuelle ou en ensemble"]),
  }),
  family({
    id: "desk-accessories", category: "office",
    slug: text("desk-accessories", "accessoires-bureau"),
    name: text("Desk accessories", "Accessoires de bureau"),
    summary: text("Useful touches that bring a workspace gift together.", "Des détails pratiques pour compléter un cadeau de bureau."),
    description: text("Consider the recipient's workspace before choosing a desk accessory. A shared office, home desk and mobile role have different needs. Start with the purpose—organization, note-taking or a coordinated gift—then narrow the format. Keep the selection focused on items that fit the routine rather than filling a box for its own sake.", "Tenez compte de l’espace de travail avant de choisir un accessoire. Un bureau partagé, un poste à domicile et un rôle mobile n’ont pas les mêmes besoins. Commencez par l’objectif : organiser, prendre des notes ou composer un cadeau. Privilégiez des articles adaptés aux habitudes plutôt que d’ajouter du contenu simplement pour remplir une boîte."),
    uses: list(["Workspace gifts", "Employee recognition", "Desk kits"], ["Cadeaux de bureau", "Reconnaissance des employés", "Ensembles de travail"]),
    options: list(["Recipient's workspace and routine", "Useful item combinations", "Coordinated artwork and packaging"], ["Espace de travail et habitudes", "Combinaisons d’articles utiles", "Visuels et emballage coordonnés"]),
  }),
  family({
    id: "lanyards-badge-accessories", category: "office",
    slug: text("lanyards-badge-accessories", "cordons-porte-badges"),
    name: text("Lanyards & badge accessories", "Cordons et porte-badges"),
    summary: text("Keep event identification connected to your visual identity.", "Reliez l’identification de votre événement à votre image de marque."),
    description: text("Start with the badge format and how participants will use it. The attachment, printed area and distribution method should support the event rather than complicate check-in. Provide the event date, quantity and any venue or audience requirements. Specific fittings and suitability are confirmed for the chosen product.", "Commencez par le format du badge et son utilisation. L’attache, la surface imprimée et la distribution doivent faciliter l’événement et l’accueil des participants. Précisez la date, la quantité ainsi que les exigences du lieu ou du public. Les accessoires et leur adéquation sont confirmés pour le produit retenu."),
    uses: list(["Conferences", "Staff identification", "Event check-in"], ["Congrès", "Identification du personnel", "Accueil des participants"]),
    options: list(["Badge size and attachment", "Artwork repeat and orientation", "Distribution requirements"], ["Format du badge et attache", "Répétition et orientation du visuel", "Besoins de distribution"]),
  }),
  family({
    id: "charging-cables", category: "tech",
    slug: text("charging-cables", "cables-recharge"),
    name: text("Charging accessories", "Accessoires de recharge"),
    summary: text("A practical idea when it matches the devices people use.", "Une idée pratique lorsqu’elle convient aux appareils utilisés."),
    description: text("Compatibility comes before appearance. Tell us which devices or connector types the accessory needs to support and where it will be used. Charging functions, electrical specifications and any required certifications must be checked for the specific product. Once those needs are clear, review branding and gift presentation.", "La compatibilité passe avant l’apparence. Précisez les appareils ou les types de connecteurs visés et le contexte d’utilisation. Les fonctions de recharge, les caractéristiques électriques et les certifications nécessaires doivent être vérifiées pour le produit précis. Le marquage et la présentation-cadeau sont examinés ensuite."),
    uses: list(["Travel kits", "Conference gifts", "Desk essentials"], ["Trousses de voyage", "Cadeaux de congrès", "Essentiels de bureau"]),
    options: list(["Device and connector requirements", "Use and compatibility checks", "Branding and packaging"], ["Appareils et connecteurs requis", "Usage et vérification de compatibilité", "Marquage et emballage"]),
  }),
  family({
    id: "device-stands", category: "tech",
    slug: text("device-stands", "supports-appareils"),
    name: text("Device stands", "Supports pour appareils"),
    summary: text("A compact accessory for a more considered desk setup.", "Un accessoire compact pour un poste de travail bien pensé."),
    description: text("A stand can be useful only if it fits the device and the way the recipient works. Share the intended phone or tablet size and any case requirements. Compare the footprint, viewing position and decoration area of the proposed option. Product dimensions and load suitability are confirmed before ordering.", "Un support est utile s’il convient à l’appareil et à la façon de travailler. Indiquez le format du téléphone ou de la tablette ainsi que les besoins liés à l’étui. Comparez l’encombrement, la position de visionnement et la zone de marquage. Les dimensions et la charge admissible sont confirmées avant la commande."),
    uses: list(["Desk gifts", "Employee kits", "Meeting accessories"], ["Cadeaux de bureau", "Coffrets employés", "Accessoires de réunion"]),
    options: list(["Device size and case fit", "Desk footprint and format", "Logo placement"], ["Format de l’appareil et de l’étui", "Encombrement et format du support", "Emplacement du logo"]),
  }),
  family({
    id: "tech-organizers", category: "tech",
    slug: text("tech-organizers", "organisateurs-accessoires"),
    name: text("Tech organizers", "Organisateurs d’accessoires"),
    summary: text("Bring cables and small work essentials into one place.", "Rassemblez les câbles et les petits essentiels de travail."),
    description: text("An organizer can turn a handful of accessories into a coherent gift. Start with the items recipients need to carry, then consider compartments, size and closure. It can be quoted on its own or as part of a larger kit. Confirm the full contents and their fit together before finalizing the assortment.", "Un organisateur peut réunir plusieurs accessoires dans un cadeau cohérent. Commencez par les objets à transporter, puis examinez les compartiments, le format et la fermeture. Il peut faire l’objet d’une soumission seul ou dans un coffret. Confirmez le contenu complet et son ajustement avant de finaliser l’ensemble."),
    uses: list(["Mobile teams", "Welcome kits", "Travel gifting"], ["Équipes mobiles", "Coffrets d’accueil", "Cadeaux de voyage"]),
    options: list(["Contents and compartment needs", "Compact or expanded format", "Standalone item or kit component"], ["Contenu et compartiments", "Format compact ou plus spacieux", "Article seul ou élément d’un coffret"]),
  }),
  family({
    id: "power-banks", category: "tech",
    slug: text("power-banks", "batteries-externes"),
    name: text("Power banks", "Batteries externes"),
    summary: text("Explore portable charging around the recipient's actual needs.", "Explorez la recharge portative selon les besoins réels du public."),
    description: text("Portable charging requires a specific product review. Tell us which devices matter, the preferred size and where the items will be delivered. Capacity, connector compatibility, certifications and shipping requirements are checked for the proposed model. Add the family to your quote to discuss suitable options without assuming a particular specification.", "La recharge portative demande une vérification du produit précis. Indiquez les appareils visés, le format souhaité et la destination. La capacité, les connecteurs, les certifications et les exigences d’expédition sont vérifiés pour le modèle proposé. Ajoutez cette famille à votre demande pour discuter des options sans présumer de caractéristiques particulières."),
    uses: list(["Travel gifts", "Conference kits", "Client recognition"], ["Cadeaux de voyage", "Coffrets de congrès", "Reconnaissance des clients"]),
    options: list(["Device and capacity requirements", "Size and branding area", "Delivery and shipping requirements"], ["Appareils et capacité recherchée", "Format et surface de marquage", "Destination et exigences d’expédition"]),
  }),
  family({
    id: "welcome-kits", category: "kits", featured: true,
    slug: text("employee-welcome-kits", "coffrets-accueil-employes"),
    name: text("Employee welcome kits", "Coffrets d’accueil"),
    summary: text("A thoughtful introduction to the team, in one coordinated kit.", "Une attention pour accueillir les nouvelles personnes dans l’équipe."),
    description: text("Build a welcome kit around the employee's first days. A practical mix might combine apparel, drinkware and a notebook, with each item chosen for the role and budget. Share the recipient count, onboarding schedule and whether kits travel to one location or several. Contents, sizing, packing and delivery are agreed together.", "Composez un coffret autour des premiers jours de la personne dans l’équipe. Vêtement, bouteille et carnet peuvent former un ensemble pratique, choisi selon le rôle et le budget. Précisez le nombre de personnes, le calendrier d’accueil et le nombre de destinations. Le contenu, les tailles, l’emballage et la livraison sont convenus ensemble."),
    uses: list(["New hires", "Team launches", "Employee milestones"], ["Nouvelles embauches", "Lancement d’équipe", "Étapes du parcours employé"]),
    options: list(["Role-specific contents", "Apparel sizing and printed insert", "Single or multiple delivery destinations"], ["Contenu adapté au rôle", "Tailles et carte d’accueil", "Livraison à une ou plusieurs destinations"]),
  }),
  family({
    id: "event-kits", category: "kits",
    slug: text("event-kits", "trousses-evenements"),
    name: text("Event kits", "Trousses d’événement"),
    summary: text("Make the participant experience feel connected from the start.", "Une expérience cohérente dès l’accueil des participants."),
    description: text("An event kit should support what happens on the day. Start with the audience, session format and items people genuinely need. A bag, notebook, identification accessory or drinkware can be considered as part of the mix. Provide the in-hand date and distribution plan so product selection and packing work toward the same deadline.", "La trousse doit soutenir le déroulement de l’événement. Commencez par le public, les activités et les articles réellement utiles. Sac, carnet, accessoire d’identification ou bouteille peuvent faire partie de l’ensemble. Indiquez la date de réception requise et le plan de distribution pour coordonner la sélection et l’assemblage."),
    uses: list(["Conferences", "Team events", "Training sessions"], ["Congrès", "Événements d’équipe", "Formations"]),
    options: list(["Participant and staff quantities", "Agenda-related contents", "Venue delivery and distribution plan"], ["Quantités pour participants et personnel", "Contenu adapté au programme", "Livraison au lieu et distribution"]),
  }),
  family({
    id: "recognition-gifts", category: "kits",
    slug: text("recognition-gift-sets", "cadeaux-reconnaissance"),
    name: text("Recognition gift sets", "Cadeaux de reconnaissance"),
    summary: text("Mark a contribution or milestone with a considered selection.", "Soulignez une contribution ou une étape avec une sélection réfléchie."),
    description: text("Recognition gifts benefit from a clear reason behind the choice. Tell us about the milestone, recipient group and desired tone. We can help shape an assortment that feels consistent without making every gift identical. Consider the message, packaging and delivery experience alongside the products themselves.", "Un cadeau de reconnaissance gagne à être choisi pour une raison claire. Décrivez l’étape soulignée, le groupe et le ton souhaité. La sélection peut rester cohérente sans rendre chaque cadeau identique. Pensez au message, à l’emballage et à l’expérience de réception autant qu’aux articles."),
    uses: list(["Service milestones", "Team achievements", "Thank-you gifts"], ["Années de service", "Réussites d’équipe", "Cadeaux de remerciement"]),
    options: list(["Gift theme and recipient needs", "Message or printed insert", "Presentation and delivery"], ["Thème et besoins du public", "Message ou carte imprimée", "Présentation et livraison"]),
  }),
  family({
    id: "client-gift-sets", category: "kits",
    slug: text("client-gift-sets", "cadeaux-clients"),
    name: text("Client gift sets", "Cadeaux clients"),
    summary: text("A useful, well-presented way to keep the relationship in view.", "Une façon utile et soignée d’entretenir la relation."),
    description: text("Build a client gift around relevance, not simply the number of items. Share the occasion, recipient profile and any gifting restrictions that apply to your organization or theirs. Choose a manageable assortment, then review brand visibility, message and packaging. Final product choices and delivery arrangements are confirmed in the quote.", "Privilégiez la pertinence plutôt que le nombre d’articles. Précisez l’occasion, le profil des destinataires et les restrictions de cadeaux applicables à votre organisation ou à la leur. Choisissez un ensemble cohérent, puis examinez la visibilité du logo, le message et l’emballage. Les articles et la livraison sont confirmés dans la soumission."),
    uses: list(["Client appreciation", "Project milestones", "Partner relationships"], ["Remerciements aux clients", "Étapes d’un projet", "Relations avec les partenaires"]),
    options: list(["Occasion and recipient preferences", "Brand visibility and message", "Packaging and destination plan"], ["Occasion et préférences du public", "Visibilité de la marque et message", "Emballage et destinations"]),
  }),
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function productPath(product: Product, locale: Locale): string {
  return `/${locale}/${locale === "fr" ? "produits" : "products"}/${product.slug[locale]}/`;
}

export function categoryPath(category: Category, locale: Locale): string {
  return `/${locale}/${category.slug[locale]}/`;
}

