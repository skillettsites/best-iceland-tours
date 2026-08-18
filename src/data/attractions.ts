import { FAQ } from '@/lib/types';

export interface AttractionSection {
  heading: string;
  /** Trusted, hand-written HTML rendered inside the .guide-content wrapper. */
  content: string;
}

export interface Attraction {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Short direct answer rendered under the H1 for answer-engine and snippet capture. */
  capsule?: string;
  tourSlugs: string[];
  /** Long-form sections rendered below the ranked tour grid. */
  sections?: AttractionSection[];
  /** Decision-content posts linked from this attraction page. */
  relatedBlogSlugs?: string[];
  faqs: FAQ[];
}

export const attractions: Attraction[] = [
  {
    slug: 'golden-circle',
    name: 'Golden Circle',
    title: 'Golden Circle Tickets and Tours',
    metaTitle: 'Golden Circle Tours in Iceland 2026: Tickets and Prices',
    metaDescription: 'Golden Circle tickets and tours from Reykjavik, from £68. Compare 5 top-rated options covering Thingvellir, Geysir and Gullfoss, with free cancellation.',
    intro: 'Compare the best Golden Circle tickets and guided tours in Iceland, ranked by verified reviews. Booking online guarantees your seat on the date you want, and most options come with free cancellation up to 24 hours before. Every option below links straight to GetYourGuide.',
    capsule: 'The Golden Circle is a driving route east of Reykjavik that links three sights in one day: Thingvellir National Park, the Geysir geothermal area and Gullfoss waterfall. Guided Golden Circle tours from Reykjavik start from £68, run all year, and take most of a day. The highest-rated option is the Golden Circle Full-Day Tour with Kerid Crater, rated 4.8 by more than 26,000 travellers.',
    tourSlugs: ['reykjavik-golden-circle-kerid-crater-and-blue-lagoon-tour', 'reykjavik-golden-circle-full-day-tour-with-kerid-crater', 'reykjavik-golden-circle-day-tour-with-local-surprise', 'reykjav-k-golden-circle-afternoon-small-group-tour', 'reykjavik-small-group-golden-circle-from-cruise-terminal'],
    sections: [
      {
        heading: 'What is the Golden Circle?',
        content: '<p>The Golden Circle is not a single attraction. It is a loop route through southwest Iceland that every operator builds a day tour around, because the three headline stops sit close enough together to see properly between breakfast and dinner. That is why it is the first thing almost every first-time visitor books, and why there are more Golden Circle departures from Reykjavik than any other tour in the country.</p><p>You do not need a ticket for the sights themselves. What you are booking is the coach seat, the guide and the driving, which is the hard part in Icelandic weather. If you want the honest verdict on whether it lives up to the hype, read <a href="/blog/is-the-golden-circle-tour-worth-it">Is the Golden Circle tour worth it?</a> If you have already decided and just need to pick a departure, read <a href="/guides/best-golden-circle-tour">which Golden Circle tour to book</a>.</p>',
      },
      {
        heading: 'The route: Thingvellir, Geysir and Gullfoss',
        content: '<p><strong>Thingvellir National Park.</strong> A rift valley where the North American and Eurasian tectonic plates are pulling apart, and the site of the Rock of Law where the first Viking parliament met. It was named a UNESCO World Heritage Site for its cultural value in 2004.</p><p><strong>The Geysir geothermal area.</strong> The original Geysir gave the world the word, but the reliable performer today is Strokkur next door, which spouts steaming water around 30 metres into the air roughly every eight minutes. Have the camera ready before it goes.</p><p><strong>Gullfoss.</strong> The "Golden Falls" on the glacial river Hvita, dropping into a 32 metre deep crevice. Stand on the lower path in summer and you will feel the spray.</p><p>Several tours add <strong>Kerid crater</strong>, a red volcanic crater with a startlingly blue lake in it. Worth checking the small print: on the Full-Day Tour with Kerid Crater, departures at 12:00 and later do not stop there.</p>',
      },
      {
        heading: 'Which Golden Circle tour should you book?',
        content: '<div class="table-scroll"><table><thead><tr><th>Tour</th><th>From</th><th>Rating</th><th>Best for</th></tr></thead><tbody><tr><td>Golden Circle Full-Day Tour with Kerid Crater</td><td>£68</td><td>4.8 (26,622)</td><td>Best value, biggest coaches</td></tr><tr><td>Golden Circle Day Tour with Local Surprise</td><td>£77</td><td>4.7 (526)</td><td>An extra stop, 9 hours</td></tr><tr><td>Golden Circle Afternoon Small Group Tour</td><td>£79</td><td>4.7 (1,372)</td><td>Late risers and smaller groups</td></tr><tr><td>Small Group Golden Circle from Cruise Terminal</td><td>£121</td><td>4.3 (620)</td><td>Cruise passengers, 6.5 hours</td></tr><tr><td>Golden Circle, Kerid Crater and Blue Lagoon Tour</td><td>£192</td><td>4.9 (5,858)</td><td>Doing both icons in one day</td></tr></tbody></table></div><p>If you only have one free day and want the Blue Lagoon too, the combined tour is the efficient answer and the highest-rated tour on this site. If you would rather split them, book the £68 full-day tour and see <a href="/attractions/blue-lagoon">Blue Lagoon tickets</a> separately.</p>',
      },
      {
        heading: 'Booking Golden Circle tickets',
        content: '<p>Golden Circle departures sell out in peak season, and the earliest slots go first because they get you to Geysir before the mid-morning coaches arrive. Booking is instant, the ticket lands on your phone, and most options are cancellable free of charge up to 24 hours before, so reserving early costs you nothing in flexibility.</p><p>Deciding between this and the south coast? Read <a href="/blog/golden-circle-vs-south-coast-which-tour">Golden Circle vs South Coast</a> before you pick.</p>',
      },
    ],
    relatedBlogSlugs: ['is-the-golden-circle-tour-worth-it', 'golden-circle-vs-south-coast-which-tour', 'best-iceland-day-tours-from-reykjavik'],
    faqs: [
      { question: 'What is the Golden Circle tour in Iceland?', answer: 'It is a guided day tour from Reykjavik around a loop route in southwest Iceland taking in Thingvellir National Park, the Geysir geothermal area and Gullfoss waterfall, with some tours adding the Kerid volcanic crater. Tours start from £68.' },
      { question: 'How much are Golden Circle tickets?', answer: 'Golden Circle tours in Iceland start from around £68 for a full day from Reykjavik. Small-group and afternoon departures cost a little more, and the combined Golden Circle and Blue Lagoon day is £192. The ranked list shows current prices.' },
      { question: 'How long does the Golden Circle take?', answer: 'Most Golden Circle tours run as a full day from Reykjavik. The small-group tour from the cruise terminal is a 6.5-hour version, and there is an afternoon departure if you would rather not start early.' },
      { question: 'Do I need to book Golden Circle tours in advance?', answer: 'In summer, yes. The best-rated departures regularly sell out and the earliest slots go first. Most options offer free cancellation up to 24 hours before, so booking ahead carries almost no risk.' },
      { question: 'What is the best Golden Circle tour?', answer: 'The highest-rated option is the Golden Circle, Kerid Crater and Blue Lagoon Tour, rated 4.9 stars by 5,858 travellers, from £192. For value alone, the Golden Circle Full-Day Tour with Kerid Crater is rated 4.8 by 26,622 travellers and starts at £68.' },
    ],
  },
  {
    slug: 'whale-watching',
    name: 'Whale Watching',
    title: 'Whale Watching Tickets and Tours',
    metaTitle: 'Whale Watching Tours in Iceland 2026: Tickets and Prices',
    metaDescription: 'Whale watching tours in Iceland from £72. Compare 5 top-rated Reykjavik departures into Faxafloi Bay, with free cancellation and instant mobile tickets.',
    intro: 'Compare the best whale watching tours in Iceland, ranked by verified reviews. Every option below sails from Reykjavik and links straight to GetYourGuide, with instant confirmation and free cancellation on most bookings.',
    capsule: 'Whale watching tours in Iceland sail all year from Reykjavik\'s Old Harbour into Faxafloi Bay, with the peak season running April to October. Prices start from £72 for a standard cruise or £145 for a RIB speedboat. The usual sightings are minke whales, humpback whales, white-beaked dolphins and harbour porpoises, and one Reykjavik operator reports whales on more than 90% of its sailings.',
    tourSlugs: ['reykjavik-whale-and-puffin-watching-rib-boat-tour', 'reykjavik-whale-watching-by-rib-speedboat', 'reykjav-k-whale-watching-and-marine-life-cruise', 'reykjavik-the-original-3-hour-whale-watching-tour', 'reykjavik-whales-and-puffins-express-cruise-combo-tour'],
    sections: [
      {
        heading: 'The best time of year for whale watching in Iceland',
        content: '<p>Boats sail from Reykjavik in every month of the year, but the odds and the comfort are not the same in every month. The operators put the <strong>peak season at April to October</strong>, when the bay is busiest with feeding whales and the sea is calmer. July and August give you the longest days and the warmest deck, which matters more than you think three hours into a cruise.</p><p>Winter sailings still run and still find whales, and they have one advantage the summer cannot match: you can pair an afternoon on the water with an evening <a href="/attractions/northern-lights">northern lights tour</a> on the same day.</p><div class="table-scroll"><table><thead><tr><th>When</th><th>What it is like</th><th>Typically around</th></tr></thead><tbody><tr><td>April to June</td><td>Season ramping up, long light, fewer boats</td><td>Minke whales, white-beaked dolphins, harbour porpoises</td></tr><tr><td>July and August</td><td>Peak conditions, warmest decks, book ahead</td><td>Humpbacks, minkes, dolphins, sea birds including puffins</td></tr><tr><td>September and October</td><td>Tail of the season, quieter sailings</td><td>Humpbacks and minkes still feeding in the bay</td></tr><tr><td>November to March</td><td>Year-round sailings, cold and weather-dependent</td><td>Whales still sighted, dolphins and porpoises common</td></tr></tbody></table></div><p>Sightings are wild animals, not a timetable. Treat the table as odds, not a promise. If you want the honest verdict on whether to book at all, read <a href="/blog/is-whale-watching-in-iceland-worth-it">Is whale watching in Iceland worth it?</a></p>',
      },
      {
        heading: 'Where the tours leave from: Reykjavik or Husavik',
        content: '<p>Iceland has two whale-watching bases and it pays to know which one you are booking. <strong>Husavik</strong> in the north, on Skjalfandi Bay, has the older reputation as the country\'s whale capital, but it is a serious drive from the capital and only makes sense if you are already touring the north or flying to Akureyri.</p><p><strong>Reykjavik</strong> is where almost every visitor actually goes whale watching, and it is where all five tours on this page sail from. Boats leave the <strong>Old Harbour</strong>, a ten-minute walk from the city centre, and head into <strong>Faxafloi Bay</strong>, where the currents create some of the best feeding conditions in the country. Check-in is at the harbour: the marine life cruise checks in at the Old Harbour House on Aegisgardur, and the Elding tour checks in at the red ticket office on the same harbour.</p><p>The practical upshot: you do not need a car, you do not need to move hotels, and you can be back in town for dinner. That is why whale watching is one of the easiest additions to a Reykjavik trip.</p>',
      },
      {
        heading: 'Boat or RIB: which whale watching tour to book',
        content: '<div class="table-scroll"><table><thead><tr><th>Tour</th><th>From</th><th>Rating</th><th>Best for</th></tr></thead><tbody><tr><td>Whale Watching and Marine Life Cruise</td><td>£72</td><td>4.5 (11,161)</td><td>Best value, heated indoor cabin</td></tr><tr><td>The Original 3-Hour Whale Watching Tour</td><td>£79</td><td>4.4 (1,115)</td><td>Marine biologist guides, warm overalls</td></tr><tr><td>Whales and Puffins Express Cruise Combo</td><td>£100</td><td>4.5 (615)</td><td>Whales and puffins in one trip</td></tr><tr><td>Whale Watching by RIB Speedboat</td><td>£145</td><td>4.6 (796)</td><td>Faster, closer, more exhilarating</td></tr><tr><td>Whale and Puffin Watching RIB Boat Tour</td><td>£145</td><td>4.7 (415)</td><td>Small group, highest rated</td></tr></tbody></table></div><p>The big cruise boats are the sensible choice with children or in cold weather: they have heated indoor cabins, toilets, a cafe and outdoor decks, and the marine life cruise runs between 2.5 and 3.5 hours depending on how far out the whales are. The RIBs are wetter, faster and more thrilling, and they cost roughly 50% more.</p>',
      },
      {
        heading: 'What happens if you do not see a whale',
        content: '<p>No honest operator guarantees a sighting, and any site that claims otherwise is selling you something. What the Reykjavik operators do offer is a second chance, and the terms differ:</p><ul><li><strong>Elding</strong>, which runs the Original 3-Hour Whale Watching Tour, lists a sighting guarantee on its GetYourGuide page: if you do not see whales, you can try again for free. It also states that whales are seen on more than 90% of its tours throughout the year.</li><li><strong>Sea Trips Reykjavik</strong>, which runs the Marine Life Cruise, is explicit that sightings cannot be predicted or guaranteed. If there are no sightings it does not refund, but it gives a free return ticket valid for up to three years, subject to availability.</li><li><strong>The RIB speedboat tour</strong> states that if you do not get lucky with wildlife sightings on the day, you receive a complimentary ticket to try again another day.</li></ul><p>Always read the "know before you go" section on the option you actually book, because the policy belongs to the operator, not to us.</p><p>One more practical note: it is far colder on the water than on the quayside. Bring warm, weather-appropriate layers and comfortable shoes. The Elding tour includes the use of warm overalls, and both RIB tours include warm overalls, gloves and goggles. On the Marine Life Cruise you dress yourself.</p>',
      },
    ],
    relatedBlogSlugs: ['is-whale-watching-in-iceland-worth-it', 'best-iceland-day-tours-from-reykjavik', 'how-to-get-around-iceland-tours-vs-rental-car', 'golden-circle-vs-south-coast-which-tour'],
    faqs: [
      { question: 'How much are whale watching tours in Iceland?', answer: 'Whale watching tours in Iceland start from around £72 for a standard cruise from Reykjavik. RIB speedboat tours start from £145, and whale and puffin combos run from £100. The ranked list above shows current prices.' },
      { question: 'What is the best time of year for whale watching in Iceland?', answer: 'The peak whale watching season in Iceland runs from April to October, with July and August offering the longest daylight and the calmest decks. Boats sail from Reykjavik all year round, and whales are still sighted through the winter.' },
      { question: 'Where do whale watching tours in Iceland leave from?', answer: 'Every tour on this page sails from Reykjavik\'s Old Harbour into Faxafloi Bay, a short walk from the city centre. Husavik in north Iceland is the other well-known whale watching base, but it is a long journey from the capital.' },
      { question: 'What whales will I see in Iceland?', answer: 'The regular sightings in Faxafloi Bay are minke whales, humpback whales, white-beaked dolphins and harbour porpoises, along with plenty of sea birds. Sightings are wild and never guaranteed.' },
      { question: 'What happens if you do not see any whales?', answer: 'It depends on the operator. Elding lists a sighting guarantee and lets you sail again free if you see nothing. Sea Trips Reykjavik does not refund but offers a free return ticket valid up to three years, subject to availability. Check the terms on the option you book.' },
    ],
  },
  {
    slug: 'blue-lagoon',
    name: 'Blue Lagoon',
    title: 'Blue Lagoon Tickets and Tours',
    metaTitle: 'Blue Lagoon Tickets and Tours 2026',
    metaDescription: 'Book Blue Lagoon Iceland tickets from £108. Comfort admission includes a towel, a drink and a silica mud mask, with pre-booked entry and free cancellation.',
    intro: 'Compare the best Blue Lagoon tickets and tours in Iceland, ranked by verified reviews. Entry is by pre-booked time slot, so booking ahead is the difference between bathing and being turned away. Every option below links straight to GetYourGuide.',
    capsule: 'Blue Lagoon tickets start from £108 for Comfort admission, which includes entry, a towel, one drink at the swim-up bar and a silica mud mask. Entry is by pre-booked time slot with a one-hour window to arrive, so reservations are effectively required. The lagoon sits at Svartsengi near Grindavik, about 20 minutes from Keflavik airport and 45 minutes from Reykjavik.',
    tourSlugs: ['reykjavik-golden-circle-kerid-crater-and-blue-lagoon-tour', 'official-blue-lagoon-iceland-comfort-admission'],
    sections: [
      {
        heading: 'Blue Lagoon ticket prices in 2026',
        content: '<div class="table-scroll"><table><thead><tr><th>Option</th><th>From</th><th>Rating</th><th>What you get</th></tr></thead><tbody><tr><td><a href="/tours/official-blue-lagoon-iceland-comfort-admission">Official Blue Lagoon Comfort admission</a></td><td>£108</td><td>4.6 (6,031)</td><td>Entry, towel, one drink, silica mud mask</td></tr><tr><td>Golden Circle, Kerid Crater and Blue Lagoon Tour</td><td>£192</td><td>4.9 (5,858)</td><td>Full Golden Circle day plus the lagoon, transport included</td></tr></tbody></table></div><p>Comfort is the standard ticket and the one most visitors book. It covers full access to the lagoon and its facilities, use of a towel, a non-alcoholic drink of your choice at the in-water bar, and a silica mud mask at the mask bar. You also get unlimited use of the sauna, the steam cave, the colder lagoon and the quiet zone, plus an electronic wristband that doubles as your locker key and your tab.</p><p>Prices move with demand and season. The figures above are the current from-prices on the options we list; the live price is always the one shown on the booking page.</p>',
      },
      {
        heading: 'Do you need to book the Blue Lagoon in advance?',
        content: '<p>Yes, in practice. Admission is sold for a specific arrival time and you have <strong>a one-hour window from your pre-booked time to enter the lagoon</strong>. Turn up without a reservation in summer and there is a real chance you will not get in at all, having driven 45 minutes to find out.</p><p>Book the slot before you book anything else on that day, then build the day around it. Popular arrival times sell out first, especially the late-afternoon ones people want for the light. Most options are cancellable free of charge up to 24 hours before, so an early booking costs you nothing.</p><p>The clever move most repeat visitors make: schedule it for your arrival or departure day. The lagoon is roughly 20 minutes from Keflavik airport and about 45 minutes from Reykjavik, so it slots neatly either side of a flight with the bags still in the car.</p>',
      },
      {
        heading: 'VIP, upgrades and in-water extras',
        content: '<p>If Comfort does not feel like enough, there are three honest ways to upgrade the visit:</p><ul><li><strong>In-water treatments.</strong> Massages and float therapy are bookable at the lagoon, and the official listing recommends pre-booking them to be sure of availability. They are the closest thing to a VIP experience once you are in the water.</li><li><strong>Higher admission tiers.</strong> Blue Lagoon sells more than one level of admission and the current options, inclusions and prices are chosen on the booking page itself. We list Comfort because it is the tier with the review volume behind it.</li><li><strong>The combined day.</strong> For a genuinely premium day out rather than a premium locker room, the £192 Golden Circle, Kerid Crater and Blue Lagoon Tour is the best-rated experience on this site at 4.9 stars, and it handles all the driving.</li></ul><p>Worth knowing before you commit: the minimum age is two, children aged 2 to 8 must wear floaties, and the quiet zone at the far end of the lagoon is where to head if the main pool feels busy.</p>',
      },
      {
        heading: 'Blue Lagoon or Sky Lagoon?',
        content: '<p>Most visitors have time for one geothermal spa, not two. The Blue Lagoon is the icon: bigger, milkier, further out, and perfectly placed for an airport day. <a href="/attractions/sky-lagoon">Sky Lagoon</a> is newer, cheaper at £86, minutes from downtown Reykjavik, and built around an oceanfront infinity edge and a seven-step ritual.</p><p>We have written the full comparison, including who each one actually suits: <a href="/blog/blue-lagoon-vs-sky-lagoon-which-to-book">Blue Lagoon vs Sky Lagoon: which to book</a>.</p>',
      },
    ],
    relatedBlogSlugs: ['blue-lagoon-vs-sky-lagoon-which-to-book', 'best-iceland-day-tours-from-reykjavik', 'is-the-golden-circle-tour-worth-it'],
    faqs: [
      { question: 'How much are Blue Lagoon tickets?', answer: 'Blue Lagoon Comfort admission starts from £108 and includes entry, a towel, one non-alcoholic drink at the swim-up bar and a silica mud mask. The Golden Circle and Blue Lagoon combined day tour is £192 and includes transport.' },
      { question: 'Do you need to book the Blue Lagoon in advance?', answer: 'Yes. Entry is by pre-booked time slot and you have a one-hour window from your booked time to enter. Slots sell out in peak season, so reserve before you plan the rest of the day. Most options are cancellable free up to 24 hours before.' },
      { question: 'What is included in Blue Lagoon Comfort admission?', answer: 'Comfort admission includes entry to the lagoon and its facilities, a towel, one non-alcoholic drink at the in-water bar, a silica mud mask at the mask bar, unlimited use of the sauna, steam cave, colder lagoon and quiet zone, and an electronic wristband for your locker and purchases.' },
      { question: 'Is there a VIP option at the Blue Lagoon?', answer: 'Blue Lagoon offers more than one admission level, and the current tiers and prices are shown on the booking page. In-water treatments such as massage and float therapy can be added and should be pre-booked to guarantee availability.' },
      { question: 'How far is the Blue Lagoon from Reykjavik?', answer: 'The Blue Lagoon is at Svartsengi near Grindavik, roughly 45 minutes from Reykjavik and about 20 minutes from Keflavik airport, which is why so many visitors book it for their arrival or departure day.' },
    ],
  },
  {
    slug: 'glacier-hikes',
    name: 'Glacier Hikes',
    title: 'Glacier Hikes Tickets and Tours',
    metaTitle: 'Glacier Hikes Tickets and Tours 2026',
    metaDescription: 'Book glacier hike tours in Iceland from £89. Two top-rated guided options combining waterfalls, black sand beaches and glacier walking, with free cancellation.',
    intro: 'Compare the best glacier hiking tours in Iceland, ranked by verified reviews. Both options below are guided full days from Reykjavik that pair the ice with the south coast waterfalls, and both link straight to GetYourGuide.',
    tourSlugs: ['reykjav-k-south-coast-waterfalls-black-sand-and-glacier-tour', 'reykjavik-glacier-hike-waterfalls-and-black-sand-beach'],
    relatedBlogSlugs: ['glacier-hike-vs-ice-cave-tour', 'best-iceland-day-tours-from-reykjavik', 'golden-circle-vs-south-coast-which-tour'],
    faqs: [
      { question: 'How much are glacier hikes in Iceland?', answer: 'Guided glacier hike tours in Iceland start from around £89, usually as part of a full South Coast day that also takes in waterfalls and a black sand beach. The ranked list shows current prices.' },
      { question: 'What is the best glacier hike tour?', answer: 'The top-rated option is the South Coast Waterfalls, Black Sand and Glacier Tour, rated 4.8 stars by 12,213 travellers, from £89.' },
      { question: 'Do you need experience to hike a glacier in Iceland?', answer: 'No. These are guided walks led by a professional glacier guide, and the Glacier Hike, Waterfalls and Black Sand Beach tour includes all the safety equipment: crampons, harness, ice axe and helmet. Bring warm layers and sturdy walking boots, and expect a full day out from Reykjavik.' },
    ],
  },
  {
    slug: 'northern-lights',
    name: 'Northern Lights',
    title: 'Northern Lights Tickets and Tours',
    metaTitle: 'Northern Lights Tickets and Tours 2026',
    metaDescription: 'Book Northern Lights tours in Iceland from £62. A top-rated bus hunt from Reykjavik with hot cocoa, instant confirmation and free cancellation on most options.',
    intro: 'Compare Northern Lights tours in Iceland, ranked by verified reviews. Aurora hunts run in the dark half of the year, when guides chase the clearest skies away from the city lights. Booking links go straight to GetYourGuide.',
    tourSlugs: ['from-reykjavik-northern-lights-bus-tour-with-hot-cocoa'],
    relatedBlogSlugs: ['is-a-northern-lights-tour-worth-it', 'northern-lights-tour-vs-self-drive', 'best-iceland-day-tours-from-reykjavik'],
    faqs: [
      { question: 'How much are Northern Lights tours in Iceland?', answer: 'Northern Lights bus tours from Reykjavik start from around £62. The ranked list shows the current price and live availability.' },
      { question: 'What is the best Northern Lights tour?', answer: 'The Northern Lights Bus Tour with Hot Cocoa from Reykjavik is rated 4.3 stars by 14,846 travellers, from £62.' },
      { question: 'When can you see the Northern Lights in Iceland?', answer: 'Aurora tours run through the dark winter months, because you need genuinely dark skies away from the city. Sightings are never guaranteed, and the Northern Lights Bus Tour with Hot Cocoa offers a free retry tour if the lights do not appear on your first attempt.' },
    ],
  },
  {
    slug: 'sky-lagoon',
    name: 'Sky Lagoon',
    title: 'Sky Lagoon Tickets and Tours',
    metaTitle: 'Sky Lagoon Tickets and Tours 2026',
    metaDescription: 'Book Sky Lagoon tickets in Iceland from £86, including the 7-step ritual. Oceanside geothermal spa minutes from downtown Reykjavik, free cancellation.',
    intro: 'Compare Sky Lagoon tickets in Iceland, ranked by verified reviews. Sky Lagoon is the oceanside geothermal spa minutes from central Reykjavik, and the entrance pass includes the seven-step ritual it is famous for. Booking links go straight to GetYourGuide.',
    capsule: 'Sky Lagoon tickets start from £86 for the entrance pass, which includes the seven-step ritual, a towel and the use of the showers. The spa is on the coast minutes from downtown Reykjavik, is open to visitors aged 12 and over, and the pass is rated 4.8 by more than 7,000 travellers. Choose the SAMAN pass for shared changing facilities or SER for private ones.',
    tourSlugs: ['reykjavik-sky-lagoon-entrance-pass-with-7-step-spa-ritual'],
    sections: [
      {
        heading: 'The 7-step ritual, explained',
        content: '<p>The ritual is the reason to choose Sky Lagoon over a municipal pool, and it is included in the entrance pass rather than sold as an extra. You work through seven stages in order, alternating hot and cold, and it takes as long as you want it to. This is the sequence as the spa sets it out:</p><ol><li><strong>Laug (lagoon)</strong>: slow down in the warm geothermal water and the infinity edge over the North Atlantic.</li><li><strong>Kuldi (cold)</strong>: the cold plunge. Short, bracing, and the step everyone talks about afterwards.</li><li><strong>Ylur (warmth)</strong>: the sauna, which has the best window in Icelandic bathing.</li><li><strong>Suld (drizzle)</strong>: a cold mist to cool you back down.</li><li><strong>Mykt (softness)</strong>: the Sky body scrub, applied yourself, to exfoliate.</li><li><strong>Gufa (steam)</strong>: the steam room, which sets the scrub.</li><li><strong>Saft (juice)</strong>: a taste of krakiber, the crowberries that grow on the surrounding lava fields.</li></ol><p>One practical note from the small print: if you have allergies, check the ingredients of the body scrub before you use it, as they are listed on the booking page.</p>',
      },
      {
        heading: 'Sky Lagoon tickets and passes',
        content: '<p>The entrance pass is £86 and comes in two versions, chosen at booking:</p><ul><li><strong>SAMAN pass</strong>: shared changing and shower facilities. The standard choice, and the one most people book.</li><li><strong>SER pass</strong>: private changing facilities and shower cabins with signature botanical body products.</li></ul><p>Both include entry, the seven-step ritual, a towel and Sky body wash, shampoo and conditioner. Food and drink are available to buy at the Keimur Cafe and Smakk Bar, and swimsuits can be rented for an extra fee if you have travelled light. The minimum age is 12, and staff can ask for ID to confirm a child\'s date of birth.</p><p>Booking is instant, the ticket lands on your phone, and cancellation is free up to 24 hours before. Evening slots go first, so book the time you want rather than the time that is left.</p>',
      },
      {
        heading: 'Sky Lagoon or Blue Lagoon?',
        content: '<p>Sky Lagoon is cheaper at £86, far closer to the city, and built around the ritual and the ocean view. <a href="/attractions/blue-lagoon">Blue Lagoon</a> is £108, the more famous photograph, and sits between Reykjavik and Keflavik airport, which makes it the better choice for an arrival or departure day.</p><p>The full head-to-head, including which one to pick for a first visit: <a href="/blog/blue-lagoon-vs-sky-lagoon-which-to-book">Blue Lagoon vs Sky Lagoon: which to book</a>.</p>',
      },
    ],
    relatedBlogSlugs: ['blue-lagoon-vs-sky-lagoon-which-to-book', 'best-iceland-day-tours-from-reykjavik'],
    faqs: [
      { question: 'How much are Sky Lagoon tickets?', answer: 'Sky Lagoon tickets start from £86 for the entrance pass with the seven-step ritual included. The ranked list above shows live pricing and availability.' },
      { question: 'What is the 7-step ritual at Sky Lagoon?', answer: 'It is a set sequence included in the pass: the warm lagoon, a cold plunge, the sauna, a cold mist, the Sky body scrub, the steam room, and finally a taste of Icelandic crowberry juice.' },
      { question: 'What is the difference between the SAMAN and SER pass?', answer: 'The SAMAN pass uses shared changing and shower facilities. The SER pass gives you private changing facilities and shower cabins with signature botanical body products. Both include the seven-step ritual and a towel.' },
      { question: 'Is there an age limit at Sky Lagoon?', answer: 'Yes. The minimum age is 12, and staff may ask to confirm a child\'s date of birth with valid ID.' },
      { question: 'Do you need to book Sky Lagoon in advance?', answer: 'It is strongly recommended. Evening slots in particular sell out, and booking is instant with free cancellation up to 24 hours before on most options.' },
    ],
  },
  {
    slug: 'south-coast',
    name: 'South Coast',
    title: 'South Coast Tickets and Tours',
    metaTitle: 'South Coast Tickets and Tours 2026',
    metaDescription: 'Book South Coast tours in Iceland from £89. A top-rated full day of waterfalls, black sand beaches and glacier scenery from Reykjavik, with free cancellation.',
    intro: 'Compare South Coast tours in Iceland, ranked by verified reviews. The south coast is the big-scenery day trip from Reykjavik: Seljalandsfoss and Skogafoss, the black sand at Reynisfjara and the Solheimajokull glacier snout. Booking links go straight to GetYourGuide.',
    tourSlugs: ['reykjav-k-south-coast-waterfalls-black-sand-and-glacier-tour'],
    relatedBlogSlugs: ['golden-circle-vs-south-coast-which-tour', 'best-iceland-day-tours-from-reykjavik', 'glacier-hike-vs-ice-cave-tour'],
    faqs: [
      { question: 'How much are South Coast tours in Iceland?', answer: 'South Coast day tours from Reykjavik start from around £89. The ranked list shows current prices and live availability.' },
      { question: 'What is the best South Coast tour?', answer: 'The top-rated option is the South Coast Waterfalls, Black Sand and Glacier Tour, rated 4.8 stars by 12,213 travellers, from £89.' },
      { question: 'Is the South Coast better than the Golden Circle?', answer: 'They suit different travellers. The Golden Circle is shorter, closer and covers three famous sights efficiently. The South Coast is a longer day with bigger, wilder scenery. If you only have one day, most first-time visitors start with the Golden Circle.' },
    ],
  },
];

export function getAttractionBySlug(slug: string): Attraction | undefined {
  return attractions.find((a) => a.slug === slug);
}
