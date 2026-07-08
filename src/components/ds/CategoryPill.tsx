import Link from 'next/link';

interface CategoryPillProps {
  href: string;
  label: string;
  icon?: string;
  count?: number;
}

export default function CategoryPill({ href, label, icon, count }: CategoryPillProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 text-sm font-medium text-on-surface hover:border-primary hover:text-primary transition-colors"
    >
      {icon && <span className="text-base">{icon}</span>}
      {label}
      {count !== undefined && (
        <span className="text-[11px] text-on-surface-2 group-hover:text-primary">({count})</span>
      )}
    </Link>
  );
}
