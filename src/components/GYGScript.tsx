'use client';

import Script from 'next/script';
import { GYG_PARTNER_ID } from '@/lib/constants';

export default function GYGScript() {
  return (
    <Script
      src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
      data-gyg-partner-id={GYG_PARTNER_ID}
      strategy="afterInteractive"
    />
  );
}
