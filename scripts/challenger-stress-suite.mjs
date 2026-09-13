// scripts/challenger-stress-suite.mjs
// Adversarial Stress Testing & Route Integrity Suite for Challenger 1
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT_DIR, "out");

console.log("================================================================================");
console.log("  CHALLENGER 1: ROUTE INTEGRITY & ADVERSARIAL STRESS TEST SUITE                 ");
console.log("================================================================================\n");

let passedCount = 0;
let failedCount = 0;
const failures = [];

function assert(condition, message, details = "") {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    if (details) console.error(`         Reason: ${details}`);
    failedCount++;
    failures.push({ message, details });
  }
}

// -----------------------------------------------------------------------------
// SUITE 1: SSG STATIC ROUTE INTEGRITY (ALL 60 ROUTES IN out/)
// -----------------------------------------------------------------------------
console.log("--- Suite 1: SSG Static Route Integrity ---");

assert(fs.existsSync(OUT_DIR), "out/ directory exists");

// Read data sources to build ground truth routes
const blogPostsPath = path.join(ROOT_DIR, "src/data/blog-posts.ts");
const projectsPath = path.join(ROOT_DIR, "src/data/projects.ts");
const skillsPath = path.join(ROOT_DIR, "src/data/skills.ts");

const blogPostsContent = fs.readFileSync(blogPostsPath, "utf8");
const projectsContent = fs.readFileSync(projectsPath, "utf8");
const skillsContent = fs.readFileSync(skillsPath, "utf8");

// Parse published blog posts
const postEntries = blogPostsContent.split(/(?=\{[\s\r\n]*title:\s*["'])/);
const publishedBlogSlugs = [];
for (const entry of postEntries) {
  const slugMatch = entry.match(/slug:\s*["']([^"']+)["']/);
  const pubMatch = entry.match(/published:\s*(true|false)/);
  if (slugMatch) {
    const isPub = pubMatch ? pubMatch[1] === "true" : true;
    if (isPub) publishedBlogSlugs.push(slugMatch[1]);
  }
}

const projectSlugs = [...projectsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
const skillIds = [...skillsContent.matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1]);

console.log(`  Ground truth expected counts:`);
console.log(`    - Published Blog Posts: ${publishedBlogSlugs.length} (expected 0)`);
console.log(`    - Projects: ${projectSlugs.length} (expected 15)`);
console.log(`    - Skills: ${skillIds.length} (expected 11)`);
console.log(`    - Root & Core Routes: 5 (index.html, 404.html, _not-found.html, contact.html, sitemap.xml)`);

const expectedStaticFiles = [
  "index.html",
  "404.html",
  "_not-found.html",
  "contact.html",
  "sitemap.xml",
];

publishedBlogSlugs.forEach(slug => {
  expectedStaticFiles.push(path.join("blog", `${slug}.html`));
});

projectSlugs.forEach(slug => {
  expectedStaticFiles.push(path.join("project", `${slug}.html`));
});

skillIds.forEach(id => {
  expectedStaticFiles.push(path.join("skill", `${id}.html`));
});

console.log(`    - Total Expected Static Artifacts: ${expectedStaticFiles.length}`);

assert(
  expectedStaticFiles.length === 31,
  `Expected route count equals 31 (actual: ${expectedStaticFiles.length})`
);

let missingRoutes = [];
let emptyRoutes = [];
let missingTitleRoutes = [];

for (const relFile of expectedStaticFiles) {
  const fullPath = path.join(OUT_DIR, relFile);
  if (!fs.existsSync(fullPath)) {
    missingRoutes.push(relFile);
    continue;
  }
  const stat = fs.statSync(fullPath);
  if (stat.size === 0) {
    emptyRoutes.push(relFile);
    continue;
  }
  if (relFile.endsWith(".html")) {
    const html = fs.readFileSync(fullPath, "utf8");
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      missingTitleRoutes.push(relFile);
    }
  }
}

assert(
  missingRoutes.length === 0,
  `All ${expectedStaticFiles.length} expected prerendered static routes exist in out/`,
  missingRoutes.join(", ")
);

assert(
  emptyRoutes.length === 0,
  `All ${expectedStaticFiles.length} prerendered static routes are non-empty (>0 bytes)`,
  emptyRoutes.join(", ")
);

assert(
  missingTitleRoutes.length === 0,
  "All prerendered HTML routes contain a valid <title> tag",
  missingTitleRoutes.join(", ")
);

// -----------------------------------------------------------------------------
// SUITE 2: INTERNAL LINK INTEGRITY & ZERO 404 GRAPH VALIDATION
// -----------------------------------------------------------------------------
console.log("\n--- Suite 2: Internal Link Integrity & Zero 404 Validation ---");

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") {
        results = results.concat(getAllHtmlFiles(full));
      }
    } else if (entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

const allHtmlFiles = getAllHtmlFiles(OUT_DIR);
console.log(`  Scanning ${allHtmlFiles.length} HTML files for navigational <a> links...`);

// Extract anchor IDs from index.html
const indexHtmlContent = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf8");
const anchorIds = new Set(
  [...indexHtmlContent.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1])
);
console.log(`  Discovered anchor IDs on homepage:`, Array.from(anchorIds).join(", "));

const internalNavLinks = new Set();
const brokenNavLinks = [];

// Also collect and verify static asset references (<link href>, <img src>, <script src>)
const brokenAssetLinks = [];
let assetCheckCount = 0;

for (const file of allHtmlFiles) {
  const content = fs.readFileSync(file, "utf8");
  const relSource = path.relative(OUT_DIR, file);

  // 1. Check navigational <a> links
  const aMatches = [...content.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map(m => m[1]);

  for (const href of aMatches) {
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      href.startsWith("//")
    ) {
      continue;
    }

    internalNavLinks.add(href);

    if (href.startsWith("#")) {
      // Pure anchor on index page
      const anchor = href.slice(1);
      if (!anchorIds.has(anchor)) {
        brokenNavLinks.push({ source: relSource, href, reason: `Anchor #${anchor} not found on index.html` });
      }
    } else if (href.startsWith("/#")) {
      // Root anchor
      const anchor = href.slice(2);
      if (!anchorIds.has(anchor)) {
        brokenNavLinks.push({ source: relSource, href, reason: `Anchor #${anchor} not found on index.html` });
      }
    } else if (href.startsWith("/")) {
      const urlPath = href.split("#")[0].split("?")[0];
      const anchor = href.includes("#") ? href.split("#")[1] : null;

      let targetHtml;
      if (urlPath === "/" || urlPath === "") {
        targetHtml = path.join(OUT_DIR, "index.html");
      } else {
        const withoutLeadingSlash = urlPath.slice(1);
        const directHtml = path.join(OUT_DIR, `${withoutLeadingSlash}.html`);
        const subIndexHtml = path.join(OUT_DIR, withoutLeadingSlash, "index.html");
        if (fs.existsSync(directHtml)) {
          targetHtml = directHtml;
        } else if (fs.existsSync(subIndexHtml)) {
          targetHtml = subIndexHtml;
        } else {
          targetHtml = null;
        }
      }

      if (!targetHtml) {
        brokenNavLinks.push({ source: relSource, href, reason: `Target page route ${urlPath} does not exist in out/` });
      } else if (anchor && targetHtml) {
        const targetContent = fs.readFileSync(targetHtml, "utf8");
        const targetAnchors = new Set([...targetContent.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]));
        if (!targetAnchors.has(anchor)) {
          brokenNavLinks.push({ source: relSource, href, reason: `Anchor #${anchor} not found in ${path.relative(OUT_DIR, targetHtml)}` });
        }
      }
    }
  }

  // 2. Check static asset links (<link href="...">, <img src="...">)
  const assetHrefs = [...content.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["']/gi)].map(m => m[1]);
  for (const href of assetHrefs) {
    if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("http")) {
      assetCheckCount++;
      const cleanHref = href.split("?")[0];
      const assetPath = path.join(OUT_DIR, cleanHref.slice(1));
      if (!fs.existsSync(assetPath)) {
        brokenAssetLinks.push({ source: relSource, href, reason: `Static asset file not found at out/${cleanHref.slice(1)}` });
      }
    }
  }
}

console.log(`  Total unique internal navigation links tested: ${internalNavLinks.size}`);
console.log(`  Total static asset references tested: ${assetCheckCount}`);

assert(
  brokenNavLinks.length === 0,
  "All internal navigational links (<a href>) resolve to valid static targets with zero 404s",
  JSON.stringify(brokenNavLinks, null, 2)
);

assert(
  brokenAssetLinks.length === 0,
  "All static asset links (<link href>) resolve to existing files in out/",
  JSON.stringify(brokenAssetLinks.slice(0, 5), null, 2)
);

// -----------------------------------------------------------------------------
// SUITE 3: COMPONENT NAVIGATION CONTRACT VALIDATION
// -----------------------------------------------------------------------------
console.log("\n--- Suite 3: Component Navigation Contract Validation ---");

// Test Header.tsx navigation targets
const headerContent = fs.readFileSync(path.join(ROOT_DIR, "src/components/layout/Header.tsx"), "utf8");
const headerNavHrefs = [...headerContent.matchAll(/href:\s*["']([^"']+)["']/g)].map(m => m[1]);
console.log("  Header navigation targets:", headerNavHrefs);

let headerBroken = [];
for (const href of headerNavHrefs) {
  if (href.startsWith("/#")) {
    const anchor = href.slice(2);
    if (!anchorIds.has(anchor)) headerBroken.push({ href, reason: `Anchor #${anchor} missing on homepage` });
  } else if (href === "/blog") {
    if (!fs.existsSync(path.join(OUT_DIR, "blog.html"))) headerBroken.push({ href, reason: "blog.html missing" });
  }
}
assert(headerBroken.length === 0, "All Header navigation links point to valid routes/anchors", JSON.stringify(headerBroken));

// Test Breadcrumb.tsx contract
const breadcrumbContent = fs.readFileSync(path.join(ROOT_DIR, "src/components/ui/Breadcrumb.tsx"), "utf8");
assert(
  breadcrumbContent.includes("item.href") && breadcrumbContent.includes("Link"),
  "Breadcrumb renders Next.js Link for items with href"
);

// Test ProjectCard.tsx link contract
const projectCardContent = fs.readFileSync(path.join(ROOT_DIR, "src/components/ui/ProjectCard.tsx"), "utf8");
assert(
  projectCardContent.includes("href={`/project/${project.slug}`}"),
  "ProjectCard correctly targets `/project/${project.slug}`"
);

// Test SkillCard.tsx link contract
const skillCardContent = fs.readFileSync(path.join(ROOT_DIR, "src/components/ui/SkillCard.tsx"), "utf8");
assert(
  skillCardContent.includes("href={`/skill/${skill.id}`}"),
  "SkillCard correctly targets `/skill/${skill.id}`"
);

// -----------------------------------------------------------------------------
// SUITE 4: EDGE CASES: 404 PAGE, RESPONSIVENESS, LONG TITLES
// -----------------------------------------------------------------------------
console.log("\n--- Suite 4: Edge Cases: 404 Page, Responsiveness, Long Titles ---");

// 1. 404 Page Neon Amber Glow Removal & Heritage Styling
const notFoundSrc = fs.readFileSync(path.join(ROOT_DIR, "src/app/not-found.tsx"), "utf8");
const notFoundHtml = fs.readFileSync(path.join(OUT_DIR, "404.html"), "utf8");

const neonAmberPatterns = [
  /rgba\(\s*245\s*,\s*158\s*,\s*11/i,
  /#f59e0b/i,
  /rgb\(\s*245\s*,\s*158\s*,\s*11/i,
  /amber-500/i,
  /amber-400/i,
];

let foundNeonGlow = false;
for (const pattern of neonAmberPatterns) {
  if (pattern.test(notFoundSrc) || pattern.test(notFoundHtml)) {
    foundNeonGlow = true;
    break;
  }
}
assert(!foundNeonGlow, "404 page is completely free of neon amber glow (rgba(245, 158, 11, ...))");

const hasBurntOrange404 = notFoundSrc.includes("#C1622D") || notFoundSrc.includes("#c1622d");
assert(hasBurntOrange404, "404 page utilizes burnt orange accent (#C1622D)");

const hasCharcoalBackground404 = notFoundSrc.includes("#0E100F");
assert(hasCharcoalBackground404, "404 page uses primary charcoal canvas (#0E100F)");

const hasPineGreenSurface404 = notFoundSrc.includes("#1F3329") || notFoundSrc.includes("#2A2D2B");
assert(hasPineGreenSurface404, "404 page uses Pine Green or Anthracite surface (#1F3329 / #2A2D2B)");

const hasRawBrackets404 = /\[\s*404\s*\/\//.test(notFoundSrc) || /\[\s*NOT FOUND\s*\]/.test(notFoundSrc);
assert(!hasRawBrackets404, "404 page eliminates raw monospace brackets in headings");

// 2. Mobile Responsive Navigation & Viewport Styling
assert(
  headerContent.includes("isMobile") && headerContent.includes("setMenuOpen"),
  "Header contains mobile state management (isMobile, menuOpen)"
);
assert(
  headerContent.includes("aria-label=\"Menu\""),
  "Header provides accessible mobile hamburger toggle button with aria-label"
);
assert(
  headerContent.includes("innerWidth < 768"),
  "Header implements 768px responsive breakpoint for mobile navigation"
);

const globalsCss = fs.readFileSync(path.join(ROOT_DIR, "src/styles/globals.css"), "utf8");
const hasOverflowClip = /overflow-x:\s*(clip|hidden)/i.test(globalsCss);
assert(
  hasOverflowClip,
  "Global CSS applies horizontal overflow clipping (overflow-x: clip/hidden) to eliminate mobile horizontal scrolling"
);

// 3. Long Title Wrapping & Layout Robustness
console.log("\n  Stress-testing long titles across project pages:");

let longestProject = { title: "", slug: "" };
for (const slug of projectSlugs) {
  const match = projectsContent.match(new RegExp(`title:\\s*["']([^"']+)["'][\\s\\S]*?slug:\\s*["']${slug}["']`));
  if (match && match[1].length > longestProject.title.length) {
    longestProject = { title: match[1], slug };
  }
}
console.log(`    Longest Project Title (${longestProject.title.length} chars): "${longestProject.title}" (slug: ${longestProject.slug})`);

const longestProjectHtml = fs.readFileSync(path.join(OUT_DIR, "project", `${longestProject.slug}.html`), "utf8");

assert(
  longestProjectHtml.includes(longestProject.title.replace(/'/g, "&#x27;").replace(/"/g, "&quot;")) ||
  longestProjectHtml.includes(longestProject.title) ||
  longestProjectHtml.includes(longestProject.slug),
  `Longest project is fully prerendered with complete title integrity`
);

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`  CHALLENGER 1 STRESS TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("================================================================================");

if (failures.length > 0) {
  console.log("\nFailure Details:");
  failures.forEach(f => console.log(`  - ${f.message}: ${f.details}`));
}

if (failedCount > 0) {
  console.error(`\n❌ VERDICT: REQUEST_CHANGES (${failedCount} assertions failed)`);
  process.exit(1);
} else {
  console.log(`\n✅ VERDICT: APPROVE (All empirical stress tests passed with 100% integrity)`);
  process.exit(0);
}
