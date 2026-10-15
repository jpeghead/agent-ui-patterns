# agent-ui-patterns

Four working React prototypes for the parts of an agent interface that decide whether people trust it. Simulated model, real interface. Live demo: https://josh.design/lab/agents

1. **Progress you can trust** — each step named as it starts, the tool it used, a stop button, a summary you can act on.
2. **Permission with real scope** — what will be touched, whether it's reversible, an "allow" exactly as narrow as the command, a deny with a stated consequence.
3. **Failure that recovers** — one sentence on what happened, what did not happen, two concrete ways forward.
4. **Say how sure you are** — claims graded sourced / inferred / unknown, with the source one glance away, next to the hedged version for comparison.

## Use

Copy `src/agent-patterns.tsx` into a React 19 + Tailwind 4 project and render `<AgentPatterns />`. The component uses a handful of semantic color tokens (`bg`, `fg`, `fg-2`, `fg-3`, `line`, `fill`); map them to your palette or replace the classes. No dependencies beyond React.

Each pattern is self-contained (`Progress`, `Permission`, `Failure`, `Confidence`) if you want one at a time. Timelines are scripted with `useScript`; reduced-motion users get final states immediately.

## Why

Written while designing and approving an agent's commands all day. The prompts that scare you are the ones that don't say what they'll touch. Notes: https://josh.design/writing/what-the-builds-taught-me-about-models

MIT © Josh Whitehead
