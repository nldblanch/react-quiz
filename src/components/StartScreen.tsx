type Props = {
  numOfQuestions: number;
  onClick: () => void;
};
export default function StartScreen({ numOfQuestions, onClick }: Props) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>
        {numOfQuestions} question{numOfQuestions > 1 && "s"} to test your React
        mastery
      </h3>
      <button className="btn btn-ui" onClick={onClick}>
        Let's start
      </button>
    </div>
  );
}
