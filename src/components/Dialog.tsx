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

  const handleSubmitAnswer = (name: string) => {
    console.clear();
    console.log(
      "X:",
      clickLocation.x / imageWidth,
      "Y:",
      clickLocation.y / imageHeight
    );
    console.log(name);
    console.log(clickLocation.x / imageWidth);
    console.log(clickLocation.y / imageHeight);
  };

  return (
    <div style={position} className="absolute flex gap-1">
      <div
        style={size}
        className="border border-white bg-transparent sm:border-2"
      />
      <div className="flex flex-col gap-1 bg-neutral-600 p-1 text-neutral-300">
        <AnswerButton name="Waldo" onClick={handleSubmitAnswer} />
        <AnswerButton name="Odlaw" onClick={handleSubmitAnswer} />
        <AnswerButton name="Wizard" onClick={handleSubmitAnswer} />
        <AnswerButton name="Wilma" onClick={handleSubmitAnswer} />
      </div>
    </div>
  );
}
