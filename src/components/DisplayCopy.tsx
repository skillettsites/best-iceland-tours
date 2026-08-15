'use client';

import { useCurrency } from '@/components/CurrencyProvider';
import { SITE_CURRENCY } from '@/lib/constants';
import { displayCopy } from '@/lib/currency';

export default function DisplayCopy({
  text,
  as: Tag = 'span',
  className,
}: {
  text: string;
  as?: 'span' | 'p' | 'div';
  className?: string;
}) {
  const { code, ready, rates } = useCurrency();
  const to = ready ? code : SITE_CURRENCY;
  return <Tag className={className}>{displayCopy(text, to, rates)}</Tag>;
}

export function DisplayCopyHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const { code, ready, rates } = useCurrency();
  const to = ready ? code : SITE_CURRENCY;
  return <div className={className} dangerouslySetInnerHTML={{ __html: displayCopy(html, to, rates) }} />;
}
