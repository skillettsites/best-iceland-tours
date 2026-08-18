import { Metadata } from 'next';
import Link from 'next/link';
import {
  hubMonths,
  months,
  monthsByCalendar,
  MONTH_PAGE_BASE_YEAR,
  VISITORS_2025,
  VISITORS_2025_TOTAL,
} from '@/data/months';
import { SITE_NAME, SITE_URL, CONTENT_DATE } from '@/lib/constants';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQ from '@/components/ui/FAQ';

const PUBLISHED_DATE = '2026-07-28';
const YEARS = `${MONTH_PAGE_BASE_YEAR} to ${MONTH_PAGE_BASE_YEAR + 1}`;
const PAGE_URL = `${SITE_URL}/best-time-to-visit-iceland`;

const META_DESCRIPTION =
  'The best time to visit Iceland, month by month. Real daylight hours, Reykjavik temperatures, Icelandic Tourist Board visitor numbers and Statistics Iceland occupancy, plus what is actually open in each month.';

export const metadata: Metadata = {
  title: `Best Time to Visit Iceland: Month by Month Guide ${YEARS}`,
  description: META_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Best Time to Visit Iceland: Month by Month Guide ${YEARS}`,
    description: META_DESCRIPTION,
    url: PAGE_URL,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is the best month to visit Iceland?',
    answer:
      'September if you only get one trip, because it is the only month with an open northern lights season, an open whale watching season and 13 hours 8 minutes of daylight at the same time. May is the best value, with the driest weather and 63.7 percent hotel occupancy. For the aurora alone, November to January. For puffins, May to mid-August.',
  },
  {
    question: 'What is the cheapest month to visit Iceland?',
    answer:
      'February, April, May and October are the four cheapest months named by operators. December has the lowest hotel occupancy of the year at 45.3 percent, but that average hides a split month: roughly 20 December to 2 January prices at peak summer levels. For genuinely low prices across a whole month, take February, April, May or October.',
  },
  {
    question: 'When can you see the northern lights in Iceland?',
    answer:
      'The published season runs from 1 September to 15 April, with the peak from November to January. From mid-April to the end of August the sky over Reykjavik does not get dark enough, so the lights are impossible rather than merely unlikely, whatever the solar activity is doing.',
  },
  {
    question: 'When are the puffins in Iceland?',
    answer:
      'The published puffin season runs from 20 April to 20 August. May, June and July are the reliable months. Book the first three weeks of August rather than the last, because the colonies empty from around 20 August and by mid-September the cliffs are bare.',
  },
  {
    question: 'What is the quietest month in Iceland?',
    answer:
      'December on the raw numbers, at 120,016 Keflavik departures and 45.3 percent hotel occupancy, and January just behind at 121,590 and 46.9 percent. In practice January is quieter through the whole month, because December is emptied by its first three weeks and then filled by the festive fortnight.',
  },
  {
    question: 'When do the highland F-roads open in Iceland?',
    answer:
      'Between early June and early July, and the dates move every year with the snow. On 2026 actual dates F35 Kjolur opened between 1 and 6 June, F225 on 16 June, F206 on 20 June, F208 between 2 and 25 June, F261 on 5 July and F26 Sprengisandur on 6 July. They close again from around mid-September.',
  },
  {
    question: 'When can you visit a natural ice cave in Iceland?',
    answer:
      'November to March, with peak conditions from December to February, because the glacial meltwater has to stop before a cave is safe to enter. The Katla cave under Myrdalsjokull is the one natural cave open year-round. Perlan in Reykjavik has a man-made ice cave exhibit that is open all year.',
  },
  {
    question: 'Is the Blue Lagoon open, given the Reykjanes eruptions?',
    answer:
      'Yes, it is open and there is no active eruption. The eruption that began on 16 July 2025 ended on 5 August 2025 and was the twelfth on the Reykjanes peninsula since March 2021. Magma continues to accumulate at Svartsengi and further eruptions are considered likely. Closures since 2023 have been precautionary and short. Check the operator before you travel.',
  },
];

function th(extra = '') {
  return `bg-gray-50 px-3 py-2.5 text-left font-semibold text-gray-900 border-b border-gray-200 ${extra}`;
}
const td = 'px-3 py-2.5 align-top text-gray-700 border-b border-gray-100';

export default function BestTimeToVisitIcelandPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Time to Visit Iceland: Month by Month',
    description: META_DESCRIPTION,
    url: PAGE_URL,
    datePublished: PUBLISHED_DATE,
    dateModified: CONTENT_DATE,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    about: { '@type': 'Place', name: 'Iceland' },
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Iceland month by month',
    numberOfItems: hubMonths.length,
    itemListElement: hubMonths.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Iceland in ${m.name}`,
      url: `${SITE_URL}${m.href}`,
    })),
  };

  const schemas = [
    articleSchema,
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Best Time to Visit Iceland', url: PAGE_URL },
    ]),
    itemList,
    faqSchema(faqs),
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
          items={[{ label: 'Home', href: '/' }, { label: 'Best Time to Visit Iceland' }]}
        />

        <article>
          <header>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Best Time to Visit Iceland: Month by Month
            </h1>
            <p className="mt-4 rounded-xl border-l-4 border-green-600 bg-green-50 px-4 py-3 text-base leading-relaxed text-gray-800">
              September is the best all-round month, the only one with an open northern lights season, an
              open whale season and 13 hours of daylight together. May is the best value at 63.7 percent
              occupancy and the driest weather outside high summer. June is the driest month overall. For the aurora alone, come between November and January,
              when the nights run to 19 hours.
            </p>
            <time className="mt-3 block text-sm text-gray-500" dateTime={CONTENT_DATE}>
              Updated{' '}
              {new Date(CONTENT_DATE).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </header>

          {/* Quick answers */}
          <h2 id="quick-answers" className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
            The short answer, by what you want
          </h2>
          <div className="my-5 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className={th()}>If you want</th>
                  <th className={th()}>Go in</th>
                  <th className={th()}>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>The best all-round trip</td>
                  <td className={td}>September</td>
                  <td className={td}>
                    Aurora season opens 1 September, whales still running, 13h 08m of daylight
                  </td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>Northern lights</td>
                  <td className={td}>November to January</td>
                  <td className={td}>The peak of the 1 September to 15 April season, up to 19 hours of dark</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>Aurora plus a usable day</td>
                  <td className={td}>October or March</td>
                  <td className={td}>Dark nights with 10 to 12 hours of daylight either side</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>The lowest prices</td>
                  <td className={td}>February, April, May or October</td>
                  <td className={td}>The four months operators name as cheapest</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>An empty country</td>
                  <td className={td}>January, or 1 to 18 December</td>
                  <td className={td}>46.9 and 45.3 percent hotel occupancy, the two lowest of the year</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>Puffins</td>
                  <td className={td}>May to mid-August</td>
                  <td className={td}>Published colony season 20 April to 20 August</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>Whales</td>
                  <td className={td}>June to August</td>
                  <td className={td}>Peak of the April to October season</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>Natural ice caves</td>
                  <td className={td}>December to February</td>
                  <td className={td}>Peak of the November to March Vatnajokull season</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>The driest weather</td>
                  <td className={td}>June</td>
                  <td className={td}>Around 9 wet days and 43.3mm, the lowest of the year</td>
                </tr>
                <tr>
                  <td className={`${td} font-medium text-gray-900`}>The highlands and F-roads</td>
                  <td className={td}>July and August</td>
                  <td className={td}>
                    F-roads open between early June and early July and close from mid-September
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master comparison table */}
          <h2 id="compare" className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
            Iceland month by month, compared
          </h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            Reykjavik daylight and temperature against the two numbers most guides do not publish: how many
            people actually came, and how full the hotels actually were. Both are official 2025 figures.
          </p>
          <div className="my-5 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className={th()}>Month</th>
                  <th className={th()}>High / low</th>
                  <th className={th()}>Daylight, mid-month</th>
                  <th className={th()}>Visitors (2025)</th>
                  <th className={th()}>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {hubMonths.map((hm) => {
                  const full = monthsByCalendar.find((m) => m.slug === hm.slug);
                  return (
                    <tr key={hm.slug}>
                      <td className={`${td} font-medium text-gray-900`}>
                        <Link href={hm.href} className="text-green-700 hover:underline">
                          {hm.name}
                        </Link>
                      </td>
                      <td className={td}>
                        {full ? `${full.weather.highC}C / ${full.weather.lowC}C` : 'See section'}
                      </td>
                      <td className={td}>{full ? full.weather.daylightMid : 'Near round-the-clock'}</td>
                      <td className={td}>{hm.visitors.toLocaleString()}</td>
                      <td className={td}>{hm.occupancy}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            Visitors are departing passengers through Keflavik International Airport for the full year 2025,
            published by the Icelandic Tourist Board, total {VISITORS_2025_TOTAL.toLocaleString()}. Roughly
            99 percent of visitors arrive and leave through Keflavik, so this is the closest thing to a true
            monthly visitor count. Occupancy is Statistics Iceland table SAM01104, hotel rooms, whole of
            Iceland, 2025. August is {(VISITORS_2025.august / VISITORS_2025.december).toFixed(1)} times
            busier than December. Reykjavik temperatures from climatestotravel.com and daylight from
            worlddata.info, cross-checked against Icelandic operator daylight tables. June and July have no
            dedicated page in this set yet, so their rows link to the sections below.
          </p>

          {/* Seasons */}
          <h2 id="seasons" className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
            Iceland’s three seasons, in plain terms
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            <strong>Peak</strong> is late June, July and August, with September behaving as peak-lite at
            81.6 percent occupancy. Everything is open, the F-roads are passable, the boats are running and
            summer Reykjavik hotel rates run roughly 25 to 35 percent above shoulder season. August 2025 was
            the biggest month Iceland has recorded, at {VISITORS_2025.august.toLocaleString()} Keflavik
            departures.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            <strong>Shoulder</strong> is May, September, October and late April. This is where the value is,
            because you keep most of the access and lose most of the crowd. May and October in particular
            give you long enough days to do a lot at occupancy in the 60s and low 70s.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            <strong>Low</strong> is November, January, February, March, early December and much of April.
            The days are short, the weather cancels tours, and the prices reflect it. This is also when the
            aurora and the natural ice caves exist at all, which is why low season in Iceland is not a
            consolation prize the way it is elsewhere.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            One warning about December, because most guides get it wrong. The occupancy data says December
            is the emptiest month of the year at 45.3 percent, and that is true as a monthly average. But
            roughly 20 December to 2 January prices at peak summer levels or above, while the three weeks
            before it are genuinely dead. So December is cheap only if you avoid the festive fortnight. For
            the cheapest month overall, take February, April, May or October. For the emptiest, take January
            or the first half of December.
          </p>

          {/* Volcano / Blue Lagoon status */}
          <h2 id="volcano" className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
            Blue Lagoon and the Reykjanes eruptions: current position
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            The Blue Lagoon is open and there is no active eruption. The eruption that started on 16 July
            2025 ended on 5 August 2025, and it was the twelfth on the Reykjanes peninsula since March 2021.
            Magma continues to accumulate at Svartsengi and further eruptions are considered likely. The
            closures since 2023 have been precautionary and short rather than long shutdowns, and they have
            not affected Reykjavik, the Golden Circle or the South Coast. Check the operator’s own status
            page before you travel, and pick a booking with free cancellation.
          </p>

          {/* Month by month */}
          <h2 id="month-by-month" className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
            Iceland month by month
          </h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            Each month below has its own page with a full weather table, the events calendar, what is closed
            and a top ten ranked for that month specifically rather than for the year.
          </p>

          <div className="mt-6 space-y-8">
            {hubMonths.map((hm) => (
              <section key={hm.slug} id={hm.slug} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  <Link href={hm.href} className="text-gray-900 hover:text-green-700">
                    Iceland in {hm.name}
                  </Link>
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                  {hm.season}
                </p>
                <p className="mt-2 leading-relaxed text-gray-700">{hm.capsule}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span>{hm.visitors.toLocaleString()} visitors in 2025</span>
                  <span>{hm.occupancy}% hotel occupancy</span>
                </div>
                <Link
                  href={hm.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline"
                >
                  Iceland in {hm.name}: weather, events and the best tours &rarr;
                </Link>
              </section>
            ))}
          </div>

          {/* Methodology */}
          <h2 id="methodology" className="mt-12 scroll-mt-24 text-2xl font-bold text-gray-900 sm:text-3xl">
            How this guide is put together
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            Visitor numbers are Icelandic Tourist Board departure counts through Keflavik for the full year
            2025. Hotel occupancy is Statistics Iceland table SAM01104. Daylight is from worlddata.info,
            cross-checked against Icelandic operator daylight tables, and the June and July figures are
            calculated for Reykjavik directly. Reykjavik climate for August through May is from
            climatestotravel.com; the June and July figures are Icelandic Met Office records for
            Reykjavik station 1 over the 1991 to 2020 standard period. We publish wet days in preference
            to millimetres because published Reykjavik rainfall totals differ materially between sources,
            and quote millimetres only where they come from the Met Office series itself.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            Tour seasons come from published operator seasons rather than from live booking calendars,
            because availability calendars reflect rolling booking windows rather than seasons. Every tour
            price, rating, review count, title and duration on the month pages was verified one by one
            against the live GetYourGuide listing on 28 July 2026. We do not publish a date, a price or a
            season we cannot source, and where we do not sell something, such as a natural ice cave tour, we
            say so rather than implying otherwise.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            We earn a commission if you book through the links on these pages, at no extra cost to you. It
            does not change the rankings.
          </p>

          <FAQ faqs={faqs} title="Best time to visit Iceland: FAQs" />

          {/* Month strip */}
          <section className="mt-12 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Jump to a month
            </h2>
            <div className="flex flex-wrap gap-2">
              {hubMonths.map((m) => (
                <Link
                  key={m.slug}
                  href={m.href}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:border-green-300"
                >
                  {m.name}
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {months.length} months have a dedicated guide. June and July are covered on this page.
            </p>
          </section>

          <div className="mt-8 rounded-xl bg-gradient-to-r from-green-700 to-emerald-800 p-5 text-center text-white sm:p-6">
            <p className="mb-1 text-lg font-bold">Know your dates already?</p>
            <p className="mb-4 text-sm text-green-100">
              Browse every Iceland tour with verified prices, ratings and review counts.
            </p>
            <Link
              href="/tours"
              className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-green-700 transition-colors hover:bg-green-50"
            >
              See all Iceland tours &rarr;
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
