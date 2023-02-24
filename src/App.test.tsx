import { render, screen } from "@testing-library/react";
import App from "./App";

test("displays artwork credits", () => {
  render(<App />);

  const element = screen.getByText(/A\.D\. 2\.222.*Egor Klyuchnyk/);
  expect(element).toBeInTheDocument();
});
