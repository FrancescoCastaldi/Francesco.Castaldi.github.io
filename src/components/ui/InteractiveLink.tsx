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
    transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hoverStyle) {
      Object.assign(e.currentTarget.style, hoverStyle);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (style) {
      const targetStyle = e.currentTarget.style as unknown as Record<string, string | number | undefined>;
      const styleRecord = style as Record<string, string | number | undefined>;
      Object.keys(style).forEach((key) => {
        targetStyle[key] = styleRecord[key];
      });
    }
  };

  if (isExternal || target) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        style={baseStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}
