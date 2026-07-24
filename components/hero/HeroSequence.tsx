"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SequenceLoader, drawCover, type SequenceManifest } from "@/lib/sequence-loader";
import { prefersReducedMotion } from "@/lib/device";
import { AiBadge } from "@/components/product/AiBadge";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { ShaderBackground } from "@/components/webgl/ShaderBackground";

const MANIFEST: SequenceManifest = {
  path: "/frames/hero",
  count: 64,
  ext: "webp",
};

const POSTER = "/img/hero-poster.webp";

/** Headline-Wörter für den Stagger-Reveal (eigener Mini-Split statt SplitText). */
function StaggeredHeadline({ play }: { play: boolean }) {
  const words: { text: string; marker?: boolean }[] = [
    { text: "Werbung," },
    { text: "die" },
    { text: "man" },
    { text: "gern", marker: true },
    { text: "in", marker: true },
    { text: "die", marker: true },
    { text: "Hand", marker: true },
    { text: "nimmt." },
  ];
  return (
    <h1 className="type-display text-[clamp(2.6rem,6vw,4.8rem)]" aria-label="Werbung, die man gern in die Hand nimmt.">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <span
            className={clsx(
              "inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              w.marker && "marker-anim",
              w.marker && play && "in",
              play ? "translate-y-0" : "translate-y-[110%]",
            )}
            style={{ transitionDelay: `${i * 55}ms` }}
          >
            {w.text}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"loading" | "sequence" | "poster">("loading");
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setMode("poster");
      setEntered(true);
      return;
    }

    const loader = new SequenceLoader(MANIFEST);
    let disposed = false;
    let st: ScrollTrigger | undefined;
    let currentIndex = -1;
    let ro: ResizeObserver | undefined;

    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!canvas || !stage || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setMode("poster");
      setEntered(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = (index: number) => {
      const img = loader.nearest(index);
      if (!img) return;
      drawCover(ctx, img, canvas.width, canvas.height);
    };

    const resize = () => {
      canvas.width = Math.round(stage.clientWidth * dpr);
      canvas.height = Math.round(stage.clientHeight * dpr);
      if (currentIndex >= 0) draw(currentIndex);
      else draw(0);
    };

    loader.onProgress = (loaded, total) => {
      if (disposed) return;
      setProgress(loaded / total);
      // Sobald Frame 0 da ist, geht der Vorhang auf — der Rest lädt
      // progressiv weiter (nearest-frame-Zeichnung überbrückt Lücken).
      if (loaded === 1) {
        resize();
        draw(0);
        setMode("sequence");
        setEntered(true);
      }
    };

    loader
      .load()
      .then(() => {
        if (disposed) return;
        if (loader.failed) {
          setMode("poster");
          setEntered(true);
          return;
        }
        draw(currentIndex >= 0 ? currentIndex : 0);
      })
      .catch(() => {
        if (!disposed) {
          setMode("poster");
          setEntered(true);
        }
      });

    // Failsafe: Wenn nach 5 s nicht mal Frame 0 da ist → Poster-Modus
    const failsafe = window.setTimeout(() => {
      if (!disposed && loader.loaded === 0) {
        setMode("poster");
        setEntered(true);
      }
    }, 5000);

    ro = new ResizeObserver(resize);
    ro.observe(stage);

    st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (MANIFEST.count - 1));
        if (idx !== currentIndex) {
          currentIndex = idx;
          draw(idx);
        }
      },
    });

    return () => {
      disposed = true;
      window.clearTimeout(failsafe);
      st?.kill();
      ro?.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[250vh]" id="hero">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <ShaderBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-8 px-5 pt-[var(--header-h)] md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:px-10">
          <div className="pt-6 md:pt-0">
            <p
              className={clsx(
                "type-eyebrow mb-5 text-green transition-opacity duration-700",
                entered ? "opacity-100" : "opacity-0",
              )}
            >
              Werbeartikel aus Wiehl · seit 25 Jahren
            </p>
            <StaggeredHeadline play={entered} />
            <p
              className={clsx(
                "mt-6 max-w-md text-lg text-ink-soft transition-all delay-500 duration-700",
                entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              Kuratiert aus über 100.000 Artikeln und persönlich beraten von
              Annette Herrmann.
            </p>
            <div
              className={clsx(
                "mt-8 flex flex-wrap items-center gap-3.5 transition-all delay-700 duration-700",
                entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              <WhatsAppButton size="lg" />
              <PhoneButton size="lg" />
            </div>
          </div>

          <div
            ref={stageRef}
            data-cursor="Scrollen"
            className={clsx(
              "relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-3xl bg-[#f4f4f2] shadow-[0_30px_60px_-25px_rgba(14,21,18,0.25)] transition-all delay-300 duration-1000 sm:max-w-[420px] md:max-w-[560px]",
              entered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            {/* Poster ist sofort im Server-HTML → schnelles LCP; der Canvas
                zeichnet ab Frame 0 nahtlos darüber (identisches Motiv). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER}
              alt="Powerbank mit leuchtendem Logo an einem Smartphone"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {mode !== "poster" && (
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            )}
            <AiBadge />
          </div>
        </div>

        {/* Scroll-Hinweis */}
        <div
          className={clsx(
            "relative z-10 flex justify-center pb-6 transition-opacity delay-1000 duration-700",
            entered ? "opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Scrollen
            <span className="block h-8 w-px animate-pulse bg-ink-soft/50" />
          </div>
        </div>
      </div>

      {/* Preloader mit echtem Frame-Ladefortschritt */}
      <Preloader progress={progress} done={entered} />
    </section>
  );
}

function Preloader({ progress, done }: { progress: number; done: boolean }) {
  const [gone, setGone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Nur beim ersten Besuch der Session zeigen. sessionStorage kann bei
    // blockierten Cookies eine SecurityError werfen → immer abfangen.
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("pt-preloaded");
    } catch {
      /* Storage blockiert → Preloader einfach normal zeigen */
    }
    if (seen) {
      setSkipped(true);
      return;
    }
    if (done) {
      try {
        sessionStorage.setItem("pt-preloaded", "1");
      } catch {
        /* Storage blockiert → beim nächsten Load erneut zeigen, unkritisch */
      }
      const t = window.setTimeout(() => setGone(true), 750);
      return () => window.clearTimeout(t);
    }
  }, [done]);

  if (skipped || gone) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-ground transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        done ? "-translate-y-full" : "translate-y-0",
      )}
      aria-hidden="true"
    >
      <span className="font-display text-xl font-bold tracking-tight">
        PROMO<span className="text-green">trend</span>
      </span>
      <span className="font-display text-6xl font-semibold tabular-nums tracking-tight">
        {Math.round(progress * 100)}
        <span className="text-green">%</span>
      </span>
      <span className="h-px w-40 overflow-hidden bg-hairline">
        <span
          className="block h-full bg-green transition-[width] duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </span>
    </div>
  );
}
