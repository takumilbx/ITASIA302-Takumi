# Second Brain — Visual Essay · Build Requirements

Spec for rebuilding a scroll-driven WebGL visual essay from scratch in a fresh agent. Drafted against three design skills: `emil-design-eng` (motion craft), `design-taste-frontend` (anti-slop), `impeccable` (register + color + slop test). Prior files (`second_brain_visual.html`, `_v2.html`) are reference only. Start clean.

No em dashes anywhere in code, copy, or this spec (binary ban, all three skills agree). Use commas, colons, parentheses, periods.

---

## 0. Design Read

> Reading this as: a **brand-register** visual essay (the design IS the product) for an academic + design-literate audience, with a precise, cinematic, particle-driven language, leaning toward Three.js + GSAP ScrollTrigger + custom-easing motion.

This is NOT a product UI. It is a piece. It must make the viewer go "wow," then keep reading. Taste is the whole grade.

## 1. Dials

- `DESIGN_VARIANCE: 8` — asymmetric, confident composition. Not centered-everything.
- `MOTION_INTENSITY: 8` — cinematic, scroll-choreographed, physics-based. Motion is the medium here, so it runs high. Every animation must still be motivated (see §7).
- `VISUAL_DENSITY: 3` — airy, gallery. One idea on screen at a time. Generous negative space around the type.

## 2. What it is + the WOW mandate

A single self-contained HTML page. One persistent WebGL visualization (a particle / node system) lives behind the page. As the reader scrolls, it transforms to carry a written argument about building a "second brain" (personal knowledge management).

The WOW comes from **craft, not novelty**: custom easing curves, spring physics, perceived-performance tricks, and a thousand unseen details in tune (Emil's principle). The particle brain is encouraged. It fails only when it is executed lazily (uniform morphs, additive-glow mush, rainbow palette). Executed with control, a particle brain is exactly the wow.

Deliverable: one HTML file (embedded CSS + JS, CDN libs OK).

## 3. Narrative (FIXED — do not invent copy)

Nine beats, scrolled top to bottom. Real prose lives in v1 (`second_brain_visual.html`); mine it. v2 used "Beat N" placeholders, which is part of why it felt empty. The new build needs the real words.

| # | Beat | Idea |
|---|------|------|
| 0 | Hero | Title + tone. "Second Brain · a visual essay." |
| 1 | PKM | What personal knowledge management is. |
| 2 | Second Brain | The popular bestseller concept. |
| 3 | Hype | The internet hype around it (loud, viral). |
| 4 | Reality | That hype is mostly slop, empty. |
| 5 | What I'm building | My real system (vs the hype). |
| 6 | Pipeline | My documentation workflow. The centerpiece (see §4). |
| 7 | Thesis | The seed thesis: retrieval-first knowledge. |
| 8 | End | Close. "ITASIA302 · 2026." |

## 4. Beat 6 — the pipeline (centerpiece, three sections)

**Section 1, Tool Explanation.** Five tools in workflow order. Show each tool by the ACTION it performs on the knowledge, not by a floating logo (logos alone told no story in the prior build):
1. Zotero: capture sources.
2. Obsidian: vault, notes link into a graph.
3. Claude: synthesize.
4. NotebookLM: integrate; the `nlm integrate` command extracts atoms.
5. Notion: publish.

**Section 2, Process Logic.** Zettelkasten: notes link by idea, not by folder.

**Section 3, Process Walkthrough.** The transformation:
- Atoms: single ideas / exact quotes, extracted by `nlm integrate`.
- Molecules: atoms linked into clusters.
- Alloys: refined, synthesized arguments.

The transformation (atoms to molecules to alloys) is the strongest beat. The tool section is the one that kept failing: it needs a clear through-line of the same knowledge moving and changing, not five disconnected tableaux.

## 5. Visual language

### Color (impeccable: pick a strategy, use OKLCH)
- Strategy: **Restrained, near-monochrome.** Tinted near-black surface, near-white particles/type, at most one accent used under 10%. The restraint is the taste. NO 4-color rainbow particle palette (that was the prior slop).
- OKLCH only. Never `#000` or `#fff`: tint neutrals toward the brand hue (chroma 0.005 to 0.01). Drop chroma near lightness extremes.
- The accent (if any) earns its place: active state, the single most important word, the thesis. One accent, locked across the whole page.

### Theme (impeccable: write the scene, do not default)
Scene sentence: "A design-literate reader, alone at night on a laptop, scrolling slowly, wanting to be impressed." That forces **dark**, near-black, low ambient, high contrast type, light that comes only from the particles. Dark here is motivated, not a tech-cliche default.

### Typography
- Display: a confident grotesk (Inter Tight, or a brand-appropriate display sans). Tight tracking on headlines (about -0.03em), large but controlled (hierarchy via weight + scale, not raw screaming size).
- Labels / metadata: a mono (JetBrains Mono or similar).
- Body cap 65 to 75ch. Hierarchy ratio at least 1.25 between steps.
- Emphasis within a headline: italic or bold of the SAME family. Never inject a serif word into a sans headline.

## 6. The centerpiece visualization

The particle/node system is the star. It is allowed to be a brain, a graph, particles, whatever wows. Requirements for it to read as crafted, not generic:

- **No additive-bloom mush.** Crisp particles. Glow is rare and purposeful, not the default blend mode.
- **Recognizable shapes when a shape is intended.** At low particle counts a filled blob reads as a blob. If a brain is wanted, an outline / contour reads far better than a fill. Test legibility before committing.
- **Per-beat motion signature.** Each beat has its own behavior: calm orbit, turbulent chaos, gravity collapse, inward convergence. Beats must not all feel the same.
- **The transformation between beats is the show.** Particles should reorganize with intent (burst, settle, snap, scatter), each transition with its own easing, not one uniform crossfade nine times.

## 7. Motion spec (the WOW engine, from emil-design-eng)

Motion is the medium. Get it exactly right.

- **Custom easing only.** Built-in CSS easings are too weak. Use, for example:
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for entrances.
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement.
  - Never `ease-in` on anything the user is watching (feels sluggish).
- **Scroll choreography.** One global scroll progress 0 to 1 drives beat + intra-beat fraction + camera + particle state. Scrub should feel connected, not laggy.
- **Spring physics** for anything that should feel alive (particle settle, camera drift). Apple-style config: `{ duration, bounce: 0.1 to 0.2 }`. Springs survive interruption; CSS keyframes restart, so prefer springs/transitions for interruptible motion.
- **Perceived performance.** Faster, well-eased motion feels more premium than slow motion. Keep discrete UI transitions under 300ms. The scroll piece can breathe longer, but never sluggish.
- **Asymmetric timing** where it applies: deliberate in, snappy out.
- **Stagger** text reveals (30 to 80ms between lines): eyebrow, then headline, then body, then CTA. Reveal with blur(8px to 0) + translateY + opacity, custom ease.
- **Buttons / interactive bits** (if any): `scale(0.97)` on `:active`, instant feedback.
- Animate only `transform` and `opacity`. Hoist all allocations out of the render loop.

## 8. Anti-slop gates (must pass before shipping)

Run the impeccable AI-slop test at two altitudes:
- **First-order:** if someone could guess the look from the category ("AI / knowledge tool → glowing particle brain on black"), that is the first reflex. The particle brain is allowed, but it must be executed so the CRAFT is the differentiator, not the concept.
- **Second-order:** if the look is "the obvious anti-default" (generic Obsidian-graph dots), that is the trap one tier deeper. Push to something with a real point of view.

Absolute bans (rewrite if you reach for any):
- Em dashes anywhere. Also no `--`.
- Gradient text (`background-clip: text`).
- Side-stripe accent borders.
- Glassmorphism as default.
- Identical card grids; hero-metric template.
- 4-color rainbow particle palette; additive-glow blob; uniform morph repeated every beat. (These were the prior build's specific failures.)
- AI-purple/blue glow gradients. Centered-everything hero. Inter (plain) as the unconsidered default.

## 9. Tech constraints

- Single HTML file. CDNs OK: Three.js r128, GSAP 3.12 + ScrollTrigger.
- Scroll engine: sticky beat panels, mutually-exclusive, opacity-gated by `body[data-active-beat]` or JS. Beat 6 needs roughly 10x a normal beat's scroll height for its sub-steps.
- 60fps. Cancel `requestAnimationFrame` on tab hide. Responsive. `prefers-reduced-motion` branch that degrades motion to gentle/instant (keep opacity, drop large position moves).
- **Local preview gotcha (will waste hours if unknown):** the Claude preview server runs the tab headless with `visibility:hidden`, which PAUSES `requestAnimationFrame`. So rAF-driven motion (camera LERP, springs, scrub catch-up) FREEZES in screenshots, and `window.innerHeight` reads 0 (use `visualViewport`). Verify motion in a REAL browser, not the headless preview. Do not "fix" animation that is only frozen because the tab is paused.

## 10. What the prior build got wrong (learn, do not repeat)

1. Uniform motion: every beat did hold → morph → hold, same easing, no rhythm. Flat.
2. Rainbow additive-glow particle blob: the lazy generic execution of particles. (Particles are fine; THAT execution is not.)
3. Logos with no story in the tool section: static marks, no through-line.
4. Placeholder "Beat N" copy: the piece felt empty because the words were missing.
5. Patching a flawed base repeatedly instead of designing first.

## 11. Process expectation

Use `impeccable shape` discipline: plan the UX/motion/visual direction and CONFIRM with the user before writing code. The user has strong taste and will reject generic work fast. Show direction (mockups or a live preview), get approval, then build. Keep the narrative (§3, §4) fixed. Everything about the visual + motion language is open, as long as it passes §7 and §8.

This doc can seed `PRODUCT.md` (register: brand; users; tone; anti-references) and `DESIGN.md` (color strategy, type, motion tokens) for the impeccable skill.

## 12. Reference files

- `second_brain_visual.html` (v1): original build (em-dash copy + rainbow particles). Source of the text in §13.
- `second_brain_visual_v2.html` (v2): rejected build. Scroll-engine + beat-structure reference only.
- `REBUILD_PLAN.md`: older notes, partially stale.

---

## 13. The copy (verbatim, em dashes already removed)

Use this text. `*word*` marks an emphasized word (italic or bold of the same family, never a serif swap). Citations stay inline.

### Beat 0 — Hero
- Kicker: `Project Overview · Initial Draft`
- Headline: Building a *Second Brain* (For Real This Time)
- Sub: The project in one walk-through. It covers what PKM is, why the hype around it is suspicious, what I am building, and where it is heading.

### Beat 1 — PKM (`01 · PKM`)
- Headline: What is *PKM*?
- Body: Personal knowledge management, or PKM, is the set of steps a person uses to collect, organize, store, find, and share what they know. In simple terms, it means having a real system for your own knowledge instead of just hoping you will remember things later. The key idea is that the individual, not a company or an institution, is the person in charge of managing it.
- Card: The name is new, but the habit is very old. The term PKM comes from a 1999 working paper by Frand and Hixon (1999). The practice itself goes back centuries, from Leonardo da Vinci's notebooks to Niklas Luhmann's Zettelkasten, a box of more than 90,000 linked index cards. Even the idea of a machine for it is old. In 1945, Vannevar Bush imagined the Memex, a desk that could store everything you read and let you find it again quickly (Bush, 1945).
- Card: So why does such an old habit suddenly need its own research field? The amount of information we deal with has grown very fast. Once Peter Drucker (1968) described the modern "knowledge worker", whose main asset is what they know, managing that knowledge stopped being optional. A simple way to picture PKM is the difference between a library and a pile. Both hold all your books, but only one will give you the right book before the deadline.

### Beat 2 — Second Brain (`02 · Second Brain`)
- Headline: And a *second brain*?
- Body: If PKM is the general idea, the *second brain* is its most famous version. A second brain is an external, digital place where you keep the ideas and information you collect through learning and experience. But storage by itself is not the point. Tiago Forte describes it as a system that "expands our memory and our intellect using the modern tools of technology and networks." What makes it more than simple note-taking is that it should also help you find, compare, shorten, and reuse your notes. A folder full of saved articles is just a digital attic. A second brain is meant to be a thinking partner.
- Card: The idea is centuries old, but the name is recent. Forte introduced his "Building a Second Brain" method in 2017 and explained it fully in his 2022 book (Forte, 2022). He gave the practice two structures. CODE stands for Capture, Organize, Distill, Express. PARA stands for Projects, Areas, Resources, Archives, sorting notes by how useful they are for action rather than by topic. So PKM is the wider category, and the second brain is one specific version of it. If PKM is cooking, the second brain is one particular and very well-marketed recipe.
- Quote: In their 1998 paper "The Extended Mind", the philosophers Andy Clark and David Chalmers argued that thinking does not only happen inside the head. If Otto trusts his notebook and uses it all the time, it becomes a real part of his mind. Moving information into a system you trust is not laziness, it is cognitive extension. (cite: Clark and Chalmers, "The Extended Mind", 1998)

### Beat 3 — Hype (`03 · The Hype`)
- Headline: Everyone is *selling* a brain
- Body: Spend any time in the productivity side of the internet and someone will try to sell you a brain. Forte's book was a bestseller. A whole industry of online creators now shows off note-taking "systems" with the kind of energy people usually save for skincare routines. The newest promise is that AI will finally make the whole thing effortless. One 2025 academic paper describes this path clearly, moving from PKM, to the second brain, to a "personal AI companion" (Aal and Rüller, 2025). The market is huge and the discussion never stops. Whether any of it actually *works* is treated as a separate and slightly awkward question.
- Failure modes: (1) The Productivity Trap: the system needs so much care that you spend more time looking after it than using it. (2) The Collecting Habit: saving articles you will never open again, until the second brain becomes a digital attic.
- Body: There is also a deeper problem. There is very little solid research showing these systems improve thinking. Most evidence is personal stories. William Jones (2007) argued you can only really manage information, because knowledge is personal and lives in the mind, so it cannot be tidied from the outside. The field gives a lot of confident advice based on surprisingly little proof. That gap between loud claims and quiet evidence is where this project starts.

### Beat 4 — Reality / Meme (`04 · The Meme`, required part: Motivation)
- Headline: So why *bother*?
- Editorial quote: The sharpest critics of this genre enjoy pointing out something funny. The people who promote "second brains" often still cannot remember where their own car keys are. The partner who quietly keeps track of the keys, the glasses, and the kid's appointments was the original second brain all along. (cite: based on the "second brain" meme by @nunoei, paraphrased)
- Body (Motivation): I did not come to this topic through theory. I came to it through failure. For years I saved notes and told myself organizing them was a job for Future Me, who would surely have more time and discipline. Future Me never showed up. My vault slowly turned into a beautifully tagged graveyard. The industry's answer is always the same: the next template, the next app, the next creator's setup. I bought in again and again. The meme deserves a real answer, and so does the question hiding under it. Is the failure mine, or is it the method's? That question is the whole reason for this project.

### Beat 5 — What I'm building (`05`, required parts: Project idea, Format)
- Headline: A second brain that actually *helps me think*
- Body (Project idea): I am not building a fancier filing cabinet. I am building a system where small, single-idea notes connect into arguments, where research builds on itself instead of piling up, and where the question *"do I really understand this?"* has a clear, structural answer. Most PKM advice focuses on capture, getting everything in. But the thing that decides whether a system works is retrieval, getting the right idea back out at the moment you are thinking. So the project builds a second brain that puts retrieval first, then tests that idea honestly.
- Body (Format): The final product makes this case as a digital essay on the web, a small set of linked pages rather than one long document: this overview, a visual companion you scroll through, a full written essay, and a data section. The format is part of the argument. A project about organizing knowledge should be easy to move around in. A flat PDF would quietly work against its own point.

### Beat 6 — Pipeline (`06 · Current State`, required parts: Sources, Methods)
- Headline: Where I *am* now
- Body: The system is a pipeline. A paper enters through Zotero. It becomes a structured literature note in Obsidian. Claude Code runs a NotebookLM MCP integration to extract candidate atoms from the PDF. Verified atoms land in the vault, cluster into molecules, and synthesize into alloys tracked in Notion as actionable work. Each step uses a real artifact from the vault.
- Tool chips: Obsidian · Vault. Zotero · 49 sources. Notion · Tracking. AI / MCP · Retrieval.

Seven pipeline steps:
1. `Step 01 · Zotero` — Capture *the paper*: Every source enters through Zotero. PDF attached, metadata extracted, citekey auto-generated `authorYEAR`. The Obsidian Zotero Integration plugin drops a structured import note into the vault inbox.
2. `Step 02 · Obsidian lit note` — Process into a *literature note*: The import becomes a structured markdown note `@FERREIRA2026.md`. Frontmatter carries metadata, citekey, PDF path. Four sections always: Main Argument, Methodology, Key Findings, Atoms Extracted. The note is the single source of truth downstream.
3. `Step 03 · Claude Code + NLM MCP` — Extract atoms via *NotebookLM*: Claude Code reads the lit note, opens the PDF via the Zotero path, runs the NotebookLM MCP integration. Three focused queries return candidate atoms. Each gets verified against the source. Verified atoms land in `/Atoms/`, rejected ones logged with reasons.
4. `Step 04 · Atoms` — Verified atoms *land in the vault*: Each verified suggestion becomes its own file in `/Atoms/`. Filename is the claim itself as a full declarative sentence, findable by search alone. The vault holds 1,056 atoms across thesis topics: TPACK, PKM, Japan's GIGA program, Bangkok's BMA pilot, AI epistemics.
5. `Step 05 · Molecules` — Atoms *cluster into molecules*: When 2 to 5 atoms share a theme, they get pulled into a molecule: a connection note with no new claims, only relations. Lives in `/Molecules/`, links back to its atoms. Pattern recognition stops being implicit and becomes a saved object.
6. `Step 06 · Alloys` — Molecules fuse into *alloys*: An alloy is a thesis-grade synthesis, an original argument built from molecules and atoms. It can never be drafted directly from a source. Alloys are where the project's research output lives, in `/Alloys/`, each tagged to a thesis chapter.
7. `Step 07 · Notion` — Alloys surface in *Notion*: Notion is where the system meets actual work. Each alloy surfaces as a thesis chapter draft, a fieldwork milestone, or an unfinished argument needing one more source. Deadlines, status pills, writing tasks reference vault notes by citekey. Obsidian is the brain. Notion is the calendar.

(Note: §4 maps these 7 steps onto the "tools + zettelkasten + atoms/molecules/alloys" framing. Reconcile: the tools section = steps 1, 2, 3, 7; the walkthrough = steps 4, 5, 6. Keep the author's real 7-step structure if it reads better than the 5-tool framing.)

### Beat 7 — Thesis (`07`, required: three pieces of literature)
- Headline: Where it's *heading*
- Body: Put together, the walk-through points to one working thesis. It is the seed the full essay will grow from.
- Working thesis (hero quote): Retrieval-first organization explains why generic PKM templates fail in domain-expert workflows.
- Body: Three pieces of academic literature support this argument. One is a popular book rather than a peer-reviewed work, kept on purpose because the project studies it directly.
- Lit card 01 · Bestseller: Tiago Forte, *Building a Second Brain* (2022). The bestseller that popularized the "second brain" idea and the capture-first method. This project argues against that method. The book is here not as research but as the main thing the project studies.
- Lit card 02 · Historical anchor: Niklas Luhmann, "Communicating with Slip Boxes" (1981, English tr.). Luhmann's own account of working with his Zettelkasten. The historical balance to the modern hype. Retrieval-first thinking is much older than the apps now selling it.
- Lit card 03 · Current angle: Ferreira (2026), on retrieval-first organization. Recent work that gives the project its main angle and shapes the thesis. (full reference TBC.)

### Beat 8 — End
- `08 · End` — ITASIA302 · personal project · May 2026

### Works cited (for parts 01 to 03)
Aal and Rüller (2025); Bush (1945), As We May Think, The Atlantic; Clark and Chalmers (1998), The Extended Mind, Analysis 58(1); Drucker (1968); Forte (2022), Building a Second Brain, Atria Books; Frand and Hixon (1999), UCLA Anderson working paper; Jones and Teevan (2007), Personal Information Management, U. Washington Press.
