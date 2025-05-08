import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://kdza1dlzdaaocp7i.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
