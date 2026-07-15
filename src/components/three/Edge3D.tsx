"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useConstellationStore } from "@/store/constellation-store";
import type { PositionedNode, ConstellationEdge } from "@/data/types";

interface Edge3DProps {
  edge: ConstellationEdge;
  nodes: PositionedNode[];
}

export default function Edge3D({ edge, nodes }: Edge3DProps) {
  const { hoveredNodeId, selectedNodeId } = useConstellationStore();
  const flowRef = useRef<THREE.Mesh>(null);

  const sourceNode = nodes.find((n) => n.id === edge.source);
  const targetNode = nodes.find((n) => n.id === edge.target);

  const isActive =
    hoveredNodeId === edge.source ||
    hoveredNodeId === edge.target ||
    selectedNodeId === edge.source ||
    selectedNodeId === edge.target;

  const points = useMemo(() => {
    if (!sourceNode || !targetNode) return null;
    const p1 = new THREE.Vector3(
      sourceNode.position.x,
      sourceNode.position.y,
      sourceNode.position.z
    );
    const p2 = new THREE.Vector3(
      targetNode.position.x,
      targetNode.position.y,
      targetNode.position.z
    );
    return [p1, p2];
  }, [sourceNode, targetNode]);

  const edgePositions = useMemo(() => {
    if (!points) return null;
    return new Float32Array([
      points[0].x, points[0].y, points[0].z,
      points[1].x, points[1].y, points[1].z,
    ]);
  }, [points]);

  useFrame((state) => {
    if (!flowRef.current || !isActive || !points) return;
    const t = (state.clock.elapsedTime * 0.5) % 1;
    flowRef.current.position.lerpVectors(points[0], points[1], t);
  });

  if (!points || !edgePositions) return null;

  return (
    <group>
      {/* Glow line behind active edge */}
      {isActive && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[edgePositions, 3]}
              count={2}
              array={edgePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#22D3EE"
            transparent
            opacity={0.15}
          />
        </line>
      )}

      {/* Main edge line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
            count={2}
            array={edgePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={isActive ? "#22D3EE" : "#2E3847"}
          transparent
          opacity={isActive ? 0.6 : 0.15}
        />
      </line>

      {/* Flowing energy dot along active edge */}
      {isActive && (
        <mesh ref={flowRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
