import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://francescocastaldi.it"),
  title: {
    default: "Francesco Castaldi — Archival Monograph & Curated Engineering Works",
    template: "%s — Francesco Castaldi",
  },
  description:
    "Archival Monograph & Curated Engineering Works of Francesco Castaldi. Computer Engineering, Kinematics, Data Science, and Systems Architecture.",
  keywords: [
    "Francesco Castaldi",
    "Archival Monograph",
    "Computer Engineering",
    "University of Bologna",
    "Kinematics",
    "Data Science",
    "AI",
    "Systems Architecture",
    "Old Money Aesthetic",
    "Gentlemen's Club",
    "Curated Essays",
  ],
  authors: [{ name: "Francesco Castaldi" }],
  openGraph: {
    type: "profile",
    locale: "en_US",
    siteName: "Francesco Castaldi",
    title: "Francesco Castaldi — Archival Monograph & Curated Engineering Works",
    description:
      "Archival Monograph & Curated Engineering Works of Francesco Castaldi. Computer Engineering, Kinematics, Data Science, and Systems Architecture.",
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
    title: "Francesco Castaldi — Archival Monograph & Curated Engineering Works",
    description:
      "Archival Monograph & Curated Engineering Works of Francesco Castaldi. Computer Engineering, Kinematics, Data Science, and Systems Architecture.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
