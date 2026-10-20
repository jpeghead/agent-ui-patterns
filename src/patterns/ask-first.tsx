/**
 * 05 · Ask before guessing. When the task forks, one precise question that
 * carries what the agent already found, a recommendation, a free-text
 * answer, and a pause. Nothing is edited on a guess; the decision is recorded.
 */
import { useEffect, useRef, useState } from "react";
import { useScript } from "../lib/use-script";
import { Btn, Dot } from "../lib/ui";
import type { Step } from "../lib/types";

type AskPhase = "idle" | "working" | "asking" | "resuming" | "done" | "paused";
type AskState = { phase: AskPhase; steps: Step[]; choice?: string; note?: string };
const ASK_BEFORE: Step[] = [
  { label: "Read the pricing page", tool: "read src/pages/pricing.tsx", s: "done", ms: 380, detail: "212 lines · 3 call-to-action buttons" },
  { label: "Find the design-system button", tool: "grep -r \"Button\" src/ds", s: "done", ms: 540, detail: "two exports match: Button (41 uses) and LegacyButton (9 uses)" },
];
const ASK_AFTER = (choice: string): Step[] => [
  ...ASK_BEFORE,
  { label: `Swap the three buttons to ${choice}`, tool: "edit src/pages/pricing.tsx", s: "done", ms: 760, detail: "+9 −9 · props mapped, no visual regressions in snapshot" },
  { label: "Run the page tests", tool: "npm test pricing", s: "done", ms: 1900, detail: "12 passed" },
];
const askStart = [
  { at: 0, state: { phase: "working", steps: ASK_BEFORE.map((x, i) => ({ ...x, s: i === 0 ? "run" : "wait" })) } as AskState },
  { at: 450, state: { phase: "working", steps: ASK_BEFORE.map((x, i) => ({ ...x, s: i === 0 ? "done" : "run" })) } as AskState },
  { at: 1100, state: { phase: "asking", steps: ASK_BEFORE } as AskState },
];

export function AskFirst() {
  const initial: AskState = { phase: "idle", steps: ASK_BEFORE.map((x) => ({ ...x, s: "wait" as const })) };
  const { state, running, run, reset, setState } = useScript(askStart, initial);
  const [note, setNote] = useState("");
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const answer = (choice: string) => {
    timers.current.forEach(clearTimeout);
    const after = ASK_AFTER(choice);
    setState({ phase: "resuming", choice, steps: after.map((x, i) => ({ ...x, s: i < 2 ? "done" : i === 2 ? "run" : "wait" })) });
    timers.current.push(window.setTimeout(() => setState({ phase: "resuming", choice, steps: after.map((x, i) => ({ ...x, s: i < 3 ? "done" : "run" })) }), 800));
    timers.current.push(window.setTimeout(() => setState({ phase: "done", choice, steps: after }), 2600));
  };
  const pause = () => setState({ ...state, phase: "paused" });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-fg-2">
          <span className="text-fg">Move the pricing page onto the design system</span>
          {state.phase === "done" && <span className="text-fg-3"> · done, with one question asked</span>}
          {state.phase === "paused" && <span className="text-fg-3"> · paused where it stopped</span>}
        </p>
        {state.phase === "idle" || state.phase === "done" || state.phase === "paused" ? (
          <Btn onClick={state.phase === "idle" ? run : () => { reset(); setNote(""); run(); }}>{state.phase === "idle" ? "Run" : "Run again"}</Btn>
        ) : (
          <Btn tone="ghost" onClick={() => { reset(); setNote(""); }} disabled={running && state.phase === "working"}>
            Stop
          </Btn>
        )}
      </div>
      <ol className="mt-4 space-y-2">
        {state.steps.map((st) => (
          <li key={st.label} className="flex items-start gap-3">
            <Dot s={st.s} />
            <div className="min-w-0 text-[15px]">
              <span className={st.s === "wait" ? "text-fg-3" : "text-fg"}>{st.label}</span>
              {st.tool && st.s !== "wait" && <span className="ml-2 font-mono text-xs text-fg-3">{st.tool}</span>}
              {st.detail && st.s === "done" && <p className="text-sm text-fg-2">{st.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
      {state.phase === "asking" && (
        <div role="group" aria-labelledby="ask-q" className="mt-5 rounded-lg border border-fg/30 bg-bg p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-fg-3">Needs a decision</p>
          <p id="ask-q" className="mt-1 text-[15px] text-fg">
            Two button components exist. Which one is canonical? The page uses neither yet, so this choice sets the pattern for the rest of the migration.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button type="button" autoFocus onClick={() => answer("Button")} className="rounded-lg border border-line p-3 text-left text-sm transition hover:border-fg focus:border-fg focus:outline-none">
              <span className="font-medium text-fg">Button</span> <span className="text-fg-3">· @ds/core · 41 uses</span>
              <span className="mt-1 block text-fg-2">The newer one. Recommended; the other is marked deprecated in its docblock.</span>
            </button>
            <button type="button" onClick={() => answer("LegacyButton")} className="rounded-lg border border-line p-3 text-left text-sm transition hover:border-fg focus:border-fg focus:outline-none">
              <span className="font-medium text-fg">LegacyButton</span> <span className="text-fg-3">· 9 uses</span>
              <span className="mt-1 block text-fg-2">Matches what the checkout page uses today.</span>
            </button>
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (note.trim()) answer(note.trim());
            }}
          >
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Something else, in your words…" aria-label="Another answer" className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-3 py-1.5 text-sm placeholder:text-fg-3 focus:border-fg focus:outline-none" />
            <Btn tone="ghost" onClick={() => note.trim() && answer(note.trim())} disabled={!note.trim()}>
              Use this
            </Btn>
          </form>
          <div className="mt-3 flex items-center justify-between text-xs text-fg-3">
            <span>It will not guess. Nothing is edited until you answer.</span>
            <button type="button" onClick={pause} className="underline decoration-fg-3 underline-offset-4 hover:text-fg">
              Not now, pause here
            </button>
          </div>
        </div>
      )}
      {state.phase === "done" && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
          <span className="text-fg-2">
            Changed 1 file · +9 −9 · 12 tests pass · decision recorded: <span className="text-fg">{state.choice}</span>
          </span>
          <span className="text-fg-3">The question and the answer stay in the log, so the next run won&rsquo;t ask again.</span>
        </div>
      )}
      {state.phase === "paused" && (
        <p className="mt-5 border-t border-line pt-4 text-sm text-fg-2">
          Paused after two read-only steps. Nothing was changed. Resume any time and the same question will be waiting.
        </p>
      )}
    </div>
  );
}

