'use client';

import { useCurrency } from '@/components/CurrencyProvider';
import { SITE_CURRENCY } from '@/lib/constants';
import { convertAmount, currencySymbol, resolveCurrency } from '@/lib/currency';

export default function LocalPrice({
  amount,
  currency,
  className,
}: {
  amount: number;
  currency?: string;
  className?: string;
}) {
  const { code, info, ready, rates } = useCurrency();
  const from = resolveCurrency(currency);
  const displayCode = ready ? resolveCurrency(code) : SITE_CURRENCY;
  const displaySymbol = ready ? info.symbol : currencySymbol(SITE_CURRENCY);
  const val = convertAmount(amount, from, displayCode, rates);
  const converted = from !== displayCode;
  const showApprox = converted && displayCode !== SITE_CURRENCY;

  if (!showApprox) {
    return (
      <span className={className}>
        {displaySymbol}{val.toLocaleString('en-GB')}
      </span>
    );
  }

  return (
    <span className={className} title="Approximate conversion. Exact price shown on GetYourGuide.">
      {'≈ '}{displaySymbol}{val.toLocaleString('en-GB')}
    </span>
  );
}
