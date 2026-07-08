'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';

interface SearchHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  suggestions?: { label: string; href: string }[];
  basePath?: string;
}

export default function SearchHero({
  eyebrow,
  title,
  subtitle,
  placeholder = 'Search tours and experiences',
  suggestions = [],
  basePath = '/tours',
}: SearchHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const prefersReduced = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`${basePath}?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <section className="bg-primary-soft border-b border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent mb-3">{eyebrow}</p>
        )}
        <m.h1
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-semibold tracking-tight text-on-surface"
        >
          {title}
        </m.h1>
        {subtitle && (
          <p className="mt-3 text-[15px] sm:text-base text-on-surface-2 max-w-xl mx-auto">{subtitle}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="mt-7 mx-auto max-w-xl flex items-stretch gap-2 rounded-pill bg-surface border border-border shadow-card focus-within:border-primary transition-colors"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search"
            className="flex-1 min-w-0 bg-transparent text-on-surface placeholder:text-on-surface-2 px-5 py-3.5 text-[15px] focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-pill bg-accent hover:bg-accent-ink text-on-accent font-semibold text-sm px-5 my-1 mr-1 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
            <span className="text-on-surface-2">Popular:</span>
            {suggestions.map((s) => (
              <a key={s.href} href={s.href} className="text-primary hover:text-primary-ink hover:underline font-medium">
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
