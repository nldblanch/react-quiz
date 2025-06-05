import { useEffect, useMemo, useReducer } from "react";

import type { Question, State, Action } from "./types";
import {
  Finished,
  Header,
  Loader,
  MainLayout,
  ConditionalButton,
  Progress,
  QuestionDisplay,
  StartScreen,
  ErrorComponent,
  Footer,
  Timer,
} from "./components";
const SECS_PER_QUESTION = 30;
const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 360,
};

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

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxPossiblePoints = useMemo(
    () => questions.reduce((prev, curr) => prev + curr.points, 0),
    [questions],
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/questions.json");
        const { questions }: { questions: Question[] } = await res.json();
        dispatch({ type: "dataReceived", payload: questions });
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
              <Progress
                index={index}
                numOfQuestions={numOfQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <QuestionDisplay
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <ConditionalButton
                  renderCondition={
                    answer !== null && index < numOfQuestions - 1
                  }
                  onClick={() => dispatch({ type: "nextQuestion" })}
                  text="Next"
                />
                <ConditionalButton
                  renderCondition={
                    answer !== null && index >= numOfQuestions - 1
                  }
                  onClick={() => dispatch({ type: "finish" })}
                  text="Finish"
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <>
              <Finished
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
              />
              <ConditionalButton
                renderCondition={true}
                onClick={() => dispatch({ type: "restart" })}
                text="Restart Quiz"
              />
            </>
          )}
        </MainLayout>
      </div>
    </>
  );
}

export default App;
