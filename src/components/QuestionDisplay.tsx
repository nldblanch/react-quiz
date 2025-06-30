import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

export default function QuestionDisplay() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question?.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
}
