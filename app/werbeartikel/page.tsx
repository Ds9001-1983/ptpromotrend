import type { Metadata } from "next";
import { CategoryShowcase } from "@/components/sections/home/CategoryShowcase";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export const metadata: Metadata = {
  title: "Werbeartikel mit Logo — alle Kategorien",
  description:
    "Tassen, Technik, Büro, Geschenksets, Alltagshelfer und Mitarbeiterbekleidung — kuratierte Werbeartikel mit deinem Logo, beraten von Annette Herrmann aus Wiehl.",
  alternates: { canonical: "/werbeartikel/" },
};

export default function WerbeartikelHub() {
  return (
    <main className="pt-[var(--header-h)]">
      <section className="mx-auto max-w-[1440px] px-5 pt-[clamp(48px,7vw,96px)] md:px-10">
        <p className="type-eyebrow mb-4 text-green">Werbeartikel</p>
        <h1 className="type-display max-w-3xl text-4xl md:text-6xl">
          Kuratiert statt Katalog: unsere Highlights.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Das hier ist bewusst kein 100.000-Artikel-Shop. Annette zeigt dir
          eine kuratierte Auswahl — und findet auf Anfrage genau den Artikel,
          der zu deinem Anlass, Budget und Zeitplan passt.
        </p>
      </section>
      <CategoryShowcase />
      <ContactCTA />
    </main>
  );
}
