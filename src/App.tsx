import { useEffect, useReducer } from "react";

import type { Question, State, Action } from "./types";
import {
  Header,
  Loader,
  MainLayout,
  NextButton,
  QuestionDisplay,
  StartScreen,
} from "./components";
import ErrorComponent from "./components/ErrorComponent";

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
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
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numOfQuestions = questions.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data: Question[] = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (_) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="app">
        <Header />
        <MainLayout>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorComponent />}
          {status === "ready" && (
            <StartScreen
              numOfQuestions={numOfQuestions}
              onClick={() => dispatch({ type: "start" })}
            />
          )}
          {status === "active" && (
            <>
              <QuestionDisplay
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton
                answer={answer}
                onClick={() => dispatch({ type: "nextQuestion" })}
              />
            </>
          )}
        </MainLayout>
      </div>
    </>
  );
}

export default App;
