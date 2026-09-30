"use client";

import { useEffect } from "react";

export function ScrollToRouteSection({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const scrollToSection = () => {
      const target = document.getElementById(sectionId);
      if (!target) return;

      const header = document.querySelector("header");
      const headerOffset = header instanceof HTMLElement ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(targetTop - headerOffset - 16, 0),
        behavior: "auto",
      });
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(scrollToSection);
    });
    // The CMS-backed sections can arrive after this client component hydrates.
    // Retry briefly so direct section URLs also work with streamed content and
    // correct the position once fonts/images have settled.
    const corrections = [100, 250, 500, 900, 1400, 2200].map((delay) =>
      window.setTimeout(scrollToSection, delay)
    );
    window.addEventListener("load", scrollToSection, { once: true });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      corrections.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("load", scrollToSection);
    };
  }, [sectionId]);

  return null;
}
