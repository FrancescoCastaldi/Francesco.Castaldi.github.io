"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { useConstellationStore } from "@/store/constellation-store";
import type { PositionedNode } from "@/data/types";

interface Node3DProps {
  node: PositionedNode;
  label: string;
  color: string;
  isDimmed: boolean;
  isFeatured?: boolean;
}

export default function Node3D({ node, label, color, isDimmed, isFeatured = false }: Node3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { hoverNode, selectNode, selectedNodeId } = useConstellationStore();
  const isSelected = selectedNodeId === node.id;
  const scale = isSelected ? 1.6 : hovered ? 1.3 : 1;
  const opacity = isDimmed && !isSelected && !hovered ? 0.15 : 1;

  useFrame((state) => {
    if (!meshRef.current) return;
    // Determine target scale
    let targetScale = scale;
    if (isFeatured && !isSelected && !hovered) {
      // Oscillate between 1.0 and 1.12 over ~3s sine wave
      targetScale = 1 + 0.12 * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * ((2 * Math.PI) / 3)));
    }
    // Smooth scale transition
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
    // Subtle floating animation (relative to group origin)
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + node.id.length) * 0.15;
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
    <group position={[node.position.x, node.position.y, node.position.z]}>
      {/* Node mesh */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {GeometryComponent}
        <MeshDistortMaterial
          color={color}
          emissive={color}
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
      <mesh position={[0, -0.1, 0]}>
        <ringGeometry args={[node.radius * 1.5, node.radius * 2.5, 32]} />
        <meshBasicMaterial
          color={color}
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

      {/* Floating HTML label */}
      <Html
        position={[0, -0.8, 0]}
        center
        distanceFactor={10}
        style={{
          pointerEvents: "none",
          transition: "opacity 0.3s, transform 0.3s ease",
          opacity: hovered || isSelected ? 1 : 0.35,
          transform: hovered || isSelected ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: hovered || isSelected ? "11px" : "10px",
            color: hovered || isSelected ? "#E7EDF5" : "#4B5768",
            background: hovered || isSelected ? "rgba(6,8,12,0.7)" : "transparent",
            backdropFilter: hovered || isSelected ? "blur(4px)" : "none",
            padding: hovered || isSelected ? "3px 10px" : "0",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            borderLeft: hovered || isSelected ? `3px solid ${color}` : "none",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            transition: "all 0.3s ease",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
