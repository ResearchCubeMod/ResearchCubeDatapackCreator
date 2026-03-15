export function formatTicks(ticks: number): string {
  if (ticks <= 0) return '0 ticks';
  const totalSeconds = ticks / 20;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [`${ticks} ticks`];

  if (minutes > 0 && seconds > 0) {
    parts.push(`${minutes}min ${seconds}s`);
  } else if (minutes > 0) {
    parts.push(`${minutes}min`);
  } else {
    parts.push(`${totalSeconds}s`);
  }

  return parts.join(' = ');
}
