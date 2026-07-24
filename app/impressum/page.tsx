import type { Metadata } from "next";
import { site } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von PROMOtrend – Annette Herrmann, Wiehl.",
  alternates: { canonical: "/impressum/" },
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return (
    <main className="pt-[var(--header-h)]">
      <section className="mx-auto max-w-3xl px-5 py-[clamp(48px,7vw,96px)] md:px-10">
        <h1 className="type-display text-4xl md:text-5xl">Impressum</h1>

        <div className="mt-10 space-y-8 leading-relaxed">
          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">Angaben gemäß § 5 DDG</h2>
            <p>
              {site.legalName} (Einzelunternehmen)
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">Kontakt</h2>
            <p>
              Telefon: <a href={site.phoneHref} className="text-green hover:underline">{site.phoneDisplay}</a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${site.email}`} className="text-green hover:underline">
                {site.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">Umsatzsteuer-Identifikationsnummer</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:{" "}
              {site.vatId}
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">
              Verantwortlich im Sinne des § 18 Abs. 2 MStV
            </h2>
            <p>
              {site.owner}
              <br />
              {site.address.street}, {site.address.zip} {site.address.city}
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
