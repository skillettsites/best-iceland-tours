import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';
import { SITE_URL, SITE_CITY, CONTENT_DATE } from '@/lib/constants';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const YEAR = new Date(CONTENT_DATE).getFullYear();

export const metadata: Metadata = {
  title: `${SITE_CITY} Travel Blog: Tour Guides & Tips ${YEAR}`,
  description: `Expert ${SITE_CITY} tour guides, rankings and tips. Find the best-rated experiences, skip-the-line tickets and day trips, with honest advice and direct booking.`,
  alternates: { canonical: `${SITE_URL}/blog` },
};

// Ordered list of posts. Code-driven posts (like the Top 10) stay accurate as
// ratings change; add new entries here as more posts ship.
const posts = [
  {
    href: '/blog/top-10-tours',
    title: `The 10 Best ${SITE_CITY} Tours for ${YEAR}`,
    excerpt: `Our definitive ranking of the top 10 ${SITE_CITY} tours by real rating and verified reviews, each with live prices and instant booking.`,
    image: [...tours].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)[0]?.imageUrl,
    tag: 'Rankings',
  },
];

export default function BlogIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'Blog', url: `${SITE_URL}/blog` },
            ])
          ),
        }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
        <header className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{SITE_CITY} Travel Blog</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl">
            Guides, rankings and practical tips to help you choose and book the best {SITE_CITY} experiences, with honest
            advice and direct booking through GetYourGuide.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {post.image && (
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 50vw" />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">{post.tag}</span>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  Read more
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
