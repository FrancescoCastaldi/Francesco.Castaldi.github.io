import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/HeritageIcon";

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
        background: "#121110",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 520,
          background: "#15261E",
          border: "1px solid rgba(197, 160, 89, 0.25)",
          borderRadius: 8,
          padding: "48px 36px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            color: "#C5A059",
            marginBottom: 12,
            letterSpacing: "0.04em",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 26,
            fontWeight: 600,
            color: "#FAF6EE",
            marginBottom: 12,
            letterSpacing: "0.02em",
          }}
        >
          Archival Folio Not Found
        </h1>
        <p
          style={{
            color: "#E8E3D6",
            fontSize: 15,
            fontFamily: "var(--font-body)",
            lineHeight: 1.7,
            marginBottom: 32,
            opacity: 0.85,
          }}
        >
          The requested monograph, treatise, or repository index does not reside in the permanent archives.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "#FAF6EE",
            background: "rgba(197, 160, 89, 0.12)",
            fontSize: 14,
            fontFamily: "var(--font-serif)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(197, 160, 89, 0.4)",
            padding: "12px 24px",
            borderRadius: 4,
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <ArrowLeftIcon size={16} color="#C5A059" />
          <span>Return to Archival Monograph</span>
        </Link>
      </div>
    </div>
  );
}
