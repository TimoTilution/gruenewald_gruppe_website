"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const logoBlue = "#2c2856";

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
    year: "2023",
    label: "Gründung der Grünewald-Gruppe",
  },
];

const lineSurface =
  "linear-gradient(90deg, rgba(44,40,86,0.18), rgba(44,40,86,0.92) 46%, rgba(44,40,86,0.56) 56%, rgba(44,40,86,0.16))";

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
        <ol className="grid grid-cols-1 items-start gap-y-8 sm:grid-cols-3 sm:gap-0">
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
  const railRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [railState, setRailState] = useState({
    isVisible: false,
    left: 24,
    top: 112,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateRailState = () => {
      const groupSection = document.getElementById("gruppe");
      const groupShell = groupSection?.querySelector(".content-shell");
      const footerElement = document.querySelector("footer");
      const headerElement = document.querySelector("header");

      if (!(groupSection instanceof HTMLElement) || !(groupShell instanceof HTMLElement)) {
        setRailState((current) =>
          current.isVisible || current.left !== 24 || current.top !== 112
            ? { isVisible: false, left: 24, top: 112 }
            : current
        );
        return;
      }

      const shellRect = groupShell.getBoundingClientRect();
      const headerRect =
        headerElement instanceof HTMLElement
          ? headerElement.getBoundingClientRect()
          : null;
      const footerRect =
        footerElement instanceof HTMLElement
          ? footerElement.getBoundingClientRect()
          : null;
      const railWidth = 240;
      const railHeight = railRef.current?.offsetHeight ?? 920;
      const rightClearSpace = window.innerWidth - shellRect.right;
      const centeredLeft = shellRect.right + rightClearSpace / 2 - railWidth / 2;
      const clampedLeft = Math.min(
        Math.max(shellRect.right + 16, centeredLeft),
        window.innerWidth - railWidth - 24
      );
      const topBoundary = Math.max((headerRect?.bottom ?? 88) + 16, 96);
      const availableHeight = window.innerHeight - topBoundary;
      const centeredTop = topBoundary + Math.max((availableHeight - railHeight) / 2, 0);
      const clampedTop = Math.min(
        Math.max(topBoundary, centeredTop),
        Math.max(topBoundary, window.innerHeight - railHeight - 24)
      );
      const hasScrolledPastTop = window.scrollY > 24;
      const footerIsTooClose =
        footerRect !== null ? footerRect.top <= window.innerHeight - 96 : false;

      setRailState((current) => {
        const nextState = {
          isVisible: hasScrolledPastTop && !footerIsTooClose,
          left: clampedLeft,
          top: clampedTop,
        };

        if (
          current.isVisible === nextState.isVisible &&
          Math.abs(current.left - nextState.left) < 0.5 &&
          Math.abs(current.top - nextState.top) < 0.5
        ) {
          return current;
        }

        return nextState;
      });
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateRailState);
    };

    updateRailState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <aside
      ref={railRef}
      className="milestone-rail fixed top-28 z-[80] w-60 transition-[opacity,transform,left] duration-700 ease-out"
      aria-label="Meilensteine der Grünewald Gruppe"
      style={{
        left: `${railState.left}px`,
        top: `${railState.top}px`,
        opacity: railState.isVisible ? 1 : 0,
        transform: `translateY(${railState.isVisible ? "0" : "1.25rem"}) scale(${
          railState.isVisible ? 1 : 0.96
        })`,
        pointerEvents: railState.isVisible ? "auto" : "none",
        visibility: railState.isVisible ? "visible" : "hidden",
      }}
    >
      <div
        className="relative mx-auto w-full px-2 py-5"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-32 -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,40,86,0.16), rgba(44,40,86,0.10), rgba(44,40,86,0.05))",
          }}
        />

        <div className="relative mx-auto flex max-w-[15rem] flex-col items-center py-1">
          {milestones.map((milestone, index) => {
            const isLast = index === milestones.length - 1;
            const descriptionReveal = 1;
            const connectorReveal = isLast ? 0 : 1;
            const visibleConnectorHeight = 2.55 + connectorReveal * 2.95;

            return (
              <div
                key={milestone.year}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="relative grid h-[7.5rem] w-[7.5rem] place-items-center overflow-hidden rounded-full text-[2rem] font-bold tracking-[-0.04em] backdrop-blur-2xl transition-all duration-700 ease-out"
                  style={{
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
                    className="absolute left-4 top-3 h-10 w-14 rotate-[-18deg] rounded-full blur-md"
                    style={{ backgroundColor: "rgba(255,255,255,0.72)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-5 h-4 w-12 rotate-[-22deg] rounded-full blur-[2px]"
                    style={{ backgroundColor: "rgba(255,255,255,0.82)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-[0.32rem] rounded-full"
                    style={{ border: "1px solid rgba(44,40,86,0.18)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 -right-5 h-16 w-16 rounded-full blur-xl"
                    style={{ backgroundColor: "rgba(44,40,86,0.16)" }}
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="mt-2 block w-1 rounded-full transition-all duration-700 ease-out"
                  style={{
                    height: `${descriptionReveal * 1.65}rem`,
                    background: lineSurface,
                    boxShadow:
                      "0 0 14px rgba(44,40,86,0.34), 0 0 26px rgba(44,40,86,0.16)",
                  }}
                />
                <p
                  className="max-w-[16rem] text-center text-[1.2rem] font-semibold leading-8 transition-all duration-700 ease-out"
                  style={{
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
                      height: `${visibleConnectorHeight}rem`,
                      opacity: 0.28 + connectorReveal * 0.72,
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
    </aside>,
    document.body
  );
}
