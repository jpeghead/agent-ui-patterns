/**
 * 03 · Failure that recovers. One sentence on what happened, one on what did
 * not happen, and two concrete ways forward instead of a stack trace and a
 * retry button.
 */
import { useScript } from "../lib/use-script";
import { Btn, Dot } from "../lib/ui";

type FailState = { phase: "idle" | "running" | "failed" | "fixing" | "fixed"; pick?: "a" | "b" };
const failSteps = [
  { at: 0, state: { phase: "running" } as FailState },
  { at: 1400, state: { phase: "failed" } as FailState },
];

export function Failure() {
  const { state, run, reset, setState } = useScript(failSteps, { phase: "idle" } as FailState);
  const pick = (p: "a" | "b") => {
    setState({ phase: "fixing", pick: p });
    window.setTimeout(() => setState({ phase: "fixed", pick: p }), 1200);
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">
          <span className="font-medium">Deploy preview</span>
          <span className="text-fg-3">
            {" "}
            · {state.phase === "idle" ? "idle" : state.phase === "running" ? "building…" : state.phase === "failed" ? "failed" : state.phase === "fixing" ? "retrying…" : "deployed"}
          </span>
        </p>
        {state.phase === "idle" ? <Btn onClick={run}>Run</Btn> : <Btn tone="ghost" onClick={reset}>Reset</Btn>}
      </div>
      {state.phase === "running" && (
        <ul className="mt-5 space-y-2 text-[15px]">
          <li className="flex gap-3"><Dot s="done" />Install dependencies</li>
          <li className="flex gap-3"><Dot s="run" />Build</li>
        </ul>
      )}
      {state.phase === "failed" && (
        <div className="mt-5 rounded-lg border border-red-400/30 bg-red-400/5 p-4">
          <p className="text-sm font-medium text-red-200">Build failed at step 2 of 3</p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-black/40 px-3 py-2 font-mono text-[12.5px] text-fg-2">
            {`Type error: Property 'coupon' does not exist on type 'Cart'.\n  src/cart/total.ts:14:21`}
          </pre>
          <p className="mt-3 text-sm text-fg-2">
            <span className="text-fg">What happened:</span> the edit added <code className="font-mono">cart.coupon</code> but the <code className="font-mono">Cart</code> type wasn&rsquo;t updated. Nothing was deployed.
          </p>
          <p className="mt-4 text-sm">Two ways forward:</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => pick("a")} className="rounded-lg border border-line p-3 text-left text-sm transition hover:bg-fill focus-visible:bg-fill">
              <span className="block font-medium">Add <code className="font-mono">coupon?: Coupon</code> to Cart</span>
              <span className="mt-1 block text-fg-3">Smallest change. Keeps the fix.</span>
            </button>
            <button type="button" onClick={() => pick("b")} className="rounded-lg border border-line p-3 text-left text-sm transition hover:bg-fill focus-visible:bg-fill">
              <span className="block font-medium">Revert the edit</span>
              <span className="mt-1 block text-fg-3">Back to green. The coupon bug stays.</span>
            </button>
          </div>
        </div>
      )}
      {(state.phase === "fixing" || state.phase === "fixed") && (
        <ul className="mt-5 space-y-2 text-[15px]" aria-live="polite">
          <li className="flex gap-3"><Dot s="done" />{state.pick === "a" ? "Added coupon?: Coupon to Cart" : "Reverted src/cart/total.ts"}</li>
          <li className="flex gap-3"><Dot s={state.phase === "fixed" ? "done" : "run"} />Build</li>
          <li className="flex gap-3"><Dot s={state.phase === "fixed" ? "done" : "wait"} />Deploy preview{state.phase === "fixed" && <span className="text-fg-3"> · preview-7f3a.vercel.app</span>}</li>
        </ul>
      )}
    </div>
  );
}

