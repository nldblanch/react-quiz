export interface State {
  questions: Question[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number;
}
