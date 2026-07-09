'use client';

import { useCurrency, convertGBP } from '@/components/CurrencyProvider';

// Renders a GBP base amount in the visitor's currency (approx). During SSR and before
// the client resolves currency, it renders the exact GBP value so static HTML + SEO stay clean.
export default function LocalPrice({ gbp, className }: { gbp: number; className?: string }) {
  const { code, info, ready } = useCurrency();
  if (!ready || code === 'GBP') return <span className={className}>&pound;{gbp}</span>;
  const val = convertGBP(gbp, code, info.rate);
  return <span className={className} title={`Approx, from £${gbp}. Exact price shown on GetYourGuide.`}>{'≈ '}{info.symbol}{val.toLocaleString('en-GB')}</span>;
}
