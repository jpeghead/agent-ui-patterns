/** The three primitives every pattern is drawn with. Replace them with your own system; the patterns only need these shapes. */
import type { ReactNode } from "react";

export function Card({ n, title, thesis, children, foot }: { n: string; title: string; thesis: string; children: ReactNode; foot?: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line py-14 lg:grid-cols-12" aria-labelledby={`p-${n}`}>
      <div className="lg:col-span-4">
        <p className="text-sm tabular-nums text-fg-3">{n}</p>
        <h2 id={`p-${n}`} className="tight mt-2 text-[1.75rem] font-semibold leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-fg-2 text-pretty">{thesis}</p>
        {foot && <div className="mt-5 text-sm text-fg-3">{foot}</div>}
      </div>
      <div className="lg:col-span-8">
        <div className="rounded-xl border border-line bg-fill/60 p-5 sm:p-6">{children}</div>
      </div>
    </section>
  );
}

export function Btn({ children, onClick, tone = "primary", disabled, autoFocus }: { children: ReactNode; onClick: () => void; tone?: "primary" | "ghost" | "danger"; disabled?: boolean; autoFocus?: boolean }) {
  const cls =
    tone === "primary"
      ? "bg-fg text-bg hover:opacity-85"
      : tone === "danger"
        ? "border border-red-400/40 text-red-300 hover:bg-red-400/10"
        : "border border-line text-fg hover:bg-fill";
  return (
    <button type="button" onClick={onClick} disabled={disabled} autoFocus={autoFocus} className={`rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${cls}`}>
      {children}
    </button>
  );
}

export function Dot({ s }: { s: "wait" | "run" | "done" | "fail" }) {
  const c = s === "done" ? "bg-emerald-400" : s === "fail" ? "bg-red-400" : s === "run" ? "bg-fg animate-pulse" : "bg-fg-3/50";
  return <span aria-hidden className={`mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full ${c}`} />;
}

