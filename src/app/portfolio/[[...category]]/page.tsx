import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import {
  Container,
  EditorialGrid,
  GridItem,
  Section,
} from "@/components/Layout";
import { Eyebrow, Lead, Meta, SectionHeading } from "@/components/Typography";
import { EditorialButton, EditorialLink } from "@/components/EditorialLink";
import { EditorialImage, ImageOverlay } from "@/components/EditorialImage";
import { CategoryNav } from "@/components/CategoryNav";
import { ProjectMeta } from "@/components/ProjectMeta";
import { Reveal } from "@/components/Reveal";
import {
  categoryLabel,
  filmPoster,
  isCategorySlug,
  piecesIn,
  workCategories,
  type ArchivePiece,
  type CategorySlug,
} from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

/**
 * The archive.
 *
 * Filtering is routing. Every category is its own prerendered page, so the
 * filter is six links rather than a client-side list — no JavaScript needed,
 * no request-time `searchParams`, and every view is linkable and back-button
 * correct. The page itself stays a server component; only the reveal wrappers
 * cross to the client.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return workCategories.map(({ slug }) =>
    slug === "all" ? { category: [] } : { category: [slug] }
  );
}

/**
 * `dynamicParams = false` already turns anything off this list into a 404 at
 * the routing layer. This repeats the check because TypeScript cannot know
 * that, and the narrowing is what lets the rest of the page treat the slug as
 * a real category.
 */
function resolveCategory(segments: string[] | undefined): CategorySlug {
  if (!segments || segments.length === 0) return "all";
  if (segments.length > 1 || !isCategorySlug(segments[0])) notFound();
  return segments[0];
}

/**
 * One topic per view, written out rather than assembled from the category
 * label — `Weddings` reads as a filter chip, `Wedding Photography` reads as
 * the thing someone was actually looking for. Six short lines are cheaper to
 * keep honest than a template that produces five awkward sentences.
 */
const archiveMeta: Record<CategorySlug, { title: string; description: string }> = {
  all: {
    title: "Photography Portfolio",
    description:
      "An editorial archive of photography and film work — weddings, couples, portraits, events and lifestyle.",
  },
  weddings: {
    title: "Wedding Photography Portfolio",
    description:
      "Wedding photography from across the archive — ceremonies, receptions and the quiet hours either side of them.",
  },
  couples: {
    title: "Couples Photography Portfolio",
    description:
      "Engagement and couples photography — unhurried sessions shot the way two people are with each other.",
  },
  portraits: {
    title: "Portrait Photography Portfolio",
    description:
      "Portrait photography for individuals, families and working professionals, shot in natural light.",
  },
  events: {
    title: "Event Photography Portfolio",
    description:
      "Event photography — gatherings, celebrations and brand occasions covered as they happen.",
  },
  lifestyle: {
    title: "Lifestyle Photography Portfolio",
    description:
      "Lifestyle and commercial photography made for brands that would rather look like themselves.",
  },
};

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[[...category]]">): Promise<Metadata> {
  const slug = resolveCategory((await params).category);
  const { title, description } = archiveMeta[slug];

  return pageMetadata({
    title,
    description,
    path: slug === "all" ? "/portfolio" : `/portfolio/${slug}`,
  });
}

/* -------------------------------------------------------------------------- */

/**
 * The composition, written out rather than derived.
 *
 * The gallery reads straight down this cycle, so a frame's width, its column
 * and how far it sits below its neighbour are all fixed by position. Six slots
 * means the rhythm — wide, held back, quiet, paired, cinematic, small —
 * repeats slowly enough that it is never read as a template, and any prefix of
 * it still composes if a category only has three pieces.
 *
 * `spanMobile` matters as much as `span`. Left to default, every frame would
 * run edge to edge on a phone and the page would read as the desktop layout
 * with the composition stripped out. Pulling some frames in to three-quarters
 * keeps a narrow column breathing against a full-width one, which is the same
 * device the desktop grid uses — not a different layout, the same one held to
 * a smaller measure.
 */
const cadence = [
  { span: 7, start: 1, spanMobile: 12, offsetTop: "none", size: "half", reveal: "maskUp" },
  { span: 4, start: 9, spanMobile: 8, offsetTop: "lg", size: "third", reveal: "maskRight" },
  { span: 5, start: 1, spanMobile: 10, offsetTop: "sm", size: "third", reveal: "maskUp" },
  { span: 6, start: 7, spanMobile: 12, offsetTop: "none", size: "half", reveal: "scaleFade" },
  { span: 9, start: 4, spanMobile: 12, offsetTop: "md", size: "content", reveal: "clipExpand" },
  { span: 4, start: 1, spanMobile: 9, offsetTop: "none", size: "third", reveal: "maskUp" },
] as const;

function ArchiveFrame({
  piece,
  index,
}: {
  piece: ArchivePiece;
  index: number;
}) {
  const slot = cadence[index % cadence.length];

  return (
    <GridItem
      span={slot.span}
      start={slot.start}
      spanMobile={slot.spanMobile}
      offsetTop={slot.offsetTop}
      className="group/frame"
    >
      <EditorialImage
        image={piece.image}
        size={slot.size}
        reveal={slot.reveal}
        delay={(index % 3) * 0.06}
      />
      {/*
       * The credit sits in the flow beneath the frame, never revealed on
       * hover. Nothing here is hidden behind a pointer the reader may not
       * have, and there is no second state to discover.
       */}
      <Reveal delay={0.12}>
        <ProjectMeta
          title={piece.image.title}
          category={categoryLabel(piece.category)}
          date={piece.image.year}
          className="mt-6"
        />
      </Reveal>
    </GridItem>
  );
}

/* -------------------------------------------------------------------------- */

export default async function PortfolioPage({
  params,
}: PageProps<"/portfolio/[[...category]]">) {
  const slug = resolveCategory((await params).category);
  const pieces = piecesIn(slug);

  // The cover piece only appears where it honestly belongs. Filter to a
  // category it is not in and the page opens on the grid instead.
  const cover = pieces.find((piece) => piece.featured);
  const rest = pieces.filter((piece) => piece !== cover);

  return (
    <SiteShell activeHref="/portfolio" cta={false}>
      {/*
       * 1 — The opening. Title left, the note across the gutter to the right:
       * an editorial spread rather than a centred hero.
       */}
      <Section space="md" container="wide">
        <EditorialGrid className="gap-y-10">
          <GridItem span={7}>
            <Reveal trigger="mount">
              <Eyebrow rule>The Work</Eyebrow>
              <SectionHeading
                level="display-lg"
                as="h1"
                className="mt-7 max-w-[13ch]"
              >
                Stories in <span className="type-emphasis">Frames</span>.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={4} start={9} offsetTop="sm">
            <Reveal trigger="mount" delay={0.12}>
              <Lead>
                An archive rather than a showreel — arranged the way the work is
                actually made, one frame at a time.
              </Lead>
              <Meta className="mt-8 block max-w-[42ch]">
                An illustrative build. The photographs are licensed via Unsplash
                and stand in for commissioned work.
              </Meta>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 2 — The filter. */}
      <Section space="none" container="wide">
        <Reveal trigger="mount" delay={0.2}>
          <CategoryNav active={slug} className="border-t border-border pt-8" />
        </Reveal>
      </Section>

      {/*
       * 3 — The cover piece. Scale is the only thing marking it out: a
       * panorama across the full measure with the credit set at display size.
       * No badge, no label — the page is not a product listing.
       */}
      {cover && (
        <Section space="sm" container={false}>
          <EditorialImage
            image={cover.image}
            size="full"
            reveal="clipExpand"
            priority
            ar={{ desktop: "panorama", mobile: "portrait" }}
          />
          <Container width="wide" className="mt-8">
            <EditorialGrid>
              <GridItem span={6}>
                <Reveal>
                  <ProjectMeta
                    title={cover.image.title}
                    category={categoryLabel(cover.category)}
                    date={cover.image.year}
                    level="display-md"
                    as="h2"
                  />
                </Reveal>
              </GridItem>
            </EditorialGrid>
          </Container>
        </Section>
      )}

      {/* 4 — The grid. */}
      <Section space="md" container="wide">
        <EditorialGrid className="gap-y-10">
          <GridItem span={8}>
            <Reveal>
              <SectionHeading level="h2" as="h2">
                {slug === "all" ? "The Archive" : categoryLabel(slug)}
              </SectionHeading>
              {/* Doubles as the visible confirmation that the filter applied. */}
              <Meta className="mt-4 block">
                {pieces.length} {pieces.length === 1 ? "frame" : "frames"}
              </Meta>
            </Reveal>
          </GridItem>
        </EditorialGrid>

        <EditorialGrid className="mt-16 gap-y-20 md:mt-24 md:gap-y-32">
          {rest.map((piece, index) => (
            <ArchiveFrame key={piece.image.id} piece={piece} index={index} />
          ))}
        </EditorialGrid>

        {/*
         * The one invitation inside the archive, and it comes after the frames
         * rather than before them — by this point the work has already made the
         * case, so a hairline rail is enough to ask. The page's only button is
         * still the one at the end.
         */}
        <Reveal className="mt-24 border-t border-border pt-10 md:mt-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow rule>Like what you see</Eyebrow>
              <p className="type-body-lg mt-5 max-w-[32ch] text-text-muted text-pretty">
                Tell us what you&rsquo;re planning and we&rsquo;ll talk it
                through.
              </p>
            </div>

            <EditorialLink href="/contact">Book a Session</EditorialLink>
          </div>
        </Reveal>
      </Section>

      {/*
       * 5 — Film. A poster frame and nothing else: there is no film to play,
       * so there is no control suggesting there is one.
       */}
      <Section space="none" surface="dark" container={false}>
        <ImageOverlay
          image={filmPoster}
          size="full"
          reveal="clipExpand"
          ar={{ desktop: "cinema", mobile: "portrait" }}
          scrim="strong"
          position="bottom-left"
        >
          <Reveal>
            <Eyebrow tone="inherit" rule>
              Film
            </Eyebrow>
            <h2 className="type-display-md mt-6 max-w-[14ch] font-display">
              Stories That <span className="type-emphasis">Move</span>.
            </h2>
            <p className="type-body-lg mt-6 max-w-[38ch] opacity-85">
              Cinematic films that preserve not just what happened, but how it
              felt.
            </p>
          </Reveal>
        </ImageOverlay>
      </Section>

      {/* 6 — The pause. One line, given a whole band to itself. */}
      <Section space="lg" container="wide">
        <Reveal>
          <p className="type-display-md max-w-[14ch] font-display">
            Every frame has a <span className="type-emphasis">feeling</span>.
          </p>
        </Reveal>
      </Section>

      {/* 7 — The invitation, in the established wording. */}
      <Section space="lg" surface="dark" container="wide">
        <EditorialGrid className="gap-y-10">
          <GridItem span={8}>
            <Reveal>
              <Eyebrow tone="light" rule>
                Commissions
              </Eyebrow>
              <h2 className="type-display-md mt-7 max-w-[15ch] font-display">
                Your Story Is Happening Now. Let&rsquo;s{" "}
                <span className="type-emphasis">Capture</span> It.
              </h2>
            </Reveal>
          </GridItem>

          <GridItem span={10}>
            {/*
             * The second button on the homepage reads "View Our Work" and
             * points here. Repeating it on this page would send the reader
             * back to the top of what they are already reading.
             */}
            <Reveal delay={0.1}>
              <EditorialButton href="/contact" tone="light">
                Book a Session
              </EditorialButton>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>
    </SiteShell>
  );
}
