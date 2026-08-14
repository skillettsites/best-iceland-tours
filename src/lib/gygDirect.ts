// Maps the search strings used in guide pages to verified, correct GetYourGuide
// activity IDs so guide CTAs deep-link to the exact tour instead of a GYG search
// page (search URLs leak attribution and convert far worse than direct links).
// IDs come only from this repo's tours.ts. Do not invent IDs.
import { GYG_CAMPAIGN, GYG_PARTNER_ID } from '@/lib/constants';
import { tours } from '@/data/tours';

const SEARCH_TO_ID: Record<string, string> = Object.fromEntries(
  tours.flatMap((t) => {
    const keys = new Set<string>([t.title, t.shortTitle]);
    return [...keys].map((key) => [key, t.gygTourId] as const);
  }),
);

const PARAMS = `partner_id=${GYG_PARTNER_ID}&utm_medium=travel_agent&cmp=${GYG_CAMPAIGN}`;

// Returns a direct GetYourGuide activity URL for a known guide search string.
// Falls back to a GYG search URL only if the string is not mapped (so a future
// unmapped string degrades gracefully rather than breaking).
export function directGygUrl(search: string): string {
  const id = SEARCH_TO_ID[search];
  if (id) return `https://www.getyourguide.com/activity/-t${id}/?${PARAMS}`;
  return `https://www.getyourguide.com/s/?q=${encodeURIComponent(search)}&${PARAMS}`;
}
