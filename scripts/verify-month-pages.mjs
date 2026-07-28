import fs from 'fs';

const ms = ['august','september','october','november','december','january','february','march','april','may'];
const files = ms.map((m) => [`iceland-in-${m}`, `.next/server/app/iceland-in-${m}.html`]);
files.push(['best-time-to-visit-iceland', '.next/server/app/best-time-to-visit-iceland.html']);

let fail = 0;
const allLinks = new Set();

for (const [name, f] of files) {
  const h = fs.readFileSync(f, 'utf8');
  const em = (h.match(/—/g) || []).length;
  const en = (h.match(/–/g) || []).length;
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || 'NONE';
  const h1raw = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const h1 = h1raw.replace(/<[^>]*>/g, '').replace(/<!--[^>]*-->/g, '').trim();

  const body = h
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]*>/g, ' ');
  const words = body.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w)).length;

  // Normalise every escaping form Next.js emits before testing for tracking params. The RSC
  // flight payload uses / and &, the rendered HTML uses &amp;. Skipping this step
  // produces false "missing tracking" hits on the RSC copy of a perfectly good link.
  const normalised = h
    .replace(/\\u002F/g, '/')
    .replace(/\\u0026/g, '&')
    .replace(/&amp;/g, '&');
  const linkRe = /https:\/\/www\.getyourguide\.com\/activity\/-t\d+[^"'\\ <>]*/g;
  const raw = normalised.match(linkRe) || [];
  const links = [...new Set(raw)];
  links.forEach((l) => allLinks.add(l));
  const bad = links.filter((u) => !(u.includes('partner_id=LPT26IL') && u.includes('cmp=best_iceland_tours')));

  const schemas = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => x[1]);
  const types = [];
  let schemaOk = true;
  for (const s of schemas) {
    try {
      const o = JSON.parse(s.replace(/&quot;/g, '"'));
      types.push(o['@type']);
    } catch {
      schemaOk = false;
    }
  }

  const imgs = [...new Set((h.match(/https:\/\/cdn\.getyourguide\.com\/img\/tour\/[^"'\\ ]*/g) || []))];

  const yearInTitle = /20\d\d/.test(title);
  const yearInH1 = /20\d\d/.test(h1);
  const problems = [];
  if (em || en) problems.push(`dashes em=${em} en=${en}`);
  if (bad.length) { problems.push(`untracked links ${bad.length}`); bad.slice(0,3).forEach(b=>console.log("   BAD:",JSON.stringify(b))); }
  if (!schemaOk) problems.push('schema parse error');
  if (!yearInTitle) problems.push('no year in title');
  if (yearInH1) problems.push('YEAR IN H1');
  if (words < 1500) problems.push(`short (${words} words)`);
  if (problems.length) fail++;

  console.log(
    `${name.padEnd(28)} words=${String(words).padEnd(5)} gyg=${String(links.length).padEnd(3)} imgs=${String(imgs.length).padEnd(3)} schema=[${types.join(', ')}]`
  );
  console.log(`   title : ${title}`);
  console.log(`   h1    : ${h1}`);
  console.log(`   status: ${problems.length ? 'ISSUES -> ' + problems.join('; ') : 'OK'}`);
}

console.log(`\nUnique GetYourGuide links across the set: ${allLinks.size}`);
console.log(fail === 0 ? 'ALL PAGES PASS' : `${fail} page(s) with issues`);
fs.writeFileSync('scripts/.month-gyg-links.txt', [...allLinks].join('\n'));
