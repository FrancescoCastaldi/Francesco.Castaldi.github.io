"use client";
import { useEffect, useRef } from "react";
import { useConstellationStore } from "@/store/constellation-store";

export default function HeroOverlay() {
  const { selectedNodeId } = useConstellationStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (microRef.current) {
        microRef.current.style.opacity = "0";
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const isDimmed = selectedNodeId !== null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        opacity: isDimmed ? 0.15 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "5%",
          bottom: "15%",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: 32,
            height: 3,
            background: "#F59E0B",
            borderRadius: 2,
            marginBottom: 16,
            animation: "fadeSlideUp 0.6s ease forwards",
            opacity: 0,
          }}
        />

        {/* Name */}
        <h1
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: "clamp(32px, 6vw, 56px)",
            color: "#E7EDF5",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: 0,
            animation: "fadeSlideUp 0.6s ease 0.15s forwards",
            opacity: 0,
          }}
        >
          Francesco Castaldi
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#22D3EE",
            margin: "8px 0 4px 0",
            animation: "fadeSlideUp 0.6s ease 0.3s forwards",
            opacity: 0,
          }}
        >
          Computer Engineer & Business Consultant
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#4B5768",
            margin: 0,
            animation: "fadeSlideUp 0.6s ease 0.45s forwards",
            opacity: 0,
          }}
        >
          Healthcare IT, Data Science, and Business Intelligence
        </p>

        {/* Micro-copy hint */}
        <span
          ref={microRef}
          style={{
            display: "block",
            marginTop: 16,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            color: "#4B5768",
            transition: "opacity 1s ease",
            animation: "fadeSlideUp 0.6s ease 0.6s forwards",
            opacity: 0,
          }}
        >
          ⟐  Click any node to explore  ⟐
        </span>
      </div>
    </div>
  );
}
