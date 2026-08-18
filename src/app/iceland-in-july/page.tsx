import MonthPage, { buildMonthMetadata } from '@/components/MonthPage';

const SLUG = 'july';

export const metadata = buildMonthMetadata(SLUG);

export default function Page() {
  return <MonthPage slug={SLUG} />;
}
