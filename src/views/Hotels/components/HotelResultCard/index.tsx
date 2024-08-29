'use client';
import Image from 'next/image';
import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Utensils, Wifi } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import HotelDetailsModal from '../HotelDetailsModal';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import { diffBetweenTwoDates } from '@/utils/helper/dates';
import dayjs from 'dayjs';
import ChevronRight from '@/components/common/base/ChevronRight';
import { useRouter } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { useTranslations } from 'next-intl';

const HotelResultCard = (props: HotelCardType) => {
  const {
    hotel,
    checkIn,
    checkOut,
    images,
    minPrice,
    stars,
    pricingOptions,
    amenities: { wifi, breakfast },
    rating,
    numberOfGuests,
  } = props;
  const {
    name,
    city: { name: cityName },
  } = hotel;
  const numberOfNights = diffBetweenTwoDates(
    dayjs(checkOut).toDate(),
    dayjs(checkIn).toDate(),
    'day',
  ); // TODO: Should be replaced with `<FormatDate range date={checkOut} endDate={checkIn} additionalFormats={{...anyOtherFormats}}/>`
  const t = useTranslations();

  const searchParams = useSearchParams();
  const router = useRouter();
  const isModalOpen = searchParams.get('showDetails') === name;

  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const openDetails = () => {
    if (searchParams.has('showDetails')) {
      router.push(`?showDetails=${name}`);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);

      router.push(`?${newSearchParams.toString()}&showDetails=${name}`);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [isModalOpen]);

  const renderRatingStatus = (rating: number) => {
    if (rating <= 2) return 'Poor';
    else if (rating <= 3) return 'Medium';
    else if (rating <= 3.5) return 'Good';
    else if (rating <= 4.25) return 'Very Good';
    else if (rating <= 5) return 'Wonderful';
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={images}
            alt={t('hBo0sBI5lEy1q1cQpga7T')}
            fill
            className={styles.image}
            objectFit="cover"
            priority
          />
        </div>
        <div className={styles.details}>
          <div className={styles.upper}>
            <h4 className={styles.name}>{name}</h4>
            <div className={styles.stars}>
              {[...Array(stars)].map((_, i) => (
                <Icon key={i} icon="mdi:star" width="14" style={{ color: '#d6de29' }} />
              ))}
            </div>
            <span className={styles.showOnMap}>Show on map</span>
            <div className={styles.dataBottomSection}>
              <span className={styles.rating}>{Number(rating) * 2}</span>
              <div className={styles.reviewsAndLocationCont}>
                <div>
                  <h5>{renderRatingStatus(Number(rating))}</h5>
                  {/* <span>7,599 reviews</span> */}
                </div>
                <div>
                  <h5>Location</h5>
                  <span>{cityName}</span>
                </div>
              </div>
            </div>
          </div>
          {breakfast ||
            (wifi && (
              <div className={styles.lower}>
                {breakfast && (
                  <div>
                    <Utensils size={16} />
                    Breakfast included
                  </div>
                )}
                {wifi && (
                  <div>
                    <Wifi size={16} />
                    Free internet
                  </div>
                )}

                {/* <span>2.1k from center</span> */}
              </div>
            ))}
        </div>
        <div className={styles.summary}>
          <span className={styles.price}>
            <FormatPrice price={minPrice} currency={pricingOptions[0]?.price?.currency} />
          </span>
          <span className={styles.counts}>
            {numberOfNights}
            {numberOfNights === 1 ? ' night' : ' nights'} ,{numberOfGuests}
            {numberOfGuests === 1 ? ' adult' : ' adults'}
          </span>
          <span className={styles.providerName}>{pricingOptions[0].agentName}</span>
          {pricingOptions.length > 1 ? (
            <span className={styles.otherSites}>
              {' +' + `${pricingOptions.length - 1}`}{' '}
              {pricingOptions.length === 2 ? 'other site' : 'other sites'}{' '}
            </span>
          ) : null}
          <Button className={styles.viewDealBtn} onClick={openDetails}>
            View Deal
          </Button>
          <Button variant="default" className={styles.viewDetailsBtn} onClick={openDetails}>
            View Details <ChevronRight />
          </Button>
        </div>
      </div>
      {isModalOpen && <HotelDetailsModal {...props} />}
    </>
  );
};

export default HotelResultCard;
