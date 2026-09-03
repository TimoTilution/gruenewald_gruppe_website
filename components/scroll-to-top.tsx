"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type WindowWithScrollPreservation = Window & {
  __preserveScrollOnNextPathChange?: boolean;
};

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    if ((window as WindowWithScrollPreservation).__preserveScrollOnNextPathChange) {
      (window as WindowWithScrollPreservation).__preserveScrollOnNextPathChange = false;
      return;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
}
