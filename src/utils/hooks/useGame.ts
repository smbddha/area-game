import { useEffect, useCallback, useState } from "preact/hooks";
import { IShapeGroup, makeRandomShapes, makeShape, ShapeEnum } from "../shapes";
import { GameStateEnum, GameTypeEnum } from "../types";
import { useCountdownTimer } from "./useCountdownTimer";

const LevelDurationSeconds = 10;

export const useGame = (gameType: GameTypeEnum) => {
  const [shape1, setShape1] = useState<IShapeGroup>(makeRandomShapes());
  const [shape2, setShape2] = useState<IShapeGroup>(makeRandomShapes());
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.Pre);

  const [score, setScore] = useState<number>(0);
  const [prevScore, setPrevScore] = useState<number>(0);
  const [prevLevelScore, setPrevLevelScore] = useState<number>(-1);

  const { timeRemaining, actions } = useCountdownTimer(LevelDurationSeconds);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  // TODO change for different gametypes
  const numLevels = 10;

  const scoreLevel = (diff: number) => {
    setScore((s) => {
      console.log(Math.max(1000 - diff, 0));
      setPrevScore(s);
      setPrevLevelScore(Math.max(1000 - diff, 0));

      // TODO play around with the scoring
      return Math.ceil(s + Math.max(1000 - diff, 0));
    });
  };

  const start = () => {
    actions.reset();
    actions.start(LevelDurationSeconds);
  };

  const goNextLevel = () => {
    let diff = Math.abs(shape1.getArea() - shape2.getArea());
    console.log(shape1.getArea(), shape2.getArea(), diff);

    scoreLevel(diff);

    // TODO add some sort of delay here
    // user should be able to see their score appear + be added
    // to their total and see the actual areas of the shapes for
    // a second

    // actually do the delay here

    if (currentLevel === numLevels) {
      console.log("HERE");
      setGameState(GameStateEnum.Post);
      return;
    }
    setCurrentLevel((n) => n + 1);

    // generate new shapes for the next level
    setShape1(makeRandomShapes());
    setShape2(makeRandomShapes());

    start();
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      console.log("NO TIME REMAINING");

      // TODO add some sort of delay here
      // user should be able to see their score appear + be added
      // to their total and see the actual areas of the shapes for
      // a second

      goNextLevel();
    }

    if (currentLevel === numLevels) {
      actions.reset();
      actions.pause();
    }
  }, [timeRemaining]);

  return {
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
    // disableInput,
  };
};
