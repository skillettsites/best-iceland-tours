interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  tour?: string;
}

export default function TestimonialCard({
  quote,
  author,
  location,
  rating = 5,
  tour,
}: TestimonialCardProps) {
  return (
    <div className="bg-surface rounded-card-lg border border-border p-6 sm:p-7 hover:shadow-card-hover transition-shadow">
      <div className="flex items-center gap-0.5 mb-3 text-highlight">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-[15px] text-on-surface leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center text-primary font-semibold text-sm">
          {author.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-on-surface text-sm">{author}</p>
          {location && <p className="text-xs text-on-surface-2">{location}</p>}
        </div>
        {tour && (
          <span className="text-[11px] text-primary bg-primary-soft px-2.5 py-1 rounded-full font-medium">
            {tour}
          </span>
        )}
      </div>
    </div>
  );
}
