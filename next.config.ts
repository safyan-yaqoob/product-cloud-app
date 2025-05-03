import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  onError: () => {},
  experimental: {
    webpackBuildWorker: false
  }
};

export default nextConfig;
