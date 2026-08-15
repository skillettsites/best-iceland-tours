import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const files = [
  'src/app/guides/best-whale-watching-iceland/products.ts',
  'src/app/guides/best-whale-watching-iceland/page.tsx',
  'src/app/guides/best-whale-watching-iceland/TopThreeCards.tsx',
  'src/app/guides/best-whale-watching-iceland/WhaleWatchingWidget.tsx',
  'src/data/guides.ts',
  'src/components/TrackedGYGLink.tsx',
];

const text = Object.fromEntries(files.map((f) => [f, readFileSync(join(root, f), 'utf8')]));
const pageBundle = [
  text['src/app/guides/best-whale-watching-iceland/products.ts'],
  text['src/app/guides/best-whale-watching-iceland/page.tsx'],
  text['src/app/guides/best-whale-watching-iceland/TopThreeCards.tsx'],
].join('\n');
const guideEntry = text['src/data/guides.ts'].split("slug: 'best-whale-watching-iceland'")[1]?.split("slug: '")[0] || '';

const errors = [];

const gygHrefs = [...`${pageBundle}\n${guideEntry}`.matchAll(/https:\/\/www\.getyourguide\.com[^"' \s)`]+/g)]
  .map((m) => m[0])
  .filter((href) => !href.includes('${'));
if (gygHrefs.length < 3) errors.push(`expected at least 3 GYG hrefs, got ${gygHrefs.length}`);
for (const href of gygHrefs) {
  if (!href.includes('partner_id=LPT26IL')) errors.push(`missing LPT26IL: ${href}`);
  if (!href.includes('cmp=best_iceland_tours')) errors.push(`missing cmp=best_iceland_tours: ${href}`);
  if (/cmp=(best_london_tours|best_rome_tours|HTV|TU|TAB)/.test(href)) errors.push(`leftover city cmp: ${href}`);
}

for (const id of ['t248622', 't402119', 't74963']) {
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

const cards = text['src/app/guides/best-whale-watching-iceland/TopThreeCards.tsx'];
if (!cards.includes('TrackedGYGLink')) errors.push('TopThreeCards must wrap CTAs in TrackedGYGLink');
if (!cards.includes('whale-watching-which-boat-cta')) errors.push('TopThreeCards missing which-boat CTA section');

const widget = text['src/app/guides/best-whale-watching-iceland/WhaleWatchingWidget.tsx'];
if (!widget.includes('data-gyg-currency={code}')) errors.push('widget must use visitor currency code');
if (/data-gyg-currency=\{?['"]EUR['"]\}?/.test(widget) || widget.includes('SITE_CURRENCY')) {
  errors.push('widget locks currency to EUR/SITE_CURRENCY');
}

const page = text['src/app/guides/best-whale-watching-iceland/page.tsx'];
if (page.includes('£') || page.includes('&pound;')) errors.push('dedicated page has leftover £');
if (guideEntry.includes('£') || guideEntry.includes('&pound;')) {
  errors.push('guides.ts whale-watching entry has leftover £');
}
if (page.includes('blue-lagoon') && /cdn\.getyourguide\.com.*Blue Lagoon/i.test(page)) {
  errors.push('page appears to reuse a Blue Lagoon image');
}

const products = text['src/app/guides/best-whale-watching-iceland/products.ts'];
if (!products.includes('GYG_PARTNER_ID') || !products.includes('GYG_CAMPAIGN')) {
  errors.push('products must build hrefs from GYG_PARTNER_ID and GYG_CAMPAIGN');
}
for (const url of [
  '97c3e549d7e1d7d93de8356bd5d2d1dd9732045127bef033571357c0601b6826',
  '60e875f0eb8e1',
  '5ab120b8cc17d',
]) {
  if (!products.includes(url)) errors.push(`missing this tour's own GYG photo hash ${url}`);
}

if (errors.length) {
  console.error('FAIL');
  for (const err of errors) console.error('-', err);
  process.exit(1);
}

console.log(`OK ${gygHrefs.length} GYG hrefs, tracker reused, visitor currency widget`);
