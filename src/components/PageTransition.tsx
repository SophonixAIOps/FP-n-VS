"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

/**
 * Route transition — the turning page.
 *
 * Belongs in `app/template.tsx`, which React remounts on every navigation.
 * That remount is the trigger; no route observer is needed.
 *
 * The sequence, about 700ms end to end:
 *   1. An ivory veil already covers the viewport as the new route mounts.
 *   2. It retracts upward, wiping the new page into view.
 *   3. Content settles up behind it, overlapping the wipe so the two read as
 *      one movement rather than two steps.
 *
 * This is enter-only by design. A true exit animation would mean holding the
 * outgoing page in the tree and delaying every navigation by the length of its
 * exit — that buys a symmetrical animation at the cost of making the whole site
 * feel slower. The veil gives the same sense of a page turning without ever
 * standing between the reader and the content they asked for.
 *
 * Reduced motion is handled by shortening the animation, never by returning a
 * different tree. The server cannot know the preference, so a branch here
 * renders one structure on the server and another on the client — a hydration
 * mismatch on every route of the site. `transition` is safe to vary because it
 * never reaches the server HTML; structure and `initial` are not. The matching
 * rules in globals.css neutralise the veil for the window before hydration.
 */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const instant = { duration: 0 };

  return (
    <>
      <motion.div
        key={`veil-${pathname}`}
        data-page-veil
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-bg"
        style={{ zIndex: "var(--z-transition)", transformOrigin: "top" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={
          reduced ? instant : { duration: duration.standard, ease: ease.mask }
        }
      />

      <motion.div
        key={pathname}
        data-page-enter
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduced
            ? instant
            : { duration: duration.slow, ease: ease.cinematic, delay: 0.1 }
        }
      >
        {children}
      </motion.div>
    </>
  );
}
