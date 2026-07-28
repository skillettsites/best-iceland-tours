import { MonthData, yearForMonth, MONTH_PAGE_BASE_YEAR, VISITORS_2025, OCCUPANCY_2025 } from './types';
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

export type { MonthData, MonthTourPick, MonthEvent, MonthClosure } from './types';
export { yearForMonth, MONTH_PAGE_BASE_YEAR, VISITORS_2025, VISITORS_2025_TOTAL, OCCUPANCY_2025 } from './types';

/** The ten months with a dedicated page, in publication order (August 2026 through May 2027). */
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

/**
 * A hub row. June and July have no dedicated page in this set, so they render as
 * anchored sections on the hub instead of linking out to a spoke that does not exist.
 */
export interface HubMonth {
  name: string;
  slug: string;
  index: number;
  year: number;
  season: string;
  capsule: string;
  /** null for June and July, which live on the hub only. */
  href: string | null;
  visitors: number;
  occupancy: number;
}

const juneCapsule =
  'The midnight sun month and the start of true peak season. Occupancy jumps to 79.7 percent and Keflavik departures to 233,802. The highland F-roads finally open through June: on 2026 actual dates F35 Kjolur opened between 1 and 6 June and F208 between 2 and 25 June. There is effectively no darkness.';

const julyCapsule =
  'One of the two warmest months and the second busiest, at 302,057 Keflavik departures and 87.8 percent occupancy. Every road is open, including the last of the F-roads: on 2026 actual dates F261 opened on 5 July and F26 Sprengisandur on 6 July. Expect summer rates roughly 25 to 35 percent above shoulder season.';

export const hubMonths: HubMonth[] = [
  ...monthsByCalendar.map((m) => ({
    name: m.name,
    slug: m.slug,
    index: m.index,
    year: yearForMonth(m.index),
    season: m.season,
    capsule: m.hubCapsule,
    href: `/iceland-in-${m.slug}`,
    visitors: VISITORS_2025[m.slug],
    occupancy: OCCUPANCY_2025[m.slug],
  })),
  {
    name: 'June',
    slug: 'june',
    index: 6,
    year: MONTH_PAGE_BASE_YEAR + 1,
    season: 'Peak season begins, midnight sun',
    capsule: juneCapsule,
    href: null,
    visitors: VISITORS_2025.june,
    occupancy: OCCUPANCY_2025.june,
  },
  {
    name: 'July',
    slug: 'july',
    index: 7,
    year: MONTH_PAGE_BASE_YEAR + 1,
    season: 'Peak season, still near round-the-clock light',
    capsule: julyCapsule,
    href: null,
    visitors: VISITORS_2025.july,
    occupancy: OCCUPANCY_2025.july,
  },
].sort((a, b) => a.index - b.index);
