import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const files = [
  'src/app/guides/best-blue-lagoon-tickets/products.ts',
  'src/app/guides/best-blue-lagoon-tickets/page.tsx',
  'src/app/guides/best-blue-lagoon-tickets/TopThreeCards.tsx',
  'src/app/guides/best-blue-lagoon-tickets/BlueLagoonWidget.tsx',
  'src/data/guides.ts',
  'src/components/TrackedGYGLink.tsx',
  'src/components/AffiliateClickTracker.tsx',
];

const text = Object.fromEntries(files.map((f) => [f, readFileSync(join(root, f), 'utf8')]));
const pageBundle = [
  text['src/app/guides/best-blue-lagoon-tickets/products.ts'],
  text['src/app/guides/best-blue-lagoon-tickets/page.tsx'],
  text['src/data/guides.ts'],
].join('\n');

const errors = [];

const gygHrefs = [...pageBundle.matchAll(/https:\/\/www\.getyourguide\.com[^"' \s)`]+/g)]
  .map((m) => m[0])
  .filter((href) => !href.includes('${'));
if (gygHrefs.length < 3) errors.push(`expected at least 3 GYG hrefs, got ${gygHrefs.length}`);
for (const href of gygHrefs) {
  if (!href.includes('partner_id=LPT26IL')) errors.push(`missing LPT26IL: ${href}`);
  if (!href.includes('cmp=best_iceland_tours')) errors.push(`missing cmp=best_iceland_tours: ${href}`);
  if (/cmp=(best_london_tours|best_rome_tours|HTV|TU|TAB)/.test(href)) errors.push(`leftover city cmp: ${href}`);
}

for (const id of ['t393203', 't880939', 't347136']) {
  if (!pageBundle.includes(id.replace('t', '-t')) && !pageBundle.includes(id.slice(1))) {
    errors.push(`missing product id ${id}`);
  }
}

const tracker = text['src/components/TrackedGYGLink.tsx'];
if (!tracker.includes("new Blob([payload], { type: 'application/json' })")) {
  errors.push('TrackedGYGLink missing Blob application/json sendBeacon');
}
if (!tracker.includes('if (!queued) postWithFetch()')) {
  errors.push('TrackedGYGLink missing sendBeacon false fallback');
}
if (!tracker.includes('data-gyg-tracked="1"')) errors.push('TrackedGYGLink missing data-gyg-tracked="1"');
if (!tracker.includes('data-gyg-city={tourName}')) errors.push('TrackedGYGLink missing data-gyg-city');
if (!tracker.includes('data-gyg-section={section}')) errors.push('TrackedGYGLink missing data-gyg-section');

const affiliate = text['src/components/AffiliateClickTracker.tsx'];
if (!affiliate.includes("new Blob([payload], { type: 'application/json' })")) {
  errors.push('AffiliateClickTracker missing Blob application/json sendBeacon');
}
if (!affiliate.includes("getAttribute('data-gyg-tracked') === '1'")) {
  errors.push('AffiliateClickTracker must skip TrackedGYGLink doubles');
}

const widget = text['src/app/guides/best-blue-lagoon-tickets/BlueLagoonWidget.tsx'];
if (!widget.includes('data-gyg-currency={code}')) errors.push('widget must use visitor currency code');
if (/data-gyg-currency=\{?['"]EUR['"]\}?/.test(widget) || widget.includes('SITE_CURRENCY')) {
  errors.push('widget locks currency to EUR/SITE_CURRENCY');
}

const page = text['src/app/guides/best-blue-lagoon-tickets/page.tsx'];
if (page.includes('£') || page.includes('&pound;')) errors.push('dedicated page has leftover £');
const products = text['src/app/guides/best-blue-lagoon-tickets/products.ts'];
if (!products.includes('GYG_PARTNER_ID') || !products.includes('GYG_CAMPAIGN')) {
  errors.push('products must build hrefs from GYG_PARTNER_ID and GYG_CAMPAIGN');
}

if (errors.length) {
  console.error('FAIL');
  for (const err of errors) console.error('-', err);
  process.exit(1);
}

console.log(`OK ${gygHrefs.length} GYG hrefs, tracker hardened, visitor currency widget`);
