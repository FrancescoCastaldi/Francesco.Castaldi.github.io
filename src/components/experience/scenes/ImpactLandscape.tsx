"use client";
import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import type { DerivedAreaDistribution } from "@/lib/portfolio/derive";
import type { GitHubPublicData } from "@/lib/github/types";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

interface ImpactLandscapeProps {
  distribution: DerivedAreaDistribution[];
  gitHubData?: GitHubPublicData;
}

export default function ImpactLandscape({ distribution, gitHubData }: ImpactLandscapeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useResourceCleanup(groupRef);

  // 4 practice area pillar monuments
  const spacing = 1.6;
  const startX = -((distribution.length - 1) * spacing) / 2;

  // Process GitHub contribution landscape data (52 weeks x 7 days)
  const calendarBlocks = useMemo(() => {
    if (!gitHubData?.weeks || gitHubData.weeks.length === 0) return [];

    const blocks: Array<{
      x: number;
      z: number;
      height: number;
      color: string;
      roughness: number;
    }> = [];

    const weekCount = Math.min(gitHubData.weeks.length, 52);
    const cellWidth = 0.08;
    const cellGap = 0.03;
    const totalGridWidth = weekCount * (cellWidth + cellGap);
    const startGridX = -totalGridWidth / 2;
    const gridZOffset = 1.2;

    gitHubData.weeks.slice(-weekCount).forEach((week, wIdx) => {
      week.days.forEach((day) => {
        const x = startGridX + wIdx * (cellWidth + cellGap);
        const z = gridZOffset + day.weekday * (cellWidth + cellGap);
        const height = Math.max(0.03, day.count * 0.04);

        let color: string = SCENE_CONFIG.colors.anthracite;
        if (day.level === 1) color = SCENE_CONFIG.colors.pineGreen;
        else if (day.level === 2) color = "#2d523e";
        else if (day.level === 3) color = SCENE_CONFIG.colors.stoneGray;
        else if (day.level === 4) color = SCENE_CONFIG.colors.burntOrange;

        blocks.push({
          x,
          z,
          height,
          color,
          roughness: day.level > 2 ? 0.4 : 0.8,
        });
      });
    });

    return blocks;
  }, [gitHubData]);

  // Update instanced mesh matrices and colors in a single high-performance batch
  useEffect(() => {
    if (!instancedRef.current || calendarBlocks.length === 0) return;
    const mesh = instancedRef.current;
    const color = new THREE.Color();

    calendarBlocks.forEach((b, i) => {
      dummy.position.set(b.x, b.height / 2, b.z);
      dummy.scale.set(1, b.height, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(b.color);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [calendarBlocks, dummy]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle rotation for dynamic depth
    groupRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -0.4, -2]}>
      {/* 4 Practice Area Architectural Monuments */}
      {distribution.map((area, idx) => {
        const x = startX + idx * spacing;
        const barHeight = Math.max(area.normalizedHeight * 2.8, 0.4);
        return (
          <group key={area.pillarId} position={[x, 0, 0]}>
            {/* Base pedestal */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[1.1, 0.08, 0.9]} />
              <meshStandardMaterial
                color={SCENE_CONFIG.colors.anthracite}
                roughness={0.8}
                metalness={0.2}
              />
            </mesh>

            {/* Vertical architectural lamellae */}
            {Array.from({ length: 6 }).map((_, lIdx) => {
              const lamellaZ = -0.3 + lIdx * 0.12;
              return (
                <mesh key={lIdx} position={[0, barHeight / 2, lamellaZ]}>
                  <boxGeometry args={[0.9, barHeight, 0.03]} />
                  <meshStandardMaterial
                    color={
                      lIdx === 3 && area.pillarId === "upstream"
                        ? SCENE_CONFIG.colors.burntOrange
                        : lIdx % 2 === 0
                        ? SCENE_CONFIG.colors.pineGreen
                        : SCENE_CONFIG.colors.anthracite
                    }
                    roughness={0.7}
                    metalness={0.2}
                  />
                </mesh>
              );
            })}

            {/* Apical accent plate */}
            <mesh position={[0, barHeight + 0.04, 0]}>
              <boxGeometry args={[0.92, 0.02, 0.7]} />
              <meshStandardMaterial
                color={SCENE_CONFIG.colors.stoneGray}
                roughness={0.4}
                metalness={0.4}
              />
            </mesh>
          </group>
        );
      })}

      {/* GitHub Activity Heatmap Terrain (1 Draw Call via InstancedMesh) */}
      {calendarBlocks.length > 0 && (
        <group position={[0, -0.12, 0]}>
          <instancedMesh
            ref={instancedRef}
            args={[undefined, undefined, calendarBlocks.length]}
          >
            <boxGeometry args={[0.08, 1, 0.08]} />
            <meshStandardMaterial roughness={0.6} metalness={0.2} />
          </instancedMesh>
        </group>
      )}
    </group>
  );
}
