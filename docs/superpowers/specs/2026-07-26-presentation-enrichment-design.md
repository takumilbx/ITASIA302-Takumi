# Presentation Enrichment — Mid-Progress Talk (2026-07-27)

Design for enriching `personal-project/second_brain_B_presentation.html` for the mid-progress presentation. Submission version comes later (early August); this spec covers only the presentation build.

## Goal

Professor feedback: idea is concrete and good; delivery needs to be understandable to other people, and the system should be shown concretely. The user asked for the same HTML style, more populated: where the project comes from, its context, the sources, and how the system is applied in real thesis scenarios. Slot: 15 to 20 minutes.

## Structure change

Current engine: 16 beats (indices 0 to 15), narrative order equals index order, hardcoded loop bounds and CSS ids (`#bN`).

Change: introduce an `ORDER` array that maps narrative position to beat index, so new sections can be inserted anywhere without renumbering existing beats, CSS, or per-beat animation code.

- New narrative order: `[0, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 12, 13, 14, 15]`
- Beat 16 = CONTEXT, inserted after HERO.
- Beat 17 = CASE STUDY, inserted after ALLOY, before PIPELINE.
- Engine edits: slice builder iterates ORDER; active-beat detection iterates ORDER; element loop and clamp bounds go from 16/15 to 18/17; `WEIGHTS` and rail ticks become ORDER-based; folio shows narrative position with new names.

## New content

### Beat 16 · CONTEXT ("Where I am coming from")
- Master's thesis: comparing TPACK acquisition pathways, Japan's GIGA School Program vs Bangkok's BMA pilot schools.
- Fieldwork already underway (Teacher A, Japanese elementary science classroom, anonymized).
- The reading load of a thesis is what broke the old note-taking habit; this project is the system that carries the thesis.
- Style: existing reveal system (`.rv` staggers, `.blist` bullets). No new WebGL.

### Beat 17 · CASE STUDY ("The method on a real thesis problem")
Real chain from the vault, presented honestly as mid-progress:
1. Three real atoms (filenames are the claims), from Teacher A fieldwork:
   - Teacher A frames science and ICT as well matched because the subject centers on observation and recording.
   - Teacher A can state criteria for choosing analog over digital but grounds the preference in tacit sensory judgment.
   - A teaching move the observer read as deliberate pedagogy, Teacher A describes as not consciously intended.
2. The molecule: "Selective non-use of ICT is an advanced, partly tacit form of TPACK", with its tension: if the competence is tacit, it is invisible to surveys and to formal training design.
3. Literature anchors on the molecule: Yagisawa 2019 (TPK dominant at 64.1 percent, integrated TPACK near 1 percent), Graham 2011, Archambault 2010.
4. The forming alloy: "Knowing when not to use ICT as the mark of integrated TPACK". The Alloys folder is empty today; the talk presents this as the first alloy, forming now.

## Enrichments to existing beats
- Motivation (meme) beat: deepen the personal prose.
- Stats refresh: 2,163 atoms (was 1,056), 6 molecules.
- Works cited beat: add TPACK anchors (Mishra and Koehler 2006, Yagisawa 2019, Graham 2011, Archambault et al. 2010, Spradley 2016).

## Constraints
- Writing voice: plain, short declaratives, no em-dashes anywhere.
- Keep `second_brain_B.html` (web version) untouched.
- Single file, existing style system only.

## Verification
- Real browser scroll-through of all 18 narrative positions (headless preview pauses rAF; do not trust frozen screenshots).
- Check: every beat reveals, folio names correct, rail ticks at 18 positions, no console errors, reduced-motion branch unaffected.
