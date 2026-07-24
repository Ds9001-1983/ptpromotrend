/**
 * Playwright-Smoke-Test gegen den statischen Export (http://localhost:4173).
 * Prüft: Routen laden ohne Console-Errors, Conversion-Links korrekt,
 * KI-Badges vorhanden, kein horizontaler Overflow auf Mobile,
 * Hero-Canvas ändert sich beim Scrollen.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const routes = [
  "/",
  "/werbeartikel/",
  "/werbeartikel/tassen-becher/",
  "/werbeartikel/technik-gadgets/",
  "/werbeartikel/buero-schreibtisch/",
  "/werbeartikel/wellness-geschenksets/",
  "/werbeartikel/alltagshelfer/",
  "/werbeartikel/textil-mitarbeiterbekleidung/",
  "/ueber-annette/",
  "/kontakt/",
  "/impressum/",
  "/datenschutz/",
];

const browser = await chromium.launch();
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`✗ ${msg}`);
};
const ok = (msg) => console.log(`✓ ${msg}`);

// 1) Alle Routen: Status + Console-Errors
for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
  if (!res || res.status() !== 200) fail(`${route}: HTTP ${res?.status()}`);
  else if (errors.length) fail(`${route}: Console-Errors: ${errors.slice(0, 2).join(" | ")}`);
  else ok(`${route} lädt fehlerfrei`);
  await page.close();
}

// 2) Conversion-Links auf der Startseite
{
  const page = await browser.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const wa = await page.locator('a[href^="https://wa.me/"]').count();
  const tel = await page.locator('a[href="tel:+492262752789"]').count();
  wa > 0 ? ok(`wa.me-Links vorhanden (${wa})`) : fail("keine wa.me-Links");
  tel > 0 ? ok(`tel:-Links vorhanden (${tel})`) : fail("keine tel:-Links");
  const waHref = await page.locator('a[href^="https://wa.me/"]').first().getAttribute("href");
  waHref?.includes("?text=") ? ok("WhatsApp-Link mit vorbefülltem Text") : fail("WhatsApp-Link ohne Text");
  await page.close();
}

// 3) KI-Badges auf KI-Medien (Kategorie-Seite + Hero)
{
  const page = await browser.newPage();
  await page.goto(BASE + "/werbeartikel/tassen-becher/", { waitUntil: "networkidle" });
  const badges = await page.getByText("KI-generiert").count();
  badges > 0 ? ok(`KI-Badges auf Kategorie-Seite (${badges})`) : fail("keine KI-Badges auf Kategorie-Seite");
  await page.close();
}

// 4) Mobile: kein horizontaler Overflow
{
  const page = await browser.newPage({ viewport: { width: 375, height: 700 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  overflow ? fail("horizontaler Overflow bei 375px") : ok("kein horizontaler Overflow bei 375px");
  await page.close();
}

// 5) Hero-Canvas ändert sich beim Scrollen (Scrub aktiv)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const shot = (sel) => page.locator(sel).screenshot();
  const before = await shot("#hero div.aspect-square canvas");
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.2));
  await page.waitForTimeout(800);
  const after = await shot("#hero div.aspect-square canvas");
  Buffer.compare(before, after) !== 0
    ? ok("Hero-Canvas reagiert auf Scroll (Frame-Wechsel)")
    : fail("Hero-Canvas ändert sich beim Scrollen nicht");
  await page.close();
}

// 6) prefers-reduced-motion: Poster statt Canvas, Inhalte sichtbar
{
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const posterVisible = await page.locator('img[src*="hero-poster"]').count();
  posterVisible > 0 ? ok("reduced-motion: statisches Poster aktiv") : fail("reduced-motion: kein Poster");
  await page.close();
}

await browser.close();
if (failures) {
  console.error(`\n${failures} Prüfungen fehlgeschlagen`);
  process.exit(1);
}
console.log("\nAlle Smoke-Tests bestanden.");
