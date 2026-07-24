"use client";

export type SequenceManifest = {
  /** Basis-Pfad unter public/, z. B. "/frames/hero/desktop" */
  path: string;
  count: number;
  ext: "webp" | "jpg";
};

export function frameUrl(m: SequenceManifest, i: number): string {
  return `${m.path}/frame-${String(i).padStart(3, "0")}.${m.ext}`;
}

/**
 * Lädt eine Frame-Sequenz progressiv: erst Frame 0, dann jeder 4.,
 * dann die Lücken. Scrubben ist schon möglich, bevor alles da ist —
 * gezeichnet wird der nächstliegende geladene Frame.
 */
export class SequenceLoader {
  readonly manifest: SequenceManifest;
  private bitmaps: (ImageBitmap | HTMLImageElement | null)[];
  private loadedFlags: boolean[];
  loaded = 0;
  failed = false;
  onProgress?: (loaded: number, total: number) => void;

  constructor(manifest: SequenceManifest) {
    this.manifest = manifest;
    this.bitmaps = new Array(manifest.count).fill(null);
    this.loadedFlags = new Array(manifest.count).fill(false);
  }

  private loadOrder(): number[] {
    const { count } = this.manifest;
    const order: number[] = [0];
    for (let i = 4; i < count; i += 4) order.push(i);
    for (let i = 1; i < count; i++) if (i % 4 !== 0) order.push(i);
    return order;
  }

  async load(): Promise<void> {
    const order = this.loadOrder();
    // Frame 0 zuerst und blockierend — er ist das LCP-Sicherheitsnetz
    await this.loadFrame(0);
    const rest = order.slice(1);
    const CONCURRENCY = 6;
    let cursor = 0;
    const worker = async () => {
      while (cursor < rest.length) {
        const idx = rest[cursor++];
        await this.loadFrame(idx);
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  }

  private async loadFrame(i: number): Promise<void> {
    if (this.loadedFlags[i]) return;
    const url = frameUrl(this.manifest, i);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const blob = await res.blob();
      this.bitmaps[i] =
        "createImageBitmap" in window
          ? await createImageBitmap(blob)
          : await this.blobToImage(blob);
      this.loadedFlags[i] = true;
      this.loaded++;
      this.onProgress?.(this.loaded, this.manifest.count);
    } catch {
      if (i === 0) this.failed = true;
    }
  }

  private blobToImage(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  /** Nächstliegender bereits geladener Frame zu Index i. */
  nearest(i: number): ImageBitmap | HTMLImageElement | null {
    const n = this.manifest.count;
    const target = Math.max(0, Math.min(n - 1, Math.round(i)));
    if (this.loadedFlags[target]) return this.bitmaps[target];
    for (let d = 1; d < n; d++) {
      if (target - d >= 0 && this.loadedFlags[target - d]) return this.bitmaps[target - d];
      if (target + d < n && this.loadedFlags[target + d]) return this.bitmaps[target + d];
    }
    return null;
  }
}

/** Cover-Fit-Zeichnung (wie object-fit: cover) auf einen 2D-Canvas. */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap | HTMLImageElement,
  w: number,
  h: number,
) {
  const iw = img.width;
  const ih = img.height;
  const scale = Math.max(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
