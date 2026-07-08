// Maps the search strings used in guide pages to verified, correct GetYourGuide
// activity IDs so guide CTAs deep-link to the exact tour instead of a GYG search
// page (search URLs leak attribution and convert far worse than direct links).
// Every ID here was confirmed against GetYourGuide's own live activity title.
const SEARCH_TO_ID: Record<string, string> = {
  'Borough Market food tour London': '67794',
  'British Museum guided tour': '765419',
  'Harry Potter studio tour London': '52391',
  'Jack the Ripper tour London': '6005',
  'London Eye skip the line tickets': '170451',
  'London Royal Parks walking tour': '1205986',
  'London West End show tickets': '1029897',
  'London afternoon tea experience': '860156',
  'London bike tour': '15875',
  'London ghost walking tour': '56795',
  'London gin distillery tour': '1107345',
  'London gin distillery tour tasting': '1107345',
  'London historic pub tour': '27204',
  'London hop on hop off bus': '400017',
  'London hop on hop off bus tour': '400017',
  'Stonehenge Bath day trip from London': '52393',
  'Thames dinner cruise London': '5275',
  'Thames kayak tour London': '1256215',
  'Thames river cruise London': '71379',
  'Thames sightseeing cruise London': '71379',
  'The Shard sunset tickets London': '24625',
  'Tower of London tickets': '21253',
  'Westminster walking tour London': '511537',
  'Windsor Stonehenge Bath day tour from London': '7319',
};

const PARAMS = 'partner_id=LPT26IL&utm_medium=travel_agent&cmp=best_rome_tours';

// Returns a direct GetYourGuide activity URL for a known guide search string.
// Falls back to a GYG search URL only if the string is not mapped (so a future
// unmapped string degrades gracefully rather than breaking).
export function directGygUrl(search: string): string {
  const id = SEARCH_TO_ID[search];
  if (id) return `https://www.getyourguide.com/activity/-t${id}/?${PARAMS}`;
  return `https://www.getyourguide.com/s/?q=${encodeURIComponent(search)}&${PARAMS}`;
}
