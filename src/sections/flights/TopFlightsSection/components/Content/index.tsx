import Container from '@/components/common/base/Container';
import { Link, locale } from '@/navigation';
import { defaultCurrency } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { cn } from '@/utils/helper/tailwind_cn';
import { getLocale, getTranslations } from 'next-intl/server';
import styles from './index.module.css';
import { fetchTopFlighRequest } from '@/services/apis/flights/trending/fetchTopFlights';
import { fetchTopCountriesRequest } from '@/services/apis/flights/trending/fetchTopCountries';
import { fetchTopNearbyRequest } from '@/services/apis/flights/trending/fetchTopNearby';
import { revalidateData } from '@/utils/helper/cacheHelpers';
import RenderActiveSection from '../RenderActiveSection';

type ContnetType = {
  searchParams: any;
};

async function Content({ searchParams }: ContnetType) {
  const activeTab = searchParams?.['active-top'] || 'flights';

  const t = await getTranslations();

  // Fetch all required global data in parallel
  const [locale, nearbyAirportData, currencyData] = await Promise.all([
    getLocale() as Promise<locale>,
    globalDataGetter('server', 'nearbyAirport'),
    globalDataGetter('server', 'currency'),
  ]);

  // Destructure and provide defaults
  const nearbyAirport = nearbyAirportData || { code: null };
  const currency = currencyData || defaultCurrency;

  // Fetch the data in parallel not sequential
  const [topFlights, topCountries, topNearby] = await Promise.all([
    fetchTopFlighRequest({
      code: nearbyAirport.code,
      currency: currency.code,
      limit: 10,
      type: 'city',
      locale,
    }),
    fetchTopCountriesRequest({
      code: nearbyAirport.code,
      currency: currency.code,
      limit: 10,
      locale,
    }),
    fetchTopNearbyRequest({
      currency: currency.code,
      limit: 10,
      locale,
    }),
  ]);

  if (!topFlights || topFlights.length === 0) {
    const code = nearbyAirport.code;
    const type = 'city';
    revalidateData(`top-flight-${code}-${type}-${locale}-tag`);
  }

  if (!topCountries || topCountries.length === 0) {
    const code = nearbyAirport.code;
    revalidateData(`top-countries-${code}-${locale}-tag`);
  }

  if (!topNearby || topNearby.length === 0) {
    revalidateData(`top-nearby-${currency}-${locale}-tag`);
  }

  return (
    <Container className="py-8">
      <div className={styles.tabsContainer}>
        {Boolean(topFlights?.length > 0) && (
          <Link
            href={'?active-top=flights'}
            className={cn(
              styles.header,
              activeTab === 'flights' || activeTab === null ? styles.activeTab : '',
            )}
            scroll={false}
          >
            {t('iUFqod0lmJjrq6qxwdf1R')}
          </Link>
        )}

        {Boolean(topCountries?.length > 0) && (
          <Link
            href={'?active-top=countries'}
            className={cn(styles.header, activeTab === 'countries' ? styles.activeTab : '')}
            scroll={false}
          >
            {t('-rKd1tfh2wUvbnSxYWXQZ')}
          </Link>
        )}

        {Boolean(topNearby?.length > 0) && (
          <Link
            href={'?active-top=nearby'}
            className={cn(styles.header, activeTab === 'nearby' ? styles.activeTab : '')}
            scroll={false}
          >
            {t('JOlRsHvPMc_XU1aEtovzx')}
          </Link>
        )}
      </div>

      <RenderActiveSection
        activeTab={activeTab}
        nearbyAirport={nearbyAirport}
        topCountries={topCountries}
        topFlights={topFlights}
        topNearby={topNearby}
      />
    </Container>
  );
}

export default Content;
