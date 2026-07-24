import { Reveal } from "@/components/motion/Reveal";

const projects = [
  { src: "/img/produkte/keramiktasse.webp", alt: "Bedruckte Tassen mit Kundenmotiv", caption: "Tassen mit Wunschmotiv" },
  { src: "/img/produkte/waermflasche.webp", alt: "Wärmflaschen mit besticktem Fleece-Bezug", caption: "Wärmflaschen fürs Team" },
  { src: "/img/produkte/geschenkset.webp", alt: "Geschenkkarton mit Tasse, Tee und Wärmflasche", caption: "Weihnachts-Geschenksets" },
  { src: "/img/produkte/zettelbox.webp", alt: "Bedruckte Zettelbox mit Kugelschreiber", caption: "Zettelboxen mit Logo" },
  { src: "/img/produkte/schluesselanhaenger.webp", alt: "Kordel-Schlüsselanhänger in vier Farben", caption: "Anhänger in Firmenfarben" },
  { src: "/img/produkte/brillenputztuch.webp", alt: "Bedrucktes Mikrofaser-Brillenputztuch", caption: "Brillenputztücher" },
];

/**
 * Bewusst unretuschierte Fotos aus echten Aufträgen — Authentizität
 * als Kontrast zur Studio-Welt (warmer Akzent aus Richtung 02).
 */
export function ProjectsGallery() {
  return (
    <section className="bg-warm">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(80px,10vw,160px)] md:px-10">
        <Reveal>
          <p className="type-eyebrow mb-4 text-green">Aus echten Aufträgen</p>
          <h2 className="type-display max-w-3xl text-4xl md:text-6xl">
            Gemacht, geliefert,{" "}
            <span className="marker">in Gebrauch</span>.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            Keine Studio-Inszenierung: Diese Fotos stammen direkt aus
            umgesetzten Kundenprojekten — so kommen die Artikel wirklich an.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 70} as="figure">
              <div className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-[0.85rem] text-ink-soft">
                {p.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
