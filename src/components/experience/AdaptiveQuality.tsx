"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface AdaptiveQualityProps {
  onLowPerformance?: () => void;
}

/**
 * AdaptiveQuality: monitors Three.js frame rates and render calls.
 * Dynamically adjusts pixel ratio if sustained FPS drops below 45.
 */
export default function AdaptiveQuality({ onLowPerformance }: AdaptiveQualityProps) {
  const { gl } = useThree();
  const frameTimes = useRef<number[]>([]);
  const lastTime = useRef<number | null>(null);
  const hasAdapted = useRef(false);

  useFrame(() => {
    if (typeof performance === "undefined") return;

    const now = performance.now();
    if (lastTime.current === null) {
      lastTime.current = now;
      return;
    }

    const delta = now - lastTime.current;
    lastTime.current = now;

    // Filter out aberrant delta spikes caused by background tab switching
    if (delta > 0 && delta < 200) {
      frameTimes.current.push(delta);
      if (frameTimes.current.length > 60) {
        frameTimes.current.shift();
      }

      if (frameTimes.current.length >= 60 && !hasAdapted.current) {
        const avgDelta =
          frameTimes.current.reduce((sum, d) => sum + d, 0) / frameTimes.current.length;
        const fps = 1000 / avgDelta;

        if (fps < 45) {
          hasAdapted.current = true;
          const currentDpr = gl.getPixelRatio();
          if (currentDpr > 1.0) {
            gl.setPixelRatio(1.0);
          }
          onLowPerformance?.();
        }
      }
    }
  });

  return null;
}
