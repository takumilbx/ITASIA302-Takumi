/* =============================================================================
   FIELDWORK DATA  -  window.FW_DATA
   Interactive 3D Fieldwork Presentation (ITASIA312 classroom study)

   Loaded as a CLASSIC script (not a module) so the page also opens by
   double-clicking index.html (file://) without ES-module CORS issues, and so
   this content stays editable without touching the scene code.

   Content is drawn from the field-work synthesis (Visit 1: 21 May 2026;
   Visit 2: 25 May 2026). Do NOT invent pedagogical claims - source-flagged
   uncertainties are presented as open questions, not facts.

   BILINGUAL: every learner-facing string carries an English value plus a
   parallel "...Ja" field (Japanese). The scene picks the field by STATE.lang
   ("ja" is the default). Verbatim teacher quotes live in findings.js and stay
   Japanese in both languages. T-sensei is referred to with she/her in English.

   Tool vocabulary used in analogTools[] / digitalTools[] (English keys; the
   page maps them to Japanese via TOOL_JA in index.html):
     analog  : Blackboard, Paper worksheets, Pendulum, Notebooks,
               Reference sheets, Paper scaffold, Mega sheet, Mini sheets
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
    subtitleJa: "小学5年・理科の教室のエスノグラフィー",
    place: "Public elementary school, Ota Ward, Tokyo · GIGA School program",
    placeJa: "東京都大田区の公立小学校 · GIGAスクール構想",
    teacher: "T-sensei (T先生) · science subject teacher (教科担任)",
    teacherJa: "T先生 · 理科の教科担任",
    observer: "Takumi (observer / researcher)",
    observerJa: "Takumi（観察者・研究者）",
    question:
      "How does T-sensei intentionally design the boundary between " +
      "analog and digital tools in her science classroom, and what " +
      "pedagogical reasoning drives those design decisions?",
    questionJa:
      "T先生は理科の授業のなかで、アナログとデジタルの道具の境界を" +
      "どのように意図して設計しているのか。そして、その設計判断の" +
      "背景にある指導上の考え方は何か。",
    subQuestions: [
      "When - and why - does she reach for paper rather than the screen, and the reverse?",
      "How are analog techniques (e.g. blackboard chalk color-coding) translated into digital tools (the black-prompt / red-answer Google Doc)?",
      "How does the analog ⇆ digital balance shift as students grow more familiar (Visit 1 → Visit 2)?",
      "What part does each tool play in making student thinking visible?"
    ],
    subQuestionsJa: [
      "いつ、そしてなぜ、画面ではなく紙を選ぶのか。逆に画面を選ぶのはどんなときか。",
      "アナログの技法（黒板のチョークの色分けなど）は、デジタルの道具（黒のプロンプト・赤の解答のGoogleドキュメント）へどのように置き換えられているのか。",
      "子どもが慣れるにつれ、アナログとデジタルのバランスはどう動くのか（1回目 → 2回目）。",
      "それぞれの道具は、子どもの思考を見えるようにするうえでどんな役割を果たすのか。"
    ]
  },

  // UI accent encoding for the analog/digital boundary (paired with labels/icons,
  // never color alone). Mapped to the portfolio palette.
  encoding: {
    analog:  { color: "#e8634a", label: "Analog", labelJa: "アナログ", glyph: "✎" },
    digital: { color: "#5299c8", label: "Digital", labelJa: "デジタル", glyph: "⌨" }
  },

  visits: {
    v1: {
      id: "v1",
      label: "Visit 1",
      labelJa: "1回目",
      date: "Thursday, 21 May 2026",
      dateJa: "2026年5月21日（木）",
      timeRange: "9:30-10:05",
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
          descriptionJa:
            "先生は教室の前。観察者（Takumiと教育実習生）が自己紹介をする。子どもは不安よりも好奇心。",
          analogTools: [],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "neutral",
          spradley: {
            do: "Settle in; observers introduce themselves to the class.",
            makeUse: "Stools, demonstration table.",
            say: "Greetings and brief self-introductions.",
            feel: "Curious and relaxed - not anxious."
          },
          spradleyJa: {
            do: "席に着く。観察者がクラスに自己紹介する。",
            makeUse: "丸椅子、演示用の実験台。",
            say: "あいさつと短い自己紹介。",
            feel: "不安はなく、好奇心を持ってリラックスしている。"
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
          descriptionJa:
            "前回のふりこの学習と、立てている仮説を口頭で復習する。まだ書く活動はない。",
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
          spradleyJa: {
            do: "前回の発見と、立てている仮説を、みんなで思い出す。",
            makeUse: "黒板（参照するが、まだ書かない）。",
            say: "先生がふりこの仮説の想起を促す。",
            feel: "ウォームアップ。前の学びとつながり直す。"
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
          descriptionJa:
            "6つの班がふりこの実験を3回ずつ行う（計18回）。各班の記録係が学びポケットを通じて共有のGoogleスプレッドシートに結果を入力し、プロジェクターには散布図がリアルタイムで増えていく。先生は机間を回る。指示は、半角で入力、電卓は可（「これは算数じゃない」）、小数第1位に丸める、最後にシートを「閲覧」モードにロックする。",
          analogTools: ["Pendulum", "Paper worksheets"],
          digitalTools: ["Google Sheets", "学びポケット", "Projector", "Chromebooks"],
          teacherPosition: "circulating",
          projectorState: "liveGraph",
          emphasis: "digital",
          spradley: {
            do: "Run 3 timed pendulum trials per group; one student enters each result.",
            makeUse: "Pendulum apparatus; 学びポケット → shared Google Sheet; projector; calculators.",
            say: "“This isn't math” - round to 1 decimal; enter half-width (半角).",
            feel: "Busy and collaborative; the teacher moves group to group to advise."
          },
          spradleyJa: {
            do: "班ごとに時間を計ってふりこの実験を3回行い、1人が結果を入力する。",
            makeUse: "ふりこの実験器具。学びポケット → 共有のGoogleスプレッドシート。プロジェクター。電卓。",
            say: "「これは算数じゃない」。小数第1位に丸め、半角で入力する。",
            feel: "忙しく、協力し合っている。先生は班から班へ回って助言する。"
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
          descriptionJa:
            "完成した散布図を提示する。先生「何が見える？」。クラスは、長さが大きいほど周期が長くなると結論づける（20 / 40 / 60cm → 約1.0 / 1.3 / 1.6秒）。",
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
          spradleyJa: {
            do: "完成した散布図をみんなで読み取り、結論を導く。",
            makeUse: "プロジェクター（完成したグラフ）。黒板。",
            say: "「何が見える？」→ 長さ↑ なら 周期↑。",
            feel: "集中して、解釈している。"
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
          descriptionJa:
            "「よそく・結果・わかった」の3部構成の枠組みを初めて使う。プロジェクターに映したGoogleドキュメントで、黒のプロンプト・赤のモデル解答という色分けを用いる。先生がその場でモデルを示し、続いて子どもが書く。",
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
          spradleyJa: {
            do: "先生が枠組みのモデルを示し、続いて子どもが自分のものを仕上げる。",
            makeUse: "投影したGoogleドキュメント（黒のプロンプト／赤のモデル解答）。紙の枠組み。",
            say: "よそく・結果・わかった。",
            feel: "先生に導かれながら、振り返りの書き方を初めて学ぶ。"
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
          descriptionJa: "ふりこの学習を口頭でまとめて締めくくる。",
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
          spradleyJa: {
            do: "探究を閉じるため、要点を言い直す。",
            makeUse: "黒板。",
            say: "先生がまとめる。長さが周期に影響する。",
            feel: "学びを固める。"
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
          descriptionJa:
            "子どもは紙の枠組みを、決められた折り方の指示に従ってノートに貼る。意図的なアナログの締めくくり。プロジェクターは消灯。",
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
          spradleyJa: {
            do: "紙の枠組みを折り、自分のノートに貼る。",
            makeUse: "紙の枠組み。ノート。のり。",
            say: "正確な折り方と貼り方の指示。",
            feel: "整然として手を動かす、アナログな締めくくり。"
          },
          sceneFlags: { notebookPaste: true }
        }
      ]
    },

    v2: {
      id: "v2",
      label: "Visit 2",
      labelJa: "2回目",
      date: "Monday, 25 May 2026",
      dateJa: "2026年5月25日（月）",
      timeRange: "9:30-10:15",
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
          descriptionJa:
            "メガ（大きな壁掲示）＋ミニ（個人用のコピー）の復習システムを用意する。どちらも1回目の振り返りのプロンプトを示している。",
          analogTools: ["Mega sheet", "Mini sheets", "Blackboard"],
          digitalTools: [],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "analog",
          spradley: {
            do: "Post the Mega (wall) + Mini (per-student) review sheets carrying Visit 1's reflection prompts.",
            makeUse: "Mega wall sheet; Mini copies; blackboard.",
            say: "Orienting students to the posted prompts.",
            feel: "Settled, routine - familiar territory."
          },
          spradleyJa: {
            do: "1回目の振り返りのプロンプトを載せた、メガ（壁）＋ミニ（個人用）の復習シートを掲示する。",
            makeUse: "メガの壁掲示。ミニのコピー。黒板。",
            say: "掲示したプロンプトに子どもの注意を向ける。",
            feel: "落ち着いた、いつもの流れ。慣れた様子。"
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
          descriptionJa:
            "黒板を使った復習。子どもは掲示したシートを参照する。",
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
          spradleyJa: {
            do: "黒板で前回の学習を復習し、子どもは掲示したシートを参照する。",
            makeUse: "黒板。掲示した参照シート。",
            say: "前回の発見を一緒に振り返る。",
            feel: "思い出し、前の学びとつながり直す。"
          },
          sceneFlags: {}
        },
        {
          id: "v2p3",
          n: 3,
          title: "Tool Demonstration & Reflection Recap",
          titleJa: "道具の実演・振り返りの再確認",
          startTime: "9:40",
          endTime: "9:50",
          durationMin: 10,
          description:
            "Teacher demos tools, reviews Visit 1 reflections, reinforces the 3-part scaffold. Students reference prior prompts unprompted (internalization evident).",
          descriptionJa:
            "先生が道具を実演し、1回目の振り返りを見直し、3部構成の枠組みを補強する。子どもは促されずに前回のプロンプトを参照する（内面化が見える）。",
          analogTools: ["Paper scaffold"],
          digitalTools: ["Google Docs", "Projector"],
          teacherPosition: "front",
          projectorState: "docScaffold",
          emphasis: "digital",
          spradley: {
            do: "Demo tools, review Visit 1 reflections, reinforce the scaffold.",
            makeUse: "Projected Google Docs; paper scaffold.",
            say: "Re-explaining よそく / 結果 / わかった.",
            feel: "Familiar - students recall the routine on their own."
          },
          spradleyJa: {
            do: "道具を実演し、1回目の振り返りを見直し、枠組みを補強する。",
            makeUse: "投影したGoogleドキュメント。紙の枠組み。",
            say: "よそく・結果・わかった を再説明する。",
            feel: "慣れている。子どもは自分から流れを思い出す。"
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
            "New question: how does weight affect speed? Students choose their own variable (weight OR length) - agency. On-screen colour changes cue note-taking.",
          descriptionJa:
            "新しい問い。重さは速さにどう影響するか。子どもは変数（重さか長さ）を自分で選ぶ（主体性）。画面の色の変化が記録のタイミングを合図する。",
          analogTools: ["Blackboard"],
          digitalTools: ["Projector"],
          teacherPosition: "front",
          projectorState: "off",
          emphasis: "neutral",
          spradley: {
            do: "Pose the new question; students choose their own variable to test.",
            makeUse: "Projector (on-screen colour cue); blackboard.",
            say: "“Weight or length - you choose.”",
            feel: "Agency; deciding their own inquiry."
          },
          spradleyJa: {
            do: "新しい問いを示し、子どもが試す変数を自分で選ぶ。",
            makeUse: "プロジェクター（画面の色の合図）。黒板。",
            say: "「重さか長さか、自分で選んでね」。",
            feel: "自分の探究を自分で決める（主体性）。"
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
          descriptionJa:
            "選んだ実験を行う。8分の時点で、そろそろまとめる、という口頭の声かけが入る。先生は机間を回る。",
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
          spradleyJa: {
            do: "選んだ実験（重さか長さ）を行う。",
            makeUse: "ふりこの実験器具。ワークシート。",
            say: "班での話し合い。先生は短い助言をしながら回る。",
            feel: "忙しく、自分たちで進める。"
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
          descriptionJa:
            "多くの子どもが片付けをするあいだ、記録係が測定値を入力し、グラフがリアルタイムで更新される。並行して進む様子に、役割の内面化が表れている。",
          analogTools: [],
          digitalTools: ["Google Sheets", "学びポケット", "Projector"],
          teacherPosition: "front",
          projectorState: "liveGraph",
          emphasis: "digital",
          spradley: {
            do: "Tidy up while one student enters measurements; graph updates live.",
            makeUse: "学びポケット → shared Google Sheet; projector.",
            say: "Little instruction needed - roles run in parallel.",
            feel: "Internalized routine; runs itself."
          },
          spradleyJa: {
            do: "片付けをしながら1人が測定値を入力し、グラフがリアルタイムで更新される。",
            makeUse: "学びポケット → 共有のGoogleスプレッドシート。プロジェクター。",
            say: "ほとんど指示は要らない。役割が並行して動く。",
            feel: "内面化された流れ。自然に回っていく。"
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
            "Students attempt the scaffold independently first (2-3 min) before the teacher models - a shift from Visit 1. Closing links to playground swings (ブランコ) and previews Newton's Laws: the teacher drops two objects and asks students to predict.",
          descriptionJa:
            "子どもはまず自分で枠組みに取り組み（2〜3分）、その後に先生がモデルを示す。1回目からの変化。締めくくりは公園のブランコにつなげ、ニュートンの法則を予告する。先生が2つの物を落とし、子どもに予想をたずねる。",
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
          spradleyJa: {
            do: "子どもがまず自分で枠組みに挑み、その後に先生がモデルを示す。最後にニュートンの法則の落下の演示で締める。",
            makeUse: "投影したGoogleドキュメント（黒／赤）。予想の合図として落とす2つの物。",
            say: "「これを落としたら何が起きるか予想して」。ブランコにつなげる。",
            feel: "自分たちで進め、先を見ている。"
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
      "The teacher's deliberate circulation (≈10 s-1 min per group)",
      "Google Sheets real-time shared visualization",
      "Google Docs colour-coded (black / red) reflection modeling",
      "The よそく・結果・わかった reflection scaffold",
      "Apple Watch timing; a calm-but-energetic demeanor",
      "Students' comfort with the digital tools"
    ],
    sameAcrossJa: [
      "物理的な場、登場人物、班の役割構成",
      "先生の意図的な机間指導（1班あたり約10秒〜1分）",
      "Googleスプレッドシートによるリアルタイムの共有可視化",
      "Googleドキュメントの色分け（黒／赤）による振り返りのモデル提示",
      "よそく・結果・わかった の振り返りの枠組み",
      "Apple Watchでの時間管理。穏やかだが活気のある物腰",
      "子どものデジタル機器への慣れ"
    ],
    changed: [
      { title: "Reflection scaffold timing", titleJa: "振り返りの枠組みのタイミング", v1: "Teacher models immediately", v1Ja: "先生がすぐにモデルを示す", v2: "Students attempt independently first, then the teacher models", v2Ja: "子どもがまず自分で試し、その後に先生がモデルを示す", note: "intentional progression toward autonomy", noteJa: "自立へ向けた意図的な段階づけ" },
      { title: "Student familiarity", titleJa: "子どもの慣れ", v1: "Scaffold introduced for the first time", v1Ja: "枠組みを初めて導入する", v2: "Students reference the scaffold unprompted (internalization)", v2Ja: "子どもが促されずに枠組みを参照する（内面化）" },
      { title: "Experimental agency", titleJa: "実験の主体性", v1: "Fixed variable (length)", v1Ja: "変数は固定（長さ）", v2: "Students choose their variable (weight vs. length)", v2Ja: "子どもが変数を選ぶ（重さか長さ）" },
      { title: "Peer norm enforcement", titleJa: "仲間どうしによる規範の運用", v1: "-", v1Ja: "なし", v2: "Off-task student redirected by peers, no teacher involvement", v2Ja: "課題から外れた子を、先生の介入なしに仲間が立て直す" },
      { title: "Forward linking", titleJa: "先へのつなぎ", v1: "-", v1Ja: "なし", v2: "Closes with a Newton's-Laws preview (cross-unit awareness)", v2Ja: "ニュートンの法則の予告で締める（単元を越えた見通し）" },
      { title: "Observer friction", titleJa: "観察者による摩擦", v1: "Re-introductions; class settling in", v1Ja: "再度の自己紹介。クラスが落ち着くまで", v2: "Lower - no re-introductions, sharper focus", v2Ja: "より小さい。自己紹介の繰り返しがなく、集中が高まっている" },
      { title: "Blackboard", titleJa: "黒板", v1: "Fewer reference sheets", v1Ja: "参照シートが少ない", v2: "More accumulated reference sheets", v2Ja: "参照シートがより多く積み重なる" }
    ]
  },

  /* Interview hotspot layer - added in build Phase 3 (spec §3.7).
     Question + answer text lives in findings.js (window.FW_FINDINGS) so it can
     be pasted in after the 29 May 2026 interview without editing scene code.
     anchorKey values will map to named objects returned by the scene builder,
     e.g. "teacher", "projector", "dataEntryStudent", "pendulum",
     "blackboard", "appleWatch", "doorway", "room". */
  hotspots: [
    { id: "teacher",    anchorKey: "teacher",    label: "T-sensei",                      labelJa: "T先生",                       theme: "Teacher background, beliefs & assessment",      themeJa: "教師の背景・信念・評価",           questionIds: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q17", "Q18"] },
    { id: "projector",  anchorKey: "projector",  label: "Projector - Doc scaffold",       labelJa: "プロジェクター・ドキュメントの枠組み", theme: "Analog → digital translation & lesson design",  themeJa: "アナログ → デジタルの翻訳と授業設計", questionIds: ["Q11", "Q13", "Q14"] },
    { id: "dataEntry",  anchorKey: "dataEntry",  label: "Data-entry student · Sheets",     labelJa: "記録係の子ども・スプレッドシート",   theme: "Digital access vs. constraint",                 themeJa: "デジタルのアクセスと制約",         questionIds: ["Q12"] },
    { id: "pendulum",   anchorKey: "pendulum",   label: "Experiment · pendulum",          labelJa: "実験・ふりこ",                  theme: "Student agency",                                themeJa: "子どもの主体性",                 questionIds: ["Q15"] },
    { id: "blackboard", anchorKey: "blackboard", label: "Blackboard & reference sheets",  labelJa: "黒板と参照シート",              theme: "Preparation & improvement",                     themeJa: "準備と改善",                     questionIds: ["Q16"] },
    { id: "room",       anchorKey: "room",       label: "The lab & school environment",   labelJa: "理科室と学校の環境",            theme: "School environment, colleagues & conditions",   themeJa: "学校環境・同僚・条件",           questionIds: ["Q7", "Q8", "Q9", "Q10", "Q19", "Q20", "Q21", "Q22"] }
  ]
};
