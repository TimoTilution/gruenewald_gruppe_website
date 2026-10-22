import {
  companies,
  getCompanyPath,
  getReferencePath,
  siteBaseUrl,
  type CompanySlug,
  type ReferenceEntry,
  type ServiceEntry,
} from "@/data/site-architecture";
import { withTrailingSlash } from "@/lib/site-path";

type BreadcrumbItem = { name: string; path: string };

const companySchemaNames: Record<CompanySlug, string> = {
  tilution: "Tilution GmbH",
  gruenewald: "Grünewald GmbH",
  "clay-construction": "Clay Construction GmbH",
  verwaltung: "Grünewald Verwaltung GmbH",
  hrw: "HRW GmbH",
};

const companyLogos: Record<CompanySlug, string> = {
  tilution: "/logos-optimized/companies/tilution.svg.webp",
  gruenewald: "/logos-optimized/companies/gruenewald.svg.webp",
  "clay-construction": "/logos-optimized/companies/clay-construction.svg.webp",
  verwaltung: "/logos-optimized/companies/verwaltung.svg.webp",
  hrw: "/logos-optimized/companies/hrw.svg.webp",
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(path: string) {
  return path === "/"
    ? `${siteBaseUrl}/`
    : `${siteBaseUrl}${withTrailingSlash(path)}`;
}

export function getCompanySchemaId(company: CompanySlug) {
  return `${canonicalUrl(getCompanyPath(company))}#organization`;
}

export function createCompanyOrganizationSchema(company: CompanySlug) {
  const info = companies[company];
  const url = canonicalUrl(info.basePath);

  return {
    "@type": "Organization",
    "@id": getCompanySchemaId(company),
    name: companySchemaNames[company],
    url,
    logo: absoluteUrl(companyLogos[company]),
    description: info.description,
    ...(company === "gruenewald" ? { telephone: "+49 5546 608" } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quantzstraße 67",
      postalCode: "37127",
      addressLocality: "Scheden",
      addressCountry: "DE",
    },
    parentOrganization: { "@id": `${siteBaseUrl}/#organization` },
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  const pageUrl = canonicalUrl(items.at(-1)?.path ?? "/");
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function createServiceSchema(service: ServiceEntry, path: string) {
  const url = canonicalUrl(path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    provider: { "@id": getCompanySchemaId(service.company) },
    areaServed: { "@type": "Country", name: "Deutschland" },
  };
}

export function createReferenceSchema(reference: ReferenceEntry) {
  const path = getReferencePath(reference);
  const url = canonicalUrl(path);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: reference.title,
    headline: reference.title,
    description: reference.description,
    url,
    image: reference.images.map((image) => absoluteUrl(image.src)),
    about: reference.categoryTitle,
    creator: { "@id": getCompanySchemaId(reference.company) },
    inLanguage: "de-DE",
  };
}

export function createProfilePageSchema({
  canonicalPath,
  name,
  role,
  company,
  imageSrc,
}: {
  canonicalPath: string;
  name: string;
  role: string;
  company?: CompanySlug;
  imageSrc?: string;
}) {
  const url = canonicalUrl(canonicalPath);
  return {
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#person`,
      name,
      jobTitle: role,
      ...(imageSrc ? { image: absoluteUrl(imageSrc) } : {}),
      ...(company
        ? { worksFor: { "@id": getCompanySchemaId(company) } }
        : { worksFor: { "@id": `${siteBaseUrl}/#organization` } }),
    },
  };
}

export function createSprudelhofVideoSchema() {
  const pageUrl = canonicalUrl("/tilution/einblicke");
  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#sprudelhof-video`,
    name: "Einblick in die Sprudelhof Therme Bad Nauheim",
    description:
      "Videoeinblick in die Fliesen- und Betonwerksteinarbeiten der Tilution in der Sprudelhof Therme Bad Nauheim.",
    thumbnailUrl: absoluteUrl("/images/tilution/sprudelhof-therme-video-poster.webp"),
    contentUrl: absoluteUrl("/videos/tilution-bad-nauheim.mp4"),
    embedUrl: `${pageUrl}#einblicke-video`,
    publisher: { "@id": getCompanySchemaId("tilution") },
    inLanguage: "de-DE",
  };
}
