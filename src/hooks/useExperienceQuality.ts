"use client";
import { useSyncExternalStore, useEffect, useState } from "react";

export interface ExperienceQuality {
  canRender3D: boolean;
  tier: "high" | "medium" | "low" | "none";
  dpr: number;
  reason?: string;
}

const SERVER_SNAPSHOT: ExperienceQuality = {
  canRender3D: false,
  tier: "none",
  dpr: 1,
};

let cachedClientSnapshot: ExperienceQuality | null = null;

function computeClientQuality(): ExperienceQuality {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    return {
      canRender3D: false,
      tier: "none",
      dpr: 1,
      reason: "prefers-reduced-motion",
    };
  }

  let gl: WebGLRenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  } catch {
    gl = null;
  }

  if (!gl) {
    return {
      canRender3D: false,
      tier: "none",
      dpr: 1,
      reason: "webgl-unsupported",
    };
  }

  const isMobile = window.innerWidth < 768;
  const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  if (isMobile) {
    return {
      canRender3D: true,
      tier: "low",
      dpr: Math.min(devicePixelRatio, 1.25),
    };
  }

  return {
    canRender3D: true,
    tier: devicePixelRatio > 1.5 ? "high" : "medium",
    dpr: Math.min(devicePixelRatio, 1.75),
  };
}

function getSnapshot(): ExperienceQuality {
  if (!cachedClientSnapshot) {
    cachedClientSnapshot = computeClientQuality();
  }
  return cachedClientSnapshot;
}

function getServerSnapshot(): ExperienceQuality {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleResize = () => {
    cachedClientSnapshot = computeClientQuality();
    callback();
  };

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", handleResize);
  window.addEventListener("resize", handleResize);

  return () => {
    mq.removeEventListener("change", handleResize);
    window.removeEventListener("resize", handleResize);
  };
}

export function useExperienceQuality(): ExperienceQuality {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useTabVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibility = () => {
      setIsVisible(document.visibilityState !== "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return isVisible;
}