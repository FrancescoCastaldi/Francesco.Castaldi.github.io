"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
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
          background: isHome ? "rgba(10, 10, 10, 0.8)" : "rgba(10, 10, 10, 0.95)",
          backdropFilter: isHome ? "blur(12px)" : "blur(20px)",
          WebkitBackdropFilter: isHome ? "blur(12px)" : "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          transition: "background 0.3s ease",
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
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Francesco <span style={{ color: "var(--color-star-gold)" }}>Castaldi</span>
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
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 500,
                      color: isActive ? "var(--color-star-gold)" : "var(--color-text-body)",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--color-star-gold)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--color-text-body)";
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -6,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "var(--color-star-gold)",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
              

          </nav>
        )}

        {/* Mobile Hamburger & Lang */}
        {isMobile && (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 6,
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
                <line x1="2" y1="4" x2="14" y2="4" stroke="var(--color-text-body)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="var(--color-text-body)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="12" x2="14" y2="12" stroke="var(--color-text-body)" strokeWidth="1.5" strokeLinecap="round" />
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
              background: "rgba(12, 17, 26, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              padding: "80px 32px 32px",
              transition: "transform 0.3s ease",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
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
                border: "none",
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
                      fontFamily: 'var(--font-serif)',
                      fontSize: 24,
                      color: isActive ? "var(--color-star-gold)" : "var(--color-text-primary)",
                      textDecoration: "none",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            
            {/* Social links */}
            <div style={{ marginTop: "auto", display: "flex", gap: 20 }}>
              <a href="https://github.com/FrancescoCastaldi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-muted)", fontSize: 12, fontFamily: 'var(--font-sans)', textDecoration: "none", letterSpacing: "0.05em" }}>GitHub</a>
              <a href="https://www.linkedin.com/in/francescocastaldi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-muted)", fontSize: 12, fontFamily: 'var(--font-sans)', textDecoration: "none", letterSpacing: "0.05em" }}>LinkedIn</a>
            </div>
          </div>

          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 199,
              background: "rgba(0,0,0,0.5)",
            }}
          />
        </>
      )}
    </>
  );
}
