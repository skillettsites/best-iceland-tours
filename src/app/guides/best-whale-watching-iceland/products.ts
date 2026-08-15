import { GYG_CAMPAIGN, GYG_PARTNER_ID } from '@/lib/constants';

const PARAMS = `partner_id=${GYG_PARTNER_ID}&utm_medium=online_publisher&cmp=${GYG_CAMPAIGN}`;

function gygProduct(id: string): string {
  return `https://www.getyourguide.com/activity/-t${id}?${PARAMS}`;
}

export type RankedBoat = {
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
  boat: string;
  why: string;
  who: string;
};

// Live GetYourGuide figures from this site's whale-watching tour records
// (attraction hub + tours.ts), last aligned with DATA_CHECKED catalogue rows.
export const TOP_THREE: RankedBoat[] = [
  {
    rank: 1,
    badge: 'Best for almost everyone',
    gygTourId: '248622',
    name: 'Reykjavík: Whale Watching and Marine Life Cruise',
    shortName: 'Marine Life Cruise',
    href: gygProduct('248622'),
    imageUrl:
      'https://cdn.getyourguide.com/img/tour/97c3e549d7e1d7d93de8356bd5d2d1dd9732045127bef033571357c0601b6826.jpeg/145.jpg',
    imageAlt: 'Classic whale watching cruise boat on Faxafloi Bay with a humpback whale surfacing, Marine Life Cruise product photo',
    fromAmount: 72,
    fromCurrency: 'GBP',
    duration: '3 hours',
    rating: 4.5,
    reviewCount: 11257,
    bestFor: 'The standard classic-boat tour',
    extras: 'Heated cabin, toilets, cafe, outdoor decks',
    boat: 'Classic cruise boat',
    why: 'This is the classic boat people actually book. It sails from Reykjavik Old Harbour into Faxafloi Bay with a heated indoor cabin, toilets and a cafe. It is the most reviewed whale watching tour on this site, and it is the one almost everyone should start with.',
    who: 'First-time visitors, families, anyone who gets cold or seasick easily, and anyone who wants the cheaper, stabler ride rather than a RIB.',
  },
  {
    rank: 2,
    badge: 'Best if you want speed and closer views',
    gygTourId: '402119',
    name: 'Reykjavik: Whale Watching by RIB Speedboat',
    shortName: 'RIB Speedboat',
    href: gygProduct('402119'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/60e875f0eb8e1.jpeg/145.jpg',
    imageAlt: 'Yellow RIB speedboat with passengers in survival suits on a Reykjavik whale watching tour, product photo',
    fromAmount: 145,
    fromCurrency: 'GBP',
    duration: '2 hours',
    rating: 4.6,
    reviewCount: 796,
    bestFor: 'A faster, closer RIB ride',
    extras: 'Warm overalls, gloves and goggles',
    boat: 'RIB speedboat',
    why: 'The RIB is a different boat, not a nicer cabin on the same cruise. You sit in a rigid inflatable, wear a survival suit, and cover Faxafloi Bay faster. The from-price is roughly double the Marine Life Cruise, and it is not suitable for children under 10.',
    who: 'Couples and adventure travellers who want a shorter, wetter, more exhilarating ride and will actually use the closer viewpoint.',
  },
  {
    rank: 3,
    badge: 'Best if you want whales and puffins',
    gygTourId: '74963',
    name: 'Reykjavik: Whales and Puffins Express Cruise Combo Tour',
    shortName: 'Whales & Puffins combo',
    href: gygProduct('74963'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/5ab120b8cc17d.jpeg/145.jpg',
    imageAlt: 'Atlantic puffin on the water, Whales and Puffins Express Cruise Combo product photo',
    fromAmount: 100,
    fromCurrency: 'GBP',
    duration: '4 hours',
    rating: 4.5,
    reviewCount: 615,
    bestFor: 'Whales and puffins on one sailing',
    extras: 'Classic boat plus a puffin stop in season',
    boat: 'Classic combo cruise',
    why: 'This is the live combo on a regular boat, not a RIB. You get marine mammals plus puffins in season on one four-hour sailing. Book it when you specifically want both wildlife types. Puffins are a summer bird, so this is the wrong pick in winter.',
    who: 'Visitors in puffin season who want both wildlife types without paying RIB money, and who can spare a longer morning or afternoon.',
  },
];
