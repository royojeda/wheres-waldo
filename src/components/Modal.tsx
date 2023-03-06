import { useState } from "react";

interface ModalProps {
  score: number;
  onSubmit: (name: string) => void;
}

export default function Modal({ score, onSubmit }: ModalProps) {
  const [name, setName] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setName(event.currentTarget.value);
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/95">
      <div className="items-center1 flex flex-col gap-4 rounded-lg bg-neutral-700 p-4 text-neutral-300 shadow-lg shadow-neutral-900 sm:p-8">
        <div className="text-2xl">Congratulations!</div>
        <div className="text-lg">You finished a game in {score} seconds!</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="playerName"
            id="playerName"
            value={name}
            onChange={handleInputChange}
            required
            maxLength={10}
            placeholder="Please enter your name"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className="rounded-lg bg-neutral-600 p-2 text-center transition placeholder:italic focus:outline-none focus:ring focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-700"
          />
          <button
            type="submit"
            className="rounded-lg border border-neutral-900 bg-neutral-800 px-4 py-2 shadow shadow-neutral-900 hover:bg-neutral-700 focus:bg-neutral-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
