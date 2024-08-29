'use client';

import ArrowRight from '@/components/common/base/ArrowRight';
import { defaultCurrency } from '@/services/data/common';
import { backendImagesUrl } from '@/utils/config';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { TopCountryType, TopFlightType } from '@/utils/types/flights';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const TopSectionCard = (props: TopFlightType | TopCountryType) => {
  const { destination, prices, image, href } = props;

  const t = useTranslations();

  const { code: currencyCode } = globalDataGetter('client', 'currency') || defaultCurrency;

  return (
    <a href={href || ''} className={styles.cardContainer} target="_blank">
      <Image
        src={image && image.includes('http') ? image : backendImagesUrl + image}
        alt={destination + ' image'}
        className={styles.cardImage}
        fill
        loading="lazy"
        sizes="100vw"
        quality={50}
      />

      <div className={styles.darkOverlay} />
      {/* Overlay */}
      <div className={styles.contentContainer}>
        <div className={styles.priceContainer}>
          <div className={styles.dataSection}>
            <h4 className={styles.cityHeader}>
              {/* {origin}- */}
              {destination}
            </h4>
            <p className={styles.price}>
              {t(
                's9_rsxCjtlhXTQbn1LZP6',
                { price: prices?.oneway },
                { number: { currency: { style: 'currency', currency: currencyCode } } },
              )}
            </p>
          </div>
          <div className={styles.iconSection}>
            <div className={styles.iconContainer}>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default TopSectionCard;
