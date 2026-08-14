'use client';

import { useCurrency, convertGBP } from '@/components/CurrencyProvider';

// Renders a stored GBP catalogue amount in the visitor's currency (approx).
// Default market display is EUR, including SSR / first paint, so the footer and
// cards are not forced to £ while FX loads.
export default function LocalPrice({ gbp, className }: { gbp: number; className?: string }) {
  const { code, info } = useCurrency();
  if (code === 'GBP') return <span className={className}>&pound;{gbp}</span>;
  const val = convertGBP(gbp, code, info.rate);
  return <span className={className} title={`Approx, from £${gbp}. Exact price shown on GetYourGuide.`}>{'≈ '}{info.symbol}{val.toLocaleString('en-GB')}</span>;
}
