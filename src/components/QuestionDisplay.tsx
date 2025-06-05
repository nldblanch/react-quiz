import type { Action, Dispatch, Question, State } from "../types";
import Options from "./Options";

type Props = {
  question: Question;
  dispatch: Dispatch;
  answer: State["answer"];
};

export default function QuestionDisplay({ question, dispatch, answer }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
}
