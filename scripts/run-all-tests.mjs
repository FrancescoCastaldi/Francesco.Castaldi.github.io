import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const testSuites = [
  "scripts/test-github-adapter.mjs",
  "src/lib/github/__tests__/github.test.ts",
  "scripts/run-unit-tests.mjs",
  "scripts/verify-heritage.mjs",
  "scripts/challenger-stress-suite.mjs",
];

console.log("================================================================================");
console.log("  RUNNING COMPLETE VERIFICATION TEST PIPELINE (5 SUITES)                         ");
console.log("================================================================================\n");

let allPassed = true;

for (const suite of testSuites) {
  console.log(`\n▶ Running ${suite}...`);
  const nodeArgs = suite.endsWith(".test.ts")
    ? ["--test", path.join(ROOT_DIR, suite)]
    : [path.join(ROOT_DIR, suite)];

  const result = spawnSync("node", nodeArgs, {
    stdio: "inherit",
    cwd: ROOT_DIR,
    env: process.env,
  });

  if (result.status !== 0) {
    console.error(`\n✖ Test suite ${suite} failed with exit code ${result.status}`);
    allPassed = false;
    break;
  }
}

if (!allPassed) {
  process.exit(1);
}

console.log("\n================================================================================");
console.log("  ALL 5 VERIFICATION SUITES COMPLETED WITH 100% PASS RATE!                       ");
console.log("================================================================================\n");
