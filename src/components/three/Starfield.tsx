"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Starfield() {
  const count = 300;
  const points = useRef<THREE.Points>(null);

  // Store base colors for twinkle reference
  const baseColors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // ~70% cool blue/teal, ~30% warm gold/orange for variety
      const isWarm = Math.random() > 0.7;
      const hue = isWarm ? 0.08 + Math.random() * 0.1 : 0.55 + Math.random() * 0.15;
      const brightness = 0.3 + Math.random() * 0.5;
      const saturation = isWarm ? 0.6 : 0.5;
      const c = new THREE.Color().setHSL(hue, saturation, brightness);
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, []);

  // Per-star twinkle parameters (stable across frames)
  const twinkleData = useMemo(() => {
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }
    return { phases, speeds };
  }, []);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.008;

      // Per-star twinkle: smoothly vary each star's brightness via color attribute
      const colorAttr = points.current.geometry.attributes.color;
      const colors = colorAttr.array as Float32Array;
      const { phases, speeds } = twinkleData;
      for (let i = 0; i < count; i++) {
        const twinkle =
          0.4 + 0.6 * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * speeds[i] + phases[i]));
        const i3 = i * 3;
        colors[i3] = baseColors[i3] * twinkle;
        colors[i3 + 1] = baseColors[i3 + 1] * twinkle;
        colors[i3 + 2] = baseColors[i3 + 2] * twinkle;
      }
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[baseColors, 3]}
          count={count}
          array={baseColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
