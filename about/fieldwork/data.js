/* =============================================================================
   FIELDWORK DATA  —  window.FW_DATA
   Interactive 3D Fieldwork Presentation (ITASIA312 classroom study)

   Loaded as a CLASSIC script (not a module) so the page also opens by
   double-clicking index.html (file://) without ES-module CORS issues, and so
   this content stays editable without touching the scene code.

   Content is drawn from the field-work synthesis (Visit 1: 21 May 2026;
   Visit 2: 25 May 2026). Do NOT invent pedagogical claims — source-flagged
   uncertainties are presented as open questions, not facts.

   Tool vocabulary used in analogTools[] / digitalTools[]:
     analog  : Blackboard, Paper worksheets, Pendulum, Notebooks,
               Reference sheets, Paper scaffold
     digital : Google Sheets, Google Docs, Projector, Chromebooks,
               学びポケット (Learning Pocket), Apple Watch

   Enums:
     teacherPosition : "front" | "circulating"
     projectorState  : "off" | "liveGraph" | "completedGraph" | "docScaffold"
     emphasis        : "neutral" | "analog" | "digital"
   ========================================================================== */

window.FW_DATA = {
  meta: {
    course: "ITASIA312 · Field Work",
    subtitle: "An ethnographic study of a Grade-5 science classroom",
    place: "Public elementary school, Ota Ward, Tokyo · GIGA School program",
    teacher: "Enoki-sensei (榎先生) · science subject teacher (教科担任)",
    observer: "Takumi (observer / researcher)",
    question:
      "How does Enoki-sensei intentionally design the boundary between " +
      "analog and digital tools in her science classroom, and what " +
      "pedagogical reasoning drives those design decisions?",
    subQuestions: [
      "When — and why — does she reach for paper rather than the screen, and the reverse?",
      "How are analog techniques (e.g. blackboard chalk color-coding) translated into digital tools (the black-prompt / red-answer Google Doc)?",
      "How does the analog ⇆ digital balance shift as students grow more familiar (Visit 1 → Visit 2)?",
      "What part does each tool play in making student thinking visible?"
    ]
  },

  // UI accent encoding for the analog/digital boundary (paired with labels/icons,
  // never color alone). Mapped to the portfolio palette.
  encoding: {
    analog:  { color: "#e8634a", label: "Analog", glyph: "✎" },
    digital: { color: "#5299c8", label: "Digital", glyph: "⌨" }
  },

  visits: {
    v1: {
      id: "v1",
      label: "Visit 1",
      date: "Thursday, 21 May 2026",
      timeRange: "9:30–10:05",
      phases: [
        {
          id: "v1p1",
          n: 1,
          title: "Opening & Introductions",
          titleJa: "導入・自己紹介",
          startTime: "9:30",
          endTime: "9:31",
          durationMin: 1,
          description:
            "Teacher at the front; the observers (Takumi + a student-teacher intern) introduce themselves. Students are curious, not anxious.",
          analogTools: [],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "neutral",
          spradley: {
            do: "Settle in; observers introduce themselves to the class.",
            makeUse: "Stools, demonstration table.",
            say: "Greetings and brief self-introductions.",
            feel: "Curious and relaxed — not anxious."
          },
          sceneFlags: {}
        },
        {
          id: "v1p2",
          n: 2,
          title: "Recap of Prior Learning & Hypothesis Reminder",
          titleJa: "前時の復習・仮説の確認",
          startTime: "9:31",
          endTime: "9:33",
          durationMin: 2,
          description:
            "Verbal review of the prior pendulum learning and the standing hypothesis. No writing yet.",
          analogTools: ["Blackboard"],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Recall last lesson's findings and the standing hypothesis, together.",
            makeUse: "Blackboard (referenced, not yet written on).",
            say: "Teacher prompts recall of the pendulum hypothesis.",
            feel: "Warming up; reconnecting to prior work."
          },
          sceneFlags: {}
        },
        {
          id: "v1p3",
          n: 3,
          title: "Hands-on Experiment & Real-time Data Entry",
          titleJa: "実験・リアルタイムのデータ入力",
          startTime: "9:33",
          endTime: "9:40",
          durationMin: 7,
          description:
            "6 groups run 3 pendulum trials each (18 total). A designated data-entry student enters results into a shared Google Sheet via 学びポケット; a scatter plot builds in real time on the projector. The teacher circulates. Notes: half-width (半角) entry; calculators allowed (“this isn't math”); round to 1 decimal; the sheet is locked to “observer” mode at the end.",
          analogTools: ["Pendulum", "Paper worksheets"],
          digitalTools: ["Google Sheets", "学びポケット", "Projector", "Chromebooks"],
          teacherPosition: "circulating",
          projectorState: "liveGraph",
          emphasis: "digital",
          spradley: {
            do: "Run 3 timed pendulum trials per group; one student enters each result.",
            makeUse: "Pendulum apparatus; 学びポケット → shared Google Sheet; projector; calculators.",
            say: "“This isn't math” — round to 1 decimal; enter half-width (半角).",
            feel: "Busy and collaborative; the teacher moves group to group to advise."
          },
          sceneFlags: { studentsActive: true, pendulumSwing: true, dataEntryHighlight: true }
        },
        {
          id: "v1p4",
          n: 4,
          title: "Graph Interpretation & Data Explanation",
          titleJa: "グラフの解釈・考察",
          startTime: "9:40",
          endTime: "9:50",
          durationMin: 9,
          description:
            "The finalized scatter plot is shown. Teacher: “What do you see?” The class concludes that greater length → longer period (20 / 40 / 60 cm → ~1.0 / 1.3 / 1.6 s).",
          analogTools: ["Blackboard"],
          digitalTools: ["Projector"],
          teacherPosition: "front",
          projectorState: "completedGraph",
          emphasis: "digital",
          spradley: {
            do: "Read the completed scatter plot together and draw a conclusion.",
            makeUse: "Projector (finalized graph); blackboard.",
            say: "“What do you see?” → length ↑ ⇒ period ↑.",
            feel: "Focused, interpretive."
          },
          sceneFlags: {}
        },
        {
          id: "v1p5",
          n: 5,
          title: "Reflection Scaffold Introduction & Completion",
          titleJa: "振り返りの枠組み（よそく・結果・わかった）",
          startTime: "9:50",
          endTime: "10:00",
          durationMin: 10,
          description:
            "First use of the three-part scaffold よそく / 結果 / わかった, shown via a projected Google Doc using a black-prompt / red-model-answer color system. The teacher models immediately, then students write.",
          analogTools: ["Paper scaffold", "Notebooks"],
          digitalTools: ["Google Docs", "Projector"],
          teacherPosition: "front",
          projectorState: "docScaffold",
          emphasis: "digital",
          spradley: {
            do: "Teacher models the scaffold; students then complete their own.",
            makeUse: "Projected Google Doc (black prompts / red model answers); paper scaffold.",
            say: "よそく (prediction) · 結果 (result) · わかった (what I understood).",
            feel: "Guided; learning a reflective-writing routine for the first time."
          },
          sceneFlags: { writing: true }
        },
        {
          id: "v1p6",
          n: 6,
          title: "Recap & Summary",
          titleJa: "まとめ",
          startTime: "10:00",
          endTime: "10:03",
          durationMin: 3,
          description: "Closing summary of the pendulum learning.",
          analogTools: ["Blackboard"],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Restate the key finding to close the inquiry.",
            makeUse: "Blackboard.",
            say: "Teacher summarizes: length affects the period.",
            feel: "Consolidating."
          },
          sceneFlags: {}
        },
        {
          id: "v1p7",
          n: 7,
          title: "Notebook Integration",
          titleJa: "ノートへの統合",
          startTime: "10:03",
          endTime: "10:05",
          durationMin: 2,
          description:
            "Students paste the paper scaffold into their notebooks, following precise folding instructions. A deliberate analog close. Projector off / idle.",
          analogTools: ["Paper scaffold", "Notebooks"],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Fold and paste the paper scaffold into personal notebooks.",
            makeUse: "Paper scaffold; notebooks; glue.",
            say: "Precise folding and pasting instructions.",
            feel: "A tidy, tactile, analog close to the lesson."
          },
          sceneFlags: { notebookPaste: true }
        }
      ]
    },

    v2: {
      id: "v2",
      label: "Visit 2",
      date: "Monday, 25 May 2026",
      timeRange: "9:30–10:15",
      phases: [
        {
          id: "v2p1",
          n: 1,
          title: "Setup & Review-Sheet Display",
          titleJa: "準備・復習シートの掲示",
          startTime: "9:30",
          endTime: "9:35",
          durationMin: 5,
          description:
            "Set up the Mega (large wall sheet) + Mini (individual copies) review system, both showing Visit 1's reflection prompts.",
          analogTools: ["Mega sheet", "Mini sheets", "Blackboard"],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Post the Mega (wall) + Mini (per-student) review sheets carrying Visit 1's reflection prompts.",
            makeUse: "Mega wall sheet; Mini copies; blackboard.",
            say: "Orienting students to the posted prompts.",
            feel: "Settled, routine — familiar territory."
          },
          sceneFlags: { megaMini: true }
        },
        {
          id: "v2p2",
          n: 2,
          title: "Recap of Previous Learning",
          titleJa: "前時の復習",
          startTime: "9:35",
          endTime: "9:40",
          durationMin: 5,
          description:
            "Blackboard-based recap; students reference the posted sheets.",
          analogTools: ["Blackboard", "Reference sheets"],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Recap prior learning at the blackboard; students consult the posted sheets.",
            makeUse: "Blackboard; posted reference sheets.",
            say: "Reviewing last time's finding together.",
            feel: "Recalling, reconnecting."
          },
          sceneFlags: {}
        },
        {
          id: "v2p3",
          n: 3,
          title: "Tool Demonstration & Reflection Recap",
          titleJa: "ツールの実演・振り返りの再確認",
          startTime: "9:40",
          endTime: "9:50",
          durationMin: 10,
          description:
            "Teacher demos tools, reviews Visit 1 reflections, reinforces the 3-part scaffold. Students reference prior prompts unprompted (internalization evident).",
          analogTools: ["Paper scaffold"],
          digitalTools: ["Google Docs", "Projector"],
          teacherPosition: "front",
          projectorState: "docScaffold",
          emphasis: "digital",
          spradley: {
            do: "Demo tools, review Visit 1 reflections, reinforce the scaffold.",
            makeUse: "Projected Google Docs; paper scaffold.",
            say: "Re-explaining よそく / 結果 / わかった.",
            feel: "Familiar — students recall the routine on their own."
          },
          sceneFlags: {}
        },
        {
          id: "v2p4",
          n: 4,
          title: "Instruction for a New Experimental Variable",
          titleJa: "新しい変数の指示",
          startTime: "9:50",
          endTime: "10:00",
          durationMin: 10,
          description:
            "New question: how does weight affect speed? Students choose their own variable (weight OR length) — agency. On-screen colour changes cue note-taking.",
          analogTools: ["Blackboard"],
          digitalTools: ["Projector"],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "neutral",
          spradley: {
            do: "Pose the new question; students choose their own variable to test.",
            makeUse: "Projector (on-screen colour cue); blackboard.",
            say: "“Weight or length — you choose.”",
            feel: "Agency; deciding their own inquiry."
          },
          sceneFlags: { variableChoice: true }
        },
        {
          id: "v2p5",
          n: 5,
          title: "Hands-on Experiment",
          titleJa: "実験",
          startTime: "10:00",
          endTime: "10:10",
          durationMin: 10,
          description:
            "Chosen experiment runs; a verbal wrap-up reminder lands at the 8-minute mark. Teacher circulates.",
          analogTools: ["Pendulum", "Paper worksheets"],
          digitalTools: [],
          teacherPosition: "circulating",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Run the chosen experiment (weight or length variant).",
            makeUse: "Pendulum apparatus; worksheets.",
            say: "Group talk; teacher circulates with brief advice.",
            feel: "Busy, self-directed."
          },
          sceneFlags: { studentsActive: true, pendulumSwing: true, weightVariant: true }
        },
        {
          id: "v2p6",
          n: 6,
          title: "Cleanup & Simultaneous Data Entry",
          titleJa: "片付け・同時データ入力",
          startTime: "10:10",
          endTime: "10:13",
          durationMin: 3,
          description:
            "Most students tidy up while the designated data-entry student enters measurements; the graph updates in real time. Parallel execution shows internalized roles.",
          analogTools: [],
          digitalTools: ["Google Sheets", "学びポケット", "Projector"],
          teacherPosition: "front",
          projectorState: "liveGraph",
          emphasis: "digital",
          spradley: {
            do: "Tidy up while one student enters measurements; graph updates live.",
            makeUse: "学びポケット → shared Google Sheet; projector.",
            say: "Little instruction needed — roles run in parallel.",
            feel: "Internalized routine; runs itself."
          },
          sceneFlags: { dataEntryHighlight: true }
        },
        {
          id: "v2p7",
          n: 7,
          title: "Reflection, Closing & Forward Link",
          titleJa: "振り返り・まとめ・次への接続",
          startTime: "10:13",
          endTime: "10:15",
          durationMin: 5,
          description:
            "Students attempt the scaffold independently first (2–3 min) before the teacher models — a shift from Visit 1. Closing links to playground swings (ブランコ) and previews Newton's Laws: the teacher drops two objects and asks students to predict.",
          analogTools: ["Paper scaffold", "Notebooks"],
          digitalTools: ["Google Docs", "Projector"],
          teacherPosition: "front",
          projectorState: "docScaffold",
          emphasis: "digital",
          spradley: {
            do: "Students self-attempt the scaffold first, then the teacher models; close with a Newton's-Laws drop demo.",
            makeUse: "Projected Google Doc (black/red); two dropped objects for the prediction cue.",
            say: "“Predict what happens when I drop these.” · links to swings (ブランコ).",
            feel: "Independent, forward-looking."
          },
          sceneFlags: { writing: true, newtonPreview: true }
        }
      ]
    }
  },

  // Cross-visit comparison content (spec §8).
  crossVisit: {
    sameAcross: [
      "Physical setting, actors, and the group-role structure",
      "The teacher's deliberate circulation (≈10 s–1 min per group)",
      "Google Sheets real-time shared visualization",
      "Google Docs colour-coded (black / red) reflection modeling",
      "The よそく・結果・わかった reflection scaffold",
      "Apple Watch timing; a calm-but-energetic demeanor",
      "Students' comfort with the digital tools"
    ],
    changed: [
      { title: "Reflection scaffold timing", v1: "Teacher models immediately", v2: "Students attempt independently first, then the teacher models", note: "intentional progression toward autonomy" },
      { title: "Student familiarity", v1: "Scaffold introduced for the first time", v2: "Students reference the scaffold unprompted (internalization)" },
      { title: "Experimental agency", v1: "Fixed variable (length)", v2: "Students choose their variable (weight vs. length)" },
      { title: "Peer norm enforcement", v1: "—", v2: "Off-task student redirected by peers, no teacher involvement" },
      { title: "Forward linking", v1: "—", v2: "Closes with a Newton's-Laws preview (cross-unit awareness)" },
      { title: "Observer friction", v1: "Re-introductions; class settling in", v2: "Lower — no re-introductions, sharper focus" },
      { title: "Blackboard", v1: "Fewer reference sheets", v2: "More accumulated reference sheets" }
    ]
  },

  /* Interview hotspot layer — added in build Phase 3 (spec §3.7).
     Question + answer text lives in findings.js (window.FW_FINDINGS) so it can
     be pasted in after the 29 May 2026 interview without editing scene code.
     anchorKey values will map to named objects returned by the scene builder,
     e.g. "teacher", "projector", "dataEntryStudent", "pendulum",
     "blackboard", "appleWatch", "doorway", "room". */
  hotspots: [
    { id: "teacher",    anchorKey: "teacher",    label: "Enoki-sensei",                theme: "Teacher background, beliefs & assessment",      questionIds: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q17", "Q18"] },
    { id: "projector",  anchorKey: "projector",  label: "Projector — Doc scaffold",     theme: "Analog → digital translation & lesson design",  questionIds: ["Q11", "Q13", "Q14"] },
    { id: "dataEntry",  anchorKey: "dataEntry",  label: "Data-entry student · Sheets",  theme: "Digital access vs. constraint",                 questionIds: ["Q12"] },
    { id: "pendulum",   anchorKey: "pendulum",   label: "Experiment · pendulum",        theme: "Student agency",                                questionIds: ["Q15"] },
    { id: "blackboard", anchorKey: "blackboard", label: "Blackboard & reference sheets", theme: "Preparation & improvement",                    questionIds: ["Q16"] },
    { id: "room",       anchorKey: "room",       label: "The lab & school environment", theme: "School environment, colleagues & conditions",   questionIds: ["Q7", "Q8", "Q9", "Q10", "Q19", "Q20", "Q21", "Q22"] }
  ]
};
