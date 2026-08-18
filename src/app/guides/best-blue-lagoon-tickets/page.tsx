import { Metadata } from 'next';
import Link from 'next/link';
import { getGuideBySlug, guides } from '@/data/guides';
import { articleSchema, breadcrumbSchema, comparisonListSchema, faqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQ from '@/components/ui/FAQ';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import TrackedGYGLink from '@/components/TrackedGYGLink';
import LocalPrice from '@/components/LocalPrice';
import DisplayCopy from '@/components/DisplayCopy';
import AvailabilityWidget from '@/components/ui/AvailabilityWidget';
import TopThreeCards from './TopThreeCards';
import BlueLagoonWidget from './BlueLagoonWidget';
import { TOP_THREE } from './products';

const SLUG = 'best-blue-lagoon-tickets';
const PAGE_URL = `${SITE_URL}/guides/${SLUG}`;

const guide = getGuideBySlug(SLUG)!;

export const metadata: Metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: guide.metaTitle,
    description: guide.metaDescription,
    url: PAGE_URL,
    type: 'article',
  },
};

export default function BestBlueLagoonTicketsPage() {
  const top = TOP_THREE[0];
  const premium = TOP_THREE[1];
  const retreat = TOP_THREE[2];
  const related = guides.filter((g) =>
    ['blue-lagoon-vs-sky-lagoon', 'iceland-tours-on-a-budget', 'first-time-in-iceland', 'best-day-trips-from-iceland'].includes(g.slug),
  );

  return (
    <>
      {[
        articleSchema(guide),
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: guide.title, url: PAGE_URL },
        ]),
        faqSchema(guide.faqs),
        comparisonListSchema('Blue Lagoon ticket packages compared', TOP_THREE),
      ]
        .filter(Boolean)
        .map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: guide.title },
          ]}
        />

        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{guide.title}</h1>
            <div className="mt-5 rounded-xl border-l-4 border-green-600 bg-green-50 px-4 py-3 sm:px-5 sm:py-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-green-700">Quick answer</p>
              <p className="text-base leading-snug text-gray-800 sm:text-lg">
                {guide.excerpt.replace(/^Quick answer:\s*/i, '')}
              </p>
            </div>
            <time className="mt-3 block text-sm text-gray-500" dateTime={guide.updatedDate}>
              Updated:{' '}
              {new Date(guide.updatedDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </header>

          <AffiliateDisclosure />

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The top 3 Blue Lagoon packages people actually book</h2>
            <p className="mb-6 text-gray-700">
              This is a which-package page for the Blue Lagoon itself: Comfort, Premium and Retreat. It is not a Blue
              Lagoon vs Sky Lagoon comparison. Ranked from live GetYourGuide products. Review counts, starting prices
              and product photos come from those listings. Prices below convert to your currency. The exact fare is
              confirmed on GetYourGuide at checkout.
            </p>
            <TopThreeCards />
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Which one should you book?</h2>
            <ul className="list-disc space-y-3 pl-5 text-gray-700">
              <li>
                <strong>Book Comfort</strong> if you want the famous public lagoon. It is the official admission people
                actually book, rated {top.rating.toFixed(1)} from {top.reviewCount.toLocaleString('en-GB')} reviews,
                from <LocalPrice amount={top.fromAmount} currency={top.fromCurrency} />.
              </li>
              <li>
                <strong>Book Premium</strong> if you want a bathrobe and extra drinks or masks on the same lagoon. It
                is not a quieter pool. From <LocalPrice amount={premium.fromAmount} currency={premium.fromCurrency} />,
                rated {premium.rating.toFixed(1)} from {premium.reviewCount.toLocaleString('en-GB')} reviews.
              </li>
              <li>
                <strong>Book Retreat</strong> only if you want the private spa suite and the Retreat Lagoon. That
                listing is a five-hour private-group visit from{' '}
                <LocalPrice amount={retreat.fromAmount} currency={retreat.fromCurrency} />, with 40 reviews. Most
                visitors should not start there.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Comfort vs Premium vs Retreat, honestly</h2>
            <p className="mb-4 text-gray-700">
              Comfort and Premium share the main Blue Lagoon. The water, the lava field and the timed entry are the
              same. Premium adds a robe and more bar and mask extras. If you would not rent those extras anyway, Comfort
              is the better ticket.
            </p>
            <p className="mb-4 text-gray-700">
              Retreat is a different product. The GetYourGuide title is Official Blue Lagoon: Retreat Spa &amp; Private
              Changing Suite. It is carved into a separate subterranean spa with a private changing suite. You are not
              buying a nicer locker at the main entrance. You are buying a much smaller, much more expensive spa visit.
            </p>
            <p className="text-gray-700">
              Official Blue Lagoon also sells a Signature day-visit tier on its own site. That is not a live GetYourGuide
              package in this comparison. The three products above are the live Comfort / Premium / Retreat equivalents
              on GetYourGuide as of August 2026.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Transfers and Golden Circle combos are not packages</h2>
            <p className="mb-4 text-gray-700">
              GetYourGuide also sells Comfort or Premium with a Reykjavik transfer, and a Golden Circle day that adds
              Blue Lagoon entry. Those are transport or sightseeing bundles. They do not change what Comfort, Premium or
              Retreat includes at the lagoon. If you only want to pick a package, book one of the three tickets above.
            </p>
            <p className="text-gray-700">
              If you are choosing between this lagoon and Sky Lagoon, that is a different question. Use{' '}
              <Link href="/guides/blue-lagoon-vs-sky-lagoon" className="font-semibold text-green-700 underline">
                Blue Lagoon vs Sky Lagoon
              </Link>
              . This page only ranks Blue Lagoon packages.
            </p>
          </section>

          <AvailabilityWidget tourId={top.gygTourId} affiliateUrl={top.href} />

          <section className="mb-12 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Top pick</p>
            <p className="mt-1 font-bold text-gray-900">{top.name}</p>
            <p className="mt-2 text-sm text-gray-700">
              Official Comfort admission, rated {top.rating.toFixed(1)} from {top.reviewCount.toLocaleString('en-GB')}{' '}
              reviews. From <LocalPrice amount={top.fromAmount} currency={top.fromCurrency} />.
            </p>
            <TrackedGYGLink
              href={top.href}
              tourName={top.shortName}
              section="blue-lagoon-which-ticket-bottom-cta"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-500"
            >
              Book Comfort admission
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </TrackedGYGLink>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Blue Lagoon dates on GetYourGuide</h2>
            <p className="mb-4 text-sm text-gray-600">
              Live availability in your currency. This widget is not locked to euros.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
              <BlueLagoonWidget />
            </div>
          </section>

          <FAQ faqs={guide.faqs} />

          {related.length > 0 && (
            <section className="mt-12 rounded-xl bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">More Iceland guides</h2>
              <ul className="space-y-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="font-medium text-green-700 hover:underline">
                      {g.title}
                    </Link>
                    <DisplayCopy
                      as="p"
                      className="mt-0.5 text-sm text-gray-500"
                      text={g.excerpt.replace(/^Quick answer:\s*/i, '')}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link href="/guides" className="inline-flex items-center text-sm font-semibold text-blue-900 hover:underline">
              <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all guides
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
