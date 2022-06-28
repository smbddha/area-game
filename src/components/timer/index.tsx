
import { FunctionalComponent, h } from "preact";
import { useRef, useCallback, useEffect, useState } from "preact/hooks";

const useCountdownTimer = (t: number, interval: number = 1000) => {

  const [timeRemaining, setTimeRemaining] = useState<number>(t * 1000 || 60 * 1000);
  //const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<any>({});

  const reset = useCallback(
    () => {
      console.log("HERE")
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


    //console.log(timerRef.current.interval);
    if (timerRef.current.interval >= interval) {

      timerRef.current.timeRemaining = Math.max(0, timerRef.current.timeRemaining - timerRef.current.interval);

      setTimeRemaining((tr) => {
        console.log('why');
        console.log(timerRef.current.timeRemaining, interval);
        return timerRef.current.timeRemaining;
      });

      timerRef.current.interval -= interval;
    }

    if (timerRef.current.timeRemaining > 0) {
      //console.log(timerRef.current.timeRemaining, interval);
      timerRef.current.requestId = window.requestAnimationFrame(run);
    }
  }

  const actions = { start, pause, resume, reset };

  return [
    timeRemaining,
    actions
  ]
}

type Props = {

}

const x = 10;
const ProgBar = (props) => {
  const w = 250;

  console.log("PER,", props.percent)

  return (
    <div style={{
      height: "10px",
      width: w,
      alignContent: "right",
      float: "right"
    }}>
      <div style={{
        position: "absolute",
        width: w,
        ...styles.progBarContainer
      }}>
        <div
          style={{
            height: "10px",
            width: w * props.percent,
            background: props.percent < 0.31 ? "#CA5252" : "#8BB447",
            float: "right",
            position: "relative",
            right: 0,
            ...styles.progBar
          }}>
        </div>
      </div>
      <div style={{ height: "10px", width: w, ...styles.underProgBar }}></div>
    </div >
  );
}

const Timer: FunctionalComponent<Props> = (props: Props) => {

  const [timeRemaining, { start, pause, resume, reset }] = useCountdownTimer(x);

  useEffect(() => {
    console.log("STARTING")
    start()
  }, []);

  useEffect(() => {
    console.log('MAIN', timeRemaining);
    if (timeRemaining === 0) console.log("FINISHED")
  }, [timeRemaining]);

  return (
    <div style={styles.container}>
      <ProgBar percent={(timeRemaining / (x * 1000))} />
      <div style={styles.container}>
        {timeRemaining}
        <button onClick={() => { reset(); start() }}> RESTART </button>
      </div>
    </div>
  )
}

const styles = {
  container: {

    float: "right"
  },
  progBar: {
    transition: "1s linear",
    /*position: "absolute",
     right: 0,
     * zIndex: 2, */
  },
  progBarContainer: {
    /* position: "absolute", */
    zIndex: 10,
    float: "right",
    textAlign: "right",
  },
  underProgBar: {
    position: "absolute",
    zIndex: 1,
    background: "#BBBBBB"
  }

}

export default Timer;
