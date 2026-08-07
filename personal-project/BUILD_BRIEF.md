# Build Brief: "Second Brain" Scroll Essay

Self-contained brief. Build from zero. No prior code to read. This file holds the idea, the words, the taste, and the tech.

House rule, non-negotiable across code and copy: **no em dashes (`—`) and no `--`.** Use commas, colons, parentheses, periods.

---

## 1. The deliverable

A **single self-contained HTML file** (embedded CSS + JS; CDN libraries allowed). It is a **scroll-driven visual essay**: one persistent WebGL visualization behind the page that transforms as the reader scrolls, carrying a written argument across nine "beats". Opening it in a browser and scrolling top to bottom is the entire experience.

It is a university personal-project overview (course ITASIA302). The design IS the product. The goal is that a design-literate viewer says "wow," then keeps reading.

## 2. Design read and dials

> A brand-register visual essay for an academic + design-literate audience, precise and cinematic, particle/graph-driven, on Three.js + GSAP ScrollTrigger with custom-easing motion.

- `DESIGN_VARIANCE: 8` (asymmetric, confident; not centered-everything)
- `MOTION_INTENSITY: 8` (cinematic, scroll-choreographed, physics-based; every animation still motivated)
- `VISUAL_DENSITY: 3` (airy gallery; one idea on screen at a time)

## 3. Audience and tone

Audience: course instructor and design-literate peers. Tone: confident, a little contrarian (the essay argues the popular "second brain" hype is shallow, then shows a real working system). First-person where the copy is first-person.

## 4. Narrative: nine beats

One global scroll progress (0 to 1) drives the active beat, an intra-beat fraction, the camera, and the visualization state. Beats are mutually exclusive (only one readable at a time). Beat 6 is the centerpiece and needs roughly 10x the scroll length of a normal beat.

`*word*` below marks an emphasized word: render as italic or bold of the SAME typeface, never a serif swap.

### Beat 0 — Hero
- Eyebrow: `Project Overview · Initial Draft`
- Headline: Building a *Second Brain* (For Real This Time)
- Sub: The project in one walk-through. It covers what PKM is, why the hype around it is suspicious, what I am building, and where it is heading.

### Beat 1 — PKM (`01 · PKM`)
- Headline: What is *PKM*?
- Body: Personal knowledge management, or PKM, is the set of steps a person uses to collect, organize, store, find, and share what they know. In simple terms, it means having a real system for your own knowledge instead of just hoping you will remember things later. The key idea is that the individual, not a company or an institution, is in charge of managing it.
- Body: The name is new, but the habit is very old. The term PKM comes from a 1999 working paper by Frand and Hixon (1999). The practice goes back centuries, from Leonardo da Vinci's notebooks to Niklas Luhmann's Zettelkasten, a box of more than 90,000 linked index cards. Even the idea of a machine for it is old: in 1945, Vannevar Bush imagined the Memex, a desk that could store everything you read and let you find it again quickly (Bush, 1945).
- Body: So why does such an old habit suddenly need its own research field? The amount of information we deal with grew very fast. Once Peter Drucker (1968) described the modern "knowledge worker", whose main asset is what they know, managing that knowledge stopped being optional. Picture the difference between a library and a pile. Both hold all your books, but only one gives you the right book before the deadline.

### Beat 2 — Second Brain (`02 · Second Brain`)
- Headline: And a *second brain*?
- Body: If PKM is the general idea, the *second brain* is its most famous version. A second brain is an external, digital place where you keep the ideas and information you collect through learning and experience. But storage by itself is not the point. Tiago Forte describes it as a system that "expands our memory and our intellect using the modern tools of technology and networks." What makes it more than note-taking is that it should help you find, compare, shorten, and reuse your notes. A folder full of saved articles is just a digital attic. A second brain is meant to be a thinking partner.
- Body: The idea is centuries old, the name recent. Forte introduced his "Building a Second Brain" method in 2017 and explained it fully in his 2022 book (Forte, 2022). Two structures: CODE (Capture, Organize, Distill, Express) and PARA (Projects, Areas, Resources, Archives), which sorts notes by usefulness for action rather than by topic. PKM is the wider category; the second brain is one version of it. If PKM is cooking, the second brain is one particular, very well-marketed recipe.
- Quote: In their 1998 paper "The Extended Mind", philosophers Andy Clark and David Chalmers argued that thinking does not only happen inside the head. If Otto trusts his notebook and uses it all the time, it becomes a real part of his mind. Moving information into a system you trust is not laziness, it is cognitive extension. (Clark and Chalmers, 1998)

### Beat 3 — The Hype (`03 · The Hype`)
- Headline: Everyone is *selling* a brain
- Body: Spend any time in the productivity side of the internet and someone will try to sell you a brain. Forte's book was a bestseller. A whole industry of creators shows off note-taking "systems" with the energy people usually save for skincare routines. The newest promise is that AI will finally make it effortless. One 2025 paper describes the path clearly: PKM, to second brain, to a "personal AI companion" (Aal and Rüller, 2025). The market is huge and the discussion never stops. Whether any of it actually *works* is treated as a separate, slightly awkward question.
- Two failure modes: (1) The Productivity Trap: the system needs so much care you spend more time maintaining it than using it. (2) The Collecting Habit: saving articles you will never reopen, until the second brain becomes a digital attic.
- Body: There is also a deeper problem: very little solid research shows these systems improve thinking. Most evidence is personal stories. William Jones (2007) argued you can only really manage information, because knowledge is personal and lives in the mind, so it cannot be tidied from the outside. The field gives confident advice on surprisingly little proof. That gap between loud claims and quiet evidence is where this project starts.

### Beat 4 — Reality (`04 · The Meme`, required part: Motivation)
- Headline: So why *bother*?
- Editorial quote: The sharpest critics of this genre enjoy pointing out something funny. The people who promote "second brains" often still cannot remember where their own car keys are. The partner who quietly tracks the keys, the glasses, and the kid's appointments was the original second brain all along. (based on the "second brain" meme by @nunoei, paraphrased)
- Body (Motivation): I did not come to this through theory. I came to it through failure. For years I saved notes and told myself organizing them was a job for Future Me, who would surely have more time and discipline. Future Me never showed up. My vault turned into a beautifully tagged graveyard. The industry's answer is always the same: the next template, the next app, the next creator's setup. I bought in again and again. The meme deserves a real answer, and so does the question under it: is the failure mine, or the method's? That question is the whole reason for this project.

### Beat 5 — What I'm building (`05`, required parts: Project idea, Format)
- Headline: A second brain that actually *helps me think*
- Body (Project idea): I am not building a fancier filing cabinet. I am building a system where small, single-idea notes connect into arguments, where research builds on itself instead of piling up, and where the question *"do I really understand this?"* has a clear, structural answer. Most PKM advice focuses on capture (getting everything in). But what decides whether a system works is retrieval (getting the right idea back out the moment you are thinking). So the project builds a second brain that puts retrieval first, then tests that idea honestly.
- Body (Format): The final product is a digital essay on the web, a small set of linked pages rather than one long document: this overview, a visual companion you scroll through, a full written essay, and a data section. The format is part of the argument. A project about organizing knowledge should be easy to move around in. A flat PDF would quietly work against its own point.

### Beat 6 — The pipeline (`06 · Current State`, required parts: Sources, Methods) — CENTERPIECE
- Headline: Where I *am* now
- Intro body: The system is a pipeline. A paper enters through Zotero. It becomes a structured literature note in Obsidian. Claude Code runs a NotebookLM integration to extract candidate atoms from the PDF. Verified atoms land in the vault, cluster into molecules, and synthesize into alloys tracked in Notion as actionable work.

Seven sub-steps, scrolled through in order. Show each by the ACTION it performs (the same knowledge transforming through the pipeline), not by a static brand logo:
1. `Step 01 · Zotero` — Capture *the paper*. Every source enters through Zotero. PDF attached, metadata extracted, citekey auto-generated (`authorYEAR`). A structured import note drops into the vault inbox.
2. `Step 02 · Obsidian` — Process into a *literature note*. The import becomes a structured markdown note. Frontmatter holds metadata, citekey, PDF path. Four sections always: Main Argument, Methodology, Key Findings, Atoms Extracted. The single source of truth downstream.
3. `Step 03 · Claude + NotebookLM` — Extract atoms via *NotebookLM*. Claude Code reads the note, opens the PDF, runs the NotebookLM integration. Focused queries return candidate atoms. Each is verified against the source; verified atoms saved, rejected ones logged with reasons.
4. `Step 04 · Atoms` — Verified atoms *land in the vault*. Each becomes its own file; the filename is the claim as a full declarative sentence, findable by search alone. The vault holds 1,056 atoms across thesis topics.
5. `Step 05 · Molecules` — Atoms *cluster into molecules*. When 2 to 5 atoms share a theme, they pull into a molecule: a connection note with no new claims, only relations. Pattern recognition becomes a saved object.
6. `Step 06 · Alloys` — Molecules fuse into *alloys*. An alloy is a thesis-grade synthesis, an original argument built from molecules and atoms. It can never be drafted directly from a source. Alloys are where the research output lives.
7. `Step 07 · Notion` — Alloys surface in *Notion*. Each alloy becomes a thesis chapter draft, a fieldwork milestone, or an unfinished argument needing one more source. Obsidian is the brain; Notion is the calendar.

The transformation arc (capture, process, extract, atoms, molecules, alloys, publish) is the strongest moment. Keep a clear visual through-line of the same knowledge moving and changing.

### Beat 7 — Thesis (`07`, required: three pieces of literature)
- Headline: Where it's *heading*
- Body: The walk-through points to one working thesis, the seed the full essay grows from.
- Working thesis (display quote): Retrieval-first organization explains why generic PKM templates fail in domain-expert workflows.
- Three supporting works:
  - `01 · Bestseller` — Tiago Forte, *Building a Second Brain* (2022). The bestseller that popularized the capture-first method. The project argues against it; it is here as the main thing studied, not as research.
  - `02 · Historical anchor` — Niklas Luhmann, "Communicating with Slip Boxes" (1981, Eng. tr.). Luhmann's account of his Zettelkasten. Retrieval-first thinking is older than the apps now selling it.
  - `03 · Current angle` — Ferreira (2026), on retrieval-first organization. Gives the project its main angle (full reference to be confirmed).

### Beat 8 — End
- `08 · End` — ITASIA302 · personal project · May 2026

### Works cited (parts 01 to 03)
Aal and Rüller (2025); Bush (1945), As We May Think, The Atlantic; Clark and Chalmers (1998), The Extended Mind, Analysis 58(1); Drucker (1968); Forte (2022), Building a Second Brain, Atria Books; Frand and Hixon (1999), UCLA Anderson working paper; Jones and Teevan (2007), Personal Information Management, U. Washington Press.

## 5. Visual language

### Color
- Strategy: restrained, near-monochrome. Tinted near-black surface, near-white type and particles, at most one accent under 10% of the surface. Restraint is the taste. No multi-color rainbow particle palette.
- Use OKLCH. Never `#000` or `#fff`: tint neutrals toward the brand hue (chroma 0.005 to 0.01). Lower chroma near lightness extremes.
- One accent, locked across the whole page, used only where it means something (active state, the single most important word, the thesis).

### Theme
Scene: a design-literate reader, alone at night on a laptop, scrolling slowly, wanting to be impressed. That forces dark, near-black, low ambient, high-contrast type, light coming mainly from the visualization. Dark here is motivated, not a default.

### Typography
- Display: a confident grotesk (for example Inter Tight), tight tracking (about -0.03em), hierarchy from weight + scale, not raw size.
- Labels and metadata: a monospace (for example JetBrains Mono).
- Body line length 65 to 75ch. Step ratio at least 1.25. Generous negative space.

## 6. Motion spec (the wow engine)

Motion is the medium. Precision here is what separates this from a generic particle demo.

- Custom easing only. Built-in CSS easings are too weak. For example `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement. Never `ease-in` on anything the user watches (feels sluggish).
- Scroll choreography: one global progress drives beat, intra-beat fraction, camera, visualization state. Scrub feels connected, not laggy.
- Spring physics for anything that should feel alive (particle settle, camera drift). Springs survive interruption; prefer them and CSS transitions over keyframes for interruptible motion.
- Per-beat motion signature: each beat behaves differently (calm orbit, turbulent chaos, gravity collapse, inward convergence). Beats must not all feel the same. Each transition gets its own easing, not one uniform crossfade nine times.
- Perceived performance: well-eased fast motion feels more premium than slow motion. Discrete UI transitions under 300ms; the scroll piece can breathe but never drags.
- Stagger text reveals (30 to 80ms between lines: eyebrow, headline, body, CTA). Reveal with blur(8px to 0) + small translateY + opacity, custom ease.
- Animate only `transform` and `opacity`. Hoist allocations out of the render loop.

## 7. Anti-slop gates (pass before shipping)

Run the slop test at two altitudes:
- First-order: if the look is guessable from the category alone ("knowledge tool, so glowing particle brain on black"), the concept is fine but the CRAFT must be the differentiator, executed with control.
- Second-order: if the look is the obvious anti-default (generic node-graph dots), push to a real point of view.

Hard bans (rewrite if you reach for any):
- Em dashes and `--` anywhere.
- Gradient text (`background-clip: text`).
- Side-stripe accent borders (`border-left`/`border-right` as a colored accent).
- Glassmorphism as a default.
- Identical card grids; the big-number hero-metric template.
- Rainbow / additive-glow particle mush; the same morph repeated every beat.
- AI-purple/blue glow gradients; centered-everything hero; plain Inter as the unconsidered default.

## 8. Technical constraints

- Single self-contained HTML file. CDNs allowed: Three.js (r128 works), GSAP 3.12 + ScrollTrigger.
- Scroll engine: sticky beat panels, opacity-gated by an attribute on `body` (for example `data-active-beat`) or JS. Beat 6 needs about 10x a normal beat's scroll height.
- Target 60fps. Cancel `requestAnimationFrame` on tab hide. Responsive layout. A `prefers-reduced-motion` branch that keeps opacity/comprehension cues but drops large position moves.
- Use `visualViewport` for sizing where possible (some embedded/headless previews report `window.innerHeight` as 0 and pause `requestAnimationFrame` while the tab is hidden; verify motion in a real, focused browser tab).

## 9. Process expectation

Plan the visual and motion direction and confirm it before writing the full build. Show direction (a mockup or a live preview), get approval, then build. The narrative and copy (section 4) are fixed. Everything about the visual and motion language is open, as long as it passes sections 6 and 7.
