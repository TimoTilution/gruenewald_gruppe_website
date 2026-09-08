import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";
import { getCmsTeamData } from "@/lib/sanity/team";

export default async function VerwaltungPage() {
  const teamData = await getCmsTeamData("verwaltung");

  return (
    <div className="verwaltung-theme contents">
      <HomeHeroSection variant="verwaltung" />
      <TilutionServicesSection variant="verwaltung" />
      <HomeTeamSection variant="verwaltung" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
