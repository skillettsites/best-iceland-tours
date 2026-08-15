'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SITE_CURRENCY } from '@/lib/constants';
import { COUNTRY_TO_CUR, CURRENCIES, FALLBACK_RATES, currencySymbol } from '@/lib/currency';

type Info = { symbol: string; rate: number };

type Ctx = {
  code: string;
  info: Info;
  setCurrency: (c: string) => void;
  ready: boolean;
  options: string[];
  rates: Record<string, number>;
};
const CurrencyCtx = createContext<Ctx>({
  code: SITE_CURRENCY,
  info: { symbol: currencySymbol(SITE_CURRENCY), rate: 1 },
  setCurrency: () => {},
  ready: false,
  options: Object.keys(CURRENCIES),
  rates: FALLBACK_RATES,
});

const readCookie = (name: string) => (typeof document !== 'undefined' ? (document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)')) || [])[1] : undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState(SITE_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const manual = (() => { try { return localStorage.getItem('cur'); } catch { return null; } })();
    const country = (readCookie('country') || '').toUpperCase();
    const chosen = manual && CURRENCIES[manual] ? manual : (COUNTRY_TO_CUR[country] || SITE_CURRENCY);
    setCode(chosen);
    // Currency is chosen before FX loads so widgets can mount in the visitor currency
    // instead of first-init as SITE_CURRENCY (EUR).
    setReady(true);
    (async () => {
      let fetched: Record<string, number> | null = null;
      try {
        const cached = JSON.parse(localStorage.getItem('fx') || 'null');
        if (cached && cached.base === SITE_CURRENCY && Date.now() - cached.t < 43200000) fetched = cached.r;
      } catch {}
      if (!fetched) {
        try {
          const r = await fetch(`https://api.frankfurter.dev/v1/latest?base=${SITE_CURRENCY}`);
          if (r.ok) {
            const data = await r.json();
            fetched = { ...(data.rates || {}), [SITE_CURRENCY]: 1 };
            localStorage.setItem('fx', JSON.stringify({ t: Date.now(), base: SITE_CURRENCY, r: fetched }));
          }
        } catch {}
      }
      if (fetched) setRates({ ...FALLBACK_RATES, ...fetched, [SITE_CURRENCY]: 1 });
      else setRates({ ...FALLBACK_RATES, [SITE_CURRENCY]: 1 });
    })();
  }, []);

  const setCurrency = (c: string) => {
    if (!CURRENCIES[c]) return;
    try { localStorage.setItem('cur', c); } catch {}
    setCode(c);
  };

  const rate = code === SITE_CURRENCY ? 1 : (rates[code] || CURRENCIES[code].fallback);

  return (
    <CurrencyCtx.Provider value={{ code, info: { symbol: CURRENCIES[code]?.symbol || currencySymbol(SITE_CURRENCY), rate }, setCurrency, ready, options: Object.keys(CURRENCIES), rates }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyCtx);
