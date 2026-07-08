'use client';

import Link from 'next/link';
import { m, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StickyBookingBarProps {
  label: string;
  sublabel?: string;
  href: string;
  price?: string;
  ctaLabel?: string;
  external?: boolean;
}

export default function StickyBookingBar({
  label,
  sublabel,
  href,
  price,
  ctaLabel = 'Book Now',
  external = false,
}: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    return scrollY.on('change', (y) => {
      const triggerAt = Math.max(window.innerHeight * 0.4, 400);
      setVisible(y > triggerAt);
    });
  }, [scrollY]);

  const motionProps = prefersReduced
    ? { animate: { y: visible ? 0 : 120 }, transition: { duration: 0 } }
    : { animate: { y: visible ? 0 : 120 }, transition: { type: 'spring' as const, stiffness: 320, damping: 30 } };

  const ctaProps = external
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer sponsored' }
    : { href };

  return (
    <m.div
      initial={{ y: 120 }}
      {...motionProps}
      className="fixed bottom-0 inset-x-0 z-50 sm:hidden bg-white/95 backdrop-blur border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.10)] px-4 py-3"
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface truncate">{label}</p>
          {sublabel && <p className="text-xs text-on-surface-2 truncate">{sublabel}</p>}
        </div>
        {price && (
          <span className="font-display text-xl text-on-surface leading-none shrink-0">{price}</span>
        )}
        <Link
          {...ctaProps}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-sm px-5 py-2.5 shadow-md shadow-accent/25 transition-all active:scale-[0.98]"
        >
          {ctaLabel}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </m.div>
  );
}
