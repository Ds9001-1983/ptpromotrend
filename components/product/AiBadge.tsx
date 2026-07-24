import clsx from "clsx";

/**
 * Pflicht-Kennzeichnung für KI-generierte Medien (Art. 50 EU AI Act).
 * Dauerhaft sichtbar, dezent, verdeckt kein Motiv. Nie nur als Icon.
 */
export function AiBadge({
  corner = "bottom-right",
  className,
}: {
  corner?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "pointer-events-none absolute z-20 inline-flex items-center gap-1.5 rounded-md",
        "bg-ink/70 px-2 py-1.5 text-[0.68rem] font-semibold text-paper backdrop-blur-sm",
        corner === "bottom-right" && "bottom-2.5 right-2.5",
        corner === "bottom-left" && "bottom-2.5 left-2.5",
        corner === "top-right" && "top-2.5 right-2.5",
        corner === "top-left" && "top-2.5 left-2.5",
        className,
      )}
    >
      <span aria-hidden="true" className="text-yellow">
        ✦
      </span>
      KI-generiert
    </span>
  );
}
