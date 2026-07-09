// Cross-links to the sister tour sites (portfolio interlinking for discovery + authority).
// Contextual single section, not a sitewide footer block. Excludes the current city.
const NETWORK = [
  { city: 'Rome', url: 'https://best-rome-tours.com', flag: '\u{1F1EE}\u{1F1F9}' },
  { city: 'Paris', url: 'https://best-paris-tours.com', flag: '\u{1F1EB}\u{1F1F7}' },
  { city: 'Barcelona', url: 'https://best-barcelona-tours.com', flag: '\u{1F1EA}\u{1F1F8}' },
  { city: 'New York', url: 'https://best-nyc-tours.com', flag: '\u{1F1FA}\u{1F1F8}' },
  { city: 'Cancun', url: 'https://best-cancun-tours.com', flag: '\u{1F1F2}\u{1F1FD}' },
  { city: 'Iceland', url: 'https://best-iceland-tours.com', flag: '\u{1F1EE}\u{1F1F8}' },
  { city: 'London', url: 'https://bestlondontours.co.uk', flag: '\u{1F1EC}\u{1F1E7}' },
  { city: 'Worldwide', url: 'https://the-best-tours.com', flag: '\u{1F30D}' },
];

export default function SisterSites({ currentCity = '' }: { currentCity?: string }) {
  const sites = NETWORK.filter((s) => s.city.toLowerCase() !== currentCity.toLowerCase());
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Explore more destinations</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Heading somewhere else too? Our dedicated guides cover the best tours and tickets in these cities, all booked through GetYourGuide.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {sites.map((s) => (
          <a
            key={s.city}
            href={s.url}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <span className="text-xl leading-none" aria-hidden="true">{s.flag}</span>
            <span>Best {s.city} Tours</span>
          </a>
        ))}
      </div>
    </section>
  );
}
