import type { ImageLoaderProps } from "next/image";

/**
 * FRAME & STORY STUDIO — IMAGE SYSTEM
 *
 * Photography is the primary visual asset of this site. Everything here exists
 * to make sure an image arrives at the right crop, the right size and the right
 * moment.
 *
 * Images are served from the Unsplash (imgix) CDN via a custom loader, so
 * resizing happens at the edge instead of being re-processed by Next. Every
 * entry in the manifest has been reviewed by eye — see ART DIRECTION below for
 * what qualifies and what gets rejected.
 */

/* ---------------------------------------------------------------------------
   ART DIRECTION
   ---------------------------------------------------------------------------
   ACCEPT: natural light, real moments, movement, hands, quiet interaction,
   environmental context, texture, muted warm or muted cool tones that sit
   inside the ivory/charcoal palette.

   REJECT: artificial smiles, posed corporate expressions, saturated primary
   colour, neon gels, shopping/lifestyle commercial stock, photographers
   holding cameras, camera-gear flat lays, heart-shaped hands, and anything
   that reads as an obvious stock photograph.

   A candidate is only added to the manifest after it has actually been looked
   at. Verify new IDs resolve with: node scripts/verify-images.mjs <id>...
   --------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
   ASPECT RATIOS
   A fixed vocabulary, mirrored by the --aspect-* tokens in globals.css.
   --------------------------------------------------------------------------- */

export const aspectRatio = {
  panorama: "21:9",
  cinema: "16:9",
  wide: "3:2",
  square: "1:1",
  editorial: "4:5",
  portrait: "3:4",
  tall: "2:3",
} as const;

export type AspectName = keyof typeof aspectRatio;

/**
 * Tailwind classes for each ratio, so wrappers reserve space before load and
 * nothing shifts. Written out in full because Tailwind scans source for
 * literal class names — these cannot be built by string concatenation.
 */
export const aspectClass: Record<AspectName, string> = {
  panorama: "aspect-panorama",
  cinema: "aspect-cinema",
  wide: "aspect-wide",
  square: "aspect-square",
  editorial: "aspect-editorial",
  portrait: "aspect-portrait",
  tall: "aspect-tall",
};

/** Same ratios at the `md` breakpoint and up, for responsive art direction. */
export const aspectClassMd: Record<AspectName, string> = {
  panorama: "md:aspect-panorama",
  cinema: "md:aspect-cinema",
  wide: "md:aspect-wide",
  square: "md:aspect-square",
  editorial: "md:aspect-editorial",
  portrait: "md:aspect-portrait",
  tall: "md:aspect-tall",
};

/* ---------------------------------------------------------------------------
   LOADER
   --------------------------------------------------------------------------- */

/**
 * Delegates resizing to the Unsplash CDN. Any `ar`, `crop` or `fp-*` params
 * already baked into the src by `unsplash()` are preserved — this only layers
 * on the width and quality Next requests for each srcset entry.
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 74));
  return url.toString();
}

type UnsplashOptions = {
  /** Target crop ratio. Omit to use the photograph's native framing. */
  ar?: AspectName;
  /** How the crop is chosen when the ratio differs from the original. */
  crop?: "entropy" | "faces" | "edges" | "center" | "focalpoint";
  /** Focal point 0–1, used with crop: "focalpoint". */
  fp?: { x: number; y: number };
};

/**
 * Builds an art-directed source URL. This is where cropping is decided —
 * never crop with CSS `object-position` when the ratio can be set here.
 */
export function unsplash(id: string, options: UnsplashOptions = {}): string {
  const url = new URL(`https://images.unsplash.com/${id}`);
  const { ar, crop = "entropy", fp } = options;

  if (ar) url.searchParams.set("ar", aspectRatio[ar]);
  url.searchParams.set("crop", crop);

  if (crop === "focalpoint" && fp) {
    url.searchParams.set("fp-x", String(fp.x));
    url.searchParams.set("fp-y", String(fp.y));
  }

  return url.toString();
}

/* ---------------------------------------------------------------------------
   RESPONSIVE SIZES
   Always pass one of these to <Image sizes>. Getting `sizes` wrong is the
   single most expensive performance mistake on an image-led site — the browser
   will download a 2560px file for a 400px slot.
   --------------------------------------------------------------------------- */

export const sizes = {
  /** Full-bleed hero and full-width imagery. */
  full: "100vw",
  /** Two-up editorial pairing. */
  half: "(min-width: 64rem) 50vw, 100vw",
  /** Three-up gallery row. */
  third: "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw",
  /** Image constrained to the standard content column. */
  content: "(min-width: 75rem) 1200px, 92vw",
  /** Offset editorial image — roughly half the column on desktop. */
  offset: "(min-width: 64rem) 46vw, 92vw",
  /** Small supporting detail shot. */
  detail: "(min-width: 64rem) 28vw, 55vw",
} as const;

export type SizesName = keyof typeof sizes;

/* ---------------------------------------------------------------------------
   MANIFEST
   --------------------------------------------------------------------------- */

export type ImageCategory =
  | "hero"
  | "portfolio"
  | "detail"
  | "studio"
  | "cta";

export type StudioImage = {
  /** Unsplash photo id. */
  id: string;
  /** Meaningful alternative text. Never "photo" or "image". */
  alt: string;
  category: ImageCategory;
  orientation: "landscape" | "portrait";
  /**
   * Responsive art direction. Mobile gets a genuinely different crop rather
   * than a squashed desktop frame — this is a requirement, not an option.
   */
  ar: { desktop: AspectName; mobile: AspectName };
  crop?: UnsplashOptions["crop"];
  /** Editorial metadata shown on portfolio hover. */
  title?: string;
  location?: string;
  year?: string;
};

export const images = {
  /** Full-screen opening frame. Warm backlight, muted, unmistakably human. */
  hero: {
    id: "photo-1519741497674-611481863552",
    alt: "A couple standing close together at golden hour, the bride holding a loose garden bouquet as low sun breaks behind them",
    category: "hero",
    orientation: "landscape",
    ar: { desktop: "cinema", mobile: "portrait" },
    crop: "entropy",
    title: "Last Light",
    location: "Umbria, Italy",
    year: "2024",
  },

  /** Large emotional closing frame before the inquiry CTA. */
  cta: {
    id: "photo-1537633552985-df8429e8048b",
    alt: "A couple pressed forehead to forehead on a pebble beach, a long veil trailing across the stones behind them",
    category: "cta",
    orientation: "portrait",
    ar: { desktop: "cinema", mobile: "editorial" },
    // Entropy reads the pebbles as the busiest region and crops the couple out
    // entirely, which leaves the alt text describing something not in frame.
    crop: "faces",
    title: "The Long Veil",
    location: "Pembrokeshire, Wales",
    year: "2024",
  },

  portfolio: [
    {
      id: "photo-1606216794074-735e91aa2c92",
      alt: "A newly married couple walking hand in hand beneath a palm at dusk, laughing at something between them",
      category: "portfolio",
      orientation: "portrait",
      ar: { desktop: "editorial", mobile: "portrait" },
      title: "Evening Walk",
      location: "Cascais, Portugal",
      year: "2024",
    },
    {
      id: "photo-1546032996-6dfacbacbf3f",
      alt: "A couple embracing under a veil lifted by the wind in a wheat field at sunset",
      category: "portfolio",
      orientation: "portrait",
      ar: { desktop: "portrait", mobile: "editorial" },
      title: "Harvest Field",
      location: "Bourgogne, France",
      year: "2023",
    },
    {
      id: "photo-1583939003579-730e3918a45a",
      alt: "Guests throwing petals as a couple kiss in the middle of the aisle after the ceremony",
      category: "portfolio",
      orientation: "portrait",
      ar: { desktop: "editorial", mobile: "portrait" },
      title: "Petals",
      location: "Minas Gerais, Brazil",
      year: "2024",
    },
    {
      id: "photo-1478131143081-80f7f84ca84d",
      alt: "Wedding guests gathered around a fire pit after dark, faces lit by the flames",
      category: "portfolio",
      orientation: "landscape",
      ar: { desktop: "wide", mobile: "square" },
      title: "After Dark",
      location: "Muskoka, Ontario",
      year: "2023",
    },
    {
      id: "photo-1470071459604-3b5ec3a7fe05",
      alt: "Low cloud moving across a green highland ridge at sunrise",
      category: "portfolio",
      orientation: "landscape",
      ar: { desktop: "panorama", mobile: "cinema" },
      title: "Quiraing",
      location: "Isle of Skye, Scotland",
      year: "2023",
    },
    {
      id: "photo-1464207687429-7505649dae38",
      alt: "A small group sitting together on a granite overlook watching the sun drop below distant hills",
      category: "portfolio",
      orientation: "landscape",
      ar: { desktop: "wide", mobile: "square" },
      title: "The Overlook",
      location: "Hudson Valley, New York",
      year: "2022",
    },
    {
      id: "photo-1438761681033-6461ffad8d80",
      alt: "A young woman at the edge of still water in flat evening light, looking straight to camera with the far shore soft behind her",
      category: "portfolio",
      orientation: "landscape",
      ar: { desktop: "editorial", mobile: "portrait" },
      // Native framing is landscape. Entropy reads the empty water as the
      // region worth keeping and crops her out of an upright frame.
      crop: "faces",
      title: "Between Moments",
      year: "2024",
    },
    {
      id: "photo-1499996860823-5214fcc65f8f",
      alt: "A young man indoors in soft window light, freckled and unsmiling, holding the camera's gaze",
      category: "portfolio",
      orientation: "portrait",
      ar: { desktop: "portrait", mobile: "editorial" },
      crop: "faces",
      title: "Light & Shadow",
      year: "2023",
    },
    {
      id: "photo-1504893524553-b855bce32c67",
      alt: "A lone figure standing on the rim of a deep moss-covered canyon, the river winding far below",
      category: "portfolio",
      orientation: "portrait",
      ar: { desktop: "tall", mobile: "portrait" },
      title: "Quiet Places",
      year: "2022",
    },
    {
      id: "photo-1500530855697-b586d89ba3ee",
      alt: "An empty desert road running between red rock walls towards a single dark peak under flat cloud",
      category: "portfolio",
      orientation: "portrait",
      ar: { desktop: "editorial", mobile: "portrait" },
      title: "The Long Way",
      year: "2023",
    },
  ],

  /** Small supporting frames. Texture, hands, objects, quiet detail. */
  details: [
    {
      id: "photo-1465495976277-4387d4b0b4c6",
      alt: "Two hands resting over one another on a bouquet, both wearing new rings",
      category: "detail",
      orientation: "landscape",
      ar: { desktop: "wide", mobile: "square" },
      title: "Rings",
    },
    {
      id: "photo-1509927083803-4bd519298ac4",
      alt: "The couple's shoes side by side on weathered floorboards, green socks showing above the brogues",
      category: "detail",
      orientation: "landscape",
      ar: { desktop: "wide", mobile: "square" },
      title: "Before",
    },
    {
      id: "photo-1525772764200-be829a350797",
      alt: "Tapered candles and blush garden roses on a dressed reception table",
      category: "detail",
      orientation: "portrait",
      ar: { desktop: "editorial", mobile: "portrait" },
      title: "Candlelight",
    },
    {
      id: "photo-1519225421980-715cb0215aed",
      alt: "A long banquet table set for dinner, glassware catching afternoon light down its length",
      category: "detail",
      orientation: "landscape",
      ar: { desktop: "wide", mobile: "cinema" },
      title: "The Long Table",
    },
  ],
} satisfies {
  hero: StudioImage;
  cta: StudioImage;
  portfolio: StudioImage[];
  details: StudioImage[];
};

/* ---------------------------------------------------------------------------
   THE ARCHIVE
   ---------------------------------------------------------------------------
   The editorial view of the same photographs. `ImageCategory` above is
   structural — it says where a frame sits on a page. These categories say what
   the frame is *of*, which is the only thing a reader has any reason to filter
   by.

   Commercial is deliberately absent. The art direction rejects commercial
   lifestyle stock outright, so there is no honest way to fill it; offering the
   filter and returning nothing would read as a broken page.
   --------------------------------------------------------------------------- */

export const workCategories = [
  { slug: "all", label: "All" },
  { slug: "weddings", label: "Weddings" },
  { slug: "couples", label: "Couples" },
  { slug: "portraits", label: "Portraits" },
  { slug: "events", label: "Events" },
  { slug: "lifestyle", label: "Lifestyle" },
] as const;

export type CategorySlug = (typeof workCategories)[number]["slug"];

export type ArchivePiece = {
  /**
   * Titled, not optionally titled. The archive prints a credit under every
   * frame, so an untitled photograph has no place in it — and this makes that
   * fail in the manifest rather than as a blank line on the page.
   */
  image: StudioImage & { title: string };
  category: Exclude<CategorySlug, "all">;
  /** The one piece that carries the cover treatment. */
  featured?: boolean;
};

const frames = images.portfolio;
const detail = images.details;

/**
 * Order is the composition. The gallery reads straight down this list, so a run
 * of similar crops here becomes a run of similar rows on the page.
 */
export const archive: ArchivePiece[] = [
  { image: images.hero, category: "weddings", featured: true },
  { image: frames[2], category: "weddings" },
  { image: detail[0], category: "weddings" },
  { image: detail[1], category: "weddings" },

  { image: images.cta, category: "couples" },
  { image: frames[0], category: "couples" },
  { image: frames[1], category: "couples" },

  { image: frames[6], category: "portraits" },
  { image: frames[7], category: "portraits" },

  { image: frames[3], category: "events" },
  { image: detail[2], category: "events" },
  { image: detail[3], category: "events" },

  { image: frames[5], category: "lifestyle" },
  { image: frames[8], category: "lifestyle" },
  { image: frames[9], category: "lifestyle" },
];

/**
 * The frame that stands in for the film work. Held out of the archive above so
 * the portfolio never shows the same photograph twice on one page.
 */
export const filmPoster = frames[4];

export function isCategorySlug(value: string): value is CategorySlug {
  return workCategories.some((c) => c.slug === value);
}

export function categoryLabel(slug: CategorySlug): string {
  return workCategories.find((c) => c.slug === slug)!.label;
}

export function piecesIn(slug: CategorySlug): ArchivePiece[] {
  return slug === "all" ? archive : archive.filter((piece) => piece.category === slug);
}

/* ---------------------------------------------------------------------------
   VIDEO
   ---------------------------------------------------------------------------
   Video is used sparingly and never autoplays with sound. Every clip needs a
   poster frame drawn from the image manifest so the block is composed before
   playback begins, and so it degrades to a still on slow connections.

   Defaults for ambient background film: muted, loop, playsInline, autoPlay,
   preload="metadata", poster set. Reduced motion or save-data means the poster
   is shown and the video never loads.

   Defaults for a featured film: controls, no autoplay, poster set, opened in a
   modal with focus trapped and Escape to close.
   --------------------------------------------------------------------------- */

export const videoDefaults = {
  ambient: {
    muted: true,
    loop: true,
    playsInline: true,
    autoPlay: true,
    preload: "metadata",
  },
  featured: {
    muted: false,
    loop: false,
    playsInline: true,
    autoPlay: false,
    controls: true,
    preload: "none",
  },
} as const;
