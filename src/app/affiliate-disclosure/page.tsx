import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Learn how Best Iceland Tours earns revenue through affiliate partnerships with GetYourGuide and other booking platforms, and how this affects your experience.',
  alternates: { canonical: `${SITE_URL}/affiliate-disclosure` },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Affiliate Disclosure' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Affiliate Disclosure</h1>

      <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
        <p>Last updated: 20 March 2026</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How We Earn Revenue</h2>
        <p>
          Best Iceland Tours (best-iceland-tours.com) is a free travel guide that earns revenue through
          affiliate partnerships. When you click a link on our site and make a booking, we may earn a
          small commission from the booking provider. This comes at no extra cost to you. The price you
          pay is the same whether you use our link or go directly to the provider.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Our Affiliate Partners</h2>
        <p>
          Our primary affiliate partner is <strong>GetYourGuide</strong>, one of the world&apos;s largest
          online travel booking platforms. When you click a booking link on our site, you are taken to
          GetYourGuide&apos;s website where you can complete your purchase. GetYourGuide handles all payments,
          bookings, and customer service directly.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How Affiliate Links Work</h2>
        <p>
          Affiliate links contain a tracking code that tells GetYourGuide the booking came from our site.
          When you click one of our links, a small cookie is placed in your browser to track the referral.
          If you complete a booking during that cookie&apos;s lifespan, we receive a commission. This process
          is standard across the travel industry and does not affect the price you pay.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Pricing Information</h2>
        <p>
          Prices shown on our site are approximate and sourced from GetYourGuide at the time of writing.
          Actual prices may vary depending on the date, time, availability, and any promotions running at
          the time of booking. We recommend checking the current price on the booking page before completing
          your purchase.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Editorial Independence</h2>
        <p>
          Our editorial content is completely independent of our affiliate relationships. We choose which
          tours to feature based on genuine quality, visitor reviews, and value for money. We do not accept
          payment from tour operators to feature or promote specific tours. Our recommendations reflect our
          honest assessment of the best experiences available in Iceland.
        </p>
        <p>
          If a tour does not meet our quality standards, we will not recommend it regardless of the commission
          rate it offers. Our reputation depends on providing trustworthy, honest recommendations.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why We Use Affiliate Links</h2>
        <p>
          Running and maintaining a quality travel guide takes time and resources. Affiliate commissions
          allow us to keep the site free for all visitors while continuing to research, update, and improve
          our content. Without this revenue, we would not be able to offer the level of detail and coverage
          that we do.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact Us</h2>
        <p>
          If you have any questions about our affiliate relationships or how we earn revenue, please
          contact us at{' '}
          <a href="mailto:contact@best-iceland-tours.com" className="text-blue-900 hover:underline">
            contact@best-iceland-tours.com
          </a>.
        </p>
      </div>
    </div>
  );
}
