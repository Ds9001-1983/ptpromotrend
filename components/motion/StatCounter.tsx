"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/device";

export function StatCounter({
  to,
  suffix = "",
  label,
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <div ref={ref}>
      <p className="font-display text-5xl font-semibold tabular-nums tracking-tight md:text-6xl">
        {value.toLocaleString("de-DE")}
        <span className="text-green">{suffix}</span>
      </p>
      <p className="mt-2 text-[0.95rem] text-ink-soft">{label}</p>
    </div>
  );
}
