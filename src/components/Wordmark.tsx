import { cn } from "@/lib/cn";

/**
 * FRAME & STORY — the wordmark.
 *
 * Typographic only. Set in the display serif, uppercase, with a single
 * flourish: the ampersand is italic. That one detail is the whole identity —
 * do not add a mark, monogram, icon or rule.
 *
 * Must stay legible at 13px and over a photograph, which is why tracking opens
 * up as the size comes down.
 */

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  /** `inherit` takes the colour of its container — use that over photography. */
  tone?: "dark" | "light" | "inherit";
  /** Adds the STUDIO descender line. Footer and inquiry pages only. */
  withDescender?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "text-[0.9375rem] tracking-[0.16em]",
  md: "text-[1.25rem] tracking-[0.13em]",
  lg: "text-[2rem] tracking-[0.1em]",
} as const;

const toneClasses = {
  dark: "text-text",
  light: "text-text-inverse",
  inherit: "text-current",
} as const;

export function Wordmark({
  size = "md",
  tone = "inherit",
  withDescender = false,
  className,
}: WordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col", toneClasses[tone], className)}>
      <span
        className={cn(
          "font-display font-normal uppercase leading-none whitespace-nowrap",
          sizeClasses[size]
        )}
      >
        Frame{" "}
        <span className="type-emphasis" aria-hidden="true">
          &amp;
        </span>{" "}
        Story
      </span>

      {withDescender && (
        <span className="type-eyebrow mt-2 opacity-60">Studio</span>
      )}
    </span>
  );
}
