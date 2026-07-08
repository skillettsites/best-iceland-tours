import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { SITE_NAME, SITE_CITY, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';
import { websiteSchema, organizationSchema } from '@/lib/schema';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GYGScript from '@/components/GYGScript';
import SiteStickyCTA from '@/components/SiteStickyCTA';
import { TrackPageview } from '@/components/TrackPageview';
import AffiliateClickTracker from '@/components/AffiliateClickTracker';
import MotionConfig from '@/components/ds/MotionConfig';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: Top-Rated Tours, Tickets & Day Trips`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME}: Top-Rated Tours, Tickets & Day Trips`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - the best tours and attractions in ${SITE_CITY}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME}: Top-Rated Tours, Tickets & Day Trips`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TrackPageview />
        <AffiliateClickTracker />
        <GoogleAnalytics />
        <GYGScript />
        <MotionConfig>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionConfig>
        <SiteStickyCTA />
        <Analytics />
      </body>
    </html>
  );
}
