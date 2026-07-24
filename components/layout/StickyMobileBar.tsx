"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { site, waLink } from "@/content/site-config";
import { WhatsAppIcon } from "@/components/cta/WhatsAppButton";

/**
 * Mobile Aktionsleiste: erscheint nach dem ersten Scroll-Viewport,
 * damit sie den Hero nicht verstellt. Nur < md sichtbar.
 */
export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-hairline bg-ground/90 p-2.5 backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-green py-3.5 font-display text-[0.9rem] font-semibold text-paper"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
      <a
        href={site.phoneHref}
        className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-paper py-3.5 font-display text-[0.9rem] font-semibold text-ink"
      >
        Anrufen
      </a>
    </div>
  );
}
