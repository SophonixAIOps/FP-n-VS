import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/studio";

/**
 * Open, with one exception.
 *
 * `/system` holds the design-system specimens — colour ramps, type scales,
 * motion tables. They are genuinely useful to work against and are staying,
 * but they are not the studio and should never be what a search result shows.
 * They also carry `noindex` in their own metadata: robots.txt stops a crawler
 * spending time there, the meta tag is what actually keeps them out of an
 * index if something links to one anyway. Neither alone is sufficient, which
 * is why both exist.
 *
 * Nothing else is disallowed. A blanket `Disallow: /` here would quietly
 * delist the whole site, and it is the kind of line that gets pasted in for a
 * staging deploy and then forgotten.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/system/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
