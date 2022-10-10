import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";

import BoxButton from "src/components/boxbutton";

const Home: FunctionalComponent = () => {
  const goRegularGame = () => route("/regular");
  const goTimedGame = () => route("/timed");
  const goPracticeGame = () => route("/practice");

  return (
    <div style={styles.mainContainer}>
      home
      <BoxButton
        onClick={goRegularGame}
        title="regular"
        style={{ width: 220, height: 40, fontSize: 30 }}
      />
      <BoxButton
        onClick={goRegularGame}
        title="timed"
        style={{ width: 220, height: 40, fontSize: 30 }}
      />
      <BoxButton
        onClick={goPracticeGame}
        title="practice"
        style={{ width: 220, height: 40, fontSize: 30 }}
      />
    </div>
  );
};

export default Home;

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
