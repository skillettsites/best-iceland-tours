import MonthPage, { buildMonthMetadata } from '@/components/MonthPage';

const SLUG = 'september';

export const metadata = buildMonthMetadata(SLUG);

export default function Page() {
  return <MonthPage slug={SLUG} />;
}
