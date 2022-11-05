import axios from "axios";

import config from "src/config";
import { GameTypeEnum } from "src/utils";

const URL = config.API_URL;

const api = axios.create({
  baseURL: URL,
});

type ScoreDto = {
  username: string;
  score: number;
  gameType: GameTypeEnum;
};

export const createScore = (scoreObj: ScoreDto) => {
  return api.post("/scores", scoreObj);
};

export const fetchLeaderboard = (gameType: GameTypeEnum) => {
  return api.get("/scores/leaderboard", {
    params: { gameType: gameType },
  });
};

export const setUsername = (username: string, scoreId: string) => {
  return api.put(`/scores/${scoreId}`, {
    username,
  });
};
