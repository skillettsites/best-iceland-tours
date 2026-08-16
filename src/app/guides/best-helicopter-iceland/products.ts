import { GYG_CAMPAIGN, GYG_PARTNER_ID } from '@/lib/constants';

const PARAMS = `partner_id=${GYG_PARTNER_ID}&utm_medium=online_publisher&cmp=${GYG_CAMPAIGN}`;

function gygProduct(id: string): string {
  return `https://www.getyourguide.com/activity/-t${id}?${PARAMS}`;
}

export type RankedFlight = {
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
  landing: string;
  why: string;
  who: string;
};

// Volcanic figures match this site's tours.ts catalogue row (GBP 400, 4.8, 539).
// Geothermal and Fire & Ice figures are live GetYourGuide widget amounts in GBP,
// checked 15 August 2026. JSON-LD stores those catalogue amounts; no invented convert.
export const TOP_THREE: RankedFlight[] = [
  {
    rank: 1,
    badge: 'Best for almost everyone',
    gygTourId: '418541',
    name: 'From Reykjavik: New Volcanic Area Helicopter Tour',
    shortName: 'New Volcanic Area',
    href: gygProduct('418541'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/d0957f109b48ba08.jpeg/145.jpg',
    imageAlt:
      'Helicopter over the Reykjanes Peninsula lava fields, New Volcanic Area Helicopter Tour product photo',
    fromAmount: 400,
    fromCurrency: 'GBP',
    duration: '40 minutes',
    rating: 4.8,
    reviewCount: 539,
    bestFor: 'The Reykjanes lava flyover',
    extras: 'Pilot commentary, small-group helicopter',
    landing: 'Flyover only; no landing required',
    why: 'This is the volcanic lava flight people actually book. It leaves Reykjavik for the Reykjanes Peninsula lava fields and the new volcanic area, in about 40 minutes. It is the most reviewed helicopter tour on this site, and it is the one almost everyone should start with.',
    who: 'First-time visitors who want the lava from the air without paying for glacier or geothermal landings, and anyone comparing a short helicopter add-on to a full-day bus tour.',
  },
  {
    rank: 2,
    badge: 'Best if you want a landing beside hot springs',
    gygTourId: '46584',
    name: '1-Hour Helicopter Tour in Iceland: The Geothermal Tour',
    shortName: 'Geothermal Tour',
    href: gygProduct('46584'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/59f7362412099.jpeg/145.jpg',
    imageAlt:
      'Helicopter over steaming geothermal landscape, 1-Hour Geothermal Tour product photo',
    fromAmount: 406,
    fromCurrency: 'GBP',
    duration: '1 hour',
    rating: 4.9,
    reviewCount: 286,
    bestFor: 'A 15-minute geothermal landing',
    extras: '15-minute landing beside remote hot springs',
    landing: 'One landing in a geothermal valley',
    why: 'The Geothermal Tour is a different flight, not a longer look at the same lava. You fly over Hengill hot springs, power plants, lava fields and craters, then land for about 15 minutes beside steaming ground. It is the highest-rated of these three, and it is the one to open if you specifically want to step out of the helicopter.',
    who: 'Visitors who want a landing without paying Fire and Ice money, and anyone who cares more about hot springs and mud pots than a new lava field from the air.',
  },
  {
    rank: 3,
    badge: 'Best if you want glacier and volcano landings',
    gygTourId: '418522',
    name: 'From Reykjavik: Fire And Ice Helicopter Tour with 2 Landings',
    shortName: 'Fire & Ice',
    href: gygProduct('418522'),
    imageUrl: 'https://cdn.getyourguide.com/img/tour/d4ac718215c24729.jpeg/145.jpg',
    imageAlt:
      'Helicopter landing on glacier and geothermal ground, Fire and Ice Helicopter Tour product photo',
    fromAmount: 714,
    fromCurrency: 'GBP',
    duration: '2 hours',
    rating: 4.8,
    reviewCount: 142,
    bestFor: 'Two landings: glacier and Hengill',
    extras: 'Landings on Þórisjökull glacier and at Hengill',
    landing: 'Two landings, about 15 minutes each',
    why: 'Fire and Ice is the premium two-landing flight, not a nicer seat on the volcanic lava tour. You land on Þórisjökull glacier and again in the Hengill geothermal valley, with a flyover of Glymur and Þingvellir. The from-price is roughly double the lava flight, and the review sample is thinner.',
    who: 'Couples and splurge travellers who will actually use both landings, and who have two hours rather than a 40-minute add-on.',
  },
];
