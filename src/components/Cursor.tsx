"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { duration, ease } from "@/lib/motion";

/**
 * Custom desktop cursor.
 *
 * A small dot by default. Over anything carrying `data-cursor`, it grows into a
 * labelled disc — VIEW on portfolio frames and links into the work, PLAY on
 * film, BOOK on anything that opens an inquiry.
 *
 * Strictly an enhancement. It only mounts on devices with a fine pointer and
 * hover, and never under reduced motion, so touch users and anyone who has
 * asked for less movement get the native cursor untouched. The native cursor is
 * only hidden once this one is actually running — if it fails, the page is
 * still usable.
 */

/*
 * One word each, and the same words the page uses. "Book" is the short form of
 * the site's primary call to action — a disc reading "Inquire" over a button
 * labelled Book a Session is two names for one thing.
 */
const LABELS: Record<string, string> = {
  view: "View",
  play: "Play",
  inquire: "Book",
};

/*
 * The disc is always laid out at DISC px and scaled down to the dot, rather
 * than animating width and height between the two. Those are layout
 * properties: tweening them ran layout and paint on every frame of a 420ms
 * transition, while a pointermove handler was already writing to the same
 * element. Scale is composited, so the hover now costs nothing on the main
 * thread.
 */
const DISC = 76;
const DOT = 8;

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });

  useEffect(() => {
    /*
     * Width belongs in this query, not in a `md:` class. The class would hide
     * the dot while this effect still set `cursor: none` on the document, so a
     * desktop window dragged under 48rem lost its pointer altogether. One
     * condition has to govern both halves.
     */
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 48rem)"
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = (event.target as Element | null)?.closest?.(
        "[data-cursor]"
      );
      const key = target?.getAttribute("data-cursor") ?? null;
      setLabel(key && key in LABELS ? key : null);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduced, x, y]);

  // Hide the system cursor only while ours is live.
  useEffect(() => {
    if (!enabled || reduced) return;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  const isLabelled = label !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0"
      style={{ x: springX, y: springY, zIndex: "var(--z-cursor)" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: duration.fast }}
    >
      <motion.div
        className="flex items-center justify-center rounded-pill bg-ivory-100 mix-blend-difference"
        // Centring moves into the motion transform because motion writes
        // `transform` inline, which would otherwise overwrite a -translate-1/2
        // utility class the moment scale starts animating.
        style={{ width: DISC, height: DISC, x: "-50%", y: "-50%" }}
        // Without this the disc mounts at scale 1 and animates down to the dot.
        initial={false}
        animate={{ scale: isLabelled ? 1 : DOT / DISC }}
        transition={{ duration: duration.standard, ease: ease.editorial }}
      >
        {/*
          * `wait` rather than the default: these are flex children, so two
          * labels alive at once sit side by side and shove each other off
          * centre for the length of the crossfade.
          */}
        <AnimatePresence mode="wait">
          {isLabelled && (
            <motion.span
              key={label}
              className="type-eyebrow text-ink-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
            >
              {LABELS[label]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
