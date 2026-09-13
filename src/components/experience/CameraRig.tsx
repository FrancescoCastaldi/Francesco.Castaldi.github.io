"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";

interface CameraRigProps {
  currentSection: string;
}

export default function CameraRig({ currentSection }: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...SCENE_CONFIG.camera.defaultPosition));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const sec =
      SCENE_CONFIG.sections.find((s) => s.id === currentSection) ||
      SCENE_CONFIG.sections[0];

    targetPos.current.set(0, sec.cameraY, sec.cameraZ);
    lookTarget.current.set(0, sec.targetY, 0);

    camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(delta * 2.5, 0, 1));
    camera.lookAt(lookTarget.current);
  });

  return null;
}