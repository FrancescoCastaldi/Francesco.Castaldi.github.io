"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CameraRig from "./CameraRig";
import HeroSculpture from "./scenes/HeroSculpture";
import ImpactLandscape from "./scenes/ImpactLandscape";
import ProjectStage from "./scenes/ProjectStage";
import SkillsConstellation from "./scenes/SkillsConstellation";
import type { DerivedAreaDistribution } from "@/lib/portfolio/derive";

interface SceneCanvasProps {
  currentSection: string;
  isSculpturePaused?: boolean;
  distribution: DerivedAreaDistribution[];
  activeProjectIndex?: number;
  totalProjects?: number;
  hoveredSkillId?: string | null;
  dpr?: number;
}

export default function SceneCanvas({
  currentSection,
  isSculpturePaused = false,
  distribution,
  activeProjectIndex = 0,
  totalProjects = 12,
  hoveredSkillId = null,
  dpr = 1.5,
}: SceneCanvasProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8.5], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CameraRig currentSection={currentSection} />

        <ambientLight intensity={0.55} />
        {/* Luce laterale morbida per creare chiaro-scuro materico */}
        <directionalLight position={[6, 8, 5]} intensity={1.2} color="#EDE8DE" />
        <directionalLight position={[-6, -4, -3]} intensity={0.35} color="#1F3329" />

        <Suspense fallback={null}>
          {currentSection === "hero" && (
            <HeroSculpture isPaused={isSculpturePaused} />
          )}
          {currentSection === "numbers" && (
            <ImpactLandscape distribution={distribution} />
          )}
          {currentSection === "work" && (
            <ProjectStage
              activeIndex={activeProjectIndex}
              totalProjects={totalProjects}
            />
          )}
          {currentSection === "expertise" && (
            <SkillsConstellation hoveredSkillId={hoveredSkillId} />
          )}
          {currentSection === "contact" && null}
        </Suspense>
      </Canvas>
    </div>
  );
}
