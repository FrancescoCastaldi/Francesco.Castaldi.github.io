"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/HeritageIcon";
import { useScene } from "@/context/SceneContext";

interface NotFoundRealignLinkProps {
  href?: string;
}

export default function NotFoundRealignLink({ href = "/" }: NotFoundRealignLinkProps) {
  const { setIs404Realigning } = useScene();

  return (
    <Link
      href={href}
      onMouseEnter={() => setIs404Realigning(true)}
      onMouseLeave={() => setIs404Realigning(false)}
      onFocus={() => setIs404Realigning(true)}
      onBlur={() => setIs404Realigning(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        color: "#EDE8DE",
        background: "#1F3329",
        fontSize: 13,
        fontFamily: "var(--font-body)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "none",
        border: "1px solid rgba(201, 197, 188, 0.3)",
        padding: "12px 24px",
        borderRadius: 3,
        transition: "all 0.25s ease",
      }}
    >
      <ArrowLeftIcon size={16} color="#C1622D" />
      <span>Return to Monograph</span>
    </Link>
  );
}
