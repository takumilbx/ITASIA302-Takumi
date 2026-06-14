/* =============================================================================
   INTERVIEW LAYER  -  window.FW_FINDINGS
   Interview with T-sensei (T先生) · 29 May 2026

   Loaded as a CLASSIC script so it works on file:// and stays editable
   WITHOUT touching the scene code.

   findings[QN] shape:
     { summary: string, summaryJa: string, quoteEn: string, quoteJa: string }
   summary    : English analytical gloss (T-sensei is referred to as she/her).
   summaryJa  : Japanese analytical gloss, shown when the page language is "ja".
   quoteEn / quoteJa : optional verbatim quote — omit when none exists. The
   Japanese quote stays visible in both languages (it is the primary evidence).
   ========================================================================== */

window.FW_FINDINGS = {
  date: "29 May 2026",
  pendingLabel: "Pending: interview 29 May 2026",
  pendingLabelJa: "保留：2026年5月29日のインタビュー",

  // questionId -> { en: English gloss, ja: verbatim Japanese }
  questions: {
    Q1:  { en: "Tell me about your background and how you became a science subject teacher.",
           ja: "先生のご経歴と、理科の専科教員になった経緯を教えてください。" },
    Q2:  { en: "What formal training, if any, did you receive for teaching with ICT?",
           ja: "ICTを使った授業についての研修は、大学や教育実習で受けましたか？" },
    Q3:  { en: "When and how did you first start using ICT in your teaching?",
           ja: "ICTを授業で使い始めたのはいつ頃で、どんなきっかけでしたか？" },
    Q4:  { en: "What do you think ICT is good for — and not good for — in science class?",
           ja: "理科の授業において、ICTが得意なことと苦手なことは何だと思いますか？" },
    Q5:  { en: "How did you learn the specific methods you use (the scaffold, the colour system, etc.)?",
           ja: "今使っている授業の手法（振り返りの枠組みや色分けなど）はどこで学びましたか？" },
    Q6:  { en: "How much of your ICT skill came from practice rather than formal instruction?",
           ja: "ICTのスキルは研修で学んだ部分と実践・同僚から学んだ部分、どちらが多いですか？" },
    Q7:  { en: "How was the GIGA one-to-one terminal rollout handled at your school?",
           ja: "GIGAスクールの一人一台端末は、学校でどのように導入されましたか？" },
    Q8:  { en: "What is your school's ICT policy, and how does it shape your lessons?",
           ja: "学校のICT活用に関するルールはどのようなもので、授業にどう影響していますか？" },
    Q9:  { en: "What support or training does the school provide for ICT use?",
           ja: "ICT活用や授業づくりについて、学校からどのようなサポートや研修がありますか？" },
    Q10: { en: "What is the leadership's stance on ICT in teaching?",
           ja: "校長先生などの管理職は、授業でのICT活用についてどのようなお考えをお持ちですか？" },
    Q11: { en: "Was the black-prompt / red-model-answer colour system a conscious translation of your blackboard chalk technique?",
           ja: "GoogleドキュメントでプロンプトとモデルAnswerを黒と赤で色分けしているのは、黒板の色チョークの使い方をデジタルに置き換えた意識的な工夫ですか？" },
    Q12: { en: "Why fix data entry to one student per group — preventing data chaos, or managing off-task screen use?",
           ja: "スプレッドシートのデータ入力をグループで1人に限定していたのは、データの混乱を防ぐためですか？それとも端末の私的利用を防ぐためですか？" },
    Q13: { en: "What is your reasoning behind the three-part reflection scaffold (よそく・結果・わかった)?",
           ja: "よそく・結果・わかった という3部構成の振り返りシートを使い始めた理由を教えてください。" },
    Q14: { en: "Why model the scaffold immediately in Visit 1, but let students attempt it first in Visit 2?",
           ja: "1回目の授業ではすぐにモデルを見せ、2回目では先に生徒に書かせたのは意図的な違いですか？" },
    Q15: { en: "Why let students choose their variable (weight vs. length) — student agency, or the need for comparable data?",
           ja: "実験する変数を生徒が選べるようにしていたのは、主体性のためですか？それともデータの比較のためですか？" },
    Q16: { en: "How do you prepare the reference materials — the time cost, and how they iterate between classes?",
           ja: "掲示物やワークシートなどの教材の準備にどのくらい時間がかかりますか？授業後に生徒の書いたものを読むのはどれくらいですか？" },
    Q17: { en: "How do you plan the timing of each phase — pre-planned or from experience? How heavy is the cognitive load?",
           ja: "授業の各フェーズの時間配分はどのように決めていますか？事前に計画しますか、それとも経験から判断しますか？" },
    Q18: { en: "How do you know students truly understand, beyond just completing the task?",
           ja: "生徒が課題をこなすだけでなく、本当に理解しているかどうかをどのように確認していますか？" },
    Q19: { en: "How do other teachers at your school use ICT?",
           ja: "学校の他の先生方はICTをどのように活用していますか？" },
    Q20: { en: "How do you exchange methods and information with colleagues?",
           ja: "同僚と授業の方法や情報をどのように交換していますか？" },
    Q21: { en: "How do you and your colleagues influence each other's ICT practice?",
           ja: "先生方はお互いのICT活用にどのような影響を与え合っていますか？" },
    Q22: { en: "Would your lesson design differ if this lab weren't dedicated to Grade 5?",
           ja: "この理科室が5年生の専用でなく、他の学年と共用だったとしたら、授業の設計は変わりますか？" }
  },

  // questionId -> { summary, summaryJa, quoteEn, quoteJa }
  findings: {

    Q1: {
      summary: "12th year of teaching; started straight from university. First 7 years as a generalist homeroom teacher covering all subjects (全科), then became a science specialist after this school moved to a subject-division system — a policy set by the principal. University major was science within the Faculty of Education.",
      summaryJa: "教師12年目。大学卒業後そのまま教員に。最初の7年は全科担任として全教科を教え、この学校が教科担任制に移行してから理科の専科になった。これは校長の方針。大学では教育学部で理科を専攻。",
      quoteEn: "This is my first job. I graduated from university and became a teacher straight away. I'm now in my 12th year. I've been a 5th- and 6th-grade homeroom teacher the whole time. For the first seven years I taught all subjects; after I came to this school, for the last five years I've taught science.",
      quoteJa: "もうこれが初めての仕事なので…大学卒業してそのまま教員になりました。今教職は12年目で…56年生の担任をずっとしてきて…最初の7年間は全科って言って全部の教科を教えてました。この学校に来てからは残りの5年は理科を担当しています。"
    },

    Q2: {
      summary: "Pre-service training gave essentially nothing useful for ICT. The practicum focused on basic pedagogy; university covered very little on technology use. All practical ICT competence was built afterward through colleagues and self-directed practice.",
      summaryJa: "養成段階で、ICTに役立つものはほぼ得られなかった。教育実習は基本的な授業づくりが中心で、大学でも技術活用の扱いはごくわずか。実践的なICT力はすべて後から、同僚から学びながら自分で実践を重ねて身につけた。",
      quoteEn: "During the practicum, honestly, no. It was more basic things — how to run a lesson. And at university there wasn't much [on ICT] either.",
      quoteJa: "教育実習の時は正直ありませんでした。実習の時はICTを使うっていうよりかはもっと基本的な授業の仕方とか、そういうのを教えてもらって…大学でもそんなにたくさんはなかったと思います。"
    },

    Q3: {
      summary: "Started 5–6 years ago during COVID at the previous school. The mood then was 'use tablets for everything' — maximalist adoption that, by her account, mostly failed. This failure pushed her toward a selective, fit-to-purpose stance.",
      summaryJa: "5〜6年前、前任校でコロナ禍に使い始めた。当時は「何でもタブレットで」とにかく使おうという空気で、本人いわく多くはうまくいかなかった。その失敗が、目的に合わせて選ぶという今の姿勢につながった。",
      quoteEn: "Back then the mood was just 'use tablets for everything.' Everyone did. I tried all sorts of things, but the children were new to it too, so a lot of it didn't work well — I felt it wasn't quite there yet.",
      quoteJa: "その時はとにかく何でもかんでもタブレットを使おうみたいな、そういう風潮だったんですよ。みんなが。色々使ったんですけど、結局子供も初めてだったからうまくいかないことが多くって、いまいちだなって思ってました。"
    },

    Q4: {
      summary: "Science and ICT are a natural match because science involves observation and experiment — photos, video, and real-time data recording all play to digital's strengths. The governing logic is fit-to-purpose: not digital for everything, but digital where its affordances genuinely add value.",
      summaryJa: "理科は観察と実験が中心で、写真・動画・リアルタイムの記録というデジタルの強みと相性がよい。基本方針は、目的に合っているかどうか。何でもデジタルではなく、デジタルの良さが本当に生きる場面で使う。",
      quoteEn: "Science is basically a lot of observation and experiment — that matches the strengths of digital well. You can record photos and video, so I wanted to use it actively there. The character of science and the strengths of ICT match.",
      quoteJa: "理科って基本的には観察とか実験とかが多いじゃないですか。それってデジタルのいいところと相性がいいと思ったんですよね。写真とか動画とか記録できるところなので、そこでは積極的に使っていきたいなって。理科の特徴とICTの良さがマッチするなと思ってます。"
    },

    Q5: {
      summary: "Everything useful came from colleagues — seeing what other teachers use, being told 'this is good.' Municipality-specific tools mean university learning doesn't transfer; only what peers are actually using in the same environment is actionable.",
      summaryJa: "役立ったのはすべて同僚から。他の先生が使うのを見て「これいいよ」と教わる。自治体ごとに使えるツールが違うため大学で学んだことは役に立たず、同じ環境で実際に使っている人から聞いた情報だけが授業に活かせる。",
      quoteEn: "I don't use anything I learned at university at all. What helped far more was colleagues — seeing other teachers use something, being told 'this is good.' Different municipalities have different available tools, so it's better to ask people who actually use them.",
      quoteJa: "全然大学で習ったことは使ってません。…他の先生が使ってるのを見たり、「あれいいよ」って教えてもらった方が参考になった。自治体によって入ってる使えるツールが違うじゃないですか。実際に使えるものを使ってる人に聞いた方が自分の授業に入れやすい。"
    },

    Q6: {
      summary: "Roughly 10% formal training, 90% colleagues and practice. A 60-minute training session might yield one or two usable takeaways. She volunteered this was something she perhaps shouldn't say aloud — then said it anyway.",
      summaryJa: "正式な研修が約1割、同僚と実践が約9割。60分の研修で使えるのは1〜2個ほど。本人は「言ってはいけないかもしれない」と前置きしつつ、それでも語った。",
      quoteEn: "I maybe shouldn't say this, but I really think that's true. With formal training — a 60-minute session — you come out thinking, 'maybe there were one or two usable things.' So perhaps 10% from formal training, and the rest from teachers and from practice.",
      quoteJa: "こんなこと言っちゃいけないかもしれないけど本当にそうだと思います。60分の研修を受けて、使えること1個か2個あるかなみたいな感じで…10%ぐらい正式な研修で学んだことを生かしてるかもしれないですけど、残りは全部先生とかいろんな先生たちとの実践の中で、かと思います。"
    },

    Q7: {
      summary: "By the time T-sensei arrived at this school (around 2021), GIGA devices had been in place for about a year. Older teachers found the transition difficult; the school has many younger teachers who adapted without much trouble.",
      summaryJa: "本人がこの学校に来た頃（2021年頃）には、GIGA端末はすでに1年ほど導入済みだった。年配の先生は移行に苦労したが、この学校は若い先生が多く、大きな苦労はなかった。",
      quoteEn: "It's a bit rude to say, but older teachers tend to find it difficult. We have quite a lot of younger teachers, though, so they didn't seem to struggle much.",
      quoteJa: "言っちゃ悪いけど、年配の先生はちょっと難しいって言うじゃないですか。だけど割とうち若い先生が多いので、そんなに苦労されてる感じではなかったです。"
    },

    Q8: {
      summary: "Children are told to use devices only for learning. Enforcement is through confiscation — losing the right to take the device home. The mechanism works because having free access is the thing children value, and social pressure (not wanting to be the only one without it) reinforces compliance.",
      summaryJa: "子どもには学習目的のみの利用を指導。徹底は没収（持ち帰りの権利を失う）で行う。自由に使えること自体が子どもにとっての価値であり、「自分だけ無いのは嫌だ」という同調圧力も順守を支える。",
      quoteEn: "Confiscation. [...] Having it freely is the value, for the children. They follow the rules because they don't want it confiscated; and they hate being the only one without it.",
      quoteJa: "没収です。"
    },

    Q9: {
      summary: "An ICT support staff member (dispatched from an outsourced company, not a teacher) visits a few times a month for technical help and runs training quarterly. Pedagogical suggestions come mainly through the vendor product: Benesse's Mirai Seed (Oqrand Plus).",
      summaryJa: "ICT支援員（外部委託の派遣で、教員ではない）が月に数回来て技術的に支援し、3か月に1回ほど研修を行う。指導面の示唆は主に導入されている製品（ベネッセのミライシード／オクリンク プラス）から得ている。",
      quoteEn: "There's an ICT support staff member who comes a few times a month and helps, and runs training about once every three months.",
      quoteJa: "ICT支援員っていう、アシスタントする人が月に何回か来てくれてサポートはしてくれてます。その方が3ヶ月に1回ぐらい研修も開いてくれてます。"
    },

    Q10: {
      summary: "The principal's position is unambiguous: use ICT more and more. Policy flows down from the principal, and also aligns with Tokyo Metropolitan Board of Education and MEXT directives pushing ICT across all schools.",
      summaryJa: "校長の姿勢は明確で、「どんどん使おう」。方針は校長から下りてくると同時に、ICTを全校に推し進める東京都教育委員会や文部科学省の方向性とも一致している。",
      quoteEn: "Our principal says we should use it more and more. So the school policy comes down from the principal.",
      quoteJa: "うちの校長先生はどんどん使おうっていう、そういう印象です。"
    },

    Q11: {
      summary: "Not a conscious translation of chalk technique. She introduced the color system because she thought it would help children see 'where they should think' — not because she was deliberately porting an analog method to digital. The observer read intent that wasn't there.",
      summaryJa: "チョーク技法の意識的な置き換えではない。色分けは「自分はどこを考えればよいか」を子どもが見やすくなると思って入れたもので、アナログの手法を意図的にデジタルへ移したわけではない。観察者が読み取った意図は、実際にはなかった。",
      quoteEn: "I didn't feel like I was importing something from teacher training. It was more that I thought it'd be easier for the children to see where they should think. I wasn't being very conscious about it.",
      quoteJa: "教育学部で習ったことを入れたっていう感覚はなくて、それよりも子供が自分はどこを考えればいいのか分かりやすいかなと思って入れていて、あんまり意識的じゃなかったかもしれない。"
    },

    Q12: {
      summary: "Primarily to prevent data confusion — if everyone enters at once, the spreadsheet becomes chaos. A secondary benefit: assigning roles prevents boredom, and 'you get to touch the tablet' makes the otherwise dull recording role desirable, energizing role-sharing.",
      summaryJa: "主にデータの混乱を防ぐため。全員が同時に入力すると表が混乱する。副次的な効果として、役割を与えると退屈を防げる。記録係は地味だが「タブレットに触れる」ことで人気が出て、役割分担が活気づく。",
      quoteEn: "Simply to prevent data confusion — and also, if you don't assign roles, [some children] get bored. The recorder's job is plain, but 'you get to touch the tablet' makes it popular, so it energizes the role-sharing. If everyone does it at once, it becomes chaos.",
      quoteJa: "これは単純にデータの混乱を防ぐためと、あと役割を与えないと暇になってしまう。4人半で1人は重りとか振れ幅とか記録をやってて、記録係って地味なんですよね。だけどタブレット触れるって言ったら人気が上がる。…みんなでやるとわけわかんなくなるので。"
    },

    Q13: {
      summary: "Writing the science analysis (考察) is very hard without structural scaffolding. In the April unit students could barely write anything; from May, the よそく・結果・わかった framework gave them the skeleton they needed. Without being taught key points, they cannot write.",
      summaryJa: "理科の考察を書くのは、構造の支えがないととても難しい。4月の単元では子どもはほとんど書けなかったが、5月から「よそく・結果・わかった」の枠組みが必要な骨組みを与えた。要点を教えなければ子どもは書けない。",
      quoteEn: "In science, there's the summing-up part of an experiment — the analysis (考察). Writing the analysis is very hard, so unless you give them the structure for how to write it, they can barely write anything. Without being taught the key points, they can't write it.",
      quoteJa: "理科で実験のまとめ的な部分、考察って言うんですけど、考察って書くのがすごく難しいところなので、その書き方の分けを入れてあげないとほとんど書けないんですね。…5月のこの単元からこれを始めたんですけど、4月の単元では全然考察書けなかったんです。ポイントを教えてあげないと書くことができないので。"
    },

    Q14: {
      summary: "Deliberate staged progression: the first lesson, everyone follows together (no choice); subsequent lessons give students time to attempt independently first, then compare to the model. Support fades as competence grows — a scaffolded build-up.",
      summaryJa: "意図的な段階づけ。最初の授業は選択肢なく全員で一緒に取り組み、その後の授業ではまず自分で試す時間を取り、モデルと比べる。力がつくにつれ支援を減らしていく、段階的な積み上げ。",
      quoteEn: "At first you have no choice, so everyone does it properly together; after that you give them time to try it themselves. It's a staged build-up.",
      quoteJa: "最初はしょうがないからちゃんとみんなでやって、その後は自分でちょっとやってみようっていう時間を取って、っていう段階を。"
    },

    Q15: {
      summary: "The variable order was pedagogically fixed: length must come first because it is the only variable that actually affects the period. Starting with a non-effective variable risks data scatter being misread as 'it changed.' Once length establishes the clear pattern, the other two are safe to explore in any order — and those were handed to students as genuine agency.",
      summaryJa: "変数の順序は教育的に固定されていた。周期に実際に影響するのは長さだけなので、長さを最初にやる必要がある。周期に影響しない変数から始めると、わずかなデータの差を「変わった」と思い込みかねない。長さで明確な関係を示せば、残り2つはどの順でも安全に扱える。その2つは本物の主体性として子どもに委ねた。",
      quoteEn: "Of the three [variables], one had to be done first. That was length. Only length actually matters, so it has to go first. [...] So I decided length must go first; the other two didn't matter, so to give the children agency I said 'either is fine.'",
      quoteJa: "完全にどっちでも良かったんですよ。3つのうち1つだけ最初にやらないといけなかった。それは長さ。長さしか関係ないから先にやらないと…変わらないものからやると、ちょっとしたデータの差で「変わった」って言っちゃう。けど振り子の長さで完全に変わったものを見せておけば、残りの2つはデータがばらついても変わらないと分かる。だから長さだけは先にやらなきゃいけないので私が主導で決めて、あと2つはどうでも良かったので子供が主体的に…今回は急いでたんで。"
    },

    Q16: {
      summary: "Display materials take 30 min–1 hour to prepare, but this year's were reused from prior years — mainly printing. Reading students' written work after a lesson takes about 20 minutes per class. After finding some students couldn't accept the weight result, she added a correction activity.",
      summaryJa: "掲示物の準備は30分〜1時間だが、今年は前年までのものを再利用し、主に印刷のみ。授業後に子どもの記述を読むのは1クラス約20分。重さの結果を受け入れられない子どもがいると分かり、訂正の活動を加えた。",
      quoteEn: "This time it was just printing and preparing the large version: about 30 minutes to an hour. Reading the children's work after a lesson is about 20 minutes per class.",
      quoteJa: "掲示物を用意するのは振り子の勉強の前に全部印刷したり作ったりするので…でも今回は元々あったんですよ。去年も一昨年も同じもの使ってて。だから今回やったのは印刷するのと大きいのを用意するのだけなので30分とか1時間ぐらい。授業が終わった後、子供たちのを見るのも1クラス20分くらい。"
    },

    Q17: {
      summary: "Rough experiential feel — not detailed planning. The one firm rule: always reserve the last ~10 minutes for the summary (まとめ). Stopping halfway leaves a gap and children lack a sense of closure (すっきり感).",
      summaryJa: "細かな計画ではなく、経験による大まかな感覚。唯一の固い決まりは、最後の約10分を必ずまとめに残すこと。途中で止めると間延びし、子どもの「すっきり感」が損なわれる。",
      quoteEn: "From experience I can roughly tell. Not in detail, but I'm always conscious that the last ~10 minutes must be kept for the summary. Otherwise it doesn't finish; and if you stop halfway it leaves a gap, and the children's sense of closure is different. I pay quite a lot of attention to time.",
      quoteJa: "時間配分は経験で大体分かる。細かくはないですけど、このラスト10分ぐらいはまとめの時間に取らないといけないなっていうのはいつも意識してますね。…途中で終わっちゃうと結構開いちゃう…子供のすっきり感が違うので。時間は割と気にします。"
    },

    Q18: {
      summary: "By eye, and by knowing the children from daily contact. She declines the obvious 'check the spreadsheet' route: whether writing is progressing can be seen in data, but whether an experiment is going well cannot. Physical presence — not data — is the primary monitoring tool.",
      summaryJa: "目視と、日々の関わりから子どもを知っていること。「表を確認する」という分かりやすい手段はあえて採らない。記述の進みはデータで見えるが、実験がうまくいっているかはデータでは見えない。直接見ることが第一の把握手段。",
      quoteEn: "By eye. And these are children I work with daily, so without even asking I can tell from the group's make-up: 'this child plus this child plus this child won't work well.' [...] Whether the writing is coming along, you can indeed check that way. But whether the experiment is going well isn't easy to see from data — you have to look directly.",
      quoteJa: "もう目視。あとやっぱり普段関わってる子たちなので、聞かなくても分かる。子供の構成で「この子とこの子とこの子じゃうまくいかないな」みたいな。\n…文章が書けてるかどうかは確かにそうやっても見れると思うんですけど、実験がうまくいってるかどうかはデータじゃ見にくいかなと思って。直接見た方が正確。欠けているかどうかは物を見ないと分かんない。"
    },

    Q19: {
      summary: "Every school runs a monthly research lesson (研究授業) where ICT use is now expected as a matter of course — not optional. Day-to-day glimpses of colleagues are equally important. Younger teachers at this school adapted without difficulty; older teachers found it harder.",
      summaryJa: "どの学校でも月1回の研究授業があり、ICTの上手な活用は今や当然に組み込むべきものとされる。日々の何気ない観察も同じく重要。この学校の若い先生は難なく適応し、年配の先生は苦労した。",
      quoteEn: "Basically every school runs a research lesson once a month, and using ICT skillfully is something you're now expected to include as a matter of course. So I see it there, or just catch glimpses day to day.",
      quoteJa: "基本的にどこの学校でも毎月1回研究授業をしていて、ICTを上手に活用していくっていうのはもう当たり前に入れなきゃいけないところなので、そういうところで見たり、日々ちらっと見たり。"
    },

    Q20: {
      summary: "Staffroom talk (once or twice a week) and a shared card box of reusable lesson materials are the main channels. The most valuable exchanges are unplanned — informal 'by the way, I tried this and it worked' moments, not formal discussion sessions.",
      summaryJa: "職員室での会話（週1〜2回）と、再利用できる教材の共有カードボックスが主な経路。最も役立つのは計画されていない交換で、改まった話し合いではなく「そういえばこれ試したら良かったよ」という何気ない場面。",
      quoteEn: "A good proportion is talking in the staffroom. We say 'I'm thinking of doing this in class next time,' and there's a shared card box where teachers put materials others can use. [...] When I'm relaxed is when I'm taught things most.",
      quoteJa: "教員室で話すのも結構な割合あります。「今度授業でこれやろうと思うんだよね」みたいに話したり…これって共有できるんですよ、みんなのカードボックスみたいな。違う先生のやつを「これいいな」みたいにもらったり。\n…「よし話し合おう」ってやってる時じゃなくて、「そういえばこれやってみたんだけど良かったよ」みたいな、リラックスした感じの時に教えてもらうことが多い。"
    },

    Q21: {
      summary: "Personal networks cross school boundaries: a high-school friend (Sakasegawa-san) introduced her to Google Gemini. She uses it on a personal account because the Ōta Ward blocks AI on official accounts — applied twice for approval (Gemini and TOMOLINKS), rejected both times. 'Ōta is slow.'",
      summaryJa: "個人的なつながりは学校の枠を越える。高校の友人（逆瀬川さん）からGoogle Geminiを教わった。大田区が公式アカウントでAIをブロックするため個人アカウントで使う。承認を2回申請（GeminiとTOMOLINKS）し、いずれも却下。「大田区は遅い」。",
      quoteEn: "Sakasegawa taught me about Google Gemini and various things, and I used that a fair amount. [It is restricted.] I can't use it on my official school account — but I use my personal account.",
      quoteJa: "逆瀬川さんと高校の友達なんですけど、そういう友達同士で教えてもらうことは結構あります。逆瀬川さんにGoogleのGeminiのこととか色々教えてもらって、それは結構使いました。"
    },

    Q22: {
      summary: "The dedicated science lab is pedagogically significant: materials left posted mean students step back into the lesson 'world' the moment they walk in. An ordinary classroom would require carry-in/carry-out every lesson, breaking that continuity. She also noted, reflectively, that analog's 'immersion' advantage over multiple digital screens is 'something sensory' she couldn't fully articulate.",
      summaryJa: "理科専用の教室があることには教育的な意味がある。掲示物を残せるため、子どもは入った瞬間に授業の「世界」に戻れる。普通教室なら毎時間の持ち運びが必要で、その連続性が途切れる。また、複数のデジタル画面に対するアナログの「没入感」の優位は「感覚的な何か」で、うまく言葉にできないと内省的に語った。",
      quoteEn: "In the science room I can leave everything up, so the moment the children walk in, the previous board is still there — 'oh, we were studying the pendulum' — and they step back into that world. In an ordinary classroom you'd have to start from 'what did we study again?' each time.",
      quoteJa: "理科室でずっとできるので、入った瞬間から「あ、振り子の勉強してたんだ」って前の黒板が残ってる。子供はその世界に入れる。だけど教室だったらまずそこから始めなきゃいけない。毎回出さなきゃいけないし、毎回教室だったら持っていかなきゃいけない。"
    }

  }
};
