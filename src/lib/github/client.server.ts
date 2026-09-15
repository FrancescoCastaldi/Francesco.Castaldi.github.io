import "server-only";
import snapshotData from "@/data/github-snapshot.json";
import { PROJECT_REPO_MAPPINGS } from "@/data/portfolio";
import type {
  GitHubPublicData,
  GraphQLUserResponse,
  PublicContributionDay,
  PublicContributionWeek,
  PublicRepositorySummary,
  LanguageStat,
} from "./types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "FrancescoCastaldi";

const PORTFOLIO_GITHUB_QUERY = `
  query PortfolioGitHubData($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: [OWNER]) {
        nodes {
          name
          isFork
          updatedAt
          url
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            totalSize
            edges {
              size
              node { name color }
            }
          }
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
        }
      }
    }
  }
`;

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

export function getFallbackSnapshotData(): GitHubPublicData {
  const typedSnapshot = snapshotData as unknown as GitHubPublicData;
  return {
    ...typedSnapshot,
    source: "snapshot",
  };
}

export async function fetchLiveGitHubData(): Promise<GitHubPublicData> {
  const token = process.env.GITHUB_GRAPHQL_TOKEN;

  if (!token) {
    return getFallbackSnapshotData();
  }

  const now = new Date();
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const variables = {
    login: GITHUB_USERNAME,
    from: oneYearAgo.toISOString(),
    to: now.toISOString(),
  };

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "FrancescoCastaldi-Portfolio-App",
      },
      body: JSON.stringify({
        query: PORTFOLIO_GITHUB_QUERY,
        variables,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn(`[GitHub GraphQL] Fetch returned HTTP ${response.status}. Falling back to snapshot.`);
      return getFallbackSnapshotData();
    }

    const payload: GraphQLUserResponse = await response.json();

    if (payload.errors && payload.errors.length > 0) {
      console.warn("[GitHub GraphQL] Response contained errors:", payload.errors[0]?.message);
      return getFallbackSnapshotData();
    }

    const user = payload.data?.user;
    const calendar = user?.contributionsCollection?.contributionCalendar;

    if (!calendar || !user?.repositories) {
      return getFallbackSnapshotData();
    }

    const publicWeeks: PublicContributionWeek[] = [];
    const flatCalendar: PublicContributionDay[] = [];

    for (const week of calendar.weeks) {
      const days: PublicContributionDay[] = [];
      for (const day of week.contributionDays) {
        const item: PublicContributionDay = {
          date: day.date,
          count: day.contributionCount,
          weekday: day.weekday,
          level: getContributionLevel(day.contributionCount),
        };
        days.push(item);
        flatCalendar.push(item);
      }
      publicWeeks.push({ days });
    }

    const publicRepos: PublicRepositorySummary[] = [];
    const languageTotals: Record<string, { bytes: number; color: string }> = {};
    let totalLanguageBytes = 0;

    for (const repo of user.repositories.nodes || []) {
      const topics = (repo.repositoryTopics?.nodes || []).map((t) => t.topic.name);
      const langs = (repo.languages?.edges || []).map((edge) => ({
        name: edge.node.name,
        size: edge.size,
        color: edge.node.color || "#888888",
      }));

      for (const lang of langs) {
        if (!languageTotals[lang.name]) {
          languageTotals[lang.name] = { bytes: 0, color: lang.color };
        }
        languageTotals[lang.name].bytes += lang.size;
        totalLanguageBytes += lang.size;
      }

      // Map to project slug if exists
      const matchMapping = PROJECT_REPO_MAPPINGS.find(
        (m) =>
          m.repoName.toLowerCase() === repo.name.toLowerCase() ||
          m.repoUrl.toLowerCase().endsWith(`/${repo.name.toLowerCase()}`)
      );

      publicRepos.push({
        name: repo.name,
        isFork: repo.isFork,
        updatedAt: repo.updatedAt,
        url: repo.url,
        topics,
        primaryLanguage: langs[0]?.name,
        languages: langs,
        associatedProjectSlug: matchMapping?.projectId,
        affiliation: matchMapping?.affiliation || "owned",
      });
    }

    const languageDistribution: Record<string, LanguageStat> = {};
    for (const [name, stats] of Object.entries(languageTotals)) {
      languageDistribution[name] = {
        bytes: stats.bytes,
        percentage:
          totalLanguageBytes > 0
            ? Number(((stats.bytes / totalLanguageBytes) * 100).toFixed(1))
            : 0,
        color: stats.color,
      };
    }

    return {
      user: GITHUB_USERNAME,
      totalContributions: calendar.totalContributions,
      calendar: flatCalendar,
      weeks: publicWeeks,
      repositories: publicRepos,
      languageDistribution,
      lastUpdated: new Date().toISOString(),
      source: "live",
    };
  } catch (error) {
    console.warn("[GitHub GraphQL] Request exception:", error instanceof Error ? error.message : String(error));
    return getFallbackSnapshotData();
  }
}
