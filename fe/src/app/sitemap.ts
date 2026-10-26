import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tatsuobeef.co.id",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
