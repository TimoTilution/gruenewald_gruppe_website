import { HrwContactSection, HrwHeroSection, HrwServicesSection, HrwWhySection } from "@/components/hrw/hrw-page-sections";

export default function HrwPage() {
  return (
    <div className="verwaltung-theme hrw-theme contents">
      <HrwHeroSection />
      <HrwServicesSection />
      <HrwWhySection />
      <HrwContactSection />
    </div>
  );
}
