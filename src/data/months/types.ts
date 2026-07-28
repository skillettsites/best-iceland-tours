import { FAQ } from '@/lib/types';

/**
 * ONE build-time year constant for the whole seasonal month set.
 * August to December use BASE_YEAR, January to July use BASE_YEAR + 1.
 * The year appears in the <title> tag and the events heading only. Never in a URL or an H1,
 * because year-in-URL orphans the page's authority every January.
 * Roll the whole set forward by changing this single number.
 */
export const MONTH_PAGE_BASE_YEAR = 2026;

/** Month index (1-12) to the display year used on that month's page. */
export function yearForMonth(monthIndex: number): number {
  return monthIndex >= 8 ? MONTH_PAGE_BASE_YEAR : MONTH_PAGE_BASE_YEAR + 1;
}

/**
 * Departing passengers through Keflavik International Airport, 2025 full year.
 * Source: Icelandic Tourist Board (Ferdamalastofa) / Isavia departure counts.
 * Total 2,267,638. Roughly 99 percent of visitors to Iceland arrive and leave through Keflavik.
 */
export const VISITORS_2025: Record<string, number> = {
  january: 121590,
  february: 148657,
  march: 152485,
  april: 149123,
  may: 159571,
  june: 233802,
  july: 302057,
  august: 312964,
  september: 224182,
  october: 201422,
  november: 141769,
  december: 120016,
};

export const VISITORS_2025_TOTAL = 2267638;

/**
 * Hotel room occupancy, whole of Iceland, 2025, percent.
 * Source: Statistics Iceland (Hagstofa Islands), table SAM01104.
 */
export const OCCUPANCY_2025: Record<string, number> = {
  january: 46.9,
  february: 62.8,
  march: 62.4,
  april: 56.6,
  may: 63.7,
  june: 79.7,
  july: 87.8,
  august: 89.8,
  september: 81.6,
  october: 72.5,
  november: 57.0,
  december: 45.3,
};

export interface MonthTourPick {
  /** Tour slug in src/data/tours.ts */
  slug: string;
  /**
   * Seasonal relevance for THIS month, 0 to 6.
   * 6 = the single reason people come this month
   * 5 = in season and at its best right now
   * 4 = in season and a strong pick
   * 3 = runs, but conditions are not what it is known for
   * 2 = runs, but this is the wrong month for it
   * 0 = not in season, excluded from the list and named in the closures section
   * Sorting is score desc, then GetYourGuide rating desc, then verified review count desc.
   */
  score: number;
  /** One line explaining why it sits where it does in THIS month. */
  note: string;
}

export interface MonthEvent {
  name: string;
  dates: string;
  where: string;
  cost: string;
}

export interface MonthClosure {
  what: string;
  detail: string;
}

export interface MonthWeather {
  highC: number;
  lowC: number;
  wetDays: number;
  /** Relative wetness wording. Absolute mm are not used: Reykjavik rainfall sources disagree materially. */
  rainNote: string;
  daylightMid: string;
  daylightStart: string;
  daylightEnd: string;
  capsule: string;
  body: string[];
}

export interface MonthData {
  /** URL slug fragment. The page lives at /iceland-in-{slug}/ with no year. */
  slug: string;
  name: string;
  /** 1-12 */
  index: number;
  season: string;
  /** 40 to 60 words, sits under the H1, no links, leads with the answer, contains a hard number. */
  capsule: string;
  verdict: string;
  verdictBody: string[];
  weather: MonthWeather;
  crowdsCapsule: string;
  crowdsBody: string[];
  toursCapsule: string;
  picks: MonthTourPick[];
  eventsCapsule: string;
  events: MonthEvent[];
  eventsBody: string[];
  closedCapsule: string;
  closures: MonthClosure[];
  packCapsule: string;
  packList: string[];
  faqs: FAQ[];
  /** 40 to 60 words for the /best-time-to-visit-iceland/ hub. */
  hubCapsule: string;
  metaDescription: string;
}
