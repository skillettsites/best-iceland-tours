'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/lib/types';
import StarRating from './StarRating';
import TrackedGYGLink from '@/components/TrackedGYGLink';

function formatReviewCount(count: number): string {
  if (count >= 1000) {
    const rounded = Math.floor(count / 100) * 100;
    return `${(rounded / 1000).toFixed(rounded % 1000 === 0 ? 0 : 1)}k+`;
  }
  return count.toLocaleString();
}

function getPopularityBadge(reviewCount: number): string | null {
  if (reviewCount >= 20000) return 'Selling Fast';
  if (reviewCount >= 10000) return 'Popular Choice';
  if (reviewCount >= 5000) return 'Highly Rated';
  return null;
}

export default function TourCard({ tour }: { tour: Tour }) {
  const badge = getPopularityBadge(tour.reviewCount);

  return (
    <article className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl active:shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
      {/* Entire card links to tour detail page */}
      <Link href={`/tours/${tour.slug}`} className="block">
        {/* Tour image - shorter aspect ratio for mobile */}
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={tour.imageUrl}
            alt={tour.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Urgency badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            </div>
          )}

          {/* Free cancellation badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Free cancellation
            </span>
          </div>

          {/* Duration overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-white text-sm font-medium">{tour.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 mb-2">
            {tour.shortTitle}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tour.excerpt}</p>

          {/* Rating - bigger and more prominent */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-amber-600">{tour.rating}</span>
              <StarRating rating={tour.rating} />
            </div>
            <span className="text-sm font-medium text-gray-600">({formatReviewCount(tour.reviewCount)} reviews)</span>
          </div>

          {/* Price - large and prominent */}
          <div className="mb-4 bg-gray-50 rounded-lg p-3 text-center sm:text-left">
            <span className="text-sm text-gray-500 block sm:inline">From</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 sm:ml-1">&pound;{tour.price}</span>
            <span className="text-sm text-gray-500 block sm:inline sm:ml-1">per person</span>
          </div>
        </div>
      </Link>

      {/* Book Now CTA - affiliate link, separate from card link */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <TrackedGYGLink
          href={tour.affiliateUrl}
          tourName={tour.shortTitle}
          section="tour-card-book"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-green-600/25 hover:from-green-500 hover:to-green-400 hover:shadow-xl hover:shadow-green-500/30 active:from-green-700 active:to-green-600 transition-all duration-200 active:scale-[0.98]"
        >
          Reserve Your Spot
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </TrackedGYGLink>
      </div>
    </article>
  );
}
