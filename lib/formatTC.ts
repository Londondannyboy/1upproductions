export function fmtTC(s: number): string {
  const total = Math.floor(s * 25);
  const f = total % 25;
  const sec = Math.floor(total / 25) % 60;
  const min = Math.floor(total / 1500) % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
}