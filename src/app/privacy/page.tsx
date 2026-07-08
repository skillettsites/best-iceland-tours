import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Best Iceland Tours. Learn how we collect, use, and protect your data.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
        <p>Last updated: 20 March 2026</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Who We Are</h2>
        <p>
          Best Iceland Tours (best-iceland-tours.com) is operated by Skillett Sites. Our website helps visitors
          find and book tours and attractions in Iceland through affiliate partnerships with booking providers.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Information We Collect</h2>
        <p>
          We do not require you to create an account or provide personal information to use our site.
          We may collect anonymous usage data through:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Google Analytics: anonymous browsing data including pages visited, time on site, and device type</li>
          <li>Vercel Analytics: anonymous performance and usage data</li>
          <li>GetYourGuide: when you click an affiliate link, GetYourGuide may set cookies to track the referral</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Cookies</h2>
        <p>
          Our site uses cookies for analytics and affiliate tracking. These are:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Google Analytics cookies (_ga, _gid): used to distinguish users and sessions</li>
          <li>GetYourGuide cookies: used to attribute bookings to our affiliate account</li>
        </ul>
        <p>
          You can manage your cookie preferences using the banner that appears on your first visit.
          You can also disable cookies in your browser settings at any time. Note that disabling cookies
          may affect affiliate tracking but will not change the price you pay for any bookings.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Cookie Consent</h2>
        <p>
          On your first visit, we display a cookie consent banner at the bottom of the screen. You can
          choose to accept all cookies or limit usage to essential cookies only. Your preference is stored
          in your browser&apos;s local storage and remembered for future visits. You can clear this preference
          at any time by clearing your browser&apos;s local storage or site data.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Affiliate Links and Commission Tracking</h2>
        <p>
          Our site contains affiliate links to GetYourGuide and other booking platforms. When you click
          an affiliate link, the booking provider may place a cookie in your browser to attribute the
          referral to our site. If you complete a booking, we earn a small commission at no extra cost
          to you. This is how we fund the site and keep it free for all visitors.
        </p>
        <p>
          For full details about our affiliate partnerships, see our{' '}
          <a href="/affiliate-disclosure" className="text-blue-900 hover:underline">
            Affiliate Disclosure
          </a>.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">GetYourGuide Cookies and Tracking</h2>
        <p>
          GetYourGuide is our primary affiliate partner. When you interact with GetYourGuide content or
          click a booking link on our site, GetYourGuide may set cookies to track the referral and improve
          your booking experience. These cookies are governed by GetYourGuide&apos;s own privacy policy, which
          you can review on their website. We do not have access to the personal data GetYourGuide collects
          through these cookies.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Third-Party Links</h2>
        <p>
          Our site contains links to third-party booking providers (primarily GetYourGuide). When you click
          these links, you leave our site and are subject to the privacy policies of those providers. We
          encourage you to read their privacy policies before providing any personal information.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Your Rights</h2>
        <p>
          Under UK GDPR, you have the right to access, rectify, or delete any personal data we hold about
          you. Since we do not collect personal data directly, this is unlikely to apply. If you have
          questions, contact us at{' '}
          <a href="mailto:contact@best-iceland-tours.com" className="text-blue-900 hover:underline">
            contact@best-iceland-tours.com
          </a>.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be posted on this page
          with an updated date.
        </p>
      </div>
    </div>
  );
}
