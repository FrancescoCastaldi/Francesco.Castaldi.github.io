"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { useConstellationStore } from "@/store/constellation-store";
import type { PositionedNode, ConstellationEdge } from "@/data/types";

interface Edge3DProps {
  edge: ConstellationEdge;
  nodes: PositionedNode[];
}

export default function Edge3D({ edge, nodes }: Edge3DProps) {
  const { hoveredNodeId, selectedNodeId } = useConstellationStore();
  
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

  if (!points) return null;

  const opacity = isActive ? 0.5 : 0.1;
  const lineWidth = isActive ? 2 : 0.5;

  return (
    <line>
      <bufferGeometry>
        {(() => {
          const edgePositions = new Float32Array([
            points[0].x, points[0].y, points[0].z,
            points[1].x, points[1].y, points[1].z,
          ]);
          return (
            <bufferAttribute
              attach="attributes-position"
              args={[edgePositions, 3]}
              count={2}
              array={edgePositions}
              itemSize={3}
            />
          );
        })()}
      </bufferGeometry>
      <lineBasicMaterial
        color="#22D3EE"
        transparent
        opacity={opacity}
        linewidth={lineWidth}
      />
    </line>
  );
}
