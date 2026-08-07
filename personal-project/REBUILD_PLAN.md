# Second Brain Visual — Rebuild Plan & Phase Handover Prompts

## Context

The current `second_brain_visual.html` is a scroll-driven Three.js + GSAP narrative essay. It uses 30 `position:fixed` `.story-chunk` overlays positioned per-frame via 3D anchor projection into 2D viewport coordinates.

After 12+ targeted fixes (Vector3 hoisting, height caching, will-change, ScrollTrigger range tightening, viewport clamping, backdrop-filter active-only, lit-card margin removal, Set conversion), real-browser screenshots still show:

- Hero "Building a Second Brain" + next-beat "What is PKM?" rendering simultaneously
- Cards inside the same beat collide on the same anchor area
- Adjacent-beat chunks both at full opacity at boundary scroll positions
- 3D brain occluded by overlay text panels

**Conclusion:** The architecture is wrong, not just buggy. Further patching cannot fix the structural problems below.

## Why the current architecture fails

| Symptom | Architectural cause |
|---|---|
| Multi-active overlap at beat boundaries | Per-chunk ScrollTrigger spacers with 90-110vh height. Trigger range of 20vh window means ~20vh overlap between adjacent chunks. Even with "exclusive" `onToggle` logic, the GSAP scrub leaves stale `.active` classes. |
| Per-frame style writes fight CSS transitions | JS writes `style.left/top/transform` every rAF. CSS `transition: opacity, filter` on `.story-chunk` cannot reconcile against rapid inline-style mutations. |
| Same-beat cards collide visually | Multiple `story-chunk` elements in one beat share the same 3D anchor region. No collision avoidance logic. |
| `display:contents` on `.beat` breaks `::before` | The beat container has no layout box, so its `::before` pseudo cannot render either. This kills the per-beat radial vignette and gradient backgrounds — readability is propped up by a global `text-shadow` hack on every text class. |
| Per-frame 3D projection thrashes layout | Even with cached heights/widths, projecting 14 anchors + writing 14 element transforms per frame forces compositor work each frame. |

---

## Rebuild architecture

### Layout primitive change: sticky panels, not fixed overlays

```
<body>
  <canvas#brain>  position: fixed, inset: 0, z-index: 0  (persistent 3D backdrop)

  <main.story>
    <section.beat>  position: sticky, top: 0, height: 100vh
      Internal CSS grid layout
      Text + cards in normal flow within the panel
    </section>
    ... (×9 beats)
    <section.scroll-runway>  height: 800vh  (provides scroll distance for animations)
  </main>
</body>
```

Drop `position: fixed` `.story-chunk` overlays. Drop per-frame JS positioning of text. Text positioned by CSS only.

### Single source of truth

One global scroll progress `0 → 1` mapped to:
- Active beat index (0 → 8)
- Intra-beat fraction (0 → 1)
- Camera state (already implemented via `CAM_KEY` + `getCameraTarget`)
- Brain alpha + cluster highlights (already implemented via `BRAIN_ALPHA`, `HL_MAP`)

Set `data-active-beat` on `<body>`. CSS attribute selectors gate text visibility. Mutually exclusive by construction.

### What to keep from v1

- Three.js brain geometry + custom shader (works well)
- `CAM_KEY` array + `getCameraTarget()` interpolation
- `STATE_MAP` morph data
- Color palette + typography tokens (CSS custom props at `:root`)
- Pipeline step inner animations (Zotero PDF slide, terminal lines, atom scatter, etc.) — already self-contained per step

### What to throw away

- `floatingIndices` + `ANCHOR_MAP` text projection
- 30 `position:fixed` `.story-chunk` overlays
- Per-frame `style.left/top/transform` writes for text
- `display: contents` on `.beat`
- ScrollTrigger-per-chunk spacers
- Global text-shadow hack on every text class
- `.chunk-offset-*` margin overrides
- `.text-col` wrapper

---

## Phase prompts (sequential handover)

Each phase below is a self-contained prompt suitable for handing to a fresh agent. Run sequentially — each phase depends on the previous.

---

### Phase 1 — Skeleton: sticky beats + scroll-driven active beat

**Goal:** Working scroll narrative where exactly one beat panel is visible at any scroll position, with smooth cross-fades between adjacent beats. No 3D brain yet, no text content yet — just colored panels to verify the scroll model.

**Prompt:**

> Create `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/second_brain_visual_v2.html`. Single-file HTML with embedded CSS + JS. Include GSAP + ScrollTrigger CDN.
>
> **Structure:**
> - `<body data-active-beat="0">` (attribute updated by JS)
> - `<main class="story">` containing 9 `<section class="beat" id="beat-N" data-beat="N">` panels (N = 0-8)
> - Each beat: `position: sticky; top: 0; height: 100vh; width: 100vw; display: grid; place-items: center;` with a placeholder `<h2>Beat N</h2>`
> - After the main, `<div class="scroll-runway" style="height: 900vh;"></div>` to provide scroll distance
>
> **Visibility logic:**
> - All beats default `opacity: 0; transition: opacity 400ms ease`
> - Active beat: `body[data-active-beat="N"] #beat-N { opacity: 1 }`
> - One single `ScrollTrigger.create({ trigger: ".scroll-runway", start: "top top", end: "bottom bottom", scrub: 0.3, onUpdate: (self) => { const beatIdx = Math.min(8, Math.floor(self.progress * 9)); document.body.dataset.activeBeat = beatIdx; } })`
>
> **Verify:**
> - Scroll from top to bottom. Each beat appears in turn, mutually exclusive.
> - Use `preview_eval` to count `document.querySelectorAll('.beat[style*="opacity: 1"]').length` at various scroll positions — should be 1 (or 0 during transition).
> - No console errors.
>
> **Out of scope:** 3D brain, real text content, per-beat layout variants. Pure scroll-model proof.

---

### Phase 2 — Brain canvas backdrop integration

**Goal:** Three.js brain canvas behind all beat panels, with camera + alpha + cluster highlights driven by the same scroll progress. Brain visible behind every beat at all times.

**Prompt:**

> Edit `second_brain_visual_v2.html` from Phase 1. Add the Three.js brain visualization as a fixed backdrop.
>
> **Copy from v1 (`second_brain_visual.html`):**
> - `<canvas id="brain">` element placed BEFORE `<main class="story">`, styled `position: fixed; inset: 0; z-index: 0; pointer-events: none`
> - Three.js scene init (renderer, scene, camera, geometry, shader material)
> - `K_BRAIN` array (point positions)
> - `STATE_MAP`, `CAM_KEY`, `BRAIN_ALPHA`, `LINE_ALPHA`, `HL_MAP` arrays
> - `getCameraTarget()` function
> - Custom vertex + fragment shaders (`VERT`, `FRAG`)
> - The `tick()` render loop
>
> **Adapt the render loop:**
> - Replace the 30-chunk `scrollT` mapping with the SAME progress variable used by the Phase 1 ScrollTrigger
> - Hoist scroll progress into a top-level `let scrollProgress = 0;` variable; Phase 1 ScrollTrigger writes to it; tick loop reads it
> - Re-map progress 0→1 to STATE_MAP / CAM_KEY indices proportionally (e.g. `const sIdx = scrollProgress * (STATE_MAP.length - 1)`)
> - Keep all camera + alpha + cluster interpolation logic
> - REMOVE all per-chunk text-positioning code, the `chunkEls` query, the `chunkScales`/`chunkHeights`/`chunkWidths` arrays, `ANCHOR_MAP`, `floatingIndices`/`floatingSet`, `tempV` projection block
>
> **Beat panels become semi-transparent overlays:**
> - Each beat: `background: linear-gradient(180deg, rgba(5,6,14,0) 0%, rgba(5,6,14,0.55) 20%, rgba(5,6,14,0.55) 80%, rgba(5,6,14,0) 100%)`
> - Brain visible top/bottom, text readable in middle band
> - `body { background: #05060e }` so brain canvas pixels render on dark base
>
> **Verify:**
> - Brain rotates ambiently on load
> - Scroll → brain morphs continuously (camera kicks back, alpha pulses, colors shift)
> - Beat panels cross-fade in front of brain
> - 60fps in DevTools performance recording (no per-frame layout work on beats)
> - Console clean

---

### Phase 3 — Per-beat CSS layouts (no JS positioning)

**Goal:** Each beat has its proper layout variant (hero, left, right, center-stage, thesis, pipeline-full-width) implemented as pure CSS Grid/Flex. Real text content copied from v1. No JS positioning of text.

**Prompt:**

> Edit `second_brain_visual_v2.html` from Phase 2. Replace placeholder beat content with real essay text + structured layouts.
>
> **Beat layout taxonomy (from v1 content):**
>
> | Beat | Layout | CSS Grid |
> |---|---|---|
> | 0 Hero | Centered title + sub + scroll hint | `grid-template-columns: 1fr; place-items: center; padding-top: 12vh` |
> | 1 PKM | Left text col + right card stack | `grid-template-columns: minmax(360px, 540px) minmax(280px, 420px); gap: 80px; padding: 96px 64px; align-items: start` |
> | 2 Second Brain | Right text col + left amber card + right quote | mirror of beat 1 |
> | 3 Hype | Left text col + right coral card + left narrow | beat 1 pattern |
> | 4 Meme | Centered editorial quote + cite + answer paragraph | `grid-template-columns: minmax(0, 760px); place-items: center; text-align: center` |
> | 5 What I'm Building | Centered lead + teal card | `grid-template-columns: minmax(0, 820px); place-items: center` |
> | 6 Pipeline | Full-width header + 7 vertical step rows | `grid-template-columns: 1fr; max-width: 1180px; margin: 0 auto`, steps as nested grid |
> | 7 Thesis | Centered hero quote + 3-card horizontal grid | `grid-template-columns: minmax(0, 920px); place-items: center; gap: 32px` then `.lit-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px }` |
> | 8 End | Centered footer label | hero pattern |
>
> **Inside each beat:**
> - All text in normal flow (no `position: fixed`)
> - Cards are `position: relative` with their own CSS styling
> - First-letter drop caps, pull quotes, blockquotes, lit-cards, pipeline steps — preserve all v1 typography rules
>
> **Background overlay per beat:**
> - Each `.beat` gets its own gradient overlay via `::before` (now works because beats are `position: sticky`, not `display: contents`)
> - Background pattern matches v1's intent: vertical fade + horizontal mask
>
> **Drop the global `text-shadow` hack.** Backgrounds + active-state opacity gating make heavy text-shadow unnecessary. Keep a SUBTLE `text-shadow: 0 1px 4px rgba(0,0,0,0.7)` on hero title only.
>
> **Verify:**
> - Each beat reads cleanly at its own scroll position
> - No card overlap within a beat
> - No JS errors
> - Test scroll → each layout snaps into place crisply
> - Test resize → CSS Grid reflows naturally

---

### Phase 4 — Pipeline section (beat 6) isolation

**Goal:** Beat 6's 7-step pipeline gets its own scroll sub-region with per-step intersection-observer triggers. Step inner animations (Zotero, lit-note, terminal, atoms, molecules, alloys, notion) preserved.

**Prompt:**

> Edit `second_brain_visual_v2.html`. Beat 6 needs special handling because it has 7 internal steps that each need their own scroll trigger + animation.
>
> **Architecture:**
> - Beat 6 becomes a TALL sticky panel: `position: sticky; top: 0; height: 800vh` (provides scroll distance for 7 steps + intro/outro)
> - Inside beat 6: a nested `position: sticky; top: 0; height: 100vh` viewport that holds the currently-active step
> - 7 step elements stacked, each absolutely positioned within the inner viewport, opacity-gated
> - Sub-progress within beat 6 selects active step
>
> **Per-step animations:**
> - Copy v1's pipeline runner code verbatim (`pipelineRunners['01']` through `'07'`)
> - Trigger each runner via `IntersectionObserver` watching the step's sub-region trigger (NOT GSAP ScrollTrigger — simpler and isolated)
> - When a step becomes "visible enough" (intersection ratio > 0.4), call its runner once
> - Step deactivation: remove the `pl-ran-NN` class so the runner can re-fire on re-entry
>
> **Verify:**
> - Scroll through beat 6 — each step animates in sequence
> - Scroll back up — step animations replay
> - No console errors during step transitions
> - Outer beat-switching scroll model from Phase 1 still works above/below beat 6

---

### Phase 5 — Cursor parallax (drift on whole container, not per-chunk)

**Goal:** Subtle cursor-driven parallax drift applied to the brain canvas + active beat panel as wholes. No per-element JS.

**Prompt:**

> Edit `second_brain_visual_v2.html`. Add cursor parallax.
>
> **Implementation:**
> - Track normalized cursor position: `cursorX = (e.clientX / innerWidth - 0.5) * 2; cursorY = ...`
> - In the existing `tick()` loop, smooth toward target:
>   ```js
>   hudX += (cursorX * -20 - hudX) * 0.08;
>   hudY += (cursorY * -14 - hudY) * 0.08;
>   ```
> - Apply once per frame to canvas + active beat:
>   ```js
>   canvas.style.transform = `translate3d(${hudX}px, ${hudY}px, 0)`;
>   const activeBeat = document.querySelector('.beat[data-beat="' + document.body.dataset.activeBeat + '"]');
>   if (activeBeat) activeBeat.style.transform = `translate3d(${hudX * 0.5}px, ${hudY * 0.5}px, 0)`;
>   ```
> - Text drifts less than brain (0.5× multiplier) so there's depth parallax
>
> **Edge cases:**
> - Disable parallax on touch devices: `if (matchMedia('(hover: hover)').matches)` guard
> - Disable on `prefers-reduced-motion`
> - Reset transforms on beat change so old active beat doesn't keep drift
>
> **Verify:**
> - Move cursor across viewport — brain drifts further, text panel drifts subtly
> - Switch beats — drift carries smoothly to new active panel
> - No layout jank

---

### Phase 6 — Reduced motion + mobile

**Goal:** Single-column mobile layout. Reduced-motion preference disables all non-essential animation.

**Prompt:**

> Edit `second_brain_visual_v2.html`. Add accessibility branches.
>
> **Mobile (`@media (max-width: 900px)`):**
> - All beat grids collapse to `grid-template-columns: 1fr; padding: 24px`
> - Brain canvas opacity drops to 0.35 (becomes background, not foreground)
> - Cards stack vertically, full-width within beat
> - Hero font sizes scale down
> - Pipeline step visuals shrink to fit
>
> **`@media (prefers-reduced-motion: reduce)`:**
> - `* { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important }`
> - Disable cursor parallax (skip the cursor listener registration)
> - Disable shader wave pulses (set `uTime` increment to 0 OR static value)
> - Beat changes become instant (no opacity transition)
> - Pipeline step animations skip — set final state immediately
>
> **`prefers-color-scheme: light`:**
> - Out of scope. Site is dark-only.
>
> **Verify:**
> - Resize browser to 375px — single column layout, no horizontal scroll, all 9 beats readable
> - Toggle OS reduced motion preference, reload — no animations, no parallax, instant transitions
> - Test on real mobile if possible (iOS Safari, Android Chrome) — touch scroll works, no overlap

---

### Phase 7 — Performance pass + final verification

**Goal:** Audit performance, fix any remaining jank, verify against full test matrix.

**Prompt:**

> Audit and finalize `second_brain_visual_v2.html`.
>
> **Performance checklist:**
> - DevTools Performance recording during scroll: identify any layout shifts, forced reflows, long tasks
> - Verify 0 per-frame DOM writes for text (only canvas + 2 transform writes for parallax)
> - Verify `will-change` is set ONLY on currently transitioning beat (add/remove on beat change)
> - `backdrop-filter: blur(12px)` only on active beat's cards (`body[data-active-beat="N"] #beat-N .card`)
> - Three.js renderer set to `{ powerPreference: 'high-performance', antialias: true }` but check if low-power devices need fallback
>
> **Memory checklist:**
> - Hoist all `THREE.Vector3` / `THREE.Color` instances outside render loop
> - No closure-captured arrays growing across frames
> - Confirm `requestAnimationFrame` cancellation on page hide (use Page Visibility API)
>
> **Test matrix (all must pass):**
> - Scroll: mouse wheel, trackpad, keyboard arrows, JS `scrollTo({behavior: 'instant'})`, JS `scrollTo({behavior: 'smooth'})`
> - Multi-active count: `document.querySelectorAll('.beat').forEach(b => getComputedStyle(b).opacity)` — exactly one beat at opacity 1.0, others at 0 (or transitioning)
> - Resize: 1920×1080 → 375×667 mid-scroll, no errors, no layout break
> - Tab switching: blur 30s, refocus — scene resumes correctly
> - Reduced motion toggle mid-session: respects new preference on next scroll event
> - DevTools CPU 6× throttle: still hits 30fps minimum, no UI freeze
> - 5-minute scroll session: no memory growth in DevTools Memory tab
>
> **Visual QA:**
> - Take screenshots of all 9 beats at their peak-active scroll positions
> - Compare against v1 design intent (typography hierarchy, color palette, card styling)
> - No text clipping at any standard viewport size (1280, 1440, 1920)
>
> **Deliverables:**
> - `second_brain_visual_v2.html` final version
> - Brief CHANGELOG.md noting differences from v1 architecture
> - Replace `second_brain_visual.html` only after explicit user approval (keep v1 as backup)

---

## Effort estimate

| Phase | Scope | Est. session |
|---|---|---|
| 1 Skeleton | Sticky beats + scroll model | 0.5 |
| 2 Brain integration | Canvas + shader hookup | 0.5 |
| 3 Per-beat layouts | All 9 beats, real content | 1.5 |
| 4 Pipeline isolation | Nested scroll + step runners | 1.0 |
| 5 Cursor parallax | Container-level drift | 0.25 |
| 6 Mobile + reduced motion | Media queries + a11y | 0.5 |
| 7 Perf + verification | Audit + screenshots | 0.75 |
| **Total** | **Full rebuild** | **~5 sessions** |

## File map (after rebuild)

```
personal-project/
├── second_brain_visual.html       (v1 — keep as backup)
├── second_brain_visual_v2.html    (new working version)
├── REBUILD_PLAN.md                (this file)
└── CHANGELOG.md                   (v1 → v2 differences, written in Phase 7)
```

## Notes for the next agent

- Do NOT try to patch v1. Architecture is wrong, not buggy. Phase 1 starts a fresh file.
- The v1 file is 2687 lines; v2 should land around 1500-1800 lines (CSS layouts replace JS positioning).
- Pipeline step animations are the most complex preserved code — copy verbatim and isolate behind IntersectionObserver in Phase 4.
- Three.js shader code is delicate — copy verbatim in Phase 2, do not refactor.
- The user values smooth scroll above all else. If a phase introduces jank, fix or roll back before moving to the next phase.
