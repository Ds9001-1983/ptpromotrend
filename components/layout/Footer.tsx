import Link from "next/link";
import { kategorien } from "@/content/kategorien";
import { site, waLink } from "@/content/site-config";
import { Wordmark } from "@/components/layout/SiteHeader";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <p className="type-display max-w-4xl text-4xl md:text-6xl">
          Werbung, die man <span className="marker">gern in die Hand</span>{" "}
          nimmt.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <Wordmark className="text-[1.3rem]" />
            <address className="mt-4 text-[0.95rem] not-italic leading-relaxed text-ink-soft">
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city} ·{" "}
              {site.address.region}
            </address>
          </div>

          <div>
            <h2 className="type-eyebrow mb-4 text-ink-soft">Werbeartikel</h2>
            <ul className="grid gap-2.5">
              {kategorien.map((k) => (
                <li key={k.slug}>
                  <Link
                    href={`/werbeartikel/${k.slug}/`}
                    className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    {k.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-eyebrow mb-4 text-ink-soft">Direkter Draht</h2>
            <ul className="grid gap-2.5 text-[0.95rem]">
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-green transition-colors hover:text-green-deep"
                >
                  WhatsApp an Annette
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="text-ink-soft transition-colors hover:text-ink">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-5 text-[0.85rem] text-ink-soft">
              <li>
                <Link href="/impressum/" className="transition-colors hover:text-ink">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz/" className="transition-colors hover:text-ink">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-hairline pt-6 text-[0.82rem] text-ink-soft md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="opacity-80">
            Made with ❤️ by{" "}
            <a
              href="https://superbrand.marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-green"
            >
              SUPERBRAND.marketing
            </a>{" "}
            – Dein Superheld für deine Werbung.
          </p>
        </div>
      </div>
    </footer>
  );
}
