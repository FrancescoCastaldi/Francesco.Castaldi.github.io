"use client";
import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getDerivedConstellationGraph } from "@/lib/portfolio/derive";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

interface SkillsConstellationProps {
  hoveredSkillId?: string | null;
}

export default function SkillsConstellation({ hoveredSkillId }: SkillsConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  useResourceCleanup(groupRef);

  const graph = useMemo(() => getDerivedConstellationGraph(), []);

  // Creazione linee per gli archi reali
  const lineSegments = useMemo(() => {
    const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
    const points: THREE.Vector3[] = [];

    graph.edges.forEach((edge) => {
      const source = nodeMap.get(edge.sourceSkillId);
      const target = nodeMap.get(edge.targetSkillId);
      if (source && target) {
        points.push(new THREE.Vector3(source.x, source.y, source.z));
        points.push(new THREE.Vector3(target.x, target.y, target.z));
      }
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [graph]);

  useEffect(() => {
    return () => {
      lineSegments.dispose();
    };
  }, [lineSegments]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Rotazione molto pacata per dare respiro alla costellazione
    groupRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, -1]}>
      {/* Archi tra competenze con progetti condivisi */}
      <lineSegments geometry={lineSegments}>
        <lineBasicMaterial
          color={SCENE_CONFIG.colors.stoneGray}
          transparent
          opacity={0.25}
        />
      </lineSegments>

      {/* Nodi della costellazione */}
      {graph.nodes.map((node) => {
        const isHovered = hoveredSkillId === node.id;
        const scale = isHovered ? 1.4 : 1.0;
        return (
          <mesh
            key={node.id}
            position={[node.x, node.y, node.z]}
            scale={[scale, scale, scale]}
          >
            <sphereGeometry args={[0.08 + node.projectCount * 0.015, 16, 16]} />
            <meshStandardMaterial
              color={
                isHovered
                  ? SCENE_CONFIG.colors.burntOrange
                  : node.projectCount >= 4
                  ? SCENE_CONFIG.colors.pineGreen
                  : SCENE_CONFIG.colors.anthracite
              }
              emissive={
                isHovered
                  ? new THREE.Color(SCENE_CONFIG.colors.burntOrange)
                  : new THREE.Color("#000000")
              }
              emissiveIntensity={isHovered ? 0.6 : 0}
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
