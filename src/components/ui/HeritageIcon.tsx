import React from "react";

export interface HeritageIconProps extends React.SVGProps<SVGSVGElement> {
  /** Icon name (e.g. "folder", "code", "github") or emoji (e.g. "📊", "⚡", "🐳") */
  nameOrEmoji?: string;
  /** Alias for nameOrEmoji */
  name?: string;
  /** Size in pixels (applies to both width and height). Default: 20 */
  size?: number | string;
  /** Stroke color. Default: "#C5A059" (Satin Antique Gold) or "currentColor" */
  color?: string;
  /** Hairline stroke width. Default: 0.85 (range 0.75 - 1.0) */
  strokeWidth?: number;
  /** Optional class names */
  className?: string;
}

type IconRenderer = (strokeWidth: number) => React.ReactNode;

// Registry of hairline vector icon definitions (viewBox 0 0 24 24)
const ICON_DEFINITIONS: Record<string, IconRenderer> = {
  // Navigation & Actions
  "arrow-right": (sw) => (
    <path d="M4.5 12h15m-5.5-5.5 5.5 5.5-5.5 5.5" strokeWidth={sw} />
  ),
  "arrow-left": (sw) => (
    <path d="M19.5 12h-15m5.5-5.5-5.5 5.5 5.5 5.5" strokeWidth={sw} />
  ),
  "external-link": (sw) => (
    <>
      <path d="M18 13.5v4.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5" strokeWidth={sw} />
      <path d="M14.5 4.5H19.5v5m-9 9L19.5 4.5" strokeWidth={sw} />
    </>
  ),
  search: (sw) => (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" strokeWidth={sw} />
      <path d="M15.5 15.5 20 20" strokeWidth={sw} />
    </>
  ),
  menu: (sw) => (
    <path d="M4.5 7h15m-15 5h15m-15 5h15" strokeWidth={sw} />
  ),
  close: (sw) => (
    <path d="M6 6l12 12M6 18L18 6" strokeWidth={sw} />
  ),
  check: (sw) => (
    <path d="m4.5 12.5 5 5 10-11" strokeWidth={sw} />
  ),
  info: (sw) => (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth={sw} />
      <path d="M12 11v5m0-8h.01" strokeWidth={sw} />
    </>
  ),

  // Engineering, Code & Systems
  code: (sw) => (
    <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-3-8-4 10" strokeWidth={sw} />
  ),
  terminal: (sw) => (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" strokeWidth={sw} />
      <path d="m7 9.5 2.5 2.5L7 14.5m5.5 0h4.5" strokeWidth={sw} />
    </>
  ),
  folder: (sw) => (
    <path
      d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.6a2.5 2.5 0 0 1 1.8.76l1.3 1.37a2.5 2.5 0 0 0 1.8.77H18.5A2.5 2.5 0 0 1 21 10.4v7.1a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5V7.5z"
      strokeWidth={sw}
    />
  ),
  cpu: (sw) => (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1" strokeWidth={sw} />
      <rect x="9.5" y="9.5" width="5" height="5" strokeWidth={sw} />
      <path d="M9 3.5v3m6-3v3M9 17.5v3m6-3v3M3.5 9h3m-3 6h3m11-6h3m-11 6h3" strokeWidth={sw} />
    </>
  ),
  wrench: (sw) => (
    <path
      d="M14.7 6.3a4.5 4.5 0 0 0-5.8 5.8l-5.6 5.6a1.5 1.5 0 0 0 2.1 2.1l5.6-5.6a4.5 4.5 0 0 0 5.8-5.8l-2.4 2.4-2.1-.7-.7-2.1 3.1-1.7z"
      strokeWidth={sw}
    />
  ),
  gear: (sw) => (
    <>
      <circle cx="12" cy="12" r="3" strokeWidth={sw} />
      <path
        d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m14.85-6.35-1.42 1.42m-11.86 11.86-1.42 1.42m0-14.7 1.42 1.42m11.86 11.86 1.42 1.42"
        strokeWidth={sw}
      />
    </>
  ),
  laptop: (sw) => (
    <>
      <rect x="4.5" y="5.5" width="15" height="10" rx="1.5" strokeWidth={sw} />
      <path d="M2 18.5h20M10 15.5h4" strokeWidth={sw} />
    </>
  ),
  cloud: (sw) => (
    <path
      d="M6.5 18a4.5 4.5 0 0 1-.5-8.9 5.5 5.5 0 0 1 10.5-1.6A4 4 0 0 1 20 14a3.5 3.5 0 0 1-3.5 4z"
      strokeWidth={sw}
    />
  ),
  plug: (sw) => (
    <>
      <path d="M9 3.5v4M15 3.5v4" strokeWidth={sw} />
      <path
        d="M6.5 7.5h11a1 1 0 0 1 1 1v2.5a5.5 5.5 0 0 1-5.5 5.5v4m-2 0v-4A5.5 5.5 0 0 1 5.5 11V8.5a1 1 0 0 1 1-1z"
        strokeWidth={sw}
      />
    </>
  ),
  chain: (sw) => (
    <path
      d="M9.5 14.5 14.5 9.5m-7 0 2-2a3.5 3.5 0 0 1 5 5l-2 2m-3 0-2 2a3.5 3.5 0 0 1-5-5l2-2"
      strokeWidth={sw}
    />
  ),

  // Social & Communications
  github: (sw) => (
    <path
      d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.61-.2.61-.43v-1.5c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1 1 2.62.76.08-.59.32-1 .58-1.23-2-.23-4.1-1-4.1-4.46 0-.98.35-1.79.93-2.42-.1-.23-.4-1.15.09-2.39 0 0 .76-.24 2.48.93a8.6 8.6 0 0 1 4.52 0c1.72-1.17 2.48-.93 2.48-.93.49 1.24.19 2.16.09 2.39.58.63.93 1.44.93 2.42 0 3.48-2.11 4.23-4.12 4.45.33.28.62.83.62 1.68v2.5c0 .24.16.52.62.43A9 9 0 0 0 12 3z"
      strokeWidth={sw}
    />
  ),
  linkedin: (sw) => (
    <>
      <rect x="2.5" y="8.5" width="4" height="12" rx="0.5" strokeWidth={sw} />
      <circle cx="4.5" cy="4.5" r="1.5" strokeWidth={sw} />
      <path
        d="M9.5 12.5v8m0-4.5c0-2.5 1.5-4 4-4s4 1.5 4 4v4.5"
        strokeWidth={sw}
      />
    </>
  ),
  mail: (sw) => (
    <>
      <rect x="3.5" y="6.5" width="17" height="12" rx="1.5" strokeWidth={sw} />
      <path d="m3.8 7.8 8.2 5.7 8.2-5.7" strokeWidth={sw} />
    </>
  ),

  // Editorial, Heritage & Brand
  book: (sw) => (
    <>
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-13H6.5A2.5 2.5 0 0 0 4 6.5v13zm0 0a2.5 2.5 0 0 0 2.5 2.5H20"
        strokeWidth={sw}
      />
      <path d="M6.5 7.5H16M6.5 11H13" strokeWidth={sw} />
    </>
  ),
  calendar: (sw) => (
    <>
      <rect x="4.5" y="5.5" width="15" height="14" rx="1.5" strokeWidth={sw} />
      <path d="M4.5 10h15M8 3.5v3M16 3.5v3" strokeWidth={sw} />
    </>
  ),
  clock: (sw) => (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth={sw} />
      <path d="M12 7.5v4.5l3 2" strokeWidth={sw} />
    </>
  ),
  tag: (sw) => (
    <>
      <path
        d="M20.5 13.2 13.2 20.5a1.5 1.5 0 0 1-2.1 0L3.5 13V4.5H12l8.5 8.7a1.5 1.5 0 0 1 0 2.1z"
        strokeWidth={sw}
      />
      <circle cx="7.5" cy="7.5" r="1" strokeWidth={sw} />
    </>
  ),
  star: (sw) => (
    <path
      d="m12 3.5 2.6 5.3 5.9.8-4.3 4.2 1 5.9-5.2-2.7-5.2 2.7 1-5.9-4.3-4.2 5.9-.8z"
      strokeWidth={sw}
    />
  ),
  shield: (sw) => (
    <>
      <path
        d="M12 2.5s7 2.5 8 5.5c0 6.5-4 10.5-8 13.5-4-3-8-7-8-13.5 1-3 8-5.5 8-5.5z"
        strokeWidth={sw}
      />
      <path d="M12 6v10M8.5 10.5h7" strokeWidth={sw} />
    </>
  ),
  globe: (sw) => (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth={sw} />
      <path d="M3 12h18" strokeWidth={sw} />
      <path d="M12 3a13.5 13.5 0 0 1 4.5 9 13.5 13.5 0 0 1-4.5 9 13.5 13.5 0 0 1-4.5-9 13.5 13.5 0 0 1 4.5-9z" strokeWidth={sw} />
    </>
  ),
  briefcase: (sw) => (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" strokeWidth={sw} />
      <path d="M8.5 7.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2.5M2.5 12.5h19" strokeWidth={sw} />
    </>
  ),

  // Automotive, Kinematics & Cycling
  car: (sw) => (
    <>
      <path
        d="M4 14.5 5.8 8.7a2 2 0 0 1 1.9-1.4h8.6a2 2 0 0 1 1.9 1.4L20 14.5v4a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1h-8v1A1.5 1.5 0 0 1 6.5 20h-1A1.5 1.5 0 0 1 4 18.5v-4z"
        strokeWidth={sw}
      />
      <circle cx="7" cy="15" r="1" strokeWidth={sw} />
      <circle cx="17" cy="15" r="1" strokeWidth={sw} />
      <path d="M5.5 11.5h13" strokeWidth={sw} />
    </>
  ),
  "race-car": (sw) => (
    <>
      <path d="M2.5 15.5h3l1.5-2.5h7l2 2.5h5.5v2h-19zm2 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm13 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8-5.5h4l1 3h-6z" strokeWidth={sw} />
      <path d="M19 9.5v3.5M2 12v3.5" strokeWidth={sw} />
    </>
  ),
  bicycle: (sw) => (
    <>
      <circle cx="5.5" cy="15.5" r="3" strokeWidth={sw} />
      <circle cx="18.5" cy="15.5" r="3" strokeWidth={sw} />
      <path
        d="M5.5 15.5h4l2.5-5.5h4.5m-3.5 0 2.5 5.5m-7.5-3.5 4.5-2m-4.5 2 2.5 3.5m4-5.5V6m-1.5 0h3"
        strokeWidth={sw}
      />
    </>
  ),

  // Domain & Project Emojis Mapped to Sartorial Hairline Icons
  chart: (sw) => (
    <>
      <path d="M4 20.5h16 M6.5 20.5v-6 M11.5 20.5v-11 M16.5 20.5v-14" strokeWidth={sw} />
      <path d="M4 8.5 11.5 3.5 16.5 6.5 20 3" strokeWidth={sw} />
    </>
  ),
  lightning: (sw) => (
    <path d="M13 2.5 5.5 13.5h5.5l-1 8 8.5-12h-5.5z" strokeWidth={sw} />
  ),
  docker: (sw) => (
    <>
      <path
        d="M2.5 14c1 0 1.5-.5 2.5-.5s1.5.5 2.5.5 1.5-.5 2.5-.5 1.5.5 2.5.5 1.5-.5 2.5-.5 1.5.5 2.5.5 1.5-.5 2-.5c.5 1.5 0 3-1 4.2-1.5 1.8-4 2.8-7 2.8s-6.5-1.5-7.5-3.5c-.3-.6-.5-1.5-.5-2.5"
        strokeWidth={sw}
      />
      <rect x="7" y="10" width="2.5" height="2.5" strokeWidth={sw} />
      <rect x="10.5" y="10" width="2.5" height="2.5" strokeWidth={sw} />
      <rect x="14" y="10" width="2.5" height="2.5" strokeWidth={sw} />
      <rect x="10.5" y="6.5" width="2.5" height="2.5" strokeWidth={sw} />
      <rect x="14" y="6.5" width="2.5" height="2.5" strokeWidth={sw} />
      <rect x="17.5" y="10" width="2.5" height="2.5" strokeWidth={sw} />
    </>
  ),
  helm: (sw) => (
    <>
      <circle cx="12" cy="12" r="7.5" strokeWidth={sw} />
      <circle cx="12" cy="12" r="2.5" strokeWidth={sw} />
      <path d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m14.2-5.7-1.4 1.4m-9.9 9.9-1.4 1.4m0-12.7 1.4 1.4m9.9 9.9 1.4 1.4" strokeWidth={sw} />
    </>
  ),
  quill: (sw) => (
    <>
      <path
        d="M20.5 3.5c-4 1-9 5.5-11 11.5l1.5 1.5c4-1.5 8.5-5.5 10.5-12.5l-1-.5zm-11 11.5-4 4.5v1h1l4.5-4"
        strokeWidth={sw}
      />
      <path d="M4 19.5h16" strokeWidth={sw} />
    </>
  ),
  apparel: (sw) => (
    <>
      <path
        d="M8.5 4.5a3.5 3.5 0 0 0 7 0l4 2.5-2 4-2.5-1.5v9h-10v-9L2.5 11l-2-4 8-2.5z"
        strokeWidth={sw}
      />
      <path d="M12 8v3" strokeWidth={sw} />
    </>
  ),
  storm: (sw) => (
    <>
      <path
        d="M6.5 14.5A4.5 4.5 0 0 1 5 6a5.5 5.5 0 0 1 10.5-1.5A4 4 0 0 1 19 12.5a3.5 3.5 0 0 1-2.5 3"
        strokeWidth={sw}
      />
      <path d="m11.5 15.5-2 3.5h2.5l-1.5 3.5m-3-6-1 2m7-2-1 2" strokeWidth={sw} />
    </>
  ),
  printer: (sw) => (
    <>
      <path d="M6.5 8.5V4.5h11v4M6.5 17.5H4a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 4 9.5h16a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5h-2.5" strokeWidth={sw} />
      <rect x="6.5" y="14" width="11" height="6.5" strokeWidth={sw} />
      <circle cx="17.5" cy="12.5" r="0.5" strokeWidth={sw} />
    </>
  ),
  factory: (sw) => (
    <>
      <path d="M3.5 20.5V10l5.5 3.5V10l5.5 3.5V6.5l6 3.5v10.5z" strokeWidth={sw} />
      <path d="M7 17.5h1.5M12 17.5h1.5M17 17.5h1.5" strokeWidth={sw} />
    </>
  ),
  palette: (sw) => (
    <>
      <path
        d="M12 3.5C6.75 3.5 2.5 7.75 2.5 13a8.5 8.5 0 0 0 12.5 7.5c1.2-.7 1.8-1.5 1.8-2.6 0-1.1-.9-1.9-1.9-1.9h-1.4c-1.4 0-2.5-1.1-2.5-2.5 0-.7.3-1.3.8-1.8.5-.5.8-1.1.8-1.8 0-1.4-1.1-2.5-2.5-2.5z"
        strokeWidth={sw}
      />
      <circle cx="7.5" cy="9.5" r="0.8" strokeWidth={sw} />
      <circle cx="11.5" cy="7.5" r="0.8" strokeWidth={sw} />
      <circle cx="15.5" cy="9.5" r="0.8" strokeWidth={sw} />
    </>
  ),
  microbe: (sw) => (
    <>
      <circle cx="12" cy="12" r="5" strokeWidth={sw} />
      <path
        d="M12 3.5v2m0 13v2m7.5-7.5h-2m-13 0h-2m14.3-5.3-1.4 1.4m-10.4 10.4-1.4 1.4m0-13.2 1.4 1.4m10.4 10.4 1.4 1.4"
        strokeWidth={sw}
      />
      <circle cx="10" cy="11" r="0.75" strokeWidth={sw} />
      <circle cx="14" cy="13" r="0.75" strokeWidth={sw} />
    </>
  ),
  hospital: (sw) => (
    <>
      <rect x="4.5" y="5.5" width="15" height="15" rx="1.5" strokeWidth={sw} />
      <path d="M10 11.5h4M12 9.5v4M9 17h6v3.5H9z M12 3.5V2" strokeWidth={sw} />
    </>
  ),
  map: (sw) => (
    <>
      <path d="M3.5 6.5 8.5 4l7 3 5-2.5v13l-5 2.5-7-3-5 2.5z" strokeWidth={sw} />
      <path d="M8.5 4v13M15.5 7v13" strokeWidth={sw} />
    </>
  ),
  fuel: (sw) => (
    <>
      <rect x="4.5" y="5.5" width="8" height="15" rx="1.5" strokeWidth={sw} />
      <path d="M4.5 11.5h8M7 8.5h3 M12.5 8.5h2a2 2 0 0 1 2 2v6.5a1.5 1.5 0 0 1-3 0v-4.5" strokeWidth={sw} />
    </>
  ),
  microscope: (sw) => (
    <>
      <path d="M6 19.5h12M7 15.5h6m-1.5-4a4 4 0 1 1-4 4" strokeWidth={sw} />
      <path d="m9.5 4.5 4 4-2 2-4-4zM12.5 7.5l3.5 3.5" strokeWidth={sw} />
    </>
  ),
  robot: (sw) => (
    <>
      <rect x="4.5" y="8.5" width="15" height="11" rx="2" strokeWidth={sw} />
      <path d="M12 3.5v5M8.5 12.5h.01M15.5 12.5h.01M8.5 16h7M2.5 13.5h2M19.5 13.5h2" strokeWidth={sw} />
    </>
  ),
  brain: (sw) => (
    <>
      <path
        d="M9.5 4.5a3.5 3.5 0 0 0-4.5 4 4 4 0 0 0-.5 6 3.5 3.5 0 0 0 5 4.5V4.5zm5 0a3.5 3.5 0 0 1 4.5 4 4 4 0 0 1 .5 6 3.5 3.5 0 0 1-5 4.5V4.5z"
        strokeWidth={sw}
      />
      <path d="M9.5 9h-2M9.5 13H6M14.5 9h2M14.5 13H18" strokeWidth={sw} />
    </>
  ),

  // Fallback noble signet diamond
  default: (sw) => (
    <>
      <path d="M12 3 20.5 12 12 21 3.5 12z" strokeWidth={sw} />
      <circle cx="12" cy="12" r="1.5" strokeWidth={sw} />
    </>
  ),
};

// Aliases mapping semantic names & emojis to registered icon keys
const ALIAS_MAP: Record<string, string> = {
  // Navigation & UI
  "arrow-right": "arrow-right",
  "chevron-right": "arrow-right",
  next: "arrow-right",
  "→": "arrow-right",
  "&rarr;": "arrow-right",

  "arrow-left": "arrow-left",
  "chevron-left": "arrow-left",
  back: "arrow-left",
  prev: "arrow-left",
  "←": "arrow-left",
  "&larr;": "arrow-left",

  external: "external-link",
  "external-link": "external-link",
  "arrow-up-right": "external-link",
  "↗": "external-link",

  search: "search",
  menu: "menu",
  hamburger: "menu",
  close: "close",
  x: "close",
  check: "check",
  checkmark: "check",
  info: "info",

  // Engineering & Tech
  code: "code",
  source: "code",
  terminal: "terminal",
  cli: "terminal",
  console: "terminal",
  folder: "folder",
  directory: "folder",
  cpu: "cpu",
  chip: "cpu",
  processor: "cpu",
  wrench: "wrench",
  tool: "wrench",
  tools: "wrench",
  gear: "gear",
  cog: "gear",
  settings: "gear",
  laptop: "laptop",
  computer: "laptop",
  systems: "laptop",
  cloud: "cloud",
  plug: "plug",
  electronics: "plug",
  chain: "chain",
  blockchain: "chain",

  // Social
  github: "github",
  gh: "github",
  linkedin: "linkedin",
  mail: "mail",
  email: "mail",
  envelope: "mail",

  // Editorial & Heritage
  book: "book",
  library: "book",
  reading: "book",
  calendar: "calendar",
  date: "calendar",
  clock: "clock",
  time: "clock",
  tag: "tag",
  badge: "tag",
  star: "star",
  bookmark: "star",
  shield: "shield",
  crest: "shield",
  globe: "globe",
  world: "globe",
  briefcase: "briefcase",
  portfolio: "briefcase",
  consulting: "briefcase",

  // Automotive & Kinematics
  car: "car",
  automotive: "car",
  "race-car": "race-car",
  kinematics: "race-car",
  racing: "race-car",
  bicycle: "bicycle",
  bike: "bicycle",
  cycling: "bicycle",
  velometric: "bicycle",

  // Direct Emoji Mappings from projects.ts & skills.ts
  "📊": "chart",
  "⚡": "lightning",
  "🐳": "docker",
  "☸️": "helm",
  "☸": "helm",
  "🦆": "quill",
  "👕": "apparel",
  "⛈️": "storm",
  "⛈": "storm",
  "⚙️": "gear",
  "⚙": "gear",
  "🚴": "bicycle",
  "🖨️": "printer",
  "🖨": "printer",
  "🏭": "factory",
  "🎨": "palette",
  "🦠": "microbe",
  "🏥": "hospital",
  "🗺️": "map",
  "🗺": "map",
  "⛽": "fuel",
  "🔬": "microscope",
  "🤖": "robot",
  "📅": "calendar",
  "🌐": "globe",
  "🏎️": "race-car",
  "🏎": "race-car",
  "🧠": "brain",
  "💻": "laptop",
  "☁️": "cloud",
  "☁": "cloud",
  "🔌": "plug",
  "⛓️": "chain",
  "⛓": "chain",
  "💼": "briefcase",
};

export function resolveIconKey(input?: string): string {
  if (!input) return "default";
  const trimmed = input.trim();
  if (ALIAS_MAP[trimmed]) return ALIAS_MAP[trimmed];
  const lower = trimmed.toLowerCase();
  if (ALIAS_MAP[lower]) return ALIAS_MAP[lower];
  if (ICON_DEFINITIONS[lower]) return lower;
  return "default";
}

/**
 * Sartorial Hairline Icon Component
 * Renders understated, 0.75–1.0px hairline vector icons in warm antique gold or ivory.
 */
export function HeritageIcon({
  nameOrEmoji,
  name,
  size = 20,
  color = "#C5A059",
  strokeWidth = 0.85,
  className,
  style,
  ...rest
}: HeritageIconProps) {
  const iconInput = nameOrEmoji ?? name;
  const iconKey = resolveIconKey(iconInput);
  const renderer = ICON_DEFINITIONS[iconKey] || ICON_DEFINITIONS.default;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    >
      {renderer(strokeWidth)}
    </svg>
  );
}

// Named convenience components for direct usage across UI
export const FolderIcon = (props: HeritageIconProps) => <HeritageIcon name="folder" {...props} />;
export const CodeIcon = (props: HeritageIconProps) => <HeritageIcon name="code" {...props} />;
export const TerminalIcon = (props: HeritageIconProps) => <HeritageIcon name="terminal" {...props} />;
export const BookIcon = (props: HeritageIconProps) => <HeritageIcon name="book" {...props} />;
export const CarIcon = (props: HeritageIconProps) => <HeritageIcon name="car" {...props} />;
export const CpuIcon = (props: HeritageIconProps) => <HeritageIcon name="cpu" {...props} />;
export const WrenchIcon = (props: HeritageIconProps) => <HeritageIcon name="wrench" {...props} />;
export const ExternalLinkIcon = (props: HeritageIconProps) => <HeritageIcon name="external-link" {...props} />;
export const ArrowRightIcon = (props: HeritageIconProps) => <HeritageIcon name="arrow-right" {...props} />;
export const ArrowLeftIcon = (props: HeritageIconProps) => <HeritageIcon name="arrow-left" {...props} />;
export const GithubIcon = (props: HeritageIconProps) => <HeritageIcon name="github" {...props} />;
export const LinkedinIcon = (props: HeritageIconProps) => <HeritageIcon name="linkedin" {...props} />;
export const MailIcon = (props: HeritageIconProps) => <HeritageIcon name="mail" {...props} />;
export const SearchIcon = (props: HeritageIconProps) => <HeritageIcon name="search" {...props} />;
export const CalendarIcon = (props: HeritageIconProps) => <HeritageIcon name="calendar" {...props} />;
export const ClockIcon = (props: HeritageIconProps) => <HeritageIcon name="clock" {...props} />;
export const TagIcon = (props: HeritageIconProps) => <HeritageIcon name="tag" {...props} />;
export const CheckIcon = (props: HeritageIconProps) => <HeritageIcon name="check" {...props} />;
export const ShieldIcon = (props: HeritageIconProps) => <HeritageIcon name="shield" {...props} />;
export const GlobeIcon = (props: HeritageIconProps) => <HeritageIcon name="globe" {...props} />;

export default HeritageIcon;
