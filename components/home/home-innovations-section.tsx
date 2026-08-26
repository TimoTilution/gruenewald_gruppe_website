"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { withBasePath } from "@/lib/site-path";

export function HomeInnovationsSection() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  useEffect(() => {
    if (!isImageOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsImageOpen(false);
      }
    };

    document.body.classList.add("site-overlay-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("site-overlay-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen]);

  return (
    <SectionShell id="innovationen">
      <section className="section-card relative overflow-hidden px-6 py-10 sm:px-9 lg:p-12">
        <div className="pointer-events-none absolute -right-16 top-8 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-[#3cabe2]/12 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
          <div>
            <p className="section-eyebrow">Innovationen</p>
            <h2 className="section-heading max-w-none whitespace-normal lg:whitespace-nowrap">
              Millimetergenau planen. Sicher bauen.
            </h2>
            <div className="section-subline mt-5 max-w-none space-y-5">
              <p>
                Unser Vermessungsroboter von RaumCheck erfasst die tatsächliche
                Bausituation digital, automatisiert und hochpräzise.
              </p>
              <div className={`${isTextExpanded ? "block" : "hidden"} space-y-5 sm:block`}>
                <p>
                  So erkennen
                wir Abweichungen frühzeitig und schaffen eine verlässliche
                Grundlage für Planung und Ausführung. Gerade auf komplexen
                Baustellen reduziert das Messfehler, unnötige Rückfragen sowie
                kostspielige Verzögerungen und Nachträge.
                </p>
                <p>
                  Für unsere Kunden bedeutet das:{" "}
                  <strong className="font-semibold">
                    mehr Planungssicherheit, höhere Transparenz und effizientere
                    Abläufe.
                  </strong>{" "}
                  Gleichzeitig entsteht eine digitale Datengrundlage, die sich
                  direkt weiterverarbeiten und dokumentieren lässt – für einen
                  präziseren und zukunftsfähigen Bauprozess.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 inline-flex rounded-full border border-white/22 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/[0.14] sm:hidden"
              aria-expanded={isTextExpanded}
              onClick={() => setIsTextExpanded((current) => !current)}
            >
              {isTextExpanded ? "Weniger lesen" : "Mehr lesen"}
            </button>
            <Link
              href="https://www.raumcheck.de"
              target="_blank"
              rel="noreferrer"
              className="tilution-services-cta__button mt-8 hidden sm:inline-flex"
            >
              Mehr zu Raumcheck
              <ArrowRight className="tilution-services-cta__button-icon" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            className="group relative block justify-self-center overflow-hidden rounded-[2rem] border border-white/18 bg-transparent text-left shadow-[0_28px_80px_rgba(7,18,45,0.34)] transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-900 lg:justify-self-end"
            onClick={() => setIsImageOpen(true)}
            aria-label="Vermessungsroboter in der Großansicht öffnen"
          >
            <Image
              src={withBasePath("/images/innovationen/raumcheck-vermessungsroboter-card.png")}
              alt="Vermessungsroboter von Raumcheck auf einer Baustelle"
              width={1030}
              height={1288}
              className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:h-[28.4rem] sm:w-auto"
              sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 50vw, 100vw"
            />
          </button>

          <Link
            href="https://www.raumcheck.de"
            target="_blank"
            rel="noreferrer"
            className="tilution-services-cta__button -mt-2 justify-self-center sm:hidden"
          >
            Mehr zu Raumcheck
            <ArrowRight className="tilution-services-cta__button-icon" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {isImageOpen
        ? createPortal(
            <div
              className="mobile-viewport-overlay fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
              onClick={() => setIsImageOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Vermessungsroboter Großansicht"
            >
              <div
                className="mobile-viewport-overlay__panel relative w-full max-w-[72rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsImageOpen(false)}
                  className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/95 text-forest-900 shadow-lg transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
                  aria-label="Großansicht schließen"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="liquid-card overflow-hidden p-3 sm:p-5">
                  <div className="relative flex min-h-[70vh] items-center justify-center rounded-[1.5rem] bg-white/92 p-4 sm:min-h-[78vh] sm:p-6">
                    <Image
                      src={withBasePath("/images/innovationen/raumcheck-vermessungsroboter-card.png")}
                      alt="Vermessungsroboter von Raumcheck auf einer Baustelle"
                      width={1030}
                      height={1288}
                      className="h-auto max-h-[74vh] w-auto max-w-full object-contain sm:max-h-[82vh]"
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </SectionShell>
  );
}
