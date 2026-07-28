export interface Tour {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  excerpt: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  reviewCount: number;
  imageAlt: string;
  imageUrl: string;
  categories: string[];
  highlights: string[];
  includes: string[];
  bestFor: string[];
  gygTourId: string;
  affiliateUrl: string;
  faqs: FAQ[];
  relatedSlugs: string[];
}

export interface Category {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  excerpt: string;
  icon: string;
  tourSlugs: string[];
  faqs: FAQ[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** Short direct answer rendered under the H1 for answer-engine and featured-snippet capture. */
  answerCapsule?: string;
  sections: GuideSection[];
  relatedTourSlugs: string[];
  faqs: FAQ[];
  publishedDate: string;
  updatedDate: string;
}

export interface GuideSection {
  heading: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  content: string;
  relatedTourSlugs: string[];
  relatedBlogSlugs: string[];
  faqs: FAQ[];
  publishedDate: string;
  updatedDate: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
