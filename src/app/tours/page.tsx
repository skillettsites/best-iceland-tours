import { Metadata } from 'next';
import Link from 'next/link';
import { tours } from '@/data/tours';
import { categories } from '@/data/categories';
import { guides } from '@/data/guides';
import { itemListSchema, breadcrumbSchema } from '@/lib/schema';
import TourCard from '@/components/ui/TourCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All Iceland Tours & Attractions 2026 | Book Online',
  description: 'Browse and book the best tours and attractions: skip-the-line tickets, guided tours, and day trips. Best prices, instant confirmation, and free cancellation on most bookings.',
  alternates: { canonical: `${SITE_URL}/tours` },
  openGraph: {
    title: 'All Iceland Tours & Attractions 2026',
    description: 'Browse and book the best Iceland tours and attractions. Best prices, instant confirmation.',
    url: `${SITE_URL}/tours`,
  },
};

export default function ToursPage() {
  const schemas = [
    itemListSchema(tours),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'All Tours', url: `${SITE_URL}/tours` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Tours' }]} />

        <AffiliateDisclosure />

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">All Iceland Tours & Attractions</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl">
            Discover {tours.length} hand-picked tours and attractions in Iceland. Book online for the best prices and skip-the-line entry.
          </p>
          <p className="mt-3 text-gray-600 max-w-3xl">
            From iconic landmarks to unforgettable day trips, we have selected the highest-rated experiences with verified reviews and instant confirmation. Prices start from just &pound;17 per person, with free cancellation on most bookings.
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Showing all {tours.length} tours, sorted by popularity. All prices are per person and include instant booking confirmation.
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-300 hover:bg-green-50 transition-all"
            >
              {cat.icon} {cat.title}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...tours].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        {/* Travel guides links */}
        <section className="mt-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Iceland Travel Guides</h2>
          <p className="text-gray-600 mb-4">Not sure where to start? Our guides help you plan the perfect Iceland trip.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guides.slice(0, 6).map(guide => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-green-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-medium text-gray-900 text-sm">{guide.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{guide.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/guides" className="text-sm font-semibold text-green-700 hover:underline">View all guides &rarr;</Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            </div>
        </section>
      </div>
    </>
  );
}
