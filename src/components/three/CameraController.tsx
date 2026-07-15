"use client";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useConstellationStore } from "@/store/constellation-store";
import type { PositionedNode } from "@/data/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CameraControllerProps {
  nodes: PositionedNode[];
}

export default function CameraController({ nodes }: CameraControllerProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const { selectedNodeId, focused, autoRotate } = useConstellationStore();
  const reducedMotion = useReducedMotion();
  const targetPos = useRef(new THREE.Vector3(0, 0, 12));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (focused && selectedNodeId) {
      const node = nodes.find((n) => n.id === selectedNodeId);
      if (node) {
        lookAt.current.set(node.position.x, node.position.y, node.position.z);
        targetPos.current.set(
          node.position.x + 4,
          node.position.y + 2,
          node.position.z + 6
        );
      }
    } else {
      targetPos.current.set(0, 0, 12);
      lookAt.current.set(0, 0, 0);
    }
  }, [focused, selectedNodeId, nodes]);

  useFrame(() => {
    if (reducedMotion) return;
    camera.position.lerp(targetPos.current, 0.04);
    const look = lookAt.current;
    camera.lookAt(look.x, look.y, look.z);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoRotate && !reducedMotion}
      autoRotateSpeed={1}
      minDistance={8}
      maxDistance={15}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 3}
      target={[0, 0, 0]}
    />
  );
}
