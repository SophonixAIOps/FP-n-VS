"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  reducedVariants,
  revealVariants,
  staggerContainer,
  viewport,
  withDelay,
  type RevealName,
} from "@/lib/motion";

/**
 * Scroll-triggered reveal for text and layout blocks.
 *
 * Reveals fire once and slightly before the element is centred, so nothing is
 * still moving by the time the reader's eye reaches it. Images use
 * `EditorialImage` instead — it adds the mask-plus-drift pairing.
 */

type RevealProps = {
  children: React.ReactNode;
  variant?: RevealName;
  /** Seconds. Use to offset a block against its neighbour. */
  delay?: number;
  className?: string;
};

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? reducedVariants
    : withDelay(revealVariants[variant], delay);

  return (
    <motion.div
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

type RevealGroupProps = {
  children: React.ReactNode;
  /** Seconds between each child. Keep it slow — fast stagger reads as a list. */
  stagger?: number;
  delay?: number;
  className?: string;
};

/**
 * Sequences a set of `RevealItem` children. Use for a heading plus supporting
 * copy plus a call to action, not for long lists.
 */
export function RevealGroup({
  children,
  stagger = 0.12,
  delay = 0,
  className,
}: RevealGroupProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduced ? reducedVariants : staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

/** A child of `RevealGroup`. Inherits its animation state from the parent. */
export function RevealItem({
  children,
  variant = "fadeUp",
  className,
}: {
  children: React.ReactNode;
  variant?: RevealName;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      variants={reduced ? reducedVariants : revealVariants[variant]}
    >
      {children}
    </motion.div>
  );
}
