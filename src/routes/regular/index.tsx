import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

import { IShape, IShapeGroup, ShapeEnum, makeShape } from "src/utils";
import { useCountdownTimer } from "src/utils/hooks/useCountdownTimer";

import Level from "src/components/level";
import Timer from "src/components/timer";
import BoxButton from "src/components/boxbutton";
import { useGame } from "src/utils/hooks/useGame";
import { GameTypeEnum } from "src/utils/types";
import Counter from "src/components/counter";
import { colors } from "src/style";

enum GameStateEnum {
  Pre = "PRE",
  Playing = "PLAYING",
  Post = "POST",
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: colors.background,
    height: "80%",
    width: "80%",
    maxHeight: "800px",
    maxWidth: "600px",
    opacity: 1,

    color: colors.white,
    border: `2px solid ${colors.white}`,
  },
  overlay: {
    background: "rgba(41,41,41,0.5)",
  },
};

Modal.setAppElement("#preact_root");

export const MyComponent = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </AnimatePresence>
);

const numLevels = 10;
const RegularGame: FunctionalComponent = () => {
  // const { timeRemaining, actions } = useCountdownTimer(10);
  // const [currentLevel, setCurrentLevel] = useState<number>(1);
  // const [score, setScore] = useState<number>(0);
  // const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.Pre);

  // const [shape1, setShape1] = useState<IShape | IShapeGroup>(
  //   makeShape(ShapeEnum.Rectangle, 1)
  // );
  // const [shape2, setShape2] = useState<IShape | IShapeGroup>(
  //   makeShape(ShapeEnum.Circle, 3)
  // );

  // const renderLevel = () => {};

  const formatPercent = (tr: number) => {
    return tr / (10 * 1000);
  };

  const formatDisplayNum = (tr: number) => {
    return Math.ceil((tr - 1) / 1000);
  };

  // const scoreLevel = (diff: number) => {
  //   setScore((s) => {
  //     console.log(Math.max(1000 - diff, 0));
  //     return Math.ceil(s + Math.max(1000 - diff, 0));
  //   });
  // };

  // const handleNext = () => {
  //   //let diff = area1 - area2;
  //   let diff = Math.abs(shape1.getArea() - shape2.getArea());
  //   console.log(shape1.getArea(), shape2.getArea(), diff);

  //   scoreLevel(diff);

  //   setShape1(makeShape(ShapeEnum.Rectangle));
  //   setShape2(makeShape(ShapeEnum.Circle));

  //   if (currentLevel === numLevels) {
  //     console.log("HERE");
  //     setGameState(GameStateEnum.Post);
  //     return;
  //   }
  //   setCurrentLevel((n) => n + 1);
  // };

  const {
    start,
    shape1,
    shape2,
    prevScore,
    score,
    prevLevelScore,
    timeRemaining,
    currentLevel,
    goNextLevel,
    gameState,
    setGameState,
  } = useGame(GameTypeEnum.Regular);

  const closePreModal = () => {
    setGameState(GameStateEnum.Playing);
    start();
  };

  const closePostModal = () => {
    // setGameState(GameStateEnum.Playing);
    route("/");
  };

  return (
    <div style={{ ...styles.mainContainer, justifyContent: "center" }}>
      <Modal
        isOpen={gameState === GameStateEnum.Pre}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closePreModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            ...styles.mainContainer,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h1>regular game</h1>
          <div style={{ flex: 1 }}>
            <p>
              You have ten rounds to get the highest score possible! Adjust the
              sliders below the shapes the match their areas.
            </p>
          </div>

          <div style={{ alignSelf: "flex-end" }}>
            <BoxButton
              onClick={closePreModal}
              title="start"
              style={{ width: 180, fontSize: 24 }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={gameState === GameStateEnum.Post}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closePostModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            ...styles.mainContainer,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          FINISHED
        </div>
      </Modal>

      <div style={styles.container}>
        <div style={styles.rowContainer}>
          <div style={styles.header}>
            <h1 style={{ ...styles.headerText }}>area game</h1>
          </div>
        </div>
        <div style={styles.gameContainer}>
          <div
            style={{
              ...styles.rowContainer,
              alignItems: "right",
              justifyContent: "flex-end",
            }}
          >
            <Timer
              percent={formatPercent(timeRemaining)}
              displayNum={formatDisplayNum(timeRemaining)}
            />
          </div>
          <div
            style={{
              ...styles.rowContainer,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                ...styles.columnContainer,

                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <text>your score</text>
              {/*<text style={{ ...styles.scoreText, ...styles.shadowedText }}>
                {score}
								</text> */}
              <Counter
                style={{ ...styles.scoreText, ...styles.shadowedText }}
                from={prevScore}
                to={score}
              />
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 4 }}
              >
                <div>{prevLevelScore}</div>
              </motion.div>
            </div>
          </div>

          <Level level={currentLevel} shape1={shape1} shape2={shape2} />

          <div
            style={{
              marginTop: 30,
              ...styles.rowContainer,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              level {currentLevel}
            </div>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 20,
                color: "#393939",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  textShadow: "1px 1px #F68888",
                  paddingBottom: 2,
                }}
              >
                {currentLevel}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  background: "#393939",
                  boxShadow: "1px 1px 0px #F68888",
                }}
              ></div>
              <div
                style={{
                  textShadow: "1px 1px #F68888",
                }}
              >
                10
              </div>
            </div>*/}
            <div style={{ flex: 1, textAlign: "right", float: "right" }}>
              <BoxButton
                onClick={goNextLevel}
                title="next ->"
                style={{ width: 220, fontSize: 24 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularGame;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    color: colors.white,
  },
  shadowedText: {
    textShadow: "2px 2px #F68888",
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
    height: "100%",
  },
  rowContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
  },
  columnContainer: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    flex: 1,
  },
  headerText: {
    fontSize: "40px",
  },
  gameContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
  },
  titleText: {},
};
