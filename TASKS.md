# ITASIA302 Website — Central Task Database

> **Commands:**
> - "Create a new task" → adds task here
> - "Recap me the tasks" → shows all tasks, asks what to work on
> - "Work on task [ID]" → picks up that task, asks questions / proceeds
> - "Mark task [ID] done" → updates status

---

## Active Tasks

### TASK-001: Enrich Research Viz Nodes
- **Status**: 🟡 In Progress
- **Priority**: Medium
- **Page**: `about/research-viz.html`
- **Detail file**: `about/NODE-ENRICHMENT-TODO.md`
- **Description**: Walk through all 66 nodes across 4 chapters. For each node: improve title, add personal story/experience, add optional image/visual. Interactive Q&A — Claude asks, user answers, content gets saved.
- **Progress**: Chapter 0 complete (13 enriched, 3 deferred: nodes 1, 2, 17); 1 deleted (node 18). Chapters 1–3 not started. ~50 remaining.
- **Created**: 2026-05-09

### TASK-002: Fix Grammar — Homepage
- **Status**: ✅ Done
- **Priority**: Low
- **Page**: `index.html`
- **Description**: Line 630: "consisting coursework" → "consisting of coursework"
- **Created**: 2026-05-09
- **Completed**: 2026-05-11 (absorbed into TASK-006)

### TASK-003: TikTok Thumbnail Images
- **Status**: ✅ Done
- **Priority**: Medium
- **Page**: `about/index.html`
- **Description**: 10 TikTok cards have empty `<img src="" alt="">`. Need actual thumbnail URLs or remove empty img tags.
- **Created**: 2026-05-09
- **Completed**: 2026-05-12

### TASK-005: Week 4 Reading Response
- **Status**: ✅ Done
- **Priority**: 🔴 High (due next week)
- **Page**: `reading-response/` (new page, same style as Week 3)
- **Description**: Read assigned paper (user to provide), write reading response, build webpage matching existing Week 3 design in `reading-response/index.html`. Link from `class-assignments/index.html`.
- **Subtasks**:
  - [x] User provides paper title/link/PDF
  - [x] Read and analyze paper
  - [x] User writes/dictates response content
  - [x] Build webpage matching Week 3 style
  - [x] Add card to class-assignments hub
- **Created**: 2026-05-09
- **Completed**: 2026-05-12

### TASK-007: Week 11 Reading Response
- **Status**: ✅ Done
- **Priority**: 🔴 High
- **Page**: `reading-response/week-11/index.html` (new)
- **Description**: Reading response on technofascism. Main reading Coeckelbergh (2026); commentaries Gonzalez (2026) and Moellers (2025). Reading order Gonzalez → Coeckelbergh → Moellers. Field spine: GIGA School + Google for Education as Coeckelbergh's corporatist alliance / algorithmic governance in the classroom. Theory-only (no new fieldwork), measured/ambivalent tone. No em-dashes. All pull-quotes verified verbatim against PDFs via NotebookLM (NLM integration pass, 2026-07-01).
- **Subtasks**:
  - [x] Process 3 sources through NLM (atoms in Obsidian vault)
  - [x] Confirm angle, fieldwork mode, stance with user
  - [x] Build week-11 page in house "Scientific Sublime" style (amber signal accent)
  - [x] Wire nav: os.js route + alias + latest, class-assignments card, home latest card
  - [ ] User revises draft prose into own voice, then commit
- **Created**: 2026-07-01
- **Completed**: 2026-07-01 (draft; awaiting user's voice pass)

### TASK-008: Week 12 Reading Response
- **Status**: 🟡 In Progress
- **Priority**: 🔴 High
- **Page**: `reading-response/week-12/index.html` (new)
- **Description**: Reading response on Hughes (2026), "The political theory of techno-colonialism" (single reading). Angle confirmed with user: the terra nullius fallacy. Hughes shows the frontier is never actually empty (UNCLOS ocean law, French Polynesia); ed-tech policy talks the same way about classrooms (pilots, sandboxes, blank canvas) while classrooms are inhabited land (teachers' existing knowledge, TPACK acquisition pathways). Field spine: GIGA rollout + BMA pilot schools; the implementation gap as the price of the fallacy. Careful nuance per Hughes's own warning against over-stretching settler-colonial theory (p.79): Bangkok is not a colony, comparison is non-deficit, asymmetry is a condition not a verdict. Amber accent kept from Week 11 (continuity: same cast, Thiel). No em-dashes. All pull-quotes verified verbatim against PDF via NotebookLM (NLM integration pass, 2026-07-08).
- **Subtasks**:
  - [x] Process HUGHES2026 through NLM (16 atoms in Obsidian vault, 2026-07-08)
  - [x] Confirm angle + accent with user (terra nullius; amber)
  - [x] Build week-12 page in house "Scientific Sublime" style
  - [x] Wire nav: os.js route + alias + latest, class-assignments card, home latest card
  - [ ] User revises draft prose into own voice, then commit
- **Created**: 2026-07-08

### TASK-009: Personal Project — Develop Against Course Rubric
- **Status**: 🟡 In Progress
- **Priority**: 🔴 High
- **Page**: `personal-project/index.html`
- **Description**: Develop the second-brain personal project site against the ITASIA302 assessment criteria (course-theme connection, course-content connection, academic rigor, sources, genre expectations, feedback incorporation). Course uses history as anchor discipline.
- **Subtasks**:
  - [x] Historical anchor section: new section 01 with interactive 5-station timeline (commonplace books → card index → memex → Luhmann → PKM+AI); sections renumbered 01–08; refs added (Blair 2010, Krajewski 2011, Bush 1945, Luhmann 1981) (2026-07-26)
  - [ ] User revises section 01 draft prose into own voice
  - [ ] Course-cluster bridge: connect intro/synthesis to Attention + AI-and-Culture clusters (deepen @nunoei cognitive-labor thread)
  - [ ] Critical AI reflection: section on where the pipeline failed (rejected atoms, hallucinated claims caught in verification) — learning goal 5
  - [ ] Incorporate instructor/peer feedback once received (rubric criterion)
  - [ ] Housekeeping: archive 5 legacy `second_brain_*.html` drafts (or move to `/archive/`)
- **Created**: 2026-07-26

### TASK-004: Add .gitignore
- **Status**: ⬜ Not Started
- **Priority**: Low
- **Page**: root
- **Description**: `.superpowers/` brainstorm artifacts getting tracked. Add `.gitignore` to exclude them.
- **Created**: 2026-05-09

### TASK-006: UI/UX Polish Pass
- **Status**: 🟡 In Progress
- **Priority**: Medium
- **Pages**: All (`index.html`, `about/index.html`, sub-pages)
- **Description**: Comprehensive UI/UX audit and improvements using ui-ux-pro-max design intelligence.
- **Subtasks**:
  - [x] Body `line-height` 1.45 → 1.6 on all 6 pages
  - [x] Fix footer dates: "April 2026" → "May 2026" (homepage, class-assignments, personal-project, ai-statement topbar+footer)
  - [x] Fix grammar: "consisting coursework" → "consisting of coursework" (absorbs TASK-002)
  - [x] Add explicit `cursor: pointer` to `.card` in `index.html`
  - [x] Add `:active` press state to cards for mobile tap feedback
  - [ ] Replace emoji placeholders in TikTok cards with proper SVG icons (links to TASK-003)
- **Created**: 2026-05-11

---

## Completed Tasks

(none yet)

---

## Source Folders
- **Vault**: `~/Desktop/10-Academic/30-Resources/Obsidian/Takumi's Vault/`
  - `Sources/Literature Sources/` — paper notes (@AUTHOR_YEAR.md)
  - `Atoms/` — atomic Zettelkasten notes (TPACK, AI, EdTech findings)
  - `Molecules/` — connected ideas
  - `Alloys/` — synthesized concepts
  - `Class Notes/` — lecture notes
- **Downloads**: `~/Downloads/` — PDFs, presentations, seminar docs
- **Desktop Academic**: `~/Desktop/10-Academic/` — organized academic files
- **Project**: `~/Documents/GitHub/ITASIA302-Takumi/` — website repo

## Dev Server
- **URL**: `http://localhost:8080`
- **Start**: `cd ~/Documents/GitHub/ITASIA302-Takumi && npx -y live-server --port=8080 --no-browser`
- Auto-refreshes browser on file changes. Navigate freely between pages.

## Notes
- Footer dates say "April 2026" — consider updating to current month
- `about/index.html` had macOS xattr blocking edits — cleared 2026-05-09
- Research viz iframe src already fixed to `research-viz.html`
