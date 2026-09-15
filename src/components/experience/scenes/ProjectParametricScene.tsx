"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "@/data/projects";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

interface ProjectParametricSceneProps {
  slug: string;
}

export default function ProjectParametricScene({ slug }: ProjectParametricSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  useResourceCleanup(groupRef);

  const project = projects.find((p) => p.slug === slug);
  const pillar = project?.pillar || "upstream";

  // Generate deterministic geometries according to architectural pillar specs
  const geometryData = useMemo(() => {
    if (pillar === "automotive") {
      // Reciprocating kinematic assembly (Connecting rod & wristpin axes)
      return { type: "automotive" };
    } else if (pillar === "data-science") {
      // Deterministic Fibonacci sphere point cloud latent space + rotating tensor rings
      const pointCount = 180;
      const points: [number, number, number][] = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < pointCount; i++) {
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / pointCount);
        const r = 1.2 + ((i * 13) % 7) * 0.08;
        const sinPhi = Math.sin(phi);
        points.push([
          r * sinPhi * Math.cos(theta),
          r * sinPhi * Math.sin(theta),
          r * Math.cos(phi),
        ]);
      }
      return { type: "data-science", points };
    } else if (pillar === "analytics") {
      // Multi-tier hierarchical grid planes
      return { type: "analytics" };
    } else {
      // Upstream / Cloud Native: Kinematic orthogonal wireframe lattice & distributed nodes
      const nodeCount = 28;
      const nodes: [number, number, number][] = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const y = ((i % 5) - 2) * 0.4;
        const rad = 1.4 + (i % 3) * 0.3;
        nodes.push([Math.cos(angle) * rad, y, Math.sin(angle) * rad]);
      }
      return { type: "upstream", nodes };
    }
  }, [pillar]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.05;
  });

  return (
    <group ref={groupRef} position={[1.8, 0, -1]}>
      {geometryData.type === "automotive" && (
        <group>
          {/* Main rod stem */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 2.8, 16]} />
            <meshStandardMaterial
              color={SCENE_CONFIG.colors.anthracite}
              metalness={0.7}
              roughness={0.3}
              wireframe={false}
            />
          </mesh>
          {/* Big-end journal */}
          <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.12, 16, 32]} />
            <meshStandardMaterial
              color={SCENE_CONFIG.colors.pineGreen}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
          {/* Small-end pin */}
          <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.08, 16, 32]} />
            <meshStandardMaterial
              color={SCENE_CONFIG.colors.burntOrange}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {/* Wireframe reference cage */}
          <mesh>
            <boxGeometry args={[1.8, 3.4, 1.4]} />
            <meshBasicMaterial
              color={SCENE_CONFIG.colors.stoneGray}
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>
      )}

      {geometryData.type === "data-science" && (
        <group>
          {/* Concentric tensor rings */}
          <mesh rotation={[0.4, 0, 0]}>
            <torusGeometry args={[1.6, 0.02, 16, 64]} />
            <meshStandardMaterial color={SCENE_CONFIG.colors.pineGreen} roughness={0.4} />
          </mesh>
          <mesh rotation={[-0.4, 0.8, 0]}>
            <torusGeometry args={[1.2, 0.02, 16, 64]} />
            <meshStandardMaterial color={SCENE_CONFIG.colors.burntOrange} roughness={0.3} />
          </mesh>
          <mesh rotation={[0.8, -0.4, 0.5]}>
            <torusGeometry args={[0.8, 0.015, 16, 64]} />
            <meshStandardMaterial color={SCENE_CONFIG.colors.ivory} roughness={0.2} />
          </mesh>
          {/* Latent point cloud */}
          {geometryData.points?.map((pt, idx) => (
            <mesh key={idx} position={pt}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial
                color={idx % 4 === 0 ? SCENE_CONFIG.colors.burntOrange : SCENE_CONFIG.colors.stoneGray}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      )}

      {geometryData.type === "analytics" && (
        <group>
          {/* 3 Tier stacked isometric matrix grids */}
          {[-0.8, 0, 0.8].map((y, tier) => (
            <group key={tier} position={[0, y, 0]} rotation={[0.3, 0, 0]}>
              <mesh>
                <boxGeometry args={[2.4, 0.03, 2.4]} />
                <meshStandardMaterial
                  color={tier === 1 ? SCENE_CONFIG.colors.pineGreen : SCENE_CONFIG.colors.anthracite}
                  roughness={0.6}
                  metalness={0.3}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              {/* Matrix grid cells */}
              {Array.from({ length: 9 }).map((_, c) => {
                const cx = ((c % 3) - 1) * 0.7;
                const cz = (Math.floor(c / 3) - 1) * 0.7;
                const cellH = 0.1 + ((tier + c) % 4) * 0.12;
                return (
                  <mesh key={c} position={[cx, cellH / 2, cz]}>
                    <boxGeometry args={[0.4, cellH, 0.4]} />
                    <meshStandardMaterial
                      color={
                        c === 4 && tier === 1
                          ? SCENE_CONFIG.colors.burntOrange
                          : SCENE_CONFIG.colors.stoneGray
                      }
                      roughness={0.5}
                      metalness={0.2}
                    />
                  </mesh>
                );
              })}
            </group>
          ))}
        </group>
      )}

      {geometryData.type === "upstream" && (
        <group>
          {/* Central distributed core cylinder */}
          <mesh>
            <cylinderGeometry args={[0.6, 0.6, 2.0, 6, 1, true]} />
            <meshStandardMaterial
              color={SCENE_CONFIG.colors.anthracite}
              roughness={0.7}
              wireframe
            />
          </mesh>
          {/* Satellite cluster nodes */}
          {geometryData.nodes?.map((node, i) => (
            <group key={i} position={node}>
              <mesh>
                <boxGeometry args={[0.08, 0.08, 0.08]} />
                <meshStandardMaterial
                  color={
                    i % 5 === 0
                      ? SCENE_CONFIG.colors.burntOrange
                      : i % 2 === 0
                      ? SCENE_CONFIG.colors.pineGreen
                      : SCENE_CONFIG.colors.stoneGray
                  }
                  roughness={0.4}
                />
              </mesh>
            </group>
          ))}
          {/* Laser connection ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.6, 0.015, 8, 32]} />
            <meshBasicMaterial
              color={SCENE_CONFIG.colors.stoneGray}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
