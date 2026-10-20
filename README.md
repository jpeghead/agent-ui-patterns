# agent-ui-patterns

Five working React prototypes for the parts of an agent interface that decide whether people trust it, with the reasoning behind each, the copy that carries it, and a forty-question checklist for reviewing any agent UI.

The model is simulated with scripted timelines. The interface is real: keyboard-reachable, reduced-motion aware, every state visible, nothing hidden behind hover. Live demo: https://josh.design/lab/agents

## The five

| | Pattern | The one-line version |
|---|---|---|
| 01 | [Progress you can trust](docs/01-progress.md) | Each step named as it starts, the tool it used, Stop always one tap away, a summary you can act on. |
| 02 | [Permission with real scope](docs/02-permission.md) | What will be touched, whether it's reversible, whether it leaves the repo, an allow exactly as narrow as the command, a deny with a stated consequence. |
| 03 | [Failure that recovers](docs/03-failure.md) | One sentence on what happened, one on what did not, two concrete ways forward with their costs. |
| 04 | [Say how sure you are](docs/04-confidence.md) | Claims graded sourced, inferred, or unknown, with the source one glance away, beside the hedged version for comparison. |
| 05 | [Ask before guessing](docs/05-ask-first.md) | When the task forks: one precise question carrying what the agent found, a recommendation, a free-text answer, a pause. Nothing edited on a guess; the decision recorded. |

And across all five: the [review checklist](docs/checklist.md), the [copy guide](docs/copy.md), and the [field notes](docs/field-notes.md) on what these cost to learn.

## Run it

```bash
npm install
npm run dev
```

A Vite playground opens with all five patterns. `npm run build` makes a static site in `dist/`.

## Use it

Each pattern is a self-contained component. Copy the ones you want, or import them all:

```tsx
import { Progress, Permission, Failure, Confidence, AskFirst } from "./src";
```

They are drawn with three primitives in `src/lib/ui.tsx` (`Card`, `Btn`, `Dot`) and six semantic color tokens (`bg`, `fg`, `fg-2`, `fg-3`, `line`, `fill`) defined in `src/styles.css`. Map the tokens to your palette and every pattern follows; replace the primitives with your own system and the patterns only need the same shapes.

`useScript` in `src/lib/use-script.ts` plays the scripted timelines that stand in for a model. In a product, replace each script with your agent's events: the components render `Step[]` and state; they hold no model logic.

## Layout

```
src/
  agent-patterns.tsx   the five on one page, with their theses
  patterns/            one file per pattern
  lib/                 useScript, the three primitives, the Step type
  main.tsx, styles.css the playground
docs/
  01–05                one page per pattern: problem, principle, anatomy, states, copy, a11y, pitfalls, variations
  checklist.md         forty questions for any agent interface
  copy.md              the sentences that work and why
  field-notes.md       what it cost to learn
```

## Why

Written while designing and approving an agent's commands all day, building products with it. The prompts that scare you are the ones that don't say what they'll touch. The runs you can't stop are risks you took. The answers that hedge everything hide the one thing you needed to check. Longer version: https://josh.design/writing/what-the-builds-taught-me-about-models

MIT © Josh Whitehead
