"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

export function HomeAboutSection() {
  const [isMapOpen, setIsMapOpen] = useState(false);

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

  return (
    <SectionShell id="ueber-uns">
      <section className="section-card relative overflow-hidden px-6 py-10 sm:px-9 lg:p-12">
        <div className="relative z-20 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-2xl lg:min-w-0 lg:flex-1">
            <p className="section-eyebrow">Über uns</p>
            <h2 className="section-heading">
              Die richtige Lösung für jede Projektanforderung
            </h2>
            <ul className="mt-7 list-disc space-y-3 pl-6 text-base leading-8 text-forest-100/78 sm:text-lg">
              <li>
                Familiengeführte Unternehmensgruppe im Bau- und Ausbaugewerbe
              </li>
              <li>
                Spezialisiert auf private, gewerbliche und öffentliche
                Bauprojekte
              </li>
              <li>
                Bundesweit im Einsatz - schnell, flexibel und zuverlässig
              </li>
              <li>Klare Strukturen für effiziente Projektabläufe</li>
              <li>
                Hochwertige Lösungen mit Fokus auf Qualität und Termintreue
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="group block w-full overflow-hidden rounded-[1.9rem] text-left transition-transform duration-300 hover:scale-[1.01] lg:w-[22rem] lg:max-w-[22rem] lg:flex-none lg:self-start xl:w-[24rem] xl:max-w-[24rem]"
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
        </div>

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
    </SectionShell>
  );
}
