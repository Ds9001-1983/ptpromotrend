"use client";

import { useEffect, useRef, useState } from "react";
import { SequenceLoader, drawCover, type SequenceManifest } from "@/lib/sequence-loader";
import { prefersReducedMotion } from "@/lib/device";
import { AiBadge } from "@/components/product/AiBadge";

/**
 * Drag-to-rotate-Frame-Ring: Nutzer dreht das Produkt selbst
 * (Pointer-Delta → Frame-Index, sanftes Austrudeln beim Loslassen).
 * Lädt lazy erst im Viewport. Fallback: statisches Poster.
 */
export function ProductSpin({
  manifest,
  poster,
  alt,
  ai = true,
}: {
  manifest: SequenceManifest;
  poster: string;
  alt: string;
  ai?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    let loader: SequenceLoader | null = null;
    let frame = 0;
    let velocity = 0;
    let raf = 0;
    let dragging = false;
    let lastX = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      if (!loader) return;
      const img = loader.nearest(frame);
      if (img) drawCover(ctx, img, canvas.width, canvas.height);
    };

    const resize = () => {
      canvas.width = Math.round(wrap.clientWidth * dpr);
      canvas.height = Math.round(wrap.clientHeight * dpr);
      draw();
    };

    const clampFrame = (f: number) =>
      Math.max(0, Math.min(manifest.count - 1, f));

    const tick = () => {
      if (!dragging && Math.abs(velocity) > 0.02) {
        frame = clampFrame(frame + velocity);
        velocity *= 0.94;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      wrap.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const delta = (dx / wrap.clientWidth) * manifest.count * 0.9;
      frame = clampFrame(frame + delta);
      velocity = delta;
      draw();
    };
    const onUp = () => {
      dragging = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loader) return;
        loader = new SequenceLoader(manifest);
        loader.onProgress = (n) => {
          if (n === 1 && !disposed) {
            setActive(true);
            resize();
          }
        };
        loader.load().then(() => !disposed && draw());
        io.disconnect();
      },
      { rootMargin: "60%" },
    );
    io.observe(wrap);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    raf = requestAnimationFrame(tick);
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
    };
  }, [manifest]);

  return (
    <div
      ref={wrapRef}
      data-cursor="Drehen"
      className="relative aspect-square w-full cursor-grab touch-pan-y overflow-hidden rounded-3xl bg-[#f4f4f2] active:cursor-grabbing"
      role="img"
      aria-label={`${alt} — ziehen, um das Produkt zu drehen`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: active ? 0 : 1 }}
        loading="lazy"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {ai && <AiBadge />}
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-paper/85 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-soft backdrop-blur-sm">
        Zum Drehen ziehen
      </span>
    </div>
  );
}
