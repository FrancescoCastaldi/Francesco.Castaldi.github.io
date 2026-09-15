import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://francescocastaldi.it"),
  title: {
    default: "Francesco Castaldi — Systems, shaped with care.",
    template: "%s — Francesco Castaldi",
  },
  description:
    "Personal atlas of computer engineering, powertrain kinematics, stochastic modeling, and enterprise data architectures by Francesco Castaldi.",
  keywords: [
    "Francesco Castaldi",
    "Computer Engineering",
    "University of Bologna",
    "Kinematics",
    "Data Science",
    "Systems Architecture",
    "Three.js",
    "WebGL",
    "Upstream Open Source",
  ],
  authors: [{ name: "Francesco Castaldi" }],
  openGraph: {
    type: "profile",
    locale: "en_US",
    siteName: "Francesco Castaldi",
    title: "Francesco Castaldi — Systems, shaped with care.",
    description:
      "Personal atlas of computer engineering, powertrain kinematics, stochastic modeling, and enterprise data architectures by Francesco Castaldi.",
    images: [
      {
        url: "/assets/img/og/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Francesco Castaldi — Systems, shaped with care.",
    description:
      "Personal atlas of computer engineering, powertrain kinematics, stochastic modeling, and enterprise data architectures by Francesco Castaldi.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: "index, follow",
};

import { SceneProvider } from "@/context/SceneContext";
import GlobalExperience from "@/components/experience/GlobalExperience";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <SceneProvider>
          <GlobalExperience />
          <Header />
          <main style={{ position: "relative", zIndex: 10 }}>{children}</main>
          <Footer />
        </SceneProvider>
      </body>
    </html>
  );
}
