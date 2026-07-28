import MonthPage, { buildMonthMetadata } from '@/components/MonthPage';

const SLUG = 'february';

export const metadata = buildMonthMetadata(SLUG);

export default function Page() {
  return <MonthPage slug={SLUG} />;
}
