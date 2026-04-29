import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

type CompanyCard = {
  href: string;
  name: string;
  accentColor: string;
  text: string;
  logoSrc: string;
  logoWidth: number;
  logoFrameClassName: string;
  logoClassName: string;
  buttonLabel: string;
  cardTone: string;
  isSupporting?: boolean;
};

const companies: CompanyCard[] = [
  {
    href: "/tilution",
    name: "Großprojekte & Gewerbebau",
    accentColor: "#e96b1d",
    text: "Fliesenarbeiten für gewerbliche und öffentliche Bauvorhaben.",
    logoSrc: "/logos/companies/tilution.svg",
    logoWidth: 220,
    logoFrameClassName: "relative flex h-20 items-center justify-center overflow-hidden",
    logoClassName:
      "absolute left-1/2 bottom-[-1.55rem] h-[7.1rem] w-auto -translate-x-1/2",
    buttonLabel: "Zu Tilution",
    cardTone: "border-white/40 bg-white",
  },
  {
    href: "/gruenewald",
    name: "Privatkunden & Wohnen",
    accentColor: "#3cabe2",
    text: "Hochwertige Fliesenarbeiten für Bad, Wohnen und Innenräume.",
    logoSrc: "/logos/companies/gruenewald.svg",
    logoWidth: 180,
    logoFrameClassName: "flex h-20 items-center justify-center",
    logoClassName: "h-[4.35rem] w-auto",
    buttonLabel: "Zur Grünewald GmbH",
    cardTone: "border-white/40 bg-white",
  },
  {
    href: "/clay-construction",
    name: "Klimadecken & Lehmbau",
    accentColor: "#cd203b",
    text: "Nachhaltige Heiz- und Kühlsysteme für moderne Gebäude.",
    logoSrc: "/logos/companies/clay-construction.svg",
    logoWidth: 240,
    logoFrameClassName: "flex h-20 items-center justify-center",
    logoClassName: "h-[5rem] w-auto",
    buttonLabel: "Zu Clay Construction",
    cardTone: "border-white/40 bg-white",
  },
  {
    href: "/hrw",
    name: "Personal & Kapazitäten",
    accentColor: "#f39216",
    text: "Fachkräfte und flexible Personalstrukturen für zuverlässige Projektabläufe.",
    logoSrc: "/logos/companies/hrw.svg",
    logoWidth: 170,
    logoFrameClassName: "flex h-20 items-center justify-center",
    logoClassName: "h-[3.8rem] w-auto",
    buttonLabel: "Zu HRW",
    cardTone:
      "border-slate-400 bg-slate-200 md:col-start-1 xl:col-start-1 xl:translate-x-[calc(50%+0.75rem)]",
    isSupporting: true,
  },
  {
    href: "/verwaltung",
    name: "Organisation & Steuerung",
    accentColor: "#6262a8",
    text: "Zentrale Prozesse und strukturierte Abläufe für sichere Projektumsetzung.",
    logoSrc: "/logos/companies/verwaltung.svg",
    logoWidth: 250,
    logoFrameClassName: "flex h-20 items-center justify-center",
    logoClassName: "h-[4.4rem] w-auto",
    buttonLabel: "Zur Verwaltung",
    cardTone:
      "border-slate-400 bg-slate-200 md:col-start-2 xl:col-start-3 xl:-translate-x-[calc(50%+0.75rem)]",
    isSupporting: true,
  },
];

function ServiceButton({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center gap-2.5 self-center rounded-full font-semibold transition-all duration-300",
        compact ? "px-3.5 py-2 text-[0.84rem]" : "px-4 py-2.5 text-sm",
        "border border-forest-900/15 text-white",
        "bg-[radial-gradient(circle_at_18%_35%,rgba(86,112,188,0.38)_0%,rgba(86,112,188,0)_32%),linear-gradient(90deg,rgba(24,41,86,0.98)_0%,rgba(24,41,86,0.88)_44%,rgba(24,41,86,0.68)_100%)]",
        "shadow-[0_12px_28px_rgba(24,41,86,0.18)]",
        "group-hover:border-forest-900/25 group-hover:bg-[radial-gradient(circle_at_18%_35%,rgba(108,138,221,0.46)_0%,rgba(108,138,221,0)_34%),linear-gradient(90deg,rgba(24,41,86,1)_0%,rgba(24,41,86,0.92)_46%,rgba(24,41,86,0.76)_100%)] group-hover:shadow-[0_16px_34px_rgba(24,41,86,0.26)]",
      ].join(" ")}
    >
      <span>{label}</span>
      <ArrowRight
        className={`${compact ? "h-3.5 w-3.5" : "h-4 w-4"} stroke-[2.25] transition-transform duration-300 group-hover:translate-x-0.5`}
      />
    </span>
  );
}

export function HomeServicesSection() {
  return (
    <SectionShell id="leistungen">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
            Leistungen
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Alles aus einer Hand - unsere Leistungen im Überblick
          </h2>
          <p className="mt-3 text-base leading-7 text-forest-100/78 sm:text-lg">
            Unsere operativen und unterstützenden Bereiche im Zusammenspiel
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => {
            const isSupporting = company.isSupporting ?? false;

            return (
              <Link
                key={company.href}
                href={company.href}
                className={`group relative flex h-full flex-col overflow-hidden ${company.cardTone} rounded-[1.75rem] border text-center shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(7,18,48,0.18)] ${
                  isSupporting
                    ? "p-4 sm:px-5 sm:pb-3 sm:pt-3"
                    : "p-6 sm:px-7 sm:pb-6 sm:pt-6"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`${isSupporting ? "h-14 w-14" : "h-16 w-16"} absolute left-0 top-0 [clip-path:polygon(0_0,100%_0,0_100%)]`}
                  style={{
                    backgroundImage: `radial-gradient(circle at 18% 35%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 32%), linear-gradient(90deg, ${company.accentColor} 0%, ${company.accentColor}DD 45%, ${company.accentColor}99 100%)`,
                  }}
                />

                <div className={`${company.logoFrameClassName} shrink-0 ${isSupporting ? "-mt-1 -mb-2" : ""}`}>
                  <Image
                    src={company.logoSrc}
                    alt={`${company.name} Logo`}
                    width={company.logoWidth}
                    height={56}
                    className={company.logoClassName}
                  />
                </div>

                <div
                  className={`flex flex-1 flex-col ${
                    isSupporting
                      ? "mt-2 min-h-[5.2rem] justify-start"
                      : "relative top-6 min-h-[10.4rem] justify-start"
                  }`}
                >
                  <h3
                  className={`font-semibold leading-[1.2] tracking-[-0.015em] text-forest-900 ${
                      isSupporting
                        ? "min-h-[2.25rem] text-[0.94rem] sm:text-[0.98rem]"
                        : "min-h-[2.75rem] text-[1.05rem] sm:text-[1.1rem]"
                    } ${company.name === "Klimadecken & Lehmbau" ? "whitespace-nowrap" : ""}`}
                  >
                    {company.name}
                  </h3>
                  <p
                    className={`self-center text-forest-900/80 ${
                      isSupporting
                        ? "mt-1.5 w-[90%] max-w-none text-[0.72rem] leading-[1.125rem]"
                        : "mt-0 max-w-[28ch] text-[0.95rem] leading-7"
                    }`}
                  >
                    {company.text}
                  </p>
                </div>

                <div className={isSupporting ? "mt-3" : "-mt-2"}>
                  <ServiceButton
                    label={company.buttonLabel}
                    compact={isSupporting}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SectionShell>
  );
}
