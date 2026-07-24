import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-ground">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-[clamp(80px,10vw,160px)] md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:px-10">
        <Reveal>
          <div className="relative mx-auto max-w-[380px] overflow-hidden rounded-3xl md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/annette.webp"
              alt="Annette Herrmann auf einer Werbeartikel-Fachmesse"
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="type-eyebrow mb-4 text-green">Über Annette</p>
            <h2 className="type-display text-4xl md:text-6xl">
              „Bei mir landest du nie in der Warteschleife.“
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Seit 25 Jahren berät Annette Herrmann Unternehmen im
              Oberbergischen und weit darüber hinaus — vom Streuartikel bis zum
              kompletten Merchandising-Konzept. Du schreibst ihr direkt, sie
              antwortet persönlich. So einfach war Werbung schon lange nicht.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/ueber-annette/"
              data-cursor="Kennenlernen"
              className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-green transition-colors hover:text-green-deep"
            >
              Annette kennenlernen <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
