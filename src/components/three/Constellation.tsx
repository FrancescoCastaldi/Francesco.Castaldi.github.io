"use client";
import { useRef, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { useConstellationStore } from "@/store/constellation-store";
import { computeLayout } from "@/lib/nodes";
import type { ConstellationEdge } from "@/data/types";

const Node3D = dynamic(() => import("./Node3D"), { ssr: false });
const Edge3D = dynamic(() => import("./Edge3D"), { ssr: false });
const Starfield = dynamic(() => import("./Starfield"), { ssr: false });
const CameraController = dynamic(() => import("./CameraController"), { ssr: false });

// Build edges linking projects to skills
function buildEdges(): ConstellationEdge[] {
  const edges: ConstellationEdge[] = [];
  const linked = new Set<string>();

  projects.forEach((p) => {
    p.skills.forEach((skillId) => {
      const edgeId = `${p.id}-${skillId}`;
      if (!linked.has(edgeId)) {
        linked.add(edgeId);
        edges.push({ source: p.id, target: skillId, strength: 0.5 });
      }
    });
  });

  return edges;
}

export default function Constellation() {
  const { selectedNodeId } = useConstellationStore();
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const layout = useMemo(() => {
    const edges = buildEdges();
    return computeLayout(projects, skills, edges);
  }, []);

  useEffect(() => {
    gl.setClearColor("#06080C");
  }, [gl]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Lookup map for node labels
  const nodeLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((p) => {
      const title = p.title.length > 20 ? p.title.slice(0, 17) + "..." : p.title;
      map.set(p.id, title);
    });
    skills.forEach((s) => {
      map.set(s.id, s.name);
    });
    return map;
  }, []);

  // Find the node with the most edge connections (featured)
  const featuredNodeId = useMemo(() => {
    const counts = new Map<string, number>();
    layout.edges.forEach((edge) => {
      counts.set(edge.source, (counts.get(edge.source) || 0) + 1);
      counts.set(edge.target, (counts.get(edge.target) || 0) + 1);
    });
    let maxCount = 0;
    let featured = "";
    counts.forEach((count, id) => {
      if (count > maxCount) {
        maxCount = count;
        featured = id;
      }
    });
    return featured;
  }, [layout.edges]);

  return (
    <>
      <Starfield />
      <CameraController nodes={layout.nodes} />

      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#F59E0B" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#22D3EE" />

      <group ref={groupRef}>
        {/* Edges */}
        {layout.edges.map((edge, i) => (
          <Edge3D key={`edge-${i}`} edge={edge} nodes={layout.nodes} />
        ))}

        {/* Nodes */}
        {layout.nodes.map((node) => (
          <Node3D
            key={node.id}
            node={node}
            label={nodeLabelMap.get(node.id) || node.id}
            color={node.color}
            isFeatured={node.id === featuredNodeId}
            isDimmed={
              selectedNodeId !== null &&
              selectedNodeId !== node.id &&
              node.id !== featuredNodeId && // featured never dims fully
              !layout.edges.some(
                (e) =>
                  (e.source === selectedNodeId && e.target === node.id) ||
                  (e.target === selectedNodeId && e.source === node.id)
              )
            }
          />
        ))}
      </group>
    </>
  );
}
