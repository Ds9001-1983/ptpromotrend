import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export const metadata: Metadata = {
  title: "Über Annette Herrmann — 25 Jahre Werbeartikel-Beratung",
  description:
    "Annette Herrmann berät seit 25 Jahren Unternehmen im Oberbergischen bei Werbeartikeln, Werbemitteln und Merchandising — persönlich, ehrlich und ohne Warteschleife.",
  alternates: { canonical: "/ueber-annette/" },
};

const werte = [
  {
    title: "Eine Ansprechpartnerin",
    text: "Vom ersten Anruf bis zur Lieferung sprichst du immer mit Annette selbst — nicht mit einem Ticketsystem.",
  },
  {
    title: "Ehrliche Empfehlung",
    text: "Wenn ein Artikel für deinen Zweck nichts taugt, sagt sie es dir — und zeigt dir, was besser funktioniert.",
  },
  {
    title: "Nachhaltig gedacht",
    text: "Auf Wunsch aus recyceltem PET, Baumwolle oder Bambus — Werbung, die man guten Gewissens verschenkt.",
  },
];

export default function UeberAnnette() {
  return (
    <main className="pt-[var(--header-h)]">
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pt-[clamp(40px,6vw,80px)] md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:px-10">
        <div>
          <p className="type-eyebrow mb-4 text-green">Über Annette</p>
          <h1 className="type-display text-4xl md:text-6xl">
            Hi, ich bin Annette — seit{" "}
            <span className="marker">25 Jahren</span> mache ich Werbung zum
            Anfassen.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Aus 25 Jahren Branchenerfahrung ist PROMOtrend geworden: der
            direkte Draht zu über 100.000 Werbeartikeln — kuratiert für
            Handwerksbetriebe, Mittelständler und Industriekunden aus dem
            Oberbergischen und ganz Deutschland.
          </p>
        </div>
        <Reveal>
          <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-3xl bg-warm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/annette.webp"
              alt="Annette Herrmann auf einer Werbeartikel-Fachmesse"
              className="w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-[clamp(64px,8vw,120px)] md:px-10">
        <div className="grid grid-cols-1 gap-10 border-y border-hairline py-12 sm:grid-cols-3">
          <Reveal>
            <StatCounter to={25} suffix=" Jahre" label="in der Werbeartikel-Branche" />
          </Reveal>
          <Reveal delay={80}>
            <StatCounter to={100000} suffix="+" label="Artikel im kuratierten Zugriff" />
          </Reveal>
          <Reveal delay={160}>
            <StatCounter to={100} suffix=" %" label="persönliche Beratung — keine Hotline" />
          </Reveal>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-[1440px] px-5 py-[clamp(64px,8vw,120px)] md:px-10">
          <Reveal>
            <h2 className="type-display max-w-2xl text-3xl md:text-5xl">So arbeite ich.</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {werte.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div className="border-t-2 border-green pt-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
