import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      symlinks: false,
    };
    config.snapshot = {
      ...config.snapshot,
      resolve: {
        timestamp: false,
        hash: false,
      },
      module: {
        timestamp: false,
        hash: false,
      },
    };
    config.cache = false;
    return config;
  },
};

export default nextConfig;