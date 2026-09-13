"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useExperienceQuality } from "@/hooks/useExperienceQuality";
import type { DerivedAreaDistribution } from "@/lib/portfolio/derive";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
});

interface ExperienceClientProps {
  distribution: DerivedAreaDistribution[];
  activeProjectIndex?: number;
  totalProjects?: number;
  hoveredSkillId?: string | null;
  isHeroHovered?: boolean;
}

export default function ExperienceClient({
  distribution,
  activeProjectIndex = 0,
  totalProjects = 12,
  hoveredSkillId = null,
  isHeroHovered = false,
}: ExperienceClientProps) {
  const quality = useExperienceQuality();
  const [currentSection, setCurrentSection] = useState<string>("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = ["hero", "numbers", "work", "expertise", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!quality.canRender3D) {
    return null;
  }

  return (
    <SceneCanvas
      currentSection={currentSection}
      isSculpturePaused={isHeroHovered}
      distribution={distribution}
      activeProjectIndex={activeProjectIndex}
      totalProjects={totalProjects}
      hoveredSkillId={hoveredSkillId}
      dpr={quality.dpr}
    />
  );
}