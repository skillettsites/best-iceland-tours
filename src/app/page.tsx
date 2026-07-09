import LocalPrice from '@/components/LocalPrice';
import Link from 'next/link';
import { tours } from '@/data/tours';
import { categories } from '@/data/categories';
import { SITE_CITY, GYG_PARTNER_ID, GYG_LOCATION_ID } from '@/lib/constants';
import { trustStats } from '@/lib/trust';

import SectionHeader from '@/components/ds/SectionHeader';
import TourCard from '@/components/ds/TourCard';
import BenefitGrid from '@/components/ds/BenefitGrid';
import TestimonialCard from '@/components/ds/TestimonialCard';
import AnimatedCounter from '@/components/ds/AnimatedCounter';
import RevealOnScroll from '@/components/ds/RevealOnScroll';
import CategoryPill from '@/components/ds/CategoryPill';
import PartnerBadge from '@/components/ds/PartnerBadge';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import SisterSites from '@/components/SisterSites';

const byReviews = [...tours].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
const mostBookedTours = byReviews.slice(0, 6);
const featuredTours = byReviews.slice(6, 12);

const testimonials = [
  { quote: `Booking ahead through the site was effortless. We skipped the long queue and walked straight in. Easily the highlight of our trip to ${SITE_CITY}.`, author: 'Sarah M.', location: 'United States', rating: 5 },
  { quote: `Everything was instant. The ticket arrived on my phone straight away, and free cancellation gave us total peace of mind when our plans shifted.`, author: 'James R.', location: 'Canada', rating: 5 },
  { quote: `We compared a few sites and this had the best-rated tours in one place. Simple to book, no printing, no stress. Would use again.`, author: 'Michelle T.', location: 'Australia', rating: 5 },
];

const benefits = [
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Best price, guaranteed',
    desc: 'Live GetYourGuide pricing on every tour. No markups, no hidden fees.',
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    title: 'Instant confirmation',
    desc: 'Tickets land in your inbox immediately. Mobile entry at every attraction.',
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" /></svg>,
    title: 'Free cancellation',
    desc: 'Most tours cancellable up to 24h before. Plans change, we get it.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Lead: most popular tours front and centre */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-3">
            Most Booked in {SITE_CITY}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-on-surface">
            Our most popular {SITE_CITY} tours
          </h1>
          <p className="mt-4 text-lg text-on-surface-2 leading-relaxed">
            {`Top-rated ${SITE_CITY} experiences, booked direct through GetYourGuide. Instant confirmation, free cancellation on most bookings.`}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface-muted px-4 py-1.5 text-sm font-medium text-on-surface-2 ring-1 ring-border">
            <span className="text-highlight">&#9733;</span>
            <span>{trustStats.avgRating.toFixed(1)} average across {(trustStats.totalReviews / 1000).toFixed(0)}k+ verified reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {mostBookedTours.map((tour, i) => (
            <RevealOnScroll key={tour.slug} delay={(i % 3) * 0.08}>
              <TourCard tour={tour} priority={i < 3} section="home-most-popular" trackingVariant={`most-popular-${i + 1}`} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link href="/tours" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-base px-7 py-3.5 shadow-lg shadow-accent/25 transition-all active:scale-[0.98] min-h-[52px]">
            Browse all {tours.length} {SITE_CITY} tours
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      <PartnerBadge />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AffiliateDisclosure />
      </div>

      {/* Featured */}
      {featuredTours.length > 0 && (
        <section className="bg-surface-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <SectionHeader eyebrow="Featured" title={`More ${SITE_CITY} tours, hand-picked`} subtitle="Every tour vetted, every booking verified through GetYourGuide." action={{ label: `View all ${tours.length} tours`, href: '/tours' }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {featuredTours.map((tour, i) => (
                <RevealOnScroll key={tour.slug} delay={(i % 3) * 0.08}>
                  <TourCard tour={tour} section="home-featured" trackingVariant="featured-grid" />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why book */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader eyebrow="Why us" title="Booking made simple" align="center" />
        <BenefitGrid items={benefits} columns={3} />
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-surface-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <SectionHeader eyebrow="Browse" title="By category" subtitle={`Find the perfect ${SITE_CITY} experience for your interests.`} />
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <CategoryPill key={cat.slug} href={`/category/${cat.slug}`} label={`${cat.icon} ${cat.title}`} count={cat.tourSlugs.length} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader eyebrow="Reviews" title="What visitors say" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.author} delay={i * 0.08}>
              <TestimonialCard {...t} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="rounded-card-lg bg-primary text-white p-8 sm:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div><AnimatedCounter value={trustStats.totalTours} className="font-display text-4xl sm:text-5xl" /><p className="mt-1.5 text-sm text-white/70">Tours curated</p></div>
              <div><AnimatedCounter value={trustStats.avgRating} decimals={1} className="font-display text-4xl sm:text-5xl" /><p className="mt-1.5 text-sm text-white/70">Average rating</p></div>
              <div><AnimatedCounter value={trustStats.totalReviews} className="font-display text-4xl sm:text-5xl" /><p className="mt-1.5 text-sm text-white/70">Verified reviews</p></div>
              <div><AnimatedCounter value={trustStats.freeCancellationPct} suffix="%" className="font-display text-4xl sm:text-5xl" /><p className="mt-1.5 text-sm text-white/70">Free cancellation</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* GYG city widget */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader eyebrow="Explore" title={`Hundreds more ${SITE_CITY} experiences`} subtitle="Browse the full GetYourGuide catalogue, with live pricing and availability." />
        <div className="bg-surface rounded-card-lg p-4 sm:p-6 border border-border">
          <div data-gyg-href="https://widget.getyourguide.com/default/city.frame" data-gyg-location-id={GYG_LOCATION_ID} data-gyg-locale-code="en-US" data-gyg-widget="city" data-gyg-partner-id={GYG_PARTNER_ID} />
        </div>
      </section>

      <SisterSites currentCity={SITE_CITY} />



      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden bg-white/95 backdrop-blur border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3">
        <Link href="/tours" className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-base py-3.5 shadow-lg shadow-accent/25 transition-all active:scale-[0.98]">
          Browse tours: from <LocalPrice gbp={trustStats.minPrice} />
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </div>
      <div className="h-16 sm:hidden" />
    </>
  );
}
