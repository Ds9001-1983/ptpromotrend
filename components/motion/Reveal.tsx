"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

/**
 * Sanfter Fade-up beim Eintritt in den Viewport (IntersectionObserver,
 * respektiert prefers-reduced-motion über die CSS-Klasse .rv).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "p" | "span" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={clsx("rv", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
