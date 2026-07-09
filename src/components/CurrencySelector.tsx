'use client';

import { useCurrency } from '@/components/CurrencyProvider';

export default function CurrencySelector({ className = '' }: { className?: string }) {
  const { code, setCurrency, options } = useCurrency();
  return (
    <label className={`inline-flex items-center ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={code}
        onChange={(e) => setCurrency(e.target.value)}
        aria-label="Change currency"
        className="appearance-none bg-transparent border border-gray-300 rounded-md text-xs font-semibold text-gray-700 px-2 py-1 pr-5 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23666\' stroke-width=\'3\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
      >
        {options.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
