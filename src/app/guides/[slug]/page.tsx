import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug } from '@/data/guides';
import { getTourBySlug } from '@/data/tours';
import { categories } from '@/data/categories';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQ from '@/components/ui/FAQ';
import TourCard from '@/components/ui/TourCard';
import InlineTourCTA from '@/components/ui/InlineTourCTA';
import StickyBookingBar from '@/components/ds/StickyBookingBar';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: 'article',
    },
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedTours = guide.relatedTourSlugs
    .map((s) => getTourBySlug(s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <>
      {[
        articleSchema(guide),
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: guide.title, url: `${SITE_URL}/guides/${guide.slug}` },
        ]),
        faqSchema(guide.faqs),
      ].filter(Boolean).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: guide.title },
          ]}
        />

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{guide.title}</h1>
            <p className="mt-4 text-lg text-gray-600">{guide.excerpt}</p>
            <time className="mt-3 block text-sm text-gray-500" dateTime={guide.updatedDate}>
              Updated: {new Date(guide.updatedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </header>

          {/* Above-fold booking CTA for guides with a primary tour */}
          {relatedTours.length > 0 && (
            <div className="mb-10 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Top Recommended</p>
                  <p className="font-bold text-gray-900">{relatedTours[0].shortTitle}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {relatedTours[0].rating} ({relatedTours[0].reviewCount.toLocaleString()} reviews)
                    </span>
                    <span>{relatedTours[0].duration}</span>
                    <span className="font-bold text-gray-900">From &pound;{relatedTours[0].price}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <a
                    href={relatedTours[0].affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-green-500 transition-colors whitespace-nowrap"
                  >
                    Book now from &pound;{relatedTours[0].price}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                  <span className="text-xs text-green-700 font-medium">Free cancellation &bull; Instant confirmation</span>
                </div>
              </div>
            </div>
          )}

          {/* Table of Contents */}
          <nav className="mb-10 rounded-xl bg-gray-50 p-6 border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">In This Guide</h2>
            <ul className="space-y-2">
              {guide.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="text-sm text-blue-900 hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content with inline tour CTAs */}
          <div className="guide-content">
            {guide.sections.map((section, i) => {
              const ctaIndex = Math.floor((i - 1) / 3);
              const showCTA = i > 0 && (i - 1) % 3 === 0 && relatedTours.length > 0;
              const ctaTours = showCTA
                ? relatedTours.slice(ctaIndex * 2, ctaIndex * 2 + 2).filter(Boolean)
                : [];

              return (
                <div key={i}>
                  <section id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                    <h2>{section.heading}</h2>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </section>
                  {ctaTours.length > 0 && <InlineTourCTA tours={ctaTours} />}
                </div>
              );
            })}
          </div>

          {/* Related Tours CTA */}
          {relatedTours.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Tours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedTours.slice(0, 4).map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            </section>
          )}

          {/* All Tours CTA - shown above FAQ to capture users about to bounce */}
          <div className="mt-12 rounded-xl bg-gradient-to-r from-green-700 to-emerald-800 p-5 sm:p-6 text-center text-white">
            <p className="font-bold text-lg mb-1">Not sure which tour is right for you?</p>
            <p className="text-sm text-green-100 mb-4">Browse all Iceland tours and filter by type, price, and duration. Free cancellation on most.</p>
            <Link href="/tours" className="inline-block bg-white text-green-700 font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
              See all Iceland tours &rarr;
            </Link>
          </div>

          {/* FAQ */}
          <FAQ faqs={guide.faqs} />

          {/* Related Guides */}
          {(() => {
            const otherGuides = guides.filter(g => g.slug !== guide.slug).slice(0, 4);
            return otherGuides.length > 0 ? (
              <section className="mt-12 bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">More Iceland Guides</h2>
                <ul className="space-y-3">
                  {otherGuides.map(g => (
                    <li key={g.slug}>
                      <Link href={`/guides/${g.slug}`} className="text-green-700 font-medium hover:underline">{g.title}</Link>
                      <p className="text-sm text-gray-500 mt-0.5">{g.excerpt}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null;
          })()}

          {/* Browse by Category */}
          <section className="mt-8">
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

          {/* Back to guides */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/guides" className="inline-flex items-center text-sm font-semibold text-blue-900 hover:underline">
              <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all guides
            </Link>
          </div>
        </article>
      </div>

      {/* Sticky mobile booking bar - shown after user scrolls past the fold */}
      {relatedTours.length > 0 && (
        <StickyBookingBar
          label={relatedTours[0].shortTitle}
          sublabel="Free cancellation · Instant confirmation"
          href={relatedTours[0].affiliateUrl}
          price={`£${relatedTours[0].price}`}
          ctaLabel="Book Now"
          external
        />
      )}
    </>
  );
}
