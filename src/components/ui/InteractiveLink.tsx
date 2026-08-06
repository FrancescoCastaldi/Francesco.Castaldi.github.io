"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface InteractiveLinkProps {
  href: string;
  style?: React.CSSProperties;
  className?: string;
  children: ReactNode;
  hoverStyle?: React.CSSProperties;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function InteractiveLink({
  href,
  style,
  className,
  children,
  hoverStyle,
  onClick,
  target,
  rel,
}: InteractiveLinkProps) {
  const isExternal = href.startsWith("http");
  const baseStyle: React.CSSProperties = {
    ...style,
    transition: "all 0.2s ease",
  };

  if (isExternal || target) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        style={baseStyle}
        className={className}
        onMouseEnter={(e) => {
          if (hoverStyle) {
            Object.assign(e.currentTarget.style, hoverStyle);
          }
        }}
        onMouseLeave={(e) => {
          if (style) {
            // Reset to original style
            Object.keys(style).forEach((key) => {
              const k = key as keyof React.CSSProperties;
              (e.currentTarget.style as any)[k] = (style as any)[k];
            });
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      style={baseStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverStyle) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (style) {
          Object.keys(style).forEach((key) => {
            const k = key as keyof React.CSSProperties;
            (e.currentTarget.style as any)[k] = (style as any)[k];
          });
        }
      }}
    >
      {children}
    </Link>
  );
}
