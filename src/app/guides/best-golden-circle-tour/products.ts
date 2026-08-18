import { GYG_CAMPAIGN, GYG_PARTNER_ID } from '@/lib/constants';

const PARAMS = `partner_id=${GYG_PARTNER_ID}&utm_medium=online_publisher&cmp=${GYG_CAMPAIGN}`;

function gygProduct(id: string): string {
  return `https://www.getyourguide.com/activity/-t${id}?${PARAMS}`;
}

export type RankedGoldenCircleTour = {
  rank: 1 | 2 | 3;
  badge: string;
  gygTourId: string;
  name: string;
  shortName: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  fromAmount: number;
  fromCurrency: string;
  duration: string;
  rating: number;
  reviewCount: number;
  bestFor: string;
  extras: string;
  groupSize: string;
  why: string;
  who: string;
};

// Live GetYourGuide figures taken from this site's own tour records in src/data/tours.ts,
// last aligned with DATA_CHECKED. Prices are the GetYourGuide from-price in GBP.
export const TOP_THREE: RankedGoldenCircleTour[] = [
  {
    rank: 1,
    badge: 'Best for almost everyone',
    gygTourId: '67012',
    name: 'Reykjavik: Golden Circle Full-Day Tour with Kerid Crater',
    shortName: 'Golden Circle Full-Day with Kerid',
    href: gygProduct('67012'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/2a355a5246981467.jpeg/145.jpg',
    imageAlt:
      'Gullfoss waterfall on the Golden Circle route in Iceland, full-day tour with Kerid crater product photo',
    fromAmount: 68,
    fromCurrency: 'GBP',
    duration: '7 - 8.5 hours',
    rating: 4.8,
    reviewCount: 26755,
    bestFor: 'The standard full-day Golden Circle',
    extras: 'Adds Kerid crater to the three classic stops',
    groupSize: 'Coach tour',
    why: 'This is the Golden Circle tour people actually book, and it wins on every measure that matters at once. It is the cheapest of the three at £68, the highest rated of the classic coach runs at 4.8, and it carries 26,755 reviews, more than any other tour on this site. It covers Thingvellir, Geysir and Gullfoss and adds the Kerid crater, which the shorter runs usually drop.',
    who: 'First-time visitors, anyone on a budget, and anyone who wants the full route rather than an abbreviated version of it.',
  },
  {
    rank: 2,
    badge: 'Best if you want a small group and a later start',
    gygTourId: '396783',
    name: 'Reykjavík: Golden Circle Afternoon Small Group Tour',
    shortName: 'Golden Circle Afternoon Small Group',
    href: gygProduct('396783'),
    imageUrl:
      'https://cdn.getyourguide.com/img/tour/970725f87f8ddad73355ec763b7edd6b679f7fdbf64781d4f62a175859c248fa.jpg/145.jpg',
    imageAlt:
      'Small group minibus at Thingvellir National Park on an afternoon Golden Circle tour from Reykjavik, product photo',
    fromAmount: 79,
    fromCurrency: 'GBP',
    duration: '6 hours',
    rating: 4.7,
    reviewCount: 1397,
    bestFor: 'A smaller vehicle and an afternoon departure',
    extras: 'Six hours rather than a full day',
    groupSize: 'Small group',
    why: 'The same three headline stops in a smaller vehicle, leaving in the afternoon rather than first thing. It is £11 more than the full-day coach and two hours shorter, so you are paying for the group size and the timing rather than for more sightseeing. Rated 4.7 from 1,397 reviews.',
    who: 'Anyone who does not want a full coach, anyone who lands late or hates early starts, and visitors in the long-daylight months when an afternoon departure still finishes in the light.',
  },
  {
    rank: 3,
    badge: 'Best if you want the Blue Lagoon on the same day',
    gygTourId: '302953',
    name: 'Reykjavik: Golden Circle, Kerid Crater, & Blue Lagoon Tour',
    shortName: 'Golden Circle and Blue Lagoon',
    href: gygProduct('302953'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/a4f5912d2dc95c8b.jpeg/145.jpg',
    imageAlt:
      'Blue Lagoon geothermal spa water beside the Golden Circle combined day tour from Reykjavik, product photo',
    fromAmount: 192,
    fromCurrency: 'GBP',
    duration: '11 hours',
    rating: 4.9,
    reviewCount: 5903,
    bestFor: 'Both headline attractions in one day',
    extras: 'Golden Circle, Kerid crater and Blue Lagoon admission',
    groupSize: 'Coach tour',
    why: 'The highest rated tour of the three at 4.9 from 5,903 reviews, and the only one that removes a whole logistics problem: it packages the Golden Circle and Blue Lagoon admission into one 11-hour day with the transport solved. At £192 it costs more than booking the £68 tour and lagoon entry separately, so you are paying for the transfer and the timing.',
    who: 'Visitors on a short trip who want both headline attractions done, and anyone without a hire car who does not want to arrange a separate Blue Lagoon transfer.',
  },
];
