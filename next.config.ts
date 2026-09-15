import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  reactStrictMode: false,
  typescript: {
    // Blocking type check for production build safety
    ignoreBuildErrors: false,
  },
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