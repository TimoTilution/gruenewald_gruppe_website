"use client";

import { useEffect, useRef } from "react";

const measurementId = "G-9HFV3S4SDR";

type CcmEmbedding = {
  id?: string;
  name?: string;
};

declare global {
  interface Window {
    CCM?: {
      acceptedEmbeddings?: CcmEmbedding[];
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isGoogleAnalytics(value?: string) {
  return /google\s*analytics/i.test(value ?? "");
}

export function ConsentedGoogleAnalytics() {
  const loaded = useRef(false);

  useEffect(() => {
    const hasAnalyticsConsent = () =>
      window.CCM?.acceptedEmbeddings?.some((embedding) =>
        isGoogleAnalytics(embedding.name),
      ) ?? false;

    const loadAnalytics = () => {
      if (loaded.current || !hasAnalyticsConsent()) return;

      loaded.current = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      window.gtag("js", new Date());
      window.gtag("config", measurementId);

      const script = document.createElement("script");
      script.id = "google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    };

    const handleEmbeddingAccepted = (event: Event) => {
      const detail = (event as CustomEvent<{ name?: string; code?: string }>).detail;
      if (isGoogleAnalytics(detail?.name) || isGoogleAnalytics(detail?.code)) {
        loadAnalytics();
      }
    };

    const handleWidgetClosed = () => {
      if (loaded.current && !hasAnalyticsConsent()) {
        window.location.reload();
      }
    };

    window.addEventListener("ccm19EmbeddingAccepted", handleEmbeddingAccepted);
    window.addEventListener("ccm19WidgetLoaded", loadAnalytics);
    window.addEventListener("ccm19WidgetClosed", handleWidgetClosed);
    loadAnalytics();

    return () => {
      window.removeEventListener("ccm19EmbeddingAccepted", handleEmbeddingAccepted);
      window.removeEventListener("ccm19WidgetLoaded", loadAnalytics);
      window.removeEventListener("ccm19WidgetClosed", handleWidgetClosed);
    };
  }, []);

  return null;
}
