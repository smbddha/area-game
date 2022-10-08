import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { motion, useTime, useTransform } from "framer-motion";

type Props = {
  percent: number;
  displayNum: number;
  startNum: number;
  run: boolean;
};

const x = 10;

const Timer = (props: Props): FunctionalComponent => {
  const [running, setRunning] = useState<boolean>(false);
  const w = 250;

  const { percent, displayNum } = props;

  return (
    <div
      style={{
        height: 22,
        width: w,
        alignContent: "right",
        float: "right",
      }}
    >
      {/*
      <div
        style={{
          position: "absolute",
          width: w,
          ...styles.progBarContainer,
        }}
      >
        {displayNum !== 10 ? (
          <motion.div
            style={{
              height: 22,
              // width: w * percent,
              background: percent < 0.31 ? "#CA5252" : "#8BB447",
              float: "right",
              position: "relative",
              right: 0,
              ...styles.progBar,
            }}
            // animate={{ width: w * percent }}
            initial={{ width: 250 }}
            animate={{ width: 0 }}
            transition={{ duration: 10, ease: "linear" }}
          ></motion.div>
        ) : (
          <div
            style={{
              height: 22,
              width: w,
              background: percent < 0.31 ? "#CA5252" : "#8BB447",
              float: "right",
              position: "relative",
              right: 0,
              ...styles.progBar,
            }}
          ></div>
        )}
      </div>

       <div style={{
        height: 22,
        marginTop: "4px",
        marginLeft: "16px",
        width: w - 16,
        float: "right",
        ...styles.underProgBar
				}}></div> */}

      <div
        style={{
          height: 22,
          marginTop: "28px",
          float: "right",
          fontSize: "20px",
          fontWeight: "bold",
          color: percent < 0.31 ? "#CA5252" : "#8BB447",
        }}
      >
        {displayNum}
      </div>
    </div>
  );
};

export default Timer;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    float: "right",
  },
  progBar: {
    // transition: "1s linear",
    /*position: "absolute",
     right: 0,
     * zIndex: 2, */
  },
  progBarContainer: {
    /* position: "absolute", */
    zIndex: 1,
    float: "right",
    textAlign: "right",
  },
  underProgBar: {
    position: "absolute",
    zIndex: 1,
    background: "#BBBBBB",
  },
};
