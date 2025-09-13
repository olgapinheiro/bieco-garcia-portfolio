import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kdza1dlzdaaocp7i.public.blob.vercel-storage.com',
        pathname: '/**',
      },
   ],
  },
};

export default nextConfig;
