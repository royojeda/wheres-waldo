// Formats a duration in seconds like a stopwatch: "8.20s", "1:05.32", "1:02:05.50".
export default function formatTime(seconds: number): string {
  const totalCentiseconds = Math.round(seconds * 100);
  const hours = Math.floor(totalCentiseconds / 360000);
  const minutes = Math.floor(totalCentiseconds / 6000) % 60;
  const secondsPart = ((totalCentiseconds % 6000) / 100).toFixed(2);
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = secondsPart.padStart(5, "0");

  if (hours) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  if (minutes) {
    return `${minutes}:${paddedSeconds}`;
  }
  return `${secondsPart}s`;
}
