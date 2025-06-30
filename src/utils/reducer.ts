import { initialState, SECS_PER_QUESTION } from "../constants";
import type { Action, State } from "../types";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.sort(() => Math.random() - 0.5).slice(0, 10),
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      const { highscore, questions } = state;
      return {
        ...initialState,
        highscore,
        questions,
        status: "loading",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

export default reducer;
