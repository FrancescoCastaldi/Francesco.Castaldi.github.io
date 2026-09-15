"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "@/context/SceneContext";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

export default function NotFoundScene() {
  const groupRef = useRef<THREE.Group>(null);
  const box1Ref = useRef<THREE.Mesh>(null);
  const box2Ref = useRef<THREE.Mesh>(null);
  const particlesGroupRef = useRef<THREE.Group>(null);

  const { is404Realigning } = useScene();
  useResourceCleanup(groupRef);

  // Scattered fractured matrix particles vs aligned grid positions
  const particles = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2;
      const r = 1.2 + (i % 5) * 0.4;
      // Scattered coordinates
      const sx = Math.cos(angle) * r + ((i % 3) - 1) * 0.2;
      const sy = ((i % 7) - 3) * 0.4;
      const sz = Math.sin(angle) * r;

      // Aligned cubic lattice coordinates
      const layer = Math.floor(i / 16); // 3 layers of 16
      const col = i % 4;
      const row = Math.floor((i % 16) / 4);
      const ax = (col - 1.5) * 0.55;
      const ay = (layer - 1) * 0.55;
      const az = (row - 1.5) * 0.55;

      return {
        scattered: new THREE.Vector3(sx, sy, sz),
        aligned: new THREE.Vector3(ax, ay, az),
        current: new THREE.Vector3(sx, sy, sz),
        size: 0.04 + (i % 4) * 0.02,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Slow ambient rotation when resting, stabilization when realigning
    if (!is404Realigning) {
      groupRef.current.rotation.y += delta * 0.06;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.0007) * 0.05;
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 4, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, 0, 4, delta);
    }

    // Interpolate wireframe boxes: aligned when hovering Return button
    if (box1Ref.current) {
      const targetRotX = is404Realigning ? 0 : 0.4;
      const targetRotY = is404Realigning ? 0 : 0.2;
      box1Ref.current.rotation.x = THREE.MathUtils.damp(box1Ref.current.rotation.x, targetRotX, 4, delta);
      box1Ref.current.rotation.y = THREE.MathUtils.damp(box1Ref.current.rotation.y, targetRotY, 4, delta);
    }

    if (box2Ref.current) {
      const targetRotX = is404Realigning ? 0 : -0.3;
      const targetRotY = is404Realigning ? 0 : 0.5;
      box2Ref.current.rotation.x = THREE.MathUtils.damp(box2Ref.current.rotation.x, targetRotX, 4, delta);
      box2Ref.current.rotation.y = THREE.MathUtils.damp(box2Ref.current.rotation.y, targetRotY, 4, delta);
    }

    // Interpolate particle positions between scattered shards and aligned cubic crystal
    if (particlesGroupRef.current) {
      const children = particlesGroupRef.current.children;
      particles.forEach((p, idx) => {
        const mesh = children[idx] as THREE.Mesh;
        if (!mesh) return;
        const target = is404Realigning ? p.aligned : p.scattered;
        p.current.lerp(target, THREE.MathUtils.clamp(delta * 5, 0, 1));
        mesh.position.copy(p.current);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Outer framing wireframe cube */}
      <mesh ref={box1Ref} rotation={[0.4, 0.2, 0]}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial
          color={is404Realigning ? SCENE_CONFIG.colors.pineGreen : SCENE_CONFIG.colors.stoneGray}
          wireframe
          transparent
          opacity={is404Realigning ? 0.35 : 0.18}
        />
      </mesh>

      {/* Inner nested wireframe cube */}
      <mesh ref={box2Ref} rotation={[-0.3, 0.5, 0.2]}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color={is404Realigning ? SCENE_CONFIG.colors.burntOrange : SCENE_CONFIG.colors.pineGreen}
          wireframe
          transparent
          opacity={is404Realigning ? 0.45 : 0.25}
        />
      </mesh>

      {/* Fractured particles that re-crystallize into alignment on hover */}
      <group ref={particlesGroupRef}>
        {particles.map((p, idx) => (
          <mesh key={idx} position={[p.scattered.x, p.scattered.y, p.scattered.z]}>
            <boxGeometry args={[p.size, p.size, p.size]} />
            <meshStandardMaterial
              color={
                is404Realigning
                  ? idx % 2 === 0
                    ? SCENE_CONFIG.colors.burntOrange
                    : SCENE_CONFIG.colors.pineGreen
                  : idx % 6 === 0
                  ? SCENE_CONFIG.colors.burntOrange
                  : idx % 2 === 0
                  ? SCENE_CONFIG.colors.pineGreen
                  : SCENE_CONFIG.colors.anthracite
              }
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
