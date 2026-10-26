import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  async redirects() {
    return [
      { source: "/about", destination: "/tentang", permanent: true },
      { source: "/product", destination: "/produk", permanent: true },
      { source: "/distribution", destination: "/distribusi", permanent: true },
      { source: "/elementor-134", destination: "/kontak", permanent: true },
      { source: "/contact", destination: "/kontak", permanent: true },
    ];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
