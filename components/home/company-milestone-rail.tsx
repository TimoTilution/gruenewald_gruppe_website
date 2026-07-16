"use client";

import { useEffect, useState } from "react";

const milestones = [
  {
    year: "1977",
    label: "Gründung als Fliesenfachbetrieb",
  },
  {
    year: "2004",
    label: "Erfolgreicher Generationswechsel",
  },
  {
    year: "2017",
    label: "Wachstum zum Großprojekt-Partner",
  },
  {
    year: "2023",
    label: "Gründung der Grünewald-Gruppe",
  },
];

const lineSurface =
  "linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.88) 46%, rgba(255,255,255,0.46) 56%, rgba(255,255,255,0.16))";

export function CompanyMilestoneInline() {
  return (
    <div
      className="milestone-inline mt-12"
      aria-label="Meilensteine der Grünewald Gruppe"
    >
      <div className="mb-7 border-t border-white/12 pt-7">
        <p className="section-eyebrow">Entwicklung der Gruppe</p>
      </div>
      <div className="pb-2">
        <ol className="grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-0">
          {milestones.map((milestone, index) => {
            const isLast = index === milestones.length - 1;

            return (
              <li
                key={milestone.year}
                className="relative flex flex-col items-center px-2 text-center"
              >
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[2.25rem] hidden h-px w-full bg-white/28 sm:block"
                  />
                ) : null}
                <span className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-white/45 bg-white/14 text-xl font-light tracking-[-0.04em] text-white shadow-[inset_8px_10px_20px_rgba(255,255,255,0.22),inset_-14px_-16px_28px_rgba(7,18,48,0.32),0_14px_30px_rgba(7,18,48,0.28)] backdrop-blur-xl">
                  {milestone.year}
                </span>
                <p className="mt-4 max-w-[10rem] text-sm leading-6 text-white/82 sm:text-base sm:leading-7">
                  {milestone.label}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function CompanyMilestoneRail() {
  const [railVisibility, setRailVisibility] = useState(0);

  useEffect(() => {
    let frame = 0;
    let footerObserver: IntersectionObserver | null = null;
    let isFooterVisible = false;

    const updateProgress = () => {
      setRailVisibility(window.scrollY > 0 && !isFooterVisible ? 1 : 0);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    const footerElement = document.querySelector("footer");

    if (footerElement instanceof HTMLElement) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          isFooterVisible = entry?.isIntersecting ?? false;
          requestUpdate();
        },
        {
          threshold: 0.08,
        }
      );
      footerObserver.observe(footerElement);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      footerObserver?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <aside
      className="milestone-rail fixed left-[calc(75vw+12.75rem)] top-[12.75rem] z-[80] w-60"
      aria-label="Meilensteine der Grünewald Gruppe"
    >
      <div
        className="sticky top-28 mx-auto w-full px-2 py-5 transition-all duration-700 ease-out"
        style={{
          opacity: railVisibility,
          transform: `translateY(${(1 - railVisibility) * 1.25}rem) scale(${
            0.96 + railVisibility * 0.04
          })`,
          pointerEvents: railVisibility > 0.05 ? "auto" : "none",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-32 -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(143,170,216,0.12), rgba(255,255,255,0.08))",
          }}
        />

        <div className="relative mx-auto flex max-w-[15rem] flex-col items-center py-1">
          {milestones.map((milestone, index) => {
            const isLast = index === milestones.length - 1;
            const reveal = 1;
            const descriptionReveal = reveal;
            const connectorReveal = isLast ? 0 : 1;
            const visibleConnectorHeight = 0.9 + connectorReveal * 2.55;

            return (
              <div
                key={milestone.year}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="relative grid h-[6rem] w-[6rem] place-items-center overflow-hidden rounded-full border border-white/72 bg-white/18 text-[1.62rem] font-light tracking-[-0.04em] text-white shadow-[inset_12px_14px_24px_rgba(255,255,255,0.3),inset_-18px_-22px_32px_rgba(7,18,48,0.42),inset_0_0_0_1px_rgba(255,255,255,0.2),0_18px_38px_rgba(7,18,48,0.36),0_0_30px_rgba(255,255,255,0.18)] backdrop-blur-2xl transition-all duration-700 ease-out"
                  style={{
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 1.25}rem)`,
                    filter: `blur(${(1 - reveal) * 2}px)`,
                    background:
                      "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.2) 21%, rgba(255,255,255,0.04) 42%, transparent 58%), radial-gradient(circle at 74% 82%, rgba(143,170,216,0.32), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08) 46%, rgba(24,41,86,0.26))",
                  }}
                >
                  <span className="relative z-10">{milestone.year}</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-3 top-2 h-8 w-10 rotate-[-18deg] rounded-full bg-white/46 blur-md"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-4 h-3.5 w-9 rotate-[-22deg] rounded-full bg-white/68 blur-[2px]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-[0.32rem] rounded-full border border-white/30"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-5 -right-4 h-12 w-12 rounded-full bg-forest-300/18 blur-xl"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="mt-2 block w-1 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.58),0_0_26px_rgba(143,170,216,0.28)] transition-all duration-700 ease-out"
                  style={{
                    height: `${descriptionReveal * 1.25}rem`,
                    opacity: descriptionReveal,
                    background: lineSurface,
                  }}
                />
                <p
                  className="max-w-[15rem] text-center text-lg font-light leading-7 text-white/92 transition-all duration-700 ease-out"
                  style={{
                    opacity: descriptionReveal,
                    transform: `translateY(${(1 - descriptionReveal) * 0.75}rem)`,
                    filter: `blur(${(1 - descriptionReveal) * 2}px)`,
                  }}
                >
                  {milestone.label}
                </p>
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="my-2.5 block w-1 rounded-full shadow-[0_0_16px_rgba(255,255,255,0.6),0_0_30px_rgba(143,170,216,0.28)] transition-all duration-700 ease-out"
                    style={{
                      height: `${visibleConnectorHeight}rem`,
                      opacity: 0.28 + connectorReveal * 0.72,
                      background: lineSurface,
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
