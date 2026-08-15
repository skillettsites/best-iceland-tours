'use client';

import Image from 'next/image';
import LocalPrice from '@/components/LocalPrice';
import TrackedGYGLink from '@/components/TrackedGYGLink';
import { TOP_THREE } from './products';

function formatReviews(count: number): string {
  return count.toLocaleString('en-GB');
}

export default function TopThreeCards() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {TOP_THREE.map((ticket) => (
        <article
          key={ticket.gygTourId}
          className={`overflow-hidden rounded-xl border-2 bg-white ${
            ticket.rank === 1 ? 'border-green-500 shadow-sm' : 'border-gray-200'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr]">
            <TrackedGYGLink
              href={ticket.href}
              tourName={ticket.shortName}
              section="helicopter-which-tour-image"
              destination={ticket.bestFor}
              className="relative block aspect-[16/10] sm:aspect-auto sm:min-h-[220px]"
            >
              <Image
                src={ticket.imageUrl}
                alt={ticket.imageAlt}
                fill
                priority={ticket.rank === 1}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 280px"
              />
              <span className="absolute left-3 top-3 rounded-full bg-green-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                #{ticket.rank}
              </span>
            </TrackedGYGLink>

            <div className="flex flex-col p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-green-700">{ticket.badge}</p>
              <h3 className="mt-1 text-lg font-bold text-gray-900">{ticket.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{ticket.why}</p>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">From</dt>
                  <dd className="font-semibold text-gray-900">
                    <LocalPrice amount={ticket.fromAmount} currency={ticket.fromCurrency} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Time</dt>
                  <dd className="font-semibold text-gray-900">{ticket.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Rating</dt>
                  <dd className="font-semibold text-gray-900">
                    {ticket.rating.toFixed(1)} ({formatReviews(ticket.reviewCount)} reviews)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Included</dt>
                  <dd className="font-semibold text-gray-900">{ticket.extras}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Landing</dt>
                  <dd className="font-semibold text-gray-900">{ticket.landing}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">Best for</dt>
                  <dd className="font-semibold text-gray-900">{ticket.bestFor}</dd>
                </div>
              </dl>

              <p className="mt-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Who it is for: </span>
                {ticket.who}
              </p>

              <TrackedGYGLink
                href={ticket.href}
                tourName={ticket.shortName}
                section="helicopter-which-tour-cta"
                destination={ticket.bestFor}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-green-500 sm:w-auto"
              >
                Book {ticket.shortName}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </TrackedGYGLink>
              <span className="mt-1 text-xs font-medium text-green-700">Free cancellation. Instant confirmation</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
