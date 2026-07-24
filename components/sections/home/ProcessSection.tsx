"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";

const steps = [
  {
    title: "Du schickst dein Logo",
    text: "Per WhatsApp oder Anruf — erzähl kurz, was du brauchst, für wen und in welcher Stückzahl. Mehr braucht es nicht.",
  },
  {
    title: "Annette kuratiert",
    text: "Aus 100.000 Artikeln die drei bis fünf, die wirklich zu dir passen — mit ehrlicher Empfehlung und Angebot, in der Regel innerhalb von 24 Stunden.",
  },
  {
    title: "Geliefert & bedruckt",
    text: "Druckvorschau vor der Produktion, auf Wunsch ein Muster vorab — und dann pünktlich geliefert, ins Oberbergische und überallhin.",
  },
];

/**
 * Pin-Section (Signature-Move SM-03): bleibt stehen, während die drei
 * Schritte nacheinander aktiv werden. Bei reduced-motion: statische Liste.
 */
export function ProcessSection() {
  const outerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStaticMode(true);
      return;
    }
    const outer = outerRef.current;
    if (!outer) return;
    const st = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={outerRef}
      className={clsx("relative bg-paper", !staticMode && "h-[240vh]")}
    >
      <div
        className={clsx(
          !staticMode && "sticky top-0 flex h-screen items-center",
        )}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 py-[clamp(80px,8vw,120px)] md:px-10">
          <p className="type-eyebrow mb-4 text-green">So einfach geht’s</p>
          <h2 className="type-display max-w-2xl text-4xl md:text-6xl">
            Drei Schritte bis zu deinem Artikel.
          </h2>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={clsx(
                  "border-t-2 pt-6 transition-all duration-500",
                  !staticMode && active === i
                    ? "border-green opacity-100"
                    : !staticMode
                      ? "border-hairline opacity-40"
                      : "border-green opacity-100",
                )}
              >
                <span className="font-display text-sm font-semibold tabular-nums text-green">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14">
            <WhatsAppButton label="Schritt 1 starten" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
