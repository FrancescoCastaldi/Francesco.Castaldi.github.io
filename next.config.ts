import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["three"],
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
