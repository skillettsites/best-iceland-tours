import Link from 'next/link';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  align?: 'left' | 'center';
  children?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
  children,
}: SectionHeaderProps) {
  const wrap = align === 'center' ? 'text-center mx-auto max-w-2xl' : '';
  return (
    <div className={`mb-8 sm:mb-10 ${align === 'center' ? '' : 'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3'}`}>
      <div className={wrap}>
        {eyebrow && (
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[15px] text-on-surface-2 leading-relaxed">{subtitle}</p>
        )}
        {children}
      </div>
      {action && align !== 'center' && (
        <Link
          href={action.href}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-ink transition-colors"
        >
          {action.label}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      )}
    </div>
  );
}
