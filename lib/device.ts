"use client";

/** true, wenn der Nutzer reduzierte Bewegung wünscht (SSR-sicher: false). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Heuristik für schwache Geräte: dort CSS-Fallback statt WebGL/Frame-Sequenzen.
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) return true;
  return false;
}
