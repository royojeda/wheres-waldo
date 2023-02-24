/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useState } from "react";
import AnswerButton from "./components/AnswerButton";
import image from "./images/29ya069ug2f61.jpg";

export default function App() {
  const [dialog, setDialog] = useState({
    isShown: false,
    style: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    },
  });

  const handleMouseDown: React.MouseEventHandler = (event) => {
    if (event.target === event.currentTarget && event.button === 0) {
      const { offsetX, offsetY } = event.nativeEvent;
      const { clientWidth: imageWidth, clientHeight: imageHeight } =
        event.currentTarget;
      console.clear();
      console.log("X:", offsetX / imageWidth, "Y:", offsetY / imageHeight);
      if (dialog.isShown) {
        setDialog({
          ...dialog,
          isShown: false,
        });
      } else {
        const scaleFactor = 30;
        setDialog({
          isShown: true,
          style: {
            left: offsetX - imageWidth / (2 * scaleFactor),
            top: offsetY - imageWidth / (2 * scaleFactor),
            width: imageWidth / scaleFactor,
            height: imageWidth / scaleFactor,
          },
        });
      }
    }
  };

  return (
    <div>
      <div className="select-none bg-neutral-800 p-4 sm:p-20">
        <div className="relative mx-auto w-fit shadow-lg shadow-neutral-900">
          <img
            src={image}
            alt=""
            draggable="false"
            onMouseDown={handleMouseDown}
          />
          {dialog.isShown && (
            <div
              style={{ left: dialog.style.left, top: dialog.style.top }}
              className="absolute flex gap-1"
            >
              <div
                style={{
                  width: dialog.style.width,
                  height: dialog.style.height,
                }}
                className="border border-white bg-transparent sm:border-2"
              />
              <div className="flex flex-col gap-1 bg-neutral-600 p-1 text-neutral-300">
                <AnswerButton name="Waldo" />
                <AnswerButton name="Odlaw" />
                <AnswerButton name="Wizard" />
                <AnswerButton name="Wilma" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-neutral-900 py-2 text-center text-neutral-400">
        Artwork -{" "}
        <a
          href="https://www.artstation.com/artwork/KrkJnG"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          &quot;A.D. 2.222&quot; by Egor Klyuchnyk
        </a>
      </div>
    </div>
  );
}
