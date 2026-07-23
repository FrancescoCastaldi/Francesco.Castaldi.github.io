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
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: "#4B5768",
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
                color: "#F59E0B",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FBBF24")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F59E0B")}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "#9BA9BB" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
