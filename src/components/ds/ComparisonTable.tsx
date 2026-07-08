import TrackedGYGLink from '@/components/TrackedGYGLink';

interface ComparisonTour {
  slug: string;
  shortTitle: string;
  price: number;
  currency?: string;
  duration: string;
  rating: number;
  reviewCount: number;
  bestFor: string[];
  affiliateUrl: string;
  destination?: string;
}

type Row = 'price' | 'duration' | 'rating' | 'reviews' | 'cancellation' | 'bestFor';

const labels: Record<Row, string> = {
  price: 'Price',
  duration: 'Duration',
  rating: 'Rating',
  reviews: 'Reviews',
  cancellation: 'Free cancellation',
  bestFor: 'Best for',
};

function getSymbol(currency?: string): string {
  if (!currency || currency === 'GBP') return '£';
  const map: Record<string, string> = { USD: '$', EUR: '€', AUD: 'A$' };
  return map[currency] || `${currency} `;
}

export default function ComparisonTable({
  tours,
  rows = ['price', 'duration', 'rating', 'reviews', 'cancellation', 'bestFor'],
  trackingVariant = 'comparison-table',
}: {
  tours: ComparisonTour[];
  rows?: Row[];
  trackingVariant?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-card-lg border border-border bg-surface -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="bg-primary-soft">
            <th className="text-left px-5 py-4 font-semibold text-primary text-xs uppercase tracking-wider">Feature</th>
            {tours.map((tour) => (
              <th key={tour.slug} className="px-5 py-4 font-semibold text-primary text-center">
                {tour.shortTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row}>
              <td className="px-5 py-3.5 font-medium text-on-surface-2">{labels[row]}</td>
              {tours.map((tour) => (
                <td key={tour.slug} className="px-5 py-3.5 text-center text-on-surface">
                  {row === 'price' && (
                    <span className="font-display text-lg">{getSymbol(tour.currency)}{tour.price}</span>
                  )}
                  {row === 'duration' && tour.duration}
                  {row === 'rating' && (
                    <span>
                      <span className="text-highlight">&#9733;</span> <strong>{tour.rating.toFixed(1)}</strong>
                    </span>
                  )}
                  {row === 'reviews' && tour.reviewCount.toLocaleString()}
                  {row === 'cancellation' && (
                    <svg className="h-4 w-4 text-success mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                  {row === 'bestFor' && (
                    <span className="text-on-surface-2 text-[13px]">{tour.bestFor.slice(0, 2).join(', ')}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td />
            {tours.map((tour) => (
              <td key={tour.slug} className="px-5 py-4 text-center">
                <TrackedGYGLink
                  href={tour.affiliateUrl}
                  tourName={tour.shortTitle}
                  section="comparison-table"
                  variant={trackingVariant}
                  destination={tour.destination}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-sm px-5 py-2.5 shadow-md shadow-accent/20 transition-all active:scale-[0.98]"
                >
                  Book Now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </TrackedGYGLink>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
