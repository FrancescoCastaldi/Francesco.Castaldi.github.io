"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { ProjectNode } from "@/data/types";

interface ProjectGalleryProps {
  projects: ProjectNode[];
  onActiveIndexChange?: (index: number) => void;
}

export default function ProjectGallery({
  projects,
  onActiveIndexChange,
}: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = projects.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev === 0 ? total - 1 : prev - 1;
      onActiveIndexChange?.(next);
      return next;
    });
  }, [total, onActiveIndexChange]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev === total - 1 ? 0 : prev + 1;
      onActiveIndexChange?.(next);
      return next;
    });
  }, [total, onActiveIndexChange]);

  // Gestione tastiera nativa (frecce sinistra/destra)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe handling senza cattura rotella
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const currentProject = projects[currentIndex];

  return (
    <section
      id="work"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "100px 5%",
        maxWidth: 1360,
        margin: "0 auto",
        borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 40,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "#C1622D",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              display: "block",
              marginBottom: 8,
            }}
          >
            02 // CURATED SHOWCASE (12 SELECTED MONOGRAPHS)
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 3.8vw, 48px)",
              fontWeight: 400,
              color: "#EDE8DE",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Selected Work
          </h2>
        </div>

        {/* Gallery Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "#C9C5BC",
            }}
          >
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              style={{
                background: "#2A2D2B",
                border: "1px solid rgba(201, 197, 188, 0.25)",
                color: "#EDE8DE",
                padding: "8px 16px",
                borderRadius: 3,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                transition: "border-color 0.2s ease",
              }}
            >
              ← Prev
            </button>
            <button
              onClick={handleNext}
              aria-label="Next project"
              style={{
                background: "#2A2D2B",
                border: "1px solid rgba(201, 197, 188, 0.25)",
                color: "#EDE8DE",
                padding: "8px 16px",
                borderRadius: 3,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                transition: "border-color 0.2s ease",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Prospective Central Stage Showcase */}
      {currentProject && (
        <div
          style={{
            background: "#2A2D2B",
            border: "1px solid rgba(201, 197, 188, 0.22)",
            borderRadius: 6,
            padding: "40px 48px",
            minHeight: 380,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 20px 40px rgba(14, 16, 15, 0.6)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "#C1622D",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  PILLAR {currentProject.pillarRoman} • {currentProject.pillar.toUpperCase()}
                </span>
                <span style={{ color: "#C9C5BC", opacity: 0.4 }}>•</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "#C9C5BC",
                  }}
                >
                  SLUG: {currentProject.slug}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#C9C5BC",
                  background: "#1F3329",
                  padding: "3px 10px",
                  borderRadius: 3,
                }}
              >
                {currentProject.track === "work" ? "INDUSTRY MONOGRAPH" : "LABORATORY"}
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3vw, 36px)",
                color: "#EDE8DE",
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              {currentProject.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "#C9C5BC",
                lineHeight: 1.7,
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              {currentProject.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "#EDE8DE",
                    background: "#0E100F",
                    border: "1px solid rgba(201, 197, 188, 0.15)",
                    padding: "4px 10px",
                    borderRadius: 2,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(201, 197, 188, 0.12)",
              paddingTop: 24,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <Link
              href={"/project/" + currentProject.slug}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#EDE8DE",
                background: "#1F3329",
                border: "1px solid rgba(201, 197, 188, 0.25)",
                padding: "10px 20px",
                borderRadius: 3,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "all 0.2s ease",
              }}
            >
              Read Full Monograph →
            </Link>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {currentProject.links.github && (
                <a
                  href={currentProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#C9C5BC",
                    textDecoration: "none",
                  }}
                >
                  GitHub Source ↗
                </a>
              )}
              {currentProject.links.demo && (
                <a
                  href={currentProject.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#C1622D",
                    textDecoration: "none",
                  }}
                >
                  Live Deployment ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
