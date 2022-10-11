import { h, Fragment } from "preact";

// import { motion, useTime, useTransform } from "framer-motion";

type Props = {
  percent: number;
  displayNum: number;
};

const Timer = (props: Props) => {
  // const [running, setRunning] = useState<boolean>(false);
  const w = 250;

  const { percent, displayNum } = props;

  return (
    <>
      <div
        style={{
          height: 22,
          width: w,
          alignContent: "right",
          float: "right",
        }}
      >
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
    </>
  );
};

export default Timer;

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     float: "right",
//   },
//   progBar: {
//     // transition: "1s linear",
//     /*position: "absolute",
//      right: 0,
//      * zIndex: 2, */
//   },
//   progBarContainer: {
//     /* position: "absolute", */
//     zIndex: 1,
//     float: "right",
//     textAlign: "right",
//   },
//   underProgBar: {
//     position: "absolute",
//     zIndex: 1,
//     background: "#BBBBBB",
//   },
// };
