"use client";
export default function Footer() {
  const linkStyle: React.CSSProperties = {
    color: "#6B7A8D",
    textDecoration: "none",
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "color 0.2s",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        background: "linear-gradient(transparent, rgba(6,8,12,0.4))",
        pointerEvents: "auto",
      }}
    >
      {/* Left column — Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            color: "#4B5768",
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          FC
        </span>
      </div>

      {/* Center column — Social links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <a
          href="https://github.com/FrancescoCastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F59E0B")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7A8D")}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="#6B7A8D">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>

        <span style={{ color: "#4B5768", fontSize: 12, userSelect: "none" }}>·</span>

        <a
          href="https://www.linkedin.com/in/francescocastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F59E0B")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7A8D")}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="#6B7A8D">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.343 1.248zm6.694 8.212V9.859c0-1.073-.383-1.804-1.344-1.804-.733 0-1.17.494-1.362.971-.07.17-.087.408-.087.647v5.72h-2.4s.031-9.595 0-10.585h2.4v1.498c.083-.127.171-.256.244-.33.341-.43.824-1.078 2.498-1.078 1.823 0 3.191 1.192 3.191 3.756v6.739h-2.44.1z"/>
          </svg>
          LinkedIn
        </a>

        <span style={{ color: "#4B5768", fontSize: 12, userSelect: "none" }}>·</span>

        <a
          href="mailto:info@francescocastaldi.it"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F59E0B")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7A8D")}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="#6B7A8D">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 4.697v7.104l-5.803-3.558L16 4.697Z"/>
          </svg>
          Email
        </a>
      </div>

      {/* Right column — Copyright */}
      <span
        style={{
          color: "#4B5768",
          fontSize: 11,
          fontFamily: "Inter, sans-serif",
        }}
      >
        © 2026
      </span>
    </div>
  );
}
