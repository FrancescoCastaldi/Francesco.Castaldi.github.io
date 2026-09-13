"use client";
import React from "react";
import Link from "next/link";
import { PORTFOLIO_HERO_COPY } from "@/data/portfolio";
import StaticArtwork from "@/components/experience/StaticArtwork";

interface HeroSectionProps {
  onHoverStateChange?: (hovered: boolean) => void;
  canRender3D?: boolean;
}

export default function HeroSection({
  onHoverStateChange,
  canRender3D = true,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 5% 60px",
        borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Left Column: Typography & Intent */}
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "#2A2D2B",
              border: "1px solid rgba(201, 197, 188, 0.2)",
              borderRadius: 3,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C1622D",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#EDE8DE",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {PORTFOLIO_HERO_COPY.eyebrow}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5.2vw, 68px)",
              fontWeight: 400,
              color: "#EDE8DE",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {PORTFOLIO_HERO_COPY.headline}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.2vw, 19px)",
              color: "#C9C5BC",
              lineHeight: 1.65,
              marginBottom: 16,
              maxWidth: 560,
            }}
          >
            {PORTFOLIO_HERO_COPY.subheadline}
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#C9C5BC",
              opacity: 0.85,
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 520,
            }}
          >
            {PORTFOLIO_HERO_COPY.lead}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href={PORTFOLIO_HERO_COPY.primaryCta.href}
              style={{
                display: "inline-block",
                background: "#C1622D",
                color: "#EDE8DE",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "12px 24px",
                borderRadius: 3,
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {PORTFOLIO_HERO_COPY.primaryCta.label}
            </Link>

            <Link
              href={PORTFOLIO_HERO_COPY.secondaryCta.href}
              style={{
                display: "inline-block",
                background: "transparent",
                color: "#EDE8DE",
                border: "1px solid rgba(201, 197, 188, 0.3)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.06em",
                padding: "12px 24px",
                borderRadius: 3,
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(237, 232, 222, 0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(201, 197, 188, 0.3)")
              }
            >
              {PORTFOLIO_HERO_COPY.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Right Column: Interaction Zone for 3D Hero Sculpture or 2D Static Artwork */}
        <div
          style={{
            minHeight: 440,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: canRender3D ? "crosshair" : "default",
          }}
          onMouseEnter={() => onHoverStateChange?.(true)}
          onMouseLeave={() => onHoverStateChange?.(false)}
        >
          {!canRender3D && <StaticArtwork />}
          <noscript>
            <StaticArtwork />
          </noscript>
        </div>
      </div>
    </section>
  );
}