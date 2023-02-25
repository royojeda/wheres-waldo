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
}

export default function Dialog({
  imageSize: { width: imageWidth, height: imageHeight },
  clickLocation,
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
        <AnswerButton name="Waldo" />
        <AnswerButton name="Odlaw" />
        <AnswerButton name="Wizard" />
        <AnswerButton name="Wilma" />
      </div>
    </div>
  );
}
