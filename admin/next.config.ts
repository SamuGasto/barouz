import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hpvtetboyztyynxjyvla.supabase.co",
        pathname: "/storage/v1/object/public/productos/**",
      },
    ],
  },
};

export default nextConfig;
