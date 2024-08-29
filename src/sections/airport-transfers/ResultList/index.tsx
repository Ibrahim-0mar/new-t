// import { ArrowDownWideNarrow } from 'lucide-react';
import Button from '@/components/common/base/Button';
import { airportTransfersImgUrl, commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import GoogleMap from '../../../components/common/custom/GoogleMap';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

function TransfersResultSection() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      {/* Example for map component for "ride" (contains two coordinate: from & to) */}
      <GoogleMap
        variant="ride"
        from={{ lat: 30.0444, lng: 31.2357 }}
        to={{ lat: 30.1444, lng: 31.2357 }}
        withDetails
        withRouteAlternatives
      />
      <div className={styles.sortCard}>
        <div className={styles.cheapPrice}>
          <p className={styles.cheapst}>Price-Lowest</p>
          <p className={styles.duration}>EGP 413</p>
        </div>
        <div className={styles.cheapPrice}>
          <p className={styles.cheapst}>Price-Highest</p>
          <p className={styles.duration}>EGP 17,693</p>
        </div>
        <div className={styles.cheapPrice}>
          <p className={styles.cheapst}>Fastest to destination</p>
          <p className={styles.duration}>EGP 413</p>
        </div>
      </div>
      <div className={styles.itineraryCard}>
        {/* flightInfoSection section */}
        <div className={styles.flightInfoSection}>
          <div className={styles.legContainer}>
            <div className={styles.carImage}>
              <Image
                src={'https://content.travolic.com/images/airlines/SV/SV.png'}
                alt={t('zhOgwK_X9lLHxtIXymmG_')}
                width={100}
                height={0}
              />
            </div>
            <div className={styles.times}>
              <p className={styles.deaputre}>Sedan Nissan 1-3passengers</p>
              <p className={styles.Airport}>Airport</p>
            </div>
          </div>
          <div className={styles.legContainer}>
            <div className={styles.durationCard}>
              <Image
                src={airportTransfersImgUrl('time.svg')}
                width={20}
                height={20}
                alt={t('GMg-_eyZJpXyvWAiDZWKx')}
              />
              <p className={styles.duration}>Journey Duration</p>
            </div>
            <div className={styles.durationCard}>
              <Image
                src={airportTransfersImgUrl('greet.svg')}
                width={20}
                height={20}
                alt={t('GMg-_eyZJpXyvWAiDZWKx')}
              />
              <p className={styles.duration}>Journey Duration</p>
            </div>
          </div>
          <div className="border-t-2">
            <div className={styles.moreDetails}>
              <div className={styles.bags}>
                <p>1</p>
                <Image
                  src={commonImgUrl('bag.svg')}
                  width={10}
                  height={10}
                  alt={t('GMg-_eyZJpXyvWAiDZWKx')}
                  className={styles.img}
                />
                <p>2</p>
                <Image
                  src={commonImgUrl('tavel-bags.svg')}
                  width={10}
                  height={10}
                  alt={t('GMg-_eyZJpXyvWAiDZWKx')}
                  className={styles.img}
                />
              </div>
            </div>
          </div>
        </div>
        {/* price section */}
        <div className={styles.priceSection}>
          <p className={styles.price}>EGP</p>

          <p className={styles.cabinClass}>Price for 1 vehicle</p>
          <Button variant="default" className={styles.button}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
export default TransfersResultSection;
