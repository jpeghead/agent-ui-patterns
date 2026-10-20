# 01 · Progress you can trust

## The problem

An agent that works for ten seconds in silence feels broken. An agent that fills the screen with a log feels like a terminal you are supposed to read. Both make the person do the work the interface should do: deciding whether anything is happening, whether it is going well, and whether they can walk away.

Spinners answer none of that. A spinner says "something, somewhere, maybe". A progress bar is worse, because agents do not know how long they will take, and a bar that stalls at 80% for a minute teaches the person that the bar lies.

## The principle

Show the work as a list of named steps, each one appearing when it starts, each one settling when it finishes, with the tool it used and what it found. Let the person stop at any point. End with a summary they can act on, not a transcript.

The list is the honest unit. The agent knows what it is about to do (it chose the step). It knows which tool it is calling. It knows when the call returns. Those three facts are always available, cost nothing to show, and are exactly what a person needs to decide whether to keep watching.

## Anatomy

In the prototype, from top to bottom:

- **The task line.** What was asked, in the person's words, and a state word: idle, working, done in 4.2s. The time is the finished duration, never an estimate.
- **Run / Stop.** One button, never two. While the agent works the only button is Stop. Stop is the same size and place as Run, so the hand that started it can end it without looking.
- **The steps.** A step is a label in plain words ("Trace the discount path"), the tool call underneath in monospace (`grep applyCoupon src/`), a dot for state, and a duration once it finishes. The running step has a quiet highlight so the eye finds it.
- **The found-out line.** A finished step can be opened to show what it found ("3 call sites · src/cart/total.ts owns the order"). Closed by default: most steps are not interesting, and the ones that are can be opened.
- **The summary.** When every step is done: what changed (1 file, +6 −2), what proves it (48 tests pass), and two actions, Review diff and Keep. The summary is the only thing most people read. It has to be enough on its own.

## States

| State | What shows | What the person can do |
|---|---|---|
| Idle | The task line, Run, the steps dimmed | Run |
| Working | The current step highlighted, finished ones settled, the rest dimmed | Stop, open a finished step |
| Stopped | Steps as they were when stopped; nothing after | Run again |
| Done | Every step settled, the summary | Review, Keep, Run again |
| Failed | See [03 · Failure that recovers](03-failure.md). A failed step gets the same treatment as a failed task | |

Dimmed steps before they start are a choice. They tell the person the plan ("four steps") without pretending those steps have happened. If the agent does not know its plan in advance, show only the steps it has taken and a line saying it is deciding the next one.

## Copy

- Labels are verbs in the imperative, as the agent would say them: "Read the failing test", "Run the suite". Not "Reading…" (process), not "Tests" (noun).
- The tool line is the literal command or call. People who know the tool can judge it; people who don't can ignore it. Never paraphrase a command.
- Durations are measured, to one decimal, and only once the step finishes.
- The summary states facts with numbers in them. "Changed 1 file" beats "Made changes". "48 tests pass" beats "Tests look good".
- The state word after the task is one of: idle, working, done in Ns, stopped, failed at step N. Never "almost done".

## Keyboard and screen readers

- The step list is an `aria-live="polite"` region, so each step's arrival is announced without interrupting.
- Finished steps are buttons with `aria-expanded`; unstarted steps are disabled buttons, so the tab order is the same as the visual order and nothing is skipped.
- Stop is reachable with one Tab from the task line while working.
- Under `prefers-reduced-motion` the script lands on its final state at once; the list is still complete and readable.

## Pitfalls seen in shipped products

- **A single "Thinking…" line for the whole run.** Thirty seconds of it reads as a hang.
- **Streaming the model's inner monologue as progress.** Prose is not progress. The person cannot tell from a paragraph whether a tool ran.
- **A progress bar.** It will be wrong, and the person will learn that the interface is wrong.
- **Collapsing finished steps into a count** ("3 steps done"). The steps are the evidence. Keep them.
- **No Stop.** If the person cannot stop it, every long run is a risk they took.
- **Stop that doesn't.** Stop must stop the next tool call, not just hide the list.
- **A summary that says "Done!"** and nothing else. What changed? What proves it?

## Variations

- **Long runs**: group steps under phases ("Investigate", "Change", "Verify") and collapse finished phases to one line with a count and a duration. Keep the current phase open.
- **Parallel tools**: show parallel steps side by side under one label; never interleave them in a single list.
- **Background runs**: the list is still the record. Put the task line in a tray; opening it shows the same list.
- **Chat surfaces**: render the list inside the assistant turn, above the final message. The message is the summary.

## In the prototype

`src/patterns/progress.tsx`. The steps are a scripted timeline (`useScript`) that stands in for a model; swap `progressSteps` for your own events. The component holds no model logic; it renders `Step[]` and calls `run`/`reset`.
