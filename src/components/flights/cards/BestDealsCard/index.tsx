'use client';
import ArrowRight from '@/components/common/base/ArrowRight';
import { backendImagesUrl } from '@/utils/config';
import { cn } from '@/utils/helper/tailwind_cn';
import { BestDealsCardType } from '@/utils/types/flights';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MouseEvent } from 'react';
import styles from './index.module.css';

const BestDealsCard = (props: BestDealsCardType) => {
  const { destination, prices, image, currencyCode, origin, destinationCity } = props;
  const t = useTranslations();

  const handleClick = (
    e: MouseEvent<HTMLParagraphElement, MouseEvent>,
    type: 'one-way' | 'round',
  ) => {
    e.stopPropagation();
    if (type === 'one-way') {
      window.open(
        `/flights/search/${origin?.code}-${destinationCity}/${dayjs()
          .add(14, 'days')
          .format('YYYY-MM-DD')}`,
        '_blank',
      );
    } else {
      window.open(
        `/flights/search/${origin?.code}-${destinationCity}/${dayjs()
          .add(14, 'days')
          .format(
            'YYYY-MM-DD',
          )}/${destinationCity}-${origin?.code}/${dayjs().add(21, 'days').format('YYYY-MM-DD')}`,
        '_blank',
      );
    }
  };

  return (
    <a
      href={`/flights/search/${origin?.code}-${destinationCity}/${dayjs()
        .add(14, 'days')
        .format('YYYY-MM-DD')}`}
      className={cn(styles.cardContainer, props.cardClassName && props.cardClassName)}
      target="_blank"
    >
      <Image
        src={backendImagesUrl + image}
        alt={t('eLZoo9NELngZBbkopRRX5', { origin: origin?.name, destination })}
        className={styles.cardImage}
        fill
        loading="lazy"
        sizes="100vw"
        quality={30}
      />

      <div className={styles.darkOverlay} />
      {/* Overlay */}
      <div className={styles.contentContainer}>
        <div className={styles.priceContainer}>
          <h4 className={styles.cityHeader}>{destination}</h4>
          <p className={styles.price} onClick={(e: any) => handleClick(e, 'one-way')}>
            {t(
              '4cQ5Pi-m_QAOpXBiLCqSg',
              { price: prices?.oneway },
              {
                number: {
                  currency: { style: 'currency', currency: currencyCode, numberingSystem: 'latn' },
                },
              },
            )}
          </p>
          <p className={styles.price} onClick={(e: any) => handleClick(e, 'round')}>
            {t(
              'EKKyOMl8PKOLd03LxEYaw',
              { price: prices?.round },
              {
                number: {
                  currency: { style: 'currency', currency: currencyCode, numberingSystem: 'latn' },
                },
              },
            )}
          </p>
        </div>
        <div className={styles.iconSection}>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BestDealsCard;
