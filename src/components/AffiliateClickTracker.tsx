'use client';

import { useEffect } from 'react';

// Global delegated click listener: fires a GA4 `affiliate_click` event for any
// click on a GetYourGuide outbound link, regardless of which component rendered
// it (TrackedGYGLink, raw <a>, comparison tables, etc.). Single source of truth
// so outbound affiliate clicks are measurable in GA4 without per-CTA wiring.
export default function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="getyourguide.com"]') as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;
      if (anchor.hasAttribute('data-gyg-tracked')) return; // fired by TrackedGYGLink
      const href = anchor.href;
      const idMatch = href.match(/-t(\d+)(?:\/|\?|$)/);
      const urlType = /getyourguide\.com\/s\/\?/.test(href)
        ? 'search'
        : /getyourguide\.com\/.+-t\d+/.test(href)
          ? 'direct'
          : 'other';
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'affiliate_click', {
          affiliate: 'getyourguide',
          activity_id: idMatch ? `t${idMatch[1]}` : undefined,
          url_type: urlType,
          link_text: (anchor.textContent || '').trim().slice(0, 80),
          page_path: window.location.pathname,
        });
      }
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
