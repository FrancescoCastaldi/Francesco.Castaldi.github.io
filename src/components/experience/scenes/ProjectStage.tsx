"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

interface ProjectStageProps {
  activeIndex: number;
  totalProjects?: number;
}

export default function ProjectStage({ activeIndex }: ProjectStageProps) {
  const groupRef = useRef<THREE.Group>(null);
  useResourceCleanup(groupRef);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetX = -activeIndex * 0.4;
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.6, -1.5]}>
      {/* Vetrina centrale con basamento architettonico */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.4, 0.12, 2.2]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.anthracite}
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      {/* Cornici lamellari retrostanti per le card proiettate */}
      {Array.from({ length: 5 }).map((_, i) => {
        const offset = (i - 2) * 1.5;
        const isCenter = i === 2;
        return (
          <mesh
            key={i}
            position={[offset, 1.2, isCenter ? 0 : -0.4]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[1.2, 1.8, 0.04]} />
            <meshStandardMaterial
              color={
                isCenter
                  ? SCENE_CONFIG.colors.pineGreen
                  : SCENE_CONFIG.colors.charcoal
              }
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}