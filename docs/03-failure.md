# 03 · Failure that recovers

## The problem

Agents fail often, and the failures are normal: a type error after an edit, a test that was already red, a dependency that did not install. The usual interface shows a red box, a stack trace, and a Retry button. The person reads the trace (or doesn't), presses Retry, gets the same failure, and now does not know whether the agent is stuck or whether the world changed.

The information that matters is almost never in the trace. It is: what happened, in one sentence; what did not happen (nothing was deployed, nothing was deleted); and what the person can do now.

## The principle

Say what happened in one sentence. Say what did not happen, so the person knows the blast radius. Offer two concrete ways forward, each with its cost, and let the person pick. Then show the recovery as steps, the same way the original work was shown, so the fix is as visible as the failure.

Two options is the number. One is not a choice. Three or more is a menu, and the person came to delegate, not to menu.

## Anatomy

- **The task line** with the state word: failed. The same line as in progress; failure is a state of the same object, not a new screen.
- **Where it failed.** "Build failed at step 2 of 3." Position in the plan tells the person how far it got.
- **The evidence**, briefly: the error text, trimmed to the lines that name the problem, in monospace. The full log is a click away, not on the page.
- **What happened**, in one sentence written for a person: "the edit added `cart.coupon` but the `Cart` type wasn't updated."
- **What did not happen**: "Nothing was deployed." This is the sentence people are looking for. It goes near the top.
- **Two ways forward**, as buttons with a title and a cost line: "Add `coupon?: Coupon` to Cart · Smallest change. Keeps the fix." and "Revert the edit · Back to green. The coupon bug stays." The agent recommends by order (first is recommended) and by the cost lines, not by hiding one.
- **The recovery**, as steps: the chosen fix, then the build, then the deploy, each landing in turn, ending with the thing the task was for (the preview URL).

## States

| State | What shows |
|---|---|
| Running | Steps, as in 01 |
| Failed | Where, the evidence, what happened, what did not, two ways forward |
| Fixing | The chosen way as the first step, then the rest of the plan running |
| Fixed | The plan complete, the result (the URL) |
| Failed again | The same block, with "same error" or "different error" said plainly, and the ways forward updated |

Retry is not a way forward. If retrying would help, the agent should say why ("the registry timed out; retry in 10s") and offer that as the option.

## Copy

- "Failed at step 2 of 3", not "An error occurred".
- What happened is cause and effect in one sentence, past tense, naming the file.
- What did not happen uses "Nothing" or "No": "Nothing was deployed." "No files were deleted."
- Each way forward is a verb phrase and a cost: "Revert the edit · Back to green. The coupon bug stays."
- Never "Something went wrong". Never "Oops". Never an exclamation mark.
- The error text is quoted, not paraphrased, and cut to the lines that matter. A trace is available, labeled "full log".

## Keyboard and screen readers

- The failure block gets focus when it appears, so screen readers land on "Build failed at step 2 of 3".
- The two ways forward are buttons, in order of recommendation; the first is focused.
- The recovery steps are `aria-live="polite"`.
- Reduced motion: the fix lands complete, with the result.

## Pitfalls seen in shipped products

- **The stack trace as the message.** It is evidence, not the message.
- **Retry as the only button.** It is the agent's job to know whether retrying would help.
- **No statement of what did not happen.** People assume the worst and go check.
- **"Would you like me to fix it?"** with no description of the fix. Yes to what?
- **Silent fallbacks**: the agent tries something else without saying the first thing failed. The person later finds the wrong thing shipped.
- **Burying the failure** in a collapsed log while the task line says "done".
- **A different failure shown identically** to the first. Say "different error" so the person knows the world moved.

## Variations

- **Partial success**: "3 of 4 files changed; the fourth failed" with the three listed as done and the fourth carrying the failure block.
- **External failures** (an API down): what happened, that nothing was changed, and a wait-and-retry option with a time, plus a way to continue without that step.
- **Failures the agent caused** by an earlier choice: name the choice ("the edit in step 2") and offer undoing it as one of the two ways.

## In the prototype

`src/patterns/failure.tsx`. The failure and the two fixes are data; `pick` branches the script. In a product, the ways forward come from the agent's own diagnosis, and the cost lines are the part worth spending model time on.
