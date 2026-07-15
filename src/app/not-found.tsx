import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(6, 8, 12, 0.92)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 80,
            fontFamily: "JetBrains Mono, monospace",
            color: "#F59E0B",
            marginBottom: 16,
            textShadow: "0 0 30px rgba(245, 158, 11, 0.3)",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: 24,
            color: "#E7EDF5",
            marginBottom: 12,
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            color: "#9BA9BB",
            fontSize: 14,
            fontFamily: "Inter, sans-serif",
            marginBottom: 24,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#F59E0B",
            fontSize: 13,
            fontFamily: "Inter, sans-serif",
            textDecoration: "none",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            padding: "10px 20px",
            borderRadius: 6,
            transition: "background 0.2s",
          }}
        >
          Back to home →
        </Link>
      </div>
    </div>
  );
}
