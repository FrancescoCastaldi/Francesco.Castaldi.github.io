"use client";
import React, { useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "@/context/SceneContext";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { getDerivedPortfolioStats } from "@/lib/portfolio/derive";

import HeroSculpture from "./scenes/HeroSculpture";
import ImpactLandscape from "./scenes/ImpactLandscape";
import ProjectStage from "./scenes/ProjectStage";
import SkillsConstellation from "./scenes/SkillsConstellation";
import ProjectParametricScene from "./scenes/ProjectParametricScene";
import SkillLivingGraphScene from "./scenes/SkillLivingGraphScene";
import ContactRoomScene from "./scenes/ContactRoomScene";
import NotFoundScene from "./scenes/NotFoundScene";

export default function SceneDirector() {
  const pathname = usePathname();
  const {
    currentSection,
    activeProjectIndex,
    hoveredSkillId,
    isHeroHovered,
    gitHubData,
  } = useScene();

  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(...SCENE_CONFIG.camera.defaultPosition));
  const targetCamLook = useRef(new THREE.Vector3(0, 0, 0));

  const stats = useMemo(() => getDerivedPortfolioStats(), []);

  // Compute camera trajectory and active scene based on pathname and section
  const routeState = useMemo(() => {
    if (!pathname || pathname === "/") {
      const sec =
        SCENE_CONFIG.sections.find((s) => s.id === currentSection) ||
        SCENE_CONFIG.sections[0];
      return {
        type: "home" as const,
        cameraPos: [0, sec.cameraY, sec.cameraZ] as [number, number, number],
        lookAt: [0, sec.targetY, 0] as [number, number, number],
        subSection: currentSection,
      };
    }

    if (pathname.startsWith("/project/")) {
      const slug = pathname.replace("/project/", "").split("/")[0];
      return {
        type: "project" as const,
        cameraPos: [0, 0, 7.5] as [number, number, number],
        lookAt: [0.5, 0, 0] as [number, number, number],
        slug,
      };
    }

    if (pathname.startsWith("/skill/")) {
      const skillId = pathname.replace("/skill/", "").split("/")[0];
      return {
        type: "skill" as const,
        cameraPos: [0, 0, 7.8] as [number, number, number],
        lookAt: [0.5, 0, 0] as [number, number, number],
        skillId,
      };
    }

    if (pathname === "/contact") {
      return {
        type: "contact" as const,
        cameraPos: [0, 0, 8.0] as [number, number, number],
        lookAt: [0.4, 0, 0] as [number, number, number],
      };
    }

    return {
      type: "not-found" as const,
      cameraPos: [0, 0, 8.5] as [number, number, number],
      lookAt: [0, 0, 0] as [number, number, number],
    };
  }, [pathname, currentSection]);

  useFrame((_, delta) => {
    targetCamPos.current.set(...routeState.cameraPos);
    targetCamLook.current.set(...routeState.lookAt);

    camera.position.lerp(
      targetCamPos.current,
      THREE.MathUtils.clamp(delta * 2.8, 0, 1)
    );
    camera.lookAt(targetCamLook.current);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 5]} intensity={1.2} color="#EDE8DE" />
      <directionalLight position={[-6, -4, -3]} intensity={0.35} color="#1F3329" />

      {routeState.type === "home" && (
        <>
          {routeState.subSection === "hero" && (
            <HeroSculpture isPaused={isHeroHovered} />
          )}
          {routeState.subSection === "numbers" && (
            <ImpactLandscape
              distribution={stats.areaDistribution}
              gitHubData={gitHubData}
            />
          )}
          {routeState.subSection === "work" && (
            <ProjectStage
              activeIndex={activeProjectIndex}
              totalProjects={stats.featuredCount}
            />
          )}
          {routeState.subSection === "expertise" && (
            <SkillsConstellation hoveredSkillId={hoveredSkillId} />
          )}
          {routeState.subSection === "contact" && <ContactRoomScene />}
        </>
      )}

      {routeState.type === "project" && (
        <ProjectParametricScene slug={routeState.slug} />
      )}

      {routeState.type === "skill" && (
        <SkillLivingGraphScene skillId={routeState.skillId} />
      )}

      {routeState.type === "contact" && <ContactRoomScene />}

      {routeState.type === "not-found" && <NotFoundScene />}
    </>
  );
}
