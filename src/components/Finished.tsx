import type { State } from "../types";

type Props = {
  points: State["points"];
  maxPossiblePoints: State["points"];
  highscore: State["highscore"];
};

export default function Finished({
  points,
  maxPossiblePoints,
  highscore,
}: Props) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji = "";
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({percentage.toFixed(0)}%)
      </p>
      <p className="highscore">
        {points === highscore
          ? `New highscore! ${points} points`
          : `(Highscore: ${highscore} points)`}
      </p>
    </>
  );
}
