import "../blog/blog.css";

export default function ContactPage() {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 60,
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 5% 60px",
        background: "rgba(6, 8, 12, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <h1
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 400,
            color: "#E7EDF5",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Get in touch
        </h1>
        <p
          style={{
            color: "#9BA9BB",
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: "Inter, sans-serif",
            marginBottom: 32,
          }}
        >
          Feel free to reach out. I&apos;m based in Modena, Italy, and always
          happy to connect.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {[
            {
              label: "Email",
              value: "info@francescocastaldi.it",
              href: "mailto:info@francescocastaldi.it",
            },
            {
              label: "GitHub",
              value: "github.com/FrancescoCastaldi",
              href: "https://github.com/FrancescoCastaldi",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/francescocastaldi",
              href: "https://www.linkedin.com/in/francescocastaldi",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                textDecoration: "none",
                color: "#9BA9BB",
                fontSize: 13,
                fontFamily: "Inter, sans-serif",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <span
                style={{
                  color: "#4B5768",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {item.label}
              </span>
              <span>{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
