"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { GitHubPublicData } from "@/lib/github/types";
import snapshotData from "@/data/github-snapshot.json";

interface SceneContextValue {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  activeProjectIndex: number;
  setActiveProjectIndex: (index: number) => void;
  hoveredSkillId: string | null;
  setHoveredSkillId: (id: string | null) => void;
  isHeroHovered: boolean;
  setIsHeroHovered: (hovered: boolean) => void;
  is404Realigning: boolean;
  setIs404Realigning: (realigning: boolean) => void;
  gitHubData: GitHubPublicData;
}

const defaultGitHubData = snapshotData as unknown as GitHubPublicData;

const SceneContext = createContext<SceneContextValue>({
  currentSection: "hero",
  setCurrentSection: () => {},
  activeProjectIndex: 0,
  setActiveProjectIndex: () => {},
  hoveredSkillId: null,
  setHoveredSkillId: () => {},
  isHeroHovered: false,
  setIsHeroHovered: () => {},
  is404Realigning: false,
  setIs404Realigning: () => {},
  gitHubData: defaultGitHubData,
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isHeroHovered, setIsHeroHovered] = useState<boolean>(false);
  const [is404Realigning, setIs404Realigning] = useState<boolean>(false);
  const [gitHubData, setGitHubData] = useState<GitHubPublicData>(defaultGitHubData);

  useEffect(() => {
    // Attempt client-side telemetry hydration via sanitized API
    let isMounted = true;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (isMounted && payload?.data) {
          setGitHubData(payload.data);
        }
      })
      .catch(() => {
        // Silent fallback to static snapshot
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SceneContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        activeProjectIndex,
        setActiveProjectIndex,
        hoveredSkillId,
        setHoveredSkillId,
        isHeroHovered,
        setIsHeroHovered,
        is404Realigning,
        setIs404Realigning,
        gitHubData,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}
