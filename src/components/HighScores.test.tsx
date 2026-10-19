import { render, screen } from "@testing-library/react";
import HighScores from "./HighScores";

const topThree = [
  { id: 1, player_name: "ann", rank: 1, score: 10 },
  { id: 2, player_name: "bob", rank: 2, score: 20 },
  { id: 3, player_name: "cat", rank: 3, score: 30 },
];

function renderHighScores(
  scores = topThree,
  highlightedGameId: number | null = null
) {
  render(
    <HighScores
      scores={scores}
      highlightedGameId={highlightedGameId}
      buttonLabel="Close"
      onButtonClick={() => {}}
    />
  );
}

test("shows each game's rank from the API", () => {
  renderHighScores([
    ...topThree,
    { id: 9, player_name: "me", rank: 27, score: 99 },
  ]);

  expect(screen.getByText("27")).toBeInTheDocument();
});

test("separates a game that doesn't follow the previous rank", () => {
  renderHighScores([
    ...topThree,
    { id: 9, player_name: "me", rank: 27, score: 99 },
  ]);

  expect(screen.getByText("⋯")).toBeInTheDocument();
});

test("does not separate consecutive ranks", () => {
  renderHighScores();

  expect(screen.queryByText("⋯")).not.toBeInTheDocument();
});

test("highlights the player's game", () => {
  renderHighScores(topThree, 2);

  expect(screen.getByText("bob").parentElement).toHaveClass("bg-green-800");
});

test("shows a message when there are no scores", () => {
  renderHighScores([]);

  expect(screen.getByText("No scores yet")).toBeInTheDocument();
});
