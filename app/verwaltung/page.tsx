import type { Metadata } from "next";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";
import { getCmsTeamData } from "@/lib/sanity/team";
import { createPageMetadata } from "@/lib/seo-metadata";
import { StructuredData } from "@/components/structured-data";
import { createCompanyOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Grünewald Verwaltung – Zentrale Unternehmensservices",
  description:
    "Die Grünewald Verwaltung bündelt Organisation, kaufmännische Steuerung und zentrale Services für die Unternehmen der Grünewald Gruppe.",
  path: "/verwaltung",
});

export default async function VerwaltungPage() {
  const teamData = await getCmsTeamData("verwaltung");

  return (
    <div className="verwaltung-theme contents">
      <StructuredData data={createCompanyOrganizationSchema("verwaltung")} />
      <HomeHeroSection variant="verwaltung" />
      <TilutionServicesSection variant="verwaltung" />
      <HomeTeamSection variant="verwaltung" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
