/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import image from "./images/29ya069ug2f61.jpg";

export default function App() {
  const handleMouseDown: React.MouseEventHandler = (event) => {
    if (event.target === event.currentTarget && event.button === 0) {
      const { offsetX, offsetY } = event.nativeEvent;
      console.clear();
      console.log(
        "X:",
        offsetX / event.currentTarget.clientWidth,
        "Y:",
        offsetY / event.currentTarget.clientHeight
      );
    }
  };

  return (
    <div>
      <div className="select-none bg-neutral-800 p-4 sm:p-20">
        <img
          src={image}
          alt=""
          draggable="false"
          onMouseDown={handleMouseDown}
          className="mx-auto shadow-lg shadow-neutral-900"
        />
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
