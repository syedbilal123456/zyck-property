import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Existing domain
      },
      {
        protocol: 'https',
        hostname: 'jaghufeohfcrwkhqisxt.supabase.co', // Add your Supabase domain
        pathname: '/storage/v1/object/public/**', // Optional: Restrict to specific paths
      },
    ],
  },
};

export default nextConfig;
