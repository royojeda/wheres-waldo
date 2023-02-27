/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useState } from "react";
import AnswerButton from "./components/AnswerButton";
import Dialog from "./components/Dialog";
import image from "./images/29ya069ug2f61.jpg";

export default function App() {
  const [dialog, setDialog] = useState({
    isShown: false,
    clickLocation: {
      x: 0,
      y: 0,
    },
    imageSize: {
      width: 0,
      height: 0,
    },
  });

  const [characters, setCharacters] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/characters");
      const data = await response.json();
      setCharacters(data);
    })();
  }, []);

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

    setDialog({
      isShown: !dialog.isShown,
      imageSize: {
        width: (event.target as HTMLElement).clientWidth,
        height: (event.target as HTMLElement).clientHeight,
      },
      clickLocation: {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      },
    });
  };

  const handleAnswerClick = async (name: string) => {
    setDialog({
      ...dialog,
      isShown: false,
    });
    const url = `/characters?name=${name}&x_coordinate=${
      dialog.clickLocation.x / dialog.imageSize.width
    }&y_coordinate=${dialog.clickLocation.y / dialog.imageSize.height}`;
    const response = await fetch(url);
    const data = await response.json();
    console.table(data);
  };

  const imageFor = (imageName: string) => {
    let imageSource = "";
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      imageSource = require(`./images/${imageName}.png`);
    } catch (error) {
      console.log(error);
    }
    return imageSource;
  };

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <header className="flex justify-center gap-2 bg-neutral-900 py-2 text-neutral-400 sm:gap-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="div flex flex-col items-center justify-end gap-4 p-4"
          >
            <img
              src={imageFor(character.name)}
              alt=""
              className="w-10 sm:w-20"
            />
            <div>{character.name}</div>
          </div>
        ))}
      </header>
      <main
        onMouseDown={handleMouseDownOnMain}
        className="select-none bg-neutral-800 p-4 sm:p-20"
      >
        <div className="relative mx-auto w-fit shadow-lg shadow-neutral-900">
          <img src={image} alt="" draggable="false" />
          {dialog.isShown && (
            <Dialog
              clickLocation={dialog.clickLocation}
              imageSize={dialog.imageSize}
            >
              {characters.map((character) => (
                <AnswerButton
                  key={character.id}
                  name={character.name}
                  onClick={handleAnswerClick}
                />
              ))}
            </Dialog>
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
