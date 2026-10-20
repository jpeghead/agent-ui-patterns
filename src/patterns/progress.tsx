/**
 * 01 · Progress you can trust. Each step named as it starts, the tool it
 * used, a stop that is always one tap away, and a summary you can act on.
 */
import { useState } from "react";
import { useScript } from "../lib/use-script";
import { Btn, Dot } from "../lib/ui";
import type { Step } from "../lib/types";

const PROGRESS_FINAL: Step[] = [
  { label: "Read the failing test", tool: "read tests/checkout.test.ts", s: "done", ms: 420, detail: "1 failing: applies coupon after tax" },
  { label: "Trace the discount path", tool: "grep applyCoupon src/", s: "done", ms: 610, detail: "3 call sites · src/cart/total.ts owns the order" },
  { label: "Edit total.ts", tool: "edit src/cart/total.ts", s: "done", ms: 900, detail: "+6 −2 · coupon now applies before tax" },
  { label: "Run the suite", tool: "npm test", s: "done", ms: 2300, detail: "48 passed" },
];
const progressSteps = [
  { at: 0, state: PROGRESS_FINAL.map((x, i) => ({ ...x, s: i === 0 ? "run" : "wait" })) as Step[] },
  { at: 500, state: PROGRESS_FINAL.map((x, i) => ({ ...x, s: i === 0 ? "done" : i === 1 ? "run" : "wait" })) as Step[] },
  { at: 1150, state: PROGRESS_FINAL.map((x, i) => ({ ...x, s: i < 2 ? "done" : i === 2 ? "run" : "wait" })) as Step[] },
  { at: 2100, state: PROGRESS_FINAL.map((x, i) => ({ ...x, s: i < 3 ? "done" : "run" })) as Step[] },
  { at: 4400, state: PROGRESS_FINAL },
];

export function Progress() {
  const initial = PROGRESS_FINAL.map((x) => ({ ...x, s: "wait" as const }));
  const { state, running, run, reset } = useScript(progressSteps, initial);
  const [open, setOpen] = useState<number | null>(null);
  const done = state.every((s) => s.s === "done");
  const started = state.some((s) => s.s !== "wait");
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">
          <span className="font-medium">Fix the coupon bug</span>
          <span className="text-fg-3"> · {done ? "done in 4.2s" : running ? "working…" : "idle"}</span>
        </p>
        <div className="flex gap-2">
          {running ? (
            <Btn tone="ghost" onClick={reset}>
              Stop
            </Btn>
          ) : (
            <Btn onClick={run}>{started ? "Run again" : "Run"}</Btn>
          )}
        </div>
      </div>
      <ol className="mt-5 space-y-1" aria-live="polite">
        {state.map((st, i) => (
          <li key={i} className="rounded-lg transition-colors" style={{ background: st.s === "run" ? "var(--fill)" : "transparent" }}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              disabled={st.s === "wait"}
              className="flex w-full items-start gap-3 px-3 py-2 text-left disabled:cursor-default"
            >
              <Dot s={st.s} />
              <span className="flex-1">
                <span className={`block text-[15px] ${st.s === "wait" ? "text-fg-3" : ""}`}>{st.label}</span>
                {st.tool && st.s !== "wait" && <code className="mt-0.5 block font-mono text-xs text-fg-3">{st.tool}</code>}
              </span>
              {st.s === "done" && <span className="text-xs tabular-nums text-fg-3">{(st.ms! / 1000).toFixed(1)}s</span>}
            </button>
            {open === i && st.detail && <p className="px-3 pb-3 pl-8 text-sm text-fg-2">{st.detail}</p>}
          </li>
        ))}
      </ol>
      {done && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-sm">
          <span>
            Changed <span className="font-medium">1 file</span> · <span className="text-emerald-300">+6</span> <span className="text-red-300">−2</span> · 48 tests pass
          </span>
          <span className="flex gap-2">
            <Btn tone="ghost" onClick={() => {}}>
              Review diff
            </Btn>
            <Btn onClick={() => {}}>Keep</Btn>
          </span>
        </div>
      )}
    </div>
  );
}

