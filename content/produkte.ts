export type Produkt = {
  slug: string;
  name: string;
  kategorie: string;
  teaser: string;
  abMenge: string;
  /** Pfad unter public/, wird in M3 (Medien-Pipeline) produziert */
  image: string;
  imageAlt: string;
  /** true → „✦ KI-generiert"-Badge Pflicht (Art. 50 EU AI Act) */
  aiGenerated: boolean;
  /** Drag-to-rotate-Frame-Ring, falls produziert */
  spin?: { frames: number; path: string };
};

export const produkte: Produkt[] = [
  // Technik & Gadgets
  {
    slug: "powerbank-leuchtlogo",
    name: "Powerbank mit Leuchtlogo",
    kategorie: "technik-gadgets",
    teaser:
      "MagSafe-Powerbank, auf der dein Logo beim Laden aufleuchtet — der Werbeartikel, der in jedem Meeting auffällt.",
    abMenge: "ab 25 Stück",
    image: "/img/produkte/powerbank-leuchtlogo.webp",
    imageAlt: "Schwarze Powerbank an einem Smartphone, das Logo leuchtet weiß",
    aiGenerated: false,
    spin: { frames: 64, path: "/frames/hero" },
  },
  {
    slug: "kopfhoerer",
    name: "Kabellose Kopfhörer",
    kategorie: "technik-gadgets",
    teaser:
      "In-Ear-Kopfhörer im bedruckbaren Lade-Case — Werbung, die deine Kunden jeden Tag im Ohr haben.",
    abMenge: "ab 50 Stück",
    image: "/img/produkte/kopfhoerer.webp",
    imageAlt: "Kabellose In-Ear-Kopfhörer mit Lade-Case",
    aiGenerated: false,
  },
  {
    slug: "smarttag",
    name: "Smart-Finder",
    kategorie: "technik-gadgets",
    teaser:
      "Bluetooth-Tracker für Schlüssel und Taschen — klein, smart und mit deinem Logo unterwegs.",
    abMenge: "ab 50 Stück",
    image: "/img/produkte/smarttag.webp",
    imageAlt: "Bluetooth-Tracker am Schlüsselbund",
    aiGenerated: false,
  },

  // Tassen & Trinkbecher
  {
    slug: "keramiktasse",
    name: "Keramiktassen mit eigenem Design",
    kategorie: "tassen-becher",
    teaser:
      "Vollflächig bedruckte Keramiktassen — vom Logo bis zum kompletten Wunschmotiv, spülmaschinenfest.",
    abMenge: "ab 72 Stück",
    image: "/img/produkte/keramiktasse.webp",
    imageAlt: "Bedruckte Keramiktassen mit individuellem Motiv",
    aiGenerated: false,
  },
  {
    slug: "thermobecher",
    name: "Thermobecher to go",
    kategorie: "tassen-becher",
    teaser:
      "Doppelwandiger Edelstahl-Becher, der Kaffee heiß und dein Logo sichtbar hält — im Auto, im Zug, im Büro.",
    abMenge: "ab 25 Stück",
    image: "/img/produkte/thermobecher.webp",
    imageAlt: "Edelstahl-Thermobecher mit Logogravur",
    aiGenerated: true,
  },

  // Büro & Schreibtisch
  {
    slug: "notizbuch",
    name: "Notizbücher mit Prägung",
    kategorie: "buero-schreibtisch",
    teaser:
      "Hardcover-Notizbücher mit Logo-Prägung — das Kundengeschenk, das in jedem Meeting auf dem Tisch liegt.",
    abMenge: "ab 50 Stück",
    image: "/img/produkte/notizbuch.webp",
    imageAlt: "Notizbuch mit geprägtem Logo auf dem Einband",
    aiGenerated: false,
  },
  {
    slug: "zettelbox",
    name: "Zettelbox „Wer schreibt, der bleibt“",
    kategorie: "buero-schreibtisch",
    teaser:
      "Bedruckte Zettelklötze und -boxen — der Klassiker, der monatelang auf dem Schreibtisch deiner Kunden steht.",
    abMenge: "ab 100 Stück",
    image: "/img/produkte/zettelbox.webp",
    imageAlt: "Bedruckte Zettelbox mit Kugelschreiber",
    aiGenerated: false,
  },

  // Wellness & Geschenksets
  {
    slug: "waermflasche",
    name: "Wärmflaschen im Fleece-Bezug",
    kategorie: "wellness-geschenksets",
    teaser:
      "Kuschelige Wärmflaschen mit besticktem Bezug — das Mitarbeitergeschenk für die kalte Jahreszeit.",
    abMenge: "ab 25 Stück",
    image: "/img/produkte/waermflasche.webp",
    imageAlt: "Wärmflaschen mit blauem Fleece-Bezug und Logo-Stick",
    aiGenerated: false,
  },
  {
    slug: "geschenkset",
    name: "Geschenksets nach Maß",
    kategorie: "wellness-geschenksets",
    teaser:
      "Individuell bestückte Präsentkartons — Tasse, Tee, Wärmflasche und mehr, zusammengestellt von Annette.",
    abMenge: "ab 20 Stück",
    image: "/img/produkte/geschenkset.webp",
    imageAlt: "Geschenkkarton mit Tasse, Tee und Wärmflasche",
    aiGenerated: false,
  },

  // Alltagshelfer & Unterwegs
  {
    slug: "regenschirm",
    name: "Regenschirme mit Logodruck",
    kategorie: "alltagshelfer",
    teaser:
      "Stabile Automatik-Schirme mit großflächigem Druck — deine mobile Werbefläche bei jedem Wetter.",
    abMenge: "ab 25 Stück",
    image: "/img/produkte/regenschirm.webp",
    imageAlt: "Aufgespannter Regenschirm mit Logodruck",
    aiGenerated: true,
  },
  {
    slug: "schluesselanhaenger",
    name: "Schlüsselanhänger",
    kategorie: "alltagshelfer",
    teaser:
      "Kordel-Anhänger in deinen Firmenfarben — der Streuartikel, der an jedem Schlüsselbund mitfährt.",
    abMenge: "ab 100 Stück",
    image: "/img/produkte/schluesselanhaenger.webp",
    imageAlt: "Kordel-Schlüsselanhänger in vier Farben",
    aiGenerated: false,
  },
  {
    slug: "brillenputztuch",
    name: "Brillenputztücher",
    kategorie: "alltagshelfer",
    teaser:
      "Mikrofasertücher mit vollflächigem Druck — günstig in der Menge, täglich in Gebrauch.",
    abMenge: "ab 250 Stück",
    image: "/img/produkte/brillenputztuch.webp",
    imageAlt: "Bedrucktes Mikrofaser-Brillenputztuch",
    aiGenerated: false,
  },

  // Textil & Mitarbeiterbekleidung (Material komplett KI-generiert, fiktives Beispiel-Logo)
  {
    slug: "softshelljacke",
    name: "Softshelljacken mit Stick",
    kategorie: "textil-mitarbeiterbekleidung",
    teaser:
      "Wind- und wasserabweisende Jacken mit gesticktem Logo — Workwear, die dein Team wirklich anzieht.",
    abMenge: "ab 20 Stück",
    image: "/img/produkte/softshelljacke.webp",
    imageAlt: "Softshelljacke mit gesticktem Firmenlogo",
    aiGenerated: true,
  },
  {
    slug: "polo",
    name: "Polos & T-Shirts",
    kategorie: "textil-mitarbeiterbekleidung",
    teaser:
      "Hochwertige Polos und Shirts mit Druck oder Stick — einheitlicher Auftritt für Laden, Messe und Baustelle.",
    abMenge: "ab 25 Stück",
    image: "/img/produkte/polo.webp",
    imageAlt: "Poloshirt mit gesticktem Logo auf der Brust",
    aiGenerated: true,
  },
  {
    slug: "cap",
    name: "Caps & Mützen",
    kategorie: "textil-mitarbeiterbekleidung",
    teaser:
      "Bestickte Caps und Beanies — Teamgefühl und Sichtbarkeit in einem, drinnen wie draußen.",
    abMenge: "ab 50 Stück",
    image: "/img/produkte/cap.webp",
    imageAlt: "Bestickte Cap mit Firmenlogo",
    aiGenerated: true,
  },
];

export function produkteByKategorie(slug: string): Produkt[] {
  return produkte.filter((p) => p.kategorie === slug);
}

export function getProdukt(slug: string): Produkt | undefined {
  return produkte.find((p) => p.slug === slug);
}
