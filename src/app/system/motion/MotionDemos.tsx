"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

/** Interactive pieces of the motion specimen. Proofs only — not production. */

/** Plots a cubic-bezier so the curve can be read rather than described. */
export function EasingCurve({
  curve,
}: {
  curve: readonly [number, number, number, number];
}) {
  const [x1, y1, x2, y2] = curve;

  // SVG y runs downward, so progress is inverted to plot conventionally.
  const path = `M 0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`;

  return (
    <div className="aspect-square w-full max-w-[13rem] border border-border bg-surface">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        role="img"
        aria-label={`Easing curve cubic-bezier(${curve.join(", ")})`}
      >
        {/* Linear reference, for comparison against the curve. */}
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          stroke="var(--color-border-strong)"
          strokeWidth="0.4"
          strokeDasharray="2 2"
          opacity="0.6"
        />
        <line x1="0" y1="100" x2="100" y2="100" stroke="var(--color-border-strong)" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="var(--color-border-strong)" strokeWidth="0.5" />
        <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * Runs a single translate at a given duration so steps on the scale can be
 * compared directly against one another.
 */
export function ReplayStage({ durationMs }: { durationMs: number }) {
  const [key, setKey] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="flex items-center gap-5">
      {/* The container query unit below resolves against this element. */}
      <div
        className="relative h-10 flex-1 overflow-hidden border border-border bg-surface"
        style={{ containerType: "inline-size" }}
      >
        <motion.div
          key={key}
          className="absolute inset-y-0 left-0 w-10 bg-ink-900"
          initial={{ x: 0 }}
          animate={{ x: "calc(100cqw - 2.5rem)" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: durationMs / 1000, ease: ease.editorial }
          }
        />
      </div>

      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="type-nav shrink-0 border border-border-strong px-4 py-2 transition-colors duration-[var(--duration-fast)] hover:border-ink-900"
      >
        Replay
      </button>
    </div>
  );
}
