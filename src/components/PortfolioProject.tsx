"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  aspectClass,
  aspectClassMd,
  desktopWidths,
  fallbackSrc,
  mobileWidths,
  slotSizes,
  srcSet,
  type AspectName,
  type StudioImage,
} from "@/lib/images";
import { duration, ease, maskUp, reducedVariants, viewport, withDelay } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * A single portfolio entry.
 *
 * Desktop hover: the frame stays put, the photograph inside it scales a little,
 * a soft scrim lifts, and the title and location fade up. The interaction
 * happens *inside* the frame — the tile itself never moves, which is what keeps
 * a gallery of these from feeling like a grid of buttons.
 *
 * Touch and reduced motion: metadata is always visible and nothing scales.
 * There is no hover state to discover, so none is required.
 */

type PortfolioProjectProps = {
  image: StudioImage;
  href?: string;
  /** How wide this frame renders. Build it with `slotSizes(desktop, mobile)`. */
  sizes?: string;
  ar?: { desktop: AspectName; mobile: AspectName };
  delay?: number;
  /** Index shown in the corner rail, e.g. 01. */
  index?: number;
  className?: string;
};

export function PortfolioProject({
  image,
  href = "#",
  sizes = slotSizes(6, 12),
  ar,
  delay = 0,
  index,
  className,
}: PortfolioProjectProps) {
  const reduced = useReducedMotion();
  const ratio = ar ?? image.ar;

  const hoverTransition = { duration: duration.slow, ease: ease.editorial };

  return (
    <motion.article
      className={cn("group/project relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/*
       * The mask sits on an inner element, never on the observed one. At
       * `inset(100% …)` the card paints nothing and Chrome reports an empty
       * intersection rect, so an observer attached to the masked node would
       * never fire and the card would stay invisible permanently.
       */}
      <motion.div
        data-reveal
        variants={reduced ? reducedVariants : withDelay(maskUp, delay)}
      >
        <Link
          href={href}
          data-cursor="view"
          className="block focus-visible:outline-offset-4"
          aria-label={`${image.title ?? "Project"}${image.location ? `, ${image.location}` : ""}`}
        >
          <div
            className={cn(
              "relative overflow-hidden bg-surface",
              aspectClass[ratio.mobile],
              aspectClassMd[ratio.desktop]
            )}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              whileHover={reduced ? undefined : { scale: 1.05 }}
              transition={hoverTransition}
            >
              <picture>
                <source
                  media="(min-width: 48rem)"
                  srcSet={srcSet(image, ratio.desktop, desktopWidths)}
                  sizes={sizes}
                />
                <img
                  src={fallbackSrc(image, ratio.mobile)}
                  srcSet={srcSet(image, ratio.mobile, mobileWidths)}
                  sizes={sizes}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </motion.div>

            {/* Scrim. Present but weightless until hover, so the metadata below
                always has something to sit against — including on the pale,
                high-key frames, which are the ones that actually threaten the
                12px location line. Measured, not guessed: at /55 that line fell
                to 3.3:1 over the brightest images in the set. */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0",
                "bg-linear-to-t from-ink-900/75 via-ink-900/10 to-transparent",
                "opacity-0 transition-opacity duration-(--duration-slow) ease-editorial",
                "group-hover/project:opacity-100 group-focus-within/project:opacity-100",
                "max-md:opacity-100"
              )}
            />

            {index !== undefined && (
              <span className="type-meta absolute left-5 top-5 text-text-inverse opacity-0 transition-opacity duration-(--duration-slow) ease-editorial group-hover/project:opacity-80 group-focus-within/project:opacity-80 max-md:opacity-80">
                {String(index).padStart(2, "0")}
              </span>
            )}

            {/* Overlay metadata — desktop hover only. The static rail below
                carries the same information everywhere else. */}
            <div
              className={cn(
                "pointer-events-none absolute inset-x-5 bottom-5 hidden md:flex",
                "items-end justify-between gap-4",
                "translate-y-2 opacity-0",
                "transition-[opacity,transform] duration-(--duration-slow) ease-editorial",
                "group-hover/project:translate-y-0 group-hover/project:opacity-100",
                "group-focus-within/project:translate-y-0 group-focus-within/project:opacity-100"
              )}
            >
              <span className="flex flex-col gap-1 text-text-inverse">
                <span className="type-h3 font-display">{image.title}</span>
                <span className="type-meta text-text-inverse opacity-75">
                  {image.location}
                </span>
              </span>
              <span className="type-nav shrink-0 text-text-inverse">View &rarr;</span>
            </div>
          </div>

          {/* Static caption rail. Always visible on mobile, where there is no
              hover; hidden on desktop once the overlay takes over. */}
          <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-border pt-3 md:hidden">
            <span className="type-meta text-text">{image.title}</span>
            <span className="type-meta">
              {[image.location, image.year].filter(Boolean).join(" · ")}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}
