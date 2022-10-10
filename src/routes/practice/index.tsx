import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Modal from "react-modal";

import Level from "src/components/level";
import Timer from "src/components/timer";
import BoxButton from "src/components/boxbutton";
import { useGame } from "src/utils/hooks/useGame";
import { GameTypeEnum } from "src/utils/types";

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
  },
};

Modal.setAppElement("#preact_root");

const RegularGame: FunctionalComponent = () => {
  const {
    start,
    shape1,
    shape2,
    score,
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
  };

  return (
    <div style={styles.mainContainer}>
      <Modal
        isOpen={gameState === GameStateEnum.Pre}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closePreModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1>* Practice *</h1>
        <p>Endless levels to hone your area-matching skills!</p>
        <button onclick={closePreModal}>Start</button>
      </Modal>
      <Modal
        isOpen={gameState === GameStateEnum.Post}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closePostModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* TODO show stats on the finished modal */}
        FINISHED
      </Modal>

      <div style={styles.container}>
        <div style={styles.rowContainer}>
          <div style={styles.header}>
            <h1 style={{ ...styles.shadowedText, ...styles.headerText }}>
              area game
            </h1>
          </div>
        </div>
        <div style={styles.gameContainer}>
          <div
            style={{
              ...styles.rowContainer,
              alignItems: "right",
              justifyContent: "flex-end",
            }}
          ></div>
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
              {/* <text>your score</text>
              <text style={{ ...styles.scoreText, ...styles.shadowedText }}>
                {score}
              </text>
							 */}
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
            <div style={{ flex: 1 }}></div>
            <div
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
            </div>
            <div style={{ flex: 1 }}>
              <BoxButton
                onClick={goNextLevel}
                title="next ->"
                style={{ width: 220, height: 40, fontSize: 30 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeGame;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
