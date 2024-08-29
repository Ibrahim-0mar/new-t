import { FlightTicket } from '@/utils/types/flights';
import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './index.module.css';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import FormatDate from '@/utils/helper/FormatDateComponent';

const DealCard = ({ ticket }: { ticket: FlightTicket }) => {
  const { currency , airline, departure, legs, price, tripType } = ticket;

  const t = useTranslations();
  return (
    <Link
      target="_blank"
      href={`/flights/search/${legs?.origin?.toUpperCase()}-${legs?.destination?.toUpperCase()}/${dayjs().add(14, 'day').format('YYYY-MM-DD')}`}
      className={styles.dealCard}
    >
      <div className="flex gap-3">
        <Image
          src={airline?.image_url}
          alt={t('AuNDbkKKnBV2v4MNCu_cR', { airline: airline?.name })}
          width={80}
          height={0}
          loading="lazy"
        />
        <div className={styles.dateContainer}>
          <span className={styles.date}>
            <FormatDate date={departure} />
          </span>
          <span className={styles.airline}>
            {legs?.origin}-{legs?.destination}{' '}
            {t('24xTJE84V3RL_UQuuuB-1', {
              airline: airline?.name,
            })}
          </span>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <span>{tripType}</span>
        <span>
          {t(
            's9_rsxCjtlhXTQbn1LZP6',
            { price },
            { number: { currency: { style: 'currency', currency, numberingSystem: 'latn' } } },
          )}
          {'>'}
        </span>
      </div>
    </Link>
  );
};

export default DealCard;
