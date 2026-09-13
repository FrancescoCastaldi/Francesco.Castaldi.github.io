"use client";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-serif)",
        fontSize: 12,
        color: "#9E978E",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && (
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
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "#C5A059",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF6EE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C5A059")}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "#E8E3D6", fontWeight: 500 }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
