import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import type { EngineeringPillarId } from "@/data/types";
import { FEATURED_PROJECT_IDS, VERIFIED_CAREER_METRICS } from "@/data/portfolio";

export interface DerivedAreaDistribution {
  pillarId: EngineeringPillarId;
  title: string;
  projectCount: number;
  normalizedHeight: number; // 0.0 to 1.0 based on maximum projects in an area
}

export interface DerivedPortfolioStats {
  totalProjects: number;
  totalSkills: number;
  totalPracticeAreas: number;
  featuredCount: number;
  areaDistribution: DerivedAreaDistribution[];
  careerMetrics: typeof VERIFIED_CAREER_METRICS;
}

export interface ConstellationEdge {
  sourceSkillId: string;
  targetSkillId: string;
  sharedProjectsCount: number;
  sharedProjectSlugs: string[];
}

export function getDerivedPortfolioStats(): DerivedPortfolioStats {
  const practiceAreas: { id: EngineeringPillarId; title: string }[] = [
    { id: "upstream", title: "Upstream Systems & Cloud Native" },
    { id: "automotive", title: "Automotive & Powertrain Kinematics" },
    { id: "data-science", title: "Data Science, Radar AI & Stochastic Modeling" },
    { id: "analytics", title: "Enterprise Analytics & Visualization" },
  ];

  const counts = practiceAreas.map((area) => {
    const count = projects.filter((p) => p.pillar === area.id).length;
    return {
      pillarId: area.id,
      title: area.title,
      projectCount: count,
    };
  });

  const maxCount = Math.max(...counts.map((c) => c.projectCount), 1);

  const areaDistribution: DerivedAreaDistribution[] = counts.map((item) => ({
    ...item,
    normalizedHeight: Number((item.projectCount / maxCount).toFixed(3)),
  }));

  return {
    totalProjects: projects.length,
    totalSkills: skills.length,
    totalPracticeAreas: practiceAreas.length,
    featuredCount: FEATURED_PROJECT_IDS.length,
    areaDistribution,
    careerMetrics: VERIFIED_CAREER_METRICS,
  };
}

export function getDerivedConstellationGraph() {
  const skillNodes = skills.map((s, idx) => {
    // Determine angle and radius for stable layout
    const angle = (idx / skills.length) * Math.PI * 2;
    const radius = 2.8 + (idx % 2 === 0 ? 0.4 : -0.3);
    return {
      id: s.id,
      name: s.name,
      label: s.label,
      area: s.area,
      level: s.level,
      projectCount: s.relatedProjects.length,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * (radius * 0.55),
      z: (Math.sin(angle * 2) * 0.4),
    };
  });

  const edges: ConstellationEdge[] = [];

  for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
      const skillA = skills[i];
      const skillB = skills[j];

      // Legami derivati esclusivamente da progetti effettivamente condivisi
      const sharedProjects = skillA.relatedProjects.filter((pSlug) =>
        skillB.relatedProjects.includes(pSlug)
      );

      if (sharedProjects.length > 0) {
        edges.push({
          sourceSkillId: skillA.id,
          targetSkillId: skillB.id,
          sharedProjectsCount: sharedProjects.length,
          sharedProjectSlugs: sharedProjects,
        });
      }
    }
  }

  return {
    nodes: skillNodes,
    edges,
  };
}
