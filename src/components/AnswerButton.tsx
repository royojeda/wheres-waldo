interface AnswerButtonProps {
  name: string;
}

export default function AnswerButton({ name }: AnswerButtonProps) {
  return (
    <button
      type="button"
      className="select-none bg-neutral-700 p-2 shadow-sm shadow-neutral-900 hover:bg-neutral-600 focus:bg-neutral-800"
    >
      {name}
    </button>
  );
}
