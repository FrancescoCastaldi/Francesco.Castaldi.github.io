import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

console.log("================================================================================");
console.log("  UNIT & INTEGRATION TEST SUITE: 3D PORTFOLIO DERIVATION & CONTRACTS            ");
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, name, msg = "") {
  if (condition) {
    console.log(`  [PASS] ${name}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${name}`);
    if (msg) console.error(`         Reason: ${msg}`);
    failed++;
  }
}

// 1. Verify projects count and properties
const projectsSrc = fs.readFileSync(path.join(ROOT_DIR, "src/data/projects.ts"), "utf8");
const projectSlugs = [...projectsSrc.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
assert(projectSlugs.length === 15, "Total Projects Invariant (15)", `Found ${projectSlugs.length}`);

// 2. Verify skills count and properties
const skillsSrc = fs.readFileSync(path.join(ROOT_DIR, "src/data/skills.ts"), "utf8");
const skillIds = [...skillsSrc.matchAll(/id:\s*["']([^"']+)["']/g)].map((m) => m[1]);
assert(skillIds.length === 11, "Total Skills Invariant (11)", `Found ${skillIds.length}`);

// 3. Verify portfolio.ts constants
const portfolioSrc = fs.readFileSync(path.join(ROOT_DIR, "src/data/portfolio.ts"), "utf8");
assert(portfolioSrc.includes("FEATURED_PROJECT_IDS"), "Featured Project IDs exported");
assert(portfolioSrc.includes("ARCHIVE_ONLY_PROJECT_IDS"), "Archive-Only Project IDs exported");
assert(portfolioSrc.includes("PROJECT_REPO_MAPPINGS"), "Project Repo Mappings exported");
assert(portfolioSrc.includes("Healthcare Business & Systems Consulting"), "Career D5 present");
assert(portfolioSrc.includes("BSc Computer Engineering"), "Career D6 (BSc) present");
assert(portfolioSrc.includes("MSc Computer Science"), "Career D6 (MSc) present");

// 4. Verify 3D Scene director, adaptive quality, and scenes exist
const sceneFiles = [
  "src/components/experience/ExperienceShell.tsx",
  "src/components/experience/GlobalExperience.tsx",
  "src/components/experience/SceneDirector.tsx",
  "src/components/experience/AdaptiveQuality.tsx",
  "src/components/experience/ResourceCleaner.ts",
  "src/components/experience/scenes/HeroSculpture.tsx",
  "src/components/experience/scenes/ImpactLandscape.tsx",
  "src/components/experience/scenes/ProjectStage.tsx",
  "src/components/experience/scenes/SkillsConstellation.tsx",
  "src/components/experience/scenes/ProjectParametricScene.tsx",
  "src/components/experience/scenes/SkillLivingGraphScene.tsx",
  "src/components/experience/scenes/ContactRoomScene.tsx",
  "src/components/experience/scenes/NotFoundScene.tsx",
  "src/components/ui/NotFoundRealignLink.tsx",
  "src/lib/github/__tests__/github.test.ts",
];

sceneFiles.forEach((file) => {
  assert(fs.existsSync(path.join(ROOT_DIR, file)), `Component/Test Exists: ${file}`);
});

// 5. Verify Context loss and adaptive quality hooks
const hookSrc = fs.readFileSync(path.join(ROOT_DIR, "src/hooks/useExperienceQuality.ts"), "utf8");
assert(hookSrc.includes("useTabVisibility"), "useTabVisibility hook implemented");
assert(hookSrc.includes("prefers-reduced-motion"), "Reduced motion accessibility guard present");
assert(hookSrc.includes("webgl"), "WebGL capability detection present");

// 6. Verify Next.js configuration has no output: export
const nextCfg = fs.readFileSync(path.join(ROOT_DIR, "next.config.ts"), "utf8");
assert(!nextCfg.includes('output: "export"'), "output: export removed from next.config.ts");
assert(!nextCfg.includes("ignoreBuildErrors: true"), "ignoreBuildErrors: true removed from next.config.ts");

console.log("\n--------------------------------------------------------------------------------");
console.log(`UNIT TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("================================================================================\n");

if (failed > 0) process.exit(1);
