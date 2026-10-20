/** A step in an agent's work: what it is doing, the tool it used, its state, and what it found. */
export type Step = { label: string; tool?: string; s: "wait" | "run" | "done" | "fail"; detail?: string; ms?: number };
