import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Add your Next.js configuration options here
  reactStrictMode: true,
  // Allow production builds to succeed even if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "erpv2.envaglo.net",
        port: "",
        pathname: "/**", // <-- match all paths
      },
      {
        protocol: "http",
        hostname: "erpv2.envaglo.net",
        port: "",
        pathname: "/**", // <-- match all paths
      },
      {
        protocol: "https",
        hostname: "envaglo-erp.envaglo.net",
        port: "",
        pathname: "/**", // <-- match all paths
      },
      {
        protocol: "http",
        hostname: "envaglo-erp.envaglo.net",
        port: "",
        pathname: "/**", // <-- match all paths
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
    ],
    // qualities is NOT a valid config option for next/image
    // If you want to control quality, pass `quality` to <Image /> directly
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
