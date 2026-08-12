"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const logoBlue = "#2c2856";
const milestones = [
  {
    year: "1977",
    label: "Gruendung als Fliesenfachbetrieb",
  },
  {
    year: "2004",
    label: "Erfolgreicher Generationswechsel",
  },
  {
    year: "2023",
    label: "Gruendung der Gruenewald-Gruppe",
  },
];
const lineSurface =
  "linear-gradient(90deg, rgba(44,40,86,0.18), rgba(44,40,86,0.92) 46%, rgba(44,40,86,0.56) 56%, rgba(44,40,86,0.16))";
const RAIL_MIN_VIEWPORT_WIDTH = 1580;
const RAIL_MIN_VIEWPORT_HEIGHT = 860;
const RAIL_MIN_GUTTER_WIDTH = 260;
const RAIL_MIN_WIDTH = 220;
const RAIL_MAX_WIDTH = 272;
const RAIL_GUTTER_PADDING = 24;
const RAIL_TOP_OFFSET = 32;

type RailLayout = {
  left: number;
  top: number;
  width: number;
};

export function CompanyMilestoneInline() {
  return (
    <div
      className="milestone-inline mt-12"
      aria-label="Meilensteine der Gruenewald Gruppe"
    >
      <div className="mb-7 border-t border-white/12 pt-7">
        <p className="section-eyebrow">Entwicklung der Gruppe</p>
      </div>
      <div className="pb-2">
        <ol className="grid grid-cols-1 items-start gap-y-8 sm:grid-cols-3 sm:gap-x-0 sm:gap-y-0">
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
                    className="absolute left-1/2 top-[2.75rem] hidden h-px w-full sm:block"
                    style={{ backgroundColor: "rgba(255,255,255,0.28)" }}
                  />
                ) : null}
                <span
                  className="relative z-10 grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full text-[1.4rem] font-bold tracking-[-0.04em] shadow-[0_14px_30px_rgba(14,25,55,0.12)] backdrop-blur-xl"
                  style={{
                    color: logoBlue,
                    border: "1px solid rgba(44,40,86,0.28)",
                    background:
                      "linear-gradient(145deg, rgba(245,247,250,0.94), rgba(225,229,238,0.88) 58%, rgba(210,216,229,0.82))",
                    boxShadow:
                      "inset 8px 10px 20px rgba(255,255,255,0.55), inset -14px -16px 28px rgba(44,40,86,0.10), 0 14px 30px rgba(14,25,55,0.12)",
                  }}
                >
                  {milestone.year}
                </span>
                <p
                  className="mt-5 max-w-[12rem] text-base font-semibold leading-7 sm:text-lg sm:leading-8"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
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
  const [railLayout, setRailLayout] = useState<RailLayout | null>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;

    const updateRailLayout = () => {
      const contentShellRect = document
        .querySelector(".content-shell")
        ?.getBoundingClientRect();
      const headerElement = document.querySelector("header");
      const headerHeight =
        headerElement instanceof HTMLElement ? headerElement.offsetHeight : 0;

      if (!contentShellRect) {
        setRailLayout(null);
        root.dataset.milestoneRail = "inactive";
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rightGutterWidth = Math.max(
        viewportWidth - contentShellRect.right,
        0
      );
      const usableRailWidth = Math.min(
        RAIL_MAX_WIDTH,
        rightGutterWidth - RAIL_GUTTER_PADDING * 2
      );
      const shouldUseRail =
        viewportWidth >= RAIL_MIN_VIEWPORT_WIDTH &&
        viewportHeight >= RAIL_MIN_VIEWPORT_HEIGHT &&
        rightGutterWidth >= RAIL_MIN_GUTTER_WIDTH &&
        usableRailWidth >= RAIL_MIN_WIDTH;

      if (!shouldUseRail) {
        setRailLayout(null);
        root.dataset.milestoneRail = "inactive";
        return;
      }

      setRailLayout({
        left: contentShellRect.right + rightGutterWidth / 2,
        top: headerHeight + RAIL_TOP_OFFSET,
        width: usableRailWidth,
      });
      root.dataset.milestoneRail = "active";
    };

    updateRailLayout();
    window.addEventListener("resize", updateRailLayout);
    window.addEventListener("scroll", updateRailLayout, { passive: true });

    return () => {
      delete root.dataset.milestoneRail;
      window.removeEventListener("resize", updateRailLayout);
      window.removeEventListener("scroll", updateRailLayout);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let footerObserver: IntersectionObserver | null = null;
    let isFooterVisible = false;

    const updateProgress = () => {
      setRailVisibility(
        railLayout && window.scrollY > 0 && !isFooterVisible ? 1 : 0
      );
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
  }, [railLayout]);

  if (!railLayout) {
    return null;
  }

  const orbSize = Math.round(Math.max(96, Math.min(120, railLayout.width * 0.46)));
  const orbFontSize = `${Math.max(1.65, orbSize / 56)}rem`;
  const descriptionFontSize = `${Math.max(1.02, railLayout.width / 220)}rem`;
  const descriptionLineHeight = `${Math.max(30, railLayout.width * 0.15)}px`;
  const descriptionStemHeight = 1.4;
  const connectorHeight = 4.9;

  return (
    <aside
      className="milestone-rail fixed z-[80] -translate-x-1/2"
      aria-label="Meilensteine der Gruenewald Gruppe"
      style={{
        left: `${railLayout.left}px`,
        top: `${railLayout.top}px`,
        width: `${railLayout.width}px`,
        display: "block",
      }}
    >
      <div
        className="relative mx-auto w-full px-2 py-5 transition-all duration-700 ease-out"
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
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[70%] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,40,86,0.16), rgba(44,40,86,0.10), rgba(44,40,86,0.05))",
          }}
        />

        <div className="relative mx-auto flex w-full flex-col items-center py-1">
          {milestones.map((milestone, index) => {
            const isLast = index === milestones.length - 1;

            return (
              <div
                key={milestone.year}
                className="relative flex flex-col items-center text-center"
                style={{ width: "100%" }}
              >
                <div
                  className="relative grid place-items-center overflow-hidden rounded-full font-bold tracking-[-0.04em] backdrop-blur-2xl transition-all duration-700 ease-out"
                  style={{
                    width: `${orbSize}px`,
                    height: `${orbSize}px`,
                    fontSize: orbFontSize,
                    color: logoBlue,
                    border: "1px solid rgba(44,40,86,0.42)",
                    background:
                      "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 21%, rgba(255,255,255,0.05) 42%, transparent 58%), radial-gradient(circle at 74% 82%, rgba(44,40,86,0.18), transparent 38%), linear-gradient(145deg, rgba(245,247,250,0.96), rgba(228,233,241,0.9) 46%, rgba(210,216,229,0.86))",
                    boxShadow:
                      "inset 12px 14px 24px rgba(255,255,255,0.52), inset -18px -22px 32px rgba(44,40,86,0.10), inset 0 0 0 1px rgba(255,255,255,0.22), 0 18px 38px rgba(14,25,55,0.12), 0 0 22px rgba(44,40,86,0.08)",
                  }}
                >
                  <span className="relative z-10">{milestone.year}</span>
                  <span
                    aria-hidden="true"
                    className="absolute rounded-full blur-md"
                    style={{
                      left: `${orbSize * 0.22}px`,
                      top: `${orbSize * 0.16}px`,
                      width: `${orbSize * 0.38}px`,
                      height: `${orbSize * 0.28}px`,
                      transform: "rotate(-18deg)",
                      backgroundColor: "rgba(255,255,255,0.72)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute rounded-full blur-[2px]"
                    style={{
                      left: `${orbSize * 0.3}px`,
                      top: `${orbSize * 0.28}px`,
                      width: `${orbSize * 0.32}px`,
                      height: `${orbSize * 0.11}px`,
                      transform: "rotate(-22deg)",
                      backgroundColor: "rgba(255,255,255,0.82)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute rounded-full"
                    style={{
                      inset: `${orbSize * 0.055}px`,
                      border: "1px solid rgba(44,40,86,0.18)",
                    }}
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="mt-2 block w-1 rounded-full transition-all duration-700 ease-out"
                  style={{
                    height: `${descriptionStemHeight}rem`,
                    background: lineSurface,
                    boxShadow:
                      "0 0 14px rgba(44,40,86,0.34), 0 0 26px rgba(44,40,86,0.16)",
                  }}
                />
                <p
                  className="text-center font-semibold transition-all duration-700 ease-out"
                  style={{
                    maxWidth: `${railLayout.width}px`,
                    fontSize: descriptionFontSize,
                    lineHeight: descriptionLineHeight,
                    color: "rgba(44,40,86,0.92)",
                  }}
                >
                  {milestone.label}
                </p>
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="my-2.5 block w-1 rounded-full transition-all duration-700 ease-out"
                    style={{
                      height: `${connectorHeight}rem`,
                      opacity: 1,
                      background: lineSurface,
                      boxShadow:
                        "0 0 16px rgba(44,40,86,0.36), 0 0 30px rgba(44,40,86,0.16)",
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
