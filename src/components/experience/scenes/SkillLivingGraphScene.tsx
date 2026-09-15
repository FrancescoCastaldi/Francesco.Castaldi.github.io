"use client";
import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";
import { useResourceCleanup } from "@/components/experience/ResourceCleaner";

interface SkillLivingGraphSceneProps {
  skillId: string;
}

export default function SkillLivingGraphScene({ skillId }: SkillLivingGraphSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const selectedSkill = skills.find((s) => s.id === skillId);

  useResourceCleanup(groupRef);

  const graph = useMemo(() => {
    if (!selectedSkill) return null;

    // 1. Projects directly related (Inner Orbit, radius ~ 1.6)
    const relatedProjectObjects = projects.filter(
      (p) =>
        selectedSkill.relatedProjects.includes(p.id) ||
        selectedSkill.relatedProjects.includes(p.slug)
    );
    const innerRingRadius = 1.6;
    const innerNodes = relatedProjectObjects.map((p, idx) => {
      const angle = (idx / Math.max(relatedProjectObjects.length, 1)) * Math.PI * 2;
      return {
        id: p.id,
        title: p.label || p.title,
        x: Math.cos(angle) * innerRingRadius,
        y: Math.sin(angle) * (innerRingRadius * 0.6),
        z: Math.sin(angle * 2) * 0.3,
        pillar: p.pillar,
      };
    });

    // 2. Co-occurring skills (Outer Orbit, radius ~ 2.6)
    const otherSkills = skills.filter((s) => s.id !== skillId);
    const outerRingRadius = 2.6;
    const outerNodes = otherSkills.map((s, idx) => {
      const angle = (idx / Math.max(otherSkills.length, 1)) * Math.PI * 2 + 0.3;
      return {
        id: s.id,
        name: s.name,
        x: Math.cos(angle) * outerRingRadius,
        y: Math.sin(angle) * (outerRingRadius * 0.55),
        z: Math.cos(angle * 2) * 0.4,
      };
    });

    // Connect central node to inner nodes
    const innerPoints: THREE.Vector3[] = [];
    innerNodes.forEach((node) => {
      innerPoints.push(new THREE.Vector3(0, 0, 0));
      innerPoints.push(new THREE.Vector3(node.x, node.y, node.z));
    });

    // Connect inner nodes to outer nodes if related
    const outerPoints: THREE.Vector3[] = [];
    innerNodes.forEach((iNode) => {
      outerNodes.slice(0, 3).forEach((oNode) => {
        outerPoints.push(new THREE.Vector3(iNode.x, iNode.y, iNode.z));
        outerPoints.push(new THREE.Vector3(oNode.x, oNode.y, oNode.z));
      });
    });

    const innerGeo = new THREE.BufferGeometry().setFromPoints(innerPoints);
    const outerGeo = new THREE.BufferGeometry().setFromPoints(outerPoints);

    return { innerNodes, outerNodes, innerGeo, outerGeo };
  }, [selectedSkill, skillId]);

  // Clean up imperative BufferGeometries on dependency change or unmount
  useEffect(() => {
    return () => {
      if (graph) {
        graph.innerGeo.dispose();
        graph.outerGeo.dispose();
      }
    };
  }, [graph]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0006) * 0.04;
  });

  if (!graph) return null;

  return (
    <group ref={groupRef} position={[1.5, 0, -1]}>
      {/* Central Skill Luminary */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={SCENE_CONFIG.colors.burntOrange}
          emissive={new THREE.Color(SCENE_CONFIG.colors.burntOrange)}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Orbit Connection Rays */}
      <lineSegments geometry={graph.innerGeo}>
        <lineBasicMaterial
          color={SCENE_CONFIG.colors.stoneGray}
          transparent
          opacity={0.4}
        />
      </lineSegments>

      {/* Outer Orbit Connection Rays */}
      <lineSegments geometry={graph.outerGeo}>
        <lineBasicMaterial
          color={SCENE_CONFIG.colors.stoneGray}
          transparent
          opacity={0.15}
        />
      </lineSegments>

      {/* Inner Nodes: Associated Projects */}
      {graph.innerNodes.map((node) => (
        <mesh key={node.id} position={[node.x, node.y, node.z]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color={SCENE_CONFIG.colors.pineGreen}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Outer Nodes: Associated Skills */}
      {graph.outerNodes.map((node) => (
        <mesh key={node.id} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color={SCENE_CONFIG.colors.anthracite}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Orbital Guides */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.58, 1.62, 48]} />
        <meshBasicMaterial
          color={SCENE_CONFIG.colors.stoneGray}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.58, 2.62, 48]} />
        <meshBasicMaterial
          color={SCENE_CONFIG.colors.stoneGray}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
