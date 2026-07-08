'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import TrustBar, { defaultTrustItems } from './TrustBar';

interface HeroProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: { src: string; alt: string };
  trustPill?: ReactNode;
  showTrustBar?: boolean;
}

export default function Hero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
  trustPill,
  showTrustBar = true,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], prefersReduced ? [0, 0] : [0, -60]);

  const titleWords = title.split(' ');

  return (
    <section ref={ref} className="relative overflow-hidden text-white bg-primary">
      {backgroundImage ? (
        <m.div style={{ y }} className="absolute inset-0">
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary-ink/85" />
        </m.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-ink to-primary opacity-100" />
      )}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {trustPill && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium ring-1 ring-white/15"
            >
              {trustPill}
            </m.div>
          )}

          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-highlight mb-4">
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            {titleWords.map((word, i) => (
              <m.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </m.span>
            ))}
            {titleAccent && (
              <m.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 + titleWords.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="font-display italic text-highlight inline-block"
              >
                {titleAccent}
              </m.span>
            )}
          </h1>

          {subtitle && (
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 + titleWords.length * 0.06 }}
              className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto"
            >
              {subtitle}
            </m.p>
          )}

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 + titleWords.length * 0.06 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
          >
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-ink text-on-accent font-semibold text-base px-7 py-3.5 shadow-lg shadow-accent/25 transition-all active:scale-[0.98] min-h-[52px]"
            >
              {primaryCta.label}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 py-3.5 transition-all min-h-[52px]"
              >
                {secondaryCta.label}
              </Link>
            )}
          </m.div>

          {showTrustBar && (
            <div className="mt-12">
              <TrustBar items={defaultTrustItems} variant="dark" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
