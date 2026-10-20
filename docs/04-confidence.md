# 04 · Say how sure you are

## The problem

Ask a model when something happened and you get one of two answers. The confident one states a date that may be invented. The careful one hedges every clause: "I believe it may have been around 2020, possibly during WWDC, though I can't be completely certain and you may want to verify this information from official sources." The hedged answer sounds responsible and tells you nothing. You cannot act on "possibly". You cannot even tell which part is the shaky part.

Hedging is not honesty. It is uncertainty smeared evenly over everything so that nothing can be checked.

## The principle

Grade each claim. Sourced: here is where it came from, one glance away. Inferred: the model worked this out and says so, with a way to check. Unknown: said plainly, in one short sentence, with no apology. The reader decides what to trust, claim by claim, and knows exactly what to verify.

The grading is per claim, not per answer. One answer can contain all three grades, and usually does.

## Anatomy

- **The question**, as asked.
- **A toggle**, Graded and Hedged, so the comparison is on the page. The comparison is the argument; people who see both pick graded.
- **Sourced claims** carry a quiet highlight in one color and a source line in small type right after: "from the Spin case study on this site". The source is specific enough to find.
- **Inferred claims** carry a second color and the word "inferred", with what it is inferred from if that fits in a clause, and a "check" action that leads to the source material or a search.
- **Unknowns** are plain text: "I don't know the exact date in June." The absence of a highlight is the signal, and a legend says so.
- **The legend**, one line, at the bottom: sourced, inferred, plain text is unknown.

## States

This pattern has no run state; it is a way of rendering an answer. The states that matter are the grades, and an answer with zero sourced claims should look different at a glance from one with three.

## Copy

- Sourced claims are stated flatly, in the indicative. "WWDC 2020, alongside the iOS 14 launch."
- The source line names the document, not the system: "from the Spin case study on this site", not "from my knowledge base".
- Inferred claims are stated, then marked. The marking does the hedging so the sentence doesn't have to.
- Unknowns are one short sentence beginning with "I don't know" and naming the specific thing not known. Not "I'm not sure about the details."
- Never "I believe", "I think", "possibly", "may have been", "it's likely that". Each of those is a grade pretending to be a word.
- Never a closing disclaimer. The grades are the disclaimer, and they are more useful.

## Keyboard and screen readers

- Highlights carry text, not just color: the source line and the word "inferred" are read aloud. Color alone never carries the grade.
- The toggle is a `tablist` with `aria-selected`.
- "check" is a real link or button with a destination.

## Pitfalls seen in shipped products

- **A single confidence score for the whole answer** ("87% confident"). Confidence in what? The reader still can't tell which sentence to check.
- **Citations as footnote numbers** that lead to a list of ten URLs. Which claim came from which?
- **Inline citations on every sentence** including the ones the model made up. A citation that doesn't support the sentence is worse than none.
- **Hedging as a style setting** ("be cautious"). It changes the prose, not the truth.
- **Hiding the unknowns** by omitting them. If the question asked for a date and the model doesn't have it, say so where the date would be.
- **"Verify this information from official sources"** as a universal suffix. It is the model declining to do the grading.

## Variations

- **Long answers**: grade paragraphs rather than sentences, and put the source line at the end of each paragraph.
- **Numbers**: a number is either sourced or it is not shown. Inferred numbers get a range and the inference ("about 40%, from the two figures above").
- **Agents acting on their own answers**: an action that depends on an inferred claim is a question ([05 · Ask before guessing](05-ask-first.md)), not an action.

## In the prototype

`src/patterns/confidence.tsx`. The graded answer is marked up by hand to show the rendering; in a product the model returns claims with grades and sources (a structured output), and this component renders them.
