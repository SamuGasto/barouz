import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      new URL(
        "https://hpvtetboyztyynxjyvla.supabase.co/storage/v1/object/public/**"
      ),
    ],
  },
};

export default nextConfig;
