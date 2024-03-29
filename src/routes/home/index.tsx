import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";

import { motion } from "framer-motion";

import BoxButton from "src/components/boxbutton";
import { colors } from "src/style";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home: FunctionalComponent = () => {
  const goRegularGame = () => route("/regular");
  const goTimedGame = () => route("/timed");
  const goPracticeGame = () => route("/practice");
  const goAbout = () => route("/about");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={styles.mainContainer}>
          <div>
            <h1 style={{ fontSize: 46 }}>area game</h1>
          </div>

          <BoxButton
            onClick={goRegularGame}
            title="regular"
            style={{ width: 220, fontSize: 24 }}
          />
          <BoxButton
            onClick={goTimedGame}
            title="timed"
            style={{ width: 220, fontSize: 24 }}
          />
          <BoxButton
            onClick={goPracticeGame}
            title="practice"
            style={{ width: 220, fontSize: 24 }}
          />
          <BoxButton
            onClick={goAbout}
            title="about"
            style={{ width: 220, fontSize: 24 }}
          />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default Home;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",

    color: colors.white,
  },
};
