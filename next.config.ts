import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.PROMOMERCH_HOSTING === "whc" ? { output: "standalone" as const } : {}),
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
