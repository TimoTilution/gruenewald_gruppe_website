import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";

export default function VerwaltungPage() {
  return (
    <div className="verwaltung-theme contents">
      <HomeHeroSection variant="verwaltung" />
      <TilutionServicesSection />
      <HomeTeamSection />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
