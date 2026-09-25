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

const aspectRatio = {
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
 * on the width and quality for one srcset candidate.
 *
 * Quality defaults to 74 and no caller overrides it. Keeping it one number
 * rather than a per-call-site knob is deliberate: quality is a house style, and
 * a site where each frame picks its own drifts within a single scroll.
 */
function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
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
function unsplash(id: string, options: UnsplashOptions = {}): string {
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

/**
 * Builds a fixed-size absolute URL for a social preview card.
 *
 * Separate from `unsplash()` because the aspect vocabulary has no 1.91:1 entry
 * and should not grow one: 1200×630 is a social-platform convention, not a
 * composition choice the design system makes. Width and height are requested
 * explicitly so the dimensions declared in the metadata are the dimensions
 * actually served.
 *
 * `crop: "faces"` rather than the manifest's usual entropy. Both were rendered
 * at 1200×630 and looked at; entropy pulls the frame up into the sun flare,
 * faces keeps the couple where the alt text says they are. The margin is small,
 * so if this image is ever swapped, look at the new crop rather than assuming
 * the setting carries over.
 */
export function socialImage(id: string, width = 1200, height = 630): string {
  const url = new URL(`https://images.unsplash.com/${id}`);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "faces");
  url.searchParams.set("w", String(width));
  url.searchParams.set("h", String(height));
  url.searchParams.set("q", "80");
  return url.toString();
}

/* ---------------------------------------------------------------------------
   RESPONSIVE SIZES
   ---------------------------------------------------------------------------
   Getting `sizes` wrong is the most expensive mistake available on an image-led
   site. The browser picks its srcset candidate from this number alone, before
   layout exists, so a wrong value is paid for on every single page load.

   These are derived from the grid rather than estimated. Editorial images sit
   in the twelve-column grid inside `max-w-wide`, whose content box measures:

     vw <= 400px      vw - 40px   the gutter bottoms out at 1.25rem
     400px - 1536px   90vw        the gutter is 5vw a side
     vw >= 1536px     1392px      96rem container less two 4.5rem gutters

   so a slot spanning n of the twelve columns is n/12 of that. The 24px column
   gaps are left out, which over-states a slot by under 4%. That is the safe
   direction: an under-stated `sizes` serves a soft image, and quality comes
   before bytes.
   --------------------------------------------------------------------------- */

/** `max-w-wide` (96rem) less its two 4.5rem gutters. */
const WIDE_CONTENT_MAX = 1392;

/** Where `md:col-span-*` engages, and so where the desktop <source> takes over. */
const MD = "(min-width: 48rem)";

/** Where 90vw overtakes WIDE_CONTENT_MAX and the container stops growing. */
const CAPPED = "(min-width: 97rem)";

const columnsToVw = (span: number) => Number(((span / 12) * 90).toFixed(2));

/**
 * The `sizes` attribute for an image filling `desktop` of the twelve columns
 * above 48rem and `mobile` of them below it.
 *
 * Pass the same numbers given to the enclosing `GridItem`. They are meant to be
 * read side by side — a slot that states its width two lines from where it sets
 * it is a slot that cannot quietly drift out of sync.
 */
export function slotSizes(desktop: number, mobile: number = 12): string {
  const cap = Math.round((desktop / 12) * WIDE_CONTENT_MAX);
  return `${CAPPED} ${cap}px, ${MD} ${columnsToVw(desktop)}vw, ${columnsToVw(mobile)}vw`;
}

/** Edge-to-edge imagery: heroes, film beats, section dividers. */
export const SIZES_FULL = "100vw";

/*
 * The three slots below are not grid columns, so they are measured rather than
 * spanned. All three sit in a `content` container, whose box is min(90vw,
 * 1080px) — 75rem wide, less two gutters that stop growing at 4.5rem.
 */

/** The full width of a `content` container. */
export const SIZES_CONTENT = "(min-width: 75rem) 1080px, 90vw";

/** One column of an even `SplitLayout` at `gap="lg"`: (box - 80px) / 2. */
export const SIZES_SPLIT = `(min-width: 75rem) 500px, ${MD} calc(45vw - 40px), 90vw`;

/** The media column of a `media-wide` split — 1.4fr of 2.4fr, after the gap. */
export const SIZES_MEDIA_COLUMN = `(min-width: 75rem) 583px, ${MD} calc(52.5vw - 46px), 90vw`;

/* ---------------------------------------------------------------------------
   SRCSET
   --------------------------------------------------------------------------- */

/**
 * One ladder, sliced for the two sources. Steps sit roughly 1.2x apart, which
 * bounds rounding waste at about 20% — tighter spacing buys very little once
 * `sizes` is honest, and costs srcset markup on every frame.
 *
 * The low end is there for the desktop <source>: at 768px, where it takes over,
 * a four-column slot is only about 230px wide.
 */
const WIDTHS = [
  260, 340, 420, 480, 560, 640, 750, 828, 960, 1080, 1280, 1440, 1600, 1920, 2560,
];

/** Below 48rem the viewport is the ceiling, so the top of the ladder is dead weight. */
export const mobileWidths = WIDTHS.filter((w) => w <= 1440);
export const desktopWidths = WIDTHS;

/**
 * Every `<source>` and `<img>` on the site gets its candidates from here, so
 * crop and focal point travel with the image rather than being re-specified —
 * and forgotten — at each call site.
 */
export function srcSet(
  image: StudioImage,
  ar: AspectName,
  widths: readonly number[]
): string {
  const src = unsplash(image.id, { ar, crop: image.crop, fp: image.fp });
  return widths.map((w) => `${unsplashLoader({ src, width: w })} ${w}w`).join(", ");
}

/** The `src` a browser without srcset support falls back to. */
export function fallbackSrc(image: StudioImage, ar: AspectName, width = 828): string {
  const src = unsplash(image.id, { ar, crop: image.crop, fp: image.fp });
  return unsplashLoader({ src, width });
}

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
  /**
   * Focal point, 0–1 from the top left. Read only when `crop` is
   * "focalpoint" — set both or neither.
   *
   * Nothing in the manifest needs one today. Every frame below was reviewed at
   * both its desktop and its mobile aspect and entropy or faces held the
   * subject in every case, so a focal point here would be a guess overriding a
   * measurement. It exists for the frame that eventually defeats both.
   */
  fp?: UnsplashOptions["fp"];
  /** Editorial metadata shown on portfolio hover. */
  title?: string;
  /**
   * Where the photograph was taken — a caption, not business geography.
   *
   * Two things follow from that, and both matter. It says nothing about where
   * the studio is based or will travel: that lives in `studio.location` and
   * `studio.serviceArea`, and reading these captions as a service area would
   * be an invention. And the values here are illustrative, like the imagery
   * they caption — the photographs are licensed stock standing in for
   * commissioned work, so these places are where the archive says a frame was
   * made rather than where it was.
   *
   * Never feed this into structured data. Once a studio replaces the manifest
   * with its own work, real capture locations become legitimate `contentLocation`
   * on a per-photograph `ImageObject` — but only then, and only per photograph.
   */
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
   There is none, and that is a decision rather than an omission. The two places
   the site talks about film — the homepage beat and the portfolio beat — are
   poster frames held behind a scrim. No clip has been licensed for this build,
   and a still we can actually stand behind beats a remote video that may not
   load, cannot be art-directed per breakpoint, and costs megabytes on a phone.

   A set of unused `videoDefaults` used to sit here describing how a clip would
   be configured. It had no consumers and no asset, so it documented an
   intention as though it were an implementation. If a real clip ever arrives,
   the rules that matter are in DESIGN.md.
   --------------------------------------------------------------------------- */
