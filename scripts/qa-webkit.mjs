import { webkit } from "playwright";
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERROR: " + String(e).split("\n").slice(0, 3).join(" | ")));
p.on("console", (m) => m.type() === "error" && errs.push(m.text().split("\n")[0]));
await p.goto("https://ptpromotrend.vercel.app/", { waitUntil: "networkidle", timeout: 45000 });
await p.waitForTimeout(2500);
// komplett durchscrollen (Scrub + alle Sektionen triggern)
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 350) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
});
await p.waitForTimeout(1500);
const bodyText = await p.evaluate(() => document.body.innerText.slice(0, 60));
console.log("Error-Screen:", bodyText.includes("Application error") ? "JA ❌" : "nein");
console.log("Fehler:", errs.slice(0, 6).join("\n") || "(keine)");
await p.screenshot({ path: "/tmp/webkit.png" });
await b.close();
