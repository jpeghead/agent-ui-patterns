/**
 * The five patterns on one page, each with its thesis. The model is
 * simulated (scripted timelines); the interface is real: keyboard-reachable,
 * reduced-motion aware, every state visible, nothing hidden behind hover.
 */
import { Card } from "./lib/ui";
import { Progress } from "./patterns/progress";
import { Permission } from "./patterns/permission";
import { Failure } from "./patterns/failure";
import { Confidence } from "./patterns/confidence";
import { AskFirst } from "./patterns/ask-first";

export function AgentPatterns() {
  return (
    <div>
      <Card
        n="01"
        title="Progress you can trust"
        thesis="An agent that works for ten seconds in silence feels broken. Show each step as it starts, name the tool it used, let the person stop it, and end with a summary they can act on."
        foot="Click a finished step to see what it found. Stop is always one tap away."
      >
        <Progress />
      </Card>
      <Card
        n="02"
        title="Permission with real scope"
        thesis="A permission prompt is a contract. It should say exactly what will be touched, whether it can be undone, and offer an allow that is as narrow as the command, never a blanket yes."
        foot="Default focus lands on the safest sufficient option."
      >
        <Permission />
      </Card>
      <Card
        n="03"
        title="Failure that recovers"
        thesis="Failure is normal. The interface should say what happened in one sentence, what did not happen (nothing deployed), and offer two concrete ways forward instead of a stack trace and a retry button."
      >
        <Failure />
      </Card>
      <Card
        n="04"
        title="Say how sure you are"
        thesis="Hedging every sentence is not honesty. Grade each claim: sourced, inferred, or unknown, with the source one glance away. The reader decides what to trust."
        foot="Toggle to compare the graded answer with the hedged one."
      >
        <Confidence />
      </Card>
      <Card
        n="05"
        title="Ask before guessing"
        thesis="When the task forks, a good agent stops and asks one precise question with the options it already found, a recommendation, and a way to say something else. It never edits on a guess, and it remembers the answer."
        foot="The question carries what the agent learned so far: counts, the deprecation note, what the other page does."
      >
        <AskFirst />
      </Card>
    </div>
  );
}
