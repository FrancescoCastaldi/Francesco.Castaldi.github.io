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
      fontSize: 10,
      color: "var(--color-text-muted)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && (
            <span style={{ color: "var(--color-space-surface)", userSelect: "none" }}>/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "var(--color-accent-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-accent-secondary)")}
            >
              [ {item.label} ]
            </Link>
          ) : (
            <span style={{ color: "var(--color-text-body)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
