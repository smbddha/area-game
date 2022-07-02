import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";
import { useCountdownTimer } from "src/utils/hooks/useCountdownTimer";

import Level from "src/components/level";
import Shape from "src/components/shape";
import Timer from "src/components/timer";
import BoxButton from "src/components/boxbutton";

const Game: FunctionalComponent = () => {
  const { timeRemaining, actions } = useCountdownTimer(10);
  const [level, setLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [shape1, setShape1] = useState<IShape | IShapeGroup>(makeShape(ShapeEnum.Rectangle, 1))
  const [shape2, setShape2] = useState<IShape | IShapeGroup>(makeShape(ShapeEnum.Circle, 3))

  const renderLevel = () => { }

  const advanceLevel = () => {
    setLevel(level + 1);
  }

  const formatPercent = (tr: number) => {
    return tr / (10 * 1000);
  }

  const scoreLevel = (diff: number) => {
    setScore((s) => {
      console.log(Math.max(1000 - diff, 0))
      return Math.ceil(s + Math.max(1000 - diff, 0));
    });
  };

  const handleNext = () => {
    //let diff = area1 - area2;
    let diff = Math.abs(shape1.getArea() - shape2.getArea());
    console.log(shape1.getArea(), shape2.getArea(), diff);


    scoreLevel(diff);
    advanceLevel()

    setShape1(makeShape(ShapeEnum.Rectangle, 1));
    setShape2(makeShape(ShapeEnum.Circle, 3));
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <div style={styles.rowContainer}>
          <div style={styles.header}>
            <h1 style={{ ...styles.shadowedText, ...styles.headerText }}>area game</h1>
          </div>
        </div>
        <div style={styles.gameContainer}>
          <div style={{ ...styles.rowContainer, alignItems: "right", justifyContent: "flex-end" }}>
            <Timer percent={formatPercent(timeRemaining)} />
          </div>
          <div style={{ ...styles.rowContainer, alignItems: "center", justifyContent: "center" }}>
            <text style={{ ...styles.scoreText, ...styles.shadowedText }}>
              {score}
            </text>
          </div>
          <Level level={level} shape1={shape1} shape2={shape2} />
          <div style={{ flex: 1 }}>
            <BoxButton onClick={handleNext} title="next ->" style={{}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  shadowedText: {
    textShadow: "2px 2px #F68888"
  },
  scoreText: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "50%",
    height: "100%"
  },
  rowContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
  },
  header: {
    flex: 1,
  },
  headerText: {
    fontSize: "40px"
  },
  gameContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top"
  },
  titleText: {

  }
}
