import { GYG_CAMPAIGN, GYG_PARTNER_ID } from '@/lib/constants';

const PARAMS = `partner_id=${GYG_PARTNER_ID}&utm_medium=online_publisher&cmp=${GYG_CAMPAIGN}`;

function gygProduct(id: string): string {
  return `https://www.getyourguide.com/activity/-t${id}?${PARAMS}`;
}

export type RankedTicket = {
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
  privacy: string;
  why: string;
  who: string;
};

// Live GetYourGuide figures checked 15 August 2026 (partner widget, currency=EUR).
// Comfort catalogue row on this site is still stored as GBP 108 (matches €126).
export const TOP_THREE: RankedTicket[] = [
  {
    rank: 1,
    badge: 'Best for almost everyone',
    gygTourId: '393203',
    name: 'Official Blue Lagoon Iceland: Comfort admission',
    shortName: 'Comfort admission',
    href: gygProduct('393203'),
    imageUrl:
      'https://cdn.getyourguide.com/img/tour/505136a2cb7147dbe4d05d74383aea532ae05da392b3c1de5de7bbb6bf8014b5.jpg/145.jpg',
    imageAlt: 'Milky-blue geothermal water of the Blue Lagoon in a black lava field, Comfort admission product photo',
    fromAmount: 108,
    fromCurrency: 'GBP',
    duration: '1 day',
    rating: 4.6,
    reviewCount: 6109,
    bestFor: 'The standard Blue Lagoon ticket',
    extras: 'Towel, one drink, one silica mask',
    privacy: 'Shared lagoon and changing rooms',
    why: 'This is the official Comfort ticket people actually book. It covers the lagoon, a towel, a drink at the in-water bar and a silica mud mask. It is the most reviewed Blue Lagoon package on GetYourGuide, and it is the one almost everyone should start with.',
    who: 'First-time visitors, airport-day soaks, and anyone who wants the famous lagoon without paying for a robe, extra masks or a private suite.',
  },
  {
    rank: 2,
    badge: 'Best if you want the extras',
    gygTourId: '880939',
    name: 'Blue Lagoon: Premium Admission with Drinks and Face Masks',
    shortName: 'Premium admission',
    href: gygProduct('880939'),
    imageUrl:
      'https://cdn.getyourguide.com/img/tour/421526fdc60102518b7e297496cd3cbb386125cef5bca463f7f32d391547f8e8.jpg/145.jpg',
    imageAlt: 'Blue Lagoon Premium admission product photo of the geothermal lagoon and lava field',
    fromAmount: 146,
    fromCurrency: 'EUR',
    duration: '5 hours',
    rating: 4.6,
    reviewCount: 607,
    bestFor: 'A robe, extra drinks and extra masks',
    extras: 'Bathrobe, extra drinks, extra face masks',
    privacy: 'Same public lagoon as Comfort',
    why: 'Premium is the mid-tier official package on the same lagoon, not a quieter pool. You are paying for a bathrobe, extra drinks at the swim-up bar and extra masks at the mask bar. The water and the lava field are the same as Comfort.',
    who: 'Couples and anyone who already wants Comfort and would rent a robe and buy extra drinks anyway.',
  },
  {
    rank: 3,
    badge: 'Best if you want the private spa',
    gygTourId: '347136',
    name: 'Official Blue Lagoon: Retreat Spa & Private Changing Suite',
    shortName: 'Retreat Spa',
    href: gygProduct('347136'),
    imageUrl:
      'https://cdn.getyourguide.com/img/tour/113e3ef05a71d24e5db6ea5953f92c068fd843bb5bf0f3b536f4cb3e21693ad0.jpg/145.jpg',
    imageAlt: 'Blue Lagoon Retreat Spa product photo of the private subterranean spa and lagoon',
    fromAmount: 768,
    fromCurrency: 'EUR',
    duration: '5 hours',
    rating: 4.7,
    reviewCount: 40,
    bestFor: 'A private changing suite and the Retreat Lagoon',
    extras: 'Private suite, Retreat Lagoon, spa ritual',
    privacy: 'Private suite; far quieter than the main lagoon',
    why: 'Retreat is a different building, not a nicer Comfort ticket. GetYourGuide lists a five-hour private-group visit with a private changing suite and the subterranean Retreat Spa. The from-price is for that suite experience, and the review sample is thin compared with Comfort.',
    who: 'Couples or two guests who want privacy and will actually use a five-hour spa, not visitors who only want the famous public lagoon photo.',
  },
];
