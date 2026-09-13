# Styleguide — Francesco Castaldi

## Design Concept
**Heritage Gentlemen's Club / Archival Monograph** — Ultra-Low Cortisol, Old Money & Ralph Lauren aesthetic.
Serene, warm, tactile, and non-aggressive visual experience combining traditional bookbinding, Savile Row tailoring, and academic prestige with modern web performance.

---

## Color Palette (Design Tokens)

- **Primary Canvas (Void)**: `#121110` / `#161413` — Warm mahogany / deep espresso. Zero cold blacks or neon blue-light peaks.
- **Elevated Surfaces**: `#15261E` / `#1B2E24` — Deep British Racing Green / Forest Green.
- **Elevated Leather**: `#1A1715` — Dark burnished espresso leather.
- **Noble Accent**: `#C5A059` / `#D4AF37` — Satin antique gold for heraldic monograms, fine filigree, and Roman numerals.
- **Support Accents**:
  - Warm Cognac / Saddle Leather: `#8D5B4C`
  - Desaturated Sage / Slate: `#6D7D72`
- **Editorial Reading Typography**:
  - Soft Ivory: `#FAF6EE`
  - Warm Parchment: `#E8E3D6`
  - Muted Amber/Gold: `#D4AF37`
  - Dim Stone: `#7C8B82`
- **Fillet Borders**: `1px solid rgba(197, 160, 89, 0.20)` — Ultra-fine double and single hairline framing.

---

## Typography Hierarchy

- **Headings & Heraldic Title**: `EB Garamond` & `Cormorant Garamond` (Google Fonts), classical Roman serif proportions with traditional brackets.
- **Body, Excerpts & Longform**: `Newsreader` & `Source Serif 4`, relaxed leading (`line-height: 1.7`) and generous letter-spacing.
- **Small Caps & Roman Numerals**: Classical Roman numerals (`I.`, `II.`, `III.`, `IV.`, `V.`, `VI.`) replacing all modernist bracketed tags (`[ 01 // ... ]`).

---

## Brand & Iconography

- **Heraldic Monogram "FC"**: Intertwined Roman capitals surrounded by a subtle laurel wreath in satin antique gold over British Racing Green.
- **Icons**: `<HeritageIcon />` component using 0.85px hairline strokes with warm antique gold / sage tones.
- **Favicon**: Multi-resolution `favicon.ico`, `icon.png` (512x512), `apple-touch-icon.png` (180x180).

---

## Motion & Transitions
- Velvet transitions: `0.6s–0.8s` with relaxed cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Zero flashing, zero aggressive glows, zero high-frequency blinks.
