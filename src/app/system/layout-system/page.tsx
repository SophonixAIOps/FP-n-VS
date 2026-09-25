import type { Metadata } from "next";
import {
  SpecSection,
  SpecRow,
  SpecNote,
  specSlotSizes,
} from "@/components/specimen/Spec";
import { Eyebrow, Meta, SectionHeading } from "@/components/Typography";
import {
  Container,
  Divider,
  EditorialGrid,
  GridItem,
  MediaTextLayout,
  NarrowContent,
  PageIntro,
  Section,
  SplitLayout,
} from "@/components/Layout";
import { EditorialImage, ImageOverlay } from "@/components/EditorialImage";
import { EditorialLink } from "@/components/EditorialLink";
import { ProjectMeta } from "@/components/ProjectMeta";
import { images, SIZES_CONTENT, SIZES_MEDIA_COLUMN } from "@/lib/images";

export const metadata: Metadata = { title: "Layout" };

/** A visible stand-in so container measures and grid spans can be seen. */
function Block({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "muted" | "outline";
  className?: string;
}) {
  return (
    <div
      className={[
        "type-meta px-4 py-6 text-center",
        tone === "outline"
          ? "border border-border-strong"
          : "bg-surface",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export default function LayoutPage() {
  const [first, second] = images.portfolio;
  const [detailA] = images.details;

  return (
    <div className="py-section-sm">
      <Container className="mb-20">
        <PageIntro
          eyebrow="Specimen 06"
          heading="Layout."
          lead="Structure is the quiet part of the system. These primitives exist so vertical rhythm and measure stay consistent without being restated on every page."
        />
      </Container>

      <Container>
        <SpecSection
          number="01"
          title="Containers"
          description="Three measures and the page gutter. Everything on the site sits inside one of them."
        >
          {/*
           * All three measures are wider than this column, so drawn at actual
           * size they would be indistinguishable. The bars are scaled against
           * `wide` instead — the proportions are true, the pixels are not.
           */}
          <SpecRow label="narrow" note="46rem · reading measure">
            <Block className="md:w-[47.9%]">max-w-narrow</Block>
          </SpecRow>
          <SpecRow label="content" note="75rem · editorial column">
            <Block className="md:w-[78.1%]">max-w-content</Block>
          </SpecRow>
          <SpecRow label="wide" note="96rem · galleries">
            <Block>max-w-wide</Block>
          </SpecRow>

          <div className="mt-10">
            <SpecNote>
              Bars are drawn to scale relative to one another, not at their
              rendered pixel width.{" "}
              <code className="font-mono">Container</code> applies the measure
              and the fluid gutter together, so the two never drift apart.{" "}
              <code className="font-mono">Section</code> takes a{" "}
              <code className="font-mono">container</code> prop as shorthand for
              the common case, and <code className="font-mono">false</code> when
              a child manages its own width.
            </SpecNote>
          </div>
        </SpecSection>

        <SpecSection
          number="02"
          title="Section rhythm"
          description="Vertical spacing is fluid at every step, so it scales with the viewport instead of stepping at breakpoints."
        >
          <ul className="type-small grid gap-2 text-text-muted">
            {[
              "space=sm — clamp(3.5rem, 7vw, 6rem). Sub-sections and specimen pages.",
              "space=md — clamp(5rem, 12vw, 12rem). The default band.",
              "space=lg — clamp(7rem, 17vw, 17rem). Major chapter breaks.",
              "space=none — when a full-bleed child sets its own rhythm.",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SpecSection>

        <SpecSection
          number="03"
          title="Split layouts"
          description="Two columns, deliberately unequal. Equal halves are the pattern this system avoids."
        >
          <SpecRow label="media-wide" note="1.4fr / 1fr · default">
            <SplitLayout
              ratio="media-wide"
              primary={<Block>primary</Block>}
              secondary={<Block tone="outline">secondary</Block>}
            />
          </SpecRow>

          <SpecRow label="text-wide" note="1fr / 1.4fr">
            <SplitLayout
              ratio="text-wide"
              primary={<Block>primary</Block>}
              secondary={<Block tone="outline">secondary</Block>}
            />
          </SpecRow>

          <SpecRow label="reverse" note="visual swap, DOM order kept">
            <SplitLayout
              reverse
              primary={<Block>primary</Block>}
              secondary={<Block tone="outline">secondary</Block>}
            />
            <p className="type-caption mt-4">
              The swap happens with grid order, not{" "}
              <code className="font-mono">flex-direction</code>, so reading and
              tab order stay as authored.
            </p>
          </SpecRow>
        </SpecSection>

        <SpecSection
          number="04"
          title="Media and text"
          description="The common editorial pairing — a frame beside a short column of copy, vertically centred."
        >
          <MediaTextLayout
            media={
              <EditorialImage
                image={second}
                sizes={SIZES_MEDIA_COLUMN}
                reveal="scaleFade"
                ar={{ desktop: "wide", mobile: "wide" }}
              />
            }
          >
            <Eyebrow rule>Approach</Eyebrow>
            <SectionHeading level="h2" className="mt-5 font-display">
              We photograph what is already happening.
            </SectionHeading>
            <p className="type-body mt-5 text-text-muted">
              Copy is held to roughly 42 characters here so the column stays a
              column rather than becoming a paragraph that happens to sit beside
              a picture.
            </p>
            <EditorialLink href="/system" className="mt-7">
              Read the approach
            </EditorialLink>
          </MediaTextLayout>
        </SpecSection>

        <SpecSection
          number="05"
          title="Editorial grid"
          description="Twelve columns with intentional imbalance. Offsets are what keep a gallery from reading as a card grid."
        >
          <EditorialGrid>
            <GridItem span={7}>
              <EditorialImage
                image={first}
                sizes={specSlotSizes(7)}
                reveal="maskUp"
                ar={{ desktop: "wide", mobile: "wide" }}
              />
            </GridItem>

            <GridItem span={4} start={9} spanMobile={8} offsetTop="md">
              <EditorialImage
                image={detailA}
                sizes={specSlotSizes(4, 8)}
                reveal="maskUp"
                delay={0.1}
                ar={{ desktop: "editorial", mobile: "editorial" }}
              />
            </GridItem>

            <GridItem span={5} start={2}>
              <p className="type-body-lg max-w-[34ch] text-pretty">
                White space is a compositional element. The gap carries as much
                weight as the frame.
              </p>
            </GridItem>
          </EditorialGrid>

          <div className="mt-12">
            <SpecNote>
              <code className="font-mono">GridItem</code> takes{" "}
              <code className="font-mono">span</code> and{" "}
              <code className="font-mono">start</code> at{" "}
              <code className="font-mono">md</code> and up, with{" "}
              <code className="font-mono">spanMobile</code> for compositions
              that stay partial on small screens.{" "}
              <code className="font-mono">offsetTop</code> supplies the vertical
              stagger, and collapses to zero on mobile so nothing drifts out of
              alignment.
            </SpecNote>
          </div>
        </SpecSection>

        <SpecSection
          number="06"
          title="Dividers"
          description="Thin rules. A heavy border is never the answer."
        >
          <SpecRow label="hairline" note="decorative · --color-border">
            <Divider space="none" />
          </SpecRow>
          <SpecRow label="strong" note="UI boundary · --color-border-strong">
            <Divider weight="strong" space="none" />
          </SpecRow>
          <div className="mt-10">
            <SpecNote>
              Dividers are <code className="font-mono">aria-hidden</code>{" "}
              because they are decorative. A rule that genuinely separates
              meaning should be a heading instead.
            </SpecNote>
          </div>
        </SpecSection>

        <SpecSection
          number="07"
          title="Project metadata"
          description="The information rail beside a piece of work. Every field is optional and nothing is invented to fill a gap."
        >
          <SplitLayout
            ratio="even"
            gap="lg"
            primary={
              <ProjectMeta
                title="Evening Walk"
                category="Wedding"
                location="Cascais, Portugal"
                date="2024"
                description="A short line about the work, written in the same voice as the rest of the site."
                href="/system"
              />
            }
            secondary={<ProjectMeta title="Untitled" href="/system" />}
          />
          <p className="type-caption mt-6">
            On the right, the same component with only a title — the credit
            line, description and link collapse rather than rendering empty.
          </p>
        </SpecSection>

        <SpecSection
          number="08"
          title="Form typography"
          description="Defined now so the inquiry page in a later phase has somewhere to start."
        >
          <div className="max-w-[28rem]">
            <label htmlFor="spec-name" className="type-label block">
              Your name
            </label>
            <input
              id="spec-name"
              type="text"
              aria-describedby="spec-name-help"
              className="mt-2.5 w-full border border-border-strong bg-transparent px-4 py-3 text-body"
            />
            <p id="spec-name-help" className="type-helper mt-2">
              Helper text sits beneath the field and is linked with
              aria-describedby.
            </p>
          </div>
          <div className="mt-8 max-w-[28rem]">
            <label htmlFor="spec-date" className="type-label block">
              Date of the wedding
            </label>
            <input
              id="spec-date"
              type="text"
              aria-describedby="spec-date-error"
              aria-invalid="true"
              className="mt-2.5 w-full border border-error bg-transparent px-4 py-3 text-body"
            />
            <p id="spec-date-error" className="type-helper mt-2 text-error">
              Error states name the problem in words. Colour is never the only
              signal.
            </p>
          </div>
        </SpecSection>
      </Container>

      {/* Dark surface, proved at full width rather than inside the column. */}
      <Section surface="dark" space="sm" className="mt-section-sm">
        <Eyebrow rule tone="light">
          Dark surface
        </Eyebrow>
        <SectionHeading level="h1" as="h2" className="mt-6 font-display">
          And nobody moved.
        </SectionHeading>
        <p className="type-body mt-5 max-w-[42ch] text-text-inverse-muted">
          <code className="font-mono">Section surface=&quot;dark&quot;</code>{" "}
          sets the inverse text colour on the wrapper so descendants inherit it.
          The muted and caption classes carry their own colour, so on a dark
          ground they are set explicitly to the inverse-muted token.
        </p>
        <Divider tone="light" space="md" />
        <Meta className="text-text-inverse-muted">
          Rules use border-inverse against dark
        </Meta>
      </Section>

      <Container>
        <SpecSection
          number="09"
          title="Image with overlay"
          description="The hero pattern. A scrim is structural, not decorative — it is what makes type legible over any photograph."
        >
          <ImageOverlay
            image={images.cta}
            sizes={SIZES_CONTENT}
            reveal="none"
            position="bottom-left"
            scrim="strong"
            ar={{ desktop: "cinema", mobile: "editorial" }}
          >
            <Eyebrow tone="inherit">Frame &amp; Story</Eyebrow>
            <SectionHeading level="display-md" as="h2" className="mt-4 font-display">
              The light was going.
            </SectionHeading>
          </ImageOverlay>
        </SpecSection>

        <SpecSection
          number="10"
          title="Narrow content"
          description="The reading measure, for anything long enough to need one."
        >
          <NarrowContent className="px-0">
            <p className="type-body text-text-muted">
              Long-form copy is capped at the narrow measure — roughly 68
              characters — because a line much longer than that is measurably
              harder to track back from at the end of a row. Most of this site
              says less than this paragraph does, but the studio page and any
              written pieces will need it.
            </p>
          </NarrowContent>
        </SpecSection>
      </Container>
    </div>
  );
}
