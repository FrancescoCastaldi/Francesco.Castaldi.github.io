"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

interface HeroSculptureProps {
  isPaused?: boolean;
}

export default function HeroSculpture({ isPaused = false }: HeroSculptureProps) {
  const groupRef = useRef<THREE.Group>(null);
  useResourceCleanup(groupRef);
  const count = SCENE_CONFIG.lamellae.count;

  // Profilo sinusoidale/asincrono ispirato alle sezioni CAD di bielle
  const lamellaeData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i / (count - 1)) * 2 - 1; // da -1 a 1
      const x = (i - count / 2) * SCENE_CONFIG.lamellae.spacing;
      // Profilo con collo ristretto e teste svasate tipo biella
      const radiusX = 0.5 + 0.35 * Math.cos(t * Math.PI * 1.5) + 0.25 * Math.abs(t);
      const radiusY = 1.1 + 0.5 * Math.sin(t * Math.PI + Math.PI / 2);
      const angleOffset = Math.sin(t * Math.PI * 2) * 0.15;
      return { x, radiusX, radiusY, angleOffset };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!isPaused) {
      // Rotazione ultra-lenta e controllata
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(groupRef.current.rotation.y * 0.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      {lamellaeData.map((data, index) => (
        <mesh
          key={index}
          position={[data.x, 0, 0]}
          rotation={[data.angleOffset, 0, 0]}
        >
          <boxGeometry
            args={[
              SCENE_CONFIG.lamellae.depth,
              data.radiusY * 2.2,
              data.radiusX * 1.8,
            ]}
          />
          <meshStandardMaterial
            color={
              index % 6 === 0
                ? SCENE_CONFIG.colors.pineGreen
                : SCENE_CONFIG.colors.anthracite
            }
            roughness={0.72}
            metalness={0.18}
          />
        </mesh>
      ))}

      {/* Riferimento asse centrale sottile in arancione bruciato (accento minimo) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, count * SCENE_CONFIG.lamellae.spacing * 1.2, 16]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.burntOrange}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}
