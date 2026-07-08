'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CITY } from '@/lib/constants';
import { trustStats } from '@/lib/trust';

// Global sticky booking CTA. Hidden on pages that ship their own sticky bar
// (homepage, tour detail, guide detail) to avoid double bars.
export default function SiteStickyCTA() {
  const pathname = usePathname();
  const hide =
    pathname === '/' ||
    /^\/tours\/.+/.test(pathname) ||
    /^\/guides\/.+/.test(pathname);
  if (hide) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3">
      <div className="mx-auto max-w-3xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-on-surface truncate">
            {trustStats.totalTours}+ top-rated {SITE_CITY} tours
          </p>
          <p className="text-xs text-on-surface-2">
            From &pound;{trustStats.minPrice} &middot; Free cancellation on most
          </p>
        </div>
        <Link
          href="/tours"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-sm px-5 py-2.5 shadow-lg shadow-accent/25 transition-all active:scale-[0.98]"
        >
          Browse tours
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
