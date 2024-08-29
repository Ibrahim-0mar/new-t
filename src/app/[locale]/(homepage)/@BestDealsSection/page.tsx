import { locale } from '@/navigation';
import BestDeals from '@/sections/flights/BestDealsSection';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function BestDealsSection({ params: { locale } }: { params: { locale: locale } }) {
  unstable_setRequestLocale(locale);

  return <BestDeals  />;
}
