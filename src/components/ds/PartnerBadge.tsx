interface PartnerBadgeProps {
  variant?: 'strip' | 'inline';
  className?: string;
}

export default function PartnerBadge({ variant = 'strip', className = '' }: PartnerBadgeProps) {
  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-2 ${className}`}>
        <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L3 6v6c0 5 4 9 9 11 5-2 9-6 9-11V6l-9-4zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z" />
        </svg>
        Official GetYourGuide partner
      </span>
    );
  }
  return (
    <div className={`bg-surface border-y border-border ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-on-surface-2">
        <span className="flex items-center gap-2 font-semibold text-on-surface">
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L3 6v6c0 5 4 9 9 11 5-2 9-6 9-11V6l-9-4zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z" />
          </svg>
          Official GetYourGuide partner
        </span>
        <span className="hidden sm:inline text-border">|</span>
        <span>Secure checkout</span>
        <span className="hidden sm:inline text-border">|</span>
        <span>Free cancellation on 95% of tours</span>
        <span className="hidden sm:inline text-border">|</span>
        <span>24/7 customer support</span>
      </div>
    </div>
  );
}
