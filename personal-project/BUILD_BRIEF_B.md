# Build Brief B: "The Slip Box" — a printed knowledge essay

Self-contained brief. Build from zero. **Do not read, open, or imitate any existing `second_brain*.html`, `index.html`, `REBUILD_PLAN.md`, `REQUIREMENTS.md`, or `BUILD_BRIEF.md` in this folder.** They are a different design language and would pull this build back toward it. Everything you need is in this file.

House rule, non-negotiable across code and copy: **no em dashes (`—`) and no `--`.** Use commas, colons, parentheses, periods.

---

## 0. Why this brief exists

There is already a build of this essay, and it is a dark, near-black, full-screen WebGL particle / knowledge-graph that morphs as you scroll, with a single amber accent. That direction is taken. This brief deliberately builds the **opposite register** so the two can be compared side by side. If at any point your instinct is "dark background with glowing particles," you are drifting back into the other build. Stop and reread Section 2.

## 1. The deliverable

A **single self-contained HTML file** (embedded CSS + JS; CDN libraries allowed). It is a **scroll-driven visual essay**: one continuous, designed surface that transforms as the reader scrolls, carrying a written argument across nine "beats." Opening it in a browser and scrolling top to bottom is the whole experience. It is a university personal-project overview (course ITASIA302) for a design-literate audience. The design IS the product: a design-literate viewer should say "this is beautiful," then keep reading.

Write to a NEW file: `second_brain_B.html`. Do not touch other files.

## 2. HARD divergence rules (this is the whole point)

This build MUST NOT be any of these (all belong to the other version):

- **No dark / near-black background.** This piece lives on **light, warm paper.** Dark mode is banned outright here.
- **No persistent full-screen WebGL particle field, point cloud, or node-graph that morphs across beats.** No Three.js point system as the backdrop. No "glowing dots/marks on black." No constellation, no nebula, no galaxy.
- **No single cold-tech amber-on-black accent system.**
- **No "the camera flies around a 3D graph" reveal.**

Instead, commit fully to a different medium and metaphor (Section 3). The wow comes from **print-grade typography, tactile paper and card physics, and impeccable craft**, not from a shader.

## 3. The register: a physical Slip Box, printed

Scene to design for: a serious researcher's desk in warm daylight or a warm desk lamp. A **Zettelkasten**, a slip box of index cards, is the literal subject of the copy (Luhmann's box of 90,000 linked cards). So the essay is built **out of index cards, slips, printed pages, threads, and stamps.** The reader scrolls through a living archive being assembled by hand.

Mood words: archival, bookish, tactile, precise, warm, letterpress, considered. Think a beautifully art-directed academic broadsheet crossed with a detective's pin board and a library card catalog. Calm and confident, a little contrarian (the essay argues the popular "second brain" hype is shallow, then shows a real working system).

The persistent visual element is a **system of cards and slips on a paper field**, manipulated by scroll: cards enter, stack, fan, pin, get threaded together with drawn lines, cluster, and bind into a manuscript. This is the through-line that replaces the other build's particle field.

## 4. Visual language

### Color (light, warm, OKLCH)
- Surface: warm paper, for example `oklch(0.96 0.012 85)`. Cards a touch brighter, for example `oklch(0.99 0.005 85)`, with a faint kraft/manila option `oklch(0.90 0.03 80)` for secondary slips.
- Ink: warm near-black, for example `oklch(0.23 0.02 60)`. Never pure `#000`. Secondary ink `oklch(0.44 0.02 62)`, faint `oklch(0.64 0.015 70)`.
- Hairlines: `oklch(0.84 0.012 80)`.
- One accent, locked across the whole page, used under 8% of the surface: a **library-stamp vermilion / red pencil**, for example `oklch(0.53 0.20 27)`. This is Luhmann's red pencil and the date stamp. Use it for the single most important word, the active state, the thesis, registration marks. Never a glow; it is ink.
- Shadows are soft, warm, paper-on-paper (low blur, low opacity, warm tint), never neon, never glassmorphism.

### Typography
- Display + body: a refined **text serif with real italics** (for example Newsreader, Spectral, Source Serif 4, or Fraunces for more character). Bookish and academic. This is the voice.
- Labels, citekeys, stamps, metadata: a **typewriter / mono** (for example IBM Plex Mono or Courier Prime) to read like a typed index card. Optionally a tight grotesk for tiny UI only.
- Emphasis (`*word*` in the copy below) renders as italic of the same serif. The single hottest word per beat may take the red accent. Never swap typeface families mid-line for emphasis.
- Body measure 60 to 72ch. Generous margins, real baseline rhythm, hanging punctuation if you can. Print discipline.

## 5. Medium and motion (the wow engine, no shader)

Build the motion in **HTML + CSS + SVG (and small canvas/JS where helpful)**. No persistent WebGL backdrop.

- **Card physics.** Cards and slips slide, stack, fan, pin, lift, and settle with **spring motion** (Apple-style, low bounce). They cast soft paper shadows that change with "height" off the desk. Picking the right easing and spring is the craft.
- **Thread linking.** Connections between cards are **drawn lines** (SVG strokes, like red thread or pencil), animated to draw on with `stroke-dasharray`. This is how atoms link into molecules.
- **Scroll choreography.** One global scroll progress 0 to 1 drives the active beat, an intra-beat fraction, and the card/page state. Scrub feels connected, not laggy. Beats are mutually exclusive (one readable idea on screen at a time). Beat 6 needs roughly 8 to 10x a normal beat's scroll length.
- **Custom easing only.** For example `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, `cubic-bezier(0.77, 0, 0.175, 1)` for moves. Never `ease-in` on anything the user watches.
- **Stagger** reveals (30 to 80ms between lines) with a small translate + slight blur to sharp, custom ease. Type should feel set, not thrown.
- **Paper, not screen.** Optional: a faint paper grain texture, a subtle letterpress deboss on headlines, ink that looks absorbed into the page. Tasteful, never loud.
- Animate `transform` and `opacity` (and SVG `stroke-dashoffset`). 60fps. Respect `prefers-reduced-motion` (keep comprehension, drop large motion). Cancel rAF on tab hide. Use `visualViewport` for sizing where possible.

## 6. Per-beat treatment (nine beats)

Keep the copy in Section 8 fixed. Reinterpret each beat in the slip-box register:

0. **Hero.** A single index card or title page on the paper, set like a frontispiece. Eyebrow, headline, sub. A few blank slips wait at the edges.
1. **PKM.** Definition typeset like a dictionary or a printed card; a small aside card pinned alongside (the history: da Vinci, Luhmann, Memex).
2. **Second Brain.** A card that wants to be more than storage. The Clark and Chalmers "extended mind" quote on a tipped-in slip.
3. **The Hype.** Cards multiply into a messy, overflowing pile or fan, too many to manage. The two failure modes (Productivity Trap, Collecting Habit) as two stamped slips.
4. **The Meme (the graveyard).** The pile collapses into a **dead, perfectly filed drawer**: a tidy grid of identical grey tabs, a "beautifully tagged graveyard." The car-keys meme quote, then the motivation. Stillness.
5. **What I'm building.** A few cards lift out of the dead drawer and reactivate. Retrieval-first stated plainly.
6. **The pipeline (centerpiece).** The literal worktable. Seven steps assemble on the desk in order: a Zotero entry becomes a printed literature-note card (`@FERREIRA2026`), a typed terminal slip runs `nlm integrate`, atom cards drop onto the table, 2 to 5 atoms get threaded into a molecule, molecules bind into an alloy (a small stapled manuscript), and the alloy lands on a dated Notion board. Use REAL artifacts: real filenames as full-sentence claims, the real counts (the vault holds 1,471 notes and 4,247 links across topics like TPACK, PKM, Japan's GIGA program, Bangkok's BMA pilot). The same knowledge visibly transforms; keep a clear through-line.
7. **Thesis.** The bound manuscript opens to its thesis line. Three source cards laid in a row (Forte 2022, Luhmann 1981, Ferreira 2026), hairline-separated, each distinct, not identical icon cards.
8. **End.** The archive closes. Sign-off card: ITASIA302 · personal project · May 2026.

## 7. Real data

The real graph lives in `vault_graph.json` (1,471 nodes, 4,247 edges, fields include `title`, `key`, `group`, `linksCount`). You MAY parse it to pull **real note titles and counts** to print on cards in beat 6, which makes the pipeline concrete and honest. Note: some `desc`/`title` fields contain em dashes; strip them. Do NOT render an abstract dot-graph of this data (that is the other build). Use it as printed text on cards.

## 8. The copy (verbatim, em dashes already removed)

Use this text. `*word*` marks an emphasized word (italic of the same serif; the single hottest word may take the red accent). Citations stay inline.

### Beat 0, Hero
- Eyebrow: `Project Overview · Initial Draft`
- Headline: Building a *Second Brain* (For Real This Time)
- Sub: The project in one walk-through. It covers what PKM is, why the hype around it is suspicious, what I am building, and where it is heading.

### Beat 1, PKM (`01 · PKM`)
- Headline: What is *PKM*?
- Body: Personal knowledge management, or PKM, is the set of steps a person uses to collect, organize, store, find, and share what they know. In simple terms, it means having a real system for your own knowledge instead of just hoping you will remember things later. The key idea is that the individual, not a company or an institution, is in charge of managing it.
- Aside (the habit is old): The term PKM comes from a 1999 working paper by Frand and Hixon. The practice goes back centuries, from Leonardo da Vinci's notebooks to Niklas Luhmann's Zettelkasten, a box of more than 90,000 linked index cards. In 1945, Vannevar Bush imagined the Memex, a desk that could store everything you read and let you find it again quickly (Bush, 1945).

### Beat 2, Second Brain (`02 · Second Brain`)
- Headline: And a *second brain*?
- Body: If PKM is the general idea, the second brain is its most famous version. It is an external, digital place where you keep the ideas and information you collect. But storage by itself is not the point. Tiago Forte describes it as a system that "expands our memory and our intellect using the modern tools of technology and networks." A folder full of saved articles is just a digital attic. A second brain is meant to be a thinking partner.
- Quote (the extended mind): In their 1998 paper "The Extended Mind", Andy Clark and David Chalmers argued that thinking does not only happen inside the head. If Otto trusts his notebook and uses it all the time, it becomes a real part of his mind. Moving information into a system you trust is not laziness, it is cognitive extension. (Clark and Chalmers, 1998)

### Beat 3, The Hype (`03 · The Hype`)
- Headline: Everyone is *selling* a brain
- Body: Spend any time in the productivity side of the internet and someone will try to sell you a brain. Forte's book was a bestseller. A whole industry of creators shows off note-taking systems with the energy people usually save for skincare routines. The newest promise is that AI will finally make it effortless. Whether any of it actually *works* is treated as a separate, slightly awkward question.
- Failure mode 1, The Productivity Trap: the system needs so much care you spend more time maintaining it than using it.
- Failure mode 2, The Collecting Habit: saving articles you will never reopen, until the second brain becomes a digital attic.

### Beat 4, The Meme (`04 · The Meme`)
- Quote: The people who promote "second brains" often still cannot remember where their own car keys are. The partner who quietly tracks the keys, the glasses, and the appointments was the original second brain all along. (based on the "second brain" meme by @nunoei, paraphrased)
- Body (motivation): I came to this not through theory but through failure. For years, organizing my notes was a job for Future Me, who never showed up. My vault turned into a beautifully tagged graveyard. The industry's answer is always the next template, the next app, the next setup. The meme deserves a real answer, and so does the question under it: is the failure mine, or the *method's*? That is the whole reason for this project.

### Beat 5, What I'm building (`05`)
- Headline: A second brain that actually *helps me think*
- Body: I am not building a fancier filing cabinet. I am building a system where small, single-idea notes connect into arguments, and where the question *"do I really understand this?"* has a clear, structural answer. Most PKM advice focuses on capture, getting everything in. But what decides whether a system works is retrieval, getting the right idea back out the moment you are thinking. So the project puts retrieval first, then tests that idea honestly.

### Beat 6, The pipeline (`06 · Current State`), CENTERPIECE
- Headline: Where I *am* now
- Intro: A paper enters through Zotero. It becomes a structured literature note in Obsidian. Claude Code runs a NotebookLM integration to extract candidate atoms. Verified atoms land in the vault, cluster into molecules, and synthesize into alloys tracked in Notion. This is that vault, in full.
- Step 01 · Zotero: Capture *the paper*. Every source enters through Zotero. PDF attached, metadata extracted, citekey auto-generated (`authorYEAR`). A structured import note drops into the vault inbox.
- Step 02 · Obsidian: Process into a *literature note*. The import becomes a structured markdown note (`@FERREIRA2026.md`). Four sections always: Main Argument, Methodology, Key Findings, Atoms Extracted. The single source of truth downstream.
- Step 03 · Claude + NotebookLM: Extract atoms via *NotebookLM*. Claude Code reads the note, opens the PDF, runs the NotebookLM integration. Focused queries return candidate atoms. Each is verified against the source; verified atoms saved, rejected ones logged with reasons.
- Step 04 · Atoms: Verified atoms *land in the vault*. Each becomes its own file; the filename is the claim as a full declarative sentence, findable by search alone. The vault holds 1,471 notes across thesis topics.
- Step 05 · Molecules: Atoms *cluster into molecules*. When 2 to 5 atoms share a theme, they pull into a molecule: a connection note with no new claims, only relations.
- Step 06 · Alloys: Molecules fuse into *alloys*. An alloy is a thesis-grade synthesis, an original argument built from molecules and atoms. It can never be drafted directly from a source. Alloys are where the research output lives.
- Step 07 · Notion: Alloys surface in *Notion*. Each alloy becomes a thesis chapter draft or a fieldwork milestone. Obsidian is the brain; Notion is the calendar.

### Beat 7, Thesis (`07`)
- Working thesis (display): Retrieval-first organization explains why generic PKM templates *fail* in domain-expert workflows.
- Source 01 · Bestseller: Tiago Forte, *Building a Second Brain* (2022). The bestseller that popularized the capture-first method. The project argues against it; it is here as the main thing studied, not as research.
- Source 02 · Historical anchor: Niklas Luhmann, "Communicating with Slip Boxes" (1981, Eng. tr.). Luhmann's own account of his Zettelkasten. Retrieval-first thinking is older than the apps now selling it.
- Source 03 · Current angle: Ferreira (2026), on retrieval-first organization. Gives the project its main angle.

### Beat 8, End
- `08 · End` — ITASIA302 · personal project · May 2026

### Works cited
Aal and Rüller (2025); Bush (1945), As We May Think, The Atlantic; Clark and Chalmers (1998), The Extended Mind, Analysis 58(1); Drucker (1968); Forte (2022), Building a Second Brain, Atria Books; Frand and Hixon (1999), UCLA Anderson working paper; Jones and Teevan (2007), Personal Information Management, U. Washington Press.

## 9. Anti-slop gates (pass before shipping)

This register has its own clichés. Avoid them:
- No fake torn-paper / coffee-stain / pushpin clipart kitsch. The paper world must be precise and designed, not a scrapbook sticker pack.
- No skeuomorphic drop-shadow overload. Shadows are soft, warm, and minimal.
- No generic Notion-template look, no Material cards, no identical card grid.
- No serif-for-headline-and-Arial-for-body default. Both faces are chosen with intent.
- The accent is ink, used rarely. If red is everywhere, it has failed.
- Motion must be motivated. Cards move because the argument moves, not for decoration.

Run the slop test at two altitudes: first-order (could the look be guessed from "knowledge tool"? then craft must differentiate), second-order (is it the obvious anti-default? push to a real point of view). The slip-box-as-physical-archive, executed with print-grade control, is the point of view.

## 10. Technical constraints

- Single self-contained HTML file (`second_brain_B.html`). CDNs allowed: GSAP 3.12 + ScrollTrigger, Google Fonts. WebGL is allowed only for a small local effect, never as the persistent backdrop field.
- Scroll engine: one global progress drives mutually exclusive beats; beat 6 gets about 8 to 10x scroll length. Sticky/pinned sections are fine.
- 60fps. Cancel `requestAnimationFrame` on tab hide. Responsive (cards reflow to a single column on mobile). A `prefers-reduced-motion` branch that keeps comprehension and drops large motion.
- Preview gotcha that will waste hours if unknown: headless preview tabs run with the page hidden, which PAUSES `requestAnimationFrame` and stalls CSS transitions, so motion and staggered reveals look frozen in screenshots and `window.innerHeight` can read 0. Verify motion in a real, focused browser tab. Expose a small JS hook to force the final state of any scroll position (set progress, apply end states synchronously) so a paused tab can still be screenshotted for layout QA. Do not "fix" animation that is only frozen because the tab is paused.

## 11. Process

Plan the visual and motion direction, build it in one cohesive file, then verify in a real browser. The narrative and copy (Section 8) are fixed. Everything about the visual and motion language is open, as long as it obeys Section 2 (stay light, paper, card-based, no particle field) and passes Section 9.
