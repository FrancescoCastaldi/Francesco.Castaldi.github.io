"use client";
import { useState } from "react";
import Link from "next/link";
import { useConstellationStore } from "@/store/constellation-store";

const navItems = [
  { label: "Projects", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { clearSelection } = useConstellationStore();

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href === "#") {
      clearSelection();
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5%",
          background: "rgba(6, 8, 12, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => clearSelection()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              color: "#F59E0B",
              fontFamily: "Georgia, serif",
              fontSize: 18,
              cursor: "default",
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(245,158,11,0.4))'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
          >
            ⚸
          </span>
          <span
            style={{
              color: "#E7EDF5",
              fontFamily: "DM Serif Display, Georgia, serif",
              fontSize: 14,
              letterSpacing: "0.02em",
            }}
          >
            FC
          </span>
        </Link>

        {/* Center label */}
        <span
          style={{
            color: "#4B5768",
            fontSize: 11,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
          className="hidden md:block"
        >
          Explore the Network
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 6,
            color: "#9BA9BB",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="4" x2="14" y2="4" stroke="#9BA9BB" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="2" y1="8" x2="14" y2="8" stroke="#9BA9BB" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="2" y1="12" x2="14" y2="12" stroke="#9BA9BB" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="3" x2="13" y2="13" stroke="#9BA9BB" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="13" y1="3" x2="3" y2="13" stroke="#9BA9BB" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(6, 8, 12, 0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <span style={{ color: "#F59E0B", fontSize: 32, fontFamily: "Georgia, serif" }}>
              ⚸
            </span>
            <span style={{ color: "#4B5768", fontSize: 11, fontFamily: "Inter", letterSpacing: "0.1em" }}>
              FRANCESCO CASTALDI
            </span>
          </div>

          {[
            { label: "All Projects", href: "#", action: () => handleNav("#") },
            { label: "Blog", href: "/blog", action: () => handleNav("/blog") },
            { label: "Contact", href: "/contact", action: () => handleNav("/contact") },
          ].map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => {
                setMenuOpen(false);
                if (item.href === "#") clearSelection();
              }}
              style={{
                fontFamily: "DM Serif Display, Georgia, serif",
                fontSize: 28,
                color: "#E7EDF5",
                textDecoration: "none",
                transition: "color 0.2s",
                letterSpacing: "-0.02em",
                animation: "fadeSlideUp 0.4s ease backwards",
                animationDelay: `${index * 80}ms`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F59E0B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#E7EDF5")}
            >
              {item.label}
            </Link>
          ))}

          {/* Social links */}
          <div
            style={{
              position: "absolute",
              bottom: 48,
              display: "flex",
              gap: 24,
              fontSize: 13,
              color: "#4B5768",
            }}
          >
            {[
              { label: "GitHub", href: "https://github.com/FrancescoCastaldi" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/francescocastaldi" },
              { label: "Email", href: "mailto:info@francescocastaldi.it" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#4B5768",
                  textDecoration: "none",
                  fontSize: 12,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#22D3EE")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5768")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
