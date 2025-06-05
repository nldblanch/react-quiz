import type { State } from "../types";

type Props = { answer: State["answer"]; onClick: () => void };

export default function NextButton({ answer, onClick }: Props) {
  if (answer === null) return null;
  return (
    <button className="btn btn-ui" onClick={onClick}>
      Next
    </button>
  );
}
