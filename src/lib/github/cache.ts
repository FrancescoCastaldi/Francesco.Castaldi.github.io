import "server-only";
import { fetchLiveGitHubData, getFallbackSnapshotData } from "./client.server";
import type { GitHubPublicData } from "./types";

interface CacheEntry {
  data: GitHubPublicData;
  expiresAt: number;
}

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

let memoryCache: CacheEntry | null = null;

export async function getGitHubPortfolioData(): Promise<GitHubPublicData> {
  const now = Date.now();

  if (memoryCache && memoryCache.expiresAt > now) {
    return {
      ...memoryCache.data,
      source: "cache",
    };
  }

  try {
    const liveData = await fetchLiveGitHubData();
    memoryCache = {
      data: liveData,
      expiresAt: now + CACHE_TTL_MS,
    };
    return liveData;
  } catch (err) {
    console.warn("[GitHub Cache] Failed to refresh live data, using snapshot:", err);
    const fallback = getFallbackSnapshotData();
    memoryCache = {
      data: fallback,
      expiresAt: now + 60 * 1000, // Short retry TTL on error
    };
    return fallback;
  }
}

export function clearGitHubCacheForTesting(): void {
  memoryCache = null;
}
