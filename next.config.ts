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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'production' 
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://envaglo-erp.envaglo.net;"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:; font-src 'self' data:; connect-src 'self' https: http:;"
          },
        ],
      },
    ];
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
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "0.0.0.0",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
        port: "",
        pathname: "/**",
      },
      // Placeholder image service for development mock data
      {
        protocol: "https",
        hostname: "placehold.co",
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
