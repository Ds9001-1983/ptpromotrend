import { waLink, waDefaultText } from "@/content/site-config";
import clsx from "clsx";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.3A10 10 0 1 0 12 2Zm5.46 14.12c-.23.65-1.35 1.24-1.86 1.28-.5.05-.97.24-3.27-.68-2.77-1.1-4.53-3.93-4.67-4.11-.13-.18-1.11-1.48-1.11-2.83 0-1.34.7-2 .95-2.28.25-.27.55-.34.73-.34l.52.01c.17.01.4-.06.62.48.23.55.78 1.9.85 2.04.07.14.11.3.02.48-.5 1.01-1.04.97-.77 1.43.99 1.7 1.98 2.29 3.48 3.04.26.13.41.11.56-.06.15-.18.64-.75.81-1 .17-.26.35-.21.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.1.06.62-.17 1.27Z" />
    </svg>
  );
}

type Props = {
  text?: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
};

export function WhatsAppButton({
  text = waDefaultText,
  label = "WhatsApp an Annette",
  size = "md",
  className,
}: Props) {
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Schreiben"
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-full bg-green font-display font-semibold text-paper",
        "transition-colors duration-200 hover:bg-green-deep",
        size === "md" && "px-6 py-3 text-[0.92rem]",
        size === "lg" && "px-8 py-4 text-base",
        className,
      )}
    >
      <WhatsAppIcon className={size === "lg" ? "size-5" : "size-4"} />
      {label}
    </a>
  );
}
