import { locale } from '@/navigation';
import TopFlights from '@/sections/flights/TopFlightsSection';
import { unstable_setRequestLocale } from 'next-intl/server';

const TopFlightsSection = ({
  params: { locale },
  searchParams,
}: {
  params: { locale: locale };
  searchParams: { [key: string]: string };
}) => {
  unstable_setRequestLocale(locale);

  return <TopFlights searchParams={searchParams} />;
};

export default TopFlightsSection;
