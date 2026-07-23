import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://francescocastaldi.it"),
  title: {
    default: "Francesco Castaldi — Computer Engineer & Business Consultant",
    template: "%s — Francesco Castaldi",
  },
  description:
    "Healthcare IT, Data Science, and Business Intelligence consulting. Personal portfolio and projects by Francesco Castaldi.",
  keywords: [
    "Francesco Castaldi",
    "Computer Engineer",
    "Business Consultant",
    "Healthcare IT",
    "Data Science",
    "Modena",
  ],
  authors: [{ name: "Francesco Castaldi" }],
  openGraph: {
    type: "profile",
    locale: "en_US",
    siteName: "Francesco Castaldi",
    title: "Francesco Castaldi — Computer Engineer & Business Consultant",
    description:
      "Healthcare IT, Data Science, and Business Intelligence consulting.",
    images: [
      {
        url: "/images/cycling_scene.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Francesco Castaldi",
    description: "Computer Engineer & Business Consultant",
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
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
