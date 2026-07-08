import { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'skip-the-line',
    title: 'Skip-the-Line Tickets',
    metaTitle: 'Skip-the-Line Tickets in Iceland 2026',
    metaDescription: 'Browse the best skip-the-line tickets in Iceland. Instant confirmation and free cancellation on most bookings via GetYourGuide.',
    description: 'The best skip-the-line tickets in Iceland, hand-picked from the top-rated experiences on GetYourGuide. Book ahead for the best availability, skip the queues where offered, and enjoy free cancellation on most options.',
    excerpt: 'Top-rated skip-the-line tickets in Iceland, booked direct through GetYourGuide.',
    icon: '🎟️',
    tourSlugs: ['reykjavik-sky-lagoon-entrance-pass-with-7-step-spa-ritual', 'reykjavik-lava-show-immersive-experience-entry-ticket', 'reykjavik-flyover-iceland-entry-ticket'],
    faqs: [
      { question: 'How do I book skip-the-line tickets in Iceland?', answer: 'Choose a tour below and book directly through GetYourGuide. You get instant confirmation and a mobile ticket.' },
      { question: 'Is free cancellation available?', answer: 'Most experiences offer free cancellation up to 24 hours before. Check the individual booking page for details.' },
    ],
  },
  {
    slug: 'guided-tours',
    title: 'Guided Tours',
    metaTitle: 'Guided Tours in Iceland 2026',
    metaDescription: 'Browse the best guided tours in Iceland. Instant confirmation and free cancellation on most bookings via GetYourGuide.',
    description: 'The best guided tours in Iceland, hand-picked from the top-rated experiences on GetYourGuide. Book ahead for the best availability, skip the queues where offered, and enjoy free cancellation on most options.',
    excerpt: 'Top-rated guided tours in Iceland, booked direct through GetYourGuide.',
    icon: '🧑‍🏫',
    tourSlugs: ['reykjavik-golden-circle-full-day-tour-with-kerid-crater', 'reykjav-k-south-coast-waterfalls-black-sand-and-glacier-tour', 'reykjavik-guided-foodie-walking-tour-with-6-tastings', 'reykjavik-golden-circle-kerid-crater-and-blue-lagoon-tour', 'reykjav-k-golden-circle-afternoon-small-group-tour', 'reykjavik-1-hour-puffin-watching-tour', 'reykjavik-whales-and-puffins-express-cruise-combo-tour', 'reykjavik-puffin-watching-boat-tour', 'reykjavik-golden-circle-day-tour-with-local-surprise', 'reykjavik-red-lava-horse-riding-tour', 'reykjavik-whale-and-puffin-watching-rib-boat-tour', 'reykjavik-the-original-3-hour-whale-watching-tour', 'from-reykjavik-new-volcanic-area-helicopter-tour', 'reykjavik-city-walking-tour-in-small-group-with-local-guide', 'from-reykjavik-northern-lights-bus-tour-with-hot-cocoa'],
    faqs: [
      { question: 'How do I book guided tours in Iceland?', answer: 'Choose a tour below and book directly through GetYourGuide. You get instant confirmation and a mobile ticket.' },
      { question: 'Is free cancellation available?', answer: 'Most experiences offer free cancellation up to 24 hours before. Check the individual booking page for details.' },
    ],
  },
  {
    slug: 'day-trips',
    title: 'Day Trips & Excursions',
    metaTitle: 'Day Trips & Excursions in Iceland 2026',
    metaDescription: 'Browse the best day trips & excursions in Iceland. Instant confirmation and free cancellation on most bookings via GetYourGuide.',
    description: 'The best day trips & excursions in Iceland, hand-picked from the top-rated experiences on GetYourGuide. Book ahead for the best availability, skip the queues where offered, and enjoy free cancellation on most options.',
    excerpt: 'Top-rated day trips & excursions in Iceland, booked direct through GetYourGuide.',
    icon: '🚌',
    tourSlugs: ['reykjavik-small-group-golden-circle-from-cruise-terminal', 'keflavik-airport-kef-bus-transfer-to-from-reykjavik'],
    faqs: [
      { question: 'How do I book day trips & excursions in Iceland?', answer: 'Choose a tour below and book directly through GetYourGuide. You get instant confirmation and a mobile ticket.' },
      { question: 'Is free cancellation available?', answer: 'Most experiences offer free cancellation up to 24 hours before. Check the individual booking page for details.' },
    ],
  },
  {
    slug: 'food-drink',
    title: 'Food, Wine & Nightlife',
    metaTitle: 'Food, Wine & Nightlife in Iceland 2026',
    metaDescription: 'Browse the best food, wine & nightlife in Iceland. Instant confirmation and free cancellation on most bookings via GetYourGuide.',
    description: 'The best food, wine & nightlife in Iceland, hand-picked from the top-rated experiences on GetYourGuide. Book ahead for the best availability, skip the queues where offered, and enjoy free cancellation on most options.',
    excerpt: 'Top-rated food, wine & nightlife in Iceland, booked direct through GetYourGuide.',
    icon: '🍷',
    tourSlugs: ['reykjav-k-whale-watching-and-marine-life-cruise'],
    faqs: [
      { question: 'How do I book food, wine & nightlife in Iceland?', answer: 'Choose a tour below and book directly through GetYourGuide. You get instant confirmation and a mobile ticket.' },
      { question: 'Is free cancellation available?', answer: 'Most experiences offer free cancellation up to 24 hours before. Check the individual booking page for details.' },
    ],
  },
  {
    slug: 'top-attractions',
    title: 'Top Attractions',
    metaTitle: 'Top Attractions in Iceland 2026',
    metaDescription: 'Browse the best top attractions in Iceland. Instant confirmation and free cancellation on most bookings via GetYourGuide.',
    description: 'The best top attractions in Iceland, hand-picked from the top-rated experiences on GetYourGuide. Book ahead for the best availability, skip the queues where offered, and enjoy free cancellation on most options.',
    excerpt: 'Top-rated top attractions in Iceland, booked direct through GetYourGuide.',
    icon: '⭐',
    tourSlugs: ['official-blue-lagoon-iceland-comfort-admission', 'reykjav-k-silfra-fissure-snorkeling-between-two-continents', 'reykjavik-whale-watching-by-rib-speedboat', 'reykjavik-glacier-hike-waterfalls-and-black-sand-beach', 'reykjavik-perlan-wonders-of-iceland-experience'],
    faqs: [
      { question: 'How do I book top attractions in Iceland?', answer: 'Choose a tour below and book directly through GetYourGuide. You get instant confirmation and a mobile ticket.' },
      { question: 'Is free cancellation available?', answer: 'Most experiences offer free cancellation up to 24 hours before. Check the individual booking page for details.' },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
