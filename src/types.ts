export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export interface State {
  questions: Question[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

export type Action =
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

export type Dispatch = React.ActionDispatch<[action: Action]>;
