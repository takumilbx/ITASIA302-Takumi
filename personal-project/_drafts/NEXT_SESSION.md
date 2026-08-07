# Prompt for the next session

Copy everything below the line into a fresh session.

---

I am working on `personal-project/second_brain_final.html` in this repo, my ITASIA302 final project. It is a 16-beat scroll essay over a WebGL field built from my real Obsidian vault. Do not push anything. I will decide when to deploy.

## How we work

I have been rewriting this essay out of my own mouth because a presentation audience said the writing sounded AI-generated. The rule is: **you write nothing I did not say.** I talk, you transcribe. You may cut filler, fix a broken tense, and fix grammar. You may not invent a detail, an analogy, a number, or a memory. If something is missing, ask me rather than filling it in. If you do write a connecting sentence, tell me which sentences are yours so I can replace them.

My voice: plain, full forms not contractions, no dashes of any kind, short declaratives, British spellings. No "X is not Y, it is Z" constructions, no symmetric two-beat closers, no tidy aphorism at the end of every paragraph.

## The tooling

Prose lives in the HTML but is edited as markdown:

```bash
cd personal-project
python3 prose_io.py extract          # HTML -> _drafts/live/bNN_*.md
python3 prose_io.py bake             # markdown -> HTML
python3 prose_io.py bake --check     # preview, write nothing
python3 prose_io.py bake --allow-move  # permit moving a citation between beats
```

Inline grammar in the markdown: `*italic*`, `{{accent}}`, `**bold**`, `~~small~~`, `[[(Author, 2020, p. 4)]]` for citations.

The bake step refuses to write any slot whose citation tokens changed, so a verified attribution cannot be dropped by accident. `--allow-move` relaxes that per-slot check but still refuses if a citation disappears from the whole essay.

Every claim in this essay was verified against source PDFs. `_citations/manifest.json` holds 37 adjudicated claims with their status and notes. Check it before touching any cited sentence. Some entries are marked `unsupported` and record exactly what went wrong.

## What I want to do

**Beat 11 is the case study, and it is still written by Claude, not me. I want it rebuilt as a demo of my real vault.**

Right now it holds: an intro about my thesis and fieldwork, a ledger of six atoms about Teacher A and ICT use, two dense paragraphs of TPACK literature, and a forming alloy. It carries 8 citations. It is the beat where my method is supposed to meet my actual thesis, and it should show the real thing rather than describe it.

To do that you will need to look in my vault. Read `/Users/takumyii/Desktop/10-Academic/30-Resources/Obsidian/Takumi's Vault/CLAUDE.md` first and obey it. Treat the vault as read-only.

**Privacy constraint, which is not negotiable.** This repo is public and permanent. The vault contains unpublished fieldwork and interview material. The teacher is anonymised as "Teacher A" everywhere and must stay that way. `vault_data.js` and `vault_graph.json` are gitignored because they contain personal note titles. Anything you surface from the vault has to be safe to publish, and you should tell me what you are proposing to expose before it goes in.

Ask me what I want the demo to show before you build it.

## Verification, every time

The page has QA hooks. After any change:

```javascript
window.__SEEK_BEAT(n, 0.55)   // jump to a beat
window.__QA_NAN()             // scan the position buffer for NaN
window.__QA_FP(p)             // deterministic fingerprint at scroll position p
```

Check after each edit: no NaN on any beat, console clean, the beat does not overflow its panel, and no reference is left orphaned. There is an orphan check pattern in the recent git log.

Overflow matters. Each beat has to fit one screen or it scrolls, and this gets presented on a projector.

## State of the essay

Beats 00 to 10 are mine now, in my words. Sixteen beats, counters read NN / 15, 23 references, no orphans.

Still written by Claude and waiting for me: **11 case study**, **12 pipeline**, **13 thesis**, **14 end**, **15 works cited**.

Known open questions:

- **Beat 12 describes the workflow a third time.** Beat 10 already covers it in my words with screenshots beside it. The one thing only beat 12 has is the rejection number, that a typical run produces 7 candidates of which 5 survive and 2 do not. That number is the only hard evidence in the essay that verification actually rejects things, so it should survive somewhere even if the beat does not.
- **Two references were dropped** when earlier beats were cut and may want homes if their content returns: Callister and Rethwisch 2018 on why alloys are harder than pure metals, and Selsbaek-Reitz 2026, which was the real source behind a quote an earlier draft had misattributed.
- **Term chips** attach definitions to words at runtime, sourced from the tools beat. Atom, molecule and alloy currently have no chips because they moved out of that beat. They could be repointed at beat 09 where I explain them.
- **Beat 04 overflows** at narrow widths, six tool explanations on one screen.

Twenty commits are unpushed. The live site still shows the old version.
