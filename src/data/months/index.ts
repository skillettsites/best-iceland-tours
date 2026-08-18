import { MonthData, yearForMonth, VISITORS_2025, OCCUPANCY_2025 } from './types';
import august from './august';
import september from './september';
import october from './october';
import november from './november';
import december from './december';
import january from './january';
import february from './february';
import march from './march';
import april from './april';
import may from './may';
import june from './june';
import july from './july';

export type { MonthData, MonthTourPick, MonthEvent, MonthClosure } from './types';
export { yearForMonth, MONTH_PAGE_BASE_YEAR, VISITORS_2025, VISITORS_2025_TOTAL, OCCUPANCY_2025 } from './types';

/** The twelve months with a dedicated page, in publication order (August 2026 through July 2027). */
export const months: MonthData[] = [
  august,
  september,
  october,
  november,
  december,
  january,
  february,
  march,
  april,
  may,
  june,
  july,
];

/** Calendar order, January to December, used by the hub and the footer month strip. */
export const monthsByCalendar: MonthData[] = [...months].sort((a, b) => a.index - b.index);

export function getMonthBySlug(slug: string): MonthData | undefined {
  return months.find((m) => m.slug === slug);
}

/** Previous and next month in calendar order, wrapping. Both always have a page. */
export function adjacentMonths(month: MonthData): { prev: MonthData; next: MonthData } {
  const ordered = monthsByCalendar;
  const i = ordered.findIndex((m) => m.slug === month.slug);
  return {
    prev: ordered[(i - 1 + ordered.length) % ordered.length],
    next: ordered[(i + 1) % ordered.length],
  };
}

/** A hub row on /best-time-to-visit-iceland, one per month, all linking to their own page. */
export interface HubMonth {
  name: string;
  slug: string;
  index: number;
  year: number;
  season: string;
  capsule: string;
  href: string;
  visitors: number;
  occupancy: number;
}

export const hubMonths: HubMonth[] = monthsByCalendar.map((m) => ({
  name: m.name,
  slug: m.slug,
  index: m.index,
  year: yearForMonth(m.index),
  season: m.season,
  capsule: m.hubCapsule,
  href: `/iceland-in-${m.slug}`,
  visitors: VISITORS_2025[m.slug],
  occupancy: OCCUPANCY_2025[m.slug],
}));
