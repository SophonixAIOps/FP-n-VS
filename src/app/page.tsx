import type { Metadata } from "next";
import Link from "next/link";
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
import { PortfolioProject } from "@/components/PortfolioProject";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";

/**
 * The homepage.
 *
 * Read top to bottom it is a single argument: a photograph you cannot look away
 * from, the reason we make them that way, proof, what we cover, how we work,
 * and an invitation. The footer's own invitation band is suppressed — this page
 * already closes on one, and §10 says not to make the offer twice.
 */

export const metadata: Metadata = {
  title: { absolute: "Frame & Story Studio | Photography & Cinematic Films" },
  description:
    "Authentic photography and cinematic films created to preserve the moments you'll never want to forget.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Frame & Story Studio | Photography & Cinematic Films",
    description:
      "Authentic photography and cinematic films created to preserve the moments you'll never want to forget.",
  },
};

const services = [
  {
    name: "Weddings",
    description:
      "Full-day coverage, from the quiet of the morning through to the last of the dancing.",
  },
  {
    name: "Wedding Videography",
    description:
      "A film of the day, cut to how it felt rather than the order it happened in.",
  },
  {
    name: "Events",
    description:
      "Parties, milestones and the gatherings that only ever happen once.",
  },
  {
    name: "Portraits",
    description:
      "Unhurried sessions for one person or two, made somewhere that already means something.",
  },
  {
    name: "Family",
    description:
      "Everyone together, at whatever age they happen to be right now.",
  },
  {
    name: "Commercial",
    description:
      "Brand and editorial photography for people who make things carefully.",
  },
];

const process = [
  {
    name: "Meet",
    description:
      "We talk first. What you want to remember, who matters, and how present you want us to be.",
  },
  {
    name: "Plan",
    description:
      "A simple outline built around your day, so the photography never starts dictating it.",
  },
  {
    name: "Create",
    description:
      "We work quietly — close when it counts, out of the way when it doesn't.",
  },
  {
    name: "Deliver",
    description:
      "Edited by hand and delivered in full, with the frames worth printing marked.",
  },
];

export default function Page() {
  return (
    <SiteShell
      surface="dark"
      cta={false}
      footerNav={
        <Link
          href="/system/typography"
          className="type-meta transition-opacity duration-(--duration-fast) ease-editorial hover:opacity-60"
        >
          Design system
        </Link>
      }
    >
      {/* 1 — ARRIVE. The header sits over this with no background of its own. */}
      <section className="relative h-svh min-h-136 w-full overflow-hidden bg-bg-dark">
        <EditorialImage
          image={images.hero}
          size="full"
          reveal="clipExpand"
          priority
          fill
          ar={{ desktop: "cinema", mobile: "portrait" }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-ink-900/55 via-ink-900/10 to-ink-900/75"
        />

        <div className="absolute inset-0 flex items-end">
          <Container width="wide" className="pb-[clamp(3rem,8vw,6rem)]">
            <EditorialGrid className="items-end gap-y-8">
              <GridItem span={7}>
                <Reveal variant="fadeUp" trigger="mount" delay={0.35}>
                  <Eyebrow tone="light" rule>
                    Photography &amp; Film
                  </Eyebrow>
                </Reveal>

                <Reveal variant="fadeUp" trigger="mount" delay={0.45}>
                  <h1 className="type-display-xl mt-7 max-w-[13ch] text-text-inverse">
                    Stories Worth{" "}
                    <span className="type-emphasis">Remembering</span>.
                  </h1>
                </Reveal>
              </GridItem>

              <GridItem span={4} start={9}>
                <Reveal variant="fadeUp" trigger="mount" delay={0.6}>
                  <p className="type-body-lg max-w-[34ch] text-text-inverse opacity-80">
                    Authentic photography and cinematic films created to
                    preserve the moments you&rsquo;ll never want to forget.
                  </p>
                </Reveal>
              </GridItem>

              <GridItem span={12}>
                <Reveal
                  variant="fadeUp"
                  trigger="mount"
                  delay={0.72}
                  className="flex flex-wrap items-center gap-x-10 gap-y-5"
                >
                  <EditorialButton href="/portfolio" tone="light">
                    View Our Work
                  </EditorialButton>
                  <EditorialLink href="/contact" tone="light">
                    Book a Session
                  </EditorialLink>
                </Reveal>
              </GridItem>
            </EditorialGrid>
          </Container>
        </div>
      </section>

      {/* 2 — FEEL. Why the photographs look the way they do. */}
      <Section space="md" container="wide">
        <EditorialGrid>
          <GridItem span={5}>
            <Reveal>
              <Eyebrow rule>The Way We See</Eyebrow>
              <SectionHeading level="display-md" as="h2" className="mt-6">
                Photography That Feels Like You.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={6} start={7} offsetTop="sm">
            <Reveal delay={0.08}>
              <Lead>
                A camera can describe a day accurately and still miss it
                completely. The order of events, the faces, the light — that
                part is easy.
              </Lead>

              <p className="type-body mt-7 max-w-[54ch] text-text-muted">
                What takes attention is everything around it. The pause before
                someone speaks. A hand finding another hand under the table. The
                ten seconds nobody thought to look at. We work quietly and stay
                out of the way, because the moments worth keeping almost never
                announce themselves first.
              </p>

              <div className="mt-9">
                <EditorialLink href="/studio">How we work</EditorialLink>
              </div>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 3 — UNDERSTAND. Proof, composed as a gallery rather than a grid. */}
      <Section space="md" container="wide">
        <EditorialGrid className="gap-y-16">
          <GridItem span={6}>
            <Reveal>
              <Eyebrow rule>Selected Work</Eyebrow>
              <SectionHeading level="display-md" as="h2" className="mt-6">
                Stories in Frames.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={7}>
            <PortfolioProject
              image={images.portfolio[0]}
              href="/portfolio"
              size="offset"
              index={1}
            />
          </GridItem>

          <GridItem span={4} start={9} offsetTop="lg">
            <PortfolioProject
              image={images.portfolio[1]}
              href="/portfolio"
              size="detail"
              index={2}
              delay={0.08}
            />
          </GridItem>

          <GridItem span={5} offsetTop="sm">
            <PortfolioProject
              image={images.portfolio[2]}
              href="/portfolio"
              size="offset"
              index={3}
            />
          </GridItem>

          <GridItem span={6} start={7}>
            <PortfolioProject
              image={images.portfolio[5]}
              href="/portfolio"
              size="offset"
              index={4}
              delay={0.08}
            />
          </GridItem>

          <GridItem span={9} start={4}>
            <PortfolioProject
              image={images.portfolio[4]}
              href="/portfolio"
              size="content"
              index={5}
            />
          </GridItem>

          <GridItem span={12}>
            <Reveal>
              <EditorialLink href="/portfolio">See all work</EditorialLink>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 4 — EXPLORE. An index of what we cover. Plain markup, no JS. */}
      <Section space="md" surface="muted" container="wide">
        <EditorialGrid>
          <GridItem span={6}>
            <Reveal>
              <Eyebrow rule>What We Capture</Eyebrow>
              <SectionHeading level="display-md" as="h2" className="mt-6">
                For Every Chapter Worth Remembering.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={12} className="mt-6 md:mt-16">
            <ul>
              {services.map((service, index) => (
                <li key={service.name} className="border-t border-border">
                  <Reveal delay={index * 0.04}>
                    <div className="grid grid-cols-1 gap-y-3 py-8 md:grid-cols-12 md:gap-x-6 md:py-11">
                      <Meta className="tabular-nums md:col-span-2">
                        {String(index + 1).padStart(2, "0")}
                      </Meta>
                      <h3 className="type-h2 md:col-span-5">{service.name}</h3>
                      <p className="type-body max-w-[46ch] text-text-muted md:col-span-5">
                        {service.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/*
       * 5 — The film beat. A poster frame only: a still we can stand behind
       * beats a remote clip that may not load. Swapping in a <video poster>
       * later changes this block and nothing else.
       */}
      <Section space="none" surface="dark" container={false}>
        <ImageOverlay
          image={images.portfolio[3]}
          size="full"
          reveal="clipExpand"
          ar={{ desktop: "cinema", mobile: "portrait" }}
          scrim="strong"
          position="bottom-left"
        >
          <Reveal>
            <Eyebrow tone="inherit" rule>
              Films
            </Eyebrow>
            <h2 className="type-display-md mt-6 max-w-[14ch] font-display">
              Some Stories Need to <span className="type-emphasis">Move</span>.
            </h2>
            <p className="type-body-lg mt-6 max-w-[38ch] opacity-85">
              Cinematic films that preserve not just what happened, but how it
              felt.
            </p>
          </Reveal>
        </ImageOverlay>
      </Section>

      {/* 6 — TRUST. Four steps, stated plainly. */}
      <Section space="md" container="wide">
        <EditorialGrid>
          <GridItem span={5}>
            <Reveal>
              <Eyebrow rule>The Approach</Eyebrow>
              <SectionHeading level="display-md" as="h2" className="mt-6">
                A Thoughtful Process.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={12} className="mt-4 md:mt-16">
            <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, index) => (
                <li key={step.name}>
                  <Reveal delay={index * 0.06}>
                    <div className="border-t border-border pt-6">
                      <Meta className="tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </Meta>
                      <h3 className="type-h3 mt-5">{step.name}</h3>
                      <p className="type-small mt-3 max-w-[34ch] text-text-muted">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 7 — IMAGINE. A photograph, given room to be nothing but itself. */}
      <Section space="sm" container={false}>
        {/*
         * The manifest's own crop pair, not a wider one: at 21:9 the entropy
         * crop keeps the veil and the stones but loses the couple, and the alt
         * text describes them.
         */}
        <EditorialImage image={images.cta} size="full" reveal="maskUp" />
        <Container width="wide" className="mt-5">
          <Meta>The Long Veil — Pembrokeshire, Wales · 2024</Meta>
        </Container>
      </Section>

      {/* 8 — INQUIRE. */}
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
            <Reveal
              delay={0.1}
              className="flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <EditorialButton href="/contact" tone="light">
                Book a Session
              </EditorialButton>
              <EditorialLink href="/portfolio" tone="light">
                View Our Work
              </EditorialLink>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>
    </SiteShell>
  );
}
