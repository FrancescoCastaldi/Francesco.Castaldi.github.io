"use client";
import dynamic from "next/dynamic";

const ExperienceShell = dynamic(() => import("./ExperienceShell"), {
  ssr: false,
});

export default function GlobalExperience() {
  return <ExperienceShell />;
}
