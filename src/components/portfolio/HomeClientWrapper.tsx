"use client";
import React, { useEffect } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import ImpactSection from "@/components/portfolio/ImpactSection";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import ProjectArchive from "@/components/portfolio/ProjectArchive";
import ExpertiseSection from "@/components/portfolio/ExpertiseSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ScrollController from "@/components/experience/ScrollController";
import { useScene } from "@/context/SceneContext";
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
  const {
    setCurrentSection,
    setActiveProjectIndex,
    setHoveredSkillId,
    setIsHeroHovered,
  } = useScene();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = ["hero", "numbers", "work", "archive", "expertise", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          const mappedSection = sectionIds[i] === "archive" ? "work" : sectionIds[i];
          setCurrentSection(mappedSection);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setCurrentSection]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "transparent" }}>
      {/* Lenis Smooth Scroll Controller */}
      <ScrollController />

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
