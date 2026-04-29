import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";

const companies = [
  {
    href: "/tilution",
    name: "Großprojekte & Gewerbebau",
    text: "Umsetzung anspruchsvoller Fliesenarbeiten im gewerblichen und öffentlichen Bau – mit hoher Normsicherheit, klarer Schnittstellenkoordination und einer Projektabwicklung, die Termine und Qualität zuverlässig sichert.",
    logoSrc: "/logos/companies/tilution.svg",
    logoWidth: 220,
    logoFrameClassName: "relative h-16 overflow-hidden",
    logoClassName:
      "absolute left-1/2 bottom-[-0.75rem] h-24 w-auto -translate-x-1/2",
    cardClassName: "rounded-[1.75rem] p-7",
    titleClassName: "mt-4 text-2xl",
    textClassName: "mt-4 text-sm leading-7",
  },
  {
    href: "/gruenewald",
    name: "Privatkunden & Wohnen",
    text: "Hochwertige Fliesenarbeiten für Ihr Zuhause – präzise umgesetzt, sauber ausgeführt und so realisiert, dass Qualität und Wert langfristig erhalten bleiben.",
    logoSrc: "/logos/companies/gruenewald.svg",
    logoWidth: 180,
    logoFrameClassName: "flex h-16 items-center justify-center",
    logoClassName: "h-14 w-auto",
    cardClassName: "rounded-[1.75rem] p-7",
    titleClassName: "mt-4 text-2xl",
    textClassName: "mt-4 text-sm leading-7",
  },
  {
    href: "/clay-construction",
    name: "Klimadecken & Lehmbau",
    text: "Klimadecken auf Lehmbasis für nachhaltige und energieeffiziente Gebäude – intelligent integriert und so umgesetzt, dass ein konstant angenehmes Raumklima entsteht.",
    logoSrc: "/logos/companies/clay-construction.svg",
    logoWidth: 240,
    logoFrameClassName: "flex h-16 items-center justify-center",
    logoClassName: "h-[4.375rem] w-auto",
    cardClassName: "rounded-[1.75rem] p-7",
    titleClassName: "mt-4 text-2xl",
    textClassName: "mt-4 text-sm leading-7",
  },
  {
    href: "/hrw",
    name: "Personal & Kapazitäten",
    text: "Eigene Fachkräfte und flexible Personalstrukturen sorgen für eine zuverlässige Projektabwicklung – auch bei anspruchsvollen Zeitplänen und komplexen Bauvorhaben.",
    logoSrc: "/logos/companies/hrw.svg",
    logoWidth: 170,
    logoFrameClassName: "flex h-12 items-center justify-center",
    logoClassName: "h-[3.75rem] w-auto",
    cardClassName: "rounded-[1.5rem] p-5",
    titleClassName: "mt-3 text-[0.95rem]",
    textClassName: "mt-3 text-[0.75rem] leading-5",
  },
  {
    href: "/verwaltung",
    name: "Organisation & Steuerung",
    text: "Zentrale Steuerung und klare Prozesse sorgen für eine strukturierte und reibungslose Projektabwicklung – transparent, effizient und zuverlässig umgesetzt.",
    logoSrc: "/logos/companies/verwaltung.svg",
    logoWidth: 250,
    logoFrameClassName: "flex h-12 items-center justify-center",
    logoClassName: "h-[4.6875rem] w-auto",
    cardClassName: "rounded-[1.5rem] p-5",
    titleClassName: "mt-3 text-[0.95rem]",
    textClassName: "mt-3 text-[0.75rem] leading-5",
  },
];

export function HomeServicesSection() {
  return (
    <SectionShell id="leistungen">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
            Leistungen
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Leistungsschwerpunkte der einzelnen Unternehmensbereiche.
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <Link
              key={company.href}
              href={company.href}
              className={`${company.cardClassName} border text-center shadow-soft transition-transform duration-200 hover:-translate-y-1 ${
                company.href === "/hrw"
                  ? "border-slate-400 bg-slate-200 md:col-start-1 xl:col-start-1 xl:translate-x-[calc(50%+0.75rem)]"
                  : company.href === "/verwaltung"
                    ? "border-slate-400 bg-slate-200 md:col-start-2 xl:col-start-3 xl:-translate-x-[calc(50%+0.75rem)]"
                    : "border-white/40 bg-white"
              }`}
            >
              <div className={company.logoFrameClassName}>
                <Image
                  src={company.logoSrc}
                  alt={`${company.name} Logo`}
                  width={company.logoWidth}
                  height={56}
                  className={company.logoClassName}
                />
              </div>
              <h3 className={`${company.titleClassName} font-semibold text-ink`}>
                {company.name}
              </h3>
              <p className={`${company.textClassName} text-forest-800/80`}>
                {company.text}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
