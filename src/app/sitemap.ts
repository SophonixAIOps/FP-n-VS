import type { MetadataRoute } from "next";
import { workCategories } from "@/lib/images";
import { SITE_URL } from "@/lib/studio";

/**
 * Every page a stranger is meant to find, and nothing else.
 *
 * The category views are derived from `workCategories` rather than listed, so
 * adding a category to the archive cannot leave it out of the sitemap. The
 * specimen pages under `/system` are absent by construction: they are a
 * development reference, they are marked `noindex`, and robots.txt asks
 * crawlers not to walk them.
 *
 * `lastModified` and `changeFrequency` are both omitted rather than filled in.
 * A build timestamp would tell every crawler that all nine pages changed
 * whenever anything was deployed, and a frequency would be a guess — a claim
 * that is wrong is worse than a field that is absent. `priority` is only a
 * relative hint and is one of the few values here that is actually true: the
 * homepage is the way in, the top-level sections come next, the filtered views
 * of the archive are the least important.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const categories = workCategories
    .filter(({ slug }) => slug !== "all")
    .map(({ slug }) => ({
      url: `${SITE_URL}/portfolio/${slug}`,
      priority: 0.5,
    }));

  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/portfolio`, priority: 0.8 },
    { url: `${SITE_URL}/services`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.8 },
    ...categories,
  ];
}
