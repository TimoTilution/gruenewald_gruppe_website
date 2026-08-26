"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, HardHat, SwatchBook, Wrench, X } from "lucide-react";
import {
  CompanyMilestoneInline,
  CompanyMilestoneRail,
} from "@/components/home/company-milestone-rail";
import { SectionShell } from "@/components/section-shell";

const groupUsps = [
  {
    title: "Technische Expertise",
    description:
      "Unsere Projekte leben von Menschen, die ihr Handwerk verstehen. Mit erfahrenen Fachkräften, technischem Know-how und einem hohen Qualitätsanspruch finden wir auch für anspruchsvolle Aufgaben die passende Lösung. Dabei verbinden wir langjährige Erfahrung mit modernen Verfahren und einem Blick fürs Detail - von der Planung bis zur fachgerechten Umsetzung.",
    icon: HardHat,
  },
  {
    title: "Moderne Werkzeuge & Technik",
    description:
      "Gute Arbeit braucht die richtige Ausstattung. Deshalb setzen wir auf professionelle Werkzeuge, moderne Maschinen und zeitgemäße Verarbeitungstechniken. Das ermöglicht uns, präzise, effizient und zuverlässig zu arbeiten - auch bei komplexen Anforderungen, besonderen Formaten oder technisch anspruchsvollen Projekten.",
    icon: Wrench,
  },
  {
    title: "Produktexpertise & Auswahl",
    description:
      "Wir denken nicht vom Produkt, sondern vom Projekt aus. Dank unseres breiten Hersteller- und Lieferantennetzwerks können wir nahezu jedes benötigte Produkt beschaffen und unterschiedliche Systeme miteinander vergleichen. So empfehlen wir nicht das, was gerade verfügbar ist, sondern das, was technisch und wirtschaftlich am besten zum jeweiligen Projekt passt.",
    icon: SwatchBook,
  },
];

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

const floatingMilestonesQuery = "(min-width: 1024px) and (min-height: 680px)";
const floatingMilestoneRailWidth = 240;
const floatingMilestoneMinGap = 48;

function getInitialFloatingMilestoneMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(min-width: 1440px) and (min-height: 680px)").matches;
}

function canShowFloatingMilestones() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!window.matchMedia(floatingMilestonesQuery).matches) {
    return false;
  }

  const groupShell = document
    .getElementById("gruppe")
    ?.querySelector(".content-shell");

  if (!(groupShell instanceof HTMLElement)) {
    return window.innerWidth >= 1440;
  }

  const rightClearSpace =
    window.innerWidth - groupShell.getBoundingClientRect().right;

  return rightClearSpace >= floatingMilestoneRailWidth + floatingMilestoneMinGap;
}

export function HomeAboutSection() {
  const pathname = usePathname();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isClayImageOpen, setIsClayImageOpen] = useState(false);
  const [activeUspIndex, setActiveUspIndex] = useState<number | null>(null);
  const [showFloatingMilestones, setShowFloatingMilestones] = useState(
    getInitialFloatingMilestoneMode
  );
  const uspTrackRef = useRef<HTMLDivElement>(null);
  const shouldSyncUspScrollRef = useRef(false);
  const isTilutionPage = pathname === "/tilution";
  const isGruenewaldPage = pathname === "/gruenewald";
  const isClayPage = pathname === "/clay-construction";

  useEffect(() => {
    const mediaQuery = window.matchMedia(floatingMilestonesQuery);

    const syncMilestoneMode = () => {
      setShowFloatingMilestones(canShowFloatingMilestones());
    };

    syncMilestoneMode();
    mediaQuery.addEventListener("change", syncMilestoneMode);
    window.addEventListener("resize", syncMilestoneMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMilestoneMode);
      window.removeEventListener("resize", syncMilestoneMode);
    };
  }, []);

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

  useEffect(() => {
    if (activeUspIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveUspIndex(null);
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
  }, [activeUspIndex]);

  useEffect(() => {
    if (activeUspIndex === null) {
      return;
    }

    if (!shouldSyncUspScrollRef.current) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      const track = uspTrackRef.current;
      if (!track) {
        return;
      }

      shouldSyncUspScrollRef.current = false;
      track.scrollTo({
        left: track.clientWidth * activeUspIndex,
        behavior: "instant",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeUspIndex]);

  const handleUspScroll = () => {
    const track = uspTrackRef.current;
    if (!track || activeUspIndex === null) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    setActiveUspIndex(Math.min(Math.max(nextIndex, 0), groupUsps.length - 1));
  };

  if (isTilutionPage) {
    return (
      <SectionShell id="gruppe" innerClassName="relative overflow-visible">
        <section className="company-video-container overflow-hidden p-0">
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
        <section className="company-video-container overflow-hidden p-0">
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

              </div>
            </aside>
          </div>

          {isClayImageOpen ? createPortal((
            <div
              className="mobile-viewport-overlay fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
              onClick={() => setIsClayImageOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="ArgillaTherm Aufbau im Großformat"
            >
              <div
                className="mobile-viewport-overlay__panel relative w-full max-w-[82rem]"
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
                    className="mobile-overlay-image h-auto max-h-[88vh] w-full object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
            </div>
          ), document.body) : null}
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

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-forest-100/74">
                Mehr als nur Handwerk
              </p>
              <div data-reveal-stagger className="mt-6 grid gap-4 sm:grid-cols-3">
                {groupUsps.map((usp, index) => (
                  <button
                    type="button"
                    key={usp.title}
                    onClick={() => {
                      shouldSyncUspScrollRef.current = true;
                      setActiveUspIndex(index);
                    }}
                    className="group flex items-center gap-3 rounded-[1.35rem] border border-white/12 bg-white/[0.06] px-4 py-4 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/40 sm:flex-col sm:items-start sm:gap-4 sm:px-5"
                    aria-label={`${usp.title} im Detail öffnen`}
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/[0.08] text-white transition-colors duration-300 group-hover:bg-white/[0.13]">
                      <usp.icon className="h-5.5 w-5.5 stroke-[1.8]" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold leading-tight text-white sm:text-lg">
                      {usp.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>

            <div data-reveal-stagger className="mt-8 grid gap-6 border-t border-white/12 pt-7 sm:grid-cols-3">
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

        {showFloatingMilestones ? null : <CompanyMilestoneInline />}

        {activeUspIndex !== null ? createPortal((
          <div
            className="mobile-viewport-overlay fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
            onClick={() => setActiveUspIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Mehr als nur Handwerk im Detail"
          >
            <div
              className="usp-overlay-panel mobile-viewport-overlay__panel relative w-full max-w-[58rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveUspIndex(null)}
                className="usp-overlay-close absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 focus:outline-none"
                aria-label="Detailansicht schließen"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="usp-overlay-card overflow-hidden rounded-[2rem] border border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
                <div
                  ref={uspTrackRef}
                  onScroll={handleUspScroll}
                  className="usp-overlay-track flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-[1.55rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {groupUsps.map((usp, index) => (
                    <article
                      key={usp.title}
                      className="usp-overlay-slide w-full shrink-0 snap-center px-1 py-2 sm:px-3"
                      aria-hidden={activeUspIndex !== index}
                    >
                      <div className="usp-overlay-content min-h-[24rem] rounded-[1.45rem] border border-white/14 bg-[rgba(24,41,86,0.72)] px-6 py-8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:min-h-[22rem] sm:bg-forest-900 sm:px-9 sm:py-10">
                        <span className="usp-overlay-icon inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.08] text-white">
                          <usp.icon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
                        </span>
                        <p className="usp-overlay-eyebrow mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-forest-100/68">
                          Mehr als nur Handwerk
                        </p>
                        <h3 className="usp-overlay-title mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
                          {usp.title}
                        </h3>
                        <p className="usp-overlay-description mt-5 text-base leading-8 text-forest-100/84 sm:text-lg sm:leading-9">
                          {usp.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="usp-overlay-controls mt-5 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      shouldSyncUspScrollRef.current = true;
                      setActiveUspIndex((currentIndex) =>
                        currentIndex === null
                          ? 0
                          : Math.max(currentIndex - 1, 0),
                      );
                    }}
                    disabled={activeUspIndex === 0}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/[0.08] text-white transition-colors duration-200 hover:bg-white/[0.14] disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Vorherigen Aspekt anzeigen"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>

                  <div
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/16"
                    aria-label={`Aspekt ${activeUspIndex + 1} von ${groupUsps.length}`}
                  >
                    <span
                      className="block h-full rounded-full bg-white transition-all duration-300"
                      style={{
                        width: `${((activeUspIndex + 1) / groupUsps.length) * 100}%`,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      shouldSyncUspScrollRef.current = true;
                      setActiveUspIndex((currentIndex) =>
                        currentIndex === null
                          ? 0
                          : Math.min(currentIndex + 1, groupUsps.length - 1),
                      );
                    }}
                    disabled={activeUspIndex === groupUsps.length - 1}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/[0.08] text-white transition-colors duration-200 hover:bg-white/[0.14] disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Nächsten Aspekt anzeigen"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ), document.body) : null}

        {isMapOpen ? createPortal((
          <div
            className="mobile-viewport-overlay fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
            onClick={() => setIsMapOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Deutschlandkarte im Großformat"
          >
            <div
              className="mobile-viewport-overlay__panel relative w-full max-w-[72rem]"
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
                  className="mobile-overlay-image h-auto max-h-[88vh] w-full object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        ), document.body) : null}
      </section>
      {isGruenewaldPage || !showFloatingMilestones ? null : (
        <CompanyMilestoneRail />
      )}
    </SectionShell>
  );
}
