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
import WhaleWatchingWidget from './WhaleWatchingWidget';
import { TOP_THREE } from './products';

const SLUG = 'best-whale-watching-iceland';
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

export default function BestWhaleWatchingIcelandPage() {
  const classic = TOP_THREE[0];
  const rib = TOP_THREE[1];
  const combo = TOP_THREE[2];
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
        comparisonListSchema('Iceland whale watching tours compared', TOP_THREE),
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
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The top 3 whale watching tours people actually book</h2>
            <p className="mb-6 text-gray-700">
              This is a which-boat page for Reykjavik whale watching: the Marine Life Cruise, the RIB
              Speedboat, and the Whales and Puffins Express combo. It is not a worth-it essay and it is
              not the full attraction hub. Ranked from live GetYourGuide products already on this site.
              Review counts, starting prices and product photos come from those listings. Prices below
              convert to your currency. The exact fare is confirmed on GetYourGuide at checkout.
            </p>
            <TopThreeCards />
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Which one should you book?</h2>
            <ul className="list-disc space-y-3 pl-5 text-gray-700">
              <li>
                <strong>Book the Marine Life Cruise</strong> if you want the classic heated-cabin boat. It
                is the tour people actually book, rated {classic.rating.toFixed(1)} from{' '}
                {classic.reviewCount.toLocaleString('en-GB')} reviews, from{' '}
                <LocalPrice amount={classic.fromAmount} currency={classic.fromCurrency} />.
              </li>
              <li>
                <strong>Book the RIB Speedboat</strong> if you want a faster, closer ride. It is not a
                nicer seat on the same cruise. From <LocalPrice amount={rib.fromAmount} currency={rib.fromCurrency} />,
                rated {rib.rating.toFixed(1)} from {rib.reviewCount.toLocaleString('en-GB')} reviews. Not
                for children under 10.
              </li>
              <li>
                <strong>Book the Whales and Puffins Express combo</strong> if you want both wildlife types
                on one classic-boat sailing. From{' '}
                <LocalPrice amount={combo.fromAmount} currency={combo.fromCurrency} />, rated{' '}
                {combo.rating.toFixed(1)} from {combo.reviewCount.toLocaleString('en-GB')} reviews. Puffins
                are a summer bird.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Classic boat vs RIB, honestly</h2>
            <p className="mb-4 text-gray-700">
              The Marine Life Cruise and the RIB Speedboat leave the same harbour and look for the same
              animals in Faxafloi Bay: minke whales, humpback whales, white-beaked dolphins and harbour
              porpoises. The boat is the difference. The cruise has a heated indoor cabin, toilets, a cafe
              and space to move. The RIB is wetter, faster and more thrilling, with warm overalls, gloves
              and goggles included, and none of that cabin comfort.
            </p>
            <p className="mb-4 text-gray-700">
              If you would not choose a speedboat on a cold Icelandic morning, the Marine Life Cruise is
              the better booking. If you specifically want to cover more water and sit closer to the
              animals, the RIB is the one to open. Neither operator can promise a whale.
            </p>
            <p className="text-gray-700">
              GetYourGuide also lists the Original 3-Hour Whale Watching Tour, the Elding classic boat
              with marine-biologist guides and a listed sighting guarantee. It is not in this top 3
              because the Marine Life Cruise has far more reviews and a lower from-price. If a free
              second sailing matters more than review volume, that Elding listing is the one to open on
              the{' '}
              <Link href="/attractions/whale-watching" className="font-semibold text-green-700 underline">
                whale watching attraction hub
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The combo is a longer day, not a better boat</h2>
            <p className="mb-4 text-gray-700">
              The Whales and Puffins Express Cruise Combo is still a classic boat. It adds a puffin stop
              in season and runs about four hours instead of three. It does not change what you get on a
              RIB, and it is the wrong pick once puffins have left. If you only want whales, book the
              Marine Life Cruise or the RIB Speedboat.
            </p>
            <p className="text-gray-700">
              If you are still deciding whether to book whale watching at all, that is a different
              question. Use{' '}
              <Link href="/blog/is-whale-watching-in-iceland-worth-it" className="font-semibold text-green-700 underline">
                Is whale watching in Iceland worth it?
              </Link>
              . This page only ranks the boats.
            </p>
          </section>

          <AvailabilityWidget tourId={classic.gygTourId} affiliateUrl={classic.href} />

          <section className="mb-12 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Top pick</p>
            <p className="mt-1 font-bold text-gray-900">{classic.name}</p>
            <p className="mt-2 text-sm text-gray-700">
              Classic heated-cabin cruise, rated {classic.rating.toFixed(1)} from{' '}
              {classic.reviewCount.toLocaleString('en-GB')} reviews. From{' '}
              <LocalPrice amount={classic.fromAmount} currency={classic.fromCurrency} />.
            </p>
            <TrackedGYGLink
              href={classic.href}
              tourName={classic.shortName}
              section="whale-watching-which-boat-bottom-cta"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-500"
            >
              Book the Marine Life Cruise
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </TrackedGYGLink>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More whale watching dates on GetYourGuide</h2>
            <p className="mb-4 text-sm text-gray-600">
              Live availability in your currency. This widget is not locked to euros.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
              <WhaleWatchingWidget />
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
