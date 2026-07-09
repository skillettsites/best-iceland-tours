'use client';

import { ReactNode } from 'react';
import { useCurrency } from '@/components/CurrencyProvider';

interface TrackedGYGLinkProps {
  href: string;
  tourName: string;
  section: string;
  variant?: string;
  destination?: string;
  className?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

function deriveActivityId(href: string): string | undefined {
  const m = href.match(/-t(\d+)(?:\/|\?|$)/);
  return m ? `t${m[1]}` : undefined;
}

function deriveUrlType(href: string): 'direct' | 'search' | 'other' {
  if (/getyourguide\.com\/s\/\?/.test(href)) return 'search';
  if (/getyourguide\.com\/.+-t\d+/.test(href)) return 'direct';
  return 'other';
}

export default function TrackedGYGLink({
  href,
  tourName,
  section,
  variant,
  destination,
  className,
  children,
  onClick,
}: TrackedGYGLinkProps) {
  const { code } = useCurrency();
  const sep = href.includes('?') ? '&' : '?';
  const finalHref = code && code !== 'GBP' ? `${href}${sep}currency=${code}` : href;
  const handleClick = (e: React.MouseEvent) => {
    const payload = JSON.stringify({
      type: 'gyg',
      city: tourName,
      section,
      variant,
      destination,
      activity_id: deriveActivityId(href),
      url_type: deriveUrlType(href),
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
    try {
      navigator.sendBeacon('/api/track-click', payload);
    } catch {
      fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
