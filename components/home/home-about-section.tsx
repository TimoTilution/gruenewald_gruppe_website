"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import {
  CompanyMilestoneInline,
  CompanyMilestoneRail,
} from "@/components/home/company-milestone-rail";
import { SectionShell } from "@/components/section-shell";

const groupHighlights = [
  {
    title: "Familiengeführt",
    description: "Gewachsene Unternehmensgruppe im Bau- und Ausbaugewerbe.",
  },
  {
    title: "Bundesweit aktiv",
    description: "Zentrale in Scheden, Projekte in ganz Deutschland.",
  },
  {
    title: "Spezialisierte Teams",
    description: "Klare Zuständigkeiten für private, gewerbliche und öffentliche Bauprojekte.",
  },
];

export function HomeAboutSection() {
  const pathname = usePathname();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isClayImageOpen, setIsClayImageOpen] = useState(false);
  const isTilutionPage = pathname === "/tilution";
  const isGruenewaldPage = pathname === "/gruenewald";
  const isClayPage = pathname === "/clay-construction";

  useEffect(() => {
    if (!isMapOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMapOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("site-overlay-open");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("site-overlay-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMapOpen]);

  useEffect(() => {
    if (!isClayImageOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsClayImageOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("site-overlay-open");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("site-overlay-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isClayImageOpen]);

  if (isTilutionPage) {
    return (
      <SectionShell id="gruppe" innerClassName="relative overflow-visible">
        <section className="section-card overflow-hidden p-0">
          <video
            className="block aspect-video w-full object-cover"
            src="/videos/tilution-bad-nauheim.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Tilution Bad Nauheim Projektvideo"
          />
        </section>
      </SectionShell>
    );
  }

  if (isGruenewaldPage) {
    return (
      <SectionShell id="gruppe" innerClassName="relative overflow-visible">
        <section className="section-card overflow-hidden p-0">
          <video
            className="block h-auto w-full"
            src="/videos/gruenewald-schreib-uns-jetzt.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Einblicke bei der Grünewald GmbH"
          />
        </section>
      </SectionShell>
    );
  }

  if (isClayPage) {
    return (
      <SectionShell id="gruppe" innerClassName="relative overflow-visible">
        <section className="section-card relative overflow-hidden px-6 py-10 sm:px-9 lg:p-12">
          <div className="relative z-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-center">
            <div className="max-w-3xl">
              <p className="section-eyebrow">System und Ausführung</p>
              <h2 className="section-heading">
                Natürliche Baustoffe und technische Raumklimasysteme.
              </h2>
              <p className="section-subline">
                Clay Construction entwickelt Ausbaukonzepte, die Energieeffizienz,
                Wohlbefinden und ökologische Materialien zusammenbringen - von
                der frühen Abstimmung bis zur sauberen Umsetzung patentierter
                ArgillaTherm Lehmklimasysteme auf der Baustelle.
              </p>

              <div className="mt-8 grid gap-6 border-t border-white/12 pt-7 sm:grid-cols-3">
                {[
                  {
                    title: "Lehm",
                    description: "Speichert Wärme, reguliert Feuchte und unterstützt ein ruhiges Raumklima.",
                  },
                  {
                    title: "Klimadecken",
                    description: "Flächige Heiz- und Kühlsysteme für gleichmäßiges, zugfreies Wohlbefinden.",
                  },
                  {
                    title: "Ausführung",
                    description: "Koordinierte Montage mit Blick auf Details, Schnittstellen und Termine.",
                  },
                ].map((highlight) => (
                  <div key={highlight.title}>
                    <h3 className="text-base font-semibold text-ink sm:text-lg">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-forest-100/78">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="liquid-card overflow-hidden p-0">
              <figure className="border-b border-white/14 bg-white/94">
                <button
                  type="button"
                  onClick={() => setIsClayImageOpen(true)}
                  className="block w-full text-left transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-white/45"
                  aria-label="ArgillaTherm Aufbau in Großansicht öffnen"
                >
                  <Image
                    src="/images/clay/argillatherm-aufbau.png"
                    alt="Schematischer Aufbau eines ArgillaTherm Lehmklimasystems"
                    width={2048}
                    height={667}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 30rem, 100vw"
                  />
                </button>
              </figure>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-semibold leading-tight text-white">
                  Was macht das System besonders?
                </h3>
                <p className="mt-3 text-sm leading-7 text-forest-100/82 sm:text-base">
                  Die Module verbinden Lehm als natürlichen Speicher mit einem
                  wassergeführten Rohrsystem. So entstehen Decken- und
                  Wandflächen, die gleichmäßig heizen oder kühlen und zugleich
                  das Raumklima spürbar ausgleichen.
                </p>

                <a
                  href="https://argillatherm.de/"
                  target="_blank"
                  rel="noreferrer"
                  className="tilution-services-cta__button group mt-5"
                >
                  <span>Mehr bei ArgillaTherm</span>
                  <ArrowRight className="tilution-services-cta__button-icon" />
                </a>
              </div>
            </aside>
          </div>

          {isClayImageOpen ? (
            <div
              className="fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
              onClick={() => setIsClayImageOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="ArgillaTherm Aufbau im Großformat"
            >
              <div
                className="relative w-full max-w-[82rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsClayImageOpen(false)}
                  className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-forest-900/72 text-white transition-colors duration-200 hover:bg-forest-800"
                  aria-label="Großansicht schließen"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
                  <Image
                    src="/images/clay/argillatherm-aufbau.png"
                    alt="Schematischer Aufbau eines ArgillaTherm Lehmklimasystems im Großformat"
                    width={2048}
                    height={667}
                    className="h-auto max-h-[88vh] w-full object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="gruppe" innerClassName="relative overflow-visible">
      <section className="section-card relative overflow-hidden px-6 py-10 sm:px-9 lg:p-12">
        <div className="relative z-20 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-2xl lg:min-w-0 lg:flex-1">
            <p className="section-eyebrow">Grünewald Gruppe</p>
            <h2 className="section-heading">
              Eine Gruppe. Klare Spezialisten. Bundesweit im Einsatz.
            </h2>
            <p className="section-subline">
              Die Grünewald Gruppe bündelt spezialisierte Unternehmen für
              private, gewerbliche und öffentliche Bauprojekte - mit klaren
              Strukturen, kurzen Wegen und hoher Ausführungsqualität.
            </p>

            <div className="mt-8 grid gap-6 border-t border-white/12 pt-7 sm:grid-cols-3">
              {groupHighlights.map((highlight) => (
                <div key={highlight.title}>
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-forest-100/72">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <figure className="w-full lg:w-[22rem] lg:max-w-[22rem] lg:flex-none lg:self-start xl:w-[24rem] xl:max-w-[24rem]">
            <button
              type="button"
              onClick={() => setIsMapOpen(true)}
              className="group block w-full overflow-hidden rounded-[1.9rem] text-left transition-transform duration-300 hover:scale-[1.01]"
              aria-label="Deutschlandkarte im Großformat öffnen"
            >
              <Image
                src="/deutschland-karte.png"
                alt="Deutschlandkarte"
                width={1080}
                height={1536}
                className="h-auto w-full"
                sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 22rem, 100vw"
                priority
              />
            </button>
          </figure>
        </div>

        <CompanyMilestoneInline />

        {isMapOpen ? (
          <div
            className="fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
            onClick={() => setIsMapOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Deutschlandkarte im Großformat"
          >
            <div
              className="relative w-full max-w-[72rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-forest-900/72 text-white transition-colors duration-200 hover:bg-forest-800"
                aria-label="Großansicht schließen"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
                <Image
                  src="/deutschland-karte.png"
                  alt="Deutschlandkarte im Großformat"
                  width={1080}
                  height={1536}
                  className="h-auto max-h-[88vh] w-full object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
      {isGruenewaldPage ? null : <CompanyMilestoneRail />}
    </SectionShell>
  );
}
