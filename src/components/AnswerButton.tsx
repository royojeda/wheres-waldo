interface AnswerButtonProps {
  name: string;
  onClick: (name: string) => void;
}

export default function AnswerButton({ name, onClick }: AnswerButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(name)}
      className="select-none bg-neutral-700 p-1 text-[6px] shadow-sm shadow-neutral-900 hover:bg-neutral-600 focus:bg-neutral-800 sm:p-2 sm:text-sm"
    >
      {name}
    </button>
  );
}
