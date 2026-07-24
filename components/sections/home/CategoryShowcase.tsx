import Link from "next/link";
import { kategorien } from "@/content/kategorien";
import { Reveal } from "@/components/motion/Reveal";
import { AiBadge } from "@/components/product/AiBadge";

export function CategoryShowcase() {
  return (
    <section className="bg-ground">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(80px,10vw,160px)] md:px-10">
        <Reveal>
          <p className="type-eyebrow mb-4 text-green">Sortiment</p>
          <h2 className="type-display max-w-3xl text-4xl md:text-6xl">
            Sechs Wege zu deinem Werbeartikel.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kategorien.map((k, i) => (
            <Reveal key={k.slug} delay={(i % 3) * 80}>
              <Link
                href={`/werbeartikel/${k.slug}/`}
                data-cursor="Ansehen"
                className="group relative block overflow-hidden rounded-2xl bg-paper"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={k.heroImage}
                    alt={k.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  {k.heroImageAi && <AiBadge corner="top-right" />}
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {k.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-green transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
