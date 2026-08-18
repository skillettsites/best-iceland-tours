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
import AvailabilityWidget from '@/components/ui/AvailabilityWidget';
import TopThreeCards from './TopThreeCards';
import GoldenCircleWidget from './GoldenCircleWidget';
import { TOP_THREE } from './products';

const SLUG = 'best-golden-circle-tour';
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

const RELATED_EXCERPTS: Record<string, string> = {
  'best-blue-lagoon-tickets':
    'Comfort, Premium or Retreat? Which Blue Lagoon package people actually book.',
  'best-day-trips-from-iceland':
    'The top-rated day trips to book from Reykjavik, chosen for value and ratings.',
  'iceland-tours-on-a-budget':
    'The best-value Iceland tours that keep costs down without missing the highlights.',
  'first-time-in-iceland':
    'A first-timer shortlist of the Iceland experiences worth booking before you go.',
};

export default function BestGoldenCircleTourPage() {
  const classic = TOP_THREE[0];
  const smallGroup = TOP_THREE[1];
  const lagoonCombo = TOP_THREE[2];
  const related = guides.filter((g) =>
    ['best-blue-lagoon-tickets', 'best-day-trips-from-iceland', 'iceland-tours-on-a-budget', 'first-time-in-iceland'].includes(g.slug),
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
        comparisonListSchema('Iceland Golden Circle tours compared', TOP_THREE),
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
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The top 3 Golden Circle tours people actually book</h2>
            <p className="mb-6 text-gray-700">
              This is a which-tour page for the Golden Circle: the full-day coach with Kerid crater, the
              afternoon small group, and the combined Golden Circle and Blue Lagoon day. It is not a
              worth-it essay. Ranked from live GetYourGuide products already on this site. Review counts,
              starting prices and product photos come from those listings. Prices below convert to your
              currency. The exact fare is confirmed on GetYourGuide at checkout.
            </p>
            <TopThreeCards />
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Which one should you book?</h2>
            <ul className="list-disc space-y-3 pl-5 text-gray-700">
              <li>
                <strong>Book the Full-Day Tour with Kerid Crater</strong> if you want the standard Golden
                Circle. It is the cheapest of the three and the most reviewed tour on this site, rated{' '}
                {classic.rating.toFixed(1)} from {classic.reviewCount.toLocaleString('en-GB')} reviews,
                from <LocalPrice amount={classic.fromAmount} currency={classic.fromCurrency} />.
              </li>
              <li>
                <strong>Book the Afternoon Small Group Tour</strong> if you want a smaller vehicle or a
                later start. It is six hours rather than a full day, from{' '}
                <LocalPrice amount={smallGroup.fromAmount} currency={smallGroup.fromCurrency} />, rated{' '}
                {smallGroup.rating.toFixed(1)} from {smallGroup.reviewCount.toLocaleString('en-GB')}{' '}
                reviews.
              </li>
              <li>
                <strong>Book the Golden Circle and Blue Lagoon tour</strong> if you want both headline
                attractions in one 11-hour day with the transport solved. From{' '}
                <LocalPrice amount={lagoonCombo.fromAmount} currency={lagoonCombo.fromCurrency} />, rated{' '}
                {lagoonCombo.rating.toFixed(1)} from {lagoonCombo.reviewCount.toLocaleString('en-GB')}{' '}
                reviews.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Full day vs afternoon small group, honestly</h2>
            <p className="mb-4 text-gray-700">
              Both tours visit the same three headline stops: Thingvellir National Park, the Geysir
              geothermal area and Gullfoss waterfall. What differs is the vehicle, the start time and
              whether Kerid crater is included. The full-day coach runs seven to eight and a half hours
              and adds Kerid. The small group runs six hours and leaves in the afternoon.
            </p>
            <p className="mb-4 text-gray-700">
              The price gap is smaller than people expect. The small group is{' '}
              <LocalPrice amount={smallGroup.fromAmount - classic.fromAmount} currency={classic.fromCurrency} />{' '}
              more than the full-day coach, so you are paying for group size and timing rather than for
              more sightseeing. If you are travelling in the long-daylight months an afternoon departure
              still finishes in full light, which is the strongest argument for it. Between October and
              February it is the weakest, because the light goes early.
            </p>
            <p className="text-gray-700">
              GetYourGuide also lists a Golden Circle Day Tour with Local Surprise at £81 over nine hours,
              and a small group run from the cruise terminal at £121. Neither is in this top three: the
              first has 584 reviews against the leader’s 26,755, and the second is priced for cruise
              passengers who need a terminal pickup. If you are arriving by ship, that terminal tour is
              the one to open on the{' '}
              <Link href="/attractions/golden-circle" className="font-semibold text-green-700 underline">
                Golden Circle attraction hub
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Is the Blue Lagoon combo worth the extra?</h2>
            <p className="mb-4 text-gray-700">
              Do the arithmetic before you book it. The combined day is{' '}
              <LocalPrice amount={lagoonCombo.fromAmount} currency={lagoonCombo.fromCurrency} />, while
              the full-day Golden Circle at{' '}
              <LocalPrice amount={classic.fromAmount} currency={classic.fromCurrency} /> plus Blue Lagoon
              Comfort admission at <LocalPrice amount={108} currency="GBP" /> comes to{' '}
              <LocalPrice amount={176} currency="GBP" />. The combo is the more expensive route on paper,
              and what the difference buys is the transfer and the timing rather than any extra sightseeing.
            </p>
            <p className="mb-4 text-gray-700">
              That is usually worth it if you have no hire car, because the Blue Lagoon sits between
              Reykjavik and the airport rather than in the city, and arranging a separate transfer around
              a timed entry slot is the fiddliest part of a short Iceland trip. It is usually not worth it
              if you are driving, or if you would rather spend an unhurried afternoon at the lagoon than
              arrive there at the end of an 11-hour day.
            </p>
            <p className="text-gray-700">
              If it is the lagoon itself you are choosing rather than the tour, the package question is
              covered separately in{' '}
              <Link href="/guides/best-blue-lagoon-tickets" className="font-semibold text-green-700 underline">
                which Blue Lagoon ticket to book
              </Link>
              , and the lagoon-versus-lagoon question in{' '}
              <Link href="/guides/blue-lagoon-vs-sky-lagoon" className="font-semibold text-green-700 underline">
                Blue Lagoon vs Sky Lagoon
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">When to go, and what that changes</h2>
            <p className="mb-4 text-gray-700">
              The Golden Circle runs every day of the year and the stops do not close, so the season
              changes the experience rather than the availability. In summer you get near round-the-clock
              daylight, so an afternoon departure is genuinely viable and Gullfoss is at high meltwater
              volume. In winter the route is still open but the usable light is short, which is why the
              early full-day departure is the safer booking between November and February.
            </p>
            <p className="text-gray-700">
              If you are still choosing your month, the month-by-month breakdown is in{' '}
              <Link href="/best-time-to-visit-iceland" className="font-semibold text-green-700 underline">
                the best time to visit Iceland
              </Link>
              . June is the driest month of the year and the lightest, and July is the warmest.
            </p>
          </section>

          <section className="mb-12">
            <p className="text-gray-700">
              If you are still deciding whether to do the Golden Circle at all, that is a different
              question. Use{' '}
              <Link href="/blog/is-the-golden-circle-tour-worth-it" className="font-semibold text-green-700 underline">
                Is the Golden Circle tour worth it?
              </Link>{' '}
              or, if you are choosing between routes,{' '}
              <Link href="/blog/golden-circle-vs-south-coast-which-tour" className="font-semibold text-green-700 underline">
                Golden Circle vs South Coast
              </Link>
              . This page only ranks the tours.
            </p>
          </section>

          <AvailabilityWidget tourId={classic.gygTourId} affiliateUrl={classic.href} />

          <section className="mb-12 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Top pick</p>
            <p className="mt-1 font-bold text-gray-900">{classic.name}</p>
            <p className="mt-2 text-sm text-gray-700">
              The full route including Kerid crater, rated {classic.rating.toFixed(1)} from{' '}
              {classic.reviewCount.toLocaleString('en-GB')} reviews. From{' '}
              <LocalPrice amount={classic.fromAmount} currency={classic.fromCurrency} />.
            </p>
            <TrackedGYGLink
              href={classic.href}
              tourName={classic.shortName}
              section="golden-circle-which-tour-bottom-cta"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-500"
            >
              Book the Full-Day Golden Circle
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </TrackedGYGLink>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Golden Circle dates on GetYourGuide</h2>
            <p className="mb-4 text-sm text-gray-600">
              Live availability in your currency. This widget is not locked to euros.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
              <GoldenCircleWidget />
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
                    <p className="mt-0.5 text-sm text-gray-500">
                      {RELATED_EXCERPTS[g.slug] || g.excerpt.replace(/^Quick answer:\s*/i, '')}
                    </p>
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
