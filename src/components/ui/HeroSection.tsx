"use client";
import Link from "next/link";
import { useConstellationStore } from "@/store/constellation-store";

export default function HeroSection() {
  const { selectedNodeId } = useConstellationStore();
  const isDimmed = selectedNodeId !== null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        opacity: isDimmed ? 0.2 : 1,
        transition: "opacity 0.6s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 8%",
        background: "linear-gradient(180deg, rgba(6,8,12,0.3) 0%, transparent 40%, transparent 70%, rgba(6,8,12,0.4) 100%)",
      }}
    >
      {/* Name */}
      <h1
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: "clamp(42px, 7vw, 80px)",
          color: "#E7EDF5",
          fontWeight: 400,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          margin: 0,
          maxWidth: 800,
        }}
      >
        Francesco<br />
        <span style={{
          color: "#F59E0B",
          textDecoration: "underline",
          textDecorationColor: "rgba(245, 158, 11, 0.3)",
          textUnderlineOffset: "0.15em",
          textDecorationThickness: 2,
        }}>
          Castaldi
        </span>
      </h1>

      {/* Title */}
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          color: "#22D3EE",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: 20,
          marginBottom: 8,
        }}
      >
        Computer Engineer &amp; Business Consultant
      </p>

      {/* Tagline */}
      <p
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontStyle: "italic",
          fontSize: "clamp(15px, 2vw, 20px)",
          color: "#9BA9BB",
          margin: 0,
          maxWidth: 520,
          lineHeight: 1.4,
        }}
      >
        Building systems that make healthcare smarter, data clearer, and experiences better.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 28,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "7 Projects", icon: "○" },
          { label: "8 Skills", icon: "◇" },
          { label: "Healthcare IT", icon: "+" },
        ].map((stat) => (
          <span
            key={stat.label}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: "#9BA9BB",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: 20,
              padding: "5px 14px",
              letterSpacing: "0.04em",
            }}
          >
            {stat.icon} {stat.label}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginTop: 32,
          pointerEvents: "auto",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="#"
          onClick={() => useConstellationStore.getState().clearSelection()}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 13,
            fontWeight: 500,
            color: "#06080C",
            background: "#F59E0B",
            padding: "10px 24px",
            borderRadius: 8,
            textDecoration: "none",
            transition: "background 0.2s",
            border: "none",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#FBBF24"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#F59E0B"}
        >
          Explore Projects →
        </Link>
        <Link
          href="/blog"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 13,
            fontWeight: 500,
            color: "#22D3EE",
            background: "transparent",
            padding: "10px 24px",
            borderRadius: 8,
            textDecoration: "none",
            transition: "all 0.2s",
            border: "1px solid rgba(34, 211, 238, 0.3)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34, 211, 238, 0.1)"; e.currentTarget.style.borderColor = "#22D3EE"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.3)"; }}
        >
          Read Blog →
        </Link>
      </div>
    </div>
  );
}
