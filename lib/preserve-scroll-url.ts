type WindowWithScrollPreservation = Window & {
  __preserveScrollOnNextPathChange?: boolean;
};

type SeoHistoryState = {
  __NA: true;
  source: "gruenewald-seo-state";
};

export function pushUrlWithoutScroll(url: string, anchorElement?: Element | null) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const anchorTop = anchorElement?.getBoundingClientRect().top;
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;

  (window as WindowWithScrollPreservation).__preserveScrollOnNextPathChange = true;
  window.history.pushState(
    { __NA: true, source: "gruenewald-seo-state" } satisfies SeoHistoryState,
    "",
    url
  );

  const restoreScrollPosition = () => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(scrollX, scrollY);
    if (anchorElement && typeof anchorTop === "number") {
      const nextAnchorTop = anchorElement.getBoundingClientRect().top;
      window.scrollBy(0, nextAnchorTop - anchorTop);
    }
  };

  window.requestAnimationFrame(() => {
    restoreScrollPosition();
    window.requestAnimationFrame(restoreScrollPosition);
  });

  window.setTimeout(restoreScrollPosition, 80);
  window.setTimeout(() => {
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  }, 120);
}

export function pushUrlState(url: string) {
  (window as WindowWithScrollPreservation).__preserveScrollOnNextPathChange = true;
  window.history.pushState(
    { __NA: true, source: "gruenewald-seo-state" } satisfies SeoHistoryState,
    "",
    url
  );
}
