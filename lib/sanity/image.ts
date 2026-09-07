import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForSanityImage(source: SanityImageSource) {
  return builder.image(source);
}
