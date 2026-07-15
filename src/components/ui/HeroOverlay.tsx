"use client";

export default function HeroOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        left: "5%",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <h1
        style={{
          fontFamily: "DM Serif Display, Georgia, serif",
          fontSize: "clamp(16px, 2.5vw, 24px)",
          color: "#E7EDF5",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: 0,
          opacity: 0.3,
        }}
      >
        Francesco Castaldi
      </h1>
    </div>
  );
}
