// Server-rendered viewer counter with deterministic hourly jitter.
// No client JS. Refreshes every hour via the tour-page s-maxage=3600 cache header.

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function ViewerCounter({ seed }: { seed: string }) {
  const hourKey = `${seed}-${Math.floor(Date.now() / 3_600_000)}`;
  const base = 22 + (hash(hourKey) % 48); // 22 to 69
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      {base} travellers viewed this in the last hour
    </span>
  );
}
