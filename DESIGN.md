# Frame & Story Studio — Design Specification

**Phase 0 — the visual constitution.**

This document defines the visual language of the site. It is the reference that
later phases build against: Phase 1 should be able to compose the four
production pages from what is written here without inventing a single new
colour, type size, duration or easing curve.

Nothing in this repository is a production page yet. What exists is the system,
plus a set of isolated proofs at `/system` that demonstrate each part of it in
the only way a design system can honestly be reviewed — running.

---

## 1. Brand

**Frame & Story Studio** — photography and film for people who want to remember
how it felt, not just how it looked.

### Personality

Cinematic. Editorial. Intimate. Refined. Emotional. Authentic. Artistic.
Contemporary. Quietly luxurious. Human.

### Anti-personality

Not corporate. Not SaaS-like. Not generic. Not over-designed. Not artificial.
Not loud. Not colourful. Not template-driven.

### The standard

> A cinematic editorial publication that happens to be a photography studio
> website.

Not: a business template filled with photographs.

The practical test: **if a page looks flat and plain with the images removed,
that is correct.** The interface is a frame around the photography. If a control
is drawing attention on its own, it is wrong.

### Reference discipline

The creative brief cites the Woodhouse wedding template as a reference for
editorial composition, photography-first hierarchy, whitespace and navigational
restraint. It is a reference for *sensibility only*. No layout, type pairing,
copy, component structure, animation, spacing pattern or branded element is
reproduced from it. The system below is original.

---

## 2. Wordmark

Typographic only. There is no mark, no monogram, no logo rule.

- Set in the display face (Instrument Serif), regular weight.
- The **ampersand is set in italic** — it is the entire identity.
- Three sizes: `sm`, `md`, `lg`. Two tones: `dark` (on ivory), `light` (on ink or photography).
- An optional descender line (`withDescender`) sets the studio discipline beneath the name in `type-meta`. Used in the footer and on the inquiry page.
- Over photography the `light` tone is **always** paired with a scrim. Legibility never depends on which image happens to load.

Component: `src/components/Wordmark.tsx` · Proof: `/system/components` §01

---

## 3. Colour

A warm darkroom neutral. **No pure black, no pure white** — every value carries
a little warmth so photographs sit inside the page rather than on top of it.

Colour comes from the imagery. The interface contributes none.

### Semantic tokens

These are what components consume. Never reach past them to a raw ramp value.

| Token | Value | Role | Contrast |
| --- | --- | --- | --- |
| `--color-bg` | `#FAF8F5` | Default page ground | — |
| `--color-surface` | `#F1ECE4` | Recessed panels, image placeholders | — |
| `--color-bg-dark` | `#14110F` | Inverted sections, mobile menu | — |
| `--color-surface-dark` | `#1F1B18` | Recessed panels on dark | — |
| `--color-text` | `#14110F` | Body and headings | 17.74:1 on bg |
| `--color-text-muted` | `#6E655C` | Secondary copy, captions | 5.38:1 on bg |
| `--color-text-inverse` | `#FAF8F5` | Text on dark | 17.74:1 on dark |
| `--color-text-inverse-muted` | `#A79D92` | Secondary on dark | 7.06:1 on dark |
| `--color-border` | `#DED7CC` | **Decorative rules only** | not a UI boundary |
| `--color-border-strong` | `#8A8178` | UI boundaries (inputs, outline buttons) | 3.61:1 — clears WCAG 1.4.11 |
| `--color-border-inverse` | `#2B2622` | Rules on dark | — |
| `--color-inverse` | `#14110F` | Inverted ground alias | — |
| `--color-accent` | `#8A6A47` | Focus rings, occasional small mark | 4.68:1 on bg |
| `--color-accent-soft` | `#A8865F` | Accent at lower emphasis | — |

### State

Used only in forms. There is no colourful UI anywhere else on the site.

| Token | Value | Contrast |
| --- | --- | --- |
| `--color-success` | `#4A6250` | 6.28:1 on bg |
| `--color-error` | `#8C4A3F` | 6.26:1 on bg |
| `--color-focus` | `#8A6A47` | 4.68:1 on bg |

### The border distinction — important

`--color-border` (`#DED7CC`) is **2.16:1** and is for hairline decorative rules
only. Anything that is an actual UI boundary a user must perceive — an input
outline, an outline button edge — must use `--color-border-strong`, which was
chosen specifically because it is the first value on the ramp that clears the
3:1 required by WCAG 1.4.11 for non-text UI components.

### Prohibited

Neon or fluorescent values · bright multi-stop gradients · SaaS blue, indigo or
violet · purple-to-pink AI gradients · heavy gold or metallic effects · vibrant
multi-colour systems · pure `#000` or pure `#FFF` · **colour used to signal
hierarchy**.

Hierarchy is built from scale, weight and whitespace. Never from colour.

Tokens: `src/app/globals.css` · Proof: `/system/color`

---

## 4. Typography

Two families. Few weights. The scale is fluid — headlines are compositional
elements, not labels.

| | Family | Role |
| --- | --- | --- |
| Display | **Instrument Serif** 400 (normal + italic) | Headlines, the wordmark, pull quotes |
| Functional | **Inter** (variable) | Body, navigation, metadata, UI |

Loaded via `next/font/google` in `src/app/layout.tsx` and exposed as
`--font-display` / `--font-sans`.

### Scale

Every step pairs a size with its own line-height and letter-spacing. Consume via
the `.type-*` classes rather than assembling utilities ad hoc.

| Class | Size | LH | Tracking | Use |
| --- | --- | --- | --- | --- |
| `.type-display-xl` | `clamp(3.25rem, 10.5vw, 10.5rem)` | 0.92 | −0.03em | Hero only. One per page, at most. |
| `.type-display-lg` | `clamp(2.75rem, 7.5vw, 7rem)` | 0.95 | −0.025em | Page titles, major statements |
| `.type-display-md` | `clamp(2.25rem, 5vw, 4.5rem)` | 1 | −0.02em | Section openers, menu links |
| `.type-h1` | `clamp(2rem, 4.2vw, 3.5rem)` | 1.06 | −0.02em | Primary headings in flow |
| `.type-h2` | `clamp(1.75rem, 3vw, 2.625rem)` | 1.12 | −0.015em | Sub-headings |
| `.type-h3` | `clamp(1.3125rem, 1.9vw, 1.75rem)` | 1.2 | −0.01em | Smallest display step |
| `.type-body-lg` | `clamp(1.0625rem, 1.15vw, 1.25rem)` | 1.62 | — | Lead paragraphs |
| `.type-body` | `1rem` | 1.68 | — | Default body |
| `.type-small` | `0.875rem` | 1.6 | — | Supporting copy, lists |
| `.type-caption` | `0.8125rem` | 1.5 | — | Image captions (muted by default) |
| `.type-eyebrow` | `0.6875rem` | 1 | 0.22em | Uppercase section labels |
| `.type-nav` | `0.8125rem` | 1 | 0.14em | Navigation, buttons |
| `.type-meta` | `0.75rem` | 1.4 | 0.08em | Image metadata rails (muted) |
| `.type-label` | `0.8125rem` | 1.4 | 0.04em | Form field labels — sentence case, not uppercase |
| `.type-helper` | `0.8125rem` | 1.5 | — | Field hint and validation text (muted) |

`.type-emphasis` applies display italic. It is the **one permitted flourish** —
for a single emphasised word inside a headline, never for whole paragraphs.

### Rules

- Display face for display steps only. Never set body copy in the serif.
- Body measure is capped by `--container-narrow` (46rem ≈ 68ch) or an explicit `max-w-[Nch]`.
- Negative tracking on display sizes, positive on uppercase UI sizes. This is what keeps large serif type from reading as a word processor and small uppercase type from reading as cramped.
- Weights: 400 for display, 400/500 for functional. Nothing bolder.

Proof: `/system/typography`

---

## 5. Layout

### Containers

| Token | Width | Use |
| --- | --- | --- |
| `--container-narrow` | 46rem | Reading measure |
| `--container-content` | 75rem | Standard editorial column |
| `--container-wide` | 96rem | Gallery and wide compositions |

Utilities `container-narrow` / `container-content` / `container-wide` apply the
max-width, centre, and the gutter in one class. `full-bleed` escapes the current
container to the viewport edge.

### Spacing

| Token | Value |
| --- | --- |
| `--spacing-gutter` | `clamp(1.25rem, 5vw, 4.5rem)` |
| `--spacing-section-sm` | `clamp(3.5rem, 7vw, 6rem)` |
| `--spacing-section` | `clamp(5rem, 12vw, 12rem)` |
| `--spacing-section-lg` | `clamp(7rem, 17vw, 17rem)` |

All four are fluid, so vertical rhythm scales with the viewport instead of
stepping at breakpoints.

### Composition principles

- **Asymmetry over grids.** Variable widths, deliberate offsets, images at different sizes sharing an alignment. A card grid is the failure mode.
- **Whitespace is a compositional element.** The gap carries as much weight as the frame.
- **Generous section separation.** Density is low by design; let sections breathe.
- **Full-bleed as punctuation.** An edge-to-edge image is a paragraph break, not a default.
- Twelve-column grid where a grid is genuinely needed; offsets via `col-start`.

### Structural primitives

Page code composes from these rather than repeating container and section
utilities by hand — that repetition is how an editorial rhythm drifts out of
alignment one section at a time.

| Primitive | Role |
| --- | --- |
| `Container` | Centres at `narrow` / `content` / `wide` / `full` and applies the gutter |
| `Section` | A band of the page: vertical rhythm (`space`) plus ground tone (`surface`). Takes a `container` prop as shorthand, or `false` for full-bleed children |
| `NarrowContent` | The reading measure, for long-form copy |
| `FullBleedSection` | Escapes the container to the viewport edge |
| `SplitLayout` | Two unequal columns — `media-wide` (1.4fr/1fr), `text-wide`, or `even` |
| `MediaTextLayout` | The common pairing: a frame beside a ~42ch column, vertically centred |
| `EditorialGrid` + `GridItem` | Twelve columns with `span`, `start`, `spanMobile` and `offsetTop` |
| `PageIntro` | Opening block: eyebrow, title, one short paragraph |
| `Divider` | Thin editorial rule, hairline or strong, light or dark |

Two decisions worth knowing:

- **`SplitLayout reverse` swaps columns with grid order, not `flex-direction`.**
  The DOM order stays as authored, so reading order and tab order do not
  desynchronise from the visual order.
- **`GridItem offsetTop` collapses to zero below `md`.** The vertical stagger is
  what makes the grid feel composed rather than tabular, but on a single-column
  mobile layout it would just be stray whitespace.

`Section surface="dark"` sets the inverse text colour on the wrapper so
descendants inherit it. Note the exception: `.type-caption`, `.type-meta` and
`.type-helper` carry their own colour, so on a dark ground they must be given
`text-text-inverse-muted` explicitly.

### Radius

Essentially square. `--radius-none` 0 · `--radius-xs` 1px · `--radius-sm` 2px ·
`--radius-pill` 999px, **permitted only on the cursor and small chips**.
Rounded pills read as SaaS UI.

---

## 6. Photography

Photography is the primary visual asset. Everything in the system exists to get
an image to the right crop, at the right size, at the right moment — and then to
get out of its way.

### Art direction

**Accept:** natural light · real moments · movement · hands · quiet interaction
· environmental context and texture · environmental portraits · architecture ·
wedding details · human connection · tones that sit inside the ivory/charcoal
palette.

**Reject:** artificial smiles · posed corporate expressions · overly staged
scenes · saturated primaries and neon gels · commercial lifestyle stock ·
**photographers holding cameras** · camera-gear flat lays · heart-shaped hands ·
anything that reads as obvious stock.

A candidate only enters the manifest **after it has actually been looked at**.
During Phase 0, 51 candidates were verified over HTTP and roughly 18 reviewed by
eye; 12 survived. The rejections were all art-direction failures the rules above
predict — a gelled neon portrait, a gear flat lay, heart-shaped hands, a
saturated pink aisle, commercial shopping-bag stock.

Verify new IDs with `node scripts/verify-images.mjs <id>…`, then look at them.

### Crop vocabulary

A fixed set of seven. Arbitrary ratios are how a gallery starts to look
accidental.

| Name | Ratio | Use |
| --- | --- | --- |
| `panorama` | 21:9 | Section dividers, closing frames |
| `cinema` | 16:9 | Desktop hero, film posters |
| `wide` | 3:2 | The default landscape frame |
| `square` | 1:1 | Mobile details, gallery rhythm |
| `editorial` | 4:5 | The default portrait frame |
| `portrait` | 3:4 | Mobile hero, standing figures |
| `tall` | 2:3 | Full-height columns — sparingly |

### Responsive art direction — non-negotiable

Mobile gets a **different crop, not a squeezed desktop frame**. Every manifest
entry declares `ar: { desktop, mobile }`. Desktop hero is `cinema`; mobile hero
is `portrait`.

This is implemented with `<picture>` and two `<source>` sets rather than
`next/image`. The reason is structural: `next/image` renders a single `<img>`
and cannot vary the source by media query, so it cannot satisfy this
requirement. Nothing is lost by not routing through the Next optimiser, because
resizing already happens at the Unsplash (imgix) CDN.

Cropping is decided at the CDN via the `ar` and `crop` parameters — **never**
with CSS `object-position`.

Breakpoint for the source swap: `(min-width: 48rem)`.

### Performance rules

- AVIF and WebP negotiated automatically by the CDN (`auto=format`).
- Aspect ratio reserved on the wrapper before any bytes arrive — **zero layout shift**.
- Wrapper background is `--color-surface`, so a slow connection shows the palette rather than a white hole.
- Hero loads eagerly at high priority. Everything else is lazy.
- A `sizes` value on **every** image, chosen from the presets. Getting `sizes` wrong is the single most expensive mistake on an image-led site.
- Desktop srcset to 2560px; **mobile srcset capped at 1280px** so phones never fetch a 2560px file.
- Quality fixed at **74** — the point of diminishing returns.
- Meaningful `alt` on every image. Never "photo" or "image".

### `sizes` presets

| Preset | Value |
| --- | --- |
| `full` | `100vw` |
| `half` | `(min-width: 64rem) 50vw, 100vw` |
| `third` | `(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw` |
| `content` | `(min-width: 75rem) 1200px, 92vw` |
| `offset` | `(min-width: 64rem) 46vw, 92vw` |
| `detail` | `(min-width: 64rem) 28vw, 55vw` |

System: `src/lib/images.ts` · Component: `src/components/EditorialImage.tsx` ·
Proof: `/system/imagery`

---

## 7. Video

Used sparingly. **Never autoplays with sound.**

Every clip needs a poster frame drawn from the image manifest, so the block is
composed before playback begins and degrades to a still on a slow connection.

| | Ambient background film | Featured film |
| --- | --- | --- |
| `muted` | true | false |
| `loop` | true | false |
| `autoPlay` | true | false |
| `playsInline` | true | true |
| `controls` | — | true |
| `preload` | `metadata` | `none` |

Ambient video is decorative: under `prefers-reduced-motion` or Save-Data the
poster is shown and the video never loads. A featured film opens in a modal with
focus trapped and Escape to close.

Defaults: `videoDefaults` in `src/lib/images.ts`.

---

## 8. Motion

Slow, intentional, cinematic, restrained. The page should feel like it is moving
*with* the photography — never like the interface is performing.

**Never pick a duration or easing ad-hoc inside a component.** Compose from
`src/lib/motion.ts`, which mirrors the CSS custom properties in `globals.css`
(seconds there, milliseconds here — change both together).

### Durations

| Name | CSS | JS | Use |
| --- | --- | --- | --- |
| Instant | 120ms | 0.12 | Cursor tracking, colour swaps |
| Fast | 240ms | 0.24 | Hover states, small UI feedback |
| Standard | 420ms | 0.42 | Most interface transitions, the route veil |
| Slow | 720ms | 0.72 | Content reveals, the menu overlay |
| Cinematic | 1200ms | 1.2 | Full-bleed image reveals, hero entrances |

### Easing

| Name | Curve | Use |
| --- | --- | --- |
| `editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | **Default.** Quick departure, long soft settle |
| `cinematic` | `cubic-bezier(0.16, 1, 0.3, 1)` | Softest settle. Large imagery, hero type |
| `mask` | `cubic-bezier(0.77, 0, 0.175, 1)` | Sharp both ends. Clip-paths and the menu |
| `inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric. Anything that moves out and back |

### Reveal language — four patterns, and only four

| | Variant | Behaviour |
| --- | --- | --- |
| **A** | `maskUp` | Vertical mask opening upward, 1200ms. The default for a large frame. |
| **B** | `maskRight` | Horizontal mask, left to right. For images entering beside text, where sideways motion matches the reading direction. |
| **C** | `scaleFade` | Opacity + 1.04 scale, 1200ms. The quietest — use when several images reveal near each other and masks would read as busy. |
| **D** | `clipExpand` | Expands from a 14% inset frame. **Hero imagery only** — the most theatrical pattern in the system. |

`imageDrift` (scale 1.12 → 1) is applied to the `<img>` *inside* a masked
wrapper. It is what gives a reveal its cinematic weight. Always pair it with
`maskUp` or `maskRight`.

> **Structural rule — the observed element must never be the masked one.**
> `maskUp` and `maskRight` start at `inset(100% …)`, which paints nothing.
> Chrome reports an *empty* intersection rect for such an element, so an
> IntersectionObserver attached to it never crosses its threshold — the reveal
> that would open the mask never fires and the image stays invisible
> permanently. Put `whileInView` on an unclipped wrapper and let the variant
> label propagate to an inner `[data-reveal]` child. `clipExpand` starts at
> `inset(14% …)` and so never hit this, which is exactly why it is easy to miss.

For text: `fadeUp` (opacity + 24px rise) is the default; `fade` is for anything
secondary.

### Scroll behaviour

Reveals fire **once**, at `amount: 0.2` with a `-12%` bottom margin — slightly
before the element is fully in view, so nothing is still animating when the
reader arrives at it.

Stagger is generous. `staggerContainer(0.12)` is the default; fast staggers read
as a UI list, slow staggers read as editorial pacing.

### Page transitions

Target **400–700ms** end to end. Roughly 700ms as built.

1. An ivory veil already covers the viewport as the new route mounts.
2. It retracts upward over 420ms (`mask` easing), wiping the new page into view.
3. Content settles up behind it over 720ms (`cinematic` easing, 0.1s delay), overlapping the wipe.
4. The two read as one movement rather than two steps.

Driven by `src/app/template.tsx`, which remounts on navigation where a layout
would persist.

**Enter-only by design.** A true exit animation means holding the outgoing page
in the tree and delaying every navigation by the length of its exit — that buys
symmetry at the cost of making the whole site feel slower. The veil gives the
sense of a page turning without ever standing between the reader and what they
asked for.

### Prohibited

Bounce, elastic and spring overshoot · anything that loops or moves continuously
· aggressive parallax · animating every element on a page · rotation, flips and
3D transforms · long loading or splash screens · scroll hijacking · animated
gradients or shimmer.

System: `src/lib/motion.ts` · Proof: `/system/motion`

---

## 9. Interaction

### Links

An underline that wipes in from the left (420ms) and an arrow that nudges 4px
right. Both at once give the link direction. Opacity drops to 70% on hover.
Pure CSS transition, so it costs nothing and degrades to a plain state under
reduced motion.

### Buttons

Three variants × two tones. Square-cornered.

| Variant | Dark tone | Light tone |
| --- | --- | --- |
| `solid` | ink ground, inverse text | ivory ground, dark text |
| `outline` | `border-strong`, darkens to ink on hover | `border-inverse`, lightens to ivory |
| `ghost` | text only, 70% on hover | text only, 70% on hover |

**Full state set:** idle → loading → success → error, plus disabled.

Loading, success and error swap the **label** as well as the treatment
("Sending" / "Received" / "Try again"). Colour alone is never the only signal.
Loading sets `aria-busy` and disables pointer events.

### Portfolio hover

**The frame never moves** — only the photograph inside it scales, by 5%. A scrim
lifts so the metadata has something to sit against, and the title and location
fade up.

`group-focus-within` mirrors hover exactly, so tabbing to a project triggers the
same overlay that hovering does.

On touch the metadata is simply always visible in a static caption rail. There
is no hidden state to discover.

### Cursor

Desktop only. An 8px dot at rest, expanding to a 76px labelled disc over
anything carrying `data-cursor`. Labels: `view`, `play`, `inquire`.

Mounts **only** for `(hover: hover) and (pointer: fine) and (min-width: 48rem)`,
and never under reduced motion. It hides the native cursor only while it is
actually running, so touch users keep the native cursor untouched.

The width belongs in that media query and **not** in a `md:` utility class. A
class hides the dot while the effect that sets `cursor: none` still runs, and a
desktop window dragged narrower than 48rem then has no visible pointer at all.
One condition governs mounting and cursor-hiding together.

### Focus

One treatment across the entire site, applied via `:focus-visible`:

```css
outline: 2px solid var(--color-focus);
outline-offset: 3px;
```

It appears for keyboard users and stays out of the way for pointer users. **It
is never removed** — including on the portfolio frames.

### Magnetic button

Leans toward the pointer at a quarter of the offset. Inert on touch, off
entirely under reduced motion. If you can clearly see it move, it is turned up
too high.

Proof: `/system/components`

---

## 10. Navigation

### Header

Fixed. `--header-height` is 4.5rem, rising to 5.5rem at ≥64rem.

- Transparent with no border over a hero, so photography runs to the top edge.
- Past **24px** of scroll it takes a **solid** ivory background and a hairline border.
  Opaque, not translucent: a translucent bar lets display-scale serif underneath
  read straight through it, however much backdrop blur is applied.
- Text resolves to dark once settled — **contrast never depends on the image behind it**.
- Nav links sit at 65% opacity, coming to full on hover with a rule that wipes in.
- The active route holds its rule open permanently.
- Below `md` the links collapse into the Menu trigger.

Nav: Work · Services · Contact. Beside it, outlined and quieter than the
wordmark, the one primary call to action — **Book a Session**.

### Mobile menu

Not a dropdown — a full editorial overlay.

**Motion:** panel wipes up over the page via `clip-path` at 720ms · links rise in
sequence 70ms apart at Display M scale · dismiss wipes back down at 420ms · both
collapse to a plain fade under reduced motion.

**Accessibility:** `role="dialog"` with `aria-modal` and a label · focus moves to
Close on open and back to the trigger on dismiss · Tab is trapped within the
panel · Escape dismisses · background scroll is locked.

The three routes sit together at display scale as equals. Below a rule — where
the header keeps its own call to action on a wider screen — sit Book a Session
and the studio address.

### Footer

Two bands, and the first one is optional.

- **The invitation** — dark ground, eyebrow, a Display M line and one solid CTA
  beside the address. This is the site's single ask; it is not repeated further
  up the page.
- **The meta rail** — ivory hairline band carrying the wordmark with its
  descender, an optional nav slot, and the colophon.

Pages that already close on their own composition pass `cta={false}` and keep
only the rail, so the invitation is never made twice. The specimen routes do
this — a design system does not sell commissions.

---

## 11. Responsive

Breakpoints are Tailwind defaults; the meaningful ones are `md` (48rem) for the
art-direction source swap and `lg` (64rem) for layout shifts.

| | Mobile | Desktop |
| --- | --- | --- |
| Hero crop | `portrait` (3:4) | `cinema` (16:9) |
| Nav | Full-screen overlay | Inline links |
| Portfolio metadata | Always visible, static rail | Revealed on hover/focus |
| Cursor | Native, untouched | Custom dot/disc |
| Type | Fluid `clamp()` floors | Fluid ceilings |
| Section rhythm | `clamp()` floors | `clamp()` ceilings |

Because the type and spacing scales are fluid, most responsive behaviour needs
no breakpoint at all. Reach for a breakpoint when the *composition* changes, not
when a size does.

`overflow-x: hidden` sits on the body so horizontal-scroll galleries never leak
page-level overflow.

### Overflow discipline

Target widths: 320 · 375 · 414 · 768 · 1024 · 1280 · 1440.

The system is structurally resistant to horizontal overflow because type,
spacing and gutters are all `clamp()`-based and widths are expressed as
`max-width` rather than `width`. A scan of the compiled CSS confirms **no fixed
pixel width above 320px and no element `min-width` at all** — the only large
values are media-query breakpoints.

The one genuine risk class is text that cannot wrap. The wordmark is set
`whitespace-nowrap`, and at a fixed `2rem` its `lg` size measured wider than the
~280px content box available on a 320px screen. Its size is therefore fluid:
`clamp(1.375rem, 6vw, 2rem)`. **Any future `whitespace-nowrap` needs the same
treatment or a smaller floor.**

---

## 12. Accessibility

- Every text pairing in §3 clears **WCAG AA**; most clear AAA.
- `--color-border-strong` clears **1.4.11** for non-text UI boundaries.
- One visible focus treatment everywhere, never removed.
- Keyboard parity: portfolio hover state is reachable by Tab via `group-focus-within`.
- Mobile menu is a proper dialog — labelled, modal, focus-trapped, Escape-dismissible, scroll-locked.
- Meaningful `alt` on every image; decorative elements are `aria-hidden`.
- State is never signalled by colour alone.

### Reduced motion

Not a degraded experience. A different, equally finished one.

**Removed:** parallax and scroll-linked transforms · image drift and scale on
reveal · clip-path masks · the custom cursor, entirely · magnetic pull · the
route veil wipe.

**Kept:** a short opacity fade on entry · every hover and focus state · full
content visibility, always · complete layout and hierarchy · all navigation
behaviour · the native cursor, untouched.

Enforced in **three** places, because one is not enough:

1. `MotionConfig reducedMotion="user"` globally (`src/components/Providers.tsx`).
2. A `useReducedMotion()` check in every animated component, collapsing to `reducedVariants`.
3. A CSS backstop in `globals.css` forcing any `[data-reveal]` element visible.

The third exists specifically because **`clip-path` is not covered by Motion's
automatic reduced-motion handling** — without it, a masked image would stay
hidden.

---

## 13. Primitives

| Component | Role |
| --- | --- |
| `Wordmark` | The typographic identity, 3 sizes × 2 tones |
| `Typography` | `Eyebrow`, `Lead`, `Meta`, `SectionHeading` |
| `Container` / `Section` / `NarrowContent` / `FullBleedSection` | Measure, rhythm and ground tone |
| `SplitLayout` / `MediaTextLayout` | Two-column editorial pairings |
| `EditorialGrid` / `GridItem` | Twelve-column grid with intentional offsets |
| `PageIntro` / `Divider` | Page opening block and the editorial rule |
| `EditorialImage` | The core image primitive — art-directed `<picture>`, reserved ratio, reveal |
| `ImageOverlay` | Photograph carrying text, with a structural scrim |
| `FullBleedImage` / `ImageCaption` | Edge-to-edge variant and the metadata rail |
| `ProjectMeta` | Title, credit line, description and view link — fields collapse when absent |
| `PortfolioProject` | Framed project with hover/focus metadata overlay |
| `EditorialLink` / `EditorialButton` | The link and button language |
| `MagneticButton` | Pointer-following CTA |
| `Reveal` / `RevealGroup` / `RevealItem` | Scroll reveal wrappers |
| `SiteShell` | Header, `main` and footer composed once — a page states its `surface` and the shell derives the rest |
| `SiteFooter` | The closing invitation band plus the meta rail, with an optional nav slot |
| `Header` / `MobileNav` | Navigation |
| `PageTransition` | Route veil + content settle |
| `Cursor` | The custom cursor |
| `Providers` | `MotionConfig` |

Libraries: `src/lib/motion.ts` (motion), `src/lib/images.ts` (imagery),
`src/lib/cn.ts` (class merge).

### `cn` concatenates — it does not merge

`cn` is `parts.filter(Boolean).join(" ")`, not `tailwind-merge`. Two utilities
of the same kind do not resolve by call-site order; the browser resolves them by
**stylesheet order**, so a `className` passed in from outside can silently lose
to one baked into the component.

Consequences, both of which bit during Phase 1 QA:

- A component that bakes in a `text-*`, `max-w-*` or `px-*` utility cannot be
  overridden by passing the competing utility. Give it a **prop with a lookup
  table** instead — that is why `Eyebrow`, `Wordmark`, `Divider`, `ProjectMeta`
  and `EditorialButton` all take `tone` rather than accepting a colour class.
- Classes set in `@layer components` (`.type-meta`, `.type-caption`,
  `.type-helper` all set `color`) *are* reliably beaten by a utility, because
  utilities win against the components layer by design. Only utility-vs-utility
  collisions are ambiguous.

`Eyebrow` takes `tone="dark" | "light" | "inherit"`. Use `light` on a dark
surface and `inherit` over photography, where the container sets the colour.

### `tone` is ink; `surface` is ground

Two axes, never one. They are different words because they describe different
things, and they look inverted at a call site because ink and ground **are**
opposite — `tone="light"` belongs on `surface="dark"`.

| Prop | Means | Components |
| --- | --- | --- |
| `tone` | The **ink** — what colour the marks are | `Wordmark`, `Eyebrow`, `EditorialLink`, `EditorialButton`, `Divider`, `ProjectMeta`, `Header` |
| `surface` | The **ground** — what colour it sits on | `Section`, `FullBleedSection` |

So `<Header tone="light" />` means light ink, which is what you want over a dark
photograph; `<Section surface="dark">` means a dark ground, which is what you
want behind light ink. Reading one as the other inverts every colour decision on
the page.

Prefer not to set both by hand. `SiteShell` takes the `surface` and derives the
header's `tone` from it, so a page states its ground once.

### Measure and the `ch` unit

`ch` resolves against **the element's own font-size**. A `max-w-[Nch]` on a
wrapper is measured in the wrapper's font — usually the body face — so it pins
every descendant, including display-scale headings, to one fixed pixel width at
every viewport. Put the measure on the element whose font it is meant to
describe.

---

## 14. Do / Don't

**Do** — let photography carry the page · use the fixed crop vocabulary · give
sections room · build hierarchy from scale, weight and whitespace · compose
motion from the token scale · art-direct mobile separately · reserve every
aspect ratio before load · keep every interactive element on the same focus
ring.

**Don't** — SaaS cards · excessive gradients · colourful UI · excessive icons ·
fake statistics · glassmorphism · 3D objects · constant animation · generic
stock-photo aesthetics · rounded pill UI · colour as hierarchy · ad-hoc
durations · squeezing desktop images into mobile · copying the reference
template.

---

## 15. Specimens

The proofs live at `/system` and are design-system demonstrations, **not**
production pages.

| Route | Covers |
| --- | --- |
| `/system/typography` | Families, the full scale, measure, hierarchy |
| `/system/color` | Semantic and state swatches with measured contrast, palette in use |
| `/system/imagery` | Crop vocabulary, responsive art direction, four reveals, portfolio hover, asymmetric composition, selection + performance rules |
| `/system/motion` | Duration scale with replay, plotted easing curves, text reveals, page transition, reduced motion, prohibited list |
| `/system/components` | Wordmark, links, buttons + states, focus, header, mobile menu, cursor, metadata rail |
| `/system/layout-system` | Containers, section rhythm, split layouts, the editorial grid, dividers, project metadata, form typography, dark surface, image overlay |

`/` is the Phase 0 index. It is deliberately **not** the homepage — it exists to
prove the three things that can only be judged in situ (the header over
full-screen photography, the display face at hero scale, the opening image
reveal) and to route into the specimens. The real homepage belongs to a later
phase.

---

## 16. Phase 1 handoff

The four production pages can now be composed without redefining anything above.
What Phase 1 still needs to decide — and what is deliberately **not** settled
here — is content: real copy, the actual project set, service descriptions,
pricing posture, and the inquiry form's fields and validation.

Constraints that carry forward:

- Nothing new in the token layer without a reason recorded in `globals.css`.
- New imagery passes §6 art direction and is reviewed by eye before it enters the manifest.
- New motion composes from §8. If a component needs a duration that is not on the scale, the scale is wrong, not the component.

---

## 17. Conversion

### Vocabulary

One term per concept. The site has exactly one primary call to action, and the
supporting wording is deliberately quieter so that it cannot compete with it.

| Rank | Wording | Where |
| --- | --- | --- |
| Primary | **Book a Session** | Header, and once at the close of `/`, `/portfolio`, `/services` |
| Secondary | **View Our Work** | Anywhere routing into the archive |
| Supporting | **Explore Services** | The homepage service index |
| Supporting | **Start a Conversation** | Per-service rails, and the return trip to the form on `/contact` |
| Form | **Send Inquiry** | The inquiry form's submit control |

Not used anywhere, and not to be introduced: Get Started, Learn More, Click
Here, Submit, Request a Quote, Book Now, Enquire, Schedule, Reserve, Contact Us.

`/contact` carries no primary CTA. The form is the conversion action, and a
button next to it offering the same thing would only compete with it.

### Routes between pages

Every page can reach the work, the catalogue and the form, and no page is a
dead end.

| From | Wording | To |
| --- | --- | --- |
| `/` | View Our Work | `/portfolio` |
| `/` | Explore Services | `/services` |
| `/` | Book a Session | `/contact` |
| `/portfolio` | Book a Session | `/contact` |
| `/services` | View Our Work | `/portfolio` |
| `/services` | Start a Conversation | `/contact?service=…` |
| `/services` | Book a Session | `/contact` |
| `/contact` | View Our Work | `/portfolio` |

The header carries all three routes on every page, so anything the body does not
link to is still one control away.

Service rails carry the service with them: `/contact?service=<slug>` preselects
the matching option. Both ends go through `serviceSlug()` in `src/lib/studio.ts`,
so a rename cannot silently stop matching. An unrecognised slug selects nothing
rather than guessing.

### Analytics event points

**Nothing is instrumented, and no analytics dependency is installed.** This is
the map for whoever adds one, recorded now while the reasoning is fresh.

| Event | Fires on |
| --- | --- |
| `view_portfolio` | `/portfolio` and its category routes |
| `view_services` | `/services` |
| `click_book_session` | Any control labelled Book a Session — header, mobile menu, page close |
| `click_view_work` | Any control labelled View Our Work |
| `start_inquiry` | First edit to any inquiry field, once per session |
| `submit_inquiry` | The form passing validation |

`click_book_session` and `click_view_work` are worth a source property (header ·
menu · page) — the question these answer is *where* the visitor decided, and a
bare count cannot tell you that.

`submit_inquiry` records that the visitor completed the form. It does not record
a delivered message: there is no backend, and the form says so.

### What the site must never claim

No testimonials, reviews, ratings, awards, client logos, publication logos,
follower counts, years in business, projects delivered, or response-time
promises. No countdowns, no limited availability, no popups of any kind.

The studio is fictional. The work on the page is the only proof it offers, and
that is the intended posture rather than a gap to be filled later.

## 18. Search

### One topic per page

Search intent is carried by titles, headings, alt text and links — not by copy
written for crawlers. No page on this site exists to rank for a phrase, and
nothing below asks for a paragraph to be added.

| Route | Primary topic | Title |
| --- | --- | --- |
| `/` | Photography studio · professional photography | Frame & Story Studio \| Photography & Cinematic Films |
| `/portfolio` | Photography portfolio | Photography Portfolio |
| `/portfolio/weddings` | Wedding photography | Wedding Photography Portfolio |
| `/portfolio/couples` | Couples & engagement photography | Couples Photography Portfolio |
| `/portfolio/portraits` | Portrait photography | Portrait Photography Portfolio |
| `/portfolio/events` | Event photography | Event Photography Portfolio |
| `/portfolio/lifestyle` | Lifestyle & commercial photography | Lifestyle Photography Portfolio |
| `/services` | Photography & videography services | Photography & Videography Services |
| `/contact` | Photography inquiry | Contact & Photography Inquiries |

The homepage H1 stays **Stories Worth Remembering.** It is the brand line, and
the page says what the studio does in the eyebrow, the H2s and the metadata
instead. `/services` already uses the six service names as H2s, which is where
the service vocabulary genuinely belongs.

### Where metadata comes from

`src/lib/seo.ts` — `pageMetadata()` composes the title, description, canonical,
Open Graph and Twitter card for a route from four values. Use it for any new
public page.

The reason it exists is worth keeping: **a route that sets `openGraph` at all
replaces the parent's `openGraph` wholesale rather than merging into it.** Every
page that hand-wrote an Open Graph block was silently dropping the card image.
Declaring the shared fields in the root layout does not fix this; composing them
per route does.

The root layout holds only what is true everywhere — `metadataBase`, the title
template, the fallback description, the default robots directives. Canonicals
and Open Graph are deliberately not there: an inherited canonical would point
every specimen page at the homepage.

### Domain

`SITE_URL` in `src/lib/studio.ts` is the only place the origin is written.
Canonicals, the sitemap, robots and every absolute Open Graph URL derive from
it.

It falls back to `https://www.framestorystudio.example`. `.example` is reserved
by RFC 2606 and can never be registered, so the placeholder cannot be mistaken
for a real studio — which matters more than convenience, because a canonical
pointing at the wrong host is worse than an obviously absent one.

**To deploy:** set `NEXT_PUBLIC_SITE_URL` to the production origin, no trailing
slash, in the hosting provider's environment settings. It is read at build time
and must be public — canonical tags and the sitemap are part of the rendered
output, so there is nothing secret in it. See `.env.example`.

### Crawling

- `src/app/sitemap.ts` → `/sitemap.xml`. Nine URLs: the four sections and the
  five category views, derived from `workCategories` so a new category cannot
  be forgotten. `lastModified` and `changeFrequency` are omitted on purpose — a
  build timestamp would claim every page changed on every deploy, and a
  frequency would be a guess.
- `src/app/robots.ts` → `/robots.txt`. Everything allowed except `/system/`.
- `src/app/system/layout.tsx` carries `noindex, nofollow`. Both halves are
  needed: robots.txt stops a crawler spending time there, the meta tag is what
  keeps a specimen out of an index if something links to one anyway.

### The business profile

`studio` in `src/lib/studio.ts` is the entity. The footer, the inquiry page and
every structured-data node read from it and from nothing else.

One rule governs it: **a field is either verified or absent.** Absent is `null`
for single values and `[]` for lists — never `"YOUR_CITY"`, because a
placeholder string is one careless render away from appearing on a page or in a
schema a crawler will believe. `null` cannot be printed by accident, and the
types make you handle it.

| Field | Today | What it needs |
| --- | --- | --- |
| `name` `description` `url` `email` | Verified | — |
| `telephone` | `null` | A real number, E.164 |
| `location` | `null` | City and ISO country at minimum; `geo` only from a pin on the premises |
| `serviceArea` | `[]` | The places actually travelled to |
| `openingHours` | `[]` | Real published hours. Empty is correct for appointment-only |
| `socialProfiles` | `[]` | Absolute URLs to profiles the studio controls |

Nothing is filled in to make a schema look fuller. An `Organization` with four
true facts outranks a `LocalBusiness` with twelve invented ones, and fabricated
local data is the one SEO mistake that gets a business penalised rather than
merely ignored.

### Structured data

Built in `src/lib/schema.ts`, emitted by `<JsonLd>` — a plain `<script>` tag, no
client JavaScript, no library.

| Node | Where | Notes |
| --- | --- | --- |
| `Organization` | Every route | Becomes `PhotographStudio` once a location exists |
| `WebSite` | Every route | `publisher` → the studio by `@id` |
| `Service` ×6 | `/services` | Same names and sentences the page prints; `url` → the `#slug` anchor the index already links to |

`/services` therefore carries two blocks. That is intentional and not a
duplicate: the Service nodes reference the studio by `@id` rather than
describing it again.

**The type is chosen by the data.** `businessNode()` emits `Organization` while
`studio.location` is `null` and `PhotographStudio` — schema.org's
photography-specific subtype of `LocalBusiness` — once it is not. Filling in the
config is the whole upgrade; no code changes. `address`, `geo`, `areaServed`,
`openingHoursSpecification`, `telephone` and `sameAs` each appear the moment
their field is populated and are omitted entirely while it is empty, because an
absent property reads as "not stated" and an empty one reads as a claim.

Never to be added without real data behind them: `aggregateRating`, `review`,
`award`. Rating markup invented for a demo is the one thing here that could
mislead a person rather than just a crawler.

`logo` is absent and should stay absent: the identity is the typographic
wordmark, which is markup rather than a file. `image` carries the social card —
a real photograph at a URL that resolves. `potentialAction` is omitted too; the
site has no search.

The locations printed under portfolio pieces — Umbria, Cascais, Isle of Skye —
are **where a photograph was taken**, and illustrative at that, like the stock
imagery they caption. They are not business geography and must never be read
into structured data as a service area or an address. Once a studio replaces the
manifest with its own work, real capture locations become legitimate
`contentLocation` on a per-photograph `ImageObject` — but only then, and only
per photograph.

### Where location appears once it is verified

Nothing below needs building; each is already conditional on the config.

| Surface | Behaviour |
| --- | --- |
| Footer meta rail | `StudioDetails` renders city, phone, service area and social links. Renders nothing today |
| Contact page | The details block replaces the "no telephone and no address" disclosure |
| Structured data | Type upgrade plus the address, geo, area and hours properties |
| Titles and descriptions | Hand-written in `pageMetadata()` calls. `[City] wedding photographer` becomes honest here — and only here |

What must **not** happen when that day comes: `[CITY]` tokens in body copy,
repeated city names in a footer, or a page per town. Local relevance comes from
a verified address, a Google Business Profile, real venues in real project
pages, and real reviews — not from the word appearing more often.

### Local SEO — what is deliberately not built

- **No location pages.** `/photographer-<city>` routes are doorway pages unless
  each carries genuinely distinct work and writing. If a real studio serves
  several areas, one page per area is justified only when there is a real body
  of work from that area to put on it.
- **No Google Business Profile.** It cannot be created from a codebase. It needs
  a real name, primary category, address or service-area configuration, phone,
  website, hours, photographs, service descriptions, and postcard or phone
  verification. Reviews follow from it — they are never marked up by hand.
- **No reviews, ratings or hours.** See above.
- **No map embed or review widget.** Both are third-party scripts on a site that
  currently ships none.
- **No project detail pages.** `/portfolio/<project>` is the natural long-tail
  route — a real wedding at a real venue, with its own images, film and words.
  It is worth building when there is a real project to put in it, and worthless
  as a placeholder. `ArchivePiece` in `src/lib/images.ts` is the type that would
  grow the fields.
- **No local content.** Venue guides, engagement-location write-ups and client
  stories are the legitimate local content strategy, and every one of them
  requires a real shoot first.

### Search Console readiness

Nothing is connected, and no verification code is present — a fabricated one
would be worse than none. When a production domain exists:

| What | Where |
| --- | --- |
| Property | The value of `NEXT_PUBLIC_SITE_URL` |
| Sitemap to submit | `<origin>/sitemap.xml` |
| Robots to check | `<origin>/robots.txt` |
| Canonical source | `pageMetadata()` in `src/lib/seo.ts` |
| Verification meta tag | `metadata.verification.google` in `src/app/layout.tsx` |

DNS `TXT` verification is preferable where the registrar is reachable; it
survives redeploys and keeps the code free of a provider-specific token.
