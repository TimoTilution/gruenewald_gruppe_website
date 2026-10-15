import type { Metadata } from "next";
import { ClayServicesSection } from "@/components/clay/clay-services-section";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { getCmsTeamData } from "@/lib/sanity/team";
import { createPageMetadata } from "@/lib/seo-metadata";
import { StructuredData } from "@/components/structured-data";
import { createCompanyOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Clay Construction – Lehm-Klimadecken",
  description:
    "Clay Construction verbindet natürliche Lehmbaustoffe mit moderner Heiz- und Kühltechnik für nachhaltige, behagliche Gebäude.",
  path: "/clay-construction",
});

export default async function ClayConstructionPage() {
  const teamData = await getCmsTeamData("clay");

  return (
    <div className="clay-theme contents">
      <StructuredData data={createCompanyOrganizationSchema("clay-construction")} />
      <HomeHeroSection variant="clay" />
      <ClayServicesSection />
      <HomeReferencesSection />
      <HomeAboutSection />
      <HomeTeamSection variant="clay" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
