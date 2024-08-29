import Image from 'next/image';
import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { useTranslations } from 'next-intl';

const FareOptionCard = () => {
  const t = useTranslations();

  return (
    <div id="fare" className={styles.fare}>
      <Image
        src="https://content.r9cdn.net/rimg/provider-logos/hotels/h/BOOKINGDOTCOM.png"
        alt={t('Nn55yNLTNjg0bi--HoA8w')}
        width={160}
        height={0}
        className={styles.providerImg}
        objectFit="cover"
      />
      <div className={styles.fareDetails}>
        <span className={styles.advantage}>Free internet</span>
        <span className={styles.price}>
          <FormatPrice price={167} currency="USD" />
        </span>
        <Button variant="secondary" className={styles.viewDealBtn}>
          View Deal
        </Button>
      </div>
    </div>
  );
};

export default FareOptionCard;
