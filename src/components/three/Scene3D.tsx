"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const Constellation = dynamic(() => import("./Constellation"), { ssr: false });

function SceneFallback() {
  return (
    <div className="fixed inset-0 -z-10" style={{ background: "#06080C" }} />
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ background: "#06080C" }}
      >
        <Suspense fallback={null}>
          <Constellation />
        </Suspense>
      </Canvas>
    </div>
  );
}
