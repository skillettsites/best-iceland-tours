import { SITE_CURRENCY } from '@/lib/constants';

// fallback = units of this currency per 1 SITE_CURRENCY (EUR).
export const CURRENCIES: Record<string, { symbol: string; fallback: number }> = {
  EUR: { symbol: '€', fallback: 1 },
  GBP: { symbol: '£', fallback: 0.85 },
  USD: { symbol: '$', fallback: 1.08 },
  CAD: { symbol: 'C$', fallback: 1.47 },
  AUD: { symbol: 'A$', fallback: 1.64 },
  NZD: { symbol: 'NZ$', fallback: 1.76 },
  CHF: { symbol: 'CHF ', fallback: 0.95 },
  SEK: { symbol: 'kr ', fallback: 11.4 },
  NOK: { symbol: 'kr ', fallback: 11.7 },
  DKK: { symbol: 'kr ', fallback: 7.46 },
  JPY: { symbol: '¥', fallback: 165 },
  MXN: { symbol: 'MX$', fallback: 19.5 },
  BRL: { symbol: 'R$', fallback: 5.85 },
  AED: { symbol: 'AED ', fallback: 3.95 },
  SGD: { symbol: 'S$', fallback: 1.45 },
  HKD: { symbol: 'HK$', fallback: 8.4 },
  INR: { symbol: '₹', fallback: 90 },
  ISK: { symbol: 'kr ', fallback: 148 },
  PLN: { symbol: 'zł ', fallback: 4.32 },
};

export const FALLBACK_RATES: Record<string, number> = Object.fromEntries(
  Object.entries(CURRENCIES).map(([code, meta]) => [code, meta.fallback]),
);

export const COUNTRY_TO_CUR: Record<string, string> = {
  US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'NZD', GB: 'GBP', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK',
  JP: 'JPY', MX: 'MXN', BR: 'BRL', AE: 'AED', SG: 'SGD', HK: 'HKD', IN: 'INR', IS: 'ISK', PL: 'PLN',
  IE: 'EUR', FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR',
  FI: 'EUR', GR: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', CY: 'EUR', MT: 'EUR', HR: 'EUR',
};

export function currencyFromCountry(country?: string): string {
  if (!country) return SITE_CURRENCY;
  return COUNTRY_TO_CUR[country.toUpperCase()] || SITE_CURRENCY;
}

export function resolveCurrency(code?: string): string {
  return code && CURRENCIES[code] ? code : SITE_CURRENCY;
}

export function currencySymbol(code?: string): string {
  return CURRENCIES[resolveCurrency(code)].symbol;
}

// rates are units of that currency per 1 SITE_CURRENCY.
export function convertAmount(
  amount: number,
  fromCode: string,
  toCode: string,
  rates: Record<string, number>,
): number {
  const from = resolveCurrency(fromCode);
  const to = resolveCurrency(toCode);
  if (from === to) return Math.round(amount);
  const fromRate = from === SITE_CURRENCY ? 1 : rates[from];
  const toRate = to === SITE_CURRENCY ? 1 : rates[to];
  if (!fromRate || !toRate) return Math.round(amount);
  return Math.round((amount / fromRate) * toRate);
}

export function formatPrice(
  amount: number,
  fromCode?: string,
  toCode: string = SITE_CURRENCY,
  rates: Record<string, number> = FALLBACK_RATES,
): string {
  const to = resolveCurrency(toCode);
  const value = convertAmount(amount, resolveCurrency(fromCode), to, rates);
  return `${currencySymbol(to)}${value.toLocaleString('en-GB')}`;
}

export function displayCopy(
  text: string,
  toCode: string = SITE_CURRENCY,
  rates: Record<string, number> = FALLBACK_RATES,
): string {
  return text
    .replace(/&pound;(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'GBP', toCode, rates))
    .replace(/£(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'GBP', toCode, rates))
    .replace(/&euro;(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'EUR', toCode, rates))
    .replace(/€(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'EUR', toCode, rates));
}
