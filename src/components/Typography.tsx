import { cn } from "@/lib/cn";

/**
 * Editorial typography primitives.
 *
 * Use these instead of raw heading tags so hierarchy stays consistent across
 * pages. Visual level and semantic level are set separately — a section can
 * look like a Display while still being an <h2>.
 */

/* -------------------------------------------------------------------------- */

type EyebrowProps = {
  children: React.ReactNode;
  /** Draws a short rule before the label. */
  rule?: boolean;
  /**
   * Ground the label sits on. Pass this rather than a `text-*` class — both
   * would be Tailwind utilities, and `cn` only concatenates, so the winner
   * would be decided by stylesheet order rather than by the call site.
   *
   * `inherit` takes the colour of its container — use that over photography.
   */
  tone?: "dark" | "light" | "inherit";
  className?: string;
};

const eyebrowTone = {
  dark: "text-text-muted",
  light: "text-text-inverse-muted",
  inherit: "text-current",
} as const;

/** Small tracked-out label. Names a section without competing with it. */
export function Eyebrow({
  children,
  rule = false,
  tone = "dark",
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "type-eyebrow inline-flex items-center gap-3",
        eyebrowTone[tone],
        className
      )}
    >
      {rule && (
        <span
          aria-hidden="true"
          className="h-px w-8 bg-current opacity-40"
        />
      )}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */

type Level = "display-xl" | "display-lg" | "display-md" | "h1" | "h2" | "h3";

const levelClass: Record<Level, string> = {
  "display-xl": "type-display-xl",
  "display-lg": "type-display-lg",
  "display-md": "type-display-md",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
};

type SectionHeadingProps = {
  children: React.ReactNode;
  /** Visual size. Independent of the semantic tag. */
  level?: Level;
  /** Semantic element. Pick for document outline, not for looks. */
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  /** Caps the measure so long headlines break into editorial lines. */
  balance?: boolean;
  className?: string;
};

export function SectionHeading({
  children,
  level = "h2",
  as: Tag = "h2",
  balance = true,
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        levelClass[level],
        balance && "text-balance",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

type LeadProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Supporting copy under a heading. Deliberately narrow — this site says less.
 * If a paragraph needs more than about three lines, cut it rather than widen.
 */
export function Lead({ children, className }: LeadProps) {
  return (
    <p
      className={cn(
        "type-body-lg max-w-[38ch] text-text-muted text-pretty",
        className
      )}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */

type MetaProps = {
  children: React.ReactNode;
  className?: string;
};

/** Caption and credit line. Location, year, frame number. */
export function Meta({ children, className }: MetaProps) {
  return <span className={cn("type-meta", className)}>{children}</span>;
}
