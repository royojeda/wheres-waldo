/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useRef, useState } from "react";
import AnswerButton from "./components/AnswerButton";
import Dialog from "./components/Dialog";
import IncorrectMarker from "./components/IncorrectMarker";
import Marker from "./components/Marker";
import Modal from "./components/Modal";
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
    Array<{ id: number; name: string }>
  >([]);

  const [isGameStarted, setIsGameStarted] = useState(false);

  const [foundCharacters, setFoundCharacters] = useState<
    Array<{
      id: number;
      name: string;
      x_coordinate: number;
      y_coordinate: number;
    }>
  >([]);

  useEffect(() => {
    (async () => {
      if (!isGameStarted) {
        const response = await fetch("/characters");
        const data: { id: number; name: string }[] = await response.json();
        setCharacters(data);
      }
    })();
  }, [isGameStarted]);

  const notFoundCharacters = characters.filter(
    (character) =>
      !foundCharacters.some(
        (foundCharacter) => foundCharacter.id === character.id
      )
  );

  const [isIncorrectMarkerVisible, setIsIncorrectMarkerVisible] =
    useState(false);

  const gameIdRef = useRef<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [modal, setModal] = useState<{
    isShown: boolean;
    score: number | null;
  }>({ isShown: false, score: null });

  const [scores, setScores] = useState<{
    isShown: boolean;
    values: { id: number; player_name: string; score: number }[];
  }>({
    isShown: true,
    values: [
      {
        id: 142,
        player_name: "asd",
        score: 9.42865,
      },
      {
        id: 143,
        player_name: "12123123",
        score: 11.769345,
      },
      {
        id: 144,
        player_name: "asdf",
        score: 12.255938,
      },
      {
        id: 113,
        player_name: "1",
        score: 15.786952,
      },
      {
        id: 140,
        player_name: "qweqweqwe",
        score: 17.867079,
      },
    ],
  });

  useEffect(() => {
    (async () => {
      if (
        foundCharacters.length &&
        foundCharacters.length === characters.length
      ) {
        const url = `/games/${gameIdRef.current}`;
        const putData = {
          game: {
            found_characters: foundCharacters,
          },
        };
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putData),
        });
        const data = await response.json();
        document.body.style.overflow = "hidden";
        setModal({
          isShown: true,
          score: data.score,
        });
      }
    })();
  }, [characters, foundCharacters]);

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
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsIncorrectMarkerVisible(false);
    const url = `/characters?name=${name}&x_coordinate=${
      dialog.clickLocation.x / dialog.imageSize.width
    }&y_coordinate=${dialog.clickLocation.y / dialog.imageSize.height}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length) {
      setFoundCharacters([...foundCharacters, data[0]]);
    } else if (data.error) {
      console.table(data);
    } else {
      setIsIncorrectMarkerVisible(true);
      timerRef.current = setTimeout(() => {
        setIsIncorrectMarkerVisible(false);
      }, 1500);
    }
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

  const handleClickPlay = async () => {
    const response = await fetch("/games", {
      method: "POST",
    });
    const data = await response.json();
    gameIdRef.current = data.id;
    setIsGameStarted(true);
  };

  const handleSubmitName = async (player_name: string) => {
    setModal({
      ...modal,
      isShown: false,
    });
    setFoundCharacters([]);
    const url = `/games/${gameIdRef.current}`;
    const putData = {
      game: {
        player_name,
      },
    };
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    });
    document.body.style.overflow = "auto";
    const scoresUrl = "/games";
    const response = await fetch(scoresUrl);
    const data = await response.json();
    console.table(data);
    setIsGameStarted(false);
    setScores({ ...scores, isShown: true });
  };

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      {isGameStarted ? (
        <>
          <section className="fixed inset-x-0 top-0 z-10 flex items-center justify-center bg-neutral-900 p-4 text-neutral-400 shadow-md shadow-neutral-900 sm:inset-y-0 sm:left-0 sm:right-auto">
            <div className="grid grid-cols-4 justify-items-center text-xs sm:grid-cols-1 sm:gap-8 sm:text-base">
              {characters.map((character) =>
                notFoundCharacters.includes(character) ? (
                  <div
                    key={character.id}
                    className="div flex w-min flex-col items-center gap-2"
                  >
                    <img
                      src={imageFor(character.name)}
                      alt=""
                      className="max-w-[4rem] sm:max-w-[5rem]"
                    />
                    <div className="flex h-full w-full min-w-max items-center justify-center text-center sm:min-w-0">
                      {character.name}
                    </div>
                  </div>
                ) : (
                  <div
                    key={character.id}
                    className="div flex w-min flex-col items-center gap-2"
                  >
                    <img
                      src={imageFor(character.name)}
                      alt=""
                      className="max-w-[4rem] brightness-[.25] sm:max-w-[5rem]"
                    />
                    <div className="flex h-full w-full min-w-max items-center justify-center text-center text-green-200 sm:min-w-0">
                      {character.name}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
          <main
            onMouseDown={handleMouseDownOnMain}
            className="mt-[7.5rem] select-none bg-neutral-800 p-4 sm:mt-0 sm:ml-[7rem] lg:p-20"
          >
            <div className="relative mx-auto w-fit shadow-lg shadow-neutral-900">
              <img src={image} alt="" draggable="false" />
              {dialog.isShown && (
                <Dialog
                  clickLocation={dialog.clickLocation}
                  imageSize={dialog.imageSize}
                >
                  {notFoundCharacters.map((character) => (
                    <AnswerButton
                      key={character.id}
                      name={character.name}
                      onClick={handleAnswerClick}
                    />
                  ))}
                </Dialog>
              )}
              {foundCharacters.map((character) => (
                <Marker
                  key={character.id}
                  imageSize={dialog.imageSize}
                  character={character}
                />
              ))}
              {isIncorrectMarkerVisible && (
                <IncorrectMarker
                  position={{
                    left: dialog.clickLocation.x,
                    top: dialog.clickLocation.y,
                  }}
                />
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
          {modal.isShown && modal.score && (
            <Modal score={modal.score} onSubmit={handleSubmitName} />
          )}
          {scores.isShown && (
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-neutral-800/95">
              <div className="flex flex-col items-center gap-8 rounded-lg bg-neutral-700 p-4 text-neutral-300 shadow-lg shadow-neutral-900 sm:p-8">
                <div className="text-center text-2xl">{`High scores for `}</div>
                <div className="flex gap-4">
                  {characters.map((character) => (
                    <div
                      key={character.id}
                      className="div flex w-min flex-col items-center gap-2"
                    >
                      <img
                        src={imageFor(character.name)}
                        alt=""
                        className="max-w-[3.5rem] sm:max-w-[5rem]"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex w-full flex-col divide-y divide-neutral-500 overflow-hidden rounded-lg border border-neutral-500 text-center text-sm sm:text-base">
                  <div className="flex items-center gap-4 bg-neutral-600 py-2 px-4 font-semibold sm:text-lg">
                    <div className="w-10 sm:w-12">Rank</div>
                    <div className="flex-1">Name</div>
                    <div className="w-14 sm:w-20">Time (s)</div>
                  </div>
                  {scores.values.map((value, index) => (
                    <div key={value.id} className="flex gap-4 py-2 px-4">
                      <div className="w-10 break-all sm:w-12">{index + 1}</div>
                      <div className="flex-1 break-all">
                        {value.player_name}
                      </div>
                      <div className="w-14 break-all sm:w-20">
                        {value.score.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-fit rounded-lg border border-neutral-900 bg-neutral-800 px-4 py-2 shadow shadow-neutral-900 hover:bg-neutral-700 focus:bg-neutral-900"
                >
                  Play again
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-neutral-800 text-neutral-400">
          <div className="flex w-full flex-col items-center gap-16 p-4">
            <div className="text-center text-4xl text-neutral-300">{`Where's ...`}</div>
            <div className="grid max-w-sm grid-cols-2 justify-items-center gap-4 md:max-w-2xl md:grid-cols-4">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="flex flex-col items-center gap-4 rounded-lg bg-neutral-700 p-4 shadow shadow-neutral-900"
                >
                  <img
                    src={imageFor(character.name)}
                    alt=""
                    className="h-full w-full"
                  />
                  <div className="flex h-full w-full items-center justify-center text-center">
                    {character.name}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleClickPlay}
              type="button"
              className="w-full max-w-[10rem] rounded-lg bg-neutral-700 py-2 text-xl text-neutral-300 shadow shadow-neutral-900 hover:bg-neutral-600 focus:bg-neutral-900"
            >
              Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
