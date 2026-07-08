import { ReactNode } from 'react';

interface TrustItem {
  icon: ReactNode;
  label: string;
}

const CheckIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const defaultTrustItems: TrustItem[] = [
  { icon: CheckIcon, label: 'Free cancellation' },
  { icon: CheckIcon, label: 'Instant confirmation' },
  { icon: CheckIcon, label: 'Best price guarantee' },
  { icon: CheckIcon, label: 'Mobile tickets' },
];

export default function TrustBar({
  items = defaultTrustItems,
  variant = 'light',
}: {
  items?: TrustItem[];
  variant?: 'light' | 'dark';
}) {
  const tone = variant === 'dark' ? 'text-white/85' : 'text-on-surface-2';
  const iconTone = variant === 'dark' ? 'text-highlight' : 'text-success';
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm ${tone}`}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span className={iconTone}>{item.icon}</span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
