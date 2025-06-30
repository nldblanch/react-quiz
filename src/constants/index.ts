import type { State } from "../types";

export const SECS_PER_QUESTION = 30;

export const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 360,
};
