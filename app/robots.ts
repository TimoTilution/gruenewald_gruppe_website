import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/data/site-architecture";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-User",
          "Google-Extended",
          "PerplexityBot",
          "Bytespider",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteBaseUrl}/sitemap.xml`,
  };
}
