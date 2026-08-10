"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { label: "About", href: "/#about", desktop: true },
    { label: "Expertise", href: "/#expertise", desktop: true },
    { label: "Projects", href: "/#projects", desktop: true },
    { label: "Blog", href: "/blog", desktop: true },
    { label: "Contact", href: "/#contact", desktop: true },
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
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5%",
          background: "var(--color-space-void)",
          borderBottom: "1px solid var(--color-space-surface)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 16,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            F. <span style={{ color: "var(--color-accent-secondary)" }}>CASTALDI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {navItems
              .filter((n) => n.desktop)
              .map((item) => {
                const isActive = pathname?.startsWith(item.href) && item.href !== "/";
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: isActive ? "var(--color-accent-secondary)" : "var(--color-text-body)",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--color-accent-secondary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--color-text-body)";
                    }}
                  >
                    [ {item.label} ]
                  </Link>
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
                background: "none",
                border: "1px solid var(--color-space-surface)",
                color: "var(--color-text-body)",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
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
              background: "var(--color-space-void)",
              borderLeft: "1px solid var(--color-space-surface)",
              display: "flex",
              flexDirection: "column",
              padding: "80px 32px 32px",
              transition: "transform 0.3s ease",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "1px solid var(--color-space-surface)",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-body)",
                fontSize: 20,
                cursor: "pointer",
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
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 24,
                      textTransform: "uppercase",
                      color: isActive ? "var(--color-accent-secondary)" : "var(--color-text-primary)",
                      textDecoration: "none",
                      padding: "16px 0",
                      borderBottom: "1px solid var(--color-space-surface)",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            
            {/* Social links */}
            <div style={{ marginTop: "auto", display: "flex", gap: 20 }}>
              <a href="https://github.com/FrancescoCastaldi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-muted)", fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: "uppercase", textDecoration: "none", letterSpacing: "0.05em" }}>GitHub</a>
              <a href="https://www.linkedin.com/in/francescocastaldi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-muted)", fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: "uppercase", textDecoration: "none", letterSpacing: "0.05em" }}>LinkedIn</a>
            </div>
          </div>

          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 199,
              background: "rgba(0,0,0,0.8)",
            }}
          />
        </>
      )}
    </>
  );
}
