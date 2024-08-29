import { ChevronDown } from 'lucide-react';
import CheapestFlightRow from '../../components/cheapestFlightRow';
import styles from './index.module.css';
import { cheapestPerMonths } from '@/services/apis/dynamicPages';
import { DynamicPageSectionProps } from '@/utils/types/common/dynamicPages';
import { defaultCurrency, defaultLanguage } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { getLocale, getTranslations } from 'next-intl/server';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';

const CheapestFlightFound = async ({ origin, destination }: DynamicPageSectionProps) => {
  const [t, locale, currency] = await Promise.all([
    getTranslations(),
    getLocale() as Promise<locale>,
    globalDataGetter('server', 'currency')
      .then((currency: any) => currency ?? defaultCurrency)
      .catch(() => defaultCurrency),
  ]);

  const language = languagesMap.find((l) => l.code === locale) || defaultLanguage;

  const data = await cheapestPerMonths(origin, destination, currency, locale, language);

  const dataArray =
    data &&
    Object.values(data)
      // untill we get the data already filtered from the backend
      .filter((month) => month.price !== 0);

  const max = dataArray && Math.max(...dataArray.map((month) => month.price));
  const min =
    dataArray &&
    Math.min(...dataArray.filter((month) => month.price !== 0).map((month) => month.price));

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (!dataArray || dataArray.length === 0 || !max) return null;
  return (
    <div className={styles.mainContainer}>
      <h2>{t('mc2tbhccFgCXHokzk1hm3')}</h2>
      <div className={styles.container}>
        {dataArray.map((month, index) => {
          return (
            <CheapestFlightRow
              key={index}
              bgColor={month.price === min ? 'blue' : 'white'}
              month={{
                name: monthNames[index],
                price: month.price,
                currency: month.currency,
              }}
              percentage={(month.price / max) * 100}
            />
          );
        })}
      </div>
      {/* ask how to implement this */}
      <span className={styles.moreDetails}>
        {t('0ydgdjocNyAlxOcnrHFX4')} <ChevronDown size={20} className="mt-1" />
      </span>
    </div>
  );
};

export default CheapestFlightFound;
