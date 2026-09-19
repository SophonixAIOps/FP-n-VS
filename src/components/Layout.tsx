import { cn } from "@/lib/cn";
import { Eyebrow, Lead, SectionHeading } from "./Typography";

/**
 * Structural primitives.
 *
 * Page code should compose from these rather than repeating container and
 * section utilities by hand — that repetition is how an editorial rhythm drifts
 * out of alignment one section at a time.
 *
 * The editorial grid here is deliberately asymmetric. A centred card of equal
 * columns is the failure mode this system exists to avoid.
 */

/* -------------------------------------------------------------------------- */

type Width = "narrow" | "content" | "wide" | "full";

const widthClass: Record<Width, string> = {
  narrow: "max-w-narrow",
  content: "max-w-content",
  wide: "max-w-wide",
  full: "max-w-none",
};

type ContainerProps = {
  children: React.ReactNode;
  width?: Width;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
  className?: string;
};

/** Centres content at one of the three measures and applies the page gutter. */
export function Container({
  children,
  width = "content",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", widthClass[width], className)}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

type Space = "none" | "sm" | "md" | "lg";
type Surface = "light" | "muted" | "dark";

const spaceClass: Record<Space, string> = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
};

const surfaceClass: Record<Surface, string> = {
  light: "bg-bg text-text",
  muted: "bg-surface text-text",
  dark: "bg-bg-dark text-text-inverse",
};

type SectionProps = {
  children: React.ReactNode;
  /** Vertical rhythm. Fluid at every step, so this rarely needs a breakpoint. */
  space?: Space;
  /** Ground tone. `dark` flips text to the inverse pair automatically. */
  surface?: Surface;
  /**
   * Wraps children in a Container at this width. Pass `false` for full-bleed
   * children that manage their own measure.
   */
  container?: Width | false;
  as?: "section" | "div" | "footer";
  className?: string;
};

/**
 * A band of the page: vertical rhythm plus an optional ground tone.
 *
 * `surface="dark"` sets the inverse text colour on the wrapper, so descendants
 * inherit it and there is no need to restate a tone on every child.
 */
export function Section({
  children,
  space = "md",
  surface = "light",
  container = "content",
  as: Tag = "section",
  className,
}: SectionProps) {
  return (
    <Tag className={cn(spaceClass[space], surfaceClass[surface], className)}>
      {container === false ? children : <Container width={container}>{children}</Container>}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

/** Reading measure. For long-form copy that should never run wide. */
export function NarrowContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Container width="narrow" className={className}>
      {children}
    </Container>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Escapes the current container to the viewport edge. For cinematic imagery
 * used as punctuation between sections.
 */
export function FullBleedSection({
  children,
  space = "none",
  surface = "light",
  className,
}: {
  children: React.ReactNode;
  space?: Space;
  surface?: Surface;
  className?: string;
}) {
  return (
    <section
      className={cn("full-bleed", spaceClass[space], surfaceClass[surface], className)}
    >
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

type SplitRatio = "even" | "media-wide" | "text-wide";

const splitClass: Record<SplitRatio, string> = {
  even: "md:grid-cols-2",
  "media-wide": "md:grid-cols-[1.4fr_1fr]",
  "text-wide": "md:grid-cols-[1fr_1.4fr]",
};

type Align = "start" | "center" | "end";

const alignClass: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

type SplitLayoutProps = {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  /** Column balance. Deliberate imbalance is the default aesthetic. */
  ratio?: SplitRatio;
  /** Puts `primary` on the right on desktop, without changing DOM order. */
  reverse?: boolean;
  align?: Align;
  gap?: "sm" | "md" | "lg";
  className?: string;
};

const gapClass = {
  sm: "gap-6",
  md: "gap-8 md:gap-12",
  lg: "gap-10 md:gap-20",
};

/**
 * Two-column editorial pairing.
 *
 * `reverse` swaps the visual order with grid column placement rather than
 * `flex-direction`, so the DOM order — and therefore reading and tab order —
 * stays as authored.
 */
export function SplitLayout({
  primary,
  secondary,
  ratio = "media-wide",
  reverse = false,
  align = "start",
  gap = "md",
  className,
}: SplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        splitClass[ratio],
        alignClass[align],
        gapClass[gap],
        className
      )}
    >
      <div className={cn(reverse && "md:order-2")}>{primary}</div>
      <div className={cn(reverse && "md:order-1")}>{secondary}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Media beside text, with the text held to a comfortable measure and
 * vertically centred against the frame. The common editorial pairing.
 */
export function MediaTextLayout({
  media,
  children,
  reverse = false,
  ratio = "media-wide",
  className,
}: {
  media: React.ReactNode;
  children: React.ReactNode;
  reverse?: boolean;
  ratio?: SplitRatio;
  className?: string;
}) {
  return (
    <SplitLayout
      ratio={ratio}
      reverse={reverse}
      align="center"
      gap="lg"
      className={className}
      primary={media}
      secondary={<div className="max-w-[42ch]">{children}</div>}
    />
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Twelve-column editorial grid.
 *
 * Span and start maps are written out in full because Tailwind scans source for
 * literal class names — they cannot be assembled by string concatenation.
 */
export function EditorialGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-12", className)}>
      {children}
    </div>
  );
}

export type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const spanClass: Record<Span, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const startClass: Record<Span, string> = {
  1: "md:col-start-1",
  2: "md:col-start-2",
  3: "md:col-start-3",
  4: "md:col-start-4",
  5: "md:col-start-5",
  6: "md:col-start-6",
  7: "md:col-start-7",
  8: "md:col-start-8",
  9: "md:col-start-9",
  10: "md:col-start-10",
  11: "md:col-start-11",
  12: "md:col-start-12",
};

/** Vertical offset — the mechanism behind the grid's intentional imbalance. */
const offsetClass = {
  none: "",
  sm: "md:mt-12",
  md: "md:mt-24",
  lg: "md:mt-40",
};

export type Offset = keyof typeof offsetClass;

type GridItemProps = {
  children: React.ReactNode;
  /** Columns at `md` and up. Below that everything is full width by default. */
  span?: Span;
  start?: Span;
  /** Columns below `md`, for compositions that stay partial on mobile. */
  spanMobile?: Span;
  offsetTop?: keyof typeof offsetClass;
  className?: string;
};

const mobileSpanClass: Record<Span, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export function GridItem({
  children,
  span = 12,
  start,
  spanMobile = 12,
  offsetTop = "none",
  className,
}: GridItemProps) {
  return (
    <div
      className={cn(
        mobileSpanClass[spanMobile],
        spanClass[span],
        start && startClass[start],
        offsetClass[offsetTop],
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type PageIntroProps = {
  eyebrow?: string;
  heading: React.ReactNode;
  lead?: React.ReactNode;
  /** Visual size of the heading. The tag stays `h1`. */
  level?: "display-xl" | "display-lg" | "display-md";
  className?: string;
};

/** The opening block of a page: label, title, one short paragraph. */
export function PageIntro({
  eyebrow,
  heading,
  lead,
  level = "display-lg",
  className,
}: PageIntroProps) {
  return (
    <header className={className}>
      {eyebrow && <Eyebrow rule>{eyebrow}</Eyebrow>}
      {/*
       * The measure sits on the heading, not the wrapper: `ch` resolves against
       * the element's own font, so on the wrapper it was the body font and
       * pinned the whole intro — lead included — to one fixed width at every
       * viewport. On the heading it scales with the display face as intended.
       */}
      <SectionHeading level={level} as="h1" className="mt-6 max-w-[16ch]">
        {heading}
      </SectionHeading>
      {lead && <Lead className="mt-8">{lead}</Lead>}
    </header>
  );
}

/* -------------------------------------------------------------------------- */

type DividerProps = {
  /** `strong` is for UI boundaries; the default hairline is decorative. */
  weight?: "hairline" | "strong";
  tone?: "dark" | "light";
  space?: "none" | "sm" | "md" | "lg";
  className?: string;
};

const dividerSpace = {
  none: "",
  sm: "my-6",
  md: "my-12",
  lg: "my-20",
};

/**
 * A thin editorial rule. Decorative by default, so it is hidden from assistive
 * technology — a divider that carries meaning should be a heading instead.
 */
export function Divider({
  weight = "hairline",
  tone = "dark",
  space = "md",
  className,
}: DividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        "h-px w-full border-0",
        tone === "light"
          ? "bg-border-inverse"
          : weight === "strong"
            ? "bg-border-strong"
            : "bg-border",
        dividerSpace[space],
        className
      )}
    />
  );
}
