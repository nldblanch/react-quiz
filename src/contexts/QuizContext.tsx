import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import reducer from "../utils/reducer";
import { initialState } from "../constants";
import type { Question, QuizContextType } from "../types";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};
export function QuizProvider({ children }: Props) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions: number = questions.length;
  const maxPossiblePoints: number = useMemo(
    () =>
      questions.reduce((prev: number, curr: Question) => prev + curr.points, 0),
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
    <QuizContext.Provider
      value={{
        questions,
        numOfQuestions,
        status,
        index,
        answer,
        points,
        maxPossiblePoints,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("Context was used outside of provider");
  }
  return context;
}
