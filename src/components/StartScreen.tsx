import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  const { numOfQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>
        {numOfQuestions} question{numOfQuestions > 1 && "s"} to test your React
        mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
