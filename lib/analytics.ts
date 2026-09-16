export type AnalyticsValue = string | number | boolean;

export type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function cleanParameters(parameters: AnalyticsParameters) {
  return Object.fromEntries(
    Object.entries(parameters).filter((entry): entry is [string, AnalyticsValue] =>
      entry[1] !== undefined,
    ),
  );
}

export function getAnalyticsCompany(pathname = window.location.pathname) {
  if (pathname.startsWith("/tilution")) return "tilution";
  if (pathname.startsWith("/gruenewaldgmbh")) return "gruenewald_gmbh";
  if (pathname.startsWith("/clay-construction")) return "clay_construction";
  if (pathname.startsWith("/verwaltung")) return "verwaltung";
  if (pathname.startsWith("/hrw")) return "hrw";
  return "gruenewald_gruppe";
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    company: getAnalyticsCompany(),
    page_path: window.location.pathname,
    device_layout: window.matchMedia("(max-width: 639px)").matches
      ? "mobile"
      : "desktop",
    ...cleanParameters(parameters),
  });

  if (process.env.NODE_ENV !== "production") {
    document.documentElement.dataset.analyticsLastEvent = eventName;
    const recentEvents = (
      document.documentElement.dataset.analyticsEvents ?? ""
    )
      .split(",")
      .filter(Boolean);
    document.documentElement.dataset.analyticsEvents = [
      ...recentEvents,
      eventName,
    ]
      .slice(-10)
      .join(",");
  }
}
