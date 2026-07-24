"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { site } from "@/content/site-config";

const links = [
  { href: "/werbeartikel/", label: "Werbeartikel" },
  { href: "/ueber-annette/", label: "Über Annette" },
  { href: "/kontakt/", label: "Kontakt" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("font-display font-bold tracking-tight text-[1.15rem]", className)}>
      PROMO<span className="text-green">trend</span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü zu, sobald ein Link geklickt wurde
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-hairline bg-ground/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="PROMOtrend – zur Startseite" data-cursor="Home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.92rem] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <WhatsAppButton label="WhatsApp" className="!px-5 !py-2.5 !text-[0.85rem]" />
        </nav>

        <button
          type="button"
          className="flex size-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={clsx(
              "h-0.5 w-6 rounded bg-ink transition-transform duration-300",
              open && "translate-y-1 rotate-45",
            )}
          />
          <span
            className={clsx(
              "h-0.5 w-6 rounded bg-ink transition-transform duration-300",
              open && "-translate-y-1 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile-Overlay */}
      <div
        className={clsx(
          "fixed inset-0 top-[var(--header-h)] z-40 flex flex-col bg-ground px-6 pb-10 pt-6 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-4 font-display text-3xl font-semibold tracking-tight"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <WhatsAppButton size="lg" className="justify-center" />
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-ink/20 px-8 py-4 font-display font-semibold"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
