import formatTime from "./formatTime";

describe("formatTime", () => {
  it.each([
    [8.204113, "8.20s"],
    [0.004, "0.00s"],
    [39.997329, "40.00s"],
    [59.996, "1:00.00"],
    [65.321, "1:05.32"],
    [600, "10:00.00"],
    [3725.5, "1:02:05.50"],
  ])("formats %p seconds as %p", (seconds, expected) => {
    expect(formatTime(seconds)).toBe(expected);
  });
});
