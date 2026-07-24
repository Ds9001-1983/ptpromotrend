import { chromium } from "playwright";
const BASE = "http://localhost:4173";
const OUT = process.argv[2];
const browser = await chromium.launch();

async function shootPage(url, name, { width = 1440, height = 900, fullAfterScroll = true } = {}) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(BASE + url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  if (fullAfterScroll) {
    // Durchscrollen, um Reveals/Pin-Sections auszulösen
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
  }
  await page.screenshot({ path: `${OUT}/${name}-top.png` });
  if (fullAfterScroll) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${name}-bottom.png` });
  }
  await page.close();
}

// Hero mitten in der Rotation
async function shootHeroMid() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.1));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/home-hero-mid.png` });
  await page.close();
}

await shootPage("/", "home");
await shootHeroMid();
await shootPage("/werbeartikel/tassen-becher/", "kat-tassen");
await shootPage("/ueber-annette/", "ueber");
await shootPage("/kontakt/", "kontakt", { fullAfterScroll: false });
// Mobile
await shootPage("/", "home-mobile", { width: 390, height: 844 });
await browser.close();
console.log("done");
