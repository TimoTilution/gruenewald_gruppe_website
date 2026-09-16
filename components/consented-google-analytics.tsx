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
    dataLayer?: IArguments[];
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

    const hasAnalyticsScript = () =>
      Boolean(
        document.querySelector(
          `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`,
        ),
      );

    const initializeGtag = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: true });
      document.documentElement.dataset.analyticsReady = "true";
    };

    const loadAnalytics = (consentConfirmed = false) => {
      if (
        loaded.current ||
        (!consentConfirmed && !hasAnalyticsConsent() && !hasAnalyticsScript())
      ) return;

      loaded.current = true;
      initializeGtag();

      if (hasAnalyticsScript()) return;

      const script = document.createElement("script");
      script.id = "google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    };

    const handleEmbeddingAccepted = (event: Event) => {
      const detail = (event as CustomEvent<{ name?: string; code?: string }>).detail;
      if (isGoogleAnalytics(detail?.name) || isGoogleAnalytics(detail?.code)) {
        loadAnalytics(true);
      }
    };

    const analyticsScriptObserver = new MutationObserver(() => {
      if (hasAnalyticsScript()) loadAnalytics(true);
    });

    const handleWidgetClosed = () => {
      if (loaded.current && !hasAnalyticsConsent()) {
        window.location.reload();
      }
    };

    const handleWidgetLoaded = () => loadAnalytics();

    window.addEventListener("ccm19EmbeddingAccepted", handleEmbeddingAccepted);
    window.addEventListener("ccm19WidgetLoaded", handleWidgetLoaded);
    window.addEventListener("ccm19WidgetClosed", handleWidgetClosed);
    document.addEventListener("ccm19EmbeddingAccepted", handleEmbeddingAccepted);
    document.addEventListener("ccm19WidgetLoaded", handleWidgetLoaded);
    document.addEventListener("ccm19WidgetClosed", handleWidgetClosed);
    analyticsScriptObserver.observe(document.head, { childList: true });
    loadAnalytics();

    return () => {
      window.removeEventListener("ccm19EmbeddingAccepted", handleEmbeddingAccepted);
      window.removeEventListener("ccm19WidgetLoaded", handleWidgetLoaded);
      window.removeEventListener("ccm19WidgetClosed", handleWidgetClosed);
      document.removeEventListener("ccm19EmbeddingAccepted", handleEmbeddingAccepted);
      document.removeEventListener("ccm19WidgetLoaded", handleWidgetLoaded);
      document.removeEventListener("ccm19WidgetClosed", handleWidgetClosed);
      analyticsScriptObserver.disconnect();
    };
  }, []);

  return null;
}
