import Link from "next/link";
import { Header } from "@/components/Header";
import { Wordmark } from "@/components/Wordmark";
import { EditorialImage } from "@/components/EditorialImage";
import { Eyebrow, Lead, SectionHeading } from "@/components/Typography";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";

/**
 * Phase 0 index.
 *
 * Deliberately not the homepage. It exists to prove the three things that can
 * only be judged in situ — the header sitting over full-screen photography, the
 * display face at hero scale, and the opening image reveal — and to route into
 * the specimens. The real homepage belongs to a later phase.
 */

const specimens = [
  {
    href: "/system/typography",
    number: "01",
    title: "Typography",
    description:
      "Instrument Serif and Inter. Scale, hierarchy and editorial setting.",
  },
  {
    href: "/system/color",
    number: "02",
    title: "Colour",
    description:
      "The warm darkroom palette, semantic tokens and measured contrast.",
  },
  {
    href: "/system/imagery",
    number: "03",
    title: "Imagery",
    description:
      "Crop vocabulary, the four reveals, and the portfolio hover state.",
  },
  {
    href: "/system/motion",
    number: "04",
    title: "Motion",
    description: "Durations, easing curves and what reduced motion changes.",
  },
  {
    href: "/system/components",
    number: "05",
    title: "Components",
    description: "Wordmark, links, buttons and the full interaction state set.",
  },
  {
    href: "/system/layout-system",
    number: "06",
    title: "Layout",
    description:
      "Containers, section rhythm, the editorial grid and its offsets.",
  },
];

export default function Page() {
  return (
    <>
      <Header tone="light" />

      <main className="flex-1">
        {/* Full-screen opening frame — the header over photography. */}
        <section className="relative h-[100svh] min-h-[34rem] w-full overflow-hidden bg-bg-dark">
          <EditorialImage
            image={images.hero}
            size="full"
            reveal="clipExpand"
            priority
            fill
            ar={{ desktop: "cinema", mobile: "portrait" }}
          />

          {/* Scrim. Keeps type legible without flattening the photograph. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/10 to-ink-900/75"
          />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-wide px-gutter pb-[clamp(3rem,8vw,6rem)]">
              <Reveal variant="fadeUp" delay={0.35}>
                <Eyebrow tone="light" rule>
                  Phase 0 · Design System
                </Eyebrow>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.45}>
                <h1 className="type-display-xl mt-7 max-w-[14ch] text-text-inverse">
                  Stories worth{" "}
                  <span className="type-emphasis">remembering</span>.
                </h1>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.6}>
                <p className="type-body-lg mt-8 max-w-[34ch] text-text-inverse opacity-80">
                  The visual constitution for Frame &amp; Story Studio — settled
                  before a single page is built.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Specimen index */}
        <section className="mx-auto max-w-wide px-gutter py-section">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
            <Reveal>
              <Eyebrow rule>The System</Eyebrow>
              <SectionHeading level="display-md" as="h2" className="mt-6">
                Six specimens.
              </SectionHeading>
              <Lead className="mt-6">
                Each isolates one part of the language so it can be judged on its
                own, before any page depends on it.
              </Lead>
            </Reveal>

            <div>
              {specimens.map((item, index) => (
                <Reveal key={item.href} delay={index * 0.06}>
                  <Link
                    href={item.href}
                    className="group/row flex items-baseline gap-6 border-t border-border py-7 transition-opacity duration-[var(--duration-standard)] ease-editorial hover:opacity-60 md:gap-10"
                  >
                    <span className="type-meta shrink-0 tabular-nums">
                      {item.number}
                    </span>
                    <span className="flex-1">
                      <span className="type-h3 block font-display">
                        {item.title}
                      </span>
                      <span className="type-small mt-1.5 block max-w-[48ch] text-text-muted">
                        {item.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-[var(--duration-standard)] ease-editorial group-hover/row:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing frame — the emotional CTA treatment. */}
        <section className="relative overflow-hidden bg-bg-dark">
          <EditorialImage
            image={images.cta}
            size="full"
            reveal="maskUp"
            ar={{ desktop: "panorama", mobile: "editorial" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink-900/50" />
          <div className="absolute inset-0 flex items-center justify-center px-gutter">
            <Reveal className="flex justify-center">
              <Wordmark
                size="lg"
                tone="light"
                withDescender
                className="items-center text-center"
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-wide flex-col gap-4 px-gutter py-10 md:flex-row md:items-center md:justify-between">
          <span className="type-meta">Frame &amp; Story Studio · Phase 0</span>
          <span className="type-meta">
            Photography via Unsplash, for demonstration
          </span>
        </div>
      </footer>
    </>
  );
}
