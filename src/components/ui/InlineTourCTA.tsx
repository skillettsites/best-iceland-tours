'use client';

import Link from 'next/link';
import { Tour } from '@/lib/types';
import TrackedGYGLink from '@/components/TrackedGYGLink';

function formatReviewCount(count: number): string {
  if (count >= 1000) {
    const rounded = Math.floor(count / 100) * 100;
    return `${(rounded / 1000).toFixed(rounded % 1000 === 0 ? 0 : 1)}k+`;
  }
  return count.toLocaleString();
}

export default function InlineTourCTA({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-full bg-green-600 p-1.5">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
          </svg>
        </span>
        <h3 className="text-base font-bold text-gray-900">
          {tours.length === 1 ? 'Ready to Book? Top Pick for This Experience' : 'Ready to Book? Top Picks for This Experience'}
        </h3>
      </div>
      <div className="space-y-4">
        {tours.map((tour) => (
          <div key={tour.slug} className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <div className="flex-1 min-w-0">
              <Link href={`/tours/${tour.slug}`} className="text-sm font-bold text-gray-900 hover:text-blue-900 transition-colors">
                {tour.shortTitle}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {tour.rating} ({formatReviewCount(tour.reviewCount)})
                </span>
                <span>{tour.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:flex-shrink-0">
              <div className="text-right">
                <span className="text-xs text-gray-500">From</span>
                <span className="ml-1 text-lg font-extrabold text-gray-900">&pound;{tour.price}</span>
              </div>
              <TrackedGYGLink
                href={tour.affiliateUrl}
                tourName={tour.shortTitle}
                section="guide-inline-cta"
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-green-500 active:bg-green-700 transition-colors whitespace-nowrap"
              >
                Reserve Your Spot
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </TrackedGYGLink>
              <span className="text-[10px] text-green-700 font-medium text-center whitespace-nowrap">Free cancellation</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
