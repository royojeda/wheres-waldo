interface HighScoresProps {
  scores: { id: number; player_name: string; score: number }[];
  highlightedGameId: number | null;
  buttonLabel: string;
  onButtonClick: React.MouseEventHandler;
}

export default function HighScores({
  scores,
  highlightedGameId,
  buttonLabel,
  onButtonClick,
}: HighScoresProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-neutral-800/95">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-neutral-700 p-4 text-neutral-300 shadow-lg shadow-neutral-900 sm:p-8">
        <div className="text-center text-2xl">High scores</div>
        <div className="flex w-full flex-col divide-y divide-neutral-500 overflow-hidden rounded-lg border border-neutral-500 text-center text-sm sm:text-base">
          <div className="flex items-center gap-4 bg-neutral-600 px-4 py-2 font-semibold sm:text-lg">
            <div className="w-10 sm:w-12">Rank</div>
            <div className="flex-1">Name</div>
            <div className="w-14 sm:w-20">Time (s)</div>
          </div>
          {scores.length ? (
            scores.map((value, index) => (
              <div
                key={value.id}
                className={`flex gap-4 px-4 py-2 ${
                  value.id === highlightedGameId ? "bg-green-800" : ""
                }`}
              >
                <div className="w-10 break-all sm:w-12">{index + 1}</div>
                <div className="flex-1 break-all">{value.player_name}</div>
                <div className="w-14 break-all sm:w-20">
                  {value.score.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2">No scores yet</div>
          )}
        </div>
        <button
          type="button"
          onClick={onButtonClick}
          className="w-fit rounded-lg border border-neutral-900 bg-neutral-800 px-4 py-2 shadow shadow-neutral-900 hover:bg-neutral-700 focus:bg-neutral-900"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
