/**
 * 04 · Say how sure you are. Claims graded sourced, inferred, or unknown,
 * with the source one glance away, beside the hedged version for comparison.
 */
import { useState } from "react";

export function Confidence() {
  const [mode, setMode] = useState<"hedge" | "honest">("honest");
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-fg-2">
          Q: <span className="text-fg">When was the Spin App Clip featured by Apple?</span>
        </p>
        <div role="tablist" aria-label="Answer style" className="flex rounded-full border border-line p-0.5 text-xs">
          {(["honest", "hedge"] as const).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`rounded-full px-3 py-1 transition ${mode === m ? "bg-fg text-bg" : "text-fg-2"}`}>
              {m === "honest" ? "Graded" : "Hedged"}
            </button>
          ))}
        </div>
      </div>
      {mode === "hedge" ? (
        <p className="mt-5 text-[15px] leading-relaxed text-fg-2">
          I believe it may have been around 2020, possibly during WWDC, though I can&rsquo;t be completely certain and you may want to verify this information from official sources.
        </p>
      ) : (
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed">
          <p>
            <mark className="rounded bg-emerald-400/15 px-1 text-fg">WWDC 2020, alongside the iOS 14 launch.</mark>{" "}
            <span className="text-xs text-fg-3">from the Spin case study on this site</span>
          </p>
          <p>
            <mark className="rounded bg-amber-300/15 px-1 text-fg">It was one of the launch App Clips demonstrated in the keynote.</mark>{" "}
            <span className="text-xs text-fg-3">inferred — not stated on this site</span>{" "}
            <button type="button" className="text-xs underline decoration-fg-3 underline-offset-4 hover:decoration-fg">
              check
            </button>
          </p>
          <p className="text-fg-2">
            I don&rsquo;t know the exact date in June. <span className="text-xs text-fg-3">no source</span>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-xs text-fg-3">
            <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-emerald-400/60 align-middle" />sourced</span>
            <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-amber-300/60 align-middle" />inferred</span>
            <span>plain text = unknown, said plainly</span>
          </div>
        </div>
      )}
    </div>
  );
}

