import ConditionalButton from "./ConditionalButton";
import { useQuiz } from "../../contexts/QuizContext";

export default function NextQuestion() {
  const { answer, index, numOfQuestions, dispatch } = useQuiz();
  return (
    <ConditionalButton
      renderCondition={answer !== null && index < numOfQuestions - 1}
      onClick={() => dispatch({ type: "nextQuestion" })}
      text="Next"
    />
  );
}
