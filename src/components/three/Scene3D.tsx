"use client";
import { Suspense, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const handleCreated = useCallback(() => {
    setIsCanvasReady(true);
  }, []);

  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ cursor: "crosshair" }}>
      {isLoading && <LoadingScreen onLoaded={handleLoaded} />}

      <Canvas
        camera={{ position: [0, 1, 14], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ background: "#06080C" }}
        onCreated={handleCreated}
      >
        <Suspense fallback={null}>
          <Constellation />
        </Suspense>
      </Canvas>
    </div>
  );
}
