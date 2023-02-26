import AnswerButton from "./AnswerButton";

interface DialogProps {
  imageSize: {
    width: number;
    height: number;
  };
  clickLocation: {
    x: number;
    y: number;
  };
  onSubmit: (name: string) => void;
}

export default function Dialog({
  imageSize: { width: imageWidth },
  clickLocation,
  onSubmit,
}: DialogProps) {
  const SCALE_FACTOR = 30;

  const position = {
    left: clickLocation.x - imageWidth / (2 * SCALE_FACTOR),
    top: clickLocation.y - imageWidth / (2 * SCALE_FACTOR),
  };

  const size = {
    width: imageWidth / SCALE_FACTOR,
    height: imageWidth / SCALE_FACTOR,
  };

  return (
    <div style={position} className="absolute flex gap-1">
      <div
        style={size}
        className="border border-white bg-transparent sm:border-2"
      />
      <div className="flex flex-col gap-1 bg-neutral-600 p-1 text-neutral-300">
        <AnswerButton name="Waldo" onClick={onSubmit} />
        <AnswerButton name="Odlaw" onClick={onSubmit} />
        <AnswerButton name="Wizard" onClick={onSubmit} />
        <AnswerButton name="Wilma" onClick={onSubmit} />
      </div>
    </div>
  );
}
