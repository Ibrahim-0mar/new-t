import CardsLoading from '@/app/[locale]/(homepage)/@BestDealsSection/loading';
import { locale } from '@/navigation';
import { fetchTredingDestionRequest } from '@/services/apis/flights/trending/fetchTrendingDestinations';
import { defaultCurrency } from '@/services/data/common';
import { revalidateData } from '@/utils/helper/cacheHelpers';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { BestDealsCardType } from '@/utils/types/flights';
import { getLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import RenderItem from '../RenderItem';
import BestDealsSwiper from '../SwipperComponent';

const CardsContainer = async () => {
  const deviceView = headers().get('x-viewport');

  // Fetch locale, nearby airport data, and currency data in parallel
  const [locale, nearbyAirportData, currencyData] = await Promise.all([
    getLocale() as Promise<locale>,
    globalDataGetter('server', 'nearbyAirport').then((airport: any) => airport ?? { code: null }),
    globalDataGetter('server', 'currency').then((currency: any) => currency || defaultCurrency),
  ]);

  const data = await fetchTredingDestionRequest({
    code: nearbyAirportData.code,
    limit: 10,
    currency: currencyData.code,
    locale,
  });

  if (!data || data.length === 0) {
    const code = nearbyAirportData.code;
    revalidateData(`trending-${code}-${locale}-tag`);
    return <CardsLoading className="!px-0" />;
  }

  return (
    <>
      {deviceView === 'desktop' ? (
        <div className="hidden w-full grid-cols-4 gap-5 lg:grid xl:grid-cols-5">
          {data?.map((item: BestDealsCardType) => (
            <RenderItem
              item={item}
              key={item.id}
              currencyCode={currencyData.code}
              origin={nearbyAirportData}
            />
          ))}
        </div>
      ) : (
        <BestDealsSwiper data={data} />
      )}
    </>
  );
};

export default CardsContainer;
