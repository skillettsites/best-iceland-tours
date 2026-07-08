import Link from 'next/link';
import { categories } from '@/data/categories';
import { tours } from '@/data/tours';
import { SITE_NAME, SITE_CITY, SITE_URL } from '@/lib/constants';

const popularTours = [...tours].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);
const contactEmail = `contact@${SITE_URL.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}`;

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#1e3a5f] via-blue-800 to-[#1e3a5f] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Book Your {SITE_CITY} Adventure
          </h2>
          <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Skip-the-line tickets, expert-led tours, and unforgettable experiences.
            Free cancellation on most bookings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#1e3a5f] font-bold text-base px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
              Browse All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <div className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center mb-3">
                <h3 className="text-white text-lg font-bold">{SITE_NAME}</h3>
              </Link>
              <p className="text-sm leading-relaxed mb-4">
                Helping visitors find and book the best tours, attractions, and experiences in {SITE_CITY}.
              </p>
              <div className="space-y-1.5">
                {['Free cancellation available', 'Best price guaranteed', 'Instant booking confirmation'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Most Popular Tours */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Most Popular</h4>
              <ul className="space-y-2">
                {popularTours.map((tour) => (
                  <li key={tour.slug}>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="text-sm hover:text-white transition-colors flex items-center justify-between gap-2 min-h-[32px]"
                    >
                      <span className="line-clamp-1">{tour.shortTitle}</span>
                      <span className="text-xs text-gray-500 shrink-0">from &pound;{tour.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/tours" className="text-sm hover:text-white transition-colors inline-flex items-center min-h-[32px]">
                    All Tours
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm hover:text-white transition-colors inline-flex items-center gap-2 min-h-[32px]"
                    >
                      <span>{cat.icon}</span>
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Information</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm hover:text-white transition-colors inline-flex items-center min-h-[32px]">About Us</Link></li>
                <li><Link href="/privacy" className="text-sm hover:text-white transition-colors inline-flex items-center min-h-[32px]">Privacy Policy</Link></li>
                <li><Link href="/affiliate-disclosure" className="text-sm hover:text-white transition-colors inline-flex items-center min-h-[32px]">Affiliate Disclosure</Link></li>
                <li><Link href="/terms" className="text-sm hover:text-white transition-colors inline-flex items-center min-h-[32px]">Terms of Use</Link></li>
              </ul>
            </div>
          </div>

          {/* Affiliate disclosure + copyright */}
          <div className="mt-10 pt-8 border-t border-gray-800">
            <div className="bg-gray-800/50 rounded-lg px-4 py-3 mb-6">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-300">Affiliate Disclosure:</span> {SITE_NAME}
                {' '}is an independent travel guide. We partner with GetYourGuide and other trusted booking platforms.
                When you book through our links, we may earn a small commission at no extra cost to you. This
                helps us keep the site running and provide free, honest recommendations. We only recommend tours
                and experiences we genuinely believe in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-gray-500 space-y-1">
                <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
                <p>Contact: <a href={`mailto:${contactEmail}`} className="hover:text-gray-300 transition-colors">{contactEmail}</a></p>
              </div>
              <p className="text-xs text-gray-500">
                Prices shown are approximate and may vary by date and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
