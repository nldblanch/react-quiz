import ConditionalButton from "./ConditionalButton";
import { useQuiz } from "../../contexts/QuizContext";

export default function RestartQuiz() {
  const { dispatch } = useQuiz();
  return (
    <ConditionalButton
      renderCondition={true}
      onClick={() => dispatch({ type: "restart" })}
      text="Restart Quiz"
    />
  );
}
