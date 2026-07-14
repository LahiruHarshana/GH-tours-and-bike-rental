# DESIGN.md — Premium Dark Matcha Commerce Template

> Reference direction: `https://asagiri-38matcha.aura.build/`
>
> This file defines the visual system, page architecture, motion language, responsive behavior, and implementation rules required to reproduce the reference template closely. It intentionally contains **no website copy, product names, prices, claims, or other page content**. Use only the placeholders defined in this document.

---

## 1. Design Objective

Build a premium, immersive, Japanese-inspired matcha commerce website with the following visual character:

- Dark, cinematic, quiet, and highly editorial.
- Minimal interface with generous negative space.
- Strong contrast between oversized typography and restrained utility text.
- Product and ritual photography treated as the main visual material.
- Subtle atmospheric motion rather than decorative animation.
- A blend of modern international typography and traditional Japanese visual restraint.
- Commerce interactions integrated into the editorial layout without making the page feel like a generic online store.

The final website must feel calm, tactile, handcrafted, and expensive.

---

## 2. Non-Negotiable Rules

1. Do not introduce bright white page backgrounds.
2. Do not use colorful gradients.
3. Do not use glassmorphism cards.
4. Do not use large rounded SaaS-style containers.
5. Do not use generic stock e-commerce layouts.
6. Do not place every section inside a boxed card.
7. Do not use heavy drop shadows.
8. Do not add copied text from the reference website.
9. Do not add invented product descriptions or marketing content.
10. Use only semantic placeholders until real content is supplied.
11. Keep animation slow, organic, and understated.
12. Preserve large whitespace on desktop and deliberate cropping on mobile.
13. Use photography with dark, earthy, natural lighting.
14. Product purchase controls must remain minimal and integrated with typography.
15. The page must remain visually strong with JavaScript disabled, except for enhancement-only motion.

---

## 3. Content Placeholder Contract

Use these placeholders only. Do not replace them with sample copy.

```text
[BRAND]
[BRAND MARK]
[JAPANESE BRAND MARK]
[NAV ITEM]
[PRIMARY CTA]
[SECONDARY CTA]
[EYEBROW]
[HERO TITLE]
[HERO DESCRIPTION]
[SECTION TITLE]
[SECTION DESCRIPTION]
[IMAGE]
[VIDEO]
[PRODUCT NAME]
[PRODUCT TYPE]
[PRODUCT DESCRIPTION]
[PRODUCT PRICE]
[PRODUCT SIZE]
[PRODUCT IMAGE]
[PROCESS NUMBER]
[PROCESS TITLE]
[PROCESS DESCRIPTION]
[STAT VALUE]
[STAT LABEL]
[FOOTER LINK]
[COPYRIGHT]
[LOCATION]
```

Never add lorem ipsum. Empty states should preserve layout using the placeholders above.

---

## 4. Visual DNA

### 4.1 Overall Mood

- Near-black canvas.
- Warm off-white typography, never pure white.
- Matcha green used sparingly as a functional accent.
- Soft film grain and natural photographic texture.
- Extremely subtle borders and separators.
- Full-bleed media with controlled dark overlays.
- Sharp, architectural alignment.
- Sparse interface chrome.
- Editorial pacing: large visual moments followed by quiet information blocks.

### 4.2 Shape Language

- Section containers: square edges.
- Product media: square or near-square edges; maximum radius `2px`.
- Buttons: either text-only or compact capsule controls.
- Utility chips: thin outline, fully rounded.
- Image masks: rectangular, portrait, landscape, or asymmetric editorial crops.
- Avoid soft card stacks and oversized `24px+` radii.

### 4.3 Texture

Use one or more of the following at very low opacity:

- Fine monochrome film grain.
- Soft radial light falloff.
- Steam or mist particles.
- Gentle image bloom.
- Slight vignette at viewport edges.

Texture must never reduce text readability.

---

## 5. Design Tokens

Use CSS custom properties so the appearance can be tuned from a single source.

```css
:root {
  /* Core surfaces */
  --color-bg: #090b08;
  --color-bg-elevated: #10130f;
  --color-bg-soft: #151914;
  --color-bg-deep: #050604;

  /* Text */
  --color-text: #efede3;
  --color-text-soft: #d8d5ca;
  --color-text-muted: #9b9d93;
  --color-text-faint: #6e7169;

  /* Accent */
  --color-matcha: #91a84f;
  --color-matcha-soft: #aab96f;
  --color-matcha-deep: #607233;

  /* Lines and overlays */
  --color-line: rgba(239, 237, 227, 0.16);
  --color-line-strong: rgba(239, 237, 227, 0.30);
  --color-overlay-soft: rgba(5, 6, 4, 0.28);
  --color-overlay: rgba(5, 6, 4, 0.50);
  --color-overlay-heavy: rgba(5, 6, 4, 0.72);

  /* Typography */
  --font-display: "Helvetica Neue", "Noto Sans JP", Arial, sans-serif;
  --font-body: "Helvetica Neue", "Noto Sans JP", Arial, sans-serif;
  --font-japanese: "Noto Serif JP", "Yu Mincho", serif;

  /* Type scale */
  --text-2xs: 0.625rem;
  --text-xs: 0.6875rem;
  --text-sm: 0.8125rem;
  --text-base: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.375rem;
  --text-xl: 1.75rem;
  --text-2xl: clamp(2.5rem, 5vw, 5.25rem);
  --text-display: clamp(4rem, 10.8vw, 10rem);
  --text-display-xl: clamp(5rem, 13vw, 12rem);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4.5rem;
  --space-9: 6rem;
  --space-10: 8rem;
  --space-11: 10rem;
  --space-12: 12rem;

  /* Layout */
  --page-max: 100rem;
  --page-gutter: clamp(1.25rem, 3vw, 3.5rem);
  --header-height: 5.25rem;

  /* Radius */
  --radius-media: 0.125rem;
  --radius-control: 999px;

  /* Timing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 180ms;
  --duration-base: 420ms;
  --duration-slow: 900ms;
  --duration-scene: 1400ms;
}
```

### 5.1 Color Usage Ratio

- 75–85% near-black surfaces.
- 10–18% warm off-white typography and highlights.
- 3–7% matcha green accents.
- Never use green as a large page background unless it is a photographic surface.

### 5.2 Contrast Rules

- Main headings: warm off-white on near-black.
- Body copy: muted warm grey.
- Secondary metadata: faint grey.
- Accent green: small labels, progress indicators, interactive state, selected navigation state.
- Avoid pure `#000000` and `#ffffff` except inside media assets when unavoidable.

---

## 6. Typography System

### 6.1 Display Typography

Use a refined neutral grotesk or neo-grotesk with:

- Weight: `300–500`.
- Tight letter spacing: `-0.045em` to `-0.02em`.
- Line height: `0.84–0.96`.
- Large size with intentional line breaks.
- Sentence case rather than all caps.
- No thick bold display headings.

```css
.display-title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.045em;
}
```

### 6.2 Section Titles

- Size: `clamp(2.75rem, 7vw, 7rem)`.
- Weight: `400`.
- Line height: `0.9`.
- Maximum width: `10–14ch` depending on composition.

### 6.3 Body Typography

- Desktop body size: `16–19px`.
- Mobile body size: `15–17px`.
- Line height: `1.5–1.65`.
- Maximum paragraph width: `34–42ch`.
- Use no more than two paragraph widths per section.

### 6.4 Utility Labels

- Size: `10–12px`.
- Uppercase.
- Letter spacing: `0.14em–0.22em`.
- Weight: `500`.
- Use for navigation, product metadata, counters, and section indexes.

```css
.utility-label {
  font-size: var(--text-xs);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

### 6.5 Japanese Typography

- Use vertical Japanese text only as an accent.
- Keep it to one short phrase or label per major scene.
- Use `writing-mode: vertical-rl`.
- Use a Mincho-style Japanese face.
- Keep opacity between `0.55` and `0.85`.
- Never use Japanese characters as meaningless decoration.

```css
.jp-vertical {
  font-family: var(--font-japanese);
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 0.18em;
}
```

---

## 7. Layout Grid

### 7.1 Desktop

- Maximum content width: `1600px`.
- Outer gutter: `48–56px` on large displays.
- Grid: 12 columns.
- Column gap: `20–28px`.
- Major sections: minimum vertical padding `128px`.
- Immersive sections: `100svh–130svh` depending on animation.

### 7.2 Tablet

- Grid: 6 columns.
- Gutter: `28–36px`.
- Major section padding: `96px`.
- Avoid forcing desktop split layouts below `1024px`.

### 7.3 Mobile

- Grid: 4 columns.
- Gutter: `20px`.
- Major section padding: `72–88px`.
- Full-width media may bleed to viewport edges.
- Keep core text aligned to page gutter.

### 7.4 Alignment Rhythm

Use three main alignment anchors throughout the page:

1. Left page gutter.
2. Center grid axis.
3. Right page gutter.

Large headings may cross columns but should remain anchored to one of these axes. Do not randomly center every section.

---

## 8. Global Page Structure

Use the following page sequence. Content is deliberately omitted.

```text
01. Preloader
02. Global Header
03. Immersive Hero
04. Editorial Introduction / Origin
05. Product Collection
06. Craft / Process Story
07. Ritual / Education Feature
08. Closing Immersive CTA
09. Minimal Footer
```

Each section should feel visually distinct while sharing the same type, spacing, and line system.

---

## 9. Preloader

### 9.1 Composition

- Full-screen fixed layer.
- Near-black background.
- Centered brand lockup.
- Small Japanese brand mark below or adjacent.
- Thin progress line or percentage indicator.
- Small loading status label.
- No spinner icon.

### 9.2 Animation

1. Brand fades in over `500–700ms`.
2. Progress moves steadily rather than jumping.
3. Background remains still.
4. At completion, the brand shifts slightly upward and fades.
5. Loader reveals the hero using a vertical mask or opacity transition.
6. Total perceived duration should be short and purposeful.

### 9.3 Accessibility

- Skip or drastically shorten loader for repeat visits.
- Disable elaborate loader motion under `prefers-reduced-motion`.
- Never delay access to the page solely for animation.

---

## 10. Global Header

### 10.1 Desktop Layout

- Fixed or absolute over the hero at page load.
- Height: approximately `76–88px`.
- Left: compact brand lockup.
- Right: horizontal navigation and one compact CTA.
- Navigation spacing: `28–40px`.
- Transparent over hero.
- After scroll, transition to a dark translucent or solid surface with a thin bottom border.

### 10.2 Header Typography

- Brand: medium weight, compact tracking.
- Navigation: uppercase utility labels.
- CTA: outlined capsule or text-plus-arrow control.

### 10.3 Mobile Header

- Brand on left.
- Minimal menu trigger on right.
- Do not use a boxed hamburger button.
- Full-screen or nearly full-screen dark menu overlay.
- Menu links should become large editorial typography.
- Include thin separators and small utility metadata.

### 10.4 Scroll Behavior

- Hide slightly during downward scroll.
- Reappear during upward scroll.
- Transition duration: `350–500ms`.
- Do not use a bouncing or springy motion.

---

## 11. Hero Section

### 11.1 Size and Media

- Minimum height: `100svh`.
- Full-bleed photograph or cinematic video.
- Use a close, tactile subject: powder, bowl, whisk, steam, leaf, hand, or product vessel.
- Media must cover the viewport.
- Use a dark overlay strong enough to protect text.
- Position focal point away from the main title.

### 11.2 Composition

- Hero title occupies approximately `55–80%` of viewport width on desktop.
- Place main title in the lower-left or lower-middle region.
- Place eyebrow and supporting paragraph in a separate narrow column.
- Add one short vertical Japanese label near a viewport edge.
- Add a restrained scroll indicator near the bottom.
- Keep CTA secondary to the title.

### 11.3 Hero Layer Stack

```text
Layer 1: Background media
Layer 2: Soft vignette / dark gradient
Layer 3: Steam or mist canvas
Layer 4: Grain texture
Layer 5: Header
Layer 6: Hero typography and controls
```

### 11.4 Steam Canvas

Implement a lightweight particle canvas:

- Very low particle count.
- Soft circular particles or thin blurred wisps.
- Slow upward drift.
- Slight horizontal noise.
- Opacity range: `0.02–0.14`.
- Blur: `6–20px`.
- Particles should disappear before reaching the top third.
- Canvas uses `pointer-events: none`.
- Pause when tab is hidden.
- Disable or simplify on low-power devices.

### 11.5 Hero Motion

- Background media: slow scale from `1.04` to `1.00`.
- Main title: line-by-line mask reveal.
- Supporting text: delayed fade and `translateY(12px)`.
- Scroll indicator: subtle continuous vertical movement.
- No rapid stagger or bouncy easing.

---

## 12. Editorial Introduction / Origin Section

### 12.1 Purpose

Create a quiet transition from the cinematic hero into the product story.

### 12.2 Layout

Use an asymmetrical two-part composition:

- One oversized heading spanning `6–9` columns.
- One narrow body column spanning `3–4` columns.
- A large landscape or portrait image offset below the heading.
- Small indexed label at the section edge.
- Optional statistic pair beneath or beside the image.

### 12.3 Visual Treatment

- Background remains near-black.
- Use a thin horizontal separator.
- Headline may extend beyond the standard text column.
- Image should have a natural, documentary feeling.
- Do not surround text with a card.

### 12.4 Scroll Behavior

- Headline reveals by line or word mask.
- Image enters with slow upward movement.
- Statistics count only once and only when visible.
- Movement should remain under `40px` total travel.

---

## 13. Product Collection

### 13.1 Section Header

- Left: section index or eyebrow.
- Center/left: oversized title.
- Right or below: concise description placeholder.
- Add a thin rule separating header from product grid.

### 13.2 Desktop Grid

Preferred composition:

- Three product cards across.
- The first or center card may be visually dominant.
- Mix portrait and square image ratios if assets support it.
- Preserve clear baseline alignment for product metadata.
- Grid gap: `20–32px`.

Alternative editorial composition:

- One featured product occupying `7–8` columns.
- Two secondary products stacked or aligned within remaining columns.

### 13.3 Product Card Anatomy

```text
[PRODUCT IMAGE]
[PRODUCT TYPE]
[PRODUCT NAME]
[PRODUCT DESCRIPTION]
[PRODUCT PRICE]        [ADD CONTROL] · [PRODUCT SIZE]
```

### 13.4 Product Card Styling

- No elevated container background.
- Media sits directly on the page surface.
- Information begins `18–24px` below media.
- Product name: `24–34px`, regular weight.
- Product type: uppercase utility label.
- Description: muted, maximum `30–36ch`.
- Price and add control share the bottom row.
- Use a thin top rule above the purchase row when needed.

### 13.5 Add Control

- Compact text control or outlined capsule.
- Arrow, plus, or dot separator may be used.
- Hover state changes line and text toward matcha green.
- Avoid oversized primary-color buttons.

### 13.6 Product Image Hover

- Image scales to `1.025–1.04`.
- Optional alternate image crossfade.
- Product name shifts by no more than `2–4px`.
- Duration: `600–900ms`.
- Easing: `var(--ease-out)`.

### 13.7 Mobile Product Layout

- One product per row.
- Allow horizontal swipe only when the section intentionally behaves as a collection rail.
- Preserve large image presence.
- Keep price and add action visible without accordion interaction.

---

## 14. Craft / Process Story

### 14.1 Layout Direction

Use an editorial process sequence rather than icon cards.

Recommended desktop pattern:

- Large sticky visual occupying `6–7` columns.
- Process steps in a vertical list occupying `5–6` columns.
- Each step contains a small number, title, and short description.
- Thin separators between steps.

Alternative pattern:

- Full-width numbered rows.
- Oversized process number on left.
- Title in center.
- Description and optional image on right.

### 14.2 Process Row Styling

- Number: utility label or large outlined numeral.
- Title: `clamp(2rem, 4vw, 4.5rem)`.
- Description: muted narrow column.
- Row padding: `40–72px`.
- Border: `1px solid var(--color-line)`.

### 14.3 Interaction

- Hovering or entering a step updates the sticky visual.
- Crossfade duration: `500–800ms`.
- Avoid accordion indicators unless mobile requires collapse.
- Active step may use matcha accent for the number or line only.

---

## 15. Ritual / Education Feature

### 15.1 Purpose

Create a slower instructional section that still feels premium and cinematic.

### 15.2 Layout

- Full-width visual or video background.
- Dark gradient overlay.
- Large title positioned over media.
- Small sequence of instructions or ritual steps aligned to one side.
- Optional sticky media while steps scroll.

### 15.3 Step Treatment

- Use numbers rather than illustrative icons.
- Keep each step concise.
- Use generous vertical spacing.
- Active step receives an accent line or increased text opacity.
- Inactive steps remain visible but muted.

### 15.4 Media Behavior

- Video must be muted, looped, and plays inline.
- Poster image must match the final video frame style.
- Use slow cuts and macro details.
- Never autoplay with sound.

---

## 16. Closing Immersive CTA

### 16.1 Composition

- Full viewport or near-full viewport section.
- Dramatic image or video.
- Short oversized title placeholder.
- One compact CTA.
- Minimal secondary information.
- Strong bottom gradient into footer.

### 16.2 Motion

- Background moves slightly slower than foreground.
- Title reveals once.
- CTA remains stable and usable.
- Avoid continuous text animation.

---

## 17. Footer

### 17.1 Structure

Use a sparse footer with:

- Brand lockup.
- One or two concise link groups.
- Location placeholder.
- Privacy/legal links.
- Copyright placeholder.
- Optional short Japanese mark.

### 17.2 Desktop Layout

- Top row: oversized brand wordmark or closing brand line.
- Middle row: navigation links aligned to a grid.
- Bottom row: copyright, location, and legal links.
- Use thin top borders rather than boxes.

### 17.3 Mobile Layout

- Stack links vertically.
- Keep large brand text but prevent horizontal overflow.
- Legal metadata can wrap into two lines.
- Minimum touch target: `44px`.

---

## 18. Buttons and Links

### 18.1 Primary CTA

- Compact capsule.
- Transparent or dark fill.
- Thin warm-white border.
- Small uppercase label.
- Optional arrow at right.
- Height: `42–48px`.
- Horizontal padding: `18–24px`.

### 18.2 Text Link

- Text plus directional arrow or understated underline.
- Underline animates from left to right.
- Hover color moves subtly toward matcha green.

### 18.3 Interaction States

```text
Default: warm off-white text, subtle line
Hover: matcha-tinted text or border
Focus: visible 2px focus ring with offset
Active: slight opacity reduction, no scale bounce
Disabled: 40% opacity, no pointer events
```

---

## 19. Image Direction

### 19.1 Subject Matter

Use imagery focused on:

- Macro texture.
- Natural ingredients.
- Hands and tools.
- Ceramic vessels.
- Powder and liquid movement.
- Agricultural origin.
- Quiet preparation rituals.
- Product packaging in controlled studio light.

### 19.2 Lighting

- Low-key directional light.
- Deep shadows with retained detail.
- Soft highlights.
- Slight warm or green cast.
- Avoid bright commercial food photography.

### 19.3 Composition

- Tight crops.
- Significant negative space.
- Off-center subjects.
- Visible texture.
- Focal point positioned to protect text overlay.

### 19.4 Treatment

```css
.media-treatment {
  filter: saturate(0.82) contrast(1.04) brightness(0.88);
}
```

Adjust per asset. Do not force one filter when it damages natural skin, ceramic, or foliage tones.

---

## 20. Motion System

### 20.1 Principles

- Motion communicates atmosphere and hierarchy.
- Use fewer, longer animations.
- Reveal elements only once unless interaction requires repetition.
- Avoid playful springs.
- Avoid large rotations.
- Avoid scroll-jacking.

### 20.2 Entrance Animation

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 900ms var(--ease-out),
    transform 900ms var(--ease-out);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 20.3 Heading Mask Reveal

- Wrap each line in `overflow: hidden`.
- Animate child line from `translateY(105%)` to `0`.
- Stagger: `80–140ms`.
- Duration: `900–1200ms`.

### 20.4 Parallax

- Maximum media travel: `4–8%` of element height.
- Disable on mobile if it causes cropping or performance issues.
- Never apply conflicting parallax to text and image simultaneously.

### 20.5 Cursor Enhancement

Optional desktop-only custom cursor:

- Small dot by default.
- Expands subtly over links or media.
- Must not hide the operating-system cursor unless fully accessible.
- Disable on touch devices.

### 20.6 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .steam-canvas,
  .decorative-particles {
    display: none;
  }
}
```

---

## 21. Responsive Behavior

### 21.1 Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* small tablet */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* laptop */ }
@media (min-width: 1280px) { /* desktop */ }
@media (min-width: 1536px) { /* wide desktop */ }
```

### 21.2 Mobile Transformations

- Hero title reduces but remains dominant.
- Move supporting copy below title rather than squeezing beside it.
- Hide nonessential decorative labels when they collide.
- Convert multi-column product grid to one column.
- Convert sticky process layout to sequential media-and-text blocks.
- Keep header controls minimal.
- Preserve full-bleed media.
- Avoid text smaller than `15px` for readable body content.
- Do not reduce vertical spacing below `64px` between major sections.

### 21.3 Mobile Hero

- Height: `100svh`.
- Title width: `90–100%` of content area.
- Use a portrait crop or separate mobile asset.
- Keep CTA above browser safe-area inset.
- Keep scroll cue clear of home indicator.

### 21.4 Tablet

- Use two-column layouts selectively.
- Product collection may use two columns.
- Disable complex sticky interactions when viewport height is too short.

---

## 22. Accessibility

- Minimum text contrast: WCAG AA.
- Every interactive element must have a visible focus state.
- Do not communicate selected state through color alone.
- Provide meaningful alternative text for all content images.
- Decorative canvas and grain layers must be ignored by screen readers.
- Navigation must be keyboard-operable.
- Mobile menu must trap focus while open.
- Escape key closes overlays.
- Preserve semantic heading order.
- Product add controls must expose product name in their accessible label.
- Videos require a pause control when motion is significant.
- Respect reduced motion and reduced transparency preferences.

---

## 23. Performance Rules

- Hero image: AVIF or WebP with responsive `srcset`.
- Above-the-fold media must be preloaded deliberately.
- Lazy-load all noncritical images.
- Use canvas particles rather than large video overlays when possible.
- Keep particle count adaptive to device pixel ratio and viewport size.
- Cap effective canvas DPR at `1.5–2`.
- Use CSS transforms and opacity for animation.
- Avoid animating layout properties.
- Keep total font families to two, plus Japanese fallback.
- Subset web fonts when licensing permits.
- Use a static poster fallback for video.
- Prevent cumulative layout shift by declaring media aspect ratios.

---

## 24. Suggested Component Architecture

```text
app/
  page
  layout

components/
  Preloader
  SiteHeader
  MobileMenu
  HeroScene
  SteamCanvas
  VerticalJapaneseLabel
  SectionIndex
  EditorialIntro
  MediaFrame
  StatisticPair
  ProductCollection
  ProductCard
  AddControl
  ProcessStory
  ProcessStep
  RitualFeature
  ClosingCTA
  SiteFooter
  RevealText
  RevealMedia

styles/
  tokens
  typography
  layout
  motion
  utilities
```

### 24.1 Component Principles

- Components receive content through props or CMS data.
- Visual components must not contain hard-coded marketing copy.
- Motion wrappers must degrade gracefully.
- Media components must support desktop and mobile crops.
- Product cards must support missing description without collapsing alignment.
- Every section should expose an optional `index`, `eyebrow`, and `theme` prop.

---

## 25. Recommended HTML Skeleton

```html
<body>
  <div data-preloader></div>

  <header data-site-header></header>

  <main>
    <section data-section="hero"></section>
    <section data-section="origin"></section>
    <section data-section="products"></section>
    <section data-section="process"></section>
    <section data-section="ritual"></section>
    <section data-section="closing-cta"></section>
  </main>

  <footer data-site-footer></footer>
</body>
```

---

## 26. Section Spacing Blueprint

```text
Hero
  height: 100svh

Origin introduction
  padding-top: 160px desktop / 88px mobile
  padding-bottom: 180px desktop / 96px mobile

Product collection
  padding-top: 128px desktop / 80px mobile
  padding-bottom: 180px desktop / 104px mobile

Process story
  padding-top: 160px desktop / 88px mobile
  padding-bottom: 160px desktop / 96px mobile

Ritual feature
  min-height: 100svh

Closing CTA
  min-height: 85svh

Footer
  padding-top: 96px desktop / 72px mobile
  padding-bottom: 32px
```

These values may be adjusted only to preserve the same spacious editorial rhythm.

---

## 27. Layering and Z-Index

```css
:root {
  --z-base: 0;
  --z-media: 1;
  --z-overlay: 2;
  --z-content: 3;
  --z-header: 40;
  --z-menu: 60;
  --z-loader: 100;
}
```

Do not create arbitrary z-index values outside this scale.

---

## 28. Borders, Rules, and Dividers

- Use `1px` rules only.
- Default divider opacity: `16%`.
- Strong divider opacity: `30%`.
- Dividers should run along the grid, not inside padded cards.
- Product and process sections may use full-width horizontal rules.
- Avoid decorative borders around large images.

---

## 29. States and Edge Cases

### 29.1 Missing Image

- Preserve aspect ratio.
- Use `var(--color-bg-soft)` as placeholder surface.
- Do not add an icon unless required by the product.

### 29.2 Long Product Name

- Allow maximum two lines.
- Preserve bottom metadata alignment.
- Do not reduce below `22px` desktop or `20px` mobile.

### 29.3 Sold-Out Product

- Replace add action with a muted status label.
- Reduce image saturation slightly.
- Keep card visible.

### 29.4 Loading Commerce Action

- Keep control width stable.
- Replace label with subtle progress state.
- Do not use a large spinner.

### 29.5 Error State

- Use concise inline text.
- Use warm off-white or muted clay tone rather than bright red, unless safety requires red.
- Preserve page layout.

---

## 30. Visual QA Checklist

### Global

- [ ] Page is predominantly near-black, not grey or navy.
- [ ] Text is warm off-white rather than pure white.
- [ ] Matcha green appears only as a controlled accent.
- [ ] Major headings use tight tracking and low line height.
- [ ] No generic rounded card UI has been introduced.
- [ ] Borders are thin and low contrast.
- [ ] Images feel cinematic and tactile.
- [ ] Every section has generous breathing room.

### Header

- [ ] Header overlays the hero cleanly.
- [ ] Scrolled state remains dark and unobtrusive.
- [ ] Mobile menu feels editorial, not app-like.

### Hero

- [ ] Hero occupies the full initial viewport.
- [ ] Title dominates without blocking the focal subject.
- [ ] Steam or atmospheric motion is subtle.
- [ ] CTA is secondary to the visual story.
- [ ] Mobile crop has been manually checked.

### Product Collection

- [ ] Product cards sit directly on the page surface.
- [ ] Purchase action is compact.
- [ ] Image ratios and metadata align consistently.
- [ ] Hover motion is slow and restrained.

### Process and Ritual

- [ ] Steps use typography and numbers, not icon cards.
- [ ] Sticky behavior has a functional mobile fallback.
- [ ] Active states use minimal accenting.

### Footer

- [ ] Footer remains spacious and minimal.
- [ ] Legal and location information are present as placeholders only.
- [ ] No extra newsletter or social modules are added unless required.

### Accessibility and Performance

- [ ] Keyboard focus is visible.
- [ ] Reduced-motion mode has been tested.
- [ ] Canvas does not intercept interaction.
- [ ] Images have fixed aspect ratios.
- [ ] Hero asset is optimized and responsive.
- [ ] No layout shift is visible during font or image loading.

---

## 31. Final Fidelity Rule

When an implementation choice is uncertain, prioritize the following in order:

1. Dark cinematic atmosphere.
2. Oversized editorial typography.
3. Generous negative space.
4. Tactile full-bleed imagery.
5. Restrained Japanese visual references.
6. Minimal commerce controls.
7. Slow organic motion.
8. Clear responsive hierarchy.

Do not fill empty space with extra content. The restraint is part of the design.

