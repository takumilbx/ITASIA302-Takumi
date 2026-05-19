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
