import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { attractions, getAttractionBySlug } from '@/data/attractions';
import { getTourBySlug } from '@/data/tours';
import { itemListSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE_URL, SITE_CITY } from '@/lib/constants';
import TourCard from '@/components/ui/TourCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import FAQ from '@/components/ui/FAQ';
import TrackedGYGLink from '@/components/TrackedGYGLink';

export function generateStaticParams() {
  return attractions.map((a) => ({ slug: a.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAttractionBySlug(slug);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `${SITE_URL}/attractions/${a.slug}` },
    openGraph: { title: a.metaTitle, description: a.metaDescription, url: `${SITE_URL}/attractions/${a.slug}`, type: 'website' },
  };
}

export default async function AttractionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const a = getAttractionBySlug(slug);
  if (!a) notFound();

  const tours = a.tourSlugs.map((s) => getTourBySlug(s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const top = tours[0];
  const fromPrice = Math.min(...tours.map((t) => t.price).filter(Boolean));

  return (
    <>
      {[
        itemListSchema(tours),
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Attractions', url: `${SITE_URL}/attractions` },
          { name: a.name, url: `${SITE_URL}/attractions/${a.slug}` },
        ]),
        faqSchema(a.faqs),
      ].filter(Boolean).map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Attractions', href: '/attractions' }, { label: a.name }]} />

        <div className="mt-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{a.title}</h1>
          <p className="mt-3 text-lg text-gray-600">{a.intro}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {top && (
              <TrackedGYGLink
                href={top.affiliateUrl}
                tourName={a.name}
                section="attraction-hero-cta"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 shadow-sm transition-colors"
              >
                Book {a.name} tickets from &pound;{fromPrice}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </TrackedGYGLink>
            )}
            <span className="text-sm text-gray-500">{tours.length} option{tours.length === 1 ? '' : 's'} &middot; free cancellation on most</span>
          </div>
        </div>

        <div className="mt-6"><AffiliateDisclosure /></div>

        <h2 className="mt-10 mb-5 text-2xl font-bold text-gray-900">{a.name} tickets and tours, ranked</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tours.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{a.name} tickets: FAQ</h2>
          <FAQ faqs={a.faqs} />
        </section>

        <div className="mt-12 rounded-xl bg-gradient-to-r from-green-700 to-emerald-800 p-5 sm:p-6 text-center text-white">
          <p className="font-bold text-lg mb-1">Ready to book {a.name}?</p>
          <p className="text-sm text-green-100 mb-4">Compare all {a.name} options and book instantly through GetYourGuide. Free cancellation on most.</p>
          {top && (
            <TrackedGYGLink href={top.affiliateUrl} tourName={a.name} section="attraction-footer-cta" className="inline-block bg-white text-green-700 font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
              Check availability &rarr;
            </TrackedGYGLink>
          )}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Looking for more? Browse all <Link href="/tours" className="text-green-700 font-medium hover:underline">{SITE_CITY} tours</Link> or other <Link href="/attractions" className="text-green-700 font-medium hover:underline">{SITE_CITY} attractions</Link>.
        </p>
      </div>
    </>
  );
}
