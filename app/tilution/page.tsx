import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";

export default function TilutionPage() {
  return (
    <div className="tilution-theme contents">
      <HomeHeroSection variant="tilution" />
      <TilutionServicesSection />
      <HomeAboutSection />
      <HomeReferencesSection />
      <HomeTeamSection />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
