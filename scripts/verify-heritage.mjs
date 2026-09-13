#!/usr/bin/env node
/**
 * ==============================================================================
 * HERITAGE VERIFICATION TEST SUITE (4-TIER ARCHITECTURE)
 * ==============================================================================
 * Project: Francesco Castaldi Website — Old Money & Ralph Lauren Heritage Restyling
 * Author: Test Writer 1 (Opaque-Box QA Engineer)
 * Reference: ORIGINAL_REQUEST.md & PROJECT.md
 *
 * Test Tiers:
 *   Tier 1 — Feature Coverage (Tokens, Fonts, Brand Assets, Route Definitions)
 *   Tier 2 — Boundary & Corner Cases (404 Styling, Empty States, Mobile Nav, SVG Attributes)
 *   Tier 3 — Cross-Feature Interactions (Monogram Matching, Nav Links, Slug Parity)
 *   Tier 4 — Real-World Scenarios (Static Export 60 Pages, Clean UTF-8, 0 BOM, 0 Mojibake)
 *
 * Usage:
 *   node scripts/verify-heritage.mjs
 *   node scripts/verify-heritage.mjs --tier=1
 *   node scripts/verify-heritage.mjs --tier=2
 *   node scripts/verify-heritage.mjs --tier=3
 *   node scripts/verify-heritage.mjs --tier=4
 *   node scripts/verify-heritage.mjs --json
 *   node scripts/verify-heritage.mjs --permissive
 * ==============================================================================
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// CLI Arguments
const args = process.argv.slice(2);
const tierArg = args.find((a) => a.startsWith("--tier="))?.split("=")[1];
const targetTier = tierArg ? parseInt(tierArg, 10) : null;
const isJson = args.includes("--json");
const isPermissive = args.includes("--permissive");
const showHelp = args.includes("--help") || args.includes("-h");

if (showHelp) {
  console.log(`
Heritage Verification Test Suite Runner
Usage: node scripts/verify-heritage.mjs [options]

Options:
  --tier=N       Run only tests in Tier N (1, 2, 3, or 4)
  --json         Output results as machine-readable JSON
  --permissive   Always exit with code 0 even if assertions fail
  --help, -h     Show this help message
`);
  process.exit(0);
}

// Terminal Colors
const useColor = !process.env.NO_COLOR && process.stdout.isTTY !== false;
const colors = {
  reset: useColor ? "\x1b[0m" : "",
  bold: useColor ? "\x1b[1m" : "",
  dim: useColor ? "\x1b[2m" : "",
  gold: useColor ? "\x1b[38;2;197;160;89m" : "",
  green: useColor ? "\x1b[32m" : "",
  red: useColor ? "\x1b[31m" : "",
  yellow: useColor ? "\x1b[33m" : "",
  cyan: useColor ? "\x1b[36m" : "",
  gray: useColor ? "\x1b[90m" : "",
};

// Test Runner Harness
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
    this.currentTier = null;
  }

  setTier(tierNumber, tierName, description) {
    this.currentTier = { number: tierNumber, name: tierName, description };
  }

  test(id, title, testFn, metadata = {}) {
    this.tests.push({
      tier: this.currentTier?.number || 0,
      tierName: this.currentTier?.name || "General",
      id,
      title,
      testFn,
      metadata,
    });
  }

  async run() {
    for (const t of this.tests) {
      if (targetTier !== null && t.tier !== targetTier) {
        continue;
      }

      const startTime = performance.now();
      let passed = false;
      let error = null;
      let details = null;

      try {
        const outcome = await t.testFn();
        passed = true;
        if (typeof outcome === "object" && outcome !== null) {
          details = outcome;
        }
      } catch (err) {
        passed = false;
        error = err.message || String(err);
      }

      const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

      this.results.push({
        tier: t.tier,
        tierName: t.tierName,
        id: t.id,
        title: t.title,
        passed,
        error,
        details,
        durationMs,
        source: t.metadata.source || "ORIGINAL_REQUEST.md",
        milestone: t.metadata.milestone || "General",
      });
    }
  }
}

const runner = new TestRunner();

// Helper Functions
function fileExists(relPath) {
  return fs.existsSync(path.join(ROOT_DIR, relPath));
}

function readFileUtf8(relPath) {
  if (!fileExists(relPath)) return null;
  return fs.readFileSync(path.join(ROOT_DIR, relPath), "utf8");
}

function getFileSize(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) return 0;
  return fs.statSync(fullPath).size;
}

function collectFiles(dirRel, filterRegex, ignoreList = ["node_modules", ".git", ".next"]) {
  const fullDir = path.join(ROOT_DIR, dirRel);
  if (!fs.existsSync(fullDir)) return [];
  const results = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (ignoreList.includes(entry.name)) continue;
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (!filterRegex || filterRegex.test(entry.name)) {
        results.push(path.relative(ROOT_DIR, entryPath));
      }
    }
  }

  walk(fullDir);
  return results;
}

// ==============================================================================
// TIER 1: FEATURE COVERAGE
// ==============================================================================
runner.setTier(
  1,
  "Tier 1: Feature Coverage",
  "Verifies core design tokens, Google fonts, brand assets, and route definitions"
);

// 1.1 Primary Canvas Mahogany / Deep Espresso Palette
runner.test(
  "T1.1",
  "Design Tokens — Primary Canvas Mahogany/Espresso (#121110 / #161413)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasMahogany = /#121110|#161413/i.test(css);
    if (!hasMahogany) {
      throw new Error(
        "Expected warm mahogany/espresso canvas token (#121110 or #161413) in globals.css @theme, but neither was found."
      );
    }
    return { status: "Found mahogany/espresso token in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.2 Elevated Surfaces British Racing Green Palette
runner.test(
  "T1.2",
  "Design Tokens — British Racing Green Surfaces (#15261E / #1B2E24 / #1A1715)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasGreen = /#15261E|#1B2E24|#1A1715/i.test(css);
    if (!hasGreen) {
      throw new Error(
        "Expected British Racing Green or dark leather elevated surface token (#15261E, #1B2E24, or #1A1715) in globals.css."
      );
    }
    return { status: "Found British Racing Green surface token in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.3 Noble Accent Antique Satin Gold Palette
runner.test(
  "T1.3",
  "Design Tokens — Antique Satin Gold Noble Accent (#C5A059 / #D4AF37)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasGold = /#C5A059|#D4AF37/i.test(css);
    if (!hasGold) {
      throw new Error(
        "Expected warm antique satin gold accent token (#C5A059 or #D4AF37) in globals.css."
      );
    }
    return { status: "Found antique satin gold accent token in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.4 Warm Leather & Sage Secondary Accents
runner.test(
  "T1.4",
  "Design Tokens — Warm Cognac Leather & Sage Accents (#8D5B4C / #6D7D72)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasCognac = /#8D5B4C/i.test(css);
    const hasSage = /#6D7D72/i.test(css);
    if (!hasCognac && !hasSage) {
      throw new Error(
        "Expected warm cognac (#8D5B4C) or sage slate (#6D7D72) accent token in globals.css."
      );
    }
    return { status: "Found cognac / sage accent token in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.5 Soft Ivory & Warm Parchment Typography Palette
runner.test(
  "T1.5",
  "Design Tokens — Soft Ivory & Warm Parchment Typography (#FAF6EE / #E8E3D6)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasIvory = /#FAF6EE|#E8E3D6/i.test(css);
    if (!hasIvory) {
      throw new Error(
        "Expected soft ivory (#FAF6EE) or warm parchment (#E8E3D6) text token in globals.css."
      );
    }
    return { status: "Found soft ivory / parchment token in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.6 Satin Gold Hairline Border Token
runner.test(
  "T1.6",
  "Design Tokens — Hairline Satin Gold Fillet (rgba(197, 160, 89, 0.20))",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasHairline = /rgba\(\s*197\s*,\s*160\s*,\s*89/i.test(css);
    if (!hasHairline) {
      throw new Error(
        "Expected satin gold hairline border definition rgba(197, 160, 89, ...) in globals.css."
      );
    }
    return { status: "Found satin gold hairline border token in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.7 Rejection of Cold Asphalt Primary Canvas
runner.test(
  "T1.7",
  "Design Tokens — Elimination of Cold Asphalt Void (#0b0c0e as Active Canvas)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const isColdVoid = /--color-space-void:\s*#0b0c0e/i.test(css);
    if (isColdVoid) {
      throw new Error(
        "Cold asphalt token #0b0c0e is still assigned to --color-space-void. Must be replaced with warm mahogany #121110."
      );
    }
    return { status: "Verified --color-space-void does not map to cold #0b0c0e" };
  },
  { source: "ORIGINAL_REQUEST.md §R1", milestone: "M1" }
);

// 1.8 Google Fonts Preconnect in Layout
runner.test(
  "T1.8",
  "Typography — Google Fonts Preconnect in src/app/layout.tsx",
  async () => {
    const layout = readFileUtf8("src/app/layout.tsx");
    if (!layout) throw new Error("src/app/layout.tsx not found");

    const hasFontsPreconnect = layout.includes("https://fonts.googleapis.com");
    const hasGstaticPreconnect = layout.includes("https://fonts.gstatic.com");
    if (!hasFontsPreconnect || !hasGstaticPreconnect) {
      throw new Error(
        "Expected preconnect links to https://fonts.googleapis.com and https://fonts.gstatic.com in layout.tsx."
      );
    }
    return { status: "Preconnect links verified in layout.tsx" };
  },
  { source: "ORIGINAL_REQUEST.md §R2", milestone: "M1" }
);

// 1.9 Prestigious Serif Fonts Linked in Layout
runner.test(
  "T1.9",
  "Typography — Garamond, Newsreader/Source Serif, & Cinzel in Layout Link",
  async () => {
    const layout = readFileUtf8("src/app/layout.tsx");
    if (!layout) throw new Error("src/app/layout.tsx not found");

    const hasGaramond = /Cormorant\+Garamond|EB\+Garamond/i.test(layout);
    const hasEditorialSerif = /Newsreader|Source\+Serif/i.test(layout);
    const hasCinzel = /Cinzel/i.test(layout);

    if (!hasGaramond || !hasEditorialSerif || !hasCinzel) {
      throw new Error(
        `Expected Google Fonts link to include Garamond (found: ${hasGaramond}), Newsreader/Source Serif (found: ${hasEditorialSerif}), and Cinzel (found: ${hasCinzel}).`
      );
    }
    return { status: "All required noble serif font families linked in layout.tsx" };
  },
  { source: "ORIGINAL_REQUEST.md §R2", milestone: "M1" }
);

// 1.10 Serif Font Family Variables Declared in Globals
runner.test(
  "T1.10",
  "Typography — Serif Font Family Mapping in src/styles/globals.css",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasSerifMapping = /--font-serif|--font-display|--font-heading|--font-body/i.test(css);
    const hasGaramondOrSerif = /Garamond|Newsreader|Source Serif|serif/i.test(css);

    if (!hasSerifMapping || !hasGaramondOrSerif) {
      throw new Error(
        "Expected serif font family token mappings (--font-serif, --font-display, etc.) in globals.css."
      );
    }
    return { status: "Serif font family variables declared in globals.css" };
  },
  { source: "PROJECT.md Architecture § Typography", milestone: "M1" }
);

// 1.11 Brand Asset — Favicon Exists and Non-Empty
runner.test(
  "T1.11",
  "Brand Assets — public/favicon.ico Exists & Non-Empty",
  async () => {
    const size = getFileSize("public/favicon.ico");
    if (size === 0) {
      throw new Error("public/favicon.ico does not exist or has 0 bytes.");
    }
    return { sizeBytes: size };
  },
  { source: "ORIGINAL_REQUEST.md §R3", milestone: "M2" }
);

// 1.12 Brand Asset — Standard Touch Icon Exists
runner.test(
  "T1.12",
  "Brand Assets — public/icon.png Exists & Non-Empty",
  async () => {
    const size = getFileSize("public/icon.png");
    if (size === 0) {
      throw new Error("public/icon.png does not exist or has 0 bytes.");
    }
    return { sizeBytes: size };
  },
  { source: "ORIGINAL_REQUEST.md §R3", milestone: "M2" }
);

// 1.13 Brand Asset — Apple Touch Icon Exists
runner.test(
  "T1.13",
  "Brand Assets — public/apple-touch-icon.png Exists & Non-Empty",
  async () => {
    const size = getFileSize("public/apple-touch-icon.png");
    if (size === 0) {
      throw new Error("public/apple-touch-icon.png does not exist or has 0 bytes.");
    }
    return { sizeBytes: size };
  },
  { source: "ORIGINAL_REQUEST.md §R3", milestone: "M2" }
);

// 1.14 Brand Asset — Heraldic Logo SVG Exists & Valid
runner.test(
  "T1.14",
  "Brand Assets — public/assets/img/brand/logo.svg Exists & Valid SVG",
  async () => {
    const svgContent = readFileUtf8("public/assets/img/brand/logo.svg");
    if (!svgContent) {
      throw new Error("public/assets/img/brand/logo.svg does not exist.");
    }
    if (!svgContent.includes("<svg") || !svgContent.includes("</svg>")) {
      throw new Error("public/assets/img/brand/logo.svg is missing root <svg> tags.");
    }
    return { status: "Valid SVG brand logo confirmed" };
  },
  { source: "ORIGINAL_REQUEST.md §R3", milestone: "M2" }
);

// 1.15 Static Route Definitions & SSG Export Functions
runner.test(
  "T1.15",
  "Route Architecture — generateStaticParams Defined in Dynamic Routes",
  async () => {
    const blogDynamic = readFileUtf8("src/app/blog/[slug]/page.tsx");
    const projectDynamic = readFileUtf8("src/app/project/[slug]/page.tsx");
    const skillDynamic = readFileUtf8("src/app/skill/[id]/page.tsx");

    if (!blogDynamic || !blogDynamic.includes("generateStaticParams")) {
      throw new Error("src/app/blog/[slug]/page.tsx is missing generateStaticParams().");
    }
    if (!projectDynamic || !projectDynamic.includes("generateStaticParams")) {
      throw new Error("src/app/project/[slug]/page.tsx is missing generateStaticParams().");
    }
    if (!skillDynamic || !skillDynamic.includes("generateStaticParams")) {
      throw new Error("src/app/skill/[id]/page.tsx is missing generateStaticParams().");
    }
    return { status: "All 3 dynamic routes properly export generateStaticParams" };
  },
  { source: "PROJECT.md Feature 14", milestone: "M4" }
);

// ==============================================================================
// TIER 2: BOUNDARY & CORNER CASES
// ==============================================================================
runner.setTier(
  2,
  "Tier 2: Boundary & Corner Cases",
  "Verifies 404 page styling, empty states, mobile responsive rules, and SVG geometry"
);

// 2.1 404 Page Low-Cortisol Styling (Absence of Harsh Neon Amber Glow)
runner.test(
  "T2.1",
  "Corner Cases — 404 Page Low-Cortisol Styling & Elimination of Neon Amber Glow",
  async () => {
    const notFound = readFileUtf8("src/app/not-found.tsx");
    if (!notFound) throw new Error("src/app/not-found.tsx not found");

    const hasHarshAmber = /rgba\(\s*245\s*,\s*158\s*,\s*11/i.test(notFound);
    if (hasHarshAmber) {
      throw new Error(
        "src/app/not-found.tsx still contains high-contrast neon amber glow rgba(245, 158, 11, ...). Must use satin gold/warm palette."
      );
    }
    const hasHomeLink = notFound.includes('href="/"');
    if (!hasHomeLink) {
      throw new Error("src/app/not-found.tsx missing return link to root home ('/').");
    }
    return { status: "404 page adheres to low-cortisol styling without harsh neon glow" };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M3" }
);

// 2.2 404 Page Classical Typography or Roman Numerals
runner.test(
  "T2.2",
  "Corner Cases — 404 Page Classical Headings (No Raw Monospace Brackets)",
  async () => {
    const notFound = readFileUtf8("src/app/not-found.tsx");
    if (!notFound) throw new Error("src/app/not-found.tsx not found");

    const hasBracketedMono = /\[\s*404\s*\/\/\s*NOT_FOUND\s*\]/i.test(notFound);
    if (hasBracketedMono) {
      throw new Error(
        "src/app/not-found.tsx contains raw monospace bracketed label '[ 404 // NOT_FOUND ]'."
      );
    }
    return { status: "404 page uses classical editorial presentation" };
  },
  { source: "ORIGINAL_REQUEST.md §R2, §R4", milestone: "M3" }
);

// 2.3 Blog Empty State Handling on Filter
runner.test(
  "T2.3",
  "Boundary Cases — Blog Search/Filter Empty State Graceful Handling",
  async () => {
    const blogIndex = readFileUtf8("src/app/blog/page.tsx");
    if (!blogIndex) throw new Error("src/app/blog/page.tsx not found");

    const hasEmptyState =
      /filtered.*length\s*===?\s*0|no.*found|nessun.*post|nessun.*articolo|no.*monograph/i.test(
        blogIndex
      );
    if (!hasEmptyState) {
      throw new Error(
        "src/app/blog/page.tsx does not provide a graceful fallback message when zero posts match filter/search."
      );
    }
    return { status: "Blog empty state verified in src/app/blog/page.tsx" };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M3" }
);

// 2.4 Mobile Navigation Responsive Rules in Header
runner.test(
  "T2.4",
  "Boundary Cases — Mobile Navigation Drawer / Hamburger Toggle in Header",
  async () => {
    const header = readFileUtf8("src/components/layout/Header.tsx");
    if (!header) throw new Error("src/components/layout/Header.tsx not found");

    const hasMenuState = /menuOpen|setMenuOpen|isMobile/i.test(header);
    const hasToggle = /aria-label.*menu|onClick.*setMenuOpen|toggleMenu/i.test(header);

    if (!hasMenuState || !hasToggle) {
      throw new Error(
        "src/components/layout/Header.tsx does not provide mobile menu state toggle handling."
      );
    }
    return { status: "Mobile navigation handling verified in Header.tsx" };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M3" }
);

// 2.5 Horizontal Scroll Prevention on Mobile
runner.test(
  "T2.5",
  "Boundary Cases — Global Horizontal Overflow Clipping",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasOverflowClip = /overflow-x:\s*(clip|hidden)/i.test(css);
    if (!hasOverflowClip) {
      throw new Error(
        "src/styles/globals.css is missing overflow-x: clip or overflow-x: hidden on body/root to prevent mobile jitter."
      );
    }
    return { status: "overflow-x: clip/hidden verified in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M1" }
);

// 2.6 Heraldic Vector Logo SVG Geometry & ViewBox
runner.test(
  "T2.6",
  "Corner Cases — SVG Logo ViewBox, XMLNS & Color Palette Attributes",
  async () => {
    const svg = readFileUtf8("public/assets/img/brand/logo.svg");
    if (!svg) throw new Error("public/assets/img/brand/logo.svg not found");

    const hasXmlns = svg.includes('xmlns="http://www.w3.org/2000/svg"');
    const hasViewBox = /viewBox="[0-9\s.-]+"/i.test(svg);
    const hasHeritageColor = /#C5A059|#D4AF37|#15261E|#1B2E24|gold|green/i.test(svg);

    if (!hasXmlns) throw new Error("logo.svg missing xmlns attribute.");
    if (!hasViewBox) throw new Error("logo.svg missing valid viewBox attribute.");
    if (!hasHeritageColor) {
      throw new Error("logo.svg does not use satin gold or racing green palette colors.");
    }
    return { status: "SVG geometry, viewBox, and color attributes validated" };
  },
  { source: "ORIGINAL_REQUEST.md §R3", milestone: "M2" }
);

// 2.7 Sartorial Hairline Icon System Component
runner.test(
  "T2.7",
  "Corner Cases — HeritageIcon Component with 0.75-1.0px Hairline Stroke",
  async () => {
    const iconComp = readFileUtf8("src/components/ui/HeritageIcon.tsx");
    if (!iconComp) {
      throw new Error(
        "src/components/ui/HeritageIcon.tsx does not exist. Sartorial icon system required."
      );
    }
    const hasHairlineStroke = /strokeWidth.*(?:0\.75|0\.8|0\.85|0\.9|1(\.0)?|hairline)/i.test(
      iconComp
    );
    if (!hasHairlineStroke) {
      throw new Error(
        "src/components/ui/HeritageIcon.tsx should configure hairline strokes between 0.75px and 1.0px."
      );
    }
    return { status: "HeritageIcon implements hairline sartorial strokes" };
  },
  { source: "PROJECT.md Feature 7", milestone: "M2" }
);

// ==============================================================================
// TIER 3: CROSS-FEATURE INTERACTIONS
// ==============================================================================
runner.setTier(
  3,
  "Tier 3: Cross-Feature Interactions",
  "Verifies monogram alignment, navigation link validity, and data slug parity"
);

// 3.1 Heraldic Monogram in Header (No Raw Monospace Terminal Box)
runner.test(
  "T3.1",
  "Cross-Feature — Header Monogram Displays Heraldic Identity (No Raw Mono Box)",
  async () => {
    const header = readFileUtf8("src/components/layout/Header.tsx");
    if (!header) throw new Error("src/components/layout/Header.tsx not found");

    const hasMonoBox =
      /fontFamily:\s*["']var\(--font-mono\)["']/i.test(header) &&
      header.includes(">FC<");

    if (hasMonoBox) {
      throw new Error(
        "Header.tsx still renders raw monospace [ FC ] terminal box instead of heraldic monogram or logo.svg."
      );
    }
    return { status: "Header renders heraldic brand monogram" };
  },
  { source: "ORIGINAL_REQUEST.md §R3, §R4", milestone: "M3" }
);

// 3.2 Layout Metadata Links Favicon & Touch Icons
runner.test(
  "T3.2",
  "Cross-Feature — Layout Metadata References Favicon and Touch Icons",
  async () => {
    const layout = readFileUtf8("src/app/layout.tsx");
    if (!layout) throw new Error("src/app/layout.tsx not found");

    const hasFavicon = layout.includes("/favicon.ico") || layout.includes("favicon.ico");
    const hasAppleIcon =
      layout.includes("apple-touch-icon.png") ||
      layout.includes("appleTouchIcon") ||
      layout.includes("icon.png");

    if (!hasFavicon) {
      throw new Error("layout.tsx missing reference to /favicon.ico.");
    }
    if (!hasAppleIcon) {
      throw new Error(
        "layout.tsx missing reference to touch icons (/apple-touch-icon.png or /icon.png)."
      );
    }
    return { status: "Layout metadata links both favicon and mobile touch icons" };
  },
  { source: "PROJECT.md Feature 6", milestone: "M2" }
);

// 3.3 Navigation Links Validity Against Root Page Sections
runner.test(
  "T3.3",
  "Cross-Feature — Header Navigation Links Resolve to Valid Page Anchors & Routes",
  async () => {
    const header = readFileUtf8("src/components/layout/Header.tsx");
    if (!header) throw new Error("src/components/layout/Header.tsx not found");

    const pageContent = readFileUtf8("src/app/page.tsx") || "";

    const hrefMatches = [...header.matchAll(/href:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    if (hrefMatches.length === 0) {
      throw new Error("Could not extract any navigation hrefs from Header.tsx.");
    }

    const invalidLinks = [];
    for (const href of hrefMatches) {
      if (href === "/" || href === "/blog" || href === "/contact") continue;
      if (href.startsWith("/#")) {
        const anchorId = href.slice(2);
        const hasAnchor =
          pageContent.includes(`id="${anchorId}"`) ||
          pageContent.includes(`id='${anchorId}'`) ||
          pageContent.includes(`id={\`${anchorId}\`}`);
        if (!hasAnchor) {
          invalidLinks.push(`${href} (anchor id "${anchorId}" not found in page.tsx)`);
        }
      }
    }

    if (invalidLinks.length > 0) {
      throw new Error(
        `Found unresolved navigation links in Header.tsx: ${invalidLinks.join(", ")}`
      );
    }
    return { validHrefsCount: hrefMatches.length };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M3" }
);

// 3.4 Micro-Dot Navigation Separator in Header
runner.test(
  "T3.4",
  "Cross-Feature — Header Navigation Items Separated by Micro-Dots (•)",
  async () => {
    const header = readFileUtf8("src/components/layout/Header.tsx");
    if (!header) throw new Error("src/components/layout/Header.tsx not found");

    const hasMicroDot =
      header.includes("•") ||
      header.includes("\\u2022") ||
      header.includes("&bull;") ||
      header.includes("&#8226;");

    if (!hasMicroDot) {
      throw new Error(
        "Header navigation links must be separated by serene micro-dots ('•' or &bull;) per R4."
      );
    }
    return { status: "Header navigation micro-dots confirmed" };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M3" }
);

// 3.5 Blog Post Slugs Parity with Dynamic Route
runner.test(
  "T3.5",
  "Cross-Feature — Data Parity: All Blog Post Slugs Follow Valid Kebab-Case",
  async () => {
    const blogData = readFileUtf8("src/data/blog-posts.ts");
    if (!blogData) throw new Error("src/data/blog-posts.ts not found");

    const slugMatches = [...blogData.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    if (slugMatches.length === 0) {
      throw new Error("No slugs detected in src/data/blog-posts.ts.");
    }

    const invalidSlugs = slugMatches.filter((s) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s));
    if (invalidSlugs.length > 0) {
      throw new Error(`Invalid slug format found in blog-posts.ts: ${invalidSlugs.join(", ")}`);
    }

    return { totalBlogSlugs: slugMatches.length };
  },
  { source: "PROJECT.md Feature 13", milestone: "M4" }
);

// 3.6 Projects Slugs Parity with Dynamic Route
runner.test(
  "T3.6",
  "Cross-Feature — Data Parity: All Project Slugs Follow Valid Kebab-Case",
  async () => {
    const projectData = readFileUtf8("src/data/projects.ts");
    if (!projectData) throw new Error("src/data/projects.ts not found");

    const slugMatches = [...projectData.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    if (slugMatches.length === 0) {
      throw new Error("No slugs detected in src/data/projects.ts.");
    }

    const invalidSlugs = slugMatches.filter((s) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s));
    if (invalidSlugs.length > 0) {
      throw new Error(`Invalid slug format found in projects.ts: ${invalidSlugs.join(", ")}`);
    }

    return { totalProjectSlugs: slugMatches.length };
  },
  { source: "PROJECT.md Feature 13", milestone: "M4" }
);

// 3.7 Skills Identifiers Parity with Dynamic Route
runner.test(
  "T3.7",
  "Cross-Feature — Data Parity: All Skill IDs Follow Valid Kebab-Case",
  async () => {
    const skillsData = readFileUtf8("src/data/skills.ts");
    if (!skillsData) throw new Error("src/data/skills.ts not found");

    const idMatches = [...skillsData.matchAll(/id:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    if (idMatches.length === 0) {
      throw new Error("No skill IDs detected in src/data/skills.ts.");
    }

    const invalidIds = idMatches.filter((id) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id));
    if (invalidIds.length > 0) {
      throw new Error(`Invalid skill ID format found in skills.ts: ${invalidIds.join(", ")}`);
    }

    return { totalSkillIds: idMatches.length };
  },
  { source: "PROJECT.md Feature 13", milestone: "M4" }
);

// 3.8 Card Links Integrity to Dynamic Route Paths
runner.test(
  "T3.8",
  "Cross-Feature — Card Component Navigation Paths Match Route Patterns",
  async () => {
    const projectCard = readFileUtf8("src/components/ui/ProjectCard.tsx");
    const skillCard = readFileUtf8("src/components/ui/SkillCard.tsx");

    if (!projectCard) throw new Error("src/components/ui/ProjectCard.tsx not found");
    if (!skillCard) throw new Error("src/components/ui/SkillCard.tsx not found");

    const hasProjectLinkPattern =
      projectCard.includes("/project/") || projectCard.includes("project.slug");
    const hasSkillLinkPattern =
      skillCard.includes("/skill/") || skillCard.includes("skill.id");

    if (!hasProjectLinkPattern) {
      throw new Error("ProjectCard.tsx does not link to /project/[slug].");
    }
    if (!hasSkillLinkPattern) {
      throw new Error("SkillCard.tsx does not link to /skill/[id].");
    }

    return { status: "ProjectCard and SkillCard route links verified" };
  },
  { source: "PROJECT.md Feature 12", milestone: "M3" }
);

// ==============================================================================
// TIER 4: REAL-WORLD SCENARIOS
// ==============================================================================
runner.setTier(
  4,
  "Tier 4: Real-World Scenarios",
  "Verifies static export completeness (60 routes), UTF-8 BOM absence, zero mojibake, and clean telemetry"
);

// 4.1 Static Export HTML File Completeness (out/ directory)
runner.test(
  "T4.1",
  "Real-World — Static Export Output Contains Required Prerendered HTML Pages",
  async () => {
    const outDir = path.join(ROOT_DIR, "out");
    if (!fs.existsSync(outDir)) {
      throw new Error(
        "Directory 'out/' does not exist. Run 'npm run build' to generate static export before running Tier 4."
      );
    }

    const htmlFiles = collectFiles("out", /\.html$/);
    if (htmlFiles.length < 58) {
      throw new Error(
        `Expected at least 58-60 static HTML files in out/, but found only ${htmlFiles.length}.`
      );
    }

    const essentialPages = [
      "out/index.html",
      "out/blog.html",
      "out/contact.html",
      "out/404.html",
    ];

    const missingEssentials = essentialPages.filter(
      (p) => !fs.existsSync(path.join(ROOT_DIR, p)) && !fs.existsSync(path.join(ROOT_DIR, p.replace("/", path.sep)))
    );

    if (missingEssentials.length > 0) {
      throw new Error(`Missing core static HTML pages in out/: ${missingEssentials.join(", ")}`);
    }

    return { totalHtmlExported: htmlFiles.length };
  },
  { source: "ORIGINAL_REQUEST.md §R5", milestone: "M4" }
);

// 4.2 Clean UTF-8 Encoding with Exactly 0 BOMs Across Codebase
runner.test(
  "T4.2",
  "Real-World — Zero UTF-8 Byte Order Marks (BOM 0xEF 0xBB 0xBF) in Source Files",
  async () => {
    const files = [
      ...collectFiles("src", /\.(tsx?|css|json)$/),
      ...collectFiles("public", /\.(svg|txt|json)$/),
      ...collectFiles("scripts", /\.(mjs|js)$/),
    ];

    const bomViolations = [];
    for (const relFile of files) {
      const fullPath = path.join(ROOT_DIR, relFile);
      const buffer = fs.readFileSync(fullPath);
      if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
        bomViolations.push(relFile);
      }
    }

    if (bomViolations.length > 0) {
      throw new Error(
        `Found ${bomViolations.length} file(s) with illegal UTF-8 BOM: ${bomViolations.join(", ")}`
      );
    }

    return { filesChecked: files.length, bomViolations: 0 };
  },
  { source: "ORIGINAL_REQUEST.md §R5, Rule [user_global]", milestone: "M4" }
);

// 4.3 Zero Mojibake Strings Across Repository & Output
runner.test(
  "T4.3",
  "Real-World — Zero Mojibake / Corrupted Character Sequences in Source & Export",
  async () => {
    const MOJIBAKE_REGEX = /Ã[¨©\u0080-\u00BF]|â€[™œ\u009d–—]|\uFFFD|Â[\u00A0-\u00FF]/;

    const filesToScan = [
      ...collectFiles("src", /\.(tsx?|css|json)$/),
      ...collectFiles("public", /\.(svg|txt)$/),
      ...(fs.existsSync(path.join(ROOT_DIR, "out")) ? collectFiles("out", /\.html$/) : []),
    ];

    const mojibakeViolations = [];
    for (const relFile of filesToScan) {
      const content = fs.readFileSync(path.join(ROOT_DIR, relFile), "utf8");
      if (MOJIBAKE_REGEX.test(content)) {
        mojibakeViolations.push(relFile);
      }
    }

    if (mojibakeViolations.length > 0) {
      throw new Error(
        `Found ${mojibakeViolations.length} file(s) containing corrupted mojibake character sequences: ${mojibakeViolations.join(", ")}`
      );
    }

    return { filesScanned: filesToScan.length, mojibakeCount: 0 };
  },
  { source: "ORIGINAL_REQUEST.md §R5, Rule [user_global]", milestone: "M4" }
);

// 4.4 Elimination of Harsh Monospace Telemetry Brackets
runner.test(
  "T4.4",
  "Real-World — Elimination of Monospace Brackets '[ 01 //' & '[ BLOG ]' Residue",
  async () => {
    const filesToCheck = [
      "src/app/page.tsx",
      "src/components/ui/HeroSection.tsx",
      "src/components/layout/Header.tsx",
      "src/components/layout/Footer.tsx",
    ];

    const violations = [];
    for (const relFile of filesToCheck) {
      const content = readFileUtf8(relFile);
      if (!content) continue;

      const telemetryPatterns = [
        /\[\s*0[1-9]\s*\/\//,
        /\[\s*BLOG\s*\]/,
        /SYS\s*\/\/\s*ACTIVE/,
        /\[\s*FC\.SYS\s*\/\//,
      ];

      for (const pattern of telemetryPatterns) {
        if (pattern.test(content)) {
          violations.push(`${relFile} matches ${pattern}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `High-cortisol telemetry bracket residue found:\n  - ${violations.join("\n  - ")}`
      );
    }

    return { status: "Zero telemetric bracket residues found in core layout files" };
  },
  { source: "ORIGINAL_REQUEST.md §R2, §R4", milestone: "M3" }
);

// 4.5 Velvet Hover Transitions (0.6s–0.8s Ease-Out)
runner.test(
  "T4.5",
  "Real-World — Velvet Transitions Configuration (0.5s–0.8s Relaxed Timing)",
  async () => {
    const css = readFileUtf8("src/styles/globals.css");
    if (!css) throw new Error("src/styles/globals.css not found");

    const hasVelvetTiming =
      /transition:.*(?:0\.[5-8]s|[5-8]00ms)|duration-(?:500|600|700|800)/i.test(css);

    if (!hasVelvetTiming) {
      throw new Error(
        "globals.css missing relaxed velvet transition timings (0.5s–0.8s ease-out) per R4."
      );
    }

    return { status: "Velvet transition duration timing verified in globals.css" };
  },
  { source: "ORIGINAL_REQUEST.md §R4", milestone: "M3" }
);

// ==============================================================================
// RUNNER REPORTING & EXECUTION
// ==============================================================================
async function main() {
  await runner.run();

  const allResults = runner.results;
  const total = allResults.length;
  const passedCount = allResults.filter((r) => r.passed).length;
  const failedCount = allResults.filter((r) => !r.passed).length;
  const passRate = total > 0 ? Math.round((passedCount / total) * 100) : 0;

  if (isJson) {
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          total,
          passed: passedCount,
          failed: failedCount,
          passRate: `${passRate}%`,
          results: allResults,
        },
        null,
        2
      )
    );
    process.exit(failedCount > 0 && !isPermissive ? 1 : 0);
  }

  // Console Header
  console.log("");
  console.log(
    `${colors.gold}${colors.bold}══════════════════════════════════════════════════════════════════════════════${colors.reset}`
  );
  console.log(
    `${colors.gold}${colors.bold}  HERITAGE RESTYLING VERIFICATION SUITE — 4-TIER SPECIFICATION ENGINE        ${colors.reset}`
  );
  console.log(
    `${colors.gold}${colors.bold}══════════════════════════════════════════════════════════════════════════════${colors.reset}`
  );
  console.log(
    `${colors.dim}Target Tier: ${targetTier ? `Tier ${targetTier}` : "All (Tiers 1-4)"} | Mode: ${isPermissive ? "Permissive" : "Strict"}${colors.reset}\n`
  );

  let activeTier = -1;
  for (const res of allResults) {
    if (res.tier !== activeTier) {
      activeTier = res.tier;
      console.log(
        `\n${colors.bold}${colors.gold}── Tier ${res.tier}: ${res.tierName} ──${colors.reset}`
      );
    }

    const icon = res.passed
      ? `${colors.green}✓ PASS${colors.reset}`
      : `${colors.red}✗ FAIL${colors.reset}`;

    console.log(`  ${icon} [${res.id}] ${res.title} ${colors.gray}(${res.durationMs}ms)${colors.reset}`);

    if (!res.passed && res.error) {
      console.log(`         ${colors.red}Error:${colors.reset} ${res.error}`);
      console.log(`         ${colors.dim}Source:${colors.reset} ${res.source} | ${colors.dim}Milestone:${colors.reset} ${res.milestone}`);
    }
  }

  // Summary Table
  console.log("\n" + "─".repeat(78));
  console.log(`${colors.bold}TEST EXECUTION SUMMARY:${colors.reset}`);
  console.log(`  Total Tests Run:  ${colors.bold}${total}${colors.reset}`);
  console.log(`  Passed:           ${colors.green}${colors.bold}${passedCount}${colors.reset}`);
  console.log(`  Failed:           ${colors.red}${colors.bold}${failedCount}${colors.reset}`);
  console.log(`  Pass Rate:        ${passRate >= 100 ? colors.green : colors.yellow}${colors.bold}${passRate}%${colors.reset}`);
  console.log("─".repeat(78));

  if (failedCount > 0) {
    console.log(`\n${colors.yellow}${colors.bold}ACTIONABLE REMEDIATION GUIDANCE FOR WORKERS:${colors.reset}`);
    const failuresByMilestone = {};
    for (const r of allResults.filter((r) => !r.passed)) {
      if (!failuresByMilestone[r.milestone]) failuresByMilestone[r.milestone] = [];
      failuresByMilestone[r.milestone].push(r);
    }

    for (const [ms, fails] of Object.entries(failuresByMilestone)) {
      console.log(`\n  ${colors.gold}${colors.bold}[${ms}] ${fails.length} pending feature test(s):${colors.reset}`);
      for (const f of fails) {
        console.log(`    • ${f.id}: ${f.title}`);
        console.log(`      ↳ ${colors.dim}${f.error}${colors.reset}`);
      }
    }
    console.log("");
  }

  if (failedCount === 0) {
    console.log(
      `\n${colors.green}${colors.bold}🎉 ALL HERITAGE CRITERIA VERIFIED SUCCESSFULLY (100% PASS RATE).${colors.reset}\n`
    );
  }

  if (failedCount > 0 && !isPermissive) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Test runner execution error:", err);
  process.exit(1);
});
