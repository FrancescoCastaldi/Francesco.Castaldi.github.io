"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { useConstellationStore } from "@/store/constellation-store";
import type { PositionedNode } from "@/data/types";

interface Node3DProps {
  node: PositionedNode;
  isDimmed: boolean;
}

export default function Node3D({ node, isDimmed }: Node3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { hoverNode, selectNode, selectedNodeId } = useConstellationStore();
  const isSelected = selectedNodeId === node.id;
  const scale = isSelected ? 1.6 : hovered ? 1.3 : 1;
  const opacity = isDimmed && !isSelected && !hovered ? 0.15 : 1;

  useFrame((state) => {
    if (!meshRef.current) return;
    // Smooth scale transition
    meshRef.current.scale.lerp(
      new THREE.Vector3(scale, scale, scale),
      0.08
    );
    // Subtle floating animation
    meshRef.current.position.y =
      node.position.y + Math.sin(state.clock.elapsedTime * 0.5 + node.id.length) * 0.15;
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    selectNode(node.id);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    hoverNode(node.id);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    hoverNode(null);
    document.body.style.cursor = "default";
  };

  // Different geometry based on node type
  const geometry = node.type === "project" ? "octahedron" : "tetrahedron";
  const GeometryComponent =
    geometry === "octahedron" ? <octahedronGeometry args={[node.radius, 0]} /> : <tetrahedronGeometry args={[node.radius, 0]} />;

  return (
    <group>
      {/* Node mesh */}
      <mesh
        ref={meshRef}
        position={[node.position.x, node.position.y, node.position.z]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {GeometryComponent}
        <MeshDistortMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered || isSelected ? 1.0 : 0.3}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.1}
          distort={hovered ? 0.15 : 0.05}
          speed={2}
        />
      </mesh>

      {/* Glow ring */}
      <mesh position={[node.position.x, node.position.y - 0.1, node.position.z]}>
        <ringGeometry args={[node.radius * 1.5, node.radius * 2.5, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={
            hovered || isSelected
              ? (isSelected ? 0.4 : 0.25)
              : 0.08
          }
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Label - show on hover or always for selected */}
      {(hovered || isSelected) && (
        <Text
          position={[node.position.x, node.position.y + node.radius + 0.6, node.position.z]}
          fontSize={0.35}
          color="#E7EDF5"
          anchorX="center"
          anchorY="bottom"
          font="/fonts/Inter-Regular.ttf"
        >
          {node.label}
        </Text>
      )}
    </group>
  );
}
