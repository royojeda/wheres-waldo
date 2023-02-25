interface AnswerButtonProps {
  name: string;
  onClick: (name: string) => void;
}

export default function AnswerButton({ name, onClick }: AnswerButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(name)}
      className="select-none bg-neutral-700 p-2 shadow-sm shadow-neutral-900 hover:bg-neutral-600 focus:bg-neutral-800"
    >
      {name}
    </button>
  );
}
