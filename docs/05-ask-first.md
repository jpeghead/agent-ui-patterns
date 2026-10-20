# 05 · Ask before guessing

## The problem

Halfway through a task the agent meets a fork it cannot resolve from the code: two button components, one newer, one used by the checkout page. A guessing agent picks one and keeps going, and the person finds out after nine files changed. An over-careful agent stops at every fork and asks about things it could have decided, and the person stops reading the questions.

The fork that deserves a question is the one where the answer sets a precedent, is cheap for the person to give, and is expensive for the agent to get wrong.

## The principle

When the task forks, stop and ask one precise question that carries everything the agent already found, offers the options it discovered with a recommendation, accepts an answer in the person's own words, and can be paused. Nothing is edited on a guess. The answer is recorded, so the next run does not ask again.

The question is a handoff, not an interruption. It arrives with the evidence, so the person can answer in seconds without opening anything.

## Anatomy

- **The steps so far**, exactly as in 01, so the person sees the read-only work that led here: the page read, the two exports found, with counts.
- **"Needs a decision"**, a small label, so the block is recognizable as a question and not a failure or a summary.
- **The question**, one or two sentences, stating the fork and why it matters: "Two button components exist. Which one is canonical? The page uses neither yet, so this choice sets the pattern for the rest of the migration."
- **The options**, each with its evidence: the name, where it lives, how many uses, and a line that says what choosing it means. The recommendation is first and says so, with the reason ("the other is marked deprecated in its docblock").
- **Something else**, a text field, because the real answer is sometimes neither option ("use the new one, but keep checkout on the old one until Friday").
- **It will not guess.** One line stating the contract: nothing is edited until you answer.
- **Not now, pause here.** A way to leave the question standing without choosing. The work done so far is kept; the question waits.
- **After the answer**, the remaining steps run, and the summary records the decision: "decision recorded: Button".

## States

| State | What shows |
|---|---|
| Working | Read-only steps running |
| Asking | The steps so far, the question block, focus on the recommended option |
| Resuming | The chosen option as the next step, the rest of the plan running |
| Done | The summary with the decision recorded and a note that the answer is kept |
| Paused | The steps so far, a line saying nothing was changed and the question is waiting |

The distinction that matters: the agent asks only after it has done everything it could without the answer, and before it has changed anything the answer would affect.

## Copy

- The label is "Needs a decision", not "Question" and not "Clarification needed".
- The question states the fork and the stakes in two sentences. The stakes sentence is what earns the interruption.
- Options are nouns with evidence: name, location, count, one consequence line.
- The recommendation says "Recommended" and gives the reason in the same breath.
- The free-text placeholder is "Something else, in your words…".
- The contract line is literal: "It will not guess. Nothing is edited until you answer."
- The pause is "Not now, pause here", and the paused state says what was and was not done.

## Keyboard and screen readers

- The question block is `role="group"` labelled by the question; focus moves to the recommended option when it appears.
- Options are buttons; arrow keys are not required, Tab moves between them and into the text field.
- Enter in the text field submits it; the button beside it is for pointer users.
- The paused state is a status message.

## Pitfalls seen in shipped products

- **Asking without the evidence.** "Which button component should I use?" with no counts, no locations, no recommendation. The person has to go look, which is the work they delegated.
- **Asking too early**, before the read-only steps that would have answered half the question.
- **Asking too late**, after edits that depend on the answer, so one option means undoing work.
- **Yes/No questions** for forks with three real answers.
- **No free-text answer.** The person's real answer is a sentence.
- **Guessing with a note** ("I assumed Button; let me know if you'd prefer LegacyButton"). The note arrives after nine files changed.
- **Forgetting the answer** and asking again next run. The decision is part of the project now; record it where the next run reads.
- **A modal** that blocks everything else. The question is a block in the work, not a dialog over the app.

## Variations

- **Batched questions**: when two forks are independent, ask both in one block, each with its own options, and run once both are answered.
- **Timeouts**: never. A question waits. If the product must proceed, the proceeding path is itself one of the options, labelled with what it will do.
- **Teams**: the decision is recorded with who made it and when, and the next person sees it.

## In the prototype

`src/patterns/ask-first.tsx`. `ASK_BEFORE` is the read-only work, `ASK_AFTER(choice)` the rest; `answer` branches the script and records the decision in the summary. The pause keeps `ASK_BEFORE` as done and nothing else.
