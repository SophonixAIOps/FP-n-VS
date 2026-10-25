"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  aspectClass,
  aspectClassMd,
  desktopWidths,
  fallbackSrc,
  mobileWidths,
  slotSizes,
  srcSet,
  SIZES_FULL,
  type AspectName,
  type StudioImage,
} from "@/lib/images";
import {
  clipExpand,
  imageDrift,
  maskRight,
  maskUp,
  reducedVariants,
  scaleFade,
  viewport,
  withDelay,
} from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Meta } from "./Typography";

/**
 * The core image primitive. Every photograph on the site goes through here.
 *
 * Why this is hand-rolled rather than `next/image`:
 * the brief requires genuine responsive art direction — mobile gets a
 * different *crop*, not a squeezed desktop frame. `next/image` renders a single
 * <img> and cannot vary the source by media query. A <picture> with two
 * <source> sets does it properly, and since resizing already happens on the
 * Unsplash CDN we give up nothing by not routing through the Next optimizer.
 *
 * Layout shift is prevented by the aspect-ratio on the wrapper, which is
 * reserved before any bytes arrive.
 */

/** Where `md:` engages, and so where the art direction switches crop. */
const DESKTOP_BREAKPOINT = "(min-width: 48rem)";

const revealVariantMap = {
  maskUp,
  maskRight,
  scaleFade,
  clipExpand,
} as const;

/* -------------------------------------------------------------------------- */

/**
 * Drifts the photograph against the scroll so the frame reads as a window onto
 * it rather than a box containing it.
 *
 * Three things make this safe to add to an element that is already animating:
 *
 * 1. It owns its own element. The mask writes `clip-path` and the drift writes
 *    `scale`; a translate sharing either of those nodes would have to be
 *    composed with them on every frame. A dedicated layer keeps each transform
 *    on exactly one element.
 * 2. The travel room is `inset`, not `scale`. Oversizing the layer by 6% a side
 *    means the parallax never exposes an edge, without putting a second
 *    transform on the node.
 * 3. It never branches on `useReducedMotion`. The range is identical on the
 *    server and the client, so the SSR'd transform always matches; the reduce
 *    case is handled by the `[data-parallax]` rule in globals.css, which is how
 *    the veil and the reveals are already neutralised.
 *
 * It is opt-in because `useScroll` attaches per target — worth it on a
 * full-bleed frame, wasteful on every thumbnail in a grid.
 */
const PARALLAX_TRAVEL = "5%";

function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Negative to positive: the image lags the page, settling downward through
  // the frame as the reader scrolls past it.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${PARALLAX_TRAVEL}`, PARALLAX_TRAVEL]
  );

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div data-parallax className="absolute -inset-[6%]" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export type ImageRevealName = keyof typeof revealVariantMap | "none";

export type EditorialImageProps = {
  image: StudioImage;
  /**
   * How wide this frame actually renders. Build it with `slotSizes(desktopSpan,
   * mobileSpan)` next to the `GridItem` that sets those spans, or use
   * `SIZES_FULL` / `SIZES_SPLIT` for the two slots that are not grid columns.
   */
  sizes?: string;
  /** Which reveal the image uses when it enters the viewport. */
  reveal?: ImageRevealName;
  /** Above the fold. Loads eagerly at high priority — hero only. */
  priority?: boolean;
  /** Overrides the crop pair from the manifest. */
  ar?: { desktop: AspectName; mobile: AspectName };
  /** Stagger offset in seconds. */
  delay?: number;
  /** Drifts the photograph against the scroll. Full-bleed frames only. */
  parallax?: boolean;
  /**
   * Fills the nearest positioned ancestor instead of holding its own aspect
   * ratio. For full-viewport heroes, where the section sets the height.
   */
  fill?: boolean;
  /** Renders the caption rail beneath the frame. */
  caption?: React.ReactNode;
  className?: string;
};

export function EditorialImage({
  image,
  sizes = slotSizes(12, 12),
  reveal = "maskUp",
  priority = false,
  ar,
  delay = 0,
  parallax = false,
  fill = false,
  caption,
  className,
}: EditorialImageProps) {
  const reduced = useReducedMotion();
  const ratio = ar ?? image.ar;

  const frame = (
    <picture>
      <source
        media={DESKTOP_BREAKPOINT}
        srcSet={srcSet(image, ratio.desktop, desktopWidths)}
        sizes={sizes}
      />
      <img
        src={fallbackSrc(image, ratio.mobile)}
        srcSet={srcSet(image, ratio.mobile, mobileWidths)}
        sizes={sizes}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        // Never "sync": it blocks the main thread on the one image the
        // page can least afford to stall behind. fetchPriority already
        // wins the hero the bandwidth it needs.
        decoding={priority ? "auto" : "async"}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );

  const wrapperVariants =
    reduced || reveal === "none"
      ? reducedVariants
      : withDelay(revealVariantMap[reveal], delay);

  return (
    <figure className={cn("m-0", fill && "absolute inset-0", className)}>
      {/*
       * The element carrying `whileInView` must never be the masked one. A mask
       * that starts at `inset(100% …)` paints nothing, and Chrome reports an
       * empty intersection rect for it — the observer never crosses its
       * threshold, so the reveal that would open the mask never fires and the
       * image stays invisible for good. Observing an unclipped parent and
       * letting the variant label propagate down breaks that deadlock.
       */}
      <motion.div
        className={cn(
          // The warm surface tone shows through until the image paints, so a
          // slow connection sees the palette rather than a white hole.
          "relative overflow-hidden bg-surface",
          fill ? "h-full w-full" : aspectClass[ratio.mobile],
          !fill && aspectClassMd[ratio.desktop]
        )}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div
          data-reveal
          className="absolute inset-0"
          variants={wrapperVariants}
        >
          <motion.div
            data-drift
            className="absolute inset-0"
            variants={reduced ? undefined : imageDrift}
          >
            {parallax ? <ParallaxLayer>{frame}</ParallaxLayer> : frame}
          </motion.div>
        </motion.div>
      </motion.div>

      {caption && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-6 border-t border-border pt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Edge-to-edge photograph. Breaks out of whatever container it sits in.
 * Used for the hero, the closing frame, and section dividers.
 */
export function FullBleedImage({
  className,
  sizes = SIZES_FULL,
  ...props
}: EditorialImageProps) {
  return (
    <EditorialImage
      {...props}
      sizes={sizes}
      className={cn("full-bleed", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */

type OverlayPosition = "center" | "bottom-left" | "bottom-center";

const overlayPositionClass: Record<OverlayPosition, string> = {
  center: "items-center justify-center text-center",
  "bottom-left": "items-end justify-start text-left",
  "bottom-center": "items-end justify-center text-center",
};

const scrimClass = {
  none: "",
  soft: "bg-gradient-to-t from-ink-900/55 via-ink-900/15 to-transparent",
  strong: "bg-gradient-to-t from-ink-900/80 via-ink-900/40 to-ink-900/15",
};

/**
 * Photograph carrying text.
 *
 * The scrim is not optional styling — it is what makes the type legible
 * regardless of which image loads behind it. Set `scrim="none"` only when the
 * overlay content is itself decorative.
 */
export function ImageOverlay({
  children,
  scrim = "soft",
  position = "bottom-left",
  className,
  ...imageProps
}: EditorialImageProps & {
  children: React.ReactNode;
  scrim?: keyof typeof scrimClass;
  position?: OverlayPosition;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <EditorialImage {...imageProps} />

      {scrim !== "none" && (
        <div aria-hidden="true" className={cn("absolute inset-0", scrimClass[scrim])} />
      )}

      <div
        className={cn(
          "absolute inset-0 flex p-6 sm:p-10",
          overlayPositionClass[position]
        )}
      >
        <div className="text-text-inverse">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Standard caption rail: title on the left, location and year on the right. */
export function ImageCaption({ image }: { image: StudioImage }) {
  return (
    <>
      <Meta className="text-text">{image.title}</Meta>
      <Meta>
        {[image.location, image.year].filter(Boolean).join(" · ")}
      </Meta>
    </>
  );
}
