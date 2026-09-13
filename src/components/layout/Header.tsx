"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { label: "Overview", href: "/#hero" },
    { label: "Numbers", href: "/#numbers" },
    { label: "Selected Work", href: "/#work" },
    { label: "Archive", href: "/#archive" },
    { label: "Expertise", href: "/#expertise" },
    { label: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Chiudi menu con tasto Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        background: "rgba(14, 16, 15, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
      }}
    >
      {/* Brand Identity */}
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
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#1F3329",
            border: "1px solid rgba(201, 197, 188, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src="/assets/img/brand/logo.svg"
            alt="FC Monogram Crest"
            width={24}
            height={24}
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
            priority
          />
        </div>
        <span
          style={{
            color: "#EDE8DE",
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 18,
            letterSpacing: "0.02em",
          }}
        >
          Francesco <span style={{ color: "#C1622D" }}>Castaldi</span>
        </span>
      </Link>

      {/* Desktop Navigation with Micro-Dots */}
      {!isMobile && (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          aria-label="Main Navigation"
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <Link
                href={item.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#C9C5BC",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE8DE")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C9C5BC")}
              >
                {item.label}
              </Link>
              {index < navItems.length - 1 && (
                <span
                  style={{
                    color: "rgba(201, 197, 188, 0.3)",
                    fontSize: 8,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "1px solid rgba(201, 197, 188, 0.25)",
            borderRadius: 4,
            padding: "8px 12px",
            color: "#EDE8DE",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          {menuOpen ? "CLOSE [ESC]" : "MENU"}
        </button>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobile && menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(14, 16, 15, 0.98)",
            borderBottom: "1px solid rgba(201, 197, 188, 0.2)",
            padding: "24px 5%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            backdropFilter: "blur(16px)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                color: "#EDE8DE",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(201, 197, 188, 0.1)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
