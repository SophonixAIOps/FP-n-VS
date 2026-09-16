"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  unsplash,
  unsplashLoader,
  aspectClass,
  aspectClassMd,
  sizes as sizePresets,
  type AspectName,
  type SizesName,
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

const SRCSET_WIDTHS = [420, 640, 828, 1080, 1280, 1600, 1920];
const MOBILE_WIDTHS = [420, 640, 828, 1080];

function buildSrcSet(
  id: string,
  ar: AspectName,
  crop: StudioImage["crop"],
  widths: number[]
) {
  return widths
    .map(
      (w) =>
        `${unsplashLoader({ src: unsplash(id, { ar, crop }), width: w, quality: 74 })} ${w}w`
    )
    .join(", ");
}

type PortfolioProjectProps = {
  image: StudioImage;
  href?: string;
  size?: SizesName;
  ar?: { desktop: AspectName; mobile: AspectName };
  delay?: number;
  /** Index shown in the corner rail, e.g. 01. */
  index?: number;
  className?: string;
};

export function PortfolioProject({
  image,
  href = "#",
  size = "half",
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
      data-reveal
      className={cn("group/project relative", className)}
      variants={reduced ? reducedVariants : withDelay(maskUp, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
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
                srcSet={buildSrcSet(image.id, ratio.desktop, image.crop, SRCSET_WIDTHS)}
                sizes={sizePresets[size]}
              />
              <img
                src={unsplashLoader({
                  src: unsplash(image.id, { ar: ratio.mobile, crop: image.crop }),
                  width: 828,
                  quality: 74,
                })}
                srcSet={buildSrcSet(image.id, ratio.mobile, image.crop, MOBILE_WIDTHS)}
                sizes={sizePresets[size]}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          </motion.div>

          {/* Scrim. Present but weightless until hover, so the metadata below
              always has something to sit against on darker photographs. */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-gradient-to-t from-ink-900/55 via-ink-900/5 to-transparent",
              "opacity-0 transition-opacity duration-[var(--duration-slow)] ease-editorial",
              "group-hover/project:opacity-100 group-focus-within/project:opacity-100",
              "max-md:opacity-100"
            )}
          />

          {index !== undefined && (
            <span className="type-meta absolute left-5 top-5 text-text-inverse opacity-0 transition-opacity duration-[var(--duration-slow)] ease-editorial group-hover/project:opacity-80 group-focus-within/project:opacity-80 max-md:opacity-80">
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
              "transition-[opacity,transform] duration-[var(--duration-slow)] ease-editorial",
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
    </motion.article>
  );
}
