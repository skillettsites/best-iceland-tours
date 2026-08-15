'use client';

import { useEffect } from 'react';

function deriveActivityId(href: string): string | undefined {
  const m = href.match(/-t(\d+)(?:\/|\?|$)/);
  return m ? `t${m[1]}` : undefined;
}

function deriveUrlType(href: string): 'direct' | 'search' | 'other' {
  if (/getyourguide\.com\/s\/\?/.test(href)) return 'search';
  if (/getyourguide\.com\/.+-t\d+/.test(href)) return 'direct';
  return 'other';
}

function postTrackClick(payload: string) {
  const postWithFetch = () => {
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  };
  try {
    const queued = navigator.sendBeacon(
      '/api/track-click',
      new Blob([payload], { type: 'application/json' }),
    );
    if (!queued) postWithFetch();
  } catch {
    postWithFetch();
  }
}

// Global delegated click listener: fires a GA4 `affiliate_click` event for any
// click on a GetYourGuide outbound link, regardless of which component rendered
// it (TrackedGYGLink, raw <a>, comparison tables, etc.). Also writes Command
// Center via /api/track-click for raw GYG <a> tags. TrackedGYGLink remains the
// writer for wrapped links (data-gyg-tracked="1") so we do not double-count.
export default function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="getyourguide.com"]') as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;
      const href = anchor.href;
      const activityId = deriveActivityId(href);
      const urlType = deriveUrlType(href);
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'affiliate_click', {
          affiliate: 'getyourguide',
          activity_id: activityId,
          url_type: urlType,
          link_text: (anchor.textContent || '').trim().slice(0, 80),
          page_path: window.location.pathname,
        });
      }

      // TrackedGYGLink already writes affiliate_clicks; skip to avoid doubles.
      if (anchor.getAttribute('data-gyg-tracked') === '1') return;

      const city =
        anchor.getAttribute('data-gyg-city') ||
        (anchor.textContent || '').trim().slice(0, 80) ||
        'GetYourGuide';

      postTrackClick(
        JSON.stringify({
          type: 'gyg',
          city,
          section: anchor.getAttribute('data-gyg-section') || 'link',
          activity_id: activityId,
          url_type: urlType,
          page_path: window.location.pathname,
        }),
      );
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
