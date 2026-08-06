import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
