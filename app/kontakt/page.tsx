import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/cta/WhatsAppButton";
import { site, waLink } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Kontakt — direkter Draht zu Annette",
  description:
    "WhatsApp, Telefon oder E-Mail: Annette Herrmann antwortet persönlich. PROMOtrend, Römerstraße 234, 51674 Wiehl im Oberbergischen.",
  alternates: { canonical: "/kontakt/" },
};

const kanaele = [
  {
    label: "WhatsApp",
    value: "Direkt an Annette schreiben",
    href: waLink(),
    external: true,
    primary: true,
  },
  {
    label: "Telefon",
    value: site.phoneDisplay,
    href: site.phoneHref,
    external: false,
    primary: false,
  },
  {
    label: "E-Mail",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    primary: false,
  },
];

export default function Kontakt() {
  return (
    <main className="pt-[var(--header-h)]">
      <section className="mx-auto max-w-[1440px] px-5 pt-[clamp(40px,6vw,80px)] md:px-10">
        <p className="type-eyebrow mb-4 text-green">Kontakt</p>
        <h1 className="type-display max-w-3xl text-4xl md:text-6xl">
          Du schreibst. <span className="marker">Annette antwortet.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-ink-soft">
          Keine Hotline, kein Kontaktformular-Nirwana: Such dir den Weg aus,
          der dir am liebsten ist.
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-[clamp(48px,7vw,96px)] md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {kanaele.map((k, i) => (
            <Reveal key={k.label} delay={i * 80}>
              <a
                href={k.href}
                {...(k.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cursor={k.label}
                className={
                  k.primary
                    ? "group flex h-full flex-col justify-between gap-8 rounded-2xl bg-green p-7 text-paper transition-colors hover:bg-green-deep"
                    : "group flex h-full flex-col justify-between gap-8 rounded-2xl border border-hairline bg-paper p-7 transition-colors hover:border-green"
                }
              >
                <span className="flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-[0.16em]">
                  {k.primary && <WhatsAppIcon className="size-4" />}
                  {k.label}
                </span>
                <span className="font-display text-xl font-semibold tracking-tight">
                  {k.value}
                  <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 grid gap-8 rounded-2xl bg-warm p-8 md:grid-cols-2">
            <div>
              <h2 className="type-eyebrow mb-3 text-ink-soft">Anschrift</h2>
              <address className="text-lg not-italic leading-relaxed">
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </address>
            </div>
            <div>
              <h2 className="type-eyebrow mb-3 text-ink-soft">Anfahrt</h2>
              <p className="leading-relaxed text-ink-soft">
                Mitten im Oberbergischen — gut erreichbar aus Gummersbach,
                Waldbröl und dem Kölner Raum.{" "}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${site.legalName}, ${site.address.street}, ${site.address.zip} ${site.address.city}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green underline-offset-2 hover:underline"
                >
                  Route in Google Maps öffnen
                </a>
                {" "}(externer Link).
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
