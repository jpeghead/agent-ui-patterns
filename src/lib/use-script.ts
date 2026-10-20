/**
 * A scripted timeline: a list of states and the millisecond each one lands.
 * `run` plays it, `reset` returns to the initial state, `setState` lets the
 * component branch away from the script (an answer, a retry). Under
 * prefers-reduced-motion the final state lands at once, so nobody waits on
 * an animation to read the interface.
 */
import { useCallback, useEffect, useRef, useState } from "react";

export function useScript<T>(steps: { at: number; state: T }[], initial: T) {
  const [state, setState] = useState<T>(initial);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
  }, []);
  const run = useCallback(() => {
    stop();
    setState(initial);
    setRunning(true);
    if (reduce) {
      setState(steps[steps.length - 1].state);
      setRunning(false);
      return;
    }
    steps.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setState(s.state);
          if (i === steps.length - 1) setRunning(false);
        }, s.at)
      );
    });
  }, [steps, initial, reduce, stop]);
  const reset = useCallback(() => {
    stop();
    setState(initial);
  }, [stop, initial]);
  useEffect(() => stop, [stop]);
  return { state, running, run, reset, setState };
}

