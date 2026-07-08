import { Tour, Category, Guide, FAQ } from './types';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants';

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Discover the best tours, attractions, and experiences in Iceland. Book tickets and save.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tours`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://postcodecheck.co.uk',
      'https://carcostcheck.co.uk',
      'https://findyourstay.com',
      'https://askyourstay.com',
      'https://aicareerswap.com',
      'https://guardmybusiness.com',
      'https://helpafterloss.co.uk',
      'https://helpafterlife.com',
      'https://the-best-tours.com',
      'https://daveknowsai.com',
      'https://davidskillett.com',
      'https://aibetfinder.com',
      'https://briefmynews.com',
    ],
  };
}

export function tourSchema(tour: Tour) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.title,
    description: tour.description,
    url: `${SITE_URL}/tours/${tour.slug}`,
    image: tour.imageUrl || `${SITE_URL}/og-image.png`,
    category: 'Tours & Activities',
    brand: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
      availability: 'https://schema.org/InStock',
      url: tour.affiliateUrl,
      priceValidUntil: '2027-12-31',
    },
  };
}

export function touristTripSchema(tour: Tour) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    url: `${SITE_URL}/tours/${tour.slug}`,
    image: tour.imageUrl,
    touristType: tour.bestFor,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
      availability: 'https://schema.org/InStock',
      url: tour.affiliateUrl,
    },
    provider: {
      '@type': 'Organization',
      name: 'GetYourGuide',
      url: 'https://www.getyourguide.com',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.highlights.map((h, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: h,
      })),
    },
  };
}

export function itemListSchema(tours: Tour[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: tours.length,
    itemListElement: tours.map((tour, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tour.title,
      url: `${SITE_URL}/tours/${tour.slug}`,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(guide: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    url: `${SITE_URL}/guides/${guide.slug}`,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function categorySchema(category: Category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `${SITE_URL}/category/${category.slug}`,
  };
}
