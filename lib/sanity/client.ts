import { createClient } from "@sanity/client";

import { sanityConfig } from "@/lib/sanity/config";

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  perspective: "published",
});
