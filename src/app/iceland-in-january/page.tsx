import MonthPage, { buildMonthMetadata } from '@/components/MonthPage';

const SLUG = 'january';

export const metadata = buildMonthMetadata(SLUG);

export default function Page() {
  return <MonthPage slug={SLUG} />;
}
