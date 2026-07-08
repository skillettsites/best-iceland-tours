import { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/data/guides';
import { categories } from '@/data/categories';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Iceland Travel Guides 2026 | Tips, Itineraries & Insider Advice',
  description: 'Expert Iceland travel guides covering first-time tips, one-day itineraries, free things to do, food tours, seasonal advice, and day trip ideas.',
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: 'Iceland Travel Guides 2026',
    description: 'Expert Iceland travel guides covering first-time tips, one-day itineraries, free things to do, and more.',
    url: `${SITE_URL}/guides`,
  },
};

export default function GuidesPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Travel Guides', url: `${SITE_URL}/guides` },
      ])) }}
    />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Travel Guides' }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Iceland Travel Guides</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">
          Expert tips, itineraries, and insider advice to help you plan the perfect Iceland trip.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
              <span className="text-5xl opacity-50">📖</span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 mb-2">
                {guide.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">{guide.excerpt}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-900">
                Read guide
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Browse Tours by Category */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Tours by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:border-green-300 hover:shadow-sm transition-all duration-300"
            >
              {cat.icon} {cat.title}
            </Link>
          ))}
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-green-700 hover:border-green-300 hover:shadow-sm transition-all duration-300"
          >
            All Iceland Tours
          </Link>
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
