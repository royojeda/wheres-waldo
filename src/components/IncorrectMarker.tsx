import { useState } from "react";

interface IncorrectMarkerProps {
  position: {
    left: number;
    top: number;
  };
}

export default function IncorrectMarker({ position }: IncorrectMarkerProps) {
  const [fixedPosition] = useState(position);

  return (
    <div
      style={fixedPosition}
      className="absolute min-w-max rounded-md rounded-tl-none bg-red-700 p-0.5 text-[.5rem] text-neutral-100 shadow shadow-neutral-900 sm:p-2 sm:text-sm"
    >
      Incorrect!
    </div>
  );
}
