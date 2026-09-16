"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

const scrollThresholds = [25, 50, 75, 90] as const;
const downloadPattern = /\.(?:pdf|docx?|xlsx?|pptx?|zip)(?:$|[?#])/i;

function getTrackedElement(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>("[data-analytics-event]")
    : null;
}

export function AnalyticsInteractionTracker() {
  useEffect(() => {
    let reachedScrollDepths = new Set<number>();
    const videoMilestones = new WeakMap<HTMLVideoElement, Set<number>>();

    if (process.env.NODE_ENV !== "production") {
      document.documentElement.dataset.analyticsTrackerReady = "true";
    }

    const trackDeclaredInteraction = (element: HTMLElement) => {
      const eventName = element.dataset.analyticsEvent;
      if (!eventName) return false;

      trackAnalyticsEvent(eventName, {
        section: element.dataset.analyticsSection,
        item_id: element.dataset.analyticsItem,
        item_category: element.dataset.analyticsCategory,
        interaction_method: element.dataset.analyticsMethod ?? "click",
      });
      return true;
    };

    const handleClick = (event: MouseEvent) => {
      if (process.env.NODE_ENV !== "production") {
        document.documentElement.dataset.analyticsClickObserved = "true";
      }
      const declaredElement = getTrackedElement(event.target);
      if (declaredElement && trackDeclaredInteraction(declaredElement)) return;

      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) {
        trackAnalyticsEvent("contact_click", { contact_type: "email" });
        return;
      }
      if (href.startsWith("tel:")) {
        trackAnalyticsEvent("contact_click", { contact_type: "phone" });
        return;
      }
      if (downloadPattern.test(href)) {
        trackAnalyticsEvent("file_download", {
          file_extension: href.split(".").pop()?.split(/[?#]/)[0]?.toLowerCase(),
        });
        return;
      }

      try {
        const destination = new URL(link.href, window.location.href);
        if (destination.origin !== window.location.origin) {
          trackAnalyticsEvent("outbound_link_click", {
            link_domain: destination.hostname,
          });
        }
      } catch {
        // Relative and non-HTTP links require no additional tracking here.
      }
    };

    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const depth = Math.min(100, (window.scrollY / scrollableHeight) * 100);
      scrollThresholds.forEach((threshold) => {
        if (depth >= threshold && !reachedScrollDepths.has(threshold)) {
          reachedScrollDepths.add(threshold);
          trackAnalyticsEvent("scroll_depth", { percent_scrolled: threshold });
        }
      });
    };

    const resetPageTracking = () => {
      reachedScrollDepths = new Set<number>();
      window.requestAnimationFrame(handleScroll);
    };

    const getVideoId = (video: HTMLVideoElement) => {
      const source = video.currentSrc || video.getAttribute("src") || "video";
      return source.split("/").pop()?.split(/[?#]/)[0] ?? "video";
    };

    const handleVideoPlay = (event: Event) => {
      if (!(event.target instanceof HTMLVideoElement)) return;
      trackAnalyticsEvent("video_play", {
        section: "video",
        item_id: getVideoId(event.target),
      });
    };

    const handleVideoPause = (event: Event) => {
      if (!(event.target instanceof HTMLVideoElement) || event.target.ended) return;
      trackAnalyticsEvent("video_pause", {
        section: "video",
        item_id: getVideoId(event.target),
        video_percent: event.target.duration
          ? Math.round((event.target.currentTime / event.target.duration) * 100)
          : 0,
      });
    };

    const handleVideoProgress = (event: Event) => {
      if (!(event.target instanceof HTMLVideoElement) || !event.target.duration) return;
      const video = event.target;
      const percent = (video.currentTime / video.duration) * 100;
      const reached = videoMilestones.get(video) ?? new Set<number>();

      [25, 50, 75].forEach((milestone) => {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackAnalyticsEvent("video_progress", {
            section: "video",
            item_id: getVideoId(video),
            video_percent: milestone,
          });
        }
      });
      videoMilestones.set(video, reached);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("play", handleVideoPlay, true);
    document.addEventListener("pause", handleVideoPause, true);
    document.addEventListener("timeupdate", handleVideoProgress, true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", resetPageTracking);
    window.addEventListener("analytics:pathchange", resetPageTracking);
    handleScroll();

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("play", handleVideoPlay, true);
      document.removeEventListener("pause", handleVideoPause, true);
      document.removeEventListener("timeupdate", handleVideoProgress, true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", resetPageTracking);
      window.removeEventListener("analytics:pathchange", resetPageTracking);
    };
  }, []);

  return null;
}
