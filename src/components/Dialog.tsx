import AnswerButton from "./AnswerButton";

interface DialogProps {
  position: {
    left: number;
    top: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export default function Dialog({ position, size }: DialogProps) {
  return (
    <div style={position} className="absolute flex gap-1">
      <div
        style={size}
        className="border border-white bg-transparent sm:border-2"
      />
      <div className="flex flex-col gap-1 bg-neutral-600 p-1 text-neutral-300">
        <AnswerButton name="Waldo" />
        <AnswerButton name="Odlaw" />
        <AnswerButton name="Wizard" />
        <AnswerButton name="Wilma" />
      </div>
    </div>
  );
}
