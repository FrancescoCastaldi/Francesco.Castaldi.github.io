"use client";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      // Wait for the 500ms fade-out transition, then fully remove
      setTimeout(() => {
        setHidden(true);
        onLoaded?.();
      }, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#06080C",
        opacity: fading ? 0 : 1,
        transition: "opacity 500ms ease",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: 28,
          color: "#E7EDF5",
          letterSpacing: "-0.03em",
          marginBottom: 24,
          animation: "loadingPulse 1.5s ease-in-out infinite",
        }}
      >
        Francesco <span style={{ color: "#F59E0B" }}>Castaldi</span>
      </div>

      {/* Loading text with animated dots */}
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: "#4B5768",
        }}
      >
        Loading constellation
        <span style={{ animation: "dotAppear 1.5s ease-in-out infinite", animationDelay: "0s" }}>.</span>
        <span style={{ animation: "dotAppear 1.5s ease-in-out infinite", animationDelay: "0.3s" }}>.</span>
        <span style={{ animation: "dotAppear 1.5s ease-in-out infinite", animationDelay: "0.6s" }}>.</span>
      </div>
    </div>
  );
}
