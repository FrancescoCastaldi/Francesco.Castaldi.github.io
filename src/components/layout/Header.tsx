"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { label: "Portfolio", href: "/#work-portfolio", desktop: true },
    { label: "Atelier", href: "/#garage-labs", desktop: true },
    { label: "Automotive", href: "/#automotive-hub", desktop: true },
    { label: "Disciplines", href: "/#expertise", desktop: true },
    { label: "Monographs", href: "/blog", desktop: true },
    { label: "Correspondence", href: "/#contact", desktop: true },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5%",
          background: "rgba(18, 17, 16, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
          transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s ease-out",
        }}
      >
        {/* Heraldic Logo & Monogram */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#15261E",
              border: "1px solid rgba(197, 160, 89, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s ease-out",
            }}
          >
            <Image
              src="/assets/img/brand/logo.svg"
              alt="FC Monogram Crest"
              width={26}
              height={26}
              style={{ width: "88%", height: "88%", objectFit: "contain" }}
              priority
            />
          </div>
          <span
            style={{
              color: "#FAF6EE",
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Francesco <span style={{ color: "#C5A059" }}>Castaldi</span>
          </span>
        </Link>

        {/* Desktop Nav with Micro-Dots */}
        {!isMobile && (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {navItems
              .filter((n) => n.desktop)
              .map((item, idx) => {
                const isActive = pathname?.startsWith(item.href) && item.href !== "/";
                return (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {idx > 0 && (
                      <span
                        style={{
                          color: "rgba(197, 160, 89, 0.35)",
                          fontSize: 9,
                          userSelect: "none",
                        }}
                        aria-hidden="true"
                      >
                        •
                      </span>
                    )}
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: isActive ? "#C5A059" : "#B8B0A2",
                        textDecoration: "none",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        transition: "color 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s ease-out",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#C5A059";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#B8B0A2";
                      }}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
          </nav>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                color: "#C5A059",
                width: 36,
                height: 36,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.6s ease-out",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </header>

      {/* Mobile slide-in panel */}
      {menuOpen && isMobile && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: 300,
              height: "100vh",
              zIndex: 200,
              background: "#161413",
              borderLeft: "1px solid rgba(197, 160, 89, 0.25)",
              display: "flex",
              flexDirection: "column",
              padding: "80px 32px 32px",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.7)",
              transition: "transform 0.4s ease-out",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(197, 160, 89, 0.1)",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                borderRadius: 4,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C5A059",
                fontSize: 20,
                cursor: "pointer",
                transition: "all 0.6s ease-out",
              }}
            >
              &times;
            </button>

            {/* Nav items */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 20,
              }}
            >
              {navItems.map((item) => {
                const isActive = pathname?.startsWith(item.href) && item.href !== "/";
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 600,
                      fontSize: 20,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: isActive ? "#C5A059" : "#FAF6EE",
                      textDecoration: "none",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(197, 160, 89, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "color 0.6s ease-out",
                    }}
                  >
                    <span style={{ color: "rgba(197, 160, 89, 0.4)", fontSize: 12 }}>•</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
            
            {/* Social links */}
            <div style={{ marginTop: "auto", display: "flex", gap: 16, alignItems: "center" }}>
              <a
                href="https://github.com/FrancescoCastaldi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#B8B0A2",
                  fontSize: 12,
                  fontFamily: "var(--font-serif)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  transition: "color 0.6s ease-out",
                }}
              >
                GitHub
              </a>
              <span style={{ color: "rgba(197, 160, 89, 0.35)", fontSize: 10 }}>•</span>
              <a
                href="https://www.linkedin.com/in/francescocastaldi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#B8B0A2",
                  fontSize: 12,
                  fontFamily: "var(--font-serif)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  transition: "color 0.6s ease-out",
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 199,
              background: "rgba(0,0,0,0.75)",
            }}
          />
        </>
      )}
    </>
  );
}
