'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const manage = () => {
    // For now, managing cookies means rejecting non-essential ones
    localStorage.setItem('cookie-consent', 'essential-only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-4 sm:py-5">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed">
            We use cookies for analytics (Google Analytics, Vercel Analytics) and affiliate tracking (GetYourGuide) to improve your experience and support the site.
            By clicking &quot;Accept&quot;, you consent to all cookies. See our{' '}
            <Link href="/privacy" className="underline text-blue-700 hover:text-blue-900">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={manage}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
