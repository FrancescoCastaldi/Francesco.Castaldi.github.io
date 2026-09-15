import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

console.log("================================================================================");
console.log("  TEST SUITE: GITHUB ADAPTER, SNAPSHOT INTEGRITY & DTO SANITIZATION             ");
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, testName, message = "") {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    if (message) console.error(`         Reason: ${message}`);
    failed++;
  }
}

// 1. Snapshot JSON exists and is valid
const snapshotPath = path.join(ROOT_DIR, "src/data/github-snapshot.json");
assert(fs.existsSync(snapshotPath), "Snapshot File Exists", "src/data/github-snapshot.json not found");

let snapshot;
try {
  snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  assert(true, "Snapshot JSON Parse", "Valid JSON structure");
} catch (e) {
  assert(false, "Snapshot JSON Parse", e.message);
}

// 2. Snapshot structure and contracts
if (snapshot) {
  assert(snapshot.user === "FrancescoCastaldi", "User Identity", `Expected FrancescoCastaldi, got ${snapshot.user}`);
  assert(typeof snapshot.totalContributions === "number" && snapshot.totalContributions > 0, "Total Contributions Count", `Total: ${snapshot.totalContributions}`);
  assert(Array.isArray(snapshot.calendar) && snapshot.calendar.length >= 365, "Contribution Calendar Length", `Length: ${snapshot.calendar?.length}`);
  assert(Array.isArray(snapshot.weeks) && snapshot.weeks.length >= 52, "Contribution Weeks Length", `Weeks: ${snapshot.weeks?.length}`);
  assert(Array.isArray(snapshot.repositories) && snapshot.repositories.length >= 10, "Repositories Count", `Repos: ${snapshot.repositories?.length}`);
  assert(typeof snapshot.languageDistribution === "object", "Language Distribution Object", "Distribution must be an object");
  
  // Verify token safety (no token strings in snapshot)
  const rawText = JSON.stringify(snapshot);
  assert(!rawText.includes("ghp_") && !rawText.includes("github_pat_"), "Zero Token Leakage in Snapshot", "Snapshot must never contain token patterns");
}

// 3. Project mappings check
const portfolioData = fs.readFileSync(path.join(ROOT_DIR, "src/data/portfolio.ts"), "utf8");
const projectsData = fs.readFileSync(path.join(ROOT_DIR, "src/data/projects.ts"), "utf8");
const projectSlugs = [...projectsData.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

let missingMappings = [];
for (const slug of projectSlugs) {
  if (!portfolioData.includes(`projectId: "${slug}"`)) {
    missingMappings.push(slug);
  }
}

assert(missingMappings.length === 0, "All 15 Projects Mapped in PROJECT_REPO_MAPPINGS", missingMappings.join(", "));

// 4. Check client.server.ts has server-only guard
const clientServerContent = fs.readFileSync(path.join(ROOT_DIR, "src/lib/github/client.server.ts"), "utf8");
assert(clientServerContent.includes("import \"server-only\";") || clientServerContent.includes("import 'server-only';"), "Server-Only Guard Present in Client", "client.server.ts must have server-only import");

// 5. Check cache.ts has server-only guard
const cacheContent = fs.readFileSync(path.join(ROOT_DIR, "src/lib/github/cache.ts"), "utf8");
assert(cacheContent.includes("import \"server-only\";") || cacheContent.includes("import 'server-only';"), "Server-Only Guard Present in Cache", "cache.ts must have server-only import");

// 6. Check route.ts exists
const routePath = path.join(ROOT_DIR, "src/app/api/github/route.ts");
assert(fs.existsSync(routePath), "API Route /api/github Exists", "route.ts not found");

console.log("\n--------------------------------------------------------------------------------");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("================================================================================\n");

if (failed > 0) {
  process.exit(1);
}
