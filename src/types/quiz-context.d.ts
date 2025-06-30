import type { State } from "./state";

export interface QuizContextType extends State {
  numOfQuestions: number;
  maxPossiblePoints: number;
  dispatch: Dispatch;
}
