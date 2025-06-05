type Props = {
  onClick: () => void;
  renderCondition: boolean;
  text: string;
};

export default function ConditionalButton({
  onClick,
  renderCondition,
  text,
}: Props) {
  if (renderCondition) {
    return (
      <button className="btn btn-ui" onClick={onClick}>
        {text}
      </button>
    );
  } else {
    return null;
  }
}
