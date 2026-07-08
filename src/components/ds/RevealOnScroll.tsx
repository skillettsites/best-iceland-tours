'use client';

import { m, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
}: RevealOnScrollProps) {
  const prefersReduced = useReducedMotion();
  const Component = m[as] as typeof m.div;

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
