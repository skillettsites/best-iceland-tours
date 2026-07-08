'use client';

import { animate, useInView, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  duration = 1.2,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => {
    const n = decimals === 0 ? Math.round(latest) : Number(latest.toFixed(decimals));
    return `${prefix}${n.toLocaleString()}${suffix}`;
  });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, duration, mv, prefersReduced]);

  useEffect(() => {
    if (!ref.current) return;
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => unsubscribe();
  }, [rounded]);

  const initial = prefersReduced ? `${prefix}${value.toLocaleString()}${suffix}` : `${prefix}0${suffix}`;

  return <span ref={ref} className={className}>{initial}</span>;
}
