import type { Metadata } from "next";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { GruenewaldContactSection } from "@/components/gruenewald/gruenewald-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { GruenewaldReferencesSection } from "@/components/gruenewald/gruenewald-references-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";
import { createPageMetadata } from "@/lib/seo-metadata";
import { StructuredData } from "@/components/structured-data";
import { createCompanyOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Badsanierung & Fliesenarbeiten – Grünewald",
  description:
    "Die Grünewald GmbH plant und realisiert Badsanierungen, Fliesenarbeiten, Außengestaltung sowie Haus- und Wohnsanierungen.",
  path: "/gruenewaldgmbh",
});

export default function GruenewaldPage() {
  return (
    <div className="tilution-theme gruenewald-theme contents">
      <StructuredData data={createCompanyOrganizationSchema("gruenewald")} />
      <HomeHeroSection variant="gruenewald" />
      <TilutionServicesSection variant="gruenewald" />
      <GruenewaldReferencesSection />
      <HomeAboutSection />
      <HomeCareerSection />
      <GruenewaldContactSection />
    </div>
  );
}
