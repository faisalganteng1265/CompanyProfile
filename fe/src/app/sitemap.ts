import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tatsuobeef.co.id",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://tatsuobeef.co.id/produk",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://tatsuobeef.co.id/distribusi",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://tatsuobeef.co.id/tentang",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products.map(({ slug }) => ({
      url: `https://tatsuobeef.co.id/produk/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
