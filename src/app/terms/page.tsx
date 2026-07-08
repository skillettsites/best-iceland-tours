import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Best Iceland Tours. Read our terms and conditions for using the website.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>

      <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
        <p>Last updated: 19 March 2026</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">About This Website</h2>
        <p>
          Best Iceland Tours (best-iceland-tours.com) is an affiliate website that recommends tours and
          attractions in Iceland. We do not sell tickets directly. When you click a booking link on our
          site, you are redirected to a third-party provider (such as GetYourGuide) where the transaction
          takes place.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Affiliate Disclosure</h2>
        <p>
          We earn a commission on bookings made through links on our site. This does not affect the price
          you pay. Our recommendations are based on ratings, reviews, and quality, not on commission rates.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Pricing and Availability</h2>
        <p>
          Prices shown on our site are approximate and may change without notice. Final pricing,
          availability, and booking terms are determined by the tour provider. We make every effort
          to keep information accurate but cannot guarantee it at all times.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Intellectual Property</h2>
        <p>
          All content on this website, including text, design, and graphics, is the property of
          Skillett Sites and is protected by UK copyright law. You may not reproduce, distribute,
          or republish any content without prior written permission.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Limitation of Liability</h2>
        <p>
          We provide information on this site for general guidance only. We are not liable for any
          loss, damage, or inconvenience arising from your use of this website or from bookings
          made through third-party providers linked from this site.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Governing Law</h2>
        <p>
          These terms are governed by the laws of England and Wales. Any disputes will be subject
          to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
        <p>
          For questions about these terms, contact us at{' '}
          <a href="mailto:contact@best-iceland-tours.com" className="text-blue-900 hover:underline">
            contact@best-iceland-tours.com
          </a>.
        </p>
      </div>
    </div>
  );
}
