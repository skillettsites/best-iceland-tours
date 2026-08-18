import { Tour, Category, Guide, FAQ, BlogPost } from './types';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DATA_CHECKED } from './constants';

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
    dateModified: DATA_CHECKED,
    name: tour.title,
    description: tour.description,
    url: `${SITE_URL}/tours/${tour.slug}`,
    image: tour.imageUrl || `${SITE_URL}/og-image.png`,
    category: 'Tours & Activities',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sku: tour.gygTourId,
    // Google needs the Brand type here, not Organization, and treats brand as the global
    // identifier when there is no gtin or mpn. The tours are sold by GetYourGuide rather
    // than by this site, so GetYourGuide is the accurate brand and seller.
    brand: {
      '@type': 'Brand',
      name: 'GetYourGuide',
    },
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
      availability: 'https://schema.org/InStock',
      url: tour.affiliateUrl,
      validFrom: DATA_CHECKED,
      priceValidUntil: '2027-12-31',
      seller: {
        '@type': 'Organization',
        name: 'GetYourGuide',
        url: 'https://www.getyourguide.com',
      },
    },
  };
}

export function touristTripSchema(tour: Tour) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    dateModified: DATA_CHECKED,
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

/**
 * Shape shared by the ranked product tables on the "which one" comparison guides.
 * Every comparison guide's products.ts satisfies this, so all of them get complete
 * merchant-listing markup from one place.
 */
export interface RankedProduct {
  name: string;
  gygTourId: string;
  href: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  fromAmount: number;
  fromCurrency: string;
  why: string;
}

/** A single ranked pick as a Product, with the fields Google's merchant listings expect. */
export function rankedProductSchema(item: RankedProduct) {
  return {
    '@type': 'Product',
    name: item.name,
    description: item.why,
    image: item.imageUrl,
    url: item.href,
    sku: item.gygTourId,
    brand: {
      '@type': 'Brand',
      name: 'GetYourGuide',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: item.rating,
      reviewCount: item.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      price: item.fromAmount,
      priceCurrency: item.fromCurrency,
      availability: 'https://schema.org/InStock',
      url: item.href,
      validFrom: DATA_CHECKED,
      priceValidUntil: '2027-12-31',
      seller: {
        '@type': 'Organization',
        name: 'GetYourGuide',
        url: 'https://www.getyourguide.com',
      },
    },
  };
}

/** The ranked picks on a comparison guide, in order. */
export function comparisonListSchema(name: string, items: RankedProduct[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: rankedProductSchema(item),
    })),
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

export function blogArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.heroImage,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
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
