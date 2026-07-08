'use client';

import { GYG_PARTNER_ID } from '@/lib/constants';
import TrackedGYGLink from '@/components/TrackedGYGLink';

export default function AvailabilityWidget({
  tourId,
  affiliateUrl,
}: {
  tourId: string;
  affiliateUrl?: string;
}) {
  return (
    <div className="my-10">
      <div className="rounded-2xl border-2 border-green-100 bg-gradient-to-b from-green-50 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Check Availability & Prices</h3>
            <p className="text-sm text-gray-500">Select your date to see live pricing</p>
          </div>
        </div>

        <div
          data-gyg-href="https://widget.getyourguide.com/default/availability.frame"
          data-gyg-tour-id={tourId}
          data-gyg-locale-code="en-US"
          data-gyg-currency="GBP"
          data-gyg-widget="availability"
          data-gyg-variant="horizontal"
          data-gyg-partner-id={GYG_PARTNER_ID}
        >
          <span>
            Powered by{' '}
            <a target="_blank" rel="sponsored" href="https://www.getyourguide.com/iceland-l57/">
              GetYourGuide
            </a>
          </span>
        </div>

        {/* Fallback CTA if widget doesn't load */}
        {affiliateUrl && (
          <noscript>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-4 block w-full rounded-xl bg-green-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-green-700 transition-all duration-300"
            >
              View on GetYourGuide
            </a>
          </noscript>
        )}

        {affiliateUrl && (
          <div className="mt-4 pt-4 border-t border-green-100">
            <TrackedGYGLink
              href={affiliateUrl}
              tourName={tourId}
              section="availability-widget"
              className="flex items-center justify-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
            >
              <span>Or view full details on GetYourGuide</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </TrackedGYGLink>
          </div>
        )}
      </div>
    </div>
  );
}
