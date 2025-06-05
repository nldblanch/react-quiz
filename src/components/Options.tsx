import type { Dispatch, Question, State } from "../types";

type Props = {
  options: Question["options"];
  dispatch: Dispatch;
  answer: State["answer"];
  correctOption: Question["correctOption"];
};

export default function Options({
  options,
  dispatch,
  answer,
  correctOption,
}: Props) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          key={option}
          disabled={hasAnswered}
          className={`
            btn btn-option 
            ${i === answer ? "answer" : ""} 
            ${hasAnswered ? (i === correctOption ? "correct" : "wrong") : ""}`}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
