import NotFoundRealignLink from "@/components/ui/NotFoundRealignLink";

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
        background: "rgba(14, 16, 15, 0.85)", /* Canvas Charcoal #0E100F */
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 520,
          background: "#2A2D2B",
          border: "1px solid rgba(201, 197, 188, 0.2)",
          borderRadius: 6,
          padding: "48px 36px",
          boxShadow: "0 20px 40px rgba(14, 16, 15, 0.6)",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "#C1622D",
            marginBottom: 12,
            letterSpacing: "0.02em",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 400,
            color: "#EDE8DE",
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}
        >
          Archival Folio Not Found
        </h1>
        <p
          style={{
            color: "#C9C5BC",
            fontSize: 15,
            fontFamily: "var(--font-body)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          The requested monograph, treatise, or repository index does not reside in the permanent archives.
        </p>
        <NotFoundRealignLink href="/" />
      </div>
    </div>
  );
}