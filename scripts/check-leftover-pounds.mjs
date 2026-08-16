import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (f) => readFileSync(join(root, f), 'utf8');

const slugPage = read('src/app/guides/[slug]/page.tsx');
const whichTicket = read('src/app/guides/best-blue-lagoon-tickets/page.tsx');
const guides = read('src/data/guides.ts');
const currency = read('src/lib/currency.ts');
const widget = read('src/app/guides/best-blue-lagoon-tickets/BlueLagoonWidget.tsx');

const errors = [];

if (!guides.includes("slug: 'blue-lagoon-vs-sky-lagoon'")) {
  errors.push('live vs-Sky slug must stay blue-lagoon-vs-sky-lagoon');
}
if (!guides.includes("slug: 'best-blue-lagoon-tickets'")) {
  errors.push('live which-ticket slug must stay best-blue-lagoon-tickets');
}
if (guides.includes('best-blue-lagoon-tickets-which-to-book')) {
  errors.push('do not invent a new which-ticket URL');
}

const vsSky = guides.slice(
  guides.indexOf("slug: 'blue-lagoon-vs-sky-lagoon'"),
  guides.indexOf("slug: 'skip-the-line-iceland'"),
);
const vsSkyHrefs = [...vsSky.matchAll(/https:\/\/www\.getyourguide\.com[^"' \s)]+/g)].map((m) => m[0]);
if (vsSkyHrefs.length < 3) errors.push(`expected at least 3 vs-Sky GYG hrefs, got ${vsSkyHrefs.length}`);
for (const href of vsSkyHrefs) {
  if (!href.includes('partner_id=LPT26IL')) errors.push(`missing LPT26IL: ${href}`);
  if (!href.includes('cmp=best_iceland_tours')) errors.push(`missing cmp=best_iceland_tours: ${href}`);
  if (/cmp=(best_london_tours|best_rome_tours|HTV|TU|TAB)/.test(href)) errors.push(`wrong-city cmp: ${href}`);
  if (href === 'https://www.getyourguide.com' || /getyourguide\.com\/?(\?|$)/.test(href)) {
    errors.push(`naked GYG href: ${href}`);
  }
}

if (/metaTitle: 'Blue Lagoon vs Sky Lagoon 2026: Compared From £/.test(guides)) {
  errors.push('vs-Sky metaTitle still has leftover £');
}
if (/Sky Lagoon from £86/.test(vsSky) && /metaDescription/.test(vsSky)) {
  errors.push('vs-Sky metaDescription still has leftover £');
}

if (!slugPage.includes('DisplayCopy') || !slugPage.includes('DisplayCopyHtml')) {
  errors.push('generic guide page must render copy through DisplayCopy / DisplayCopyHtml');
}
if (!slugPage.includes('text={pick.verdict}')) {
  errors.push('quick-pick verdicts must go through DisplayCopy');
}
if (!slugPage.includes('text={guide.excerpt}')) {
  errors.push('guide excerpt must go through DisplayCopy');
}
if (!slugPage.includes('<DisplayCopyHtml html={section.content} />')) {
  errors.push('guide body HTML must go through DisplayCopyHtml, not SSR displayCopy');
}
if (slugPage.includes('dangerouslySetInnerHTML={{ __html: displayCopy(section.content) }}')) {
  errors.push('guide body still freezes leftover € via SSR displayCopy');
}
if (!slugPage.includes('text={g.excerpt}')) {
  errors.push('related guide excerpts must go through DisplayCopy');
}

if (!whichTicket.includes('DisplayCopy')) {
  errors.push('which-ticket page must convert related excerpts with DisplayCopy');
}
if (whichTicket.includes('£') || whichTicket.includes('&pound;')) {
  errors.push('which-ticket page file has leftover £');
}

if (!widget.includes('data-gyg-currency={code}')) errors.push('widget must use visitor currency code');
if (/data-gyg-currency=\{?['"](EUR|GBP|ISK)['"]\}?/.test(widget) || widget.includes('SITE_CURRENCY')) {
  errors.push('widget locks currency to a city currency');
}

if (!currency.includes(".replace(/€(\\d+")) {
  errors.push('displayCopy must convert leftover € to the visitor currency');
}
if (!currency.includes(".replace(/£(\\d+")) {
  errors.push('displayCopy must convert leftover £ to the visitor currency');
}

const FALLBACK_RATES = { EUR: 1, GBP: 0.85, USD: 1.08 };
const formatPrice = (amount, fromCode, toCode) => {
  const fromRate = fromCode === 'EUR' ? 1 : FALLBACK_RATES[fromCode];
  const toRate = toCode === 'EUR' ? 1 : FALLBACK_RATES[toCode];
  const value = Math.round((amount / fromRate) * toRate);
  const symbol = toCode === 'USD' ? '$' : toCode === 'GBP' ? '£' : '€';
  return `${symbol}${value}`;
};
const displayCopy = (text, toCode) =>
  text
    .replace(/&pound;(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'GBP', toCode))
    .replace(/£(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'GBP', toCode))
    .replace(/&euro;(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'EUR', toCode))
    .replace(/€(\d+(?:,\d{3})*(?:\.\d+)?)/g, (_, raw) => formatPrice(Number(String(raw).replace(/,/g, '')), 'EUR', toCode));

const leftover = 'from £86 / £87 / £108 / £192 and leftover €102 / €127';
const usd = displayCopy(leftover, 'USD');
if (usd.includes('£') || usd.includes('€')) {
  errors.push(`visitor USD copy still has leftover currency: ${usd}`);
}
if (!usd.includes('$')) errors.push(`visitor USD copy missing $: ${usd}`);

if (errors.length) {
  console.error('FAIL');
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log(`OK leftover-£ checks; ${vsSkyHrefs.length} vs-Sky GYG hrefs stay LPT26IL + best_iceland_tours`);
