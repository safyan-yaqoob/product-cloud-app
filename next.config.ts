import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Disable the error overlay
  onError: () => {},
  experimental: {
    // Disable the build error overlay
    webpackBuildWorker: false
  }
};

export default nextConfig;
