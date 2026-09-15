"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

export default function ContactRoomScene() {
  const groupRef = useRef<THREE.Group>(null);
  useResourceCleanup(groupRef);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Micro-drift reattivo al puntatore
    const mouseX = state.pointer.x * 0.3;
    const mouseY = state.pointer.y * 0.2;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      mouseX,
      2,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -mouseY,
      2,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[1.2, 0, -1]}>
      {/* Monolithic minimalist frame columns */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[0.2, 3.2, 0.4]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.anthracite}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.2, 3.2, 0.4]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.anthracite}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Floating horizontal precision bar */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.6, 0.04, 0.2]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.pineGreen}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* Burnt Orange focal marker */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.burntOrange}
          emissive={new THREE.Color(SCENE_CONFIG.colors.burntOrange)}
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
