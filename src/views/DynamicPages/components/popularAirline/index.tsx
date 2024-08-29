import { cn } from '@/utils/helper/tailwind_cn';
import { PopularFlight } from '@/utils/types/common/dynamicPages';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import FormatDate from '@/utils/helper/FormatDateComponent';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

const PopularAirlineRow = ({
  airline: {
    PopularFlights: { cabinClass, currency, departure, price, tripType },
  },
  originName,
  destinationName,
}: {
  airline: PopularFlight;
  originName: string;
  destinationName: string;
}) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div id="lg" className={styles.rowItem}>
        <span className={styles.colItem}>{originName}</span>
        <span className={styles.colItem}>{destinationName}</span>
        <span className={styles.colItem}>
          {tripType} / {cabinClass}
        </span>

        <span className={styles.colItem}>
          <FormatDate
            date={departure}
            replaceFormatWith={{
              dateStyle: 'long',
            }}
          />
        </span>
        <span className={styles.colItem}>
          <FormatPrice price={Number(price)} currency={currency} />
        </span>
      </div>
      <div className={cn(styles.rowItem, styles.subGrid)}></div>
      <div id="mobile" className={styles.dealCard}>
        <div className={styles.col}>
          <span className={styles.bold}>
            {originName}-{destinationName}
          </span>
          <span className={styles.reguler}>
            <FormatDate
              date={departure}
              replaceFormatWith={{
                dateStyle: 'long',
              }}
            />
          </span>
        </div>
        <div className={styles.col}>
          <span className={styles.reguler}>{tripType}</span>
          <span className={styles.reguler}>{cabinClass}</span>
          <span className={styles.bold}>
            {t(
              'YLKcQDkm-l6YId9Q6gv3U',
              { price },
              { number: { currency: { style: 'currency', currency, numberingSystem: 'latn' } } },
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularAirlineRow;
