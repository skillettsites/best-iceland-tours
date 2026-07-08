import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tours, getTourBySlug, getRelatedTours } from '@/data/tours';
import { categories } from '@/data/categories';
import { guides } from '@/data/guides';
import { tourSchema, touristTripSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';
import { TOP_CONVERTER_BY_DESTINATION } from '@/lib/trust';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQ from '@/components/ui/FAQ';
import AvailabilityWidget from '@/components/ui/AvailabilityWidget';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import TrackedGYGLink from '@/components/TrackedGYGLink';

import TourCard from '@/components/ds/TourCard';
import SectionHeader from '@/components/ds/SectionHeader';
import ImageMosaic from '@/components/ds/ImageMosaic';
import ViewerCounter from '@/components/ds/ViewerCounter';
import RevealOnScroll from '@/components/ds/RevealOnScroll';
import StickyBookingBar from '@/components/ds/StickyBookingBar';

const categoryGuideMap: Record<string, string[]> = {
  landmarks: ['first-time-visiting-iceland', 'iceland-3-day-itinerary', 'best-walking-tours-iceland-2026'],
  'river-cruises': ['bus-tour-vs-boat-tour-iceland', 'iceland-tours-for-couples', 'iceland-3-day-itinerary'],
  'day-trips': ['best-day-trips-from-iceland', 'first-time-visiting-iceland', 'iceland-3-day-itinerary'],
  'food-tours': ['iceland-food-tours', 'free-things-to-do-in-iceland-2026'],
  'family-fun': ['best-iceland-tours-for-kids', 'iceland-rainy-day-activities', 'free-things-to-do-in-iceland-2026'],
  'walking-tours': ['best-walking-tours-iceland-2026', 'first-time-visiting-iceland', 'free-things-to-do-in-iceland-2026'],
  'museums-exhibitions': ['iceland-rainy-day-activities', 'first-time-visiting-iceland', 'best-iceland-tours-for-kids'],
  'evening-experiences': ['iceland-tours-for-couples', 'best-walking-tours-iceland-2026', 'best-evening-tours-iceland-2026'],
};

const REDIRECTED = new Set<string>([]);

export function generateStaticParams() {
  return tours.filter((t) => !REDIRECTED.has(t.slug)).map((tour) => ({ slug: tour.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  return {
    title: tour.metaTitle,
    description: tour.metaDescription,
    alternates: { canonical: `${SITE_URL}/tours/${tour.slug}` },
    openGraph: {
      title: tour.metaTitle,
      description: tour.metaDescription,
      url: `${SITE_URL}/tours/${tour.slug}`,
      type: 'website',
    },
  };
}

export default async function TourPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const relatedTours = getRelatedTours(tour).slice(0, 3);

  // "Or book instead", destination's top converter (Iceland for BLT)
  const topConverter = TOP_CONVERTER_BY_DESTINATION.iceland;
  const altTour = topConverter && topConverter.slug !== tour.slug ? getTourBySlug(topConverter.slug) : null;

  const schemas = [
    tourSchema(tour),
    touristTripSchema(tour),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Tours', url: `${SITE_URL}/tours` },
      { name: tour.shortTitle, url: `${SITE_URL}/tours/${tour.slug}` },
    ]),
    faqSchema(tour.faqs),
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <StickyBookingBar
        label={tour.shortTitle}
        sublabel={`From £${tour.price} · Free cancellation`}
        href={tour.affiliateUrl}
        price={`£${tour.price}`}
        ctaLabel="Book Now"
        external
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tours', href: '/tours' },
            { label: tour.shortTitle },
          ]}
        />

        <AffiliateDisclosure />

        {/* Hero */}
        <div className="mt-6 mb-8">
          <ImageMosaic
            images={[{ src: tour.imageUrl, alt: tour.imageAlt }]}
            layout="hero"
            priority
          />
          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-on-surface leading-tight">
                {tour.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1 font-semibold text-on-surface">
                  <span className="text-highlight">&#9733;</span>
                  {tour.rating.toFixed(1)}
                  <span className="font-normal text-on-surface-2 ml-1">
                    ({tour.reviewCount.toLocaleString()} verified GetYourGuide reviews)
                  </span>
                </span>
                <span className="text-on-surface-2">&middot; {tour.duration}</span>
                <ViewerCounter seed={tour.slug} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <p className="text-[17px] text-on-surface leading-relaxed">{tour.description}</p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-semibold text-on-surface mb-4">What makes this tour</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-card border border-border bg-surface p-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm text-on-surface leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Includes */}
            <section>
              <h2 className="text-2xl font-semibold text-on-surface mb-4">What's included</h2>
              <ul className="flex flex-wrap gap-2">
                {tour.includes.map((item, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 rounded-pill bg-success/10 text-success px-3.5 py-1.5 text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Best for */}
            <section>
              <h2 className="text-2xl font-semibold text-on-surface mb-4">Best for</h2>
              <div className="flex flex-wrap gap-2">
                {tour.bestFor.map((tag, i) => (
                  <span key={i} className="rounded-pill bg-primary-soft text-primary px-4 py-1.5 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Or book instead */}
            {altTour && (
              <RevealOnScroll>
                <section className="rounded-card-lg border border-border bg-primary-soft/40 p-6">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-2">
                    Looking for something more popular?
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-on-surface">{altTour.title}</p>
                      <p className="mt-1 text-sm text-on-surface-2">
                        <span className="text-highlight">&#9733;</span> {altTour.rating.toFixed(1)} &middot; {altTour.reviewCount.toLocaleString()} reviews &middot; {topConverter?.reason}
                      </p>
                    </div>
                    <TrackedGYGLink
                      href={altTour.affiliateUrl}
                      tourName={altTour.shortTitle}
                      section="tour-alt-recommend"
                      variant="alt-recommend"
                      destination="iceland"
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-ink text-white font-semibold text-sm px-5 py-2.5 transition-colors"
                    >
                      Book {altTour.shortTitle} instead
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </TrackedGYGLink>
                  </div>
                </section>
              </RevealOnScroll>
            )}

            <AvailabilityWidget tourId={tour.gygTourId} affiliateUrl={tour.affiliateUrl} />

            <FAQ faqs={tour.faqs} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-card-lg border border-border bg-surface p-6 shadow-card">
                <div className="mb-5 text-center">
                  <span className="text-xs uppercase tracking-wider text-on-surface-2">From</span>
                  <div className="font-display text-5xl text-on-surface leading-none mt-1">£{tour.price}</div>
                  <span className="block mt-1 text-xs text-on-surface-2">per person</span>
                </div>
                <TrackedGYGLink
                  href={tour.affiliateUrl}
                  tourName={tour.shortTitle}
                  section="sidebar-book-cta"
                  variant="sidebar"
                  destination="iceland"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-base py-3.5 shadow-lg shadow-accent/25 transition-all active:scale-[0.98]"
                >
                  Check availability
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </TrackedGYGLink>
                <p className="mt-2 text-center text-xs font-medium text-success">Free cancellation on most dates</p>
                <ul className="mt-5 space-y-2 text-sm text-on-surface-2">
                  {['Instant confirmation', 'Free cancellation', 'Mobile ticket', 'Best price guarantee'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card-lg border border-border bg-surface p-6">
                <h3 className="font-semibold text-on-surface mb-3 text-sm">Quick info</h3>
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><dt className="text-on-surface-2">Duration</dt><dd className="font-medium text-on-surface">{tour.duration}</dd></div>
                  <div className="flex justify-between"><dt className="text-on-surface-2">Rating</dt><dd className="font-medium text-on-surface">{tour.rating.toFixed(1)}/5</dd></div>
                  <div className="flex justify-between"><dt className="text-on-surface-2">Reviews</dt><dd className="font-medium text-on-surface">{tour.reviewCount.toLocaleString()}</dd></div>
                  <div className="flex justify-between"><dt className="text-on-surface-2">From</dt><dd className="font-medium text-on-surface">£{tour.price}</dd></div>
                </dl>
              </div>
            </div>
          </aside>
        </div>

        {/* Category links */}
        {tour.categories.length > 0 && (
          <section className="mt-16">
            <SectionHeader title="Browse more Iceland tours" />
            <div className="flex flex-wrap gap-2">
              {tour.categories.map((catSlug) => {
                const cat = categories.find((c) => c.slug === catSlug);
                if (!cat) return null;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 text-sm font-medium text-on-surface hover:border-primary hover:text-primary transition-colors"
                  >
                    {cat.icon} {cat.title}
                  </Link>
                );
              })}
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 rounded-pill bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-ink transition-colors"
              >
                All Iceland tours
              </Link>
            </div>
          </section>
        )}

        {/* Related guides */}
        {(() => {
          const guideSlugSet = new Set<string>();
          tour.categories.forEach((catSlug) => {
            const mapped = categoryGuideMap[catSlug];
            if (mapped) mapped.forEach((gs) => guideSlugSet.add(gs));
          });
          const relevantGuides = Array.from(guideSlugSet)
            .map((gs) => guides.find((g) => g.slug === gs))
            .filter((g): g is NonNullable<typeof g> => g !== undefined)
            .slice(0, 3);
          if (relevantGuides.length === 0) return null;

          return (
            <section className="mt-16 rounded-card-lg bg-surface-muted p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-on-surface mb-4">More Iceland guides</h2>
              <ul className="space-y-3">
                {relevantGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="block group">
                      <span className="text-primary font-medium group-hover:underline">{guide.title}</span>
                      <p className="text-sm text-on-surface-2 mt-0.5">{guide.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}

        {/* Related tours */}
        {relatedTours.length > 0 && (
          <section className="mt-16">
            <SectionHeader
              title="You might also like"
              action={{ label: 'View all tours', href: '/tours' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedTours.map((related) => (
                <TourCard key={related.slug} tour={related} section="tour-related" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
