import Link from "next/link";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-[var(--header-h)] text-center">
      <p className="type-eyebrow mb-4 text-green">404</p>
      <h1 className="type-display max-w-2xl text-4xl md:text-6xl">
        Diesen Artikel gibt’s (noch) nicht.
      </h1>
      <p className="mt-5 max-w-md text-lg text-ink-soft">
        Aber bei 100.000 Artikeln findet Annette garantiert etwas Besseres.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <WhatsAppButton />
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 font-display text-[0.92rem] font-semibold transition-colors hover:border-ink/50"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
