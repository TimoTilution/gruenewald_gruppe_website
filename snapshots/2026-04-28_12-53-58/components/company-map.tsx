"use client";

import dynamic from "next/dynamic";

type CompanyMapProps = {
  center: [number, number];
  markerPosition?: [number, number];
  zoom?: number;
  mobileZoom?: number;
  titleLines: string[];
  addressLines: string[];
  note?: string;
};

const CompanyMapClient = dynamic(
  () =>
    import("./company-map-client").then((mod) => ({
      default: mod.CompanyMapClient,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="liquid-card-dark rounded-[1.9rem]">
        <div className="h-[22rem] w-full animate-pulse bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.16)_100%)] sm:h-[26rem] lg:h-[30rem] xl:h-[34rem]" />
      </div>
    ),
  }
);

export function CompanyMap(props: CompanyMapProps) {
  return <CompanyMapClient {...props} />;
}
