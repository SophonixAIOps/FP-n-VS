import type { Variants, Transition } from "motion/react";

/**
 * FRAME & STORY STUDIO — MOTION SYSTEM
 *
 * Motion is slow, intentional and cinematic. The page should feel like it is
 * moving *with* the photography, never like the interface is performing.
 *
 * Durations mirror the CSS custom properties in globals.css (in seconds here,
 * milliseconds there). Change both together.
 *
 * Never pick a duration or easing ad-hoc inside a component — compose from
 * the values in this file so the whole site shares one motion language.
 */

type Cubic = [number, number, number, number];

/* ---------------------------------------------------------------------------
   TIMING
   --------------------------------------------------------------------------- */

export const duration = {
  /** Cursor tracking, colour swaps. Perceptually immediate. */
  instant: 0.12,
  /** Hover states, small UI feedback. */
  fast: 0.24,
  /** Default for most interface transitions. */
  standard: 0.42,
  /** Content reveals, menu overlays. */
  slow: 0.72,
  /** Full-bleed image reveals, hero entrances. */
  cinematic: 1.2,
} as const;

export type DurationName = keyof typeof duration;

/* ---------------------------------------------------------------------------
   EASING
   --------------------------------------------------------------------------- */

export const ease: Record<
  "editorial" | "cinematic" | "mask" | "inOut",
  Cubic
> = {
  /** Default. Quick departure, long soft settle. */
  editorial: [0.22, 1, 0.36, 1],
  /** Softest settle. Large imagery and hero type. */
  cinematic: [0.16, 1, 0.3, 1],
  /** Sharp in, sharp out. Clip-path masks and the menu overlay. */
  mask: [0.77, 0, 0.175, 1],
  /** Symmetric. Anything that moves out and back. */
  inOut: [0.65, 0, 0.35, 1],
};

/* ---------------------------------------------------------------------------
   TRANSITION PRESETS
   --------------------------------------------------------------------------- */

export const transition = {
  hover: { duration: duration.fast, ease: ease.editorial },
  ui: { duration: duration.standard, ease: ease.editorial },
  reveal: { duration: duration.slow, ease: ease.editorial },
  image: { duration: duration.cinematic, ease: ease.cinematic },
  mask: { duration: duration.cinematic, ease: ease.mask },
  overlay: { duration: duration.slow, ease: ease.mask },
} satisfies Record<string, Transition>;

/**
 * Default scroll trigger. Reveals fire once, slightly before the element is
 * fully in view, so content is never still animating when the reader arrives.
 */
export const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -12% 0px",
} as const;

/* ---------------------------------------------------------------------------
   REVEAL LANGUAGE
   Four patterns only. Using a small, fixed set is what makes the site feel
   coherent rather than animated.
   --------------------------------------------------------------------------- */

/** Plain opacity. Supporting copy, metadata, anything secondary. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.reveal },
};

/** Opacity + short rise. The default for text blocks and headings. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.reveal },
};

/** REVEAL A — vertical mask. Image uncovers from the bottom edge upward. */
export const maskUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: transition.mask },
};

/** REVEAL B — horizontal mask. Image uncovers left to right. */
export const maskRight: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: transition.mask },
};

/** REVEAL C — scale + fade. The quietest image reveal; use when stacked. */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: transition.image },
};

/** REVEAL D — clip expansion from an inset frame. Reserved for hero imagery. */
export const clipExpand: Variants = {
  hidden: { clipPath: "inset(14% 14% 14% 14%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: transition.mask },
};

/**
 * Counter-scale applied to the <img> *inside* a masked wrapper. The image
 * drifts from slightly oversized back to rest while the mask opens — this is
 * what gives a reveal its cinematic weight. Always pair with maskUp/maskRight.
 */
export const imageDrift: Variants = {
  hidden: { scale: 1.12 },
  visible: { scale: 1, transition: transition.image },
};

export const revealVariants = {
  fade,
  fadeUp,
  maskUp,
  maskRight,
  scaleFade,
  clipExpand,
} as const;

export type RevealName = keyof typeof revealVariants;

/**
 * Returns a copy of a variant set with a delay applied to its `visible` state.
 * Needed because a transition declared inside a variant takes precedence over
 * the element-level `transition` prop, so delay cannot simply be passed down.
 */
export function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible;
  if (typeof visible !== "object" || visible === null) return variants;

  const { transition: inner, ...rest } = visible as Record<string, unknown> & {
    transition?: Transition;
  };

  return {
    ...variants,
    visible: { ...rest, transition: { ...inner, delay } },
  };
}

/* ---------------------------------------------------------------------------
   STAGGER
   --------------------------------------------------------------------------- */

/**
 * Parent variant that sequences children. Keep stagger generous — fast
 * staggers read as a UI list, slow staggers read as editorial pacing.
 */
export function staggerContainer(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/* ---------------------------------------------------------------------------
   PAGE TRANSITION
   Target 400–700ms total. Exit is faster than enter so navigation feels
   responsive while arrival still feels composed.
   --------------------------------------------------------------------------- */

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.cinematic },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.standard, ease: ease.inOut },
  },
};

/** The ivory wipe that passes over the viewport between routes. */
export const transitionVeil: Variants = {
  hidden: { scaleY: 0, transformOrigin: "bottom" },
  visible: {
    scaleY: 1,
    transformOrigin: "bottom",
    transition: { duration: duration.standard, ease: ease.mask },
  },
  exit: {
    scaleY: 0,
    transformOrigin: "top",
    transition: { duration: duration.standard, ease: ease.mask },
  },
};

/* ---------------------------------------------------------------------------
   MOBILE MENU OVERLAY
   --------------------------------------------------------------------------- */

export const menuOverlay: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: duration.slow, ease: ease.mask },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: duration.standard, ease: ease.mask },
  },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.editorial },
  },
  exit: { opacity: 0, transition: { duration: duration.instant } },
};

/* ---------------------------------------------------------------------------
   REDUCED MOTION
   --------------------------------------------------------------------------- */

/**
 * Collapses any variant set to a plain opacity fade. Components call this when
 * `useReducedMotion()` is true so content still arrives, but without transform,
 * scale or clip-path movement.
 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.instant } },
};
