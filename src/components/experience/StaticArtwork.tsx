import React from "react";

export default function StaticArtwork() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.85,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 260,
          height: 380,
          border: "1px solid rgba(201, 197, 188, 0.2)",
          borderRadius: 8,
          background: "linear-gradient(180deg, rgba(31, 51, 41, 0.3) 0%, rgba(42, 45, 43, 0.2) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#C9C5BC", fontFamily: "var(--font-mono)" }}>
            FC-CAD // 01
          </span>
          <span style={{ fontSize: 11, color: "#C1622D", fontFamily: "var(--font-mono)" }}>
            SECTION
          </span>
        </div>

        {/* Lamelle grafiche CSS pure */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: 180 }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const h = 40 + Math.sin((i / 15) * Math.PI) * 110;
            return (
              <div
                key={i}
                style={{
                  width: 4,
                  height: h + "px",
                  background: i % 4 === 0 ? "#1F3329" : "#C9C5BC",
                  opacity: i % 4 === 0 ? 0.9 : 0.4,
                  borderRadius: 1,
                }}
              />
            );
          })}
        </div>

        <div style={{ fontSize: 11, color: "#C9C5BC", textAlign: "center", letterSpacing: "0.08em" }}>
          LAMELLAR KINEMATICS
        </div>
      </div>
    </div>
  );
}