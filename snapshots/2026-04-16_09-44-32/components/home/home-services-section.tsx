import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";

const companies = [
  {
    href: "/tilution",
    name: "Großprojekte & Gewerbebau",
    accentColor: "#e96b1d",
    text: "Umsetzung anspruchsvoller Fliesenarbeiten im gewerblichen und öffentlichen Bau. Mit hoher Normsicherheit, klarer Schnittstellenkoordination und strukturierter Projektabwicklung sorgen wir für termingerechte und qualitativ verlässliche Ergebnisse.",
    logoSrc: "/logos/companies/tilution.svg",
    logoWidth: 220,
    logoFrameClassName: "relative h-16 overflow-hidden",
    logoClassName:
      "absolute left-1/2 bottom-[-1.8rem] h-[7.5rem] w-auto -translate-x-1/2",
    cardClassName: "rounded-[1.75rem] p-7",
    titleClassName: "mt-4 whitespace-nowrap text-[1.18rem]",
    textClassName: "mt-4 text-sm leading-7",
  },
  {
    href: "/gruenewald",
    name: "Privatkunden & Wohnen",
    accentColor: "#3cabe2",
    text: "Hochwertige Fliesenarbeiten für Ihr Zuhause – präzise umgesetzt und sauber ausgeführt. Wir schaffen langlebige Lösungen mit Anspruch an Gestaltung, Qualität und Detail, damit Werte entstehen, die dauerhaft überzeugen.",
    logoSrc: "/logos/companies/gruenewald.svg",
    logoWidth: 180,
    logoFrameClassName: "flex h-16 items-center justify-center",
    logoClassName: "h-[4.375rem] w-auto",
    cardClassName: "rounded-[1.75rem] p-7",
    titleClassName: "mt-4 whitespace-nowrap text-[1.18rem]",
    textClassName: "mt-4 text-sm leading-7",
  },
  {
    href: "/clay-construction",
    name: "Klimadecken & Lehmbau",
    accentColor: "#cd203b",
    text: "Nachhaltige Heiz- und Kühlsysteme auf Lehmbasis für moderne Gebäude. Unsere Klimadecken sorgen für ein gleichmäßiges, angenehmes Raumklima und verbinden Energieeffizienz mit innovativer Bauweise.",
    logoSrc: "/logos/companies/clay-construction.svg",
    logoWidth: 240,
    logoFrameClassName: "flex h-16 items-center justify-center",
    logoClassName: "h-[5.46875rem] w-auto",
    cardClassName: "rounded-[1.75rem] p-7",
    titleClassName: "mt-4 whitespace-nowrap text-[1.18rem]",
    textClassName: "mt-4 text-sm leading-7",
  },
  {
    href: "/hrw",
    name: "Personal & Kapazitäten",
    accentColor: "#f39216",
    text: "Eigene Fachkräfte und flexible Personalstrukturen sichern eine zuverlässige Umsetzung Ihrer Projekte. Auch bei anspruchsvollen Zeitplänen und komplexen Anforderungen stellen wir die nötigen Kapazitäten bereit.",
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
    accentColor: "#6262a8",
    text: "Klare Prozesse und zentrale Steuerung bilden die Grundlage für eine reibungslose Projektabwicklung. Transparent, effizient und strukturiert – für Sicherheit in jeder Projektphase.",
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
            Alles aus einer Hand - unsere Leistungen im Überblick
          </h2>
          <p className="mt-3 text-base leading-7 text-forest-100/78 sm:text-lg">
            Unsere operativen und unterstützenden Bereiche im Zusammenspiel
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <Link
              key={company.href}
              href={company.href}
              className={`relative overflow-hidden ${company.cardClassName} border text-center shadow-soft transition-transform duration-200 hover:-translate-y-1 ${
                company.href === "/hrw"
                  ? "border-slate-400 bg-slate-200 md:col-start-1 xl:col-start-1 xl:translate-x-[calc(50%+0.75rem)]"
                  : company.href === "/verwaltung"
                    ? "border-slate-400 bg-slate-200 md:col-start-2 xl:col-start-3 xl:-translate-x-[calc(50%+0.75rem)]"
                    : "border-white/40 bg-white"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-16 w-16 [clip-path:polygon(0_0,100%_0,0_100%)]"
                style={{ backgroundColor: company.accentColor }}
              />
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
