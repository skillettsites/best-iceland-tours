import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';
import { SITE_URL, SITE_CITY, SITE_NAME, GYG_CITY_URL, CONTENT_DATE } from '@/lib/constants';
import { breadcrumbSchema } from '@/lib/schema';
import TrackedGYGLink from '@/components/TrackedGYGLink';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';

// Ranked best-first (rating, then verified review volume). The post reads 1..10.
const top10 = [...tours]
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  .slice(0, 10);

const YEAR = new Date(CONTENT_DATE).getFullYear();
const URL = `${SITE_URL}/blog/top-10-tours`;
const TITLE = `The 10 Best ${SITE_CITY} Tours for ${YEAR}`;
const DESC = `The top 10 ${SITE_CITY} tours ranked by real rating and verified reviews. Skip-the-line tickets, guided tours and day trips, each bookable direct through GetYourGuide with free cancellation.`;

export const metadata: Metadata = {
  title: `${TITLE}: Ranked & Reviewed`,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    type: 'article',
    images: top10[0] ? [{ url: top10[0].imageUrl }] : undefined,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

function symbol(currency?: string): string {
  if (!currency || currency === 'GBP') return '£';
  const map: Record<string, string> = { USD: '$', EUR: '€', AUD: 'A$', ISK: 'ISK ', MXN: 'MX$' };
  return map[currency] || `${currency} `;
}

function reviews(n: number): string {
  return n >= 1000 ? `${(Math.floor(n / 100) / 10).toFixed(1)}k+` : n.toLocaleString();
}

export default function Top10Page() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: TITLE,
      description: DESC,
      datePublished: CONTENT_DATE,
      dateModified: CONTENT_DATE,
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: URL,
      image: top10[0]?.imageUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: TITLE,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: top10.length,
      itemListElement: top10.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.title,
        url: `${SITE_URL}/tours/${t.slug}`,
        image: t.imageUrl,
      })),
    },
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: `Top 10 ${SITE_CITY} Tours`, url: URL },
    ]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: `Top 10 ${SITE_CITY} Tours` }]} />

        <header className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{TITLE}</h1>
          <p className="mt-4 text-lg text-gray-600">
            These are the ten highest-rated tours and tickets in {SITE_CITY}, ranked by real star ratings and verified
            review counts from thousands of travellers. Every one is bookable direct through GetYourGuide with instant
            confirmation and free cancellation on most options. Tap any image or the Book Now button to check live prices
            and availability.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Updated {new Date(CONTENT_DATE).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} &middot;{' '}
            {top10.length} tours ranked #1 to #{top10.length}
          </p>
          <div className="mt-4"><AffiliateDisclosure /></div>
        </header>

        <div className="space-y-10">
          {top10.map((tour, i) => (
            <section key={tour.slug} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
              <h2 className="text-2xl font-bold text-gray-900 flex items-baseline gap-3">
                <span className="text-green-600 tabular-nums">{i + 1}.</span>
                <Link href={`/tours/${tour.slug}`} className="hover:text-green-700 transition-colors">{tour.title}</Link>
              </h2>

              <TrackedGYGLink
                href={tour.affiliateUrl}
                tourName={tour.shortTitle}
                section="blog-top10-image"
                variant={`rank-${i + 1}`}
                className="mt-4 block relative aspect-[16/9] w-full overflow-hidden rounded-xl group"
              >
                <Image
                  src={tour.imageUrl}
                  alt={tour.imageAlt}
                  fill
                  priority={i === 0}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <span className="absolute top-3 left-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-green-600 text-white font-bold shadow-lg">#{i + 1}</span>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-gray-900 shadow">
                  <span className="text-amber-500">&#9733;</span> {tour.rating.toFixed(1)}
                  <span className="text-gray-500 font-medium">({reviews(tour.reviewCount)})</span>
                </span>
              </TrackedGYGLink>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">From {symbol(tour.currency)}{tour.price}</span>
                <span>&middot; {tour.duration}</span>
                <span>&middot; Free cancellation on most options</span>
              </div>

              <p className="mt-3 text-gray-700 leading-relaxed">{tour.description}</p>

              {tour.highlights?.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {tour.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 mt-0.5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <TrackedGYGLink
                  href={tour.affiliateUrl}
                  tourName={tour.shortTitle}
                  section="blog-top10-book"
                  variant={`rank-${i + 1}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-6 py-3 text-base font-bold text-white shadow-lg shadow-green-600/25 transition-all active:scale-[0.98]"
                >
                  Book Now on GetYourGuide
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </TrackedGYGLink>
                <Link href={`/tours/${tour.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800">
                  Read full details
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900">See every {SITE_CITY} tour</h2>
          <p className="mt-2 text-gray-600">Hundreds more experiences with live prices and availability on GetYourGuide.</p>
          <TrackedGYGLink
            href={GYG_CITY_URL}
            tourName={SITE_CITY}
            section="blog-top10-browse-all"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-6 py-3 text-base font-bold text-white shadow-lg shadow-green-600/25 transition-all active:scale-[0.98]"
          >
            Browse all {SITE_CITY} tours
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </TrackedGYGLink>
        </div>
      </article>
    </>
  );
}
