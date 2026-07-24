export type Kategorie = {
  slug: string;
  name: string;
  /** Kurzname für Navigation und Kacheln */
  short: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Pfad unter public/, wird in M3 (Medien-Pipeline) produziert */
  heroImage: string;
  heroImageAi: boolean;
  useCases: [string, string, string];
};

export const kategorien: Kategorie[] = [
  {
    slug: "tassen-becher",
    name: "Tassen & Trinkbecher",
    short: "Tassen & Becher",
    h1: "Tassen & Trinkbecher mit deinem Logo",
    metaTitle: "Tassen & Trinkbecher mit Logo bedrucken | PROMOtrend Wiehl",
    metaDescription:
      "Bedruckte Tassen, Thermobecher und Trinkflaschen für dein Unternehmen — persönlich beraten von Annette Herrmann aus Wiehl. Schreib ihr direkt per WhatsApp.",
    intro:
      "Die Tasse steht jeden Morgen auf dem Schreibtisch deiner Kunden — kein anderer Werbeartikel wird so oft in die Hand genommen. Von der klassischen Keramiktasse bis zum doppelwandigen Thermobecher.",
    heroImage: "/img/kategorien/tassen-becher.webp",
    heroImageAi: true,
    useCases: [
      "Willkommenspaket für neue Mitarbeiter",
      "Kundengeschenk mit täglicher Sichtbarkeit",
      "Messe-Ausstattung mit Wiedererkennung",
    ],
  },
  {
    slug: "technik-gadgets",
    name: "Technik & Gadgets",
    short: "Technik",
    h1: "Technik-Gadgets, die dein Logo aufladen",
    metaTitle: "Powerbanks, Kopfhörer & Gadgets mit Logo | PROMOtrend Wiehl",
    metaDescription:
      "Powerbanks mit Leuchtlogo, Kopfhörer, Smart-Tracker und mehr — Werbetechnik, die wirklich benutzt wird. Beratung direkt von Annette Herrmann aus Wiehl.",
    intro:
      "Technik-Gadgets sind die Werbeartikel mit der längsten Lebensdauer: Eine Powerbank mit leuchtendem Logo wandert monatelang durch Meetings, Züge und Flughäfen — und dein Logo immer mit.",
    heroImage: "/img/kategorien/technik-gadgets.webp",
    heroImageAi: true,
    useCases: [
      "Premium-Geschenk für Schlüsselkunden",
      "Onboarding-Paket für Mitarbeiter",
      "Give-away auf Fachmessen mit Wow-Faktor",
    ],
  },
  {
    slug: "buero-schreibtisch",
    name: "Büro & Schreibtisch",
    short: "Büro",
    h1: "Büro-Klassiker, die auf dem Schreibtisch bleiben",
    metaTitle: "Notizbücher, Stifte & Büroartikel mit Logo | PROMOtrend Wiehl",
    metaDescription:
      "Notizbücher, Kugelschreiber, Zettelboxen und Schreibtisch-Helfer mit deinem Logo — kuratiert und beraten von Annette Herrmann, Werbeartikel-Spezialistin aus Wiehl.",
    intro:
      "Wer schreibt, der bleibt: Notizbücher, Stifte und Zettelboxen arbeiten jeden Tag auf dem Schreibtisch deiner Kunden — leise, nützlich und immer mit deinem Namen darauf.",
    heroImage: "/img/kategorien/buero-schreibtisch.webp",
    heroImageAi: true,
    useCases: [
      "Tagungs- und Seminar-Ausstattung",
      "Streuartikel mit geringen Stückkosten",
      "Hochwertige Notizbücher als Kundengeschenk",
    ],
  },
  {
    slug: "wellness-geschenksets",
    name: "Wellness & Geschenksets",
    short: "Geschenksets",
    h1: "Geschenksets, die Danke sagen",
    metaTitle: "Wellness-Artikel & Geschenksets mit Logo | PROMOtrend Wiehl",
    metaDescription:
      "Wärmflaschen, Präsentkörbe und Wellness-Sets für Mitarbeiter und Kunden — individuell zusammengestellt von Annette Herrmann aus Wiehl im Oberbergischen.",
    intro:
      "Manche Anlässe brauchen mehr als einen Kugelschreiber: Weihnachten, Jubiläen, ein ehrliches Dankeschön ans Team. Annette stellt Geschenksets zusammen, die sich nach Wertschätzung anfühlen.",
    heroImage: "/img/kategorien/wellness-geschenksets.webp",
    heroImageAi: true,
    useCases: [
      "Weihnachtsgeschenke für Kunden und Team",
      "Jubiläums- und Dankeschön-Pakete",
      "Get-Well-Sets für Mitarbeiter",
    ],
  },
  {
    slug: "alltagshelfer",
    name: "Alltagshelfer & Unterwegs",
    short: "Alltagshelfer",
    h1: "Alltagshelfer, die überall mit hinkommen",
    metaTitle: "Schirme, Anhänger & Alltagshelfer mit Logo | PROMOtrend Wiehl",
    metaDescription:
      "Regenschirme, Schlüsselanhänger, Brillenputztücher und mehr — praktische Werbeartikel für jeden Tag. Persönlich beraten von Annette Herrmann aus Wiehl.",
    intro:
      "Die besten Werbeartikel sind die, die man vermissen würde: der Schirm im Auto, der Anhänger am Schlüsselbund, das Putztuch in der Tasche. Klein im Preis, groß in der Reichweite.",
    heroImage: "/img/kategorien/alltagshelfer.webp",
    heroImageAi: true,
    useCases: [
      "Streuartikel für Messen und Aktionen",
      "Kundenbindung mit täglichem Nutzen",
      "Regionale Sichtbarkeit im Alltag",
    ],
  },
  {
    slug: "textil-mitarbeiterbekleidung",
    name: "Textil & Mitarbeiterbekleidung",
    short: "Textil",
    h1: "Mitarbeiterbekleidung, die dein Team trägt",
    metaTitle: "Mitarbeiterbekleidung & Textil mit Logo | PROMOtrend Wiehl",
    metaDescription:
      "T-Shirts, Polos, Softshelljacken und Caps mit Stick oder Druck — hochwertige Mitarbeiterbekleidung, beraten von Annette Herrmann aus Wiehl im Oberbergischen.",
    intro:
      "Dein Team ist deine sichtbarste Werbefläche: auf der Baustelle, im Laden, auf der Messe. Von der Softshelljacke bis zum Polo — bestickt oder bedruckt, in Qualität, die man gern trägt.",
    heroImage: "/img/kategorien/textil-mitarbeiterbekleidung.webp",
    heroImageAi: true,
    useCases: [
      "Einheitlicher Auftritt für dein Team",
      "Workwear mit Stick für den Alltag",
      "Merchandising für Vereine und Events",
    ],
  },
];

export function getKategorie(slug: string): Kategorie | undefined {
  return kategorien.find((k) => k.slug === slug);
}
