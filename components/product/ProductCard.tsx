import { AiBadge } from "@/components/product/AiBadge";
import { WhatsAppIcon } from "@/components/cta/WhatsAppButton";
import { produktWaText, waLink } from "@/content/site-config";
import type { Produkt } from "@/content/produkte";

export function ProductCard({ produkt }: { produkt: Produkt }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-paper">
      <div className="relative aspect-square overflow-hidden bg-[#f4f4f1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={produkt.image}
          alt={produkt.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {produkt.aiGenerated && <AiBadge corner="top-right" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {produkt.name}
          </h3>
          <span className="whitespace-nowrap text-[0.8rem] text-ink-soft">
            {produkt.abMenge}
          </span>
        </div>
        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
          {produkt.teaser}
        </p>
        <a
          href={waLink(produktWaText(produkt.name))}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Anfragen"
          className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-mint px-4.5 py-2.5 text-[0.85rem] font-semibold text-green-deep transition-colors hover:bg-green hover:text-paper"
        >
          <WhatsAppIcon className="size-3.5" />
          Unverbindlich anfragen
        </a>
      </div>
    </article>
  );
}
