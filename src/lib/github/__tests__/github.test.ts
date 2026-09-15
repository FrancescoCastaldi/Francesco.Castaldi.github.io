import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "../../../..");

// Load snapshot and data directly
const snapshotPath = path.join(ROOT_DIR, "src/data/github-snapshot.json");
const snapshotData = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

describe("GitHub Adapter & Snapshot Contracts", () => {
  it("should have a valid, well-formed bundled snapshot dataset", () => {
    assert.equal(snapshotData.user, "FrancescoCastaldi");
    assert.ok(typeof snapshotData.totalContributions === "number" && snapshotData.totalContributions > 0);
    assert.ok(Array.isArray(snapshotData.calendar) && snapshotData.calendar.length >= 365);
    assert.ok(Array.isArray(snapshotData.weeks) && snapshotData.weeks.length >= 52);
    assert.ok(Array.isArray(snapshotData.repositories) && snapshotData.repositories.length >= 10);
    assert.ok(typeof snapshotData.languageDistribution === "object" && snapshotData.languageDistribution !== null);
  });

  it("should never contain GitHub tokens or secrets in snapshot or DTOs", () => {
    const rawJson = JSON.stringify(snapshotData);
    assert.ok(!rawJson.includes("ghp_"), "Snapshot must not contain classic PATs");
    assert.ok(!rawJson.includes("github_pat_"), "Snapshot must not contain fine-grained PATs");
    assert.ok(!rawJson.includes("Authorization"), "Snapshot must not contain Authorization headers");
  });

  it("should map all 15 canonical projects to their upstream or owned repositories", () => {
    const projectsPath = path.join(ROOT_DIR, "src/data/projects.ts");
    const projectsSrc = fs.readFileSync(projectsPath, "utf8");
    const projectSlugs = [...projectsSrc.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);

    const portfolioPath = path.join(ROOT_DIR, "src/data/portfolio.ts");
    const portfolioSrc = fs.readFileSync(portfolioPath, "utf8");

    assert.equal(projectSlugs.length, 15, "There must be exactly 15 canonical projects");

    for (const slug of projectSlugs) {
      assert.ok(
        portfolioSrc.includes(`projectId: "${slug}"`),
        `Missing mapping in PROJECT_REPO_MAPPINGS for project slug: ${slug}`
      );
    }
  });

  it("should maintain normalized contribution levels (0-4) across calendar days", () => {
    for (const day of snapshotData.calendar) {
      assert.ok([0, 1, 2, 3, 4].includes(day.level), `Invalid contribution level: ${day.level}`);
      assert.ok(day.weekday >= 0 && day.weekday <= 6, `Invalid weekday: ${day.weekday}`);
      assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(day.date), `Invalid date format: ${day.date}`);
    }
  });

  it("should have server-only protection guard on server modules", () => {
    const clientServerPath = path.join(ROOT_DIR, "src/lib/github/client.server.ts");
    const cachePath = path.join(ROOT_DIR, "src/lib/github/cache.ts");

    const clientServerSrc = fs.readFileSync(clientServerPath, "utf8");
    const cacheSrc = fs.readFileSync(cachePath, "utf8");

    assert.ok(
      clientServerSrc.includes('import "server-only";') || clientServerSrc.includes("import 'server-only';"),
      "client.server.ts must import server-only"
    );
    assert.ok(
      cacheSrc.includes('import "server-only";') || cacheSrc.includes("import 'server-only';"),
      "cache.ts must import server-only"
    );
  });
});
