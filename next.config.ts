import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Add your Next.js configuration options here
  reactStrictMode: true,
  images: {
    domains: ['envaglo-erp.envaglo.net', '127.0.0.1'],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);