import type { Metadata } from "next";
import {
  SpecSection,
  SpecRow,
  SpecNote,
  specSlotSizes,
  SPEC_HALF_SIZES,
  SPEC_ROW_SIZES,
} from "@/components/specimen/Spec";
import { Eyebrow, Lead, Meta, SectionHeading } from "@/components/Typography";
import { EditorialImage, ImageCaption } from "@/components/EditorialImage";
import { PortfolioProject } from "@/components/PortfolioProject";
import { Reveal } from "@/components/Reveal";
import { images, SIZES_FULL } from "@/lib/images";

export const metadata: Metadata = { title: "Imagery" };

/** One cell of the crop table: three up at `lg`, two at `sm`, with 2rem gaps. */
const CROP_CELL_SIZES =
  "(min-width: 75rem) 339px, (min-width: 64rem) calc(30vw - 22px), (min-width: 40rem) calc(45vw - 16px), 90vw";

const crops = [
  { ar: "panorama", label: "Panorama", ratio: "21:9", use: "Section dividers, closing frames." },
  { ar: "cinema", label: "Cinema", ratio: "16:9", use: "Desktop hero, film posters." },
  { ar: "wide", label: "Wide", ratio: "3:2", use: "The default landscape frame." },
  { ar: "square", label: "Square", ratio: "1:1", use: "Mobile details, gallery rhythm." },
  { ar: "editorial", label: "Editorial", ratio: "4:5", use: "The default portrait frame." },
  { ar: "portrait", label: "Portrait", ratio: "3:4", use: "Mobile hero, standing figures." },
  { ar: "tall", label: "Tall", ratio: "2:3", use: "Full-height columns. Use sparingly." },
] as const;

export default function ImageryPage() {
  const [first, second, third, fourth] = images.portfolio;
  const [detailA, detailB, detailC] = images.details;

  return (
    <div className="py-section-sm">
      <header className="mx-auto mb-20 max-w-content px-gutter">
        <Eyebrow rule>Specimen 03</Eyebrow>
        <SectionHeading level="display-lg" as="h1" className="mt-6">
          Imagery.
        </SectionHeading>
        <Lead className="mt-8">
          Photography is the primary visual asset. Everything in the system
          exists to get an image to the right crop, at the right size, at the
          right moment — and then to get out of its way.
        </Lead>
      </header>

      <div className="mx-auto max-w-content px-gutter">
        <SpecSection
          number="01"
          title="Crop vocabulary"
          description="A fixed set of seven. Any photograph on the site uses one of these — arbitrary ratios are how a gallery starts to look accidental."
        >
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <div key={crop.ar}>
                <EditorialImage
                  image={first}
                  sizes={CROP_CELL_SIZES}
                  reveal="none"
                  ar={{ desktop: crop.ar, mobile: crop.ar }}
                />
                <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-border pt-2.5">
                  <Meta className="text-text">{crop.label}</Meta>
                  <Meta>{crop.ratio}</Meta>
                </div>
                <p className="type-caption mt-2">{crop.use}</p>
              </div>
            ))}
          </div>
        </SpecSection>

        <SpecSection
          number="02"
          title="Responsive art direction"
          description="Mobile gets a different crop, not a squeezed desktop frame. Resize the window past 768px to see the source swap."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <EditorialImage
                image={images.cta}
                sizes={SPEC_HALF_SIZES}
                reveal="none"
                ar={{ desktop: "panorama", mobile: "editorial" }}
                caption={<ImageCaption image={images.cta} />}
              />
              <p className="type-caption mt-3">
                Desktop 21:9 · Mobile 4:5 — the same photograph, framed twice.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <SpecNote>
                Implemented with <code className="font-mono">&lt;picture&gt;</code>{" "}
                and two <code className="font-mono">&lt;source&gt;</code> sets
                rather than <code className="font-mono">next/image</code>, which
                renders a single <code className="font-mono">&lt;img&gt;</code>{" "}
                and cannot vary the source by media query. Cropping is decided at
                the CDN, never with{" "}
                <code className="font-mono">object-position</code>.
              </SpecNote>
              <p className="type-small mt-6 max-w-[46ch] text-text-muted">
                Each frame reserves its aspect ratio before any bytes arrive, so
                nothing on the page shifts as images load.
              </p>
            </div>
          </div>
        </SpecSection>

        <SpecSection
          number="03"
          title="Reveal language"
          description="Four patterns, and only four. Scroll each back out of view and in again to replay it."
        >
          <SpecRow label="Reveal A" note="maskUp · 1200ms">
            <EditorialImage image={second} sizes={SPEC_ROW_SIZES} reveal="maskUp" />
            <p className="type-caption mt-3">
              Vertical mask opening upward, with the image drifting from 1.12 to
              rest behind it. The default for a large frame.
            </p>
          </SpecRow>

          <SpecRow label="Reveal B" note="maskRight · 1200ms">
            <EditorialImage image={third} sizes={SPEC_ROW_SIZES} reveal="maskRight" />
            <p className="type-caption mt-3">
              Horizontal mask. Reserved for images that enter beside text, where
              the sideways motion matches the reading direction.
            </p>
          </SpecRow>

          <SpecRow label="Reveal C" note="scaleFade · 1200ms">
            <EditorialImage image={fourth} sizes={SPEC_ROW_SIZES} reveal="scaleFade" />
            <p className="type-caption mt-3">
              The quietest of the four. Use when several images reveal near each
              other and masks would read as busy.
            </p>
          </SpecRow>

          <SpecRow label="Reveal D" note="clipExpand · 1200ms">
            <EditorialImage
              image={images.hero}
              sizes={SPEC_ROW_SIZES}
              reveal="clipExpand"
              ar={{ desktop: "cinema", mobile: "wide" }}
            />
            <p className="type-caption mt-3">
              Expands from an inset frame. Hero imagery only — it is the most
              theatrical pattern in the system.
            </p>
          </SpecRow>
        </SpecSection>

        <SpecSection
          number="04"
          title="Portfolio hover"
          description="Desktop only. Hover a frame — and tab to it, which does the same thing."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <PortfolioProject image={first} index={1} sizes={SPEC_HALF_SIZES} />
            <PortfolioProject
              image={second}
              index={2}
              sizes={SPEC_HALF_SIZES}
              delay={0.08}
            />
          </div>

          <div className="mt-10">
            <SpecNote>
              The frame never moves — only the photograph inside it scales, by
              5%. A scrim lifts so the metadata has something to sit against, and
              the title and location fade up. On touch the metadata is simply
              always visible; there is no hidden state to discover.
            </SpecNote>
          </div>
        </SpecSection>

        <SpecSection
          number="05"
          title="Asymmetric composition"
          description="The alternative to a card grid. Variable widths, deliberate offsets, images at different sizes on a shared alignment."
        >
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 md:col-span-7">
              <EditorialImage
                image={third}
                sizes={specSlotSizes(7)}
                reveal="maskUp"
                ar={{ desktop: "wide", mobile: "wide" }}
                caption={<ImageCaption image={third} />}
              />
            </div>

            <div className="col-span-8 md:col-span-4 md:col-start-9 md:mt-24">
              <EditorialImage
                image={detailA}
                sizes={specSlotSizes(4, 8)}
                reveal="maskUp"
                delay={0.1}
                ar={{ desktop: "editorial", mobile: "editorial" }}
                caption={<ImageCaption image={detailA} />}
              />
            </div>

            <div className="col-span-12 md:col-span-5 md:col-start-2">
              <Reveal>
                <p className="type-body-lg max-w-[34ch] text-pretty">
                  White space is a compositional element. The gap carries as much
                  weight as the frame.
                </p>
              </Reveal>
            </div>

            <div className="col-span-10 col-start-3 md:col-span-6 md:col-start-7">
              <EditorialImage
                image={detailB}
                sizes={specSlotSizes(6, 10)}
                reveal="scaleFade"
                ar={{ desktop: "wide", mobile: "square" }}
                caption={<ImageCaption image={detailB} />}
              />
            </div>
          </div>
        </SpecSection>
      </div>

      {/* Full-bleed proof — escapes the content column entirely. */}
      <section className="mt-section-sm">
        <EditorialImage
          image={detailC}
          sizes={SIZES_FULL}
          reveal="maskUp"
          ar={{ desktop: "panorama", mobile: "cinema" }}
        />
        <div className="mx-auto max-w-content px-gutter">
          <p className="type-caption mt-3">
            Full bleed · edge to edge · sizes=&quot;100vw&quot;
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-content px-gutter">
        <SpecSection
          number="06"
          title="Selection and performance"
          description="What earns a place in the manifest, and what it has to do once it is there."
        >
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            <div className="bg-bg p-7">
              <Eyebrow>Accept</Eyebrow>
              <ul className="type-small mt-5 grid gap-2 text-text-muted">
                {[
                  "Natural light and real moments",
                  "Movement, hands, quiet interaction",
                  "Environmental context and texture",
                  "Tones that sit inside the palette",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-bg p-7">
              <Eyebrow>Reject</Eyebrow>
              <ul className="type-small mt-5 grid gap-2 text-text-muted">
                {[
                  "Artificial smiles, posed expressions",
                  "Saturated primaries and neon gels",
                  "Photographers holding cameras, gear flat lays",
                  "Heart-shaped hands and obvious stock",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <SpecRow label="Performance" note="non-negotiable" className="mt-10">
            <ul className="type-small grid gap-2 text-text-muted">
              {[
                "AVIF and WebP negotiated automatically by the CDN",
                "Hero loads eagerly at high priority; everything else is lazy",
                "Aspect ratio reserved on the wrapper — zero layout shift",
                "A sizes value on every image, measured from the grid it sits in",
                "Mobile srcset capped at 1440px — phones never fetch 2560px",
                "Quality fixed at 74, which is the point of diminishing returns",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SpecRow>
        </SpecSection>
      </div>
    </div>
  );
}
