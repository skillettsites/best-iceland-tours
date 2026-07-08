'use client';

import { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

interface Benefit {
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function BenefitGrid({
  items,
  columns = 3,
}: {
  items: Benefit[];
  columns?: 2 | 3 | 4;
}) {
  const prefersReduced = useReducedMotion();
  const colClass = columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4 sm:gap-6`}>
      {items.map((item, i) => (
        <m.div
          key={item.title}
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface rounded-card-lg border border-border p-6 sm:p-7 hover:shadow-card-hover transition-shadow"
        >
          <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-4 text-primary">
            {item.icon}
          </div>
          <h3 className="text-base font-semibold text-on-surface">{item.title}</h3>
          <p className="mt-1.5 text-sm text-on-surface-2 leading-relaxed">{item.desc}</p>
        </m.div>
      ))}
    </div>
  );
}
