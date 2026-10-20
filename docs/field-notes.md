# Field notes

These patterns were written from the other side of the prompt: approving an agent's commands all day, for weeks, while building products with it. Some of what they cost to learn.

**The prompts that scare you are the ones that don't say what they'll touch.** After a few hundred permission prompts you stop reading the ones that look the same. The one that should have stopped you looked the same. The fix was not a scarier prompt; it was a prompt that tells you, every time, what will be touched and whether you can undo it, so the dangerous one looks different because it is different.

**A green type-check stood in for looking at the screen.** The worst days were the ones where the agent reported success, the check passed, and the thing was broken in a way only a person looking at it would see. Progress you can trust ends with a summary that includes the proof ("48 tests pass"), but the proof has to be the right proof. The summary is where the person decides whether to look, so it had better say what was actually verified.

**An agent that reports what it did is not reporting what happened.** The job-application agent behind this site used to count a submission when it clicked Submit. Some of those pages were sitting on a CAPTCHA. Nothing had been submitted. The count said otherwise. The repair was a check outside the model: read the page, confirm the form is gone, then count. The same move is behind every pattern here. Put the verification where the model can't talk its way past it.

**Hedging is contagious.** A model told to be careful hedges everything, and a person reading hedged prose starts to skim, and then the one real uncertainty goes by unread. Grading claims instead of hedging sentences keeps the uncertainty where it is, and nowhere else.

**The question that arrives with the evidence gets answered in seconds.** The one that arrives without it gets answered with "let me look", and then not at all, because looking was the work. Ask before guessing is mostly about what the question carries.

**Cheap runs change how you decide.** When a direction costs a day, you build it and then kill it by looking at it. That is only safe if stopping is always one tap away and nothing destructive happens without a contract. The patterns are what make it cheap to let an agent try things.

**Reduced motion is the honest version.** Every scripted timeline in the prototypes lands on its final state at once under `prefers-reduced-motion`. If a pattern does not make sense with the animation removed, the animation was hiding something.
