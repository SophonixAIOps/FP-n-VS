"use client";

import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` makes Motion honour the OS setting globally: transform
 * and layout animations are dropped while opacity still animates, so content
 * arrives without movement. Clip-path reveals are not covered by that, which is
 * why components also check `useReducedMotion()` and globals.css carries a CSS
 * backstop.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
