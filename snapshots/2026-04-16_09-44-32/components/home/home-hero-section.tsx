import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";

const heroActions = [
  {
    href: "/tilution",
    label: "Geschäftskunde",
    panelClassName: "bg-white/70",
    logoSrc: "/logos/companies/tilution.svg",
    logoWidth: 220,
    logoClassName:
      "absolute left-1/2 bottom-[-1.75rem] h-40 w-auto -translate-x-1/2 sm:bottom-[-2.25rem] sm:h-48",
    icon: "→",
    iconWrapperClassName:
      "inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/20 bg-white text-lg text-forest-900",
  },
  {
    href: "/gruenewald",
    label: "Privatkunde",
    panelClassName: "bg-white/70",
    logoSrc: "/logos/companies/gruenewald.svg",
    logoWidth: 180,
    logoClassName:
      "absolute bottom-4 left-1/2 h-24 w-auto -translate-x-1/2 sm:bottom-5 sm:h-[7.2rem]",
    icon: "↗",
    iconWrapperClassName:
      "inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-lg text-white",
  },
  {
    href: "/clay-construction",
    label: "Klimadecken",
    panelClassName: "bg-white/70",
    logoSrc: "/logos/companies/clay-construction.svg",
    logoWidth: 240,
    logoClassName:
      "absolute bottom-[-6px] left-1/2 h-28 w-auto -translate-x-1/2 sm:bottom-[-4px] sm:h-[8.4rem]",
    icon: "+",
    iconWrapperClassName:
      "inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-100 text-xl font-semibold text-forest-900",
  },
];

export function HomeHeroSection() {
  return (
    <SectionShell id="hero">
      <section
        className="overflow-hidden rounded-[2.25rem] px-6 py-10 text-white shadow-soft sm:px-8 lg:px-12 lg:py-16"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(24, 41, 86, 0.46) 0%, rgba(24, 41, 86, 0.56) 100%), url('/hero-start.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-forest-100/75">
            Grünewald Gruppe
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Spezialisierte Lösungen für anspruchsvolle Bauprojekte.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-forest-100/85">
            Vom privaten Bauvorhaben bis zum komplexen Großprojekt bündeln wir
            Fachkompetenz in spezialisierten Unternehmen.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {heroActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`group rounded-[1.75rem] border border-white/25 px-6 py-4 text-center text-ink shadow-soft transition-all duration-200 hover:-translate-y-1 ${action.panelClassName}`}
            >
              <div className="relative min-h-[8rem] overflow-hidden sm:min-h-[9rem]">
                <Image
                  src={action.logoSrc}
                  alt={`${action.label} Logo`}
                  width={action.logoWidth}
                  height={48}
                  className={action.logoClassName}
                />
              </div>
              <div className="mt-2 flex items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold">{action.label}</h2>
                <span className={action.iconWrapperClassName}>{action.icon}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
