# KI-Kennzeichnung (Art. 50 EU AI Act) — pt-promotrend.de

Stand: 24.07.2026 · Stichtag der Kennzeichnungspflicht: 02.08.2026

## Kennzeichnungs-Matrix

| Asset | Badge „✦ KI-generiert" | Metadaten (`XMP-iptcExt:DigitalSourceType`) |
|---|---|---|
| Hero-Turntable (Frames `public/frames/hero/`, Poster `hero-poster.webp`) | ja — DOM-Overlay über dem Canvas (`AiBadge` in `HeroSequence`) | Quell-Video `media-src/hero-turntable-v2.mp4` + Poster: `trainedAlgorithmicMedia` (Frames einzeln bewusst nicht — Skill-Regel) |
| 6 Kategorie-Heroes `public/img/kategorien/*.webp` | ja — `AiBadge` auf Kacheln + Kategorie-Hero | `trainedAlgorithmicMedia` ✓ |
| Produktbilder thermobecher, softshelljacke, polo, cap `public/img/produkte/` | ja — via `aiGenerated: true` in `content/produkte.ts` | `trainedAlgorithmicMedia` ✓ |
| `regenschirm.webp` (Kundenmaterial, wirkt KI-generiert/composited) | ja — vorsorglich als KI gekennzeichnet | `trainedAlgorithmicMedia` ✓ |
| Echte Produktfotos (Powerbank, Anhänger, ONI-/Schmidt-Fotos …) | nein | keine (nur verkleinert, keine KI-Bearbeitung) |
| Porträt Annette, Logo, Favicon, Shader/UI-Grafiken | nein | keine |

## Umsetzung im Code

- Badge-Komponente: `components/product/AiBadge.tsx` — dauerhaft sichtbar,
  `pointer-events-none`, „✦ KI-generiert" mit Text (nie Icon-only).
- Steuerung über Daten: `aiGenerated`-Flag in `content/produkte.ts`,
  `heroImageAi` in `content/kategorien.ts`.
- Automatischer Check: `scripts/qa-smoke.mjs` prüft, dass Badges auf
  Kategorie-Seiten gerendert werden.

## Metadaten-Tagging

```bash
exiftool -overwrite_original \
  -XMP-iptcExt:DigitalSourceType="https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" \
  <dateien>
# Verify:
exiftool -XMP-iptcExt:DigitalSourceType <datei>
```

Getaggt am 24.07.2026: 26 Dateien (Verify bestanden). Achtung: Nach jedem
Neu-Generieren von Frames (`npm run frames`) muss das Poster neu getaggt werden.

## Nachweise

Screenshots der ausgelieferten Badges liegen in `docs/ki-nachweise/`
(Abmahn-Nachweis: Badge sichtbar auf Hero und Kategorie-Bild).

## Werkzeuge & Herkunft

- Bilder: RunPod `z-image-turbo` (Text-zu-Bild), visuelle QA mit Re-Rolls
- Hero-Video: Higgsfield Seedance 2.0 (Bild-zu-Video, Input: echtes
  Produktfoto, freigestellt via Higgsfield remove_background)
- Kein KI-Material zeigt reale Personen; Referenz-Fotos echter
  Kundenprojekte wurden bewusst NICHT KI-verändert.
