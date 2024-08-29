import { useEffect } from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Button from '@/components/common/base/Button';
import {  useTranslations } from 'next-intl';


interface InlineDealsPlacementProps {
  image: string;
  title: string;
  providerName: string;
  cabinClass: string;
  link: string;
  description?: string;
  impressionUrl?: string;
  trackUrl?: string;
  kayakTrackingFunc?: () => void
}

const InlineDealsPlacement = ({
  image,
  title,
  providerName,
  cabinClass,
  link,
  description,
  impressionUrl,
  trackUrl,
  kayakTrackingFunc
}: InlineDealsPlacementProps) => {
  const t=useTranslations();

  //handle impresstion
  useEffect(() => {
    if(process.env.NODE_ENV ==="production"){
    if (impressionUrl) {
      fetch(impressionUrl);
    }
    if (trackUrl) {
      fetch(trackUrl);
    }
  }
  }, []);
  const handleOnClick = () => {
    window.open(link, '_blank');
    // event for kayak ads click tracking
    if (kayakTrackingFunc) {
      kayakTrackingFunc()
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.flightInfoSection}>
        <div className={styles.legContainer}>
          <div className={styles.imageContainer}>
            {image && (
              <Image
                src={image}
                alt={providerName + ' logo'}
                priority
                width={90}
                height={0}
                objectFit="contain"
                unoptimized // To follow redirects
              />
            )}
          </div>
          <div className={styles.detailsContainer}>
            <p className={styles.titleText}>{title}</p>
            <p className={styles.subText}>
              {description ? description : t('StS0fYb7ol8uzwIIalc6B')}
              {providerName}
            </p>
          </div>
        </div>

        <div className={styles.adDetails}>
          <p className={styles.adTitle}>{providerName} </p>
          <p className={styles.adWord}>| {t('jyrtnMw1J6qfFbI8k4asw')}</p>
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceContainer}>
          <span className={styles.sign}>$</span>
          {/* no need translate following line it's just a placeholder */}
          <p className={styles.price}>price</p>
        </div>
        <p className={styles.cabinClass}>{cabinClass}</p>
        <Button variant="default" className={styles.link} onClick={handleOnClick}>
          {t('NKfOf4tKG6yu4LLVhHiTa')}
        </Button>
      </div>
    </div>
  );
};

export default InlineDealsPlacement;
