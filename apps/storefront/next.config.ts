import { NextConfig } from "next";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/store" : "");

const nextConfig: NextConfig = {
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
