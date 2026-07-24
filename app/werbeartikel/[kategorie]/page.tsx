import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKategorie, kategorien } from "@/content/kategorien";
import { produkteByKategorie } from "@/content/produkte";
import { kategorieWaText, site, waLink } from "@/content/site-config";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSpin } from "@/components/product/ProductSpin";
import { AiBadge } from "@/components/product/AiBadge";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export function generateStaticParams() {
  return kategorien.map((k) => ({ kategorie: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorie: string }>;
}): Promise<Metadata> {
  const { kategorie } = await params;
  const k = getKategorie(kategorie);
  if (!k) return {};
  return {
    title: { absolute: k.metaTitle },
    description: k.metaDescription,
    alternates: { canonical: `/werbeartikel/${k.slug}/` },
  };
}

export default async function KategorieSeite({
  params,
}: {
  params: Promise<{ kategorie: string }>;
}) {
  const { kategorie } = await params;
  const k = getKategorie(kategorie);
  if (!k) notFound();
  const produkte = produkteByKategorie(k.slug);
  const andere = kategorien.filter((x) => x.slug !== k.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Werbeartikel", item: `${site.domain}/werbeartikel/` },
      { "@type": "ListItem", position: 2, name: k.name, item: `${site.domain}/werbeartikel/${k.slug}/` },
    ],
  };

  return (
    <main className="pt-[var(--header-h)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Kategorie-Hero */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pt-[clamp(40px,6vw,80px)] md:grid-cols-2 md:gap-16 md:px-10">
        <div>
          <nav aria-label="Brotkrumen" className="mb-5 text-[0.85rem] text-ink-soft">
            <Link href="/werbeartikel/" className="transition-colors hover:text-ink">
              Werbeartikel
            </Link>{" "}
            <span aria-hidden="true">/</span> <span>{k.short}</span>
          </nav>
          <h1 className="type-display text-4xl md:text-6xl">{k.h1}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{k.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <WhatsAppButton text={kategorieWaText(k.name)} size="lg" />
            <PhoneButton size="lg" />
          </div>
        </div>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={k.heroImage}
              alt={k.name}
              className="aspect-[4/3] w-full object-cover"
              fetchPriority="high"
            />
            {k.heroImageAi && <AiBadge />}
          </div>
        </Reveal>
      </section>

      {/* Produkt-Highlights */}
      <section className="mx-auto max-w-[1440px] px-5 py-[clamp(64px,8vw,120px)] md:px-10">
        <Reveal>
          <h2 className="type-display text-3xl md:text-4xl">Annettes Highlights</h2>
          <p className="mt-3 max-w-xl text-ink-soft">
            Eine Auswahl — kein Limit. Wenn du etwas anderes suchst, findet
            Annette es im Vollsortiment.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produkte.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <ProductCard produkt={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Produkt-Spotlight: selbst drehen */}
      {(() => {
        const spinProdukt = produkte.find((p) => p.spin);
        if (!spinProdukt?.spin) return null;
        return (
          <section className="border-t border-hairline bg-ground">
            <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-[clamp(64px,8vw,120px)] md:grid-cols-2 md:gap-16 md:px-10">
              <Reveal>
                <div className="mx-auto w-full max-w-[480px]">
                  <ProductSpin
                    manifest={{ path: spinProdukt.spin.path, count: spinProdukt.spin.frames, ext: "webp" }}
                    poster="/img/hero-poster.webp"
                    alt={spinProdukt.imageAlt}
                  />
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <p className="type-eyebrow mb-4 text-green">Zum Anfassen nah</p>
                  <h2 className="type-display text-3xl md:text-5xl">
                    Dreh {spinProdukt.name === "Powerbank mit Leuchtlogo" ? "die Powerbank" : "es"} selbst.
                  </h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                    {spinProdukt.teaser} Zieh mit Maus oder Finger über das
                    Bild und schau dir jede Seite an.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Einsatzideen */}
      <section className="border-y border-hairline bg-paper">
        <div className="mx-auto max-w-[1440px] px-5 py-[clamp(64px,8vw,120px)] md:px-10">
          <Reveal>
            <h2 className="type-display text-3xl md:text-4xl">Wofür {k.short}?</h2>
          </Reveal>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {k.useCases.map((u, i) => (
              <Reveal key={u} delay={i * 80} as="li">
                <div className="border-t-2 border-green pt-5">
                  <span className="font-display text-sm font-semibold tabular-nums text-green">
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-lg font-medium">{u}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Weitere Kategorien */}
      <section className="mx-auto max-w-[1440px] px-5 py-[clamp(64px,8vw,120px)] md:px-10">
        <h2 className="type-eyebrow mb-6 text-ink-soft">Auch interessant</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {andere.map((a) => (
            <Link
              key={a.slug}
              href={`/werbeartikel/${a.slug}/`}
              data-cursor="Ansehen"
              className="group flex items-center justify-between rounded-xl border border-hairline bg-paper px-5 py-4 transition-colors hover:border-green"
            >
              <span className="font-display font-semibold">{a.name}</span>
              <span aria-hidden="true" className="text-green transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
