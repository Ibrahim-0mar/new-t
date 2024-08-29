import { locale } from '@/navigation';
import { cheapestAirlines } from '@/services/apis/dynamicPages';
import { defaultCurrency, defaultLanguage } from '@/services/data/common';
import { languagesMap } from '@/services/data/languages';
import FormatDate from '@/utils/helper/FormatDateComponent';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { cn } from '@/utils/helper/tailwind_cn';
import { DynamicPageSectionProps } from '@/utils/types/common/dynamicPages';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import styles from './index.module.css';

const AirlinesPriceComparison = async ({ origin, destination }: DynamicPageSectionProps) => {
  const [t, locale, currency] = await Promise.all([
    getTranslations(),
    getLocale() as Promise<locale>,
    globalDataGetter('server', 'currency')
      .then((currency: any) => currency ?? defaultCurrency)
      .catch(() => defaultCurrency),
  ]);

  const language = languagesMap.find((l) => l.code === locale) || defaultLanguage;

  const data = await cheapestAirlines(origin, destination, currency, locale, language);

  const cheapestAirline = data && data![0];
  const maxPrice = data && data.length !== 0 && data![data!.length - 1].price;

  if (!data || data!.length === 0 || !cheapestAirline || !maxPrice) return null;

  return (
    <div className={styles.mainContainer}>
      <h2>{t('lHQr5W-Pfh8B_UhCFKQ1R')}</h2>
      <div className={styles.container}>
        <div id="left col">
          <div id="left headr" className={styles.leftHeaderContainer}>
            <div className={styles.rightHeaderItem}>
              <span className={styles.cheapestHeading}>{t('vTkEAtBdQFsWG2nRXPhYM')}</span>
            </div>
          </div>
          <div id="left body" className={styles.leftBodyContent}>
            {data.map((item, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image
                  src={item?.airline?.image?.url || item?.airline?.image_url}
                  alt={t('jf3AxVHAWrmfMMYghJLGn', { airline: item.airline.name })}
                  width={87}
                  height={0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.rightHeader}>
            <div className={styles.rightHeaderItem}>
              <span>{t('HiAyx0TQT_v-V31zSTIun')}</span>
              <div className={styles.cheapestImageContainer}>
                <Image
                  src={cheapestAirline?.airline?.image?.url || cheapestAirline?.airline?.image_url}
                  alt={t('IWx3-AwcCD-6ss1kjGhJo', { airline: cheapestAirline.airline.name })}
                  width={100}
                  height={0}
                />
              </div>
            </div>
            <div className={cn(styles.rightHeaderItem, 'border-x-[1px] border-seventh')}>
              <span>{t('22UEWXs_gSMnSh6pGWlg_')}</span>
              <span className="text-sixth">
                <FormatDate
                  date={cheapestAirline.departure}
                  replaceFormatWith={{
                    month: 'short',
                  }}
                />
              </span>
            </div>
            <div className={styles.rightHeaderItem}>
              <span>{t('elCcbf4xKgh-AjAEl7JqJ')}</span>
              <span className="text-sixth">
                <FormatDate
                  date={cheapestAirline.departure}
                  replaceFormatWith={{
                    weekday: 'short',
                  }}
                />
              </span>
            </div>
          </div>
          <div id="right body" className={styles.rightBodyContainer}>
            {data.map((item, index) => {
              const airlinePrice = item.price;
              return (
                <div key={index} className={styles.BarContainer}>
                  <span
                    style={{
                      width: `${(airlinePrice / maxPrice) * 100}%`,
                      backgroundColor: `rgba(43,166,222,${
                        airlinePrice === cheapestAirline.price ? 1 : 0.4
                      })`,
                    }}
                    className={styles.barFill}
                  >
                    <FormatPrice price={airlinePrice} currency={currency.code} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlinesPriceComparison;
