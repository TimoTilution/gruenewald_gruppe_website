import type { Metadata } from "next";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeInnovationsSection } from "@/components/home/home-innovations-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";
import { getCmsTeamData } from "@/lib/sanity/team";
import { createPageMetadata } from "@/lib/seo-metadata";
import { StructuredData } from "@/components/structured-data";
import { createCompanyOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Tilution – Fliesenarbeiten für Großprojekte",
  description:
    "Tilution realisiert anspruchsvolle Fliesen- und Plattenarbeiten für Schwimmbäder, Hotels, Kliniken, öffentliche Einrichtungen und Großprojekte.",
  path: "/tilution",
});

export default async function TilutionPage() {
  const teamData = await getCmsTeamData("tilution");

  return (
    <div className="tilution-theme contents">
      <StructuredData data={createCompanyOrganizationSchema("tilution")} />
      <HomeHeroSection variant="tilution" />
      <TilutionServicesSection />
      <HomeReferencesSection />
      <HomeAboutSection />
      <HomeInnovationsSection />
      <HomeTeamSection variant="tilution" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
