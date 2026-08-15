'use client';

import { useEffect, useRef } from 'react';
import { useCurrency } from '@/components/CurrencyProvider';
import { GYG_PARTNER_ID } from '@/lib/constants';

function scanGygWidgets(root: HTMLElement | null) {
  if (!root || typeof window === 'undefined') return;
  const w = window as unknown as { GYG?: { Widget?: (el: Element) => void } };
  try {
    if (typeof w.GYG?.Widget === 'function') {
      root.querySelectorAll('[data-gyg-widget]').forEach((node) => {
        try {
          w.GYG!.Widget!(node);
        } catch {}
      });
    }
  } catch {}
}

export default function WhaleWatchingWidget() {
  const { code, ready } = useCurrency();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    scanGygWidgets(mountRef.current);
  }, [ready, code]);

  return (
    <div ref={mountRef}>
      {ready && (
        <div
          key={code}
          data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
          data-gyg-location-id="5049"
          data-gyg-locale-code="en-US"
          data-gyg-currency={code}
          data-gyg-widget="activities"
          data-gyg-partner-id={GYG_PARTNER_ID}
          data-gyg-q="whale watching"
        />
      )}
    </div>
  );
}
