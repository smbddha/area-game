import { useRef, useCallback, useState } from "preact/hooks";
import { IShapeGroup, makeRandomShapes, makeShape, ShapeEnum } from "../shapes";
import { GameStateEnum, GameTypeEnum } from "../types";
import { useCountdownTimer } from "./useCountdownTimer";

export const useGame = (gameType: GameTypeEnum) => {
  const [shape1, setShape1] = useState<IShapeGroup>(makeRandomShapes());
  const [shape2, setShape2] = useState<IShapeGroup>(makeRandomShapes());
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.Pre);

  const [score, setScore] = useState<number>(0);

  const { timeRemaining, actions } = useCountdownTimer(10);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  // TODO change for different gametypes
  const numLevels = 10;

  const scoreLevel = (diff: number) => {
    setScore((s) => {
      console.log(Math.max(1000 - diff, 0));
      return Math.ceil(s + Math.max(1000 - diff, 0));
    });
  };

  const goNextLevel = () => {
    let diff = Math.abs(shape1.getArea() - shape2.getArea());
    console.log(shape1.getArea(), shape2.getArea(), diff);

    scoreLevel(diff);

    // generate new shapes for the next level
    setShape1(makeRandomShapes());
    setShape2(makeRandomShapes());

    if (currentLevel === numLevels) {
      console.log("HERE");
      setGameState(GameStateEnum.Post);
      return;
    }
    setCurrentLevel((n) => n + 1);
  };

  return {
    shape1,
    shape2,
    score,
    timeRemaining,
    currentLevel,
    goNextLevel,
    gameState,
  };
};
