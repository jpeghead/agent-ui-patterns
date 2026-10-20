# The review checklist

Put these to any agent interface before it ships. A "no" is not always wrong, but it should be a decision.

## Progress

1. Can the person tell, within two seconds of looking, whether the agent is working, done, stopped, or failed?
2. Is each step named in plain words as it starts?
3. Is the tool call shown verbatim for people who can read it?
4. Is Stop one tap away for the whole run, and does it actually stop the next tool call?
5. Does the end state summarize what changed, with numbers, and what proves it?
6. Can a finished step be opened to show what it found?
7. Is the list announced to screen readers as it grows, without interrupting?
8. Does reduced motion land on the final state at once?

## Permission

9. Does every prompt state what will be touched, in counts a person can feel?
10. Does it say whether the action is reversible, and what is lost if not?
11. Does it say whether anything leaves the machine or the repo?
12. Is the command or diff shown verbatim, never summarized in its place?
13. Is there an allow exactly as narrow as the action?
14. Is the wider allow still precise (this command, this session) and named as such?
15. Is there no blanket allow and no "don't ask again" in the prompt?
16. Is Deny a real option with its consequence stated?
17. Does the default focus land on the safest sufficient option?
18. Is there a receipt after every decision, and can session rules be seen and revoked?

## Failure

19. Does the failure say where in the plan it happened?
20. Is there one sentence, for a person, saying what happened?
21. Is there one sentence saying what did not happen?
22. Are there two concrete ways forward, each with its cost?
23. Is the recovery shown as steps, like the original work?
24. Is the error text quoted and trimmed, with the full log one click away?
25. Is "Retry" absent unless the agent can say why retrying would help?
26. When it fails again, does it say whether the error is the same or different?

## Confidence

27. Is every claim graded: sourced, inferred, or unknown?
28. Is the source specific enough to find, and one glance away?
29. Are unknowns stated plainly where the answer would have been?
30. Are "I believe", "possibly", "may have been" absent?
31. Is there no closing disclaimer doing the work the grades should do?
32. Do the grades carry text, not only color?

## Asking

33. Does the agent do every read-only step it can before asking?
34. Does it ask before any edit that depends on the answer?
35. Does the question carry the evidence: names, locations, counts, consequences?
36. Is there a recommendation with its reason?
37. Can the person answer in their own words?
38. Can the person pause without answering, with nothing changed?
39. Is the decision recorded so the next run does not ask again?
40. Is the question a block in the work, not a modal over the app?
