'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Info = { symbol: string; rate: number }; // rate = units per 1 GBP
const CURRENCIES: Record<string, { symbol: string; fallback: number }> = {
  GBP: { symbol: '£', fallback: 1 },
  USD: { symbol: '$', fallback: 1.27 },
  EUR: { symbol: '€', fallback: 1.18 },
  CAD: { symbol: 'C$', fallback: 1.73 },
  AUD: { symbol: 'A$', fallback: 1.93 },
  NZD: { symbol: 'NZ$', fallback: 2.08 },
  CHF: { symbol: 'CHF ', fallback: 1.12 },
  SEK: { symbol: 'kr ', fallback: 13.5 },
  NOK: { symbol: 'kr ', fallback: 13.8 },
  DKK: { symbol: 'kr ', fallback: 8.8 },
  JPY: { symbol: '¥', fallback: 195 },
  MXN: { symbol: 'MX$', fallback: 23 },
  BRL: { symbol: 'R$', fallback: 6.9 },
  AED: { symbol: 'AED ', fallback: 4.66 },
  SGD: { symbol: 'S$', fallback: 1.71 },
  HKD: { symbol: 'HK$', fallback: 9.9 },
  INR: { symbol: '₹', fallback: 106 },
  ISK: { symbol: 'kr ', fallback: 175 },
  PLN: { symbol: 'zł ', fallback: 5.1 },
};
// EUR-zone + a few majors mapped from country code
const COUNTRY_TO_CUR: Record<string, string> = {
  US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'NZD', GB: 'GBP', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK',
  JP: 'JPY', MX: 'MXN', BR: 'BRL', AE: 'AED', SG: 'SGD', HK: 'HKD', IN: 'INR', IS: 'ISK', PL: 'PLN',
  IE: 'EUR', FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR',
  FI: 'EUR', GR: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', CY: 'EUR', MT: 'EUR', HR: 'EUR',
};

type Ctx = { code: string; info: Info; setCurrency: (c: string) => void; ready: boolean; options: string[] };
const CurrencyCtx = createContext<Ctx>({ code: 'GBP', info: { symbol: '£', rate: 1 }, setCurrency: () => {}, ready: false, options: Object.keys(CURRENCIES) });

const readCookie = (name: string) => (typeof document !== 'undefined' ? (document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)')) || [])[1] : undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState('GBP');
  const [rate, setRate] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1) decide currency: manual choice > geo cookie (Vercel) > GBP
    const manual = (() => { try { return localStorage.getItem('cur'); } catch { return null; } })();
    const country = (readCookie('country') || '').toUpperCase();
    const chosen = manual && CURRENCIES[manual] ? manual : (COUNTRY_TO_CUR[country] || 'GBP');
    setCode(chosen);
    // 2) load FX rates (cached 12h), else fallbacks
    (async () => {
      let rates: Record<string, number> | null = null;
      try {
        const cached = JSON.parse(localStorage.getItem('fx') || 'null');
        if (cached && Date.now() - cached.t < 43200000) rates = cached.r;
      } catch {}
      if (!rates) {
        try {
          const r = await fetch('https://api.frankfurter.app/latest?base=GBP');
          if (r.ok) { rates = (await r.json()).rates; localStorage.setItem('fx', JSON.stringify({ t: Date.now(), r: rates })); }
        } catch {}
      }
      setRate(rates && rates[chosen] ? rates[chosen] : CURRENCIES[chosen].fallback);
      setReady(true);
    })();
  }, []);

  const setCurrency = (c: string) => {
    if (!CURRENCIES[c]) return;
    try { localStorage.setItem('cur', c); } catch {}
    setCode(c);
    try {
      const cached = JSON.parse(localStorage.getItem('fx') || 'null');
      const r = cached?.r?.[c];
      setRate(r || CURRENCIES[c].fallback);
    } catch { setRate(CURRENCIES[c].fallback); }
  };

  return (
    <CurrencyCtx.Provider value={{ code, info: { symbol: CURRENCIES[code]?.symbol || '£', rate }, setCurrency, ready, options: Object.keys(CURRENCIES) }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyCtx);

// Convert a GBP amount to the active currency's whole-number amount.
export function convertGBP(gbp: number, code: string, rate: number): number {
  if (code === 'GBP') return Math.round(gbp);
  const v = gbp * rate;
  return v >= 100 ? Math.round(v) : Math.round(v); // whole units (tours are low-precision)
}
