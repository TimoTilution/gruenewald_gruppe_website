import { ClayServicesSection } from "@/components/clay/clay-services-section";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { getCmsTeamData } from "@/lib/sanity/team";

export default async function ClayConstructionPage() {
  const teamData = await getCmsTeamData("clay");

  return (
    <div className="clay-theme contents">
      <HomeHeroSection variant="clay" />
      <ClayServicesSection />
      <HomeAboutSection />
      <HomeReferencesSection />
      <HomeTeamSection variant="clay" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
