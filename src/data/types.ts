export interface ProjectNode {
  id: string;
  label: string;
  title: string;
  slug: string;
  color?: string;
  description: string;
  longDescription: string;
  tags: string[];
  skills: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  image?: string;
  featured: boolean;
  icon: string;
}

export interface SkillNode {
  id: string;
  label: string;
  name: string;
  type: "skill";
  area: "healthcare" | "data-science" | "cloud" | "ai" | "security" | "cycling" | "consulting";
  level: "expert" | "advanced" | "intermediate";
  description: string;
  relatedProjects: string[];
  icon: string;
  color: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage?: string;
  readingTime: number;
  published: boolean;
  category: string;
}
