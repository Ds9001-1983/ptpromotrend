/**
 * Bereitet Roh-Fotos aus Projektordner/ als Web-Assets in public/img/ auf.
 * KI-generierte/inszenierte Bilder entstehen separat in der Medien-Pipeline (M3).
 *
 * Aufruf: npm run images
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "Projektordner";
const NW = `${SRC}/Neue Werbeartikel`;

/** [Quelle, Ziel, maxBreite] — Ziel relativ zu public/ */
const jobs = [
  // Produktfotos (echt, nur optimiert)
  [`${NW}/Powerbank.jpg`, "img/produkte/powerbank-leuchtlogo.webp", 1000],
  [`${NW}/Kopfh”rer.jpg`, "img/produkte/kopfhoerer.webp", 900],
  [`${NW}/Smarttag.jpg`, "img/produkte/smarttag.webp", 900],
  [`${NW}/Tassen mit eigenem Design.jpeg`, "img/produkte/keramiktasse.webp", 900],
  [`${NW}/Notizbuch.jpg`, "img/produkte/notizbuch.webp", 1200],
  [`${NW}/Wer schreibt der bleibt.jpeg`, "img/produkte/zettelbox.webp", 900],
  [`${NW}/Wärmflaschen.jpeg`, "img/produkte/waermflasche.webp", 900],
  [`${NW}/Geschenksets.jpeg`, "img/produkte/geschenkset.webp", 900],
  [`${NW}/Schirm.jpg`, "img/produkte/regenschirm.webp", 1200],
  [`${NW}/Anhänger.jpg`, "img/produkte/schluesselanhaenger.webp", 1000],
  [`${NW}/Brillenputztuch.jpeg`, "img/produkte/brillenputztuch.webp", 900],
  // Personen & Marke
  [`${SRC}/Annette-Herrmann-Promotrend-Kopie-769x1024.jpg`, "img/annette.webp", 900],
  [`${SRC}/PROMOtrend-Annette-Herrmann-Compilation-1024x677.jpg`, "img/collage.webp", 1024],
];

let ok = 0;
for (const [src, dest, width] of jobs) {
  if (!existsSync(src)) {
    console.warn(`⚠ fehlt: ${src}`);
    continue;
  }
  const out = path.join("public", dest);
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  ok++;
}
console.log(`✓ ${ok}/${jobs.length} Bilder nach public/img/ exportiert`);

// App-Icon (Favicon-Quelle) aus dem Logo
const logo = `${SRC}/Promotrend-Logo-Profilbild-Facebook-1200x1200-1-1024x1024.jpg`;
if (existsSync(logo)) {
  await sharp(logo).resize(512, 512).png().toFile("app/icon.png");
  await sharp(logo).resize(180, 180).png().toFile("app/apple-icon.png");
  console.log("✓ app/icon.png + app/apple-icon.png erzeugt");
}
