import MonthPage, { buildMonthMetadata } from '@/components/MonthPage';

const SLUG = 'november';

export const metadata = buildMonthMetadata(SLUG);

export default function Page() {
  return <MonthPage slug={SLUG} />;
}
