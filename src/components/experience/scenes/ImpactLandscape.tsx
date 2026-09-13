"use client";
import React from "react";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import type { DerivedAreaDistribution } from "@/lib/portfolio/derive";

interface ImpactLandscapeProps {
  distribution: DerivedAreaDistribution[];
}

export default function ImpactLandscape({ distribution }: ImpactLandscapeProps) {
  // 4 rilievi lamellari affiancati su scala comune
  const spacing = 1.6;
  const startX = -((distribution.length - 1) * spacing) / 2;

  return (
    <group position={[0, -0.4, -2]}>
      {distribution.map((area, idx) => {
        const x = startX + idx * spacing;
        const barHeight = Math.max(area.normalizedHeight * 2.8, 0.4);
        return (
          <group key={area.pillarId} position={[x, 0, 0]}>
            {/* Piedistallo base */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[1.1, 0.08, 0.9]} />
              <meshStandardMaterial
                color={SCENE_CONFIG.colors.anthracite}
                roughness={0.88}
                metalness={0.08}
              />
            </mesh>

            {/* Rilievo a lamelle verticali la cui altezza esprime i progetti dell'area */}
            {Array.from({ length: 6 }).map((_, lIdx) => {
              const lamellaZ = -0.3 + lIdx * 0.12;
              return (
                <mesh
                  key={lIdx}
                  position={[0, barHeight / 2, lamellaZ]}
                >
                  <boxGeometry args={[0.9, barHeight, 0.03]} />
                  <meshStandardMaterial
                    color={
                      lIdx === 3
                        ? SCENE_CONFIG.colors.pineGreen
                        : SCENE_CONFIG.colors.stoneGray
                    }
                    roughness={0.65}
                    metalness={0.2}
                  />
                </mesh>
              );
            })}

            {/* Accento apicale sottile */}
            <mesh position={[0, barHeight + 0.04, 0]}>
              <boxGeometry args={[0.92, 0.02, 0.7]} />
              <meshStandardMaterial
                color={SCENE_CONFIG.colors.burntOrange}
                roughness={0.4}
                metalness={0.4}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
