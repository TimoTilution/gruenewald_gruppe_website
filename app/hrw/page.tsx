import { HrwContactSection, HrwHeroSection, HrwServicesSection, HrwWhySection } from "@/components/hrw/hrw-page-sections";
import { HomeCareerSection } from "@/components/home/home-career-section";

export default function HrwPage() {
  return (
    <div className="verwaltung-theme hrw-theme contents">
      <HrwHeroSection />
      <HrwServicesSection />
      <HrwWhySection />
      <HomeCareerSection />
      <HrwContactSection />
    </div>
  );
}
