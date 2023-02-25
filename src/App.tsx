/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useState } from "react";
import Dialog from "./components/Dialog";
import image from "./images/29ya069ug2f61.jpg";

export default function App() {
  const [dialog, setDialog] = useState({
    isShown: false,
    position: {
      left: 0,
      top: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  });

  const handleMouseDownOnMain: React.MouseEventHandler = (event) => {
    if (event.button !== 0) {
      return;
    }

    if (event.currentTarget === event.target && !dialog.isShown) {
      return;
    }

    if ((event.target as HTMLElement).tagName === "BUTTON") {
      return;
    }

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
        position: {
          left: offsetX - imageWidth / (2 * scaleFactor),
          top: offsetY - imageWidth / (2 * scaleFactor),
        },
        size: {
          width: imageWidth / scaleFactor,
          height: imageWidth / scaleFactor,
        },
      });
    }
  };

  return (
    <div>
      <main
        onMouseDown={handleMouseDownOnMain}
        className="select-none bg-neutral-800 p-4 sm:p-20"
      >
        <div className="relative mx-auto w-fit shadow-lg shadow-neutral-900">
          <img src={image} alt="" draggable="false" />
          {dialog.isShown && (
            <Dialog position={dialog.position} size={dialog.size} />
          )}
        </div>
      </main>
      <footer className="bg-neutral-900 py-2 text-center text-neutral-400">
        {`Artwork - `}
        <a
          href="https://www.artstation.com/artwork/KrkJnG"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          {`"A.D. 2.222" by Egor Klyuchnyk`}
        </a>
      </footer>
    </div>
  );
}
