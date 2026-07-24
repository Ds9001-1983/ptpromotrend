import { chromium } from "playwright";
const BASE = "https://ptpromotrend.vercel.app";
const routes = ["/", "/werbeartikel/", "/werbeartikel/tassen-becher/", "/werbeartikel/technik-gadgets/", "/ueber-annette/", "/kontakt/", "/impressum/", "/datenschutz/", "/gibtsnicht/"];
const b = await chromium.launch();
for (const vp of [{ width: 1440, height: 900, tag: "desktop" }, { width: 390, height: 844, tag: "mobile" }]) {
  for (const r of routes) {
    const p = await b.newPage({ viewport: { width: vp.width, height: vp.height } });
    const errs = [];
    p.on("pageerror", (e) => errs.push(String(e).split("\n")[0]));
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().split("\n")[0]));
    const res = await p.goto(BASE + r, { waitUntil: "networkidle", timeout: 45000 }).catch(() => null);
    const bodyText = await p.evaluate(() => document.body.innerText.slice(0, 80)).catch(() => "?");
    const isErrorPage = bodyText.includes("Application error");
    console.log(`${vp.tag} ${r} → HTTP ${res?.status()} ${isErrorPage ? "❌ ERROR-SCREEN" : "ok"} ${errs.length ? "| " + errs.slice(0, 2).join(" ;; ") : ""}`);
    await p.close();
  }
}
await b.close();
