export function getTimeFromMins(mins: number | undefined): string | null {
  if (mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + ' ч ' + minutes + ' мин';
  } else return null;
}
