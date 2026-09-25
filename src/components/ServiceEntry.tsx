import { EditorialGrid, GridItem, type Offset, type Span } from "./Layout";
import { EditorialImage, type ImageRevealName } from "./EditorialImage";
import { EditorialLink } from "./EditorialLink";
import { Meta, SectionHeading } from "./Typography";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";
import { serviceSlug } from "@/lib/studio";
import { slotSizes, type AspectName, type StudioImage } from "@/lib/images";

/**
 * One entry in the services catalogue.
 *
 * Six services presented six identical ways is the failure mode the art
 * direction names explicitly, so the composition is a prop rather than a
 * constant: which side the frame sits on, how wide it runs, how far the text
 * is held back. The parts stay the same — number, name, description, frame,
 * medium — and only their arrangement changes, which is what makes the page
 * read as a catalogue rather than a template.
 *
 * Reading order never changes with it. The text block is always first in the
 * DOM; `col-start` moves the frame to the left visually without moving it in
 * front of the heading for a screen reader or a Tab key.
 */

export type Service = {
  /** Also the anchor target for the service index. */
  slug: string;
  name: string;
  description: string;
  /** Medium and approach. Set as a caption rail beneath the frame. */
  medium: string[];
  image: StudioImage;
  /** Overrides the manifest crop pair where this slot wants a different frame. */
  ar?: { desktop: AspectName; mobile: AspectName };
  reveal?: ImageRevealName;
  /**
   * Where this work can actually be seen. Omitted for the services the archive
   * has no view for — a link to nothing is worse than no link.
   */
  link?: { label: string; href: string };
};

export type ServiceLayout =
  | "media-right"
  | "media-left"
  | "media-right-inset"
  | "media-left-wide"
  | "media-below";

type Slot = {
  text: { span: Span; start: Span; offsetTop: Offset };
  media: { span: Span; start: Span; spanMobile: Span; offsetTop: Offset };
  /**
   * Whether the two blocks share a row. Both are pinned explicitly when they
   * do: grid auto-placement never moves its cursor backwards, so a frame at
   * `col-start-1` authored after text at `col-start-8` would otherwise drop to
   * the next row instead of sitting beside it.
   */
  sameRow: boolean;
};

const layouts: Record<ServiceLayout, Slot> = {
  "media-right": {
    text: { span: 4, start: 1, offsetTop: "md" },
    media: { span: 7, start: 6, spanMobile: 12, offsetTop: "none" },
    sameRow: true,
  },
  "media-left": {
    text: { span: 4, start: 8, offsetTop: "lg" },
    media: { span: 6, start: 1, spanMobile: 10, offsetTop: "none" },
    sameRow: true,
  },
  "media-right-inset": {
    text: { span: 5, start: 1, offsetTop: "sm" },
    media: { span: 4, start: 9, spanMobile: 8, offsetTop: "none" },
    sameRow: true,
  },
  "media-left-wide": {
    text: { span: 4, start: 9, offsetTop: "md" },
    media: { span: 7, start: 1, spanMobile: 12, offsetTop: "none" },
    sameRow: true,
  },
  "media-below": {
    text: { span: 6, start: 1, offsetTop: "none" },
    media: { span: 12, start: 1, spanMobile: 12, offsetTop: "none" },
    sameRow: false,
  },
};

export function ServiceEntry({
  service,
  index,
  layout,
  tone = "dark",
}: {
  service: Service;
  /** Zero-based. The printed number is this plus one. */
  index: number;
  layout: ServiceLayout;
  /** Ink, not ground. `light` is for the entry set on the dark band. */
  tone?: "dark" | "light";
}) {
  const slot = layouts[layout];
  const light = tone === "light";
  const row = slot.sameRow ? "md:row-start-1" : undefined;
  const muted = light ? "text-text-inverse-muted" : "text-text-muted";

  return (
    // The header clears the anchor target, which a bare `id` would sit beneath.
    <div
      id={service.slug}
      className="scroll-mt-[calc(var(--header-height)+2rem)]"
    >
      <EditorialGrid className="gap-y-10">
        <GridItem
          span={slot.text.span}
          start={slot.text.start}
          offsetTop={slot.text.offsetTop}
          className={row}
        >
          <Reveal>
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-current opacity-30"
              />
              <span className={cn("type-h3 font-sans tabular-nums", muted)}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <SectionHeading
              level="display-md"
              as="h2"
              className="mt-5 max-w-[14ch]"
            >
              {service.name}
            </SectionHeading>

            <p className={cn("type-body-lg mt-6 max-w-[40ch] text-pretty", muted)}>
              {service.description}
            </p>
          </Reveal>
        </GridItem>

        <GridItem
          span={slot.media.span}
          start={slot.media.start}
          spanMobile={slot.media.spanMobile}
          offsetTop={slot.media.offsetTop}
          className={row}
        >
          <EditorialImage
            image={service.image}
            sizes={slotSizes(slot.media.span, slot.media.spanMobile)}
            ar={service.ar}
            reveal={service.reveal ?? "maskUp"}
            delay={0.06}
          />

          {/*
           * The medium sits in the flow under the frame, always visible. There
           * is no hover state carrying information the reader might not have a
           * pointer to find.
           */}
          <Reveal delay={0.12}>
            <div
              className={cn(
                "mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t pt-4",
                light ? "border-border-inverse" : "border-border"
              )}
            >
              <Meta className={light ? "text-text-inverse-muted" : undefined}>
                {service.medium.join(" · ")}
              </Meta>

              {/*
               * Two directions out of every entry: further into the work, or
               * into an inquiry that already knows which service you were
               * reading.
               *
               * Deliberately not the primary CTA. Six rails each repeating
               * "Book a Session" would leave the page with nine of them and
               * nothing to distinguish the two that are actually the page's
               * call to action. These are the quieter, supporting wording;
               * the buttons at the end of the page keep the primary one.
               */}
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                {service.link && (
                  <EditorialLink
                    href={service.link.href}
                    tone={light ? "light" : "dark"}
                  >
                    {service.link.label}
                  </EditorialLink>
                )}

                <EditorialLink
                  href={`/contact?service=${serviceSlug(service.name)}`}
                  tone={light ? "light" : "dark"}
                >
                  Start a Conversation
                </EditorialLink>
              </div>
            </div>
          </Reveal>
        </GridItem>
      </EditorialGrid>
    </div>
  );
}
