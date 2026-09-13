import React from "react";
import HomeClientWrapper from "@/components/portfolio/HomeClientWrapper";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { FEATURED_PROJECT_IDS } from "@/data/portfolio";
import { getDerivedPortfolioStats } from "@/lib/portfolio/derive";

export const dynamic = "force-static";

export default function HomePage() {
  const stats = getDerivedPortfolioStats();

  // 12 featured projects in specific order
  const featuredProjects = FEATURED_PROJECT_IDS.map((id) =>
    projects.find((p) => p.id === id)
  ).filter((p): p is (typeof projects)[0] => Boolean(p));

  return (
    <HomeClientWrapper
      stats={stats}
      featuredProjects={featuredProjects}
      allProjects={projects}
      allSkills={skills}
    />
  );
}
