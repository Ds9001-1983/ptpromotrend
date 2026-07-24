/**
 * Extrahiert aus dem Hero-Turntable-Video eine Scroll-Scrub-Frame-Sequenz.
 *
 * Aufruf: node scripts/build-frames.mjs <video.mp4> [frameCount]
 * Output: public/frames/hero/frame-000.webp … + public/img/hero-poster.webp
 */
import { execSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [, , videoPath, countArg] = process.argv;
if (!videoPath) {
  console.error("Nutzung: node scripts/build-frames.mjs <video.mp4> [frameCount]");
  process.exit(1);
}
const FRAME_COUNT = Number(countArg ?? 64);
const OUT_DIR = "public/frames/hero";
const TMP_DIR = ".frames-tmp";
const SIZE = 960;

const duration = parseFloat(
  execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
  )
    .toString()
    .trim(),
);
console.log(`Video: ${duration.toFixed(2)} s → ${FRAME_COUNT} Frames`);

rmSync(TMP_DIR, { recursive: true, force: true });
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(TMP_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync("public/img", { recursive: true });

// Frames gleichmäßig über die Dauer verteilen (letzten Tick knapp vor Ende)
const fps = FRAME_COUNT / duration;
execSync(
  `ffmpeg -v error -i "${videoPath}" -vf "fps=${fps.toFixed(6)},scale=${SIZE}:${SIZE}:force_original_aspect_ratio=increase,crop=${SIZE}:${SIZE}" -frames:v ${FRAME_COUNT} "${TMP_DIR}/f-%04d.png"`,
);

const pngs = readdirSync(TMP_DIR)
  .filter((f) => f.endsWith(".png"))
  .sort();
console.log(`${pngs.length} PNGs extrahiert, konvertiere zu WebP …`);

let total = 0;
for (let i = 0; i < pngs.length; i++) {
  const out = path.join(OUT_DIR, `frame-${String(i).padStart(3, "0")}.webp`);
  await sharp(path.join(TMP_DIR, pngs[i])).webp({ quality: 72 }).toFile(out);
  total += statSync(out).size;
}

// Poster = Frame 0, etwas höhere Qualität
await sharp(path.join(TMP_DIR, pngs[0]))
  .webp({ quality: 84 })
  .toFile("public/img/hero-poster.webp");

rmSync(TMP_DIR, { recursive: true, force: true });
console.log(
  `✓ ${pngs.length} Frames → ${OUT_DIR} (${(total / 1024 / 1024).toFixed(2)} MB gesamt) + hero-poster.webp`,
);
