export function getOptimizedReferenceSrc(src: string) {
  const optimizedSprudelhofCover =
    "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg";
  if (src === optimizedSprudelhofCover) {
    return "/references-optimized/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg.webp";
  }
  if (!src.startsWith("/references/") || !/\.(?:jpe?g|png)$/i.test(src)) return src;
  return `${src.replace("/references/", "/references-optimized/")}.webp`;
}
