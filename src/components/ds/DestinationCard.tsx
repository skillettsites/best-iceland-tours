'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';

interface DestinationCardProps {
  href: string;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  icon?: string;
  caption?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DestinationCard({
  href,
  title,
  imageUrl,
  imageAlt,
  icon,
  caption,
  size = 'md',
}: DestinationCardProps) {
  const prefersReduced = useReducedMotion();
  const aspect = size === 'lg' ? 'aspect-[4/5]' : size === 'sm' ? 'aspect-square' : 'aspect-[4/3]';
  const motion = prefersReduced ? {} : { whileHover: { y: -3 }, transition: { duration: 0.18 } };

  return (
    <m.div {...motion}>
      <Link
        href={href}
        className={`group relative block ${aspect} overflow-hidden rounded-card-lg shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-primary-soft`}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          {icon && <span className="text-lg mr-1.5">{icon}</span>}
          <h3 className="inline-block text-base sm:text-lg font-semibold leading-tight">{title}</h3>
          {caption && <p className="mt-0.5 text-xs text-white/80">{caption}</p>}
        </div>
      </Link>
    </m.div>
  );
}
