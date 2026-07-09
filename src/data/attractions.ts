import { FAQ } from '@/lib/types';

export interface Attraction {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  tourSlugs: string[];
  faqs: FAQ[];
}

export const attractions: Attraction[] = [
  {
    slug: 'golden-circle',
    name: 'Golden Circle',
    title: 'Golden Circle Tickets and Tours',
    metaTitle: 'Golden Circle Tickets and Tours 2026',
    metaDescription: 'Book Golden Circle tickets and tours in Iceland. 5 top-rated options from £67, with skip-the-line where available, instant confirmation and free cancellati',
    intro: 'Compare the best Golden Circle tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['reykjavik-golden-circle-kerid-crater-and-blue-lagoon-tour', 'reykjavik-golden-circle-full-day-tour-with-kerid-crater', 'reykjavik-golden-circle-day-tour-with-local-surprise', 'reykjav-k-golden-circle-afternoon-small-group-tour', 'reykjavik-small-group-golden-circle-from-cruise-terminal'],
    faqs: [
      { question: 'How much are Golden Circle tickets?', answer: 'Golden Circle tickets and tours in Iceland start from around £67. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best Golden Circle tour?', answer: 'The top-rated option is Golden Circle, Kerid Crater, & Blue Lagoon Tour, rated 4.9 stars by 5,774 travellers, from £191.' },
      { question: 'Can I skip the line at Golden Circle?', answer: 'Yes, many Golden Circle options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
  {
    slug: 'whale-watching',
    name: 'Whale Watching',
    title: 'Whale Watching Tickets and Tours',
    metaTitle: 'Whale Watching Tickets and Tours 2026',
    metaDescription: 'Book Whale Watching tickets and tours in Iceland. 5 top-rated options from £76, with skip-the-line where available, instant confirmation and free cancellat',
    intro: 'Compare the best Whale Watching tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['reykjavik-whale-and-puffin-watching-rib-boat-tour', 'reykjavik-whale-watching-by-rib-speedboat', 'reykjav-k-whale-watching-and-marine-life-cruise', 'reykjavik-the-original-3-hour-whale-watching-tour', 'reykjavik-whales-and-puffins-express-cruise-combo-tour'],
    faqs: [
      { question: 'How much are Whale Watching tickets?', answer: 'Whale Watching tickets and tours in Iceland start from around £76. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best Whale Watching tour?', answer: 'The top-rated option is Whale and Puffin Watching RIB Boat Tour, rated 4.7 stars by 385 travellers, from £145.' },
      { question: 'Can I skip the line at Whale Watching?', answer: 'Yes, many Whale Watching options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
  {
    slug: 'blue-lagoon',
    name: 'Blue Lagoon',
    title: 'Blue Lagoon Tickets and Tours',
    metaTitle: 'Blue Lagoon Tickets and Tours 2026',
    metaDescription: 'Book Blue Lagoon tickets and tours in Iceland. 2 top-rated options from £97, with skip-the-line where available, instant confirmation and free cancellation',
    intro: 'Compare the best Blue Lagoon tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['reykjavik-golden-circle-kerid-crater-and-blue-lagoon-tour', 'official-blue-lagoon-iceland-comfort-admission'],
    faqs: [
      { question: 'How much are Blue Lagoon tickets?', answer: 'Blue Lagoon tickets and tours in Iceland start from around £97. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best Blue Lagoon tour?', answer: 'The top-rated option is Golden Circle, Kerid Crater, & Blue Lagoon Tour, rated 4.9 stars by 5,774 travellers, from £191.' },
      { question: 'Can I skip the line at Blue Lagoon?', answer: 'Yes, many Blue Lagoon options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
  {
    slug: 'glacier-hikes',
    name: 'Glacier Hikes',
    title: 'Glacier Hikes Tickets and Tours',
    metaTitle: 'Glacier Hikes Tickets and Tours 2026',
    metaDescription: 'Book Glacier Hikes tickets and tours in Iceland. 2 top-rated options from £88, with skip-the-line where available, instant confirmation and free cancellati',
    intro: 'Compare the best Glacier Hikes tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['reykjav-k-south-coast-waterfalls-black-sand-and-glacier-tour', 'reykjavik-glacier-hike-waterfalls-and-black-sand-beach'],
    faqs: [
      { question: 'How much are Glacier Hikes tickets?', answer: 'Glacier Hikes tickets and tours in Iceland start from around £88. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best Glacier Hikes tour?', answer: 'The top-rated option is South Coast Waterfalls, Black Sand & Glacier Tour, rated 4.8 stars by 12,056 travellers, from £88.' },
      { question: 'Can I skip the line at Glacier Hikes?', answer: 'Yes, many Glacier Hikes options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
  {
    slug: 'northern-lights',
    name: 'Northern Lights',
    title: 'Northern Lights Tickets and Tours',
    metaTitle: 'Northern Lights Tickets and Tours 2026',
    metaDescription: 'Book Northern Lights tickets and tours in Iceland. 1 top-rated options from £62, with skip-the-line where available, instant confirmation and free cancella',
    intro: 'Compare the best Northern Lights tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['from-reykjavik-northern-lights-bus-tour-with-hot-cocoa'],
    faqs: [
      { question: 'How much are Northern Lights tickets?', answer: 'Northern Lights tickets and tours in Iceland start from around £62. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best Northern Lights tour?', answer: 'The top-rated option is From Reykjavik, rated 4.3 stars by 14,842 travellers, from £62.' },
      { question: 'Can I skip the line at Northern Lights?', answer: 'Yes, many Northern Lights options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
  {
    slug: 'sky-lagoon',
    name: 'Sky Lagoon',
    title: 'Sky Lagoon Tickets and Tours',
    metaTitle: 'Sky Lagoon Tickets and Tours 2026',
    metaDescription: 'Book Sky Lagoon tickets and tours in Iceland. 1 top-rated options from £86, with skip-the-line where available, instant confirmation and free cancellation.',
    intro: 'Compare the best Sky Lagoon tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['reykjavik-sky-lagoon-entrance-pass-with-7-step-spa-ritual'],
    faqs: [
      { question: 'How much are Sky Lagoon tickets?', answer: 'Sky Lagoon tickets and tours in Iceland start from around £86. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best Sky Lagoon tour?', answer: 'The top-rated option is Sky Lagoon Entrance Pass With 7-Step Spa Ritual, rated 4.8 stars by 7,182 travellers, from £86.' },
      { question: 'Can I skip the line at Sky Lagoon?', answer: 'Yes, many Sky Lagoon options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
  {
    slug: 'south-coast',
    name: 'South Coast',
    title: 'South Coast Tickets and Tours',
    metaTitle: 'South Coast Tickets and Tours 2026',
    metaDescription: 'Book South Coast tickets and tours in Iceland. 1 top-rated options from £88, with skip-the-line where available, instant confirmation and free cancellation',
    intro: 'Compare the best South Coast tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees entry, unlocks skip-the-line access where offered, and gives free cancellation on most options. Every option below links straight to GetYourGuide.',
    tourSlugs: ['reykjav-k-south-coast-waterfalls-black-sand-and-glacier-tour'],
    faqs: [
      { question: 'How much are South Coast tickets?', answer: 'South Coast tickets and tours in Iceland start from around £88. Guided and skip-the-line options cost a little more. The ranked list shows current prices.' },
      { question: 'What is the best South Coast tour?', answer: 'The top-rated option is South Coast Waterfalls, Black Sand & Glacier Tour, rated 4.8 stars by 12,056 travellers, from £88.' },
      { question: 'Can I skip the line at South Coast?', answer: 'Yes, many South Coast options include skip-the-line or priority access. Look for skip-the-line in the tour name, and book ahead in peak season as slots sell out.' },
    ],
  },
];

export function getAttractionBySlug(slug: string): Attraction | undefined {
  return attractions.find((a) => a.slug === slug);
}
