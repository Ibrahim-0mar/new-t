import { BedDouble } from 'lucide-react';
import Image from 'next/image';
import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { useTranslations } from 'next-intl';

const CompareCard = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.heading}>Chapest</h3>
        <span className={styles.roomType}>standard room</span>
        <span className={styles.bedType}>
          <BedDouble /> 1 double bed
        </span>
        <Image
          src={'https://content.r9cdn.net/rimg/provider-logos/hotels/h/BOOKINGDOTCOM.png'}
          alt={t('Nn55yNLTNjg0bi--HoA8w')}
          width={100}
          height={0}
          className={styles.providerImg}
          objectFit="cover"
        />
      </div>
      <div className={styles.right}>
        <span className={styles.price}>
          <FormatPrice price={167} currency="USD" />
        </span>
        <span className={styles.freeItem}>Free internet</span>
        <span className={styles.freeItem}>Free cancellation</span>
        <Button variant="secondary" className={styles.viewDealBtn}>
          View Deal
        </Button>
      </div>
    </div>
  );
};

export default CompareCard;
