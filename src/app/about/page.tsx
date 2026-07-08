import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Best Iceland Tours helps visitors find and book the best tours, attractions, and experiences in Iceland. Learn more about who we are and what we do.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About Best Iceland Tours</h1>

      <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
        <p>
          Best Iceland Tours is your trusted guide to the best tours, attractions, and experiences in Iceland.
          We research, review, and recommend only the highest-rated activities, so you can spend less time
          planning and more time enjoying the city.
        </p>
        <p>
          Iceland is one of the most visited cities in the world, with thousands of tours and attractions
          competing for your attention. We cut through the noise by focusing on quality: every tour we
          feature has thousands of verified reviews and consistently high ratings from real visitors.
        </p>
        <p>
          Whether you are visiting Iceland for the first time or looking for something new, our curated
          selection covers landmarks, river cruises, day trips, food tours, and family activities. We
          also publish in-depth travel guides with insider tips, itineraries, and practical advice.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Work</h2>
        <p>
          When you book a tour through our site, we earn a small commission from the booking provider
          at no extra cost to you. This is how we keep the site running and the guides free. We only
          recommend tours we would book ourselves.
        </p>
        <p>
          Prices shown on our site are approximate and sourced from our booking partners. Final prices,
          availability, and terms are set by the tour provider. We encourage you to check the booking
          page for the most up-to-date information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get in Touch</h2>
        <p>
          Have a question, suggestion, or feedback? We would love to hear from you. Email us at{' '}
          <a href="mailto:contact@best-iceland-tours.com" className="text-blue-900 hover:underline">
            contact@best-iceland-tours.com
          </a>.
        </p>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Start Exploring</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/tours" className="text-blue-900 hover:underline font-medium">All Tours</Link>
            <span className="text-gray-300">|</span>
          <Link href="/guides" className="text-blue-900 hover:underline font-medium">Travel Guides</Link>
        </div>
      </div>
    </div>
  );
}
