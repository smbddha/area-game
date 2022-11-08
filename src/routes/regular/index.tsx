import { FunctionalComponent, h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import Modal from "react-modal";
import { motion, useAnimationControls } from "framer-motion";

import Counter from "src/components/counter";
import Level from "src/components/level";
import Timer from "src/components/timer";
import BoxButton from "src/components/boxbutton";

import { createScore } from "src/api";
import { useGame } from "src/utils/hooks/useGame";
import { GameTypeEnum } from "src/utils/types";
import { colors } from "src/style";
import { useMutation } from "@tanstack/react-query";
import Leaderboard from "src/components/leaderboard";

enum GameStateEnum {
  Pre = "PRE",
  Playing = "PLAYING",
  Post = "POST",
}

Modal.setAppElement("#preact_root");

type ScoreDto = {
  username: string;
  score: number;
  gameType: GameTypeEnum;
};

const RegularGame: FunctionalComponent = () => {
  const formatPercent = (tr: number) => {
    return tr / (10 * 1000);
  };

  const formatDisplayNum = (tr: number) => {
    return Math.ceil((tr - 1) / 1000);
  };

  // const mutation = useMutation("score", createScore);
  const mutation = useMutation({
    // mutationKey: ["score"],
    mutationFn: createScore,
  });

  const {
    start,
    restart,
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

  const controls = useAnimationControls();

  useEffect(() => {
    if (prevLevelScore > -1) {
      controls.set({ opacity: 1 });
      controls.start({
        opacity: 0,
        transition: { duration: 2 },
      });
    }
  }, [prevLevelScore]);

  useEffect(() => {
    if (gameState === GameStateEnum.Post) {
      mutation.mutate({
        score,
        gameType: GameTypeEnum.Regular,
        username: "anon",
      });
    }
  }, [gameState]);

  // useEffect(() => {
  // 		if (mutation.isSuccess)	 {
  // 				console.log("MUTATION", mutation);
  // 		}
  // }, [mutation])

  const closePreModal = () => {
    setGameState(GameStateEnum.Playing);
    start();
  };

  const closePostModal = () => {
    // setGameState(GameStateEnum.Playing);
    goHome();
  };

  const replayGame = () => {
    restart();
  };

  const goHome = () => route("/");

  const finishedScoreMessage = () => {
    if (score > 9000) {
      return "Wow ! Nearly perfect !";
    }

    if (score > 7000) {
      return "Amazing job ! So close.";
    }

    if (score > 5000) {
      return "Not bad !";
    }

    if (score > 3000) {
      return "A meh performance !";
    }

    if (score > 1000) {
      return "Hmm... not so good huh?";
    }

    return "???";
  };

  return (
    <>
      <Modal
        isOpen={gameState === GameStateEnum.Pre}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closePreModal}
        style={styles}
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
            alignItems: "center",
            // paddingTop: "2rem",
          }}
        >
          <div style={{ ...styles.rowContainer }}>
            <h1>Final Score</h1>
            <div style={{ flex: 1, textAlign: "center " }}>
              <h1 style={{ fontSize: "3em" }}>{score}</h1>
            </div>
          </div>

          <div
            style={{
              fontSize: "36px",
              // flex: 1,
            }}
          >
            {finishedScoreMessage()}
          </div>
          {mutation.isSuccess && (
            <Leaderboard
              scoreId={mutation.data.data.data.id}
              gameType={GameTypeEnum.Regular}
            />
          )}

          <div
            style={{ ...styles.rowContainer, justifyContent: "space-between" }}
          >
            {/* TODO style the exit button better (red background) */}
            <div style={{ alignSelf: "flex-start" }}>
              <BoxButton
                onClick={goHome}
                title="exit"
                style={{ width: 180, fontSize: 24 }}
              />
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <BoxButton
                onClick={replayGame}
                title="restart"
                style={{ width: 180, fontSize: 24 }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* ----- END MODALS ----- */}

      <div style={styles.container}>
        <div style={styles.rowContainer}>
          <div style={styles.header}>
            <h1 style={{ ...styles.headerText }} onClick={goHome}>
              area game
            </h1>
          </div>
        </div>
        <div
          style={{ ...styles.gameContainer, width: "100%", maxHeight: "70%" }}
        >
          <div
            style={{
              ...styles.rowContainer,
              alignItems: "flex-end",
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
              <Counter
                style={{ ...styles.scoreText }}
                from={prevScore}
                to={score}
              />
              <motion.div animate={controls} initial={{ opacity: 0 }}>
                <div>+{prevLevelScore.toFixed(0)}</div>
              </motion.div>
            </div>
          </div>

          <Level level={currentLevel} shape1={shape1} shape2={shape2} />
        </div>

        {/* BOTTOM */}

        <div
          style={{
            marginTop: 50,
            marginBottom: 50,
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
          <div style={{ textAlign: "right" }}>
            <BoxButton
              onClick={goNextLevel}
              title="next ->"
              style={{ width: 220, fontSize: 24 }}
            />
          </div>
        </div>
      </div>
    </>
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
  // rowContainer: {
  //   display: "flex",
  //   flexDirection: "column",
  //   width: "100%",
  // },
  shadowedText: {
    // textShadow: "2px 2px #F68888",
  },
  scoreText: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // maxWidth: "50%",
    maxWidth: "800px",
    width: "100%",
    height: "100%",
  },
  rowContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
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
    // justifyContent: "flex-start",
  },
  titleText: {},
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

// for modals
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
