import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";

export function IntroStatement() {
  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(80px,10vw,160px)] md:px-10">
        <Reveal>
          <p className="type-display max-w-5xl text-[clamp(2rem,4.6vw,3.8rem)]">
            Kein Katalog-Dschungel, keine Warteschleife:{" "}
            <span className="text-ink-soft">
              Annette findet aus <span className="marker">100.000 Artikeln</span>{" "}
              die, die zu dir passen.
            </span>
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-20">
          <Reveal delay={0}>
            <StatCounter to={25} suffix=" Jahre" label="Erfahrung in der Werbeartikel-Branche" />
          </Reveal>
          <Reveal delay={80}>
            <StatCounter to={100000} suffix="+" label="Artikel im kuratierten Zugriff" />
          </Reveal>
          <Reveal delay={160}>
            <StatCounter to={100} suffix=" %" label="persönlich — von der Idee bis zur Lieferung: Annette selbst" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
