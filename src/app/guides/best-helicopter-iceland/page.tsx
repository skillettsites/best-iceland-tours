import { Metadata } from 'next';
import Link from 'next/link';
import { getGuideBySlug, guides } from '@/data/guides';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQ from '@/components/ui/FAQ';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import TrackedGYGLink from '@/components/TrackedGYGLink';
import LocalPrice from '@/components/LocalPrice';
import AvailabilityWidget from '@/components/ui/AvailabilityWidget';
import TopThreeCards from './TopThreeCards';
import HelicopterWidget from './HelicopterWidget';
import { TOP_THREE } from './products';

const SLUG = 'best-helicopter-iceland';
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

function offerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Iceland helicopter tours compared',
    itemListElement: TOP_THREE.map((ticket, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: ticket.name,
        image: ticket.imageUrl,
        url: ticket.href,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ticket.rating,
          reviewCount: ticket.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        offers: {
          '@type': 'Offer',
          price: ticket.fromAmount,
          priceCurrency: ticket.fromCurrency,
          availability: 'https://schema.org/InStock',
          url: ticket.href,
          priceValidUntil: '2027-12-31',
        },
      },
    })),
  };
}

const RELATED_EXCERPTS: Record<string, string> = {
  'best-blue-lagoon-tickets':
    'Comfort, Premium or Retreat? Which Blue Lagoon package people actually book.',
  'best-whale-watching-iceland':
    'Classic boat or RIB? Which Reykjavik whale watching tour people actually book.',
  'best-day-trips-from-iceland':
    'The top-rated day trips to book from Reykjavik, chosen for value and ratings.',
  'iceland-tours-on-a-budget':
    'The best-value Iceland tours that keep costs down without missing the highlights.',
};

export default function BestHelicopterIcelandPage() {
  const volcanic = TOP_THREE[0];
  const geothermal = TOP_THREE[1];
  const fireIce = TOP_THREE[2];
  const related = guides.filter((g) =>
    ['best-blue-lagoon-tickets', 'best-whale-watching-iceland', 'best-day-trips-from-iceland', 'iceland-tours-on-a-budget'].includes(g.slug),
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
        offerSchema(),
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
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The top 3 helicopter tours people actually book</h2>
            <p className="mb-6 text-gray-700">
              This is a which-flight page for Reykjavik helicopter tours: the New Volcanic Area lava
              flyover, the Geothermal Tour with a hot-springs landing, and Fire and Ice with two
              landings. It is not a worth-it essay and it is not a full attraction hub. Ranked from
              live GetYourGuide products. Review counts, starting prices and product photos come from
              those listings. Prices below convert to your currency. The exact fare is confirmed on
              GetYourGuide at checkout.
            </p>
            <TopThreeCards />
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Which one should you book?</h2>
            <ul className="list-disc space-y-3 pl-5 text-gray-700">
              <li>
                <strong>Book the New Volcanic Area flight</strong> if you want the Reykjanes lava
                fields from the air. It is the tour people actually book, rated {volcanic.rating.toFixed(1)} from{' '}
                {volcanic.reviewCount.toLocaleString('en-GB')} reviews, from{' '}
                <LocalPrice amount={volcanic.fromAmount} currency={volcanic.fromCurrency} />.
              </li>
              <li>
                <strong>Book the Geothermal Tour</strong> if you want a 15-minute landing beside
                remote hot springs. It is not a longer look at the same lava. From{' '}
                <LocalPrice amount={geothermal.fromAmount} currency={geothermal.fromCurrency} />,
                rated {geothermal.rating.toFixed(1)} from {geothermal.reviewCount.toLocaleString('en-GB')} reviews.
              </li>
              <li>
                <strong>Book Fire and Ice</strong> if you want two landings, on Þórisjökull glacier
                and at Hengill. From <LocalPrice amount={fireIce.fromAmount} currency={fireIce.fromCurrency} />,
                rated {fireIce.rating.toFixed(1)} from {fireIce.reviewCount.toLocaleString('en-GB')} reviews. It
                is a two-hour premium flight, not a nicer seat on the lava tour.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Volcanic lava vs a landing, honestly</h2>
            <p className="mb-4 text-gray-700">
              The New Volcanic Area flight and the Geothermal Tour both leave Reykjavik Domestic
              Airport in a small helicopter. The route is the difference. The lava tour heads to the
              Reykjanes Peninsula and the new volcanic area: craters, lava fields and, when conditions
              allow, a look at recent eruption ground. It is a flyover. The Geothermal Tour heads to
              Hengill, power plants and colourful hot-spring valleys, then lands for about 15 minutes
              beside steaming ground.
            </p>
            <p className="mb-4 text-gray-700">
              If you specifically want the new lava from the air, the volcanic flight is the better
              booking. If you specifically want to step out next to mud pots, the Geothermal Tour is
              the one to open. Visible flowing lava is never guaranteed on the Reykjanes flight.
              Landings on both tours depend on weather.
            </p>
            <p className="text-gray-700">
              GetYourGuide also lists a shorter Hengill landing flight and a Landmannalaugar tour with
              three landings. They are not in this top 3 because the Geothermal Tour has far more
              reviews for a single landing, and Landmannalaugar is a thin-sample, much longer, much
              more expensive day. If a three-landing highlands circuit matters more than review
              volume, that listing is the one to open on GetYourGuide.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Fire and Ice is two landings, not a better lava view</h2>
            <p className="mb-4 text-gray-700">
              Fire and Ice is still a Reykjavik helicopter, but it is a different day. You land on
              Þórisjökull glacier, fly over Glymur and Þingvellir, then land again in the Hengill
              geothermal valley. It does not replace the Reykjanes lava flyover, and it is the wrong
              pick if you only want 40 minutes over new volcanic ground.
            </p>
            <p className="text-gray-700">
              If you are still deciding whether a helicopter is worth the money at all, that is a
              different question. Use{' '}
              <Link href="/guides/iceland-tours-on-a-budget" className="font-semibold text-green-700 underline">
                what Iceland tours cost in 2026
              </Link>
              . This page only ranks the flights.
            </p>
          </section>

          <AvailabilityWidget tourId={volcanic.gygTourId} affiliateUrl={volcanic.href} />

          <section className="mb-12 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Top pick</p>
            <p className="mt-1 font-bold text-gray-900">{volcanic.name}</p>
            <p className="mt-2 text-sm text-gray-700">
              Reykjanes lava flyover, rated {volcanic.rating.toFixed(1)} from{' '}
              {volcanic.reviewCount.toLocaleString('en-GB')} reviews. From{' '}
              <LocalPrice amount={volcanic.fromAmount} currency={volcanic.fromCurrency} />.
            </p>
            <TrackedGYGLink
              href={volcanic.href}
              tourName={volcanic.shortName}
              section="helicopter-which-tour-bottom-cta"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-500"
            >
              Book the New Volcanic Area flight
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </TrackedGYGLink>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More helicopter dates on GetYourGuide</h2>
            <p className="mb-4 text-sm text-gray-600">
              Live availability in your currency. This widget is not locked to euros.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
              <HelicopterWidget />
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
