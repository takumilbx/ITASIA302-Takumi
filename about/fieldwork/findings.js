/* =============================================================================
   INTERVIEW LAYER  -  window.FW_FINDINGS
   Interview with Enoki-sensei (榎先生) · 29 May 2026

   Loaded as a CLASSIC script so it works on file:// and stays editable
   WITHOUT touching the scene code.

   HOW TO USE AFTER THE INTERVIEW
   ------------------------------------------------------------------------
   1. The `questions` below are DRAFT English paraphrases derived from the
      build spec (§3.7). Replace each `ja` with the verbatim Japanese from
      ５月２９日榎先生インタビュー質問欄.docx, and tighten the `en` gloss if needed.
   2. Paste each answer into `findings` keyed by question id, e.g.
        findings.Q11 = "She said the red was a direct echo of red chalk…";
      Any question without a finding shows the `pendingLabel` placeholder.
   No other file needs to change.
   ========================================================================== */

window.FW_FINDINGS = {
  date: "29 May 2026",
  pendingLabel: "Pending: interview 29 May 2026",
  draftNote: "Draft English paraphrase from the spec - replace with the verbatim question after the interview.",

  // questionId -> { en: English gloss (draft), ja: verbatim Japanese (fill in) }
  questions: {
    Q1:  { en: "Tell me about your background and how you became a science subject teacher.", ja: "" },
    Q2:  { en: "What formal training, if any, did you receive for teaching with ICT?", ja: "" },
    Q3:  { en: "When and how did you first start using ICT in your teaching?", ja: "" },
    Q4:  { en: "What do you think ICT is good for - and not good for - in science class?", ja: "" },
    Q5:  { en: "How did you learn the specific methods you use (the scaffold, the colour system, etc.)?", ja: "" },
    Q6:  { en: "How much of your ICT skill came from practice rather than formal instruction?", ja: "" },

    Q7:  { en: "How was the GIGA one-to-one terminal rollout handled at your school?", ja: "" },
    Q8:  { en: "What is your school's ICT policy, and how does it shape your lessons?", ja: "" },
    Q9:  { en: "What support or training does the school provide for ICT use?", ja: "" },
    Q10: { en: "What is the leadership's stance on ICT in teaching?", ja: "" },

    Q11: { en: "Was the black-prompt / red-model-answer colour system a conscious translation of your blackboard chalk technique?", ja: "" },
    Q12: { en: "Why fix data entry to one student per group - preventing data chaos, or managing off-task screen use?", ja: "" },
    Q13: { en: "What is your reasoning behind the three-part reflection scaffold (よそく・結果・わかった)?", ja: "" },
    Q14: { en: "Why model the scaffold immediately in Visit 1, but let students attempt it first in Visit 2?", ja: "" },
    Q15: { en: "Why let students choose their variable (weight vs. length) - student agency, or the need for comparable data?", ja: "" },
    Q16: { en: "How do you prepare the reference materials - the time cost, and how they iterate between classes?", ja: "" },
    Q17: { en: "How do you plan the timing of each phase - pre-planned or from experience? How heavy is the cognitive load?", ja: "" },
    Q18: { en: "How do you know students truly understand, beyond just completing the task?", ja: "" },

    Q19: { en: "How do other teachers at your school use ICT?", ja: "" },
    Q20: { en: "How do you exchange methods and information with colleagues?", ja: "" },
    Q21: { en: "How do you and your colleagues influence each other's ICT practice?", ja: "" },
    Q22: { en: "Would your lesson design differ if this lab weren't dedicated to Grade 5?", ja: "" }
  },

  // questionId -> answer string. Empty until the interview is done.
  findings: {}
};
