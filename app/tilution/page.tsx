import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeInnovationsSection } from "@/components/home/home-innovations-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";
import { getCmsTeamData } from "@/lib/sanity/team";

export default async function TilutionPage() {
  const teamData = await getCmsTeamData("tilution");

  return (
    <div className="tilution-theme contents">
      <HomeHeroSection variant="tilution" />
      <TilutionServicesSection />
      <HomeAboutSection />
      <HomeReferencesSection />
      <HomeInnovationsSection />
      <HomeTeamSection variant="tilution" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
