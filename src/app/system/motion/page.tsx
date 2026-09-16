import type { Metadata } from "next";
import { SpecSection, SpecRow, SpecNote } from "@/components/specimen/Spec";
import { Eyebrow, Lead, SectionHeading } from "@/components/Typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { EasingCurve, ReplayStage } from "./MotionDemos";

export const metadata: Metadata = { title: "Motion" };

const durations = [
  { name: "Instant", ms: 120, use: "Cursor tracking, colour swaps." },
  { name: "Fast", ms: 240, use: "Hover states, small UI feedback." },
  { name: "Standard", ms: 420, use: "Most interface transitions, the route veil." },
  { name: "Slow", ms: 720, use: "Content reveals, the menu overlay." },
  { name: "Cinematic", ms: 1200, use: "Full-bleed image reveals, hero entrances." },
];

const easings = [
  { name: "editorial", curve: [0.22, 1, 0.36, 1] as const, use: "Default. Quick departure, long soft settle." },
  { name: "cinematic", curve: [0.16, 1, 0.3, 1] as const, use: "Softest settle. Large imagery and hero type." },
  { name: "mask", curve: [0.77, 0, 0.175, 1] as const, use: "Sharp both ends. Clip-paths and the menu." },
  { name: "inOut", curve: [0.65, 0, 0.35, 1] as const, use: "Symmetric. Anything that moves out and back." },
];

export default function MotionPage() {
  return (
    <div className="mx-auto max-w-content px-gutter py-section-sm">
      <header className="mb-20">
        <Eyebrow rule>Specimen 04</Eyebrow>
        <SectionHeading level="display-lg" as="h1" className="mt-6">
          Motion.
        </SectionHeading>
        <Lead className="mt-8">
          Slow, intentional, cinematic, restrained. The page should feel like it
          is moving with the photography — never like the interface is
          performing.
        </Lead>
      </header>

      <SpecSection
        number="01"
        title="Durations"
        description="Five steps. Never pick a number ad-hoc inside a component — compose from these so the whole site shares one sense of pace."
      >
        {durations.map((step) => (
          <SpecRow key={step.name} label={step.name} note={`${step.ms}ms`}>
            <ReplayStage durationMs={step.ms} />
            <p className="type-caption mt-3">{step.use}</p>
          </SpecRow>
        ))}
      </SpecSection>

      <SpecSection
        number="02"
        title="Easing"
        description="Four curves. Almost everything uses the first one; the others exist for specific jobs."
      >
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {easings.map((easing) => (
            <div key={easing.name}>
              <EasingCurve curve={easing.curve} />
              <p className="type-small mt-4 font-medium text-text">
                {easing.name}
              </p>
              <p className="type-caption mt-1 font-mono text-[0.6875rem]">
                cubic-bezier({easing.curve.join(", ")})
              </p>
              <p className="type-caption mt-2">{easing.use}</p>
            </div>
          ))}
        </div>
      </SpecSection>

      <SpecSection
        number="03"
        title="Text reveals"
        description="Scroll these out of view and back to replay. Reveals fire once, slightly before centre, so nothing is still moving when you reach it."
      >
        <SpecRow label="fadeUp" note="opacity + 24px rise">
          <Reveal variant="fadeUp">
            <p className="type-h2 font-display">The light was going.</p>
          </Reveal>
        </SpecRow>

        <SpecRow label="fade" note="opacity only">
          <Reveal variant="fade">
            <p className="type-h2 font-display">And nobody moved.</p>
          </Reveal>
        </SpecRow>

        <SpecRow label="stagger" note="120ms between children">
          <RevealGroup stagger={0.12}>
            {["Ceremony", "Reception", "Golden hour", "After dark"].map(
              (line) => (
                <RevealItem key={line}>
                  <p className="type-h3 border-b border-border py-3 font-display">
                    {line}
                  </p>
                </RevealItem>
              )
            )}
          </RevealGroup>
        </SpecRow>
      </SpecSection>

      <SpecSection
        number="04"
        title="Page transition"
        description="Navigate between any two specimens using the footer to see it. About 700ms end to end."
      >
        <ol className="type-small grid gap-3 text-text-muted">
          {[
            "An ivory veil already covers the viewport as the new route mounts.",
            "It retracts upward over 420ms, wiping the new page into view.",
            "Content settles up behind it over 720ms, overlapping the wipe.",
            "The two read as one movement rather than two separate steps.",
          ].map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="type-meta shrink-0 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <SpecNote>
            Enter-only by design. A true exit animation means holding the
            outgoing page in the tree and delaying every navigation by the length
            of its exit — that buys symmetry at the cost of making the whole site
            feel slower. The veil gives the sense of a page turning without ever
            standing between the reader and what they asked for.
          </SpecNote>
        </div>
      </SpecSection>

      <SpecSection
        number="05"
        title="Reduced motion"
        description="Not a degraded experience. A different, equally finished one."
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-bg p-7">
            <Eyebrow>Removed</Eyebrow>
            <ul className="type-small mt-5 grid gap-2 text-text-muted">
              {[
                "Parallax and scroll-linked transforms",
                "Image drift and scale on reveal",
                "Clip-path masks",
                "The custom cursor, entirely",
                "Magnetic pull on buttons",
                "The route veil wipe",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-bg p-7">
            <Eyebrow>Kept</Eyebrow>
            <ul className="type-small mt-5 grid gap-2 text-text-muted">
              {[
                "A short opacity fade on entry",
                "Every hover and focus state",
                "Full content visibility, always",
                "Complete layout and hierarchy",
                "All navigation behaviour",
                "The native cursor, untouched",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <SpecNote>
            Enforced in three places, because one is not enough:{" "}
            <code className="font-mono">MotionConfig reducedMotion=&quot;user&quot;</code>{" "}
            globally, a <code className="font-mono">useReducedMotion()</code>{" "}
            check in every animated component, and a CSS backstop in globals.css
            that forces any <code className="font-mono">[data-reveal]</code>{" "}
            element visible. Clip-path is not covered by Motion&apos;s automatic
            handling, which is exactly why the backstop exists.
          </SpecNote>
        </div>
      </SpecSection>

      <SpecSection
        number="06"
        title="Prohibited"
        description="Movement that draws attention to itself rather than to the work."
      >
        <ul className="type-small grid gap-2 text-text-muted sm:grid-cols-2">
          {[
            "Bounce, elastic and spring overshoot",
            "Anything that loops or moves continuously",
            "Aggressive parallax",
            "Animating every element on a page",
            "Rotation, flips and 3D transforms",
            "Long loading or splash screens",
            "Scroll hijacking",
            "Animated gradients or shimmer",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-error">
                &times;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </SpecSection>
    </div>
  );
}
