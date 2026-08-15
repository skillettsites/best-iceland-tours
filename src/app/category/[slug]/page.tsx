import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getToursByCategory } from '@/data/tours';
import { categorySchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE_URL, SITE_CITY } from '@/lib/constants';
import { displayCopy } from '@/lib/currency';
import TourCard from '@/components/ui/TourCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import FAQ from '@/components/ui/FAQ';

const categorySeoContent: Record<
  string,
  {
    paragraphs: string[];
    relatedGuides: { slug: string; title: string }[];
    relatedPosts?: { slug: string; title: string }[];
  }
> = {
  'day-trips': {
    paragraphs: [
      'Almost every Iceland day trip starts in Reykjavik, not somewhere else in the country. The city sits within striking distance of the Golden Circle, the south coast waterfalls and the whale-watching grounds of Faxafloi Bay, which is why most visitors book a hotel there and never move it.',
      'Day trips either collect you from a central Reykjavik hotel or meet at a city bus stop, so you do not need a hire car. Prices start from £68 for a full-day Golden Circle tour and £89 for the South Coast, and the Keflavik airport bus transfer runs from £28 each way. Cruise passengers have a dedicated 6.5-hour small-group Golden Circle tour from the cruise terminal.',
      'The best-rated departures sell out first in peak season, and the earliest slots go quickest because they reach the big stops ahead of the crowds. Most options are cancellable free of charge up to 24 hours before, so booking early costs nothing in flexibility.',
    ],
    relatedGuides: [
      { slug: 'best-day-trips-from-iceland', title: 'Best Day Trips from Reykjavik in 2026' },
      { slug: 'iceland-tours-on-a-budget', title: 'Iceland on a Budget: Cheapest Tours in 2026' },
    ],
    relatedPosts: [
      { slug: 'best-iceland-day-tours-from-reykjavik', title: 'The Best Iceland Day Tours from Reykjavik' },
      { slug: 'golden-circle-vs-south-coast-which-tour', title: 'Golden Circle vs South Coast: Which Iceland Tour Should You Book?' },
      { slug: 'how-to-get-around-iceland-tours-vs-rental-car', title: 'How to Get Around Iceland: Guided Tours vs Rental Car' },
    ],
  },
};

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${SITE_URL}/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTours = getToursByCategory(category.slug);

  return (
    <>
      {[
        categorySchema(category),
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: category.title, url: `${SITE_URL}/category/${category.slug}` },
        ]),
        faqSchema(category.faqs),
      ].filter(Boolean).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: category.title },
          ]}
        />

        <AffiliateDisclosure />

        <div className="mb-8">
          <span className="text-4xl mb-4 block">{category.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{category.title}</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl">{displayCopy(category.description)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        <FAQ faqs={category.faqs} />

        {/* Other Categories */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.filter(c => c.slug !== category.slug).map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:border-green-300 hover:shadow-sm transition-all duration-300"
              >
                {cat.icon} {cat.title}
              </Link>
            ))}
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-green-700 hover:border-green-300 hover:shadow-sm transition-all duration-300"
            >
              All {SITE_CITY} Tours
            </Link>
          </div>
        </section>

        {/* SEO Content Section */}
        {categorySeoContent[category.slug] && (
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.title} in {SITE_CITY}</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              {categorySeoContent[category.slug].paragraphs.map((p, i) => (
                <p key={i}>{displayCopy(p)}</p>
              ))}
            </div>

            {categorySeoContent[category.slug].relatedGuides.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Guides</h3>
                <ul className="space-y-2">
                  {categorySeoContent[category.slug].relatedGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={`/guides/${guide.slug}`} className="text-blue-900 hover:underline">
                        {guide.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(categorySeoContent[category.slug].relatedPosts?.length ?? 0) > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Read before you book</h3>
                <ul className="space-y-2">
                  {categorySeoContent[category.slug].relatedPosts!.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="text-blue-900 hover:underline">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
        {/* Internal links */}
        <section className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides" className="text-blue-900 hover:underline font-medium">Travel Guides</Link>
          </div>
        </section>
      </div>
    </>
  );
}
