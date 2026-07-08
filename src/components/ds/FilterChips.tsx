'use client';

import { m, LayoutGroup } from 'framer-motion';

interface FilterChipsProps {
  options: { value: string; label: string; count?: number }[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export default function FilterChips({
  options,
  active,
  onChange,
  ariaLabel = 'Filter',
}: FilterChipsProps) {
  return (
    <LayoutGroup>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap items-center gap-2 sm:gap-2.5"
      >
        {options.map((opt) => {
          const isActive = opt.value === active;
          return (
            <button
              key={opt.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(opt.value)}
              className={`relative inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-on-accent'
                  : 'border border-border bg-surface text-on-surface hover:border-primary hover:text-primary'
              }`}
            >
              {isActive && (
                <m.span
                  layoutId="filter-chip-pill"
                  className="absolute inset-0 rounded-pill bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{opt.label}</span>
              {opt.count !== undefined && (
                <span className={`relative text-[11px] ${isActive ? 'text-on-accent/80' : 'text-on-surface-2'}`}>
                  {opt.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
