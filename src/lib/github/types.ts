export interface GraphQLContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface GraphQLContributionWeek {
  contributionDays: GraphQLContributionDay[];
}

export interface GraphQLContributionCalendar {
  totalContributions: number;
  weeks: GraphQLContributionWeek[];
}

export interface GraphQLLanguageEdge {
  size: number;
  node: {
    name: string;
    color: string | null;
  };
}

export interface GraphQLTopicNode {
  topic: {
    name: string;
  };
}

export interface GraphQLRepositoryNode {
  name: string;
  isFork: boolean;
  updatedAt: string;
  url: string;
  languages?: {
    totalSize: number;
    edges: GraphQLLanguageEdge[];
  };
  repositoryTopics?: {
    nodes: GraphQLTopicNode[];
  };
}

export interface GraphQLUserResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: GraphQLContributionCalendar;
      };
      repositories?: {
        nodes: GraphQLRepositoryNode[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

// ==========================================
// SANITIZED PUBLIC DTO (CLIENT-SAFE)
// ==========================================

export interface PublicContributionDay {
  date: string;
  count: number;
  weekday: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PublicContributionWeek {
  days: PublicContributionDay[];
}

export interface PublicRepositorySummary {
  name: string;
  isFork: boolean;
  updatedAt: string;
  url: string;
  topics: string[];
  primaryLanguage?: string;
  languages: Array<{
    name: string;
    size: number;
    color: string;
  }>;
  associatedProjectSlug?: string;
  affiliation: "owned" | "upstream";
}

export interface LanguageStat {
  bytes: number;
  percentage: number;
  color: string;
}

export interface GitHubPublicData {
  user: string;
  totalContributions: number;
  calendar: PublicContributionDay[];
  weeks: PublicContributionWeek[];
  repositories: PublicRepositorySummary[];
  languageDistribution: Record<string, LanguageStat>;
  lastUpdated: string;
  source: "live" | "cache" | "snapshot";
}
