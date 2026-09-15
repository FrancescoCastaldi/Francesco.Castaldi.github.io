import { useEffect, type RefObject } from "react";
import * as THREE from "three";

/**
 * Safely disposes a Three.js material and any attached textures,
 * guarding against null properties that cause TypeError with the 'in' operator.
 */
function disposeMaterial(material: THREE.Material): void {
  if (!material) return;
  try {
    material.dispose();
  } catch {
    // Material dispose fallback
  }

  // Dispose texture maps if attached
  const matRecord = material as unknown as Record<string, unknown>;
  for (const key of Object.keys(matRecord)) {
    const prop = matRecord[key];
    if (
      prop !== null &&
      typeof prop === "object" &&
      "isTexture" in prop &&
      Boolean((prop as THREE.Texture).isTexture)
    ) {
      try {
        (prop as THREE.Texture).dispose();
      } catch {
        // Texture dispose fallback
      }
    }
  }
}

/**
 * Traverses an Object3D hierarchy and recursively disposes geometries,
 * materials, and textures for all meshes, lines, line segments, and points.
 */
export function cleanObject3D(object: THREE.Object3D | null | undefined): void {
  if (!object) return;

  object.traverse((child) => {
    const renderable = child as unknown as {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };

    if (renderable.geometry && typeof renderable.geometry.dispose === "function") {
      try {
        renderable.geometry.dispose();
      } catch {
        // Geometry dispose fallback
      }
    }

    if (renderable.material) {
      if (Array.isArray(renderable.material)) {
        renderable.material.forEach((mat) => disposeMaterial(mat));
      } else {
        disposeMaterial(renderable.material);
      }
    }
  });
}

/**
 * React hook that automatically cleans up all Three.js GPU resources
 * in a ref's Object3D subtree upon unmount.
 */
export function useResourceCleanup(ref: RefObject<THREE.Object3D | null>): void {
  useEffect(() => {
    const target = ref.current;
    return () => {
      if (target) {
        cleanObject3D(target);
      }
    };
  }, [ref]);
}
