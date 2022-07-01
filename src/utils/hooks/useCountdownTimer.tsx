import { useRef, useCallback, useState } from "preact/hooks";

export const useCountdownTimer = (t: number, interval: number = 1000) => {

  const [timeRemaining, setTimeRemaining] = useState<number>(t * 1000 || 60 * 1000);
  //const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<any>({});

  const reset = useCallback(
    () => {
      setTimeRemaining(t);
    }, []
  );

  const pause = useCallback(
    () => {

      window.cancelAnimationFrame(timerRef.current.requestId);
    }, []
  );

  const resume = useCallback(
    () => {

      window.cancelAnimationFrame(timerRef.current.requestId);
      timerRef.current.requestId = window.requestAnimationFrame(run);
    }, []
  );

  const start = useCallback(
    (nt: number) => {
      window.cancelAnimationFrame(timerRef.current.requestId);

      timerRef.current.running = null;
      timerRef.current.prevTime = null;
      timerRef.current.timeRemaining = timeRemaining;
      timerRef.current.requestId = window.requestAnimationFrame(run);

      setTimeRemaining(nt * 1000 || t * 1000);
    },
    []
  )

  const run = (timestamp: number) => {
    if (!timerRef.current.prevTime) {
      timerRef.current.running = true;
      timerRef.current.prevTime = timestamp;
      timerRef.current.interval = 0;
    }

    timerRef.current.interval += timestamp - timerRef.current.prevTime;
    timerRef.current.prevTime = timestamp;


    if (timerRef.current.interval >= interval) {

      timerRef.current.timeRemaining = Math.max(0, timerRef.current.timeRemaining - timerRef.current.interval);

      setTimeRemaining((tr) => {
        return timerRef.current.timeRemaining;
      });

      timerRef.current.interval -= interval;
    }

    if (timerRef.current.timeRemaining > 0) {
      timerRef.current.requestId = window.requestAnimationFrame(run);
    }
  }

  const actions = { start, pause, resume, reset };

  return {
    timeRemaining,
    actions
  };
}
