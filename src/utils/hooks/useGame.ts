import { useEffect, useCallback, useState } from "preact/hooks";
import { clamp } from "..";
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

  const { timeRemaining, actions } = useCountdownTimer(
    gameType === GameTypeEnum.Regular ? LevelDurationSeconds : 0
  );
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  // TODO change for different gametypes
  const numLevels = gameType === GameTypeEnum.Regular ? 10 : Infinity;

  const scoreLevel = () => {
    let diff = Math.abs(shape1.getArea() - shape2.getArea());
    let avgArea = (shape1.getArea() + shape2.getArea()) / 2;
    let m = 5;

    let levelScore =
      1000 * (clamp(avgArea / m - diff, 0, Infinity) / (avgArea / m));

    setScore((s) => {
      // console.log(levelScore);

      setPrevScore(s);
      setPrevLevelScore(levelScore);

      return Math.ceil(s + levelScore);
    });
  };

  const start = () => {
    if (gameType === GameTypeEnum.Regular) {
      actions.reset();
      actions.start(LevelDurationSeconds);
    }
  };

  const restart = () => {
    setGameState(GameStateEnum.Pre);
    setShape1(makeRandomShapes());
    setShape2(makeRandomShapes());
    setCurrentLevel(1);
    setScore(0);
    setPrevScore(0);
    setPrevLevelScore(-1);
  };

  const goNextLevel = () => {
    scoreLevel();

    // TODO add some sort of delay here
    // user should be able to see their score appear + be added
    // to their total and see the actual areas of the shapes for
    // a second

    // actually do the delay here

    if (currentLevel === numLevels) {
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
    // disableInput,
  };
};
