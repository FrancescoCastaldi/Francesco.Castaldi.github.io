"use client";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: "var(--color-text-muted)",
      letterSpacing: "0.04em",
    }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && (
            <span style={{ color: "#2E3847", userSelect: "none" }}>/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "var(--color-star-gold)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FBBF24")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-star-gold)")}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--color-text-body)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
