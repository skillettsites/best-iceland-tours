'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import TrackedGYGLink from '@/components/TrackedGYGLink';

interface CardTour {
  slug: string;
  shortTitle: string;
  excerpt: string;
  price: number;
  currency?: string;
  duration: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageAlt: string;
  affiliateUrl: string;
  destination?: string;
}

function formatReviewCount(count: number): string {
  if (count >= 1000) {
    const rounded = Math.floor(count / 100) * 100;
    return `${(rounded / 1000).toFixed(rounded % 1000 === 0 ? 0 : 1)}k`;
  }
  return count.toLocaleString();
}

function getCurrencySymbol(currency?: string): string {
  if (!currency || currency === 'GBP') return '£';
  const symbols: Record<string, string> = {
    USD: '$', EUR: '€', AUD: 'A$', JPY: '¥',
    THB: '฿', AED: 'AED ', IDR: 'Rp', MAD: 'MAD ',
    CZK: 'CZK ', TRY: 'TRY ',
  };
  return symbols[currency] || `${currency} `;
}

export default function TourCard({
  tour,
  priority = false,
  variant = 'default',
  section = 'tour-card-book',
  trackingVariant,
}: {
  tour: CardTour;
  priority?: boolean;
  variant?: 'default' | 'wide' | 'compact';
  section?: string;
  trackingVariant?: string;
}) {
  const prefersReduced = useReducedMotion();
  const currency = getCurrencySymbol(tour.currency);

  if (variant === 'wide') {
    return (
      <article className="group relative bg-surface rounded-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 grid sm:grid-cols-[280px_1fr] gap-0">
        <TrackedGYGLink href={tour.affiliateUrl} tourName={tour.shortTitle} section="tour-card-image" variant={trackingVariant} destination={tour.destination} className="block relative aspect-[16/9] sm:aspect-auto sm:h-full overflow-hidden ds-card-shimmer">
          <Image
            src={tour.imageUrl}
            alt={tour.imageAlt}
            fill
            priority={priority}
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 280px"
          />
          <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[11px] font-semibold text-white">
            Free cancellation
          </div>
        </TrackedGYGLink>
        <div className="flex flex-col p-5 sm:p-6">
          <Link href={`/tours/${tour.slug}`} className="block">
            <h3 className="text-lg sm:text-xl font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
              {tour.shortTitle}
            </h3>
            <p className="mt-2 text-sm text-on-surface-2 line-clamp-2">{tour.excerpt}</p>
          </Link>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="font-semibold text-on-surface">{tour.rating.toFixed(1)}</span>
            <span className="text-highlight">&#9733;</span>
            <span className="text-on-surface-2">({formatReviewCount(tour.reviewCount)})</span>
            <span className="text-on-surface-2 ml-1">&middot; {tour.duration}</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-on-surface">
              <span className="text-xs text-on-surface-2 mr-1">From</span>
              <span className="font-display text-2xl">{currency}{tour.price}</span>
            </div>
            <TrackedGYGLink
              href={tour.affiliateUrl}
              tourName={tour.shortTitle}
              section={section}
              variant={trackingVariant}
              destination={tour.destination}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-sm px-5 py-2.5 shadow-md shadow-accent/20 transition-all active:scale-[0.98]"
            >
              Book Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </TrackedGYGLink>
          </div>
        </div>
      </article>
    );
  }

  const cardMotion = prefersReduced ? {} : { whileHover: { y: -4 }, transition: { duration: 0.18 } };

  return (
    <m.article
      {...cardMotion}
      className="group relative bg-surface rounded-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
    >
      <TrackedGYGLink href={tour.affiliateUrl} tourName={tour.shortTitle} section="tour-card-image" variant={trackingVariant} destination={tour.destination} className="block">
        <div className="relative aspect-[4/3] overflow-hidden ds-card-shimmer">
          <Image
            src={tour.imageUrl}
            alt={tour.imageAlt}
            fill
            priority={priority}
            className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-success/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Free cancellation
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-white text-xs font-medium">
            {tour.duration}
          </div>
        </div>
      </TrackedGYGLink>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/tours/${tour.slug}`} className="block">
          <h3 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
            {tour.shortTitle}
          </h3>
          <p className="mt-1.5 text-[13px] text-on-surface-2 line-clamp-2">{tour.excerpt}</p>
        </Link>
        <div className="mt-3 flex items-center gap-1.5 text-[13px]">
          <span className="text-highlight">&#9733;</span>
          <span className="font-semibold text-on-surface">{tour.rating.toFixed(1)}</span>
          <span className="text-on-surface-2">({formatReviewCount(tour.reviewCount)})</span>
        </div>
        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <span className="block text-[11px] text-on-surface-2 uppercase tracking-wider">From</span>
            <span className="font-display text-3xl text-on-surface leading-none">{currency}{tour.price}</span>
          </div>
          <TrackedGYGLink
            href={tour.affiliateUrl}
            tourName={tour.shortTitle}
            section={section}
            variant={trackingVariant}
            destination={tour.destination}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-sm px-4 py-2.5 shadow-md shadow-accent/20 transition-all active:scale-[0.98]"
          >
            Book
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </TrackedGYGLink>
        </div>
      </div>
    </m.article>
  );
}
