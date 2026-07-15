import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from "d3-force";
import type {
  ProjectNode,
  SkillNode,
  ConstellationEdge,
  PositionedNode,
} from "@/data/types";

export function computeLayout(
  projects: ProjectNode[],
  skills: SkillNode[],
  edges: ConstellationEdge[]
): { nodes: PositionedNode[]; edges: ConstellationEdge[] } {
  const skillNodes: PositionedNode[] = skills.map((s) => ({
    id: s.id,
    position: { x: 0, y: 0, z: 0 },
    label: s.label,
    color: s.color,
    radius: 1.3,
    type: "skill" as const,
    data: s,
  }));

  const projectNodes: PositionedNode[] = projects.map((p) => ({
    id: p.id,
    position: { x: 0, y: 0, z: 0 },
    label: p.label,
    color: "#F59E0B",
    radius: 1.1,
    type: "project" as const,
    data: p,
  }));

  const allNodes = [...skillNodes, ...projectNodes];

  // 3D force simulation
  const sim = forceSimulation(allNodes as any)
    .force(
      "link",
      forceLink(edges as any)
        .id((d: any) => d.id)
        .distance(50)
        .strength(0.3)
    )
    .force("charge", forceManyBody().strength(-120))
    .force("center", forceCenter(0, 0))
    .force("collide", forceCollide(10))
    .stop();

  for (let i = 0; i < 300; i++) sim.tick();

  // Extract positions (d3-force is 2D, so spread z randomly)
  allNodes.forEach((n, i) => {
    const node = n as any;
    n.position = {
      x: node.x || 0,
      y: node.y || 0,
      z: (i % 3 - 1) * 2 + (Math.random() - 0.5) * 1.5,
    };
  });

  return { nodes: allNodes, edges };
}

export function getNodeColor(type?: string, area?: string): string {
  const palette: Record<string, string> = {
    healthcare: "#F59E0B",
    "data-science": "#22D3EE",
    cloud: "#A78BFA",
    ai: "#FB7185",
    security: "#34D399",
    cycling: "#34D399",
    consulting: "#E2E8F0",
    blockchain: "#A78BFA",
    "web-dev": "#22D3EE",
    project: "#F59E0B",
  };
  if (area && palette[area]) return palette[area];
  return palette.project;
}
