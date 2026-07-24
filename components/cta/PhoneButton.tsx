import { site } from "@/content/site-config";
import clsx from "clsx";

type Props = {
  size?: "md" | "lg";
  className?: string;
  label?: string;
};

export function PhoneButton({ size = "md", className, label }: Props) {
  return (
    <a
      href={site.phoneHref}
      data-cursor="Anrufen"
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-full border border-ink/20 font-display font-semibold text-ink",
        "transition-colors duration-200 hover:border-ink/50",
        size === "md" && "px-6 py-3 text-[0.92rem]",
        size === "lg" && "px-8 py-4 text-base",
        className,
      )}
    >
      {label ?? site.phoneDisplay}
    </a>
  );
}
