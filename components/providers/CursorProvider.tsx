"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

/**
 * Custom-Cursor (site-weit, nur pointer:fine & ohne reduced-motion):
 * kleiner Ink-Punkt, der über Elementen mit [data-cursor="Label"]
 * zu einem beschrifteten Kreis aufgeht.
 */
export function CursorProvider() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power2.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      dot.classList.add("is-visible");
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (target) {
        label.textContent = target.dataset.cursor ?? "";
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
