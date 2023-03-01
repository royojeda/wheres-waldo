import { useState } from "react";

interface MarkerProps {
  character: {
    id: number;
    name: string;
    x_coordinate: number;
    y_coordinate: number;
  };
  imageSize: {
    width: number;
    height: number;
  };
}

export default function Marker({ character, imageSize }: MarkerProps) {
  const [image] = useState(imageSize);

  const SCALE_FACTOR = 30;

  const position = {
    left: character.x_coordinate * image.width,
    top:
      character.y_coordinate * image.height + image.width / (2 * SCALE_FACTOR),
  };

  return (
    <div
      style={position}
      className="absolute min-w-max rounded-md rounded-tl-none border bg-neutral-200 p-1 text-sm text-neutral-800 shadow shadow-neutral-900"
    >
      {character.name}
    </div>
  );
}
