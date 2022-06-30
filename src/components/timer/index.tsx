import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";

import { useCountdownTimer } from "src/utils/hooks/useCountdownTimer";


type Props = {
  percent: number
}

const x = 10;

const Timer = (props: Props) => {
  const w = 250;

  console.log("PER,", props.percent)

  return (
    <div style={{
      height: 40,
      width: w,
      alignContent: "right",
      float: "right",
      flex: 1
    }}>
      <div style={{
        position: "absolute",
        width: w,
        ...styles.progBarContainer
      }}>
        <div
          style={{
            height: 22,
            width: w * props.percent,
            background: props.percent < 0.31 ? "#CA5252" : "#8BB447",
            float: "right",
            position: "relative",
            right: 0,
            ...styles.progBar
          }}>
        </div>
      </div>

      <div style={{
        height: 22,
        marginTop: "4px",
        marginLeft: "16px",
        width: w - 16,
        float: "right",
        ...styles.underProgBar
      }}></div>

    </div >
  );
}

export default Timer;

const TimerBar: FunctionalComponent<Props> = (props: Props) => {

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
    display: "flex",
    flexDirection: "column",
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

