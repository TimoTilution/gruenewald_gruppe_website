"use client";

import Image from "next/image";
import { Download, FileText, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SectionShell } from "@/components/section-shell";

type CareerVariant = "default" | "group" | "tilution";

type HomeCareerSectionProps = {
  variant?: CareerVariant;
};

const jobPdfPath = "/documents/stellenausschreibung-projektleiter-bauleiter.pdf";
const jobPreviewPath = "/documents/stellenausschreibung-projektleiter-bauleiter-preview.webp";
const jobTitle = "Stellenausschreibung Projektleiter/Bauleiter m/w/d";

export function HomeCareerSection({ variant = "default" }: HomeCareerSectionProps) {
  const [isJobOpen, setIsJobOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const showJobPosting = variant === "group" || variant === "tilution";

  useEffect(() => {
    if (!isJobOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsJobOpen(false);
    };

    document.body.classList.add("site-overlay-open");
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.classList.remove("site-overlay-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJobOpen]);

  return (
    <SectionShell id="karriere">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <p className="section-eyebrow">Karriere</p>
        <h2 className="section-heading">
          Einstiegsmöglichkeiten für Talente und Fachkräfte.
        </h2>
        <p className="section-subline">
          Entdecken Sie aktuelle Stellenangebote und werden Sie Teil der
          Grünewald Gruppe.
        </p>

        {showJobPosting ? (
          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setIsJobOpen(true)}
            className="career-job-card group mt-8 flex w-full items-center gap-4 rounded-[1.75rem] border border-white/18 bg-white/[0.08] p-4 text-left shadow-[0_18px_45px_rgba(7,18,45,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-4 focus-visible:ring-offset-forest-800 sm:gap-6 sm:p-6"
            aria-haspopup="dialog"
          >
            {variant === "group" ? (
              <span className="career-job-card__logo flex h-20 w-28 shrink-0 items-center justify-center rounded-2xl bg-white px-3 py-2 shadow-sm sm:h-24 sm:w-40 sm:px-5">
                <Image
                  src="/logos-optimized/companies/tilution.svg.webp"
                  alt="Tilution"
                  width={1200}
                  height={720}
                  className="h-full w-full object-contain"
                  sizes="(min-width: 640px) 160px, 112px"
                />
              </span>
            ) : (
              <span className="career-job-card__icon inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/22 bg-white/10 text-white sm:h-16 sm:w-16">
                <FileText className="h-7 w-7" aria-hidden="true" />
              </span>
            )}

            <span className="min-w-0 flex-1">
              <span className="career-job-card__label block text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                Aktuelle Stelle
              </span>
              <span className="career-job-card__title mt-2 block text-base font-semibold leading-snug text-white sm:text-xl">
                {jobTitle}
              </span>
            </span>

            <span className="career-job-card__action hidden shrink-0 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white/10 sm:inline-flex">
              PDF ansehen
              <FileText className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        ) : null}
      </section>

      {isJobOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[2147483100] flex items-center justify-center bg-[#101a35]/92 p-2 backdrop-blur-md sm:p-6"
              onClick={() => setIsJobOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="career-job-dialog-title"
            >
              <div
                className="relative flex h-[calc(100dvh-1rem)] w-full max-w-[72rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/25 bg-white shadow-[0_30px_100px_rgba(2,8,23,0.5)] sm:h-[calc(100dvh-3rem)] sm:rounded-[2rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
                  <FileText className="hidden h-6 w-6 shrink-0 text-[#ec6602] sm:block" aria-hidden="true" />
                  <h2
                    id="career-job-dialog-title"
                    className="min-w-0 flex-1 truncate text-sm font-semibold text-[#182956] sm:text-lg"
                  >
                    {jobTitle}
                  </h2>
                  <a
                    href={jobPdfPath}
                    download="Stellenausschreibung_Projektleiter_Bauleiter_Tilution.pdf"
                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#ec6602] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#d85d02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec6602]/50 focus-visible:ring-offset-2 sm:px-5"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">PDF herunterladen</span>
                    <span className="sm:hidden">Download</span>
                  </a>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setIsJobOpen(false)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#182956] transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#182956]/35"
                    aria-label="Stellenausschreibung schließen"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto bg-slate-200 p-2 sm:p-5">
                  <Image
                    src={jobPreviewPath}
                    alt="Stellenausschreibung Projektleiter/Bauleiter bei Tilution"
                    width={993}
                    height={1404}
                    className="mx-auto h-auto w-full max-w-[52rem] bg-white object-contain shadow-[0_12px_36px_rgba(15,23,42,0.18)]"
                    sizes="(min-width: 960px) 832px, 100vw"
                    priority
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </SectionShell>
  );
}
