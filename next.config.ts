import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  basePath: isGithubActions ? "/gruenewald_gruppe_website" : undefined,
  assetPrefix: isGithubActions ? "/gruenewald_gruppe_website/" : undefined,
};

export default nextConfig;
