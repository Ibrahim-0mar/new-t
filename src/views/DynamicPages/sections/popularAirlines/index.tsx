import { popularFlights } from '@/services/apis/dynamicPages';
import { getPlaceNameByCode } from '@/services/apis/flights/places';
import { defaultCurrency } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { DynamicPageSectionProps } from '@/utils/types/common/dynamicPages';
import PopularAirlineRow from '../../components/popularAirline';
import styles from './index.module.css';
import { getLocale, getTranslations } from 'next-intl/server';
import { locale } from '@/navigation';

const PopularAirlines = async ({ origin, destination }: DynamicPageSectionProps) => {
  const locale = (await getLocale()) as locale;
  const t = await getTranslations();

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const data = await popularFlights(origin, destination, currency, locale);

  const originName = origin?.name && (await getPlaceNameByCode(origin, locale));

  if (!data || data.length === 0 || !originName) return null;
  return (
    <div className={styles.mainContainer}>
      <h2>
        {t.rich('LkZVdyHY0MYMU644R6W6j', {
          origin: origin?.name,
          destination: destination?.name,
          br: () => <br />,
        })}
      </h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>{t('OlKZ99g3Bq8O-QZ5KkMuq')}</span>
          <span>{t('TR6HhuwzTSU-9TAtZMbxL')}</span>
          <span>{t('s0G5vXt2FVg-ganKWiT1e')}</span>
          <span>{t('lJHa3KmeN61oop4-2fsd7')}</span>
          <span>{t('g_SLnsO_PUkukyk-n87md')}</span>
        </div>
        {data?.map(async (airline, index) => {
          const destinationName = await getPlaceNameByCode(
            {
              code: airline?.PopularFlights?.destination,
              type: 'airport',
            },
            locale,
          );
          return (
            <PopularAirlineRow
              key={index}
              airline={{PopularFlights:{...airline.PopularFlights,currency:currency.code}}}
              originName={originName}
              destinationName={destinationName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularAirlines;
