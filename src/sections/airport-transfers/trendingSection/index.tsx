import Container from '@/components/common/base/Container';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { TrendingTransfersCardType } from '@/utils/types/airport-transfers';
import style from './index.module.css';
import { data } from './utils/data';
import dayjs from 'dayjs';
import {
  fetchPlaceCoordinates,
  fetchTransfersPlacesRequest,
} from '@/services/apis/airport-transfers/places';
import { Link, locale } from '@/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

async function TrendingSection() {
  const locale = (await getLocale()) as locale;
  const t = await getTranslations();

  const now = dayjs();
  const dateInTenDays = now.add(1, 'day');
  const formattedDate = dateInTenDays.format('YYYY-MM-DD_HH:mm');

  const nearbyAirport = await globalDataGetter('server', 'nearbyAirport');

  const nearbyPlace = await fetchTransfersPlacesRequest(
    nearbyAirport?.city?.name || nearbyAirport?.name,
    locale,
  )
    .then(async (items) => {
      if (items.length > 0) {
        const firstItem = items[0];
        const coordinates = await fetchPlaceCoordinates(firstItem?.place_id);

        return { ...firstItem, ...coordinates };
      } else {
        return null;
      }
    })
    .catch(() => null);

  return (
    <>
      {nearbyPlace && (
        <Container className={style.container}>
          <h2 className={style.header}>{t('iaHvnjlGp-d58-zPl35LA')}</h2>
          <div className={style.trendingCard}>
            {data.map((item: TrendingTransfersCardType) => {
              return (
                <Link
                  href={`/airport-transfers/search/${formattedDate}?end_lat=${nearbyPlace?.lat}&end_long=${nearbyPlace.lng}&start_lat=${item?.lat}&start_long=${item.lng}&origin_name=${nearbyPlace.description}&destination_name=${item.name}&from_type=${nearbyPlace.types[0]}&to_type=${item.from_type}&des_from=${nearbyPlace.structured_formatting.main_text}&des_to=${item.name}`}
                  target="_blank"
                  className={style.content}
                  key={item._id}
                >
                  <p className={style.destination}>{item.name}</p>
                  <p className={style.price}>{item.price}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
}
export default TrendingSection;
