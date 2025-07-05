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
  webpack: (config, { isServer }) => {
    // Solo aplica esta regla para el bundle del cliente (no es un servidor)
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Reemplaza '@supabase/node-fetch' con un mock vacío o el fetch nativo del navegador
        // Esto evita que el módulo sea incluido en el bundle del cliente.
        "@supabase/node-fetch": false, // O simplemente un mock vacío si fuera necesario
        // Aunque `false` suele ser suficiente para eliminarlo.
      };
    }
    return config;
  },
};

export default nextConfig;
