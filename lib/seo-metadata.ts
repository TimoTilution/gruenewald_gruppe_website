import type { Metadata } from "next";
import { siteBaseUrl } from "@/data/site-architecture";
import { withTrailingSlash } from "@/lib/site-path";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function getCanonicalUrl(path: string) {
  return path === "/"
    ? `${siteBaseUrl}/`
    : `${siteBaseUrl}${withTrailingSlash(path)}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Grünewald Gruppe",
      locale: "de_DE",
      type: "website",
    },
  };
}
