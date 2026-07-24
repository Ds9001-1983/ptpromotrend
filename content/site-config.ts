export const site = {
  name: "PROMOtrend",
  owner: "Annette Herrmann",
  legalName: "PROMOtrend – Annette Herrmann",
  domain: "https://pt-promotrend.de",
  claim: "Der Spezialist für Ihre Werbemittel-Auswahl",
  phoneDisplay: "02262 752789",
  phoneHref: "tel:+492262752789",
  email: "info@pt-promotrend.de",
  address: {
    street: "Römerstraße 234",
    zip: "51674",
    city: "Wiehl",
    region: "Oberbergischer Kreis",
  },
  vatId: "DE253406755",
  /**
   * TODO vor Launch: echte WhatsApp-Business-Nummer von Annette eintragen
   * (internationales Format ohne "+", z. B. "4917612345678").
   * Bis dahin Festnetz als Platzhalter, damit Links valide sind.
   */
  whatsappNumber: "492262752789",
} as const;

export const waDefaultText =
  "Hi Annette, ich habe eine Frage zu Werbeartikeln.";

export function waLink(text: string = waDefaultText): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function produktWaText(produktName: string): string {
  return `Hi Annette, ich interessiere mich für „${produktName}" mit unserem Logo. Menge: ca. ___ Stück. Kannst du mir ein Angebot machen?`;
}

export function kategorieWaText(kategorieName: string): string {
  return `Hi Annette, ich suche Werbeartikel aus dem Bereich ${kategorieName}. Kannst du mich beraten?`;
}
