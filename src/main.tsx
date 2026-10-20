import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AgentPatterns } from "./agent-patterns";
import "./styles.css";

function Playground() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.14em] text-fg-3">Agent UI patterns</p>
        <h1 className="serif mt-3 text-[2.5rem] leading-[1.05] sm:text-[3.25rem]">The parts of an agent interface that decide whether people trust it.</h1>
        <p className="mt-5 text-[17px] text-fg-2">
          Five working prototypes. The model is simulated; the interface is real. Press Run on each one, use the keyboard, turn on reduced motion and see every state land at once. The reasoning behind each is in <code className="font-mono text-[15px]">docs/</code>.
        </p>
      </header>
      <div className="mt-12">
        <AgentPatterns />
      </div>
      <footer className="mt-20 border-t border-line pt-6 text-sm text-fg-3">
        MIT · Josh Whitehead · <a className="underline decoration-fg-3 underline-offset-4 hover:text-fg" href="https://josh.design">josh.design</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Playground />
  </StrictMode>
);
