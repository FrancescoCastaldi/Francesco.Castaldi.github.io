import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://francescocastaldi.it"),
  title: {
    default: "Francesco Castaldi — Computer Engineering Student & Developer",
    template: "%s — Francesco Castaldi",
  },
  description:
    "Computer Engineering student at University of Bologna. Data Science, AI, Web Development, and Cycling Analytics. Portfolio and projects.",
  keywords: [
    "Francesco Castaldi",
    "Computer Engineering",
    "University of Bologna",
    "Data Science",
    "AI",
    "Web Development",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Francesco Castaldi" }],
  openGraph: {
    type: "profile",
    locale: "en_US",
    siteName: "Francesco Castaldi",
    title: "Francesco Castaldi — Computer Engineering Student & Developer",
    description:
      "Data Science, AI, Web Development, and Cycling Analytics. Portfolio and projects.",
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
    title: "Francesco Castaldi",
    description: "Computer Engineering Student & Developer",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
