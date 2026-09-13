import * as THREE from "three";
import { SCENE_CONFIG } from "@/lib/portfolio/scene-config";

export function createPineLamellaMaterial() {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(SCENE_CONFIG.colors.pineGreen),
    roughness: 0.72,
    metalness: 0.15,
    flatShading: false,
  });
}

export function createAnthracitePedestalMaterial() {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(SCENE_CONFIG.colors.anthracite),
    roughness: 0.85,
    metalness: 0.05,
  });
}

export function createBurntOrangeAccentMaterial() {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(SCENE_CONFIG.colors.burntOrange),
    roughness: 0.45,
    metalness: 0.3,
  });
}

export function createStoneGrayWireMaterial() {
  return new THREE.LineBasicMaterial({
    color: new THREE.Color(SCENE_CONFIG.colors.stoneGray),
    transparent: true,
    opacity: 0.35,
  });
}
