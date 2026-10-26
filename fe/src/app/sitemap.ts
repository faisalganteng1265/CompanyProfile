import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/tentang",
    "/produk",
    "/distribusi",
    "/kontak",
    ...products.map((p) => `/produk/${p.slug}`),
  ].map((path) => ({
    url: `https://tatsuobeef.co.id${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/produk/") ? 0.6 : 0.8,
  }));
}
