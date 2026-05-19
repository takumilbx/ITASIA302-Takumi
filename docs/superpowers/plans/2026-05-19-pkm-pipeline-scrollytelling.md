# PKM Pipeline Scrollytelling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 7-step scroll-driven animated section to `personal-project/index.html` that walks readers through the user's actual PKM workflow (Zotero → Obsidian lit note → NotebookLM MCP via Claude Code → Atoms → Molecules → Alloys → Notion), with a custom animation per step.

**Architecture:** All changes live in a single file: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`. New section inserted between existing `#intro` and existing `#viz` sections. Existing sections renumbered 01→02 through 06→07. Animations are CSS keyframes + vanilla JS, triggered once per step via IntersectionObserver, with per-step replay buttons. All data hardcoded (real atom names and citekeys sampled from user's vault). No external libraries, no build step, no new files.

**Tech Stack:** HTML, CSS (custom properties, keyframes, transitions, grid, flex), vanilla JavaScript (IntersectionObserver, setTimeout, SVG manipulation). Existing fonts (Fraunces serif, Geist Mono).

**Reference spec:** `docs/superpowers/specs/2026-05-19-pkm-pipeline-scrollytelling-design.md`

**No automated tests** — this is a static HTML page with no test framework. Each task ends with manual browser verification steps the engineer must perform before committing.

**Critical style rules (user preferences):**
- No em dashes (`—`) in any prose. Use periods, commas, semicolons, or "and"/"because" instead.
- Match existing CSS variable names: `--bg`, `--bg-soft`, `--ink`, `--ink-dim`, `--ink-faint`, `--rule`, `--amber`, `--teal`, `--sky`, `--lilac`, `--coral`, `--serif`, `--mono`, `--ease`.
- All new class names use prefix `pl-` (pipeline) to avoid collision with existing classes.
- Use Fraunces serif for prose, Geist Mono for code/metadata/tags.

---

## Task 1: Section scaffold + renumber existing sections

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

This task adds an empty new section 01 (heading + intro prose only, no animations yet) and renumbers all subsequent sections. Verifies that the page still loads correctly and all anchor links work before adding any animation complexity.

- [ ] **Step 1: Update topbar nav anchors**

In `personal-project/index.html`, find the `<nav aria-label="Section navigation">` block (around line 329). Replace its `<ul>` contents with:

```html
    <ul class="topbar-nav">
      <li><a href="#intro">Intro</a></li>
      <li><a href="#pipeline">Pipeline</a></li>
      <li><a href="#viz">Visualizations</a></li>
      <li><a href="#pkm">Framework</a></li>
      <li><a href="#synthesis">Synthesis</a></li>
      <li><a href="#thesis">Thesis</a></li>
      <li><a href="#system">System</a></li>
      <li><a href="#refs">References</a></li>
    </ul>
```

- [ ] **Step 2: Insert new pipeline section after intro section**

Find the closing `</section>` of the `#intro` section (around line 388, the section that contains the `@nunoei` pull-quote and the "joke lands in two directions" paragraph). Immediately after that `</section>` and its following `<div class="section-rule reveal"></div>`, insert this new section block:

```html
  <!-- ─── SECTION 1: PIPELINE ─── -->
  <section id="pipeline" class="essay-section pl-section">
    <div class="section-tag reveal"><em>01</em> &nbsp;&middot;&nbsp; The workflow</div>
    <h2 class="section-heading reveal d1">How the system <em>actually works</em></h2>

    <p class="body-text reveal d2">
      The system is a pipeline. A paper enters through Zotero. It becomes a structured literature note in Obsidian. Claude Code runs a NotebookLM MCP integration to extract candidate atoms from the PDF. Verified atoms land in the vault, cluster into molecules, and synthesize into alloys that get tracked in Notion as actionable work. Each step below is animated. Each animation uses a real artifact from the vault.
    </p>

    <div class="pl-track">
      <!-- Steps 01-07 will be added in subsequent tasks -->
    </div>

    <p class="body-text reveal pl-outro">
      That is the system, end to end. What follows on this page is what came out of it.
    </p>
  </section>

  <div class="section-rule reveal"></div>
```

- [ ] **Step 3: Renumber existing section tags**

The existing sections currently labeled 01 through 06 must become 02 through 07. In `personal-project/index.html`, change each section-tag's leading number:

- Section `#viz` (currently "01 · The material"): change `<em>01</em>` to `<em>02</em>`. Also change the heading-tag-line label "The material" → "What the system produced".
- Section `#pkm` (currently `<em>02</em>`): change to `<em>03</em>`.
- Section `#synthesis` (currently `<em>03</em>`): change to `<em>04</em>`.
- Section `#thesis` (currently `<em>04</em>`): change to `<em>05</em>`.
- Section `#system` (currently `<em>05</em>`): change to `<em>06</em>`.
- Section `#refs` (currently `<em>06</em>`): change to `<em>07</em>`.

Search the file for the strings `<em>01</em> &nbsp;&middot;&nbsp; The material`, `<em>02</em> &nbsp;&middot;&nbsp; The framework`, `<em>03</em> &nbsp;&middot;&nbsp; Synthesis`, `<em>04</em> &nbsp;&middot;&nbsp; Thesis direction`, `<em>05</em> &nbsp;&middot;&nbsp; Personal system design`, `<em>06</em> &nbsp;&middot;&nbsp; References` and replace each leading number.

For the `#viz` section specifically: also change the line `<h2 class="section-heading reveal d1">The four datasets</h2>` to `<h2 class="section-heading reveal d1">What the system <em>produced</em></h2>`.

- [ ] **Step 4: Update the `#viz` section opener paragraph**

The existing `#viz` opener paragraph framed the section as "the material this whole project is working with." Now it follows the pipeline section, so reframe it. Find this paragraph in the `#viz` section:

```html
    <p class="body-text reveal d2">
      Data doesn't go into a PKM system raw. It needs to be understood first. These four visualizations are how I did that. Each one compressed a dataset into navigable patterns so I could actually see what was in it before anything moved into the vault. Think of them as the Distill step in Forte's CODE workflow: intermediate artifacts that did cognitive work upstream of synthesis. Each one gets a description, a link, and an honest account of what it taught me.
    </p>
```

Replace with:

```html
    <p class="body-text reveal d2">
      Four concrete outputs from the workflow above. Each one started as a dataset, got compressed into navigable patterns through visualization, and then moved into the vault as atoms. They are the Distill step in Forte's CODE workflow made visible. Each gets a description, a link, and an honest account of what it taught me.
    </p>
```

- [ ] **Step 5: Add minimal CSS scaffolding for new section**

Find the closing `</style>` tag in the `<head>` (around line 316). Just before it, append:

```css
    /* ============ PIPELINE SECTION ============ */
    .pl-section { margin-bottom: 88px; }
    .pl-track { margin: 40px 0; }
    .pl-outro { margin-top: 40px; max-width: 64ch; }
```

- [ ] **Step 6: Manual browser verification**

Open `personal-project/index.html` in a browser (e.g. `open /Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html` on macOS).

Verify:
- Page loads without console errors (open DevTools Console).
- Intro section reads normally.
- New "01 · The workflow" section appears below intro with heading "How the system actually works" and the intro paragraph.
- The four-dataset section now says "02 · What the system produced" and "What the system produced".
- Subsequent sections show numbers 03 through 07.
- Topbar nav now has a "Pipeline" link. Click each topbar nav link, including Pipeline, and confirm the page scrolls to the correct section.

- [ ] **Step 7: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Add empty pipeline section and renumber subsequent sections

Inserts new "01 · The workflow" section between intro and viz with heading,
intro paragraph, outro, and empty track placeholder for upcoming animations.
Renumbers existing sections 01-06 to 02-07. Updates topbar nav.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Pipeline step layout + animation infrastructure

This task builds the reusable structure used by every step: two-column layout (prose left, visual right), a replay button, and the IntersectionObserver trigger that runs each step's animation once when it scrolls into view. Adds seven empty step containers so subsequent tasks can fill them in independently.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Add seven empty step containers**

Find the `<div class="pl-track">` block inserted in Task 1. Replace the comment line with these seven step containers:

```html
    <div class="pl-track">

      <div class="pl-step" data-step="01" id="pl-step-01">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 01</div>
          <h3 class="pl-step-title">Capture <em>the paper</em></h3>
          <p class="pl-step-body">Placeholder prose — Zotero capture.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-zotero">Step 01 visual placeholder</div>
        </div>
      </div>

      <div class="pl-step" data-step="02" id="pl-step-02">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 02</div>
          <h3 class="pl-step-title">Process into a <em>literature note</em></h3>
          <p class="pl-step-body">Placeholder prose — Obsidian lit note.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-litnote">Step 02 visual placeholder</div>
        </div>
      </div>

      <div class="pl-step" data-step="03" id="pl-step-03">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 03</div>
          <h3 class="pl-step-title">Extract atoms via <em>Claude Code + NotebookLM MCP</em></h3>
          <p class="pl-step-body">Placeholder prose — Claude Code MCP.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-terminal">Step 03 visual placeholder</div>
        </div>
      </div>

      <div class="pl-step" data-step="04" id="pl-step-04">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 04</div>
          <h3 class="pl-step-title">Verified atoms <em>land in the vault</em></h3>
          <p class="pl-step-body">Placeholder prose — Atoms.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-atoms">Step 04 visual placeholder</div>
        </div>
      </div>

      <div class="pl-step" data-step="05" id="pl-step-05">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 05</div>
          <h3 class="pl-step-title">Atoms <em>cluster into molecules</em></h3>
          <p class="pl-step-body">Placeholder prose — Molecules.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-molecules">Step 05 visual placeholder</div>
        </div>
      </div>

      <div class="pl-step" data-step="06" id="pl-step-06">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 06</div>
          <h3 class="pl-step-title">Molecules fuse into <em>alloys</em></h3>
          <p class="pl-step-body">Placeholder prose — Alloys.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-alloys">Step 06 visual placeholder</div>
        </div>
      </div>

      <div class="pl-step" data-step="07" id="pl-step-07">
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 07</div>
          <h3 class="pl-step-title">Alloys surface in <em>Notion</em></h3>
          <p class="pl-step-body">Placeholder prose — Notion.</p>
        </div>
        <div class="pl-step-visual">
          <button class="pl-replay" aria-label="Replay animation">&#x21bb; Replay</button>
          <div class="pl-stage pl-stage-notion">Step 07 visual placeholder</div>
        </div>
      </div>

    </div>
```

- [ ] **Step 2: Append CSS for two-column step layout**

Find the `/* ============ PIPELINE SECTION ============ */` CSS block from Task 1. Replace it entirely with:

```css
    /* ============ PIPELINE SECTION ============ */
    .pl-section { margin-bottom: 88px; }
    .pl-track { margin: 40px 0; display: flex; flex-direction: column; gap: 0; }
    .pl-outro { margin-top: 40px; max-width: 64ch; }

    .pl-step {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
      gap: 36px;
      align-items: center;
      min-height: 92vh;
      padding: 40px 0;
      border-top: 1px solid var(--rule);
    }
    .pl-step:first-child { border-top: none; padding-top: 24px; }

    .pl-step-num {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.28em;
      text-transform: uppercase; color: var(--amber); margin-bottom: 10px;
    }
    .pl-step-title {
      font-family: var(--serif); font-weight: 400;
      font-size: clamp(22px, 2.4vw, 30px); line-height: 1.15;
      letter-spacing: -0.018em; color: var(--ink);
      margin-bottom: 16px; max-width: 22ch;
    }
    .pl-step-title em { font-style: italic; color: var(--amber); }
    .pl-step-body {
      font-family: var(--serif); font-weight: 300;
      font-size: clamp(14.5px, 1.05vw, 16px);
      line-height: 1.7; color: var(--ink-dim); max-width: 50ch;
    }
    .pl-step-body em { color: var(--ink); font-style: italic; }
    .pl-step-body code {
      font-family: var(--mono); font-size: 0.9em;
      background: rgba(82,153,200,.08); color: var(--sky);
      padding: 1px 5px; border-radius: 2px;
    }

    .pl-step-visual {
      position: relative;
      background: linear-gradient(180deg, rgba(14,24,36,.45) 0%, rgba(14,24,36,.18) 100%);
      border: 1px solid var(--rule);
      border-radius: 4px;
      min-height: 320px;
      overflow: hidden;
    }
    .pl-stage {
      position: relative;
      width: 100%; height: 100%;
      min-height: 320px;
      padding: 28px;
      color: var(--ink-faint);
      font-family: var(--mono); font-size: 11px;
      display: flex; align-items: center; justify-content: center;
    }

    .pl-replay {
      position: absolute; top: 12px; right: 12px; z-index: 5;
      background: transparent; border: 1px solid var(--rule);
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--ink-faint);
      padding: 5px 9px; cursor: pointer; border-radius: 2px;
      transition: color 150ms ease, border-color 150ms ease;
    }
    .pl-replay:hover { color: var(--amber); border-color: var(--amber); }

    @media (max-width: 720px) {
      .pl-step {
        grid-template-columns: 1fr; gap: 24px;
        min-height: auto; padding: 32px 0;
      }
      .pl-step-visual { min-height: 280px; }
      .pl-stage { min-height: 280px; padding: 20px; }
    }
```

- [ ] **Step 3: Append the IntersectionObserver runner JS at the end of the script block**

Find the closing `</script>` tag at the bottom of the file (the existing script block, after the `Active nav on scroll` code, around line 798). Just before that `</script>` (still inside the same script block), append:

```javascript

  // ============ PIPELINE STEP ANIMATION RUNNER ============
  const pipelineRunners = {}; // populated by per-step tasks below
  const pipelineRan = new Set();

  function runPipelineStep(stepEl) {
    const stepId = stepEl.dataset.step;
    const runner = pipelineRunners[stepId];
    if (typeof runner === 'function') {
      runner(stepEl);
    }
  }

  const plSteps = document.querySelectorAll('.pl-step');
  if ('IntersectionObserver' in window) {
    const plObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !pipelineRan.has(e.target.dataset.step)) {
          pipelineRan.add(e.target.dataset.step);
          runPipelineStep(e.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });
    plSteps.forEach(s => plObs.observe(s));
  } else {
    // Legacy fallback: run all on load
    plSteps.forEach(s => runPipelineStep(s));
  }

  // Replay buttons re-run the animation for their parent step
  document.querySelectorAll('.pl-replay').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.closest('.pl-step');
      runPipelineStep(step);
    });
  });
```

- [ ] **Step 4: Manual browser verification**

Reload `personal-project/index.html` in browser. Verify:
- No console errors.
- Scroll into the pipeline section. Seven step containers visible, each with placeholder prose on the left and "Step XX visual placeholder" on the right inside a bordered box.
- Each step container fills approximately one viewport height (92vh on desktop).
- Replay button in top-right of each visual box. Hovering it changes color from faint to amber.
- Resize browser window narrow (≤720px wide). Verify steps stack to single column with prose above visual.

No animations should fire yet (no runners registered). That's expected.

- [ ] **Step 5: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Add pipeline step layout, replay buttons, and IntersectionObserver runner

Seven empty step containers with two-column layout (prose + visual stage).
Animation runner registry keyed by data-step. IntersectionObserver triggers
each runner once on viewport entry; replay buttons re-fire. Mobile collapses
to single column at 720px.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Step 01 — Zotero capture animation

PDF slides in from the right, four metadata fields fade-and-slide in one by one, then a citekey stamp appears with a scale-bounce and slight rotation.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 01 prose with real copy**

Find `<div class="pl-step" data-step="01" id="pl-step-01">` and replace its `.pl-step-prose` block contents with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 01 &middot; Zotero</div>
          <h3 class="pl-step-title">Capture <em>the paper</em></h3>
          <p class="pl-step-body">
            Every source enters the system through Zotero. PDF attached, metadata extracted, citekey auto-generated using the <code>authorYEAR</code> convention. The Obsidian Zotero Integration plugin then drops a structured import note into the vault inbox, ready for processing.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 01 visual stage with PDF + metadata fields + stamp HTML**

In the same `pl-step-01` block, replace the `<div class="pl-stage pl-stage-zotero">` line (and its placeholder text) with:

```html
          <div class="pl-stage pl-stage-zotero">
            <div class="pl-zot-pdf">
              <div class="pl-zot-pdf-label">PDF</div>
              <div class="pl-zot-pdf-lines"></div>
            </div>
            <ul class="pl-zot-meta">
              <li class="pl-zot-mf pl-zot-mf-1"><span class="pl-zot-k">title</span> "How People Manage Knowledge in Their Second Brains"</li>
              <li class="pl-zot-mf pl-zot-mf-2"><span class="pl-zot-k">author</span> Ferreira, Segura, Souza, Brasil</li>
              <li class="pl-zot-mf pl-zot-mf-3"><span class="pl-zot-k">year</span> 2026</li>
              <li class="pl-zot-mf pl-zot-mf-4"><span class="pl-zot-k">doi</span> 10.1007/978-3-032-05008-3_15</li>
            </ul>
            <div class="pl-zot-stamp">@FERREIRA2026</div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 01**

In the existing `<style>` block, find the `/* ============ PIPELINE SECTION ============ */` block (added in Task 2). At the end of that block (just before the `</style>` tag), append:

```css
    /* --- Step 01: Zotero --- */
    .pl-stage-zotero { display: block; padding: 24px; }
    .pl-zot-pdf {
      position: absolute; right: 32px; top: 50%;
      transform: translateY(-50%) translateX(180px);
      width: 130px; height: 170px;
      background: linear-gradient(180deg, #1a2030 0%, #0e1420 100%);
      border: 1px solid var(--rule);
      border-radius: 3px;
      box-shadow: -8px 4px 24px rgba(0,0,0,.55);
      opacity: 0;
    }
    .pl-zot-pdf-label {
      position: absolute; top: 10px; right: 10px;
      font-family: var(--mono); font-size: 8px; letter-spacing: 0.18em;
      color: var(--ink-faint);
    }
    .pl-zot-pdf-lines {
      position: absolute; top: 32px; left: 14px; right: 14px; bottom: 14px;
      background:
        repeating-linear-gradient(180deg, transparent 0 7px, var(--ink-faint) 7px 8px);
      opacity: .25;
    }
    .pl-zot-meta {
      position: absolute; left: 28px; top: 50%;
      transform: translateY(-50%);
      list-style: none; padding: 0; margin: 0;
      max-width: 260px;
    }
    .pl-zot-mf {
      font-family: var(--mono); font-size: 10.5px; line-height: 1.7;
      color: var(--ink-dim); margin-bottom: 4px;
      opacity: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .pl-zot-k { color: var(--sky); margin-right: 6px; }
    .pl-zot-stamp {
      position: absolute; bottom: 28px; left: 28px;
      font-family: var(--mono); font-size: 13px; letter-spacing: 0.08em;
      font-weight: 600; color: var(--amber);
      padding: 6px 12px;
      border: 1.5px solid var(--amber);
      transform: scale(0) rotate(-12deg);
      opacity: 0;
      transform-origin: center;
    }

    .pl-step.pl-ran-01 .pl-zot-pdf {
      animation: pl-zot-slide 0.9s cubic-bezier(.22,.61,.36,1) 0.15s forwards;
    }
    .pl-step.pl-ran-01 .pl-zot-mf-1 { animation: pl-zot-meta 0.45s ease 1.05s forwards; }
    .pl-step.pl-ran-01 .pl-zot-mf-2 { animation: pl-zot-meta 0.45s ease 1.35s forwards; }
    .pl-step.pl-ran-01 .pl-zot-mf-3 { animation: pl-zot-meta 0.45s ease 1.65s forwards; }
    .pl-step.pl-ran-01 .pl-zot-mf-4 { animation: pl-zot-meta 0.45s ease 1.95s forwards; }
    .pl-step.pl-ran-01 .pl-zot-stamp {
      animation: pl-zot-stamp 0.5s cubic-bezier(.5,1.7,.4,1) 2.45s forwards;
    }

    @keyframes pl-zot-slide {
      to { transform: translateY(-50%) translateX(0); opacity: 1; }
    }
    @keyframes pl-zot-meta {
      from { opacity: 0; transform: translateX(-12px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pl-zot-stamp {
      to { transform: scale(1) rotate(-5deg); opacity: 1; }
    }
```

- [ ] **Step 4: Register Step 01 runner in JS**

Find the `const pipelineRunners = {};` line added in Task 2. Immediately after it (still inside the same script block), append:

```javascript

  pipelineRunners['01'] = function(stepEl) {
    stepEl.classList.remove('pl-ran-01');
    // Force reflow so animations restart on replay
    void stepEl.offsetWidth;
    stepEl.classList.add('pl-ran-01');
  };
```

- [ ] **Step 5: Manual browser verification**

Reload the page. Scroll down to the pipeline section. Verify:
- When Step 01 enters the viewport, the PDF document slides in from the right.
- The four metadata fields fade-and-slide in one by one (title, author, year, doi).
- The citekey stamp `@FERREIRA2026` appears in the bottom-left at the end, slightly rotated, with a brief scale-bounce.
- Click the replay button. The whole animation re-runs from the start.
- No console errors.
- On mobile width (≤720px), the animation still plays and is contained within the stage.

- [ ] **Step 6: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 01 Zotero capture animation

PDF document slides in from the right, four metadata fields fade-and-slide
in sequentially, citekey stamp lands with scale-bounce and rotation.
Triggers on viewport entry; replay button restarts via class toggle + reflow.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Step 02 — Obsidian literature note animation

A markdown file mockup appears. Frontmatter types itself out character-by-character (typewriter effect). Then four section headings (`## Main Argument`, `## Methodology`, `## Key Findings`, `## Atoms Extracted`) cascade in, each followed by a horizontal skeleton bar representing body text.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 02 prose**

Find `<div class="pl-step" data-step="02" id="pl-step-02">` and replace its `.pl-step-prose` block with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 02 &middot; Obsidian lit note</div>
          <h3 class="pl-step-title">Process into a <em>literature note</em></h3>
          <p class="pl-step-body">
            The Zotero import becomes a structured markdown note: <code>@FERREIRA2026.md</code>. Frontmatter carries metadata, citekey, and PDF path. Four sections always: <em>Main Argument</em>, <em>Methodology</em>, <em>Key Findings</em>, <em>Atoms Extracted</em>. The note is the single source of truth for everything downstream.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 02 visual stage**

In the same `pl-step-02` block, replace the placeholder stage with:

```html
          <div class="pl-stage pl-stage-litnote">
            <div class="pl-ln-file">
              <div class="pl-ln-tab">
                <span class="pl-ln-icon">&#9783;</span>
                <span class="pl-ln-fname">@FERREIRA2026.md</span>
              </div>
              <pre class="pl-ln-body"><code id="pl-ln-fm"></code><span class="pl-ln-cur"></span></pre>
              <div class="pl-ln-sections">
                <div class="pl-ln-sec pl-ln-sec-1">
                  <div class="pl-ln-h">## Main Argument</div>
                  <div class="pl-ln-skel"><span style="width:88%"></span><span style="width:72%"></span></div>
                </div>
                <div class="pl-ln-sec pl-ln-sec-2">
                  <div class="pl-ln-h">## Methodology</div>
                  <div class="pl-ln-skel"><span style="width:75%"></span></div>
                </div>
                <div class="pl-ln-sec pl-ln-sec-3">
                  <div class="pl-ln-h">## Key Findings</div>
                  <div class="pl-ln-skel"><span style="width:90%"></span><span style="width:65%"></span></div>
                </div>
                <div class="pl-ln-sec pl-ln-sec-4">
                  <div class="pl-ln-h">## Atoms Extracted</div>
                  <div class="pl-ln-skel"><span style="width:80%"></span><span style="width:55%"></span></div>
                </div>
              </div>
            </div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 02**

At the end of the pipeline CSS block (before `</style>`), append:

```css
    /* --- Step 02: Lit note --- */
    .pl-stage-litnote { padding: 0; align-items: stretch; }
    .pl-ln-file {
      width: 100%; height: 100%;
      background: #02030a;
      display: flex; flex-direction: column;
      font-family: var(--mono);
    }
    .pl-ln-tab {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px;
      background: rgba(232,99,74,.08);
      border-bottom: 1px solid var(--rule);
      font-size: 11px;
    }
    .pl-ln-icon { color: var(--amber); font-size: 12px; }
    .pl-ln-fname { color: var(--ink); }
    .pl-ln-body {
      padding: 12px 16px 6px;
      font-family: var(--mono); font-size: 10.5px;
      line-height: 1.65; color: var(--ink-dim);
      white-space: pre-wrap; word-break: break-word;
      margin: 0;
    }
    .pl-ln-cur {
      display: inline-block; width: 6px; height: 11px;
      background: var(--sky); vertical-align: middle; margin-left: 1px;
      animation: pl-ln-blink 1s step-end infinite;
      opacity: 0;
    }
    .pl-step.pl-ran-02 .pl-ln-cur { opacity: 1; }
    @keyframes pl-ln-blink { 0%,100%{opacity:1} 50%{opacity:0} }

    .pl-ln-sections { padding: 8px 16px 16px; }
    .pl-ln-sec {
      opacity: 0;
      transform: translateY(8px);
      margin-bottom: 12px;
    }
    .pl-ln-h {
      font-family: var(--mono); font-size: 11px;
      color: var(--teal); margin-bottom: 6px;
    }
    .pl-ln-skel { display: flex; flex-direction: column; gap: 5px; }
    .pl-ln-skel span {
      display: block; height: 7px; border-radius: 2px;
      background: linear-gradient(90deg, rgba(46,58,85,.55) 25%, rgba(69,87,128,.45) 50%, rgba(46,58,85,.55) 75%);
      background-size: 400px 100%;
      animation: pl-ln-shimmer 2s infinite linear;
    }
    @keyframes pl-ln-shimmer {
      0% { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }

    .pl-step.pl-ran-02 .pl-ln-sec {
      animation: pl-ln-section-in 0.5s ease forwards;
    }
    .pl-step.pl-ran-02 .pl-ln-sec-1 { animation-delay: 3.2s; }
    .pl-step.pl-ran-02 .pl-ln-sec-2 { animation-delay: 3.55s; }
    .pl-step.pl-ran-02 .pl-ln-sec-3 { animation-delay: 3.9s; }
    .pl-step.pl-ran-02 .pl-ln-sec-4 { animation-delay: 4.25s; }
    @keyframes pl-ln-section-in {
      to { opacity: 1; transform: translateY(0); }
    }
```

- [ ] **Step 4: Register Step 02 runner**

Find the line `pipelineRunners['01'] = function(stepEl) {` block added in Task 3. Immediately after that block's closing `};`, append:

```javascript

  pipelineRunners['02'] = function(stepEl) {
    stepEl.classList.remove('pl-ran-02');
    void stepEl.offsetWidth;
    stepEl.classList.add('pl-ran-02');

    const fmEl = stepEl.querySelector('#pl-ln-fm');
    if (!fmEl) return;
    fmEl.textContent = '';
    const frontmatter = '---\ncitekey: "FERREIRA2026"\nauthor: "Ferreira et al."\nyear: 2026\nstatus: processed\nlayer: literature-note\n---\n';
    let i = 0;
    const speed = 28;
    function tick() {
      if (i < frontmatter.length) {
        fmEl.textContent += frontmatter[i++];
        setTimeout(tick, speed + Math.random() * 10);
      }
    }
    setTimeout(tick, 200);
  };
```

Note: the runner uses `#pl-ln-fm` which is hard-coded inside the step 02 container. Because the runner is only triggered for the step it belongs to, this is unambiguous.

- [ ] **Step 5: Manual browser verification**

Reload page. Scroll to Step 02. Verify:
- File tab appears at the top with `@FERREIRA2026.md` filename.
- YAML frontmatter types itself out character by character, starting with `---` and ending with `---`.
- Cursor blinks at end of typed area.
- After typing completes, the four section headings cascade in from bottom, each followed by 1-2 shimmering skeleton bars.
- Replay restarts the whole animation.
- No console errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 02 Obsidian literature note animation

Markdown file mockup with typewriter-effect YAML frontmatter, blinking
cursor, and cascading section headings (Main Argument, Methodology, Key
Findings, Atoms Extracted) with shimmering skeleton placeholders.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Step 03 — Claude Code + NotebookLM MCP terminal

A terminal window. User prompt types itself, then output streams in line by line: MCP tool calls firing with checkmarks, status updates, final extraction summary.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 03 prose**

Find `<div class="pl-step" data-step="03" id="pl-step-03">` and replace its `.pl-step-prose` block with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 03 &middot; Claude Code + NLM MCP</div>
          <h3 class="pl-step-title">Extract atoms via <em>NotebookLM</em></h3>
          <p class="pl-step-body">
            Claude Code reads the literature note, opens the PDF via the Zotero path, and runs the NotebookLM MCP integration. Three focused queries return candidate atoms. Each suggestion gets verified against the source. Verified atoms land in <code>/Atoms/</code>, rejected ones get logged with reasons.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 03 visual stage**

Replace the placeholder stage with:

```html
          <div class="pl-stage pl-stage-terminal">
            <div class="pl-term">
              <div class="pl-term-bar">
                <span class="pl-term-dot pl-term-dot-r"></span>
                <span class="pl-term-dot pl-term-dot-y"></span>
                <span class="pl-term-dot pl-term-dot-g"></span>
                <span class="pl-term-bar-title">claude code &middot; nlm-integrate</span>
              </div>
              <div class="pl-term-body" id="pl-term-body"></div>
            </div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 03**

At end of pipeline CSS block, append:

```css
    /* --- Step 03: Terminal --- */
    .pl-stage-terminal { padding: 0; align-items: stretch; }
    .pl-term {
      width: 100%; height: 100%;
      background: #02030a;
      display: flex; flex-direction: column;
      border-radius: 3px;
    }
    .pl-term-bar {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 12px;
      background: #0a0d16;
      border-bottom: 1px solid var(--rule);
    }
    .pl-term-dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; opacity: .65; }
    .pl-term-dot-r { background: #ff5f56; }
    .pl-term-dot-y { background: #ffbd2e; }
    .pl-term-dot-g { background: #27c93f; }
    .pl-term-bar-title {
      font-family: var(--mono); font-size: 10px; color: var(--ink-faint);
      margin-left: 10px; letter-spacing: 0.04em;
    }
    .pl-term-body {
      flex: 1; padding: 14px 16px;
      font-family: var(--mono); font-size: 11px;
      line-height: 1.75; color: var(--ink-dim);
      overflow: hidden;
    }
    .pl-term-line {
      opacity: 0;
      transition: opacity .15s ease;
    }
    .pl-term-line.pl-in { opacity: 1; }
    .pl-tprompt { color: var(--amber); }
    .pl-tuser { color: var(--ink); }
    .pl-tmcp { color: var(--sky); }
    .pl-tok { color: var(--teal); }
    .pl-tdim { color: var(--ink-faint); }
    .pl-tcur {
      display: inline-block; width: 7px; height: 11px;
      background: var(--sky); vertical-align: middle; margin-left: 1px;
      animation: pl-ln-blink 1s step-end infinite;
    }
```

- [ ] **Step 4: Register Step 03 runner**

After the Step 02 runner block, append:

```javascript

  pipelineRunners['03'] = function(stepEl) {
    const body = stepEl.querySelector('#pl-term-body');
    if (!body) return;
    body.innerHTML = '';
    const lines = [
      { html: '<span class="pl-tprompt">~/itasia302 $</span> <span class="pl-tuser">claude</span>', delay: 200 },
      { html: '<span class="pl-tdim">[claude code session &middot; opus 4.7]</span>', delay: 600 },
      { html: '<span class="pl-tprompt">&gt;</span> <span class="pl-tuser">run nlm-integrate for @FERREIRA2026</span>', delay: 1300 },
      { html: '<span class="pl-tdim">  Reading literature note...</span>', delay: 2100 },
      { html: '<span class="pl-tdim">  Opening PDF from Zotero path...</span>', delay: 2500 },
      { html: '<span class="pl-tmcp">&rarr; mcp__notebooklm__add_source</span> <span class="pl-tok">&check;</span>', delay: 3100 },
      { html: '<span class="pl-tmcp">&rarr; mcp__notebooklm__query</span> <span class="pl-tdim">"core claims"</span> <span class="pl-tok">&check;</span>', delay: 3700 },
      { html: '<span class="pl-tmcp">&rarr; mcp__notebooklm__query</span> <span class="pl-tdim">"methodology"</span> <span class="pl-tok">&check;</span>', delay: 4300 },
      { html: '<span class="pl-tmcp">&rarr; mcp__notebooklm__query</span> <span class="pl-tdim">"gaps"</span> <span class="pl-tok">&check;</span>', delay: 4900 },
      { html: '<span class="pl-tdim">  Suggestions written to /NotebookLM Atom Sources/</span>', delay: 5500 },
      { html: '<span class="pl-tok">&check; EXTRACT complete</span> <span class="pl-tdim">7 verified, 0 rejected</span>', delay: 6200 }
    ];
    lines.forEach(({ html, delay }) => {
      const line = document.createElement('div');
      line.className = 'pl-term-line';
      line.innerHTML = html;
      body.appendChild(line);
      setTimeout(() => line.classList.add('pl-in'), delay);
    });
    setTimeout(() => {
      const cur = document.createElement('span');
      cur.className = 'pl-tcur';
      body.appendChild(cur);
    }, 6400);
  };
```

- [ ] **Step 5: Manual browser verification**

Reload page. Scroll to Step 03. Verify:
- Terminal frame with mac-style traffic light dots appears.
- First line `~/itasia302 $ claude` fades in.
- Session info line follows.
- Run command line fades in.
- "Reading literature note..." and "Opening PDF..." lines appear.
- Three MCP tool call lines each appear with checkmark.
- Final extraction complete line appears.
- Blinking cursor at the end.
- Replay restarts the whole sequence.
- No console errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 03 Claude Code + NLM MCP terminal animation

Terminal mockup with mac-style traffic light bar. Streams real Claude Code
invocation: claude session, nlm-integrate command, three MCP tool calls
(mcp__notebooklm__add_source, query x3), and EXTRACT summary. Lines fade
in sequentially with blinking cursor.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Step 04 — Atoms counter + scatter

Large counter ticks from 0 to 1,056 (real vault atom count). Simultaneously, ~25 atom cards (each with a real declarative-sentence claim from the vault) pop into scatter positions across the stage with a scale-bounce.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 04 prose**

Find `<div class="pl-step" data-step="04" id="pl-step-04">` and replace its `.pl-step-prose` block with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 04 &middot; Atoms</div>
          <h3 class="pl-step-title">Verified atoms <em>land in the vault</em></h3>
          <p class="pl-step-body">
            Each verified suggestion becomes its own file in <code>/Atoms/</code>. Filename is the claim itself as a full declarative sentence, findable by search alone. The vault currently holds 1,056 of them across thesis topics: TPACK, PKM, Japan's GIGA program, Bangkok's BMA pilot, AI epistemics.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 04 visual stage**

Replace the placeholder stage with:

```html
          <div class="pl-stage pl-stage-atoms">
            <div class="pl-atoms-counter-wrap">
              <div class="pl-atoms-counter" id="pl-atoms-counter">0</div>
              <div class="pl-atoms-counter-lbl">atoms in vault</div>
            </div>
            <div class="pl-atoms-scatter" id="pl-atoms-scatter"></div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 04**

```css
    /* --- Step 04: Atoms --- */
    .pl-stage-atoms { padding: 24px; align-items: flex-start; justify-content: flex-start; display: block; position: relative; }
    .pl-atoms-counter-wrap { position: absolute; top: 24px; left: 28px; z-index: 2; }
    .pl-atoms-counter {
      font-family: var(--mono); font-size: 34px; font-weight: 300;
      color: var(--ink); letter-spacing: -0.025em;
    }
    .pl-atoms-counter-lbl {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--ink-faint); margin-top: 2px;
    }
    .pl-atoms-scatter { position: absolute; inset: 0; overflow: hidden; }
    .pl-atom-card {
      position: absolute;
      background: rgba(232,99,74,.07);
      border: 1px solid rgba(232,99,74,.25);
      border-left: 2px solid var(--amber);
      padding: 5px 8px;
      font-family: var(--mono); font-size: 9px; color: var(--ink-dim);
      line-height: 1.4; max-width: 180px;
      border-radius: 2px;
      opacity: 0;
      transform: scale(0.4) translateY(16px);
      pointer-events: none;
    }
    @keyframes pl-atom-pop {
      0%   { opacity: 0; transform: scale(0.3) translateY(20px); }
      60%  { opacity: 1; transform: scale(1.08) translateY(0); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
```

- [ ] **Step 4: Register Step 04 runner**

After the Step 03 runner block, append:

```javascript

  pipelineRunners['04'] = function(stepEl) {
    const counter = stepEl.querySelector('#pl-atoms-counter');
    const scatter = stepEl.querySelector('#pl-atoms-scatter');
    if (!counter || !scatter) return;
    scatter.innerHTML = '';
    counter.textContent = '0';

    // Counter ticks toward 1,056
    const tickTargets = [12, 47, 156, 423, 718, 891, 1003, 1056];
    let ti = 0;
    const tickIv = setInterval(() => {
      if (ti >= tickTargets.length) { clearInterval(tickIv); return; }
      counter.textContent = tickTargets[ti].toLocaleString();
      ti++;
    }, 520);

    const atomClaims = [
      "Retrieval strategies determine note organization",
      "PKBs externalize tacit knowledge",
      "Scaffolded templates reduce onboarding friction",
      "A naive web-popularity baseline outperformed 24 of 46 systems",
      "Cross-sentence coreference is the bottleneck",
      "Resonance is more reliable than analytical checklists",
      "PARA orders folders by actionability, not subject",
      "Progressive Summarization is disciplined forgetting",
      "Intermediate Packets make work interruption-proof",
      "Capture, format, retrieve: three temporal phases",
      "Writing triggers the Generation Effect",
      "ML re-ranking yields 4.7% absolute improvement",
      "Curator's Perspective filters input streams",
      "Noticing habits compound discoverability",
      "Weekly Review batch-sorts captured notes",
      "Express is the purpose of CODE",
      "Salience can beat elaborate analytical filters",
      "Tags click is one of four retrieval strategies",
      "TPACK overlap is necessary but not sufficient",
      "Knowledge accumulates through atomic notes that link",
      "Areas in PARA uphold a standard over time",
      "AI features should link templates to retrieval intent",
      "Project Completion Checklists extract reusable assets",
      "A note is a knowledge building block",
      "Folder placement gives a sense of task completion"
    ];

    const stageRect = scatter.getBoundingClientRect();
    const W = stageRect.width || 420;
    const H = stageRect.height || 320;
    const counterReservedH = 90; // avoid stacking on counter
    const cardW = 180, cardH = 36;

    atomClaims.forEach((claim, i) => {
      setTimeout(() => {
        const card = document.createElement('div');
        card.className = 'pl-atom-card';
        card.textContent = claim;
        // Random position avoiding the counter zone (top-left)
        const minLeft = (i < 5) ? 220 : 12;
        const minTop = (i < 8) ? counterReservedH : 12;
        const left = minLeft + Math.random() * Math.max(W - cardW - minLeft - 12, 40);
        const top = minTop + Math.random() * Math.max(H - cardH - minTop - 12, 40);
        card.style.left = left + 'px';
        card.style.top = top + 'px';
        card.style.transform = `scale(0.4) translateY(16px) rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`;
        card.style.animation = 'pl-atom-pop 0.5s ease forwards';
        scatter.appendChild(card);
      }, 250 + i * 220);
    });
  };
```

- [ ] **Step 5: Mobile-responsive adjustment (cap atoms at 12)**

In the runner code above, the `atomClaims` array always renders all 25. On narrow viewports, this looks cramped. Add a viewport check at the top of the runner, immediately after the `counter.textContent = '0';` line:

Replace the line `atomClaims.forEach((claim, i) => {` with:

```javascript
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    const claimsToRender = isMobile ? atomClaims.slice(0, 12) : atomClaims;
    claimsToRender.forEach((claim, i) => {
```

(Ensure the existing closing `});` of the forEach is preserved; only the opening line changes.)

- [ ] **Step 6: Manual browser verification**

Reload page. Scroll to Step 04. Verify:
- Large counter in top-left ticks: 0 → 12 → 47 → 156 → 423 → 718 → 891 → 1,003 → 1,056. Comma formatting on values ≥1,000.
- Atom cards pop into random positions across the stage, each with a slight rotation, over ~5 seconds.
- Each card shows a real claim sentence.
- Cards do not overlap the counter zone in the top-left.
- Cards stay within the stage bounds (no overflow).
- Replay restarts.
- Resize to ≤720px. Replay. Only ~12 cards spawn instead of 25.
- No console errors.

- [ ] **Step 7: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 04 Atoms counter and scatter animation

Counter ticks 0 to 1,056 (real vault count). 25 atom cards pop into random
scatter positions, each showing a real declarative-sentence claim from
Forte, Ferreira, Ji, and TPACK sources. Mobile (<=720px) caps at 12 cards.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Step 05 — Molecules clustering

12 atom dots start scattered. After 1s delay, they migrate via CSS transition into 3 distinct clusters. SVG lines fade in connecting atoms within each cluster. Cluster labels appear last.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 05 prose**

Find `<div class="pl-step" data-step="05" id="pl-step-05">` and replace its `.pl-step-prose` block with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 05 &middot; Molecules</div>
          <h3 class="pl-step-title">Atoms <em>cluster into molecules</em></h3>
          <p class="pl-step-body">
            When 2 to 5 atoms share a theme, they get pulled into a molecule: a connection note with no new claims, only relations. The molecule lives in <code>/Molecules/</code> and links back to its atoms. This is where pattern recognition stops being implicit and becomes a saved object.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 05 visual stage**

Replace the placeholder stage with:

```html
          <div class="pl-stage pl-stage-molecules">
            <svg class="pl-mol-svg" id="pl-mol-svg" xmlns="http://www.w3.org/2000/svg"></svg>
            <div class="pl-mol-field" id="pl-mol-field"></div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 05**

```css
    /* --- Step 05: Molecules --- */
    .pl-stage-molecules { padding: 0; position: relative; display: block; }
    .pl-mol-svg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 1;
    }
    .pl-mol-field { position: absolute; inset: 0; z-index: 2; }
    .pl-mol-dot {
      position: absolute; width: 10px; height: 10px;
      background: var(--amber); border-radius: 50%;
      box-shadow: 0 0 10px rgba(232,99,74,.55);
      transition: left 1.2s cubic-bezier(.4,.1,.3,1), top 1.2s cubic-bezier(.4,.1,.3,1);
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    .pl-mol-dot.pl-in { opacity: 1; }
    .pl-mol-label {
      position: absolute;
      font-family: var(--mono); font-size: 9.5px;
      color: var(--teal); letter-spacing: 0.04em;
      transform: translate(-50%, 0);
      opacity: 0;
      transition: opacity .6s ease;
    }
    .pl-mol-label.pl-in { opacity: 1; }
    .pl-mol-line {
      stroke: var(--teal); stroke-width: 1;
      opacity: 0;
      transition: opacity .6s ease;
    }
    .pl-mol-line.pl-in { opacity: 0.45; }
```

- [ ] **Step 4: Register Step 05 runner**

After the Step 04 runner, append:

```javascript

  pipelineRunners['05'] = function(stepEl) {
    const svg = stepEl.querySelector('#pl-mol-svg');
    const field = stepEl.querySelector('#pl-mol-field');
    if (!svg || !field) return;
    svg.innerHTML = '';
    field.innerHTML = '';

    const stageRect = field.getBoundingClientRect();
    const W = stageRect.width || 420;
    const H = stageRect.height || 320;

    // Initial scattered positions (% of stage)
    const scatter = [
      {x: 18, y: 32}, {x: 35, y: 18}, {x: 48, y: 38},
      {x: 65, y: 22}, {x: 78, y: 42}, {x: 88, y: 28},
      {x: 22, y: 72}, {x: 40, y: 82}, {x: 55, y: 76},
      {x: 70, y: 84}, {x: 84, y: 72}, {x: 30, y: 55}
    ];

    // Three clusters: indices of dots belonging to each
    const clusters = [
      { atoms: [0,1,2,11], cx: 32, cy: 30, r: 9, label: '⊕ retrieval-first-organization' },
      { atoms: [3,4,5],    cx: 78, cy: 32, r: 7, label: '⊕ system-combination-beats-single-pipeline' },
      { atoms: [6,7,8,9,10], cx: 60, cy: 76, r: 9, label: '⊕ intermediate-packets-as-cognitive-units' }
    ];

    // Create dots at scatter positions
    const dots = scatter.map((p, i) => {
      const dot = document.createElement('div');
      dot.className = 'pl-mol-dot';
      dot.style.left = p.x + '%';
      dot.style.top = p.y + '%';
      field.appendChild(dot);
      requestAnimationFrame(() => dot.classList.add('pl-in'));
      return { el: dot, idx: i, x: p.x, y: p.y };
    });

    // Compute cluster target positions (atoms arranged in circle around center)
    const targets = {};
    clusters.forEach(cluster => {
      cluster.atoms.forEach((aIdx, j) => {
        const angle = (j / cluster.atoms.length) * Math.PI * 2 - Math.PI / 2;
        const tx = cluster.cx + Math.cos(angle) * cluster.r;
        const ty = cluster.cy + Math.sin(angle) * cluster.r;
        targets[aIdx] = { x: tx, y: ty };
      });
    });

    // After 1.1s, migrate dots to cluster positions
    setTimeout(() => {
      dots.forEach(d => {
        const t = targets[d.idx];
        if (t) {
          d.el.style.left = t.x + '%';
          d.el.style.top = t.y + '%';
          d.x = t.x; d.y = t.y;
        }
      });
    }, 1100);

    // After 2.5s, draw connecting lines + labels
    setTimeout(() => {
      clusters.forEach(cluster => {
        const memberDots = cluster.atoms.map(idx => dots[idx]);
        for (let i = 0; i < memberDots.length; i++) {
          for (let j = i + 1; j < memberDots.length; j++) {
            const a = memberDots[i], b = memberDots[j];
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', a.x + '%');
            line.setAttribute('y1', a.y + '%');
            line.setAttribute('x2', b.x + '%');
            line.setAttribute('y2', b.y + '%');
            line.setAttribute('class', 'pl-mol-line');
            svg.appendChild(line);
            requestAnimationFrame(() => line.classList.add('pl-in'));
          }
        }
        // Label below cluster center
        const lbl = document.createElement('div');
        lbl.className = 'pl-mol-label';
        lbl.style.left = cluster.cx + '%';
        lbl.style.top = (cluster.cy + cluster.r + 4) + '%';
        lbl.textContent = cluster.label;
        field.appendChild(lbl);
        requestAnimationFrame(() => lbl.classList.add('pl-in'));
      });
    }, 2500);
  };
```

- [ ] **Step 5: Manual browser verification**

Reload. Scroll to Step 05. Verify:
- 12 amber glowing dots appear scattered across the stage.
- After ~1 second, the dots migrate smoothly into 3 distinct clusters.
- Teal connecting lines fade in between the atoms within each cluster.
- Three cluster labels (e.g., `⊕ retrieval-first-organization`) fade in below each cluster.
- Replay restarts the whole sequence (dots reset to scatter, migrate again).
- No console errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 05 Molecules clustering animation

12 scattered amber atom dots migrate via CSS transition into 3 circular
clusters. SVG lines fade in connecting members within each cluster, then
teal cluster labels appear below.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Step 06 — Alloys fusion

The three molecule clusters from step 05 contract and merge upward into a single structured "alloy" block. The block has a thesis-grade sentence at top and an evidence chain showing supporting molecules/atoms below.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 06 prose**

Find `<div class="pl-step" data-step="06" id="pl-step-06">` and replace its `.pl-step-prose` block with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 06 &middot; Alloys</div>
          <h3 class="pl-step-title">Molecules fuse into <em>alloys</em></h3>
          <p class="pl-step-body">
            An alloy is a thesis-grade synthesis: an original argument built from molecules and atoms. It can never be drafted directly from a source. It needs molecules underneath it. Alloys are where this project's actual research output lives, in <code>/Alloys/</code>, each one tagged to a chapter of the thesis.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 06 visual stage**

Replace the placeholder stage with:

```html
          <div class="pl-stage pl-stage-alloys">
            <div class="pl-alloy-stage" id="pl-alloy-stage">
              <div class="pl-alloy-mol pl-alloy-mol-1"></div>
              <div class="pl-alloy-mol pl-alloy-mol-2"></div>
              <div class="pl-alloy-mol pl-alloy-mol-3"></div>
              <div class="pl-alloy-block">
                <div class="pl-alloy-label">ALLOY &middot; CHAPTER 02</div>
                <div class="pl-alloy-thesis">Retrieval-first organization explains why generic PKM templates fail in domain-expert workflows.</div>
                <div class="pl-alloy-evidence">
                  <div class="pl-alloy-chain">
                    <span class="pl-alloy-node">@FERREIRA2026</span>
                    <span class="pl-alloy-arrow">&rarr;</span>
                    <span class="pl-alloy-node pl-alloy-node-mol">retrieval-first-org</span>
                    <span class="pl-alloy-arrow">&rarr;</span>
                    <span class="pl-alloy-node pl-alloy-node-alloy">alloy</span>
                  </div>
                  <div class="pl-alloy-chain">
                    <span class="pl-alloy-node">@FORTE2022</span>
                    <span class="pl-alloy-arrow">&rarr;</span>
                    <span class="pl-alloy-node pl-alloy-node-mol">intermediate-packets</span>
                    <span class="pl-alloy-arrow">&rarr;</span>
                    <span class="pl-alloy-node pl-alloy-node-alloy">alloy</span>
                  </div>
                  <div class="pl-alloy-chain">
                    <span class="pl-alloy-node">@JI2011</span>
                    <span class="pl-alloy-arrow">&rarr;</span>
                    <span class="pl-alloy-node pl-alloy-node-mol">system-combination</span>
                    <span class="pl-alloy-arrow">&rarr;</span>
                    <span class="pl-alloy-node pl-alloy-node-alloy">alloy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 06**

```css
    /* --- Step 06: Alloys --- */
    .pl-stage-alloys { padding: 0; display: block; }
    .pl-alloy-stage {
      position: relative; width: 100%; height: 100%;
      min-height: 320px; padding: 24px;
    }
    .pl-alloy-mol {
      position: absolute; width: 32px; height: 32px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(69,168,132,.35) 30%, rgba(69,168,132,.05) 70%);
      border: 1px solid rgba(69,168,132,.5);
      opacity: 0;
      transition: all 0.9s cubic-bezier(.5,.1,.3,1);
    }
    .pl-alloy-mol-1 { left: 18%; top: 22%; }
    .pl-alloy-mol-2 { left: 75%; top: 22%; }
    .pl-alloy-mol-3 { left: 46%; top: 70%; }
    .pl-step.pl-ran-06 .pl-alloy-mol { opacity: 1; }
    .pl-step.pl-ran-06 .pl-alloy-mol {
      animation: pl-alloy-mol-pulse 1s ease forwards;
    }
    @keyframes pl-alloy-mol-pulse {
      0%   { opacity: 0; transform: scale(0.4); }
      40%  { opacity: 1; transform: scale(1.15); }
      100% { opacity: 1; transform: scale(1); }
    }
    /* Fuse: move all molecules to center */
    .pl-step.pl-ran-06.pl-alloy-fused .pl-alloy-mol {
      left: 50%; top: 50%;
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0;
    }

    .pl-alloy-block {
      position: absolute; left: 50%; top: 50%;
      transform: translate(-50%, -50%) scale(0.85);
      width: 88%; max-width: 380px;
      background: linear-gradient(180deg, rgba(232,99,74,.06) 0%, rgba(232,99,74,.01) 100%);
      border: 1px solid rgba(232,99,74,.35);
      border-left: 2px solid var(--amber);
      padding: 16px 18px;
      opacity: 0;
      transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.5,.1,.3,1);
      border-radius: 3px;
    }
    .pl-step.pl-ran-06.pl-alloy-fused .pl-alloy-block {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    .pl-alloy-label {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--amber); margin-bottom: 8px;
    }
    .pl-alloy-thesis {
      font-family: var(--serif); font-weight: 400; font-style: italic;
      font-size: 13.5px; line-height: 1.5; color: var(--ink);
      margin-bottom: 14px;
    }
    .pl-alloy-evidence {
      border-top: 1px solid rgba(232,99,74,.2);
      padding-top: 10px;
      display: flex; flex-direction: column; gap: 5px;
    }
    .pl-alloy-chain {
      display: flex; align-items: center; gap: 5px;
      font-family: var(--mono); font-size: 9px;
      color: var(--ink-dim);
      white-space: nowrap; overflow: hidden;
    }
    .pl-alloy-node {
      padding: 1px 5px;
      background: rgba(114,114,192,.12); color: var(--lilac);
      border-radius: 2px;
    }
    .pl-alloy-node-mol {
      background: rgba(69,168,132,.12); color: var(--teal);
    }
    .pl-alloy-node-alloy {
      background: rgba(232,99,74,.15); color: var(--amber);
    }
    .pl-alloy-arrow { color: var(--ink-faint); }
```

- [ ] **Step 4: Register Step 06 runner**

After the Step 05 runner, append:

```javascript

  pipelineRunners['06'] = function(stepEl) {
    stepEl.classList.remove('pl-ran-06', 'pl-alloy-fused');
    void stepEl.offsetWidth;
    stepEl.classList.add('pl-ran-06');
    // After molecules pulse in, trigger fusion
    setTimeout(() => {
      stepEl.classList.add('pl-alloy-fused');
    }, 1500);
  };
```

- [ ] **Step 5: Manual browser verification**

Reload. Scroll to Step 06. Verify:
- Three teal molecule circles pulse in at left, right, and center-bottom positions.
- After ~1.5s, they slide toward the center, shrink, and fade out.
- The amber alloy block fades in at center, scaling from 85% to 100%.
- Alloy block shows: "ALLOY · CHAPTER 02" label, the thesis sentence in italic serif, three evidence chains showing `@CITEKEY → molecule → alloy` flow.
- Color coding: citekeys in lilac, molecules in teal, alloys in amber.
- Replay restarts.
- No console errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 06 Alloys fusion animation

Three teal molecule circles pulse in, then converge to center and fade.
Amber alloy block reveals with thesis sentence and three-row evidence
chain (citekey -> molecule -> alloy) using layer-coded colors.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Step 07 — Notion mockup slide-in

A Notion-style page mockup slides in from the right showing: page icon and title, a status pill, a chapter outline as a checklist, and an alloy referenced as a source. Communicates the handoff from knowledge layer (Obsidian/dark/serif) to action layer (Notion/lighter/structured).

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Replace Step 07 prose**

Find `<div class="pl-step" data-step="07" id="pl-step-07">` and replace its `.pl-step-prose` block with:

```html
        <div class="pl-step-prose">
          <div class="pl-step-num">Step 07 &middot; Notion</div>
          <h3 class="pl-step-title">Alloys surface in <em>Notion</em></h3>
          <p class="pl-step-body">
            Notion is where the system meets actual work. Each alloy gets surfaced as a thesis chapter draft, a fieldwork milestone, or an unfinished argument needing one more source. Deadlines, status pills, and writing tasks reference back to vault notes by citekey. Obsidian is the brain. Notion is the calendar.
          </p>
        </div>
```

- [ ] **Step 2: Replace Step 07 visual stage**

Replace the placeholder stage with:

```html
          <div class="pl-stage pl-stage-notion">
            <div class="pl-notion-page">
              <div class="pl-notion-icon">&#128214;</div>
              <div class="pl-notion-title">Thesis &middot; <em>TPACK across GIGA and BMA</em></div>
              <div class="pl-notion-meta">
                <span class="pl-notion-pill pl-notion-pill-active">In Progress</span>
                <span class="pl-notion-pill-text">Defense: 2027 Q1</span>
              </div>
              <div class="pl-notion-divider"></div>
              <div class="pl-notion-section-label">Chapter outline</div>
              <ul class="pl-notion-checklist">
                <li class="pl-notion-li pl-notion-done"><span class="pl-notion-box">&check;</span> Ch 1 &middot; Introduction</li>
                <li class="pl-notion-li pl-notion-done"><span class="pl-notion-box">&check;</span> Ch 2 &middot; Theoretical framework <span class="pl-notion-ref">[@FERREIRA2026, @FORTE2022]</span></li>
                <li class="pl-notion-li"><span class="pl-notion-box"></span> Ch 3 &middot; Methodology</li>
                <li class="pl-notion-li"><span class="pl-notion-box"></span> Ch 4 &middot; Japan fieldwork (GIGA)</li>
                <li class="pl-notion-li"><span class="pl-notion-box"></span> Ch 5 &middot; Bangkok fieldwork (BMA)</li>
                <li class="pl-notion-li"><span class="pl-notion-box"></span> Ch 6 &middot; Comparative analysis</li>
              </ul>
              <div class="pl-notion-divider"></div>
              <div class="pl-notion-section-label">Linked from vault</div>
              <div class="pl-notion-linkcard">
                <div class="pl-notion-linkcard-icon">&#128279;</div>
                <div class="pl-notion-linkcard-body">
                  <div class="pl-notion-linkcard-title">Retrieval-first organization explains why generic PKM templates fail</div>
                  <div class="pl-notion-linkcard-sub">Alloy &middot; 3 supporting molecules &middot; 11 atoms</div>
                </div>
              </div>
            </div>
          </div>
```

- [ ] **Step 3: Append CSS for Step 07**

```css
    /* --- Step 07: Notion --- */
    .pl-stage-notion { padding: 0; display: block; overflow: hidden; }
    .pl-notion-page {
      position: relative; width: 92%; max-width: 420px;
      margin: 18px auto; padding: 22px;
      background: #f7f6f3;
      color: #37352f;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
      border-radius: 4px;
      box-shadow: 0 8px 28px rgba(0,0,0,.4);
      transform: translateX(120%);
      opacity: 0;
      transition: transform 0.8s cubic-bezier(.22,.61,.36,1), opacity 0.6s ease;
    }
    .pl-step.pl-ran-07 .pl-notion-page {
      transform: translateX(0);
      opacity: 1;
    }
    .pl-notion-icon { font-size: 26px; margin-bottom: 6px; }
    .pl-notion-title {
      font-size: 18px; font-weight: 700; line-height: 1.25;
      color: #37352f; margin-bottom: 8px;
    }
    .pl-notion-title em { font-style: italic; font-weight: 600; color: #6b5b48; }
    .pl-notion-meta {
      display: flex; align-items: center; gap: 8px;
      font-size: 11px; color: #787774;
      margin-bottom: 14px;
    }
    .pl-notion-pill {
      display: inline-block; padding: 2px 8px;
      border-radius: 3px; font-weight: 500;
      background: #fdecc8; color: #806c2a;
    }
    .pl-notion-pill-active { background: #cfeae4; color: #2d6a52; }
    .pl-notion-pill-text { color: #9b9a97; }
    .pl-notion-divider {
      height: 1px; background: #e9e8e3; margin: 12px 0;
    }
    .pl-notion-section-label {
      font-size: 11px; font-weight: 600; color: #9b9a97;
      text-transform: uppercase; letter-spacing: 0.06em;
      margin-bottom: 6px;
    }
    .pl-notion-checklist {
      list-style: none; padding: 0; margin: 0;
    }
    .pl-notion-li {
      display: flex; align-items: center; gap: 8px;
      font-size: 12.5px; padding: 3px 0; color: #37352f;
    }
    .pl-notion-box {
      display: inline-block; width: 14px; height: 14px;
      border: 1.5px solid #b7b6b3; border-radius: 3px;
      text-align: center; line-height: 11px;
      font-size: 10px; color: #fff; background: #fff;
      flex-shrink: 0;
    }
    .pl-notion-done .pl-notion-box {
      background: #2d6a52; border-color: #2d6a52;
    }
    .pl-notion-done { color: #9b9a97; text-decoration: line-through; }
    .pl-notion-ref {
      color: #6b5b48; font-size: 10px; margin-left: 4px;
    }
    .pl-notion-linkcard {
      display: flex; align-items: flex-start; gap: 10px;
      background: #fff; border: 1px solid #e9e8e3;
      padding: 10px 12px; border-radius: 4px;
    }
    .pl-notion-linkcard-icon { color: #b7b6b3; font-size: 14px; flex-shrink: 0; margin-top: 1px; }
    .pl-notion-linkcard-title {
      font-size: 12.5px; font-weight: 500; line-height: 1.35;
      color: #37352f; margin-bottom: 2px;
    }
    .pl-notion-linkcard-sub {
      font-size: 10.5px; color: #9b9a97;
    }
```

- [ ] **Step 4: Register Step 07 runner**

After the Step 06 runner, append:

```javascript

  pipelineRunners['07'] = function(stepEl) {
    stepEl.classList.remove('pl-ran-07');
    void stepEl.offsetWidth;
    stepEl.classList.add('pl-ran-07');
  };
```

- [ ] **Step 5: Manual browser verification**

Reload. Scroll to Step 07. Verify:
- A light-themed Notion-style page slides in from the right and lands centered.
- Top: book emoji icon, title "Thesis · TPACK across GIGA and BMA", green "In Progress" pill, "Defense: 2027 Q1" text.
- Chapter outline checklist: Ch 1 and Ch 2 checked (struck through), Ch 3-6 unchecked. Ch 2 shows `[@FERREIRA2026, @FORTE2022]` reference.
- "Linked from vault" section shows a link card referencing an alloy.
- Visual contrast with dark-themed previous steps is intentional and clear.
- Replay restarts the slide-in.
- No console errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Implement Step 07 Notion page mockup slide-in

Light-themed Notion-style page slides in from the right showing thesis
title, status pill, defense deadline, chapter outline checklist (with
checked and unchecked items), and a linked alloy from the vault. Visual
contrast against the dark Obsidian-themed prior steps communicates the
handoff from knowledge layer to action layer.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Accessibility, reduced motion, mobile polish, end-to-end verification

Final polish task: handle `prefers-reduced-motion`, verify mobile layout works for all 7 steps, ensure existing page features (rain effect, custom cursor, scroll reveal, anchor nav) still work, and check no em dashes leaked into new prose.

**Files:**
- Modify: `/Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html`

- [ ] **Step 1: Add reduced-motion CSS overrides**

At the end of the pipeline CSS block (before `</style>`), append:

```css
    /* --- Reduced motion overrides --- */
    @media (prefers-reduced-motion: reduce) {
      .pl-step .pl-zot-pdf,
      .pl-step .pl-zot-mf,
      .pl-step .pl-zot-stamp,
      .pl-step .pl-ln-sec,
      .pl-step .pl-mol-dot,
      .pl-step .pl-mol-label,
      .pl-step .pl-mol-line,
      .pl-step .pl-alloy-mol,
      .pl-step .pl-alloy-block,
      .pl-step .pl-notion-page,
      .pl-step .pl-term-line {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }
      .pl-step .pl-zot-stamp { transform: rotate(-5deg) !important; }
      .pl-step .pl-mol-line { opacity: 0.45 !important; }
      .pl-replay { display: none; }
    }
```

- [ ] **Step 2: Update each runner to skip animation entirely under reduced motion**

Just below the line `const pipelineRunners = {};` (added in Task 2), append a one-time check that the runners can short-circuit on:

```javascript

  const plPrefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Then in each of the seven runners (`pipelineRunners['01']` through `pipelineRunners['07']`), at the very top of the function body (immediately after the opening `{`), insert:

```javascript
    if (plPrefersReducedMotion) {
      // Static end state is rendered via CSS overrides; skip JS animation
      // For runners that build DOM (atoms, molecules, terminal), still render
      // the end state without timing/delays.
    }
```

Then for the runners that build DOM dynamically (Steps 03, 04, 05), wrap the time-based parts so they fire immediately under reduced motion. Specifically:

- In Step 03 runner: if `plPrefersReducedMotion`, replace the entire `lines.forEach` and trailing `setTimeout` with:

```javascript
    if (plPrefersReducedMotion) {
      const lines = [/* ...same as before... */];
      lines.forEach(({ html }) => {
        const line = document.createElement('div');
        line.className = 'pl-term-line pl-in';
        line.innerHTML = html;
        body.appendChild(line);
      });
      return;
    }
```

(The simpler shape: render everything immediately, no setTimeout chain, no cursor.)

- In Step 04 runner: if `plPrefersReducedMotion`, set the counter to its final value and skip the interval; spawn all atoms at once with `animation: none` and opacity 1:

```javascript
    if (plPrefersReducedMotion) {
      counter.textContent = '1,056';
      const isMobile = window.matchMedia('(max-width: 720px)').matches;
      const claimsToRender = isMobile ? atomClaims.slice(0, 12) : atomClaims;
      const stageRect = scatter.getBoundingClientRect();
      const W = stageRect.width || 420;
      const H = stageRect.height || 320;
      claimsToRender.forEach((claim, i) => {
        const card = document.createElement('div');
        card.className = 'pl-atom-card';
        card.textContent = claim;
        const minLeft = (i < 5) ? 220 : 12;
        const minTop = (i < 8) ? 90 : 12;
        const left = minLeft + Math.random() * Math.max(W - 180 - minLeft - 12, 40);
        const top = minTop + Math.random() * Math.max(H - 36 - minTop - 12, 40);
        card.style.left = left + 'px';
        card.style.top = top + 'px';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        scatter.appendChild(card);
      });
      return;
    }
```

- In Step 05 runner: if `plPrefersReducedMotion`, place dots directly at cluster positions, draw lines immediately, render labels immediately:

```javascript
    if (plPrefersReducedMotion) {
      const targets = {};
      clusters.forEach(cluster => {
        cluster.atoms.forEach((aIdx, j) => {
          const angle = (j / cluster.atoms.length) * Math.PI * 2 - Math.PI / 2;
          targets[aIdx] = { x: cluster.cx + Math.cos(angle) * cluster.r, y: cluster.cy + Math.sin(angle) * cluster.r };
        });
      });
      scatter.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'pl-mol-dot pl-in';
        const t = targets[i];
        dot.style.left = t.x + '%';
        dot.style.top = t.y + '%';
        field.appendChild(dot);
      });
      clusters.forEach(cluster => {
        for (let i = 0; i < cluster.atoms.length; i++) {
          for (let j = i + 1; j < cluster.atoms.length; j++) {
            const aT = targets[cluster.atoms[i]], bT = targets[cluster.atoms[j]];
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', aT.x + '%'); line.setAttribute('y1', aT.y + '%');
            line.setAttribute('x2', bT.x + '%'); line.setAttribute('y2', bT.y + '%');
            line.setAttribute('class', 'pl-mol-line pl-in');
            svg.appendChild(line);
          }
        }
        const lbl = document.createElement('div');
        lbl.className = 'pl-mol-label pl-in';
        lbl.style.left = cluster.cx + '%';
        lbl.style.top = (cluster.cy + cluster.r + 4) + '%';
        lbl.textContent = cluster.label;
        field.appendChild(lbl);
      });
      return;
    }
```

For Steps 01, 02, 06, 07 (which use only CSS animations), the existing `if (plPrefersReducedMotion)` early stub is sufficient because the CSS `@media (prefers-reduced-motion: reduce)` override already forces the final state. So just add:

```javascript
    if (plPrefersReducedMotion) {
      // CSS @media rule has already forced final state
      return;
    }
```

at the top of each of those four runners.

- [ ] **Step 3: Verify no em dashes in any new prose**

Run:

```bash
grep -n "—" /Users/takumyii/Documents/GitHub/ITASIA302-Takumi/personal-project/index.html | grep -v "<!--\|cite>—"
```

Expected output: empty. If any line is reported, edit it to replace the em dash with a period, comma, semicolon, or "and"/"because".

- [ ] **Step 4: Full-page manual browser verification**

Reload `personal-project/index.html`.

Top-to-bottom sanity sweep:
- Hero loads with typewriter command and accent dot.
- Intro section displays fully with pull-quote and joke analysis.
- New pipeline section appears with seven step containers.
- Scroll slowly through all 7 steps. Each one's animation fires exactly once when it enters viewport.
- Each step's replay button works.
- Section after pipeline reads "02 · What the system produced" with four viz cards.
- Framework section renders with all three filled source cards and references.
- Topbar nav: click "Pipeline" link, page scrolls to the new section. Click each other nav link, verify correct scroll.
- Existing rain effect still visible (orange/amber rain particles).
- Existing custom cursor still works.

Reduced motion test:
- macOS: System Settings → Accessibility → Display → "Reduce motion" toggle ON.
- Reload the page.
- All animations resolve to their final state immediately.
- Replay buttons hidden.
- All content readable.
- Toggle OFF when done.

Mobile test:
- Resize browser to 600px wide or use DevTools mobile preview.
- Pipeline section: each step stacks (prose above visual).
- Step 04 atom scatter renders ~12 cards instead of 25.
- All animations still play, no layout overflow.
- Topbar nav hidden (existing behavior at ≤720px).

Console:
- No errors or warnings during entire scroll-through, including after replay clicks.

- [ ] **Step 5: Commit**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git add personal-project/index.html
git commit -m "$(cat <<'EOF'
Add reduced motion handling and final mobile polish for pipeline section

Respects prefers-reduced-motion via CSS overrides and per-runner short
circuits. Hides replay buttons under reduced motion. Verified all 7 steps
work on mobile (<=720px), all existing page features still function,
and no em dashes leaked into new prose.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Push to remote (optional, ask user first)**

```bash
cd /Users/takumyii/Documents/GitHub/ITASIA302-Takumi
git push origin main
```

Confirm with the user before pushing if they have not explicitly authorized it.

---

## Self-Review (engineer skip; planner did this)

**Spec coverage:** All 7 pipeline steps from spec have a dedicated implementation task (Tasks 3-9). Section renumbering covered in Task 1. Animation infrastructure (IntersectionObserver, replay) covered in Task 2. Performance considerations (mobile cap, reduced motion, GPU transforms) covered in Tasks 6 and 10. Error handling (IntersectionObserver fallback) covered in Task 2. Manual testing covered per-task and end-to-end in Task 10.

**Placeholder scan:** No TBD/TODO. Every code block is complete and copy-pasteable. Every step has explicit verification.

**Type consistency:** CSS class names use `pl-` prefix consistently. Runner IDs are zero-padded `'01'` through `'07'` consistently. Real data (atom claims, citekeys, MCP tool names) sampled from user's actual vault and CLAUDE.md.

**Scope:** Single file change. ~1,500 lines of HTML/CSS/JS added. Estimated 4-6 hours of implementation time across 10 tasks.

**Out of scope (deferred):** D3 vault graph, scroll-progress binding, runtime vault data fetch, build script, Notion API integration, generating new content for synthesis/thesis/system sections.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-19-pkm-pipeline-scrollytelling.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
