import type { Metadata } from "next";
import { site } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von PROMOtrend – Annette Herrmann, Wiehl.",
  alternates: { canonical: "/datenschutz/" },
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return (
    <main className="pt-[var(--header-h)]">
      <section className="mx-auto max-w-3xl px-5 py-[clamp(48px,7vw,96px)] md:px-10">
        <h1 className="type-display text-4xl md:text-5xl">Datenschutzerklärung</h1>

        <div className="mt-10 space-y-8 leading-relaxed">
          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">1. Verantwortliche</h2>
            <p>
              {site.legalName}
              <br />
              {site.address.street}, {site.address.zip} {site.address.city}
              <br />
              Telefon: {site.phoneDisplay} · E-Mail: {site.email}
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">2. Grundsätzliches</h2>
            <p>
              Diese Website ist eine rein statische Informationsseite. Sie
              verwendet <strong>keine Cookies</strong>, keine
              Analyse-/Tracking-Dienste und bindet keine Inhalte von
              Drittanbietern (z.&nbsp;B. Social-Media-Plugins, externe
              Schriftarten oder Kartendienste) ein. Alle Schriften werden
              lokal von unserem Server geladen.
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">3. Server-Logfiles</h2>
            <p>
              Beim Aufruf der Website verarbeitet unser Hosting-Anbieter
              automatisch technisch notwendige Daten (z.&nbsp;B. IP-Adresse,
              Datum und Uhrzeit des Abrufs, aufgerufene Seite, Browsertyp), um
              die Website auszuliefern und die Sicherheit und Stabilität des
              Betriebs zu gewährleisten (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f
              DSGVO). Diese Daten werden nicht mit anderen Datenquellen
              zusammengeführt und nach kurzer Zeit gelöscht.
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">4. Kontaktaufnahme</h2>
            <p>
              Wenn du uns per Telefon oder E-Mail kontaktierst, verarbeiten
              wir deine Angaben (Name, Kontaktdaten, Inhalt der Anfrage) zur
              Bearbeitung der Anfrage und für mögliche Anschlussfragen
              (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO). Die Daten werden
              gelöscht, sobald sie für die Bearbeitung nicht mehr benötigt
              werden und keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">5. Kontakt über WhatsApp</h2>
            <p>
              Wir bieten dir an, uns über den Messenger WhatsApp zu
              kontaktieren. Die Nutzung ist freiwillig — der Klick auf einen
              WhatsApp-Link auf dieser Website öffnet die WhatsApp-Anwendung
              auf deinem Gerät. Anbieter ist WhatsApp Ireland Limited, 4
              Grand Canal Square, Dublin 2, Irland (Teil der Meta-Gruppe).
              Bei der Nutzung von WhatsApp verarbeitet WhatsApp
              Metadaten der Kommunikation und übermittelt Daten ggf. auch in
              die USA; Grundlage sind die EU-Standardvertragsklauseln bzw. der
              EU-U.S. Data Privacy Framework. Inhalte der Kommunikation sind
              Ende-zu-Ende-verschlüsselt. Details findest du in der{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green hover:underline"
              >
                Datenschutzrichtlinie von WhatsApp
              </a>
              . Wenn du WhatsApp nicht nutzen möchtest, erreichst du uns
              genauso gut per Telefon oder E-Mail. Rechtsgrundlage der
              Verarbeitung ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO
              (Anbahnung/Durchführung eines Vertrags) bzw. lit.&nbsp;f DSGVO
              (unkomplizierte Kommunikation).
            </p>
          </section>

          <section>
            <h2 className="type-eyebrow mb-3 text-ink-soft">6. Deine Rechte</h2>
            <p>
              Du hast das Recht auf Auskunft (Art.&nbsp;15 DSGVO),
              Berichtigung (Art.&nbsp;16), Löschung (Art.&nbsp;17),
              Einschränkung der Verarbeitung (Art.&nbsp;18),
              Datenübertragbarkeit (Art.&nbsp;20) und Widerspruch
              (Art.&nbsp;21). Außerdem kannst du dich bei einer
              Datenschutz-Aufsichtsbehörde beschweren — zuständig ist die
              Landesbeauftragte für Datenschutz und Informationsfreiheit
              Nordrhein-Westfalen (ldi.nrw.de).
            </p>
          </section>

          <p className="text-[0.85rem] text-ink-soft">Stand: Juli 2026</p>
        </div>
      </section>
    </main>
  );
}
