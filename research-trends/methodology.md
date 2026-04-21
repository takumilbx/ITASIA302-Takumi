# Methodology Appendix — AI & Society Research Trends 2021–2025

*Companion to `AI_Society_Research_Trends.html`.*

## Corpus

- **Journal:** *AI & Society*, Springer Nature.
- **Scraping window:** all articles with publication date ≥ 2021-01-01 present in the online archive at the time of collection.
- **Analysis window:** calendar years 2021 through 2025 inclusive (five full years). Articles dated 2026-01 to 2026-04 are present in the underlying dataset but excluded from this report because 2026 is incomplete at the time of analysis (April 18 2026).
- **N analysed:** 1,653 articles.
- **Fields used:** `Title` (never null), `Abstract` (null in 549 / 1,849 rows of the full dataset; null abstracts are treated as empty strings for matching purposes — only the title carries signal in those cases), `Date Published`.

### Per-year article counts

| Year | Articles |
|---|---|
| 2021 | 196 |
| 2022 | 280 |
| 2023 | 203 |
| 2024 | 331 |
| 2025 | 643 |
| **Total (2021–2025)** | **1,653** |

The jump to 643 articles in 2025 (roughly 1.94× the 2024 output) is by far the steepest year-over-year change in the five-year window.

## Topic classification

Each article is checked against a set of regex patterns for each of eight topics. A match in either the title or the abstract tags the article with that topic. Articles may carry multiple topics (overlap is permitted); percentages are the share of that year's articles where the topic was detected and do not sum to 100.

### Design principles

1. **Word boundaries (`\b`) on every pattern** to avoid substring false positives (so `bias` does not match `biasing` or `unbiased` unless explicitly allowed).
2. **Compound phrases over bare common words** where a word is too generic on its own. For example, `\bwork\b` alone matches hundreds of irrelevant articles ("this work argues", "framework", "worked on"). The tightened `work` pattern requires compounds such as `labour market`, `future of work`, `workplace`, `gig economy`, `workforce`, `employment`.
3. **Cross-topic hygiene.** Each word belongs to exactly one topic. `regulation` is a **policy** word, not an **ethics** word; `governance` is an **ethics** word, not a **policy** word. Without this discipline, Ethics and Policy would double-count roughly half of each other's articles.
4. **Morphological variants** through regex alternation (`robot|robotic|robots|robotics`), not through substring matching.

### Per-topic keyword sets

Patterns are compiled with `re.IGNORECASE`. Alternation within groups follows Python regex syntax.

**Generative AI.** `generative ai`, `gen-ai` / `gen ai`, `large language model(s)`, `llm(s)`, `chatgpt`, `gpt(-\d+)?`, `foundation model(s)`, `generative (model|system|tool|technolog|image|video|text)`, `text-to-(image|video|speech)`, `diffusion model(s)`, `stable diffusion`, `midjourney`, `dall-e`, `prompt engineering`, `gemini`, `ai-generated`.

**Ethics & Governance.** `ethics?`, `ethical (ai|concerns?|implications?|issues?|dilemma|frameworks?|analysis|questions?|principles?)`, `ai ethics`, `governance`, `responsible ai`, `accountab(le|ility)`, `moral(ity|\s+status|\s+agency|\s+responsibility|\s+patiency|\s+reasoning)`, `normative (framework|analysis|concerns|considerations)`, `trustworthy ai`, `value alignment`. *Does not* include `regulat*` — that belongs to Policy.

**Policy & Regulation.** `ai (policy|regulation|law|legislation|governance|act)`, `technology policy`, `digital (policy|regulation|law|legislation)`, `eu ai act`, `gdpr`, `regulat(e|ing|ion|ions|ory|ed)`, `legislat(e|ion|ive|ing|ed)`, `compliance`, `public policy`.

**Creativity & Arts.** `creativ(e|ity)`, `art(s|ist|ists|istic|istry|work|works)`, `music(al|ian|ians)?`, `poetry`, `literature`, `paint(er|ing|ers|ings)`, `aesthetic(s|)`, `film(making|maker|makers|s)?`, `compos(er|ers|ition|itional|ing)`, `choreograph(y|er|ers|ic)`, `perform(ance|ative|ing|ers?) (art|arts|practice)`. *Does not* include bare `design`, `writing`, `author`, `culture` — these are too generic and sweep in too much irrelevant content.

**Bias & Fairness.** `bias(es|ed)?`, `fairness`, `algorithmic (fair|fairness|justice|equity|discrimination|bias)`, `discriminat(e|ion|ory|ing)`, `racial bias`, `gender bias`, `racial discrimination`, `equit(y|able)`, `marginali[sz]ed`.

**Education & Learning.** `teacher(s)?` / `teaching`, `student(s)?` / `pupil(s)?`, `classroom`, `school(s|ing)`, `higher education`, `education(al)? (system|context|technolog|institution|policy|setting|practice|research)`, `k-12`, `curricul(um|a)`, `pedagog(y|ical|ies)`, `literacy`, `learner(s)?`, `universit(y|ies)`, `ai-(literacy|education)`. *Does not* include bare `learning` — that matches `machine learning` on every AI paper.

**Work & Labour.** `labou?r (market|force|relations|rights|conditions)`, `future of (work|labou?r)`, `workplace`, `workforce`, `worker(s)? (rights?|conditions|protections?)`, `gig (economy|work|worker|workers)`, `automation (of|and) (work|labou?r|jobs|employment)`, `job (loss|losses|displacement|market|insecurity|polarization)`, `employment`, `unemployment`, `occupation(s|al)`, `human resources?`, `(algorithmic|ai) management`, `platform work(er|ers)?`, `technolog(y|ical) unemployment`, `ai (and|in) (work|the workplace|employment|labou?r)`, `digital labou?r`.

**Robots & HRI.** `robot(s)?`, `robotic(s)?`, `human-robot`, `hri`, `android(s)?`, `humanoid(s)?`, `cobot(s)?`, `social robot(s|ics)?`, `service robot(s)?`, `care robot(s)?`.

### Per-year prevalence (%)

| Topic | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|
| Ethics & Governance | 25.5 | 25.4 | 26.6 | 22.4 | 27.5 |
| Generative AI | 0.0 | 1.1 | 9.9 | 17.8 | 24.0 |
| Creativity & Arts | 16.3 | 17.5 | 16.7 | 17.8 | 18.8 |
| Bias & Fairness | 8.7 | 12.1 | 12.3 | 11.2 | 16.2 |
| Policy & Regulation | 10.7 | 10.0 | 9.9 | 14.2 | 11.8 |
| Education & Learning | 6.6 | 6.4 | 2.5 | 7.9 | 9.8 |
| Work & Labour | 1.5 | 2.5 | 2.5 | 4.5 | 4.4 |
| Robots & HRI | 18.9 | 7.5 | 11.8 | 5.7 | 3.7 |

### 2025 ranked snapshot (N = 643)

1. Ethics & Governance — 27.5% (177)
2. Generative AI — 24.0% (154)
3. Creativity & Arts — 18.8% (121)
4. Bias & Fairness — 16.2% (104)
5. Policy & Regulation — 11.8% (76)
6. Education & Learning — 9.8% (63)
7. Work & Labour — 4.4% (28)
8. Robots & HRI — 3.7% (24)

## Limitations

1. **Title + abstract only.** Full-text was not available through scraping. A topic discussed in the body but not mentioned in the abstract will not be detected. This biases the analysis toward topics that appear in article framing.
2. **English only.** All patterns are English; non-English articles (a small minority) will under-match.
3. **Keyword precision is a design choice.** A looser keyword set (e.g. bare `work`, bare `learning`, bare `design`) inflates topics at the cost of precision. A stricter set loses genuine-but-unusually-phrased matches. This report errs on the side of precision; a looser pass tested earlier produced dramatically different rankings (Work appeared as 42% of 2025 rather than 4.4%, driven almost entirely by incidental "work" usage).
4. **Overlap is allowed by design.** A paper on "fair GenAI in education" tags three topics. Percentages therefore quantify *engagement*, not exclusive topic share.
5. **2025 volume is genuine but skewed.** 643 articles is an unusually large year for the journal. Patterns observed for 2025 may partly reflect editorial or indexing changes at the publisher as well as scholarly attention.

## Reproducibility

The analysis is implemented in `step3_categorize.py` (permissive baseline) and `step5_tight.py` (final strict set, used for the report). Both operate directly on the source xlsx `AI_SOCIETY_Articles_2021_onwards.xlsx`. The regex patterns above are the exact patterns in `step5_tight.py`.
