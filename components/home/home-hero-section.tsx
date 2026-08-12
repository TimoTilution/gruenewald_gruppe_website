import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

const heroActions = [
  {
    href: "/tilution",
    label: "Geschäftskunde",
    panelClassName: "",
    logoSrc: "/logos/companies/tilution.svg",
    logoWidth: 220,
    logoClassName:
      "absolute left-1/2 bottom-[-1.75rem] h-40 w-auto -translate-x-1/2 sm:bottom-[-2.25rem] sm:h-48",
  },
  {
    href: "/gruenewald",
    label: "Privatkunde",
    panelClassName: "",
    logoSrc: "/logos/companies/gruenewald.svg",
    logoWidth: 180,
    logoClassName:
      "absolute bottom-4 left-1/2 h-24 w-auto -translate-x-1/2 sm:bottom-5 sm:h-[7.2rem]",
  },
  {
    href: "/clay-construction",
    label: "Klimadecken",
    panelClassName: "",
    logoSrc: "/logos/companies/clay-construction.svg",
    logoWidth: 240,
    logoClassName:
      "absolute bottom-[-6px] left-1/2 h-28 w-auto -translate-x-1/2 sm:bottom-[-4px] sm:h-[8.4rem]",
  },
];

function HeroButton({ label }: { label: string }) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center gap-2.5 self-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
        "border border-forest-900/15 text-white",
        "bg-[radial-gradient(circle_at_18%_35%,rgba(86,112,188,0.38)_0%,rgba(86,112,188,0)_32%),linear-gradient(90deg,rgba(24,41,86,0.98)_0%,rgba(24,41,86,0.88)_44%,rgba(24,41,86,0.68)_100%)]",
        "shadow-[0_12px_28px_rgba(24,41,86,0.18)]",
        "group-hover:border-forest-900/25 group-hover:bg-[radial-gradient(circle_at_18%_35%,rgba(108,138,221,0.46)_0%,rgba(108,138,221,0)_34%),linear-gradient(90deg,rgba(24,41,86,1)_0%,rgba(24,41,86,0.92)_46%,rgba(24,41,86,0.76)_100%)] group-hover:shadow-[0_16px_34px_rgba(24,41,86,0.26)]",
      ].join(" ")}
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 stroke-[2.25] transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  );
}

const tilutionProofPoints = ["Terminsicher", "Präzise", "Deutschlandweit"];
const gruenewaldProofPoints = ["Persönlich", "Hochwertig", "Aus einer Hand"];
const hrwProofPoints = ["Flexibel", "Erfahren", "Zuverlässig"];
const verwaltungProofPoints = [
  "Servicebereiche",
  "Interne Funktionen",
  "Gruppenweite Informationen",
];
const clayProofPoints = ["Nachhaltig", "Regulierend", "Energieeffizient"];

type HomeHeroSectionProps = {
  variant?: "group" | "tilution" | "gruenewald" | "verwaltung" | "hrw" | "clay";
};

export function HomeHeroSection({ variant = "group" }: HomeHeroSectionProps) {
  if (variant === "clay") {
    return (
      <SectionShell id="hero">
        <section
          className="relative isolate w-[calc(100vw-2.5rem)] max-w-full overflow-hidden rounded-[2.75rem] border border-white/10 px-6 py-12 text-porcelain shadow-premium sm:w-full sm:px-9 lg:px-14 lg:py-20"
        >
          <Image
            src="/images/clay/clay-hero-lehmklimasystem.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1320px) 1240px, calc(100vw - 40px)"
            className="-z-20 object-cover"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 sm:hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(48, 14, 22, 0.9) 0%, rgba(48, 14, 22, 0.78) 56%, rgba(48, 14, 22, 0.54) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 hidden sm:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(48, 14, 22, 0.82) 0%, rgba(48, 14, 22, 0.6) 48%, rgba(48, 14, 22, 0.2) 100%)",
            }}
          />

          <div className="relative z-10 max-w-[18.5rem] sm:max-w-5xl">
            <p
              className="section-eyebrow"
              style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.55)" }}
            >
              Clay Construction
            </p>
            <h1
              className="mt-6 max-w-full text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:max-w-[26ch] sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.38)" }}
            >
              Klimadecken und Lehmbau für moderne, gesunde Gebäude.
            </h1>
            <p
              className="mt-6 max-w-full break-words text-base font-semibold leading-8 text-white/86 sm:max-w-4xl sm:text-lg"
              style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.55)" }}
            >
              Als spezialisierter Montagepartner realisieren wir patentierte
              ArgillaTherm Lehmklimasysteme für Neubau, Sanierung und
              anspruchsvolle Innenräume.
            </p>
          </div>

          <div className="relative z-10 mt-12 grid max-w-[18.5rem] min-w-0 gap-4 sm:max-w-none sm:grid-cols-3">
            {clayProofPoints.map((point) => (
              <div
                key={point}
                className="liquid-card-dark flex min-h-20 items-center justify-center gap-3 rounded-[1.35rem] px-5 py-4 text-center text-white"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <Check className="h-4.5 w-4.5 stroke-[2.4]" />
                </span>
                <span className="text-base font-semibold sm:text-lg">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </section>
      </SectionShell>
    );
  }

  if (variant === "tilution" || variant === "gruenewald" || variant === "verwaltung" || variant === "hrw") {
    const isHrw = variant === "hrw";
    const isGruenewald = variant === "gruenewald";
    const isVerwaltung = variant === "verwaltung";
    const proofPoints = isGruenewald
      ? gruenewaldProofPoints
      : isHrw
      ? hrwProofPoints
      : isVerwaltung
        ? verwaltungProofPoints
        : tilutionProofPoints;
    const eyebrow = isGruenewald ? "Grünewald – planen bauen leben" : isHrw ? "HRW" : isVerwaltung ? "Verwaltung" : "Tilution";
    const title = isGruenewald
      ? "Planen, bauen und leben – mit Qualität bis ins Detail."
      : isHrw
      ? "Spezialisierte Leistungen unter eigener Marke."
      : isVerwaltung
        ? "Zentrale Steuerung für die gesamte Gruppe."
        : "Ihr Partner für Fliesenarbeiten bei anspruchsvollen Großprojekten.";
    const description = isGruenewald
      ? "Wir begleiten private Bauvorhaben von der ersten Idee bis zur hochwertigen Ausführung – persönlich, verlässlich und mit einem klaren Blick für Materialien, Funktion und Gestaltung."
      : isHrw
      ? "Die HRW-Seite steht als sauberer Einstiegspunkt bereit und kann künftig detaillierte Informationen zu Angebot, Referenzen und Ansprechpartnern aufnehmen."
      : isVerwaltung
        ? "Die Verwaltungsseite bildet die organisatorische Ebene ab und eignet sich als Platzhalter für Servicebereiche, interne Funktionen oder gruppenweite Informationen."
        : "Als Fachbetrieb im Objektbau realisieren wir Fliesen- und Plattenarbeiten für Schwimmbäder, Hotels, Kliniken, Großküchen, öffentliche Einrichtungen und gewerbliche Bauprojekte.";

    return (
      <SectionShell id="hero">
        <section
          className="relative isolate w-[calc(100vw-2.5rem)] max-w-full overflow-hidden rounded-[2.75rem] border border-white/10 px-6 py-12 text-porcelain shadow-premium sm:w-full sm:px-9 lg:px-14 lg:py-20"
        >
          <Image
            src={
              isVerwaltung
                ? "/images/verwaltung/verwaltung-hero.png"
                : isGruenewald
                  ? "/images/gruenewald-hero-badezimmer.png"
                : "/hero-start.jpg"
            }
            alt=""
            fill
            priority
            sizes="(min-width: 1320px) 1240px, calc(100vw - 40px)"
            className="-z-20 object-cover"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 hidden sm:block"
            style={{
              background:
                "radial-gradient(circle at 12% 14%, rgba(20, 24, 34, 0.34) 0%, rgba(20, 24, 34, 0.18) 24%, rgba(20, 24, 34, 0) 48%), linear-gradient(90deg, rgba(20, 24, 34, 0.78) 0%, rgba(20, 24, 34, 0.52) 45%, rgba(20, 24, 34, 0.16) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 sm:hidden"
            style={{
              background:
                "radial-gradient(circle at 18% 12%, rgba(20, 24, 34, 0.42) 0%, rgba(20, 24, 34, 0.24) 30%, rgba(20, 24, 34, 0) 58%), linear-gradient(90deg, rgba(20, 24, 34, 0.84) 0%, rgba(20, 24, 34, 0.66) 56%, rgba(20, 24, 34, 0.38) 100%)",
            }}
          />

          <div className="shared-company-hero__content relative z-10 max-w-full min-w-0 sm:max-w-5xl">
            <p
              className="section-eyebrow"
              style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.58)" }}
            >
              {eyebrow}
            </p>
            <h1
              className="shared-company-hero__title mt-6 max-w-full text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:max-w-[26ch] sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.42)" }}
            >
              {title}
            </h1>
            {!isVerwaltung ? <p
              className="shared-company-hero__description mt-6 max-w-full text-base font-semibold leading-8 text-white/86 sm:max-w-4xl sm:text-lg"
              style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.58)" }}
            >
              {description}
            </p> : null}
          </div>

          <div className="relative z-10 mt-12 grid max-w-full min-w-0 gap-4 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="liquid-card-dark flex min-h-20 min-w-0 items-center justify-center gap-3 rounded-[1.35rem] px-5 py-4 text-center text-white"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <Check className="h-4.5 w-4.5 stroke-[2.4]" />
                </span>
                <span className="min-w-0 text-base font-semibold [overflow-wrap:anywhere] sm:text-lg">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </section>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="hero">
      <section
        className="overflow-hidden rounded-[2.75rem] border border-white/10 px-6 py-12 text-porcelain shadow-premium sm:px-9 lg:px-14 lg:py-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(14, 25, 55, 0.52) 0%, rgba(24, 41, 86, 0.44) 42%, rgba(14, 25, 55, 0.7) 100%), url('/hero-start.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl">
          <p className="section-eyebrow">Grünewald Gruppe</p>
          <h1 className="mt-6 max-w-[24ch] text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Spezialisierte Lösungen für anspruchsvolle Bauprojekte.
          </h1>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {heroActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`liquid-card group flex flex-col px-6 py-5 text-center text-ink ${action.panelClassName}`}
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
              <div className="mt-6 flex justify-center">
                <HeroButton label={action.label} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
