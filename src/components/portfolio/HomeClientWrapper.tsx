"use client";
import React, { useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import ImpactSection from "@/components/portfolio/ImpactSection";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import ProjectArchive from "@/components/portfolio/ProjectArchive";
import ExpertiseSection from "@/components/portfolio/ExpertiseSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ExperienceClient from "@/components/experience/ExperienceClient";
import ScrollController from "@/components/experience/ScrollController";
import { useExperienceQuality } from "@/hooks/useExperienceQuality";
import type { DerivedPortfolioStats } from "@/lib/portfolio/derive";
import type { ProjectNode, SkillNode } from "@/data/types";

interface HomeClientWrapperProps {
  stats: DerivedPortfolioStats;
  featuredProjects: ProjectNode[];
  allProjects: ProjectNode[];
  allSkills: SkillNode[];
}

export default function HomeClientWrapper({
  stats,
  featuredProjects,
  allProjects,
  allSkills,
}: HomeClientWrapperProps) {
  const quality = useExperienceQuality();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0E100F" }}>
      {/* Lenis Smooth Scroll Controller */}
      <ScrollController />

      {/* 3D Scene Layer (Client only, falls back to 2D gracefully) */}
      <ExperienceClient
        distribution={stats.areaDistribution}
        activeProjectIndex={activeProjectIndex}
        totalProjects={featuredProjects.length}
        hoveredSkillId={hoveredSkillId}
        isHeroHovered={isHeroHovered}
      />

      {/* Semantic Accessible HTML Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroSection
          onHoverStateChange={setIsHeroHovered}
          canRender3D={quality.canRender3D}
        />
        <ImpactSection stats={stats} />
        <ProjectGallery
          projects={featuredProjects}
          onActiveIndexChange={setActiveProjectIndex}
        />
        <ProjectArchive allProjects={allProjects} />
        <ExpertiseSection
          skills={allSkills}
          onSkillHover={setHoveredSkillId}
        />
        <ContactSection />
      </div>
    </div>
  );
}
