import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Tour } from '@/lib/types';
import { getTourBySlug } from '@/data/tours';
import {
  MonthData,
  getMonthBySlug,
  adjacentMonths,
  hubMonths,
  yearForMonth,
  VISITORS_2025,
  VISITORS_2025_TOTAL,
  OCCUPANCY_2025,
} from '@/data/months';
import { SITE_NAME, SITE_URL, SITE_CITY, CONTENT_DATE, GYG_CITY_URL } from '@/lib/constants';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQ from '@/components/ui/FAQ';
import LocalPrice from '@/components/LocalPrice';
import TrackedGYGLink from '@/components/TrackedGYGLink';
import StickyBookingBar from '@/components/ds/StickyBookingBar';

const PUBLISHED_DATE = '2026-07-28';

export interface RankedPick {
  position: number;
  tour: Tour;
  note: string;
  score: number;
}

/**
 * Display name for a tour on these pages.
 *
 * Some stored shortTitles were split on the wrong colon when the catalogue was generated, so
 * two products carry the useless shortTitle "From Reykjavik". We do not edit the existing
 * catalogue here, because that would change headings on live tour and category pages. Instead
 * we pick whichever of the stored shortTitle or the text after the first colon in the full
 * verified title actually describes the product. Both come from the verified GetYourGuide title.
 */
export function displayName(tour: Tour): string {
  const i = tour.title.indexOf(':');
  const afterColon = i === -1 ? tour.title : tour.title.slice(i + 1).trim();
  return tour.shortTitle.length >= afterColon.length ? tour.shortTitle : afterColon;
}

/**
 * Seasonal ranking. Sort by the month's own seasonal relevance score first, then by the
 * verified GetYourGuide rating, then by verified review count. Anything scored 0 is out of
 * season for the month and is excluded here, then named in the closures section instead.
 *
 * This is the whole point of the month pages: the site's default ordering is rating then
 * review count, both static, so without this every month's list would be identical.
 */
export function rankPicks(month: MonthData): RankedPick[] {
  return month.picks
    .filter((p) => p.score > 0)
    .map((p) => ({ pick: p, tour: getTourBySlug(p.slug) }))
    .filter((x): x is { pick: (typeof month.picks)[number]; tour: Tour } => Boolean(x.tour))
    .sort((a, b) => {
      if (b.pick.score !== a.pick.score) return b.pick.score - a.pick.score;
      if (b.tour.rating !== a.tour.rating) return b.tour.rating - a.tour.rating;
      return b.tour.reviewCount - a.tour.reviewCount;
    })
    .slice(0, 10)
    .map((x, i) => ({ position: i + 1, tour: x.tour, note: x.pick.note, score: x.pick.score }));
}

export function buildMonthMetadata(slug: string): Metadata {
  const month = getMonthBySlug(slug);
  if (!month) return {};
  const year = yearForMonth(month.index);
  const title = `${SITE_CITY} in ${month.name} ${year}: Weather, Events and the Best Tours`;
  return {
    title,
    description: month.metaDescription,
    alternates: { canonical: `${SITE_URL}/iceland-in-${month.slug}` },
    openGraph: {
      title,
      description: month.metaDescription,
      url: `${SITE_URL}/iceland-in-${month.slug}`,
      type: 'article',
    },
  };
}

function Capsule({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-xl border-l-4 border-green-600 bg-green-50 px-4 py-3 text-base leading-relaxed text-gray-800">
      {children}
    </p>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
      {children}
    </h2>
  );
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[560px] border-collapse text-sm">{children}</table>
    </div>
  );
}

const th = 'bg-gray-50 px-3 py-2.5 text-left font-semibold text-gray-900 border-b border-gray-200';
const td = 'px-3 py-2.5 align-top text-gray-700 border-b border-gray-100';

export default function MonthPage({ slug }: { slug: string }) {
  const month = getMonthBySlug(slug);
  if (!month) return null;

  const year = yearForMonth(month.index);
  const picks = rankPicks(month);
  const { prev, next } = adjacentMonths(month);
  const url = `${SITE_URL}/iceland-in-${month.slug}`;
  const visitors = VISITORS_2025[month.slug];
  const occupancy = OCCUPANCY_2025[month.slug];
  const closedPicks = month.picks.filter((p) => p.score === 0);
  const lead = picks[0];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${SITE_CITY} in ${month.name}: Weather, Events and the Best Tours`,
    description: month.metaDescription,
    url,
    datePublished: PUBLISHED_DATE,
    dateModified: CONTENT_DATE,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    about: { '@type': 'Place', name: 'Iceland' },
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `The best tours in Iceland in ${month.name}`,
    numberOfItems: picks.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: picks.map((p) => ({
      '@type': 'ListItem',
      position: p.position,
      name: displayName(p.tour),
      url: `${SITE_URL}/tours/${p.tour.slug}`,
      image: p.tour.imageUrl,
    })),
  };

  const schemas = [
    articleSchema,
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Best Time to Visit Iceland', url: `${SITE_URL}/best-time-to-visit-iceland` },
      { name: `Iceland in ${month.name}`, url },
    ]),
    itemList,
    faqSchema(month.faqs),
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

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Best Time to Visit Iceland', href: '/best-time-to-visit-iceland' },
            { label: `Iceland in ${month.name}` },
          ]}
        />

        <article>
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">{month.season}</p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Iceland in {month.name}: Weather, Events and the Best Tours
            </h1>
            <Capsule>{month.capsule}</Capsule>
            <time className="mt-3 block text-sm text-gray-500" dateTime={CONTENT_DATE}>
              Updated{' '}
              {new Date(CONTENT_DATE).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </header>

          {/* Quick-pick table, near the top per the format that ranks */}
          <section aria-labelledby="quick-picks">
            <h2 id="quick-picks" className="mt-10 text-xl font-bold text-gray-900">
              Quick picks: the best tours in Iceland in {month.name}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ranked for {month.name} by seasonal relevance, then by verified GetYourGuide rating and
              review count. Prices are the current lowest available and were verified against live
              GetYourGuide listings on 28 July 2026.
            </p>
            <TableWrap>
              <thead>
                <tr>
                  <th className={th}>#</th>
                  <th className={th}>Tour</th>
                  <th className={th}>Best for</th>
                  <th className={th}>Duration</th>
                  <th className={th}>From</th>
                  <th className={th}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {picks.map((p) => (
                  <tr key={p.tour.slug}>
                    <td className={`${td} font-bold text-gray-900`}>{p.position}</td>
                    <td className={td}>
                      <Link
                        href={`/tours/${p.tour.slug}`}
                        className="font-medium text-green-700 hover:underline"
                      >
                        {displayName(p.tour)}
                      </Link>
                    </td>
                    <td className={td}>{p.tour.bestFor[0] ?? 'All visitors'}</td>
                    <td className={td}>{p.tour.duration}</td>
                    <td className={`${td} whitespace-nowrap font-semibold text-gray-900`}>
                      <LocalPrice gbp={p.tour.price} />
                    </td>
                    <td className={`${td} whitespace-nowrap`}>
                      {p.tour.rating} ({p.tour.reviewCount.toLocaleString()})
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </section>

          {/* 1. Verdict */}
          <H2 id="is-it-a-good-time">Is {month.name} a good time to visit Iceland?</H2>
          <Capsule>{month.verdict}</Capsule>
          {month.verdictBody.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-gray-700">
              {p}
            </p>
          ))}

          {/* 2. Weather */}
          <H2 id="weather">Iceland weather in {month.name}</H2>
          <Capsule>{month.weather.capsule}</Capsule>
          <TableWrap>
            <thead>
              <tr>
                <th className={th}>Measure</th>
                <th className={th}>Reykjavik in {month.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>Average daily high</td>
                <td className={`${td} font-semibold text-gray-900`}>{month.weather.highC}C</td>
              </tr>
              <tr>
                <td className={td}>Average daily low</td>
                <td className={`${td} font-semibold text-gray-900`}>{month.weather.lowC}C</td>
              </tr>
              <tr>
                <td className={td}>Wet days</td>
                <td className={td}>
                  {month.weather.wetDays} days. {month.weather.rainNote}
                </td>
              </tr>
              <tr>
                <td className={td}>Daylight, mid-month</td>
                <td className={`${td} font-semibold text-gray-900`}>{month.weather.daylightMid}</td>
              </tr>
              <tr>
                <td className={td}>Daylight range across the month</td>
                <td className={td}>
                  {month.weather.daylightStart} on the 1st to {month.weather.daylightEnd} on the last day
                </td>
              </tr>
            </tbody>
          </TableWrap>
          <p className="text-xs text-gray-500">
            Climate figures for Reykjavik from climatestotravel.com; daylight from worlddata.info,
            cross-checked against Icelandic operator daylight tables. Rainfall is given as wet days rather
            than millimetres because published Reykjavik rainfall totals differ materially between sources,
            from roughly 870mm to over 1,400mm a year. The monthly shape is reliable, the absolute total is
            not.
          </p>
          {month.weather.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-gray-700">
              {p}
            </p>
          ))}

          {/* 3. Crowds and prices */}
          <H2 id="crowds">Crowds, prices and what to book ahead</H2>
          <Capsule>{month.crowdsCapsule}</Capsule>
          <TableWrap>
            <thead>
              <tr>
                <th className={th}>Measure</th>
                <th className={th}>{month.name}</th>
                <th className={th}>Busiest month (August)</th>
                <th className={th}>Quietest month (December)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>Keflavik departures, 2025</td>
                <td className={`${td} font-semibold text-gray-900`}>{visitors.toLocaleString()}</td>
                <td className={td}>{VISITORS_2025.august.toLocaleString()}</td>
                <td className={td}>{VISITORS_2025.december.toLocaleString()}</td>
              </tr>
              <tr>
                <td className={td}>Hotel room occupancy, 2025</td>
                <td className={`${td} font-semibold text-gray-900`}>{occupancy}%</td>
                <td className={td}>{OCCUPANCY_2025.august}%</td>
                <td className={td}>{OCCUPANCY_2025.december}%</td>
              </tr>
              <tr>
                <td className={td}>Share of the 2025 total</td>
                <td className={`${td} font-semibold text-gray-900`}>
                  {((visitors / VISITORS_2025_TOTAL) * 100).toFixed(1)}%
                </td>
                <td className={td}>
                  {((VISITORS_2025.august / VISITORS_2025_TOTAL) * 100).toFixed(1)}%
                </td>
                <td className={td}>
                  {((VISITORS_2025.december / VISITORS_2025_TOTAL) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </TableWrap>
          <p className="text-xs text-gray-500">
            Visitor figures are departing passengers through Keflavik International Airport for the full
            year 2025, published by the Icelandic Tourist Board, total 2,267,638. Roughly 99 percent of
            visitors arrive and leave through Keflavik. Hotel room occupancy is Statistics Iceland table
            SAM01104, whole of Iceland, 2025.
          </p>
          {month.crowdsBody.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-gray-700">
              {p}
            </p>
          ))}

          {/* 4. The tours */}
          <H2 id="best-tours">The best tours in Iceland in {month.name}</H2>
          <Capsule>{month.toursCapsule}</Capsule>

          <ol className="mt-6 space-y-8">
            {picks.map((p) => (
              <li key={p.tour.slug} id={`tour-${p.position}`} className="scroll-mt-24">
                <h3 className="text-xl font-bold text-gray-900">
                  {p.position}. {displayName(p.tour)}
                </h3>
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:flex">
                  <TrackedGYGLink
                    href={p.tour.affiliateUrl}
                    tourName={displayName(p.tour)}
                    section={`month-${month.slug}-image`}
                    className="relative block aspect-[16/9] shrink-0 sm:aspect-auto sm:h-auto sm:w-56"
                  >
                    <Image
                      src={p.tour.imageUrl}
                      alt={p.tour.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 224px"
                    />
                  </TrackedGYGLink>
                  <div className="flex-1 p-4">
                    <p className="text-sm leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">Why it ranks here in {month.name}: </span>
                      {p.note}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.tour.excerpt}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span className="font-semibold text-amber-600">
                        {p.tour.rating} ({p.tour.reviewCount.toLocaleString()} reviews)
                      </span>
                      <span>{p.tour.duration}</span>
                      <span className="font-bold text-gray-900">
                        From <LocalPrice gbp={p.tour.price} />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <TrackedGYGLink
                        href={p.tour.affiliateUrl}
                        tourName={displayName(p.tour)}
                        section={`month-${month.slug}-book`}
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-500"
                      >
                        Check {month.name} availability
                      </TrackedGYGLink>
                      <Link
                        href={`/tours/${p.tour.slug}`}
                        className="text-sm font-medium text-green-700 hover:underline"
                      >
                        Full tour details
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* 5. Events */}
          <H2 id="events">
            Events and festivals in {month.name} {year}
          </H2>
          <Capsule>{month.eventsCapsule}</Capsule>
          <TableWrap>
            <thead>
              <tr>
                <th className={th}>Event</th>
                <th className={th}>Dates</th>
                <th className={th}>Where</th>
                <th className={th}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {month.events.map((e) => (
                <tr key={e.name}>
                  <td className={`${td} font-medium text-gray-900`}>{e.name}</td>
                  <td className={td}>{e.dates}</td>
                  <td className={td}>{e.where}</td>
                  <td className={td}>{e.cost}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          {month.eventsBody.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-gray-700">
              {p}
            </p>
          ))}
          <p className="mt-4 text-xs text-gray-500">
            We only list dates we can stand behind. Where a date follows a rule rather than a fixed day of
            the month, the rule is shown alongside it. Anything we could not verify is left off rather than
            guessed.
          </p>

          {/* 6. What is closed */}
          <H2 id="closed">What is closed or not bookable in {month.name}</H2>
          <Capsule>{month.closedCapsule}</Capsule>
          <div className="mt-4 space-y-4">
            {month.closures.map((c) => (
              <div key={c.what} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="font-semibold text-gray-900">{c.what}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{c.detail}</p>
              </div>
            ))}
          </div>
          {closedPicks.length > 0 && (
            <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Tours on this site that are out of season in {month.name}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                {closedPicks.map((c) => {
                  const t = getTourBySlug(c.slug);
                  if (!t) return null;
                  return (
                    <li key={c.slug}>
                      <span className="font-medium text-gray-900">{displayName(t)}:</span> {c.note}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* 7. What to pack */}
          <H2 id="pack">What to wear and pack for Iceland in {month.name}</H2>
          <Capsule>{month.packCapsule}</Capsule>
          <ul className="mt-4 list-disc space-y-1.5 pl-6 leading-relaxed text-gray-700">
            {month.packList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {/* 8. Methodology */}
          <H2 id="methodology">How we chose these tours</H2>
          <Capsule>
            Every tour on this page was scored for how relevant it genuinely is in {month.name}, then
            sorted by that score, then by verified GetYourGuide rating, then by verified review count.
            Anything out of season is excluded and named above rather than quietly left off.
          </Capsule>
          <p className="mt-4 leading-relaxed text-gray-700">
            Most month pages are a tour list with a date bolted on, which means the same ten tours appear
            for every month of the year. That is not useful. Our default site ordering is rating then review
            count, and both are static, so on that basis every month would produce an identical top ten. So
            each tour carries a separate seasonal relevance score for each month, from 6 for the single
            experience that defines the month down to 0 for anything genuinely out of season, and that
            score sorts the list first.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            Two consequences are worth stating plainly. First, the northern lights bus tour is the lowest
            rated tour on this site at 4.3 stars from 14,846 reviews. From November to March it is ranked
            first anyway, because in those months it is the reason people come and a top ten that buried it
            would be dishonest. Second, we do not rank on live GetYourGuide availability. Availability
            calendars reflect rolling booking windows rather than seasons, so a tour that is genuinely
            bookable next spring can look unavailable today. Season comes from published operator seasons,
            not from a booking widget.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            Prices, ratings, review counts, titles and durations were verified one by one against the live
            GetYourGuide listing for each product on 28 July 2026. We do not publish a rating or a review
            count we have not checked, and we do not publish a date, a season or a closure we cannot source.
            Where the honest answer is that we do not sell something, such as a natural ice cave tour, we
            say so and point you at what does exist instead.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            We earn a commission if you book through the links on this page, at no extra cost to you. That
            does not change the ranking. The tour ranked first in {month.name} is not the most expensive one
            on the list.
          </p>

          {/* 9. FAQs */}
          <FAQ faqs={month.faqs} title={`FAQs about Iceland in ${month.name}`} />

          {/* Adjacent months */}
          <nav className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href={`/iceland-in-${prev.slug}`}
              className="rounded-xl border border-gray-200 p-4 transition-colors hover:border-green-300"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Previous month
              </span>
              <span className="mt-1 block font-bold text-green-700">Iceland in {prev.name}</span>
              <span className="mt-1 block text-sm text-gray-600">{prev.season}</span>
            </Link>
            <Link
              href={`/iceland-in-${next.slug}`}
              className="rounded-xl border border-gray-200 p-4 transition-colors hover:border-green-300 sm:text-right"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Next month</span>
              <span className="mt-1 block font-bold text-green-700">Iceland in {next.name}</span>
              <span className="mt-1 block text-sm text-gray-600">{next.season}</span>
            </Link>
          </nav>

          {/* Browse CTA */}
          <div className="mt-10 rounded-xl bg-gradient-to-r from-green-700 to-emerald-800 p-5 text-center text-white sm:p-6">
            <p className="mb-1 text-lg font-bold">Travelling in a different month?</p>
            <p className="mb-4 text-sm text-green-100">
              Compare all twelve months side by side: weather, daylight, crowds, prices and what is actually
              open.
            </p>
            <Link
              href="/best-time-to-visit-iceland"
              className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-green-700 transition-colors hover:bg-green-50"
            >
              Best time to visit Iceland &rarr;
            </Link>
          </div>

          {/* Month strip */}
          <section className="mt-10 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Iceland month by month
            </h2>
            <div className="flex flex-wrap gap-2">
              {hubMonths.map((m) => {
                const isCurrent = m.slug === month.slug;
                const href = m.href ?? `/best-time-to-visit-iceland#${m.slug}`;
                return isCurrent ? (
                  <span
                    key={m.slug}
                    aria-current="page"
                    className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white"
                  >
                    {m.name}
                  </span>
                ) : (
                  <Link
                    key={m.slug}
                    href={href}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:border-green-300"
                  >
                    {m.name}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Deeper links */}
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Plan the rest of the trip</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tours" className="font-medium text-green-700 hover:underline">
                  All Iceland tours
                </Link>
                <span className="text-gray-600"> with verified prices, ratings and review counts</span>
              </li>
              <li>
                <Link href="/blog/top-10-tours" className="font-medium text-green-700 hover:underline">
                  The 10 best Iceland tours
                </Link>
                <span className="text-gray-600">, ranked for the whole year rather than one month</span>
              </li>
              <li>
                <Link
                  href="/blog/is-a-northern-lights-tour-worth-it"
                  className="font-medium text-green-700 hover:underline"
                >
                  Is a northern lights tour worth it?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/glacier-hike-vs-ice-cave-tour"
                  className="font-medium text-green-700 hover:underline"
                >
                  Glacier hike or ice cave: which to book
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/golden-circle-vs-south-coast-which-tour"
                  className="font-medium text-green-700 hover:underline"
                >
                  Golden Circle or South Coast: which day trip
                </Link>
              </li>
              <li>
                <Link href="/guides/first-time-in-iceland" className="font-medium text-green-700 hover:underline">
                  First time in Iceland
                </Link>
              </li>
              <li>
                <a
                  href={GYG_CITY_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="font-medium text-green-700 hover:underline"
                >
                  Browse the full Iceland catalogue on GetYourGuide
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>

      {lead && (
        <StickyBookingBar
          label={displayName(lead.tour)}
          sublabel={`Top pick for ${month.name} · Free cancellation on most options`}
          href={lead.tour.affiliateUrl}
          price={`£${lead.tour.price}`}
          ctaLabel="Book Now"
          external
        />
      )}
    </>
  );
}
