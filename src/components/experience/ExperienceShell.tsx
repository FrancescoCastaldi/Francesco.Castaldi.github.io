"use client";
import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useExperienceQuality, useTabVisibility } from "@/hooks/useExperienceQuality";
import SceneDirector from "./SceneDirector";
import AdaptiveQuality from "./AdaptiveQuality";

export default function ExperienceShell() {
  const quality = useExperienceQuality();
  const isTabVisible = useTabVisibility();
  const [hasContextLost, setHasContextLost] = useState(false);

  // Accessible fallback: if reduced motion or unsupported WebGL, yield cleanly
  if (!quality.canRender3D) {
    return null;
  }

  return (
    <div
      id="experience-shell"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Canvas
        dpr={quality.dpr}
        frameloop={isTabVisible ? "always" : "never"}
        camera={{ position: [0, 0, 8.5], fov: 42, near: 0.1, far: 100 }}
        eventSource={typeof document !== "undefined" ? (document.body as HTMLElement) : undefined}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const onContextLost = (e: Event) => {
            e.preventDefault();
            console.warn("[ExperienceShell] WebGL context lost");
            setHasContextLost(true);
          };
          const onContextRestored = () => {
            console.info("[ExperienceShell] WebGL context restored");
            setHasContextLost(false);
          };

          canvas.addEventListener("webglcontextlost", onContextLost, false);
          canvas.addEventListener("webglcontextrestored", onContextRestored, false);
        }}
      >
        <AdaptiveQuality />
        <Suspense fallback={null}>
          {!hasContextLost && <SceneDirector />}
        </Suspense>
      </Canvas>
    </div>
  );
}
