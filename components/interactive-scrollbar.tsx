"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

export function InteractiveScrollbar({
  scrollRef,
  ariaLabel,
}: {
  scrollRef: RefObject<HTMLElement | null>;
  ariaLabel: string;
}) {
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const updateFrameRef = useRef<number | null>(null);
  const restoreBehaviorFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const updateProgress = () => {
      const maximumScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
      setCanScroll(maximumScroll > 1);
      setProgress(maximumScroll > 0 ? scrollElement.scrollLeft / maximumScroll : 0);
    };

    const scheduleProgressUpdate = () => {
      if (updateFrameRef.current !== null) return;
      updateFrameRef.current = requestAnimationFrame(() => {
        updateFrameRef.current = null;
        updateProgress();
      });
    };

    updateProgress();
    scrollElement.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
    const resizeObserver = new ResizeObserver(scheduleProgressUpdate);
    resizeObserver.observe(scrollElement);
    scheduleProgressUpdate();

    return () => {
      if (updateFrameRef.current !== null) {
        cancelAnimationFrame(updateFrameRef.current);
        updateFrameRef.current = null;
      }
      if (restoreBehaviorFrameRef.current !== null) {
        cancelAnimationFrame(restoreBehaviorFrameRef.current);
        restoreBehaviorFrameRef.current = null;
      }
      resizeObserver.disconnect();
      scrollElement.removeEventListener("scroll", scheduleProgressUpdate);
    };
  }, [scrollRef]);

  if (!canScroll) return null;

  return (
    <input
      type="range"
      min="0"
      max="1000"
      value={Math.round(progress * 1000)}
      onChange={(event) => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;
        const nextProgress = Number(event.currentTarget.value) / 1000;
        const maximumScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
        setProgress(nextProgress);

        if (restoreBehaviorFrameRef.current !== null) {
          cancelAnimationFrame(restoreBehaviorFrameRef.current);
        }
        scrollElement.style.scrollBehavior = "auto";
        scrollElement.scrollLeft = nextProgress * maximumScroll;
        restoreBehaviorFrameRef.current = requestAnimationFrame(() => {
          scrollElement.style.scrollBehavior = "";
          restoreBehaviorFrameRef.current = null;
        });
      }}
      className="interactive-scrollbar sm:hidden"
      aria-label={ariaLabel}
    />
  );
}
