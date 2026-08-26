import type { MetadataRoute } from "next";
import { getAllSeoPaths, siteBaseUrl } from "@/data/site-architecture";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-26");

  return [
    {
      url: siteBaseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteBaseUrl}/tilution`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/gruenewald`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/clay-construction`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/hrw`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteBaseUrl}/verwaltung`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getAllSeoPaths().map((path) => ({
      url: `${siteBaseUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path.split("/").length > 4 ? 0.55 : 0.7,
    })),
  ];
}
