# PKM Pipeline Scrollytelling — Design

**Date:** 2026-05-19
**Target:** `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`
**Section:** New section 01 "How the system works" (replaces current dataset-cards section 01)

---

## Goal

Show the actual workflow of building a personal knowledge management system using Obsidian, Zotero, NotebookLM MCP, Claude Code, and Notion. The current section 01 displays four data visualization cards as "the material." That section moves down to become section 02 "What the system produced." A new scroll-driven, animation-rich section takes its place to illustrate how knowledge flows through the user's PKM pipeline, end to end.

Each pipeline step gets its own custom animation that visualizes what actually happens at that step — not a static diagram. A reader scrolls down and watches a paper move from Zotero into the vault, through atom extraction, into clustered molecules, fused into thesis-grade alloys, and surfaced in Notion for project tracking.

## Pipeline (7 steps)

1. **Zotero** — paper + PDF captured, metadata extracted, citekey generated
2. **Obsidian literature note** — Zotero import processed into structured markdown
3. **NotebookLM MCP via Claude Code** — atoms extracted from PDF via NotebookLM
4. **Atoms** — verified declarative-sentence notes land in `/Atoms/`
5. **Molecules** — related atoms cluster around themes
6. **Alloys** — molecules synthesize into thesis-grade arguments
7. **Notion** — project tracking surfaces alloys as actionable work

## Architecture

### Page integration

Insert as new section between current `#intro` and current `#viz` sections. Update `#viz` section tag from "01 · The material" to "02 · What the system produced" and renumber subsequent sections accordingly. Update topbar nav anchor list.

```
Hero
  └─ 00 · Intro
  └─ 01 · How the system works  [NEW: scrollytelling pipeline]
  └─ 02 · What the system produced  [RENAMED + RENUMBERED from 01]
  └─ 03 · Framework  [RENUMBERED from 02]
  └─ 04 · Synthesis  [RENUMBERED from 03]
  └─ 05 · Thesis direction  [RENUMBERED from 04]
  └─ 06 · Personal system design  [RENUMBERED from 05]
  └─ 07 · References  [RENUMBERED from 06]
```

### Section structure

```
<section id="pipeline" class="essay-section pipeline-section">
  <div class="section-tag">01 · The workflow</div>
  <h2 class="section-heading">How the system <em>actually works</em></h2>
  <p class="body-text">[2-3 sentence intro]</p>

  <div class="pipeline-track">
    <div class="pipeline-step" data-step="01">[Zotero]</div>
    <div class="pipeline-step" data-step="02">[Lit note]</div>
    <div class="pipeline-step" data-step="03">[Claude Code + MCP]</div>
    <div class="pipeline-step" data-step="04">[Atoms]</div>
    <div class="pipeline-step" data-step="05">[Molecules]</div>
    <div class="pipeline-step" data-step="06">[Alloys]</div>
    <div class="pipeline-step" data-step="07">[Notion]</div>
  </div>

  <p class="body-text pipeline-outro">[transition to next section]</p>
</section>
```

Each `.pipeline-step` is a two-column layout: prose left (~40ch), animated visual right. Step is `min-height: 92vh` so each one dominates the viewport when scrolled to. On mobile (≤720px), stacks vertically with reduced animation complexity.

### Animation activation

**Trigger model:** IntersectionObserver fires when a step crosses 50% of viewport height. Each step animates once on entry. Replay button in top-right of each animation re-runs it.

**No scroll-progress binding.** Scroll-progress animations are tempting but penalize readers who scroll back, look fragmented on touch devices, and increase complexity by 3-5x. Trigger-on-view gives a clean, predictable performance with the same "scrollytelling" feel.

**Performance:** All animations use CSS transforms and opacity (GPU-accelerated). Atoms step uses dynamically-positioned divs (max 25 on desktop, 12 on mobile). Molecules step uses inline SVG for connection lines. No external animation libraries.

### Data sources

Most animations use **real artifacts from the user's Obsidian vault**:
- Step 1: real citekey from `/Sources/Literature Sources/` (rotates between FERREIRA2026, FORTE2022, JI2011)
- Step 3: real Claude Code command + real MCP tool names from CLAUDE.md
- Step 4: real atom filenames sampled from `/Atoms/` (1,056 files, hard-code 25-40 representative ones)
- Step 4 counter: real total atom count (1,056 currently)
- Step 5: real molecule themes if available; placeholders if not
- Step 6: real Forte/Ferreira atoms used as evidence chain components

**Data pipeline:** Hardcoded JS arrays in `<script>` block, populated by sampling the vault manually at build time. 25-40 atom names, 3 citekeys, 1 atom count. Avoids any build step, runtime fetch, or Node dependency. Trade-off: if vault changes substantially, hardcoded samples drift from reality — accepted as low-cost manual refresh later. (A build script that auto-samples from the vault is a future enhancement, not part of this design.)

## Per-step animation design

### Step 01 — Zotero (capture)

**Visual:** A PDF document slides in from the right and lands in the center. Metadata fields (title, author, year, DOI) populate one by one with a soft fade-and-slide. Finally a citekey stamp (e.g. `@FERREIRA2026`) appears in the bottom-left, rotated ~4°, with a brief scale-bounce.

**Distinctive element:** The citekey stamp animation — it lands like an ink stamp on a physical document, communicating "now this paper has an identity in the system."

**Build:** CSS keyframes only. ~80 lines of CSS. No JS beyond the IntersectionObserver trigger.

### Step 02 — Obsidian literature note

**Visual:** A markdown file mockup appears (file icon + filename like `@FERREIRA2026.md`). Frontmatter types itself out character by character (typewriter, monospace font), then section headings cascade in (`## Main Argument`, `## Methodology`, `## Key Findings`, `## Atoms Extracted`). Body text under each heading appears as horizontal skeleton bars (matching the existing skeleton-block aesthetic from the page).

**Distinctive element:** The typewriter effect on real Obsidian frontmatter (with the leading `---` and YAML), grounding the reader in what an actual lit note looks like.

**Build:** JS typewriter for frontmatter (~30 lines), CSS staggered fade-in for headings. ~120 lines total.

### Step 03 — NotebookLM MCP via Claude Code

**Visual:** A terminal/CLI window. User prompt types itself: `claude > run nlm-integrate for @FERREIRA2026`. Output streams in sequentially: "Reading literature note...", MCP tool calls firing one by one (`→ mcp__notebooklm__add_source ✓`, `→ mcp__notebooklm__query "core claims" ✓`), then a summary line `✓ EXTRACT — 7 verified, 0 rejected`.

**Distinctive element:** Real Claude Code command, real MCP tool names from your actual setup. Looks like an actual session you might have run. Blinking cursor at the end.

**Build:** JS line-by-line append with setTimeout delays. ~60 lines.

### Step 04 — Atoms

**Visual:** A large counter starts at 0 and ticks up rapidly to 1,056 (the real vault count). Simultaneously, small "atom cards" — each showing a real declarative-sentence atom filename from the vault — pop into random scatter positions across the canvas. ~25 cards total spawn over 4 seconds, each with a slight scale-pop animation.

**Distinctive element:** Real atom claim sentences. Reader sees actual phrases like "Retrieval strategies determine note organization" appearing — proves the system isn't hypothetical.

**Build:** JS interval for counter, staggered atom spawning. ~80 lines.

### Step 05 — Molecules

**Visual:** ~12 atom dots (carrying over visually from step 04) are scattered. After a 1s pause, they migrate via CSS transition into 3 distinct clusters. SVG lines fade in connecting atoms within each cluster. Cluster labels (`⊕ retrieval-strategy`, `⊕ system-combination`, etc.) appear after lines settle.

**Distinctive element:** The migration is a 1.2s transition — readers see atoms physically choosing their cluster, which is what molecule formation conceptually IS (clustering atoms around shared themes).

**Build:** CSS transitions for movement, JS for SVG line generation and label timing. ~100 lines.

### Step 06 — Alloys (synthesis)

**Visual:** Three molecule clusters from step 05 contract and merge upward into a single structured "alloy" block. The block has a thesis-grade sentence at the top (e.g. "Retrieval-first organization explains why generic PKM templates fail"). Underneath, an evidence chain shows which molecules and atoms support it, rendered as a compact tree with connecting lines.

**Distinctive element:** The "fusion" moment — three discrete clusters become one synthesized argument. Visually communicates the layer-skipping rule: alloys can only form from molecules and atoms, never directly from sources.

**Build:** CSS keyframes for fusion movement, JS for evidence-chain tree generation. ~120 lines.

### Step 07 — Notion (project tracking)

**Visual:** A Notion-style page mockup slides in from the right. Shows: chapter outline as a checklist, a thesis-direction note pinned to the top, an alloy from step 06 surfaced as a referenced source, deadline markers. Notion's distinctive UI elements (database table row, status pill, page icon) are recreated faithfully in CSS.

**Distinctive element:** Visual transition from "Obsidian vault" aesthetic (dark, serif, atomic) to "Notion workspace" aesthetic (lighter, structured, project-oriented) — communicates handoff from knowledge layer to action layer.

**Build:** Static HTML/CSS mockup with slide-in entrance. ~150 lines.

## Visual design language

- Use existing CSS variables from `personal-project/index.html` (`--bg`, `--ink`, `--amber`, `--teal`, `--sky`, `--lilac`, `--serif`, `--mono`)
- Maintain section visual style: tag/heading/body-text scaffolding
- Animations dark-aesthetic, never bright/cartoonish
- Color coding by layer: amber = atoms, teal = molecules, lilac = sources, sky = system/tool indicators
- All text in animations uses the same Fraunces serif (prose) + Geist Mono (metadata, code, tags) as the rest of the page

## Performance budget

| Concern | Mitigation |
|---|---|
| Total new HTML/CSS/JS | Target <30KB minified |
| Animation jank | All transforms GPU-accelerated; no layout thrashing |
| Mobile load | Skip Step 04 mass scatter on viewports <600px; reduce molecule count from 12 to 6 |
| Reduced motion | Respect `prefers-reduced-motion`: animations resolve to end state on entry, no replay |
| Asset weight | Zero new images, zero new fonts, zero external libraries |
| Existing page perf | Animations are below-fold, lazy-init via IntersectionObserver |

## Error handling

| Failure mode | Behavior |
|---|---|
| IntersectionObserver unsupported | Animations fire on `DOMContentLoaded` (legacy fallback) |
| CSS animations disabled | All steps render in their final visual state immediately |
| Replay button fails | Step retains its current rendered state (no crash) |

## Build approach

1. New section HTML appended after `#intro` in `personal-project/index.html`
2. New CSS appended inside the existing `<style>` block (use scoped class prefix `.pl-` for pipeline-section selectors)
3. New JS appended inside the existing `<script>` block
4. Renumber existing section tags (`01` → `02`, `02` → `03`, etc.) and update topbar nav anchors

No new files required. All changes inside `personal-project/index.html`.

## Testing

| Test | Method |
|---|---|
| Animations trigger on scroll | Manual: open page, scroll to each step, verify entry animation fires |
| Replay buttons work | Click each step's replay button, verify animation re-runs |
| Reduced motion respected | macOS Sys Prefs → Accessibility → Reduce Motion ON; verify static end states |
| Mobile layout | Resize browser to ≤720px, verify stacked layout + simplified animations |
| Page still loads existing sections | Verify intro, framework, references, etc. all render unchanged |
| Topbar nav anchors still work | Click each nav link, verify scroll targets correct section |
| No console errors | Open DevTools console, scroll through entire page |
| Existing rain.js + cursor.js still work | Verify rain effect + custom cursor still appear |

No automated tests (single static HTML page, low complexity, manual verification appropriate).

## Out of scope (explicit non-goals)

- D3.js force-directed graph of full 1,056-atom vault (deferred; performance cost not justified for this section)
- Scroll-progress-bound animations (deferred; complexity not justified)
- Live data fetch from the vault at runtime (deferred; hardcoded sample is sufficient)
- Animation customization controls / speed adjustment (out of scope)
- Notion API integration to pull real project status (out of scope; mocked)
- Generating new content for sections 04/05 (synthesis, thesis) — those remain as skeleton placeholders for now
