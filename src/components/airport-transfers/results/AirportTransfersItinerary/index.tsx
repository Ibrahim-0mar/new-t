import Button from '@/components/common/base/Button';
import { formatDuration } from '@/utils/helper/dates';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import { Briefcase, Clock4, CopyX, UserRound } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import {
  AirportTransfersItineraryType,
  AirportTransfersLegType,
} from '@/utils/types/airport-transfers/results';

const AirportTransfersItinerary = ({
  itinerary,
  searchId,
  currency,
  isCheapest,
}: {
  itinerary: AirportTransfersItineraryType;
  searchId: string;
  currency: string;
  isCheapest: boolean;
}) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const details: AirportTransfersLegType = itinerary.legs[0]; // backend put details at leg[0]
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();
  const { pricingOptions } = itinerary;
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get('showDetails') === itinerary.id;

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

  const _renderItineraryPrice = (option: any) => {
    if (
      searchParams.get('adults') &&
      Number(searchParams.get('adults')) > 1 &&
      option?.price?.person
    ) {
      return (
        <>
          <p className={styles.price}>
            <FormatPrice price={option.price.person} currency={currency} />
            <span className={styles.person}>/{t('deX3dRrJxO_Ep35f7p1xO')}</span>{' '}
          </p>
          <p className={styles.totalPrice}>
            {t('7jDHGjFH7jyGW068QnFF6')}:{' '}
            <FormatPrice price={option?.price?.amount} currency={currency} />
          </p>
        </>
      );
    } else {
      return (
        <p className={styles.price}>
          <FormatPrice price={option?.price?.amount} currency={currency} />
        </p>
      );
    }
  };

  const handleBook = () => {
    localStorage.setItem('airportTransferResultsLegs', JSON.stringify(itinerary.legs));
    const url = `/airport-transfers/book?adults=${searchParams.get('adults') || 1}&agentName=${pricingOptions[0].agentName}&children=${searchParams.get('children') || 0}&currency=${currency}&infants=${searchParams.get('infants') || 0}&itineraryId=${itinerary.id}&price=${pricingOptions[0].price.amount}&searchId=${searchId}&token=${pricingOptions[0].deepLink}&viehcleType=${details.viehcle_type}&maxPassengers=${details.max_passengers}&maxBags=${details.max_bags}&isCheapest=${isCheapest}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className={styles.container}>
        {/* infoSection section */}
        <div className={styles.infoSection}>
          <div className={styles.legContainer}>
            {/* airlines images  */}
            <div className={styles.imageContainer}>
              {details.carImage_url && details.carImage_url.includes('http') ? (
                <img
                  src={details.carImage_url}
                  alt={details.model}
                  loading="lazy"
                  className={styles.image}
                 
                />
              ) : (
                <img src={details.carImage_url} alt={details.model} width={200} height={0} />
              )}
            </div>
            <div className={styles.dataContainer}>
              <h4 className={styles.header}>
                {' '}
                {details?.viehcle_type +
                  ' ' +
                  details?.make +
                  ' ' +
                  1 +
                  ' to ' +
                  details.max_passengers +
                  ' Passengers'}
              </h4>
              <p className={styles.bookingSite}>{itinerary.pricingOptions[0].agentName}</p>
              <span className={styles.description}>{details.description}</span>
              <div className={styles.bottomIcons}>
                <div className={styles.iconSection}>
                  <Clock4 size={14} className={styles.icon} />
                  {t('-HROKcWaoxNis_cZ0WRfo')}: {formatDuration(details.time, locale)}
                </div>
                {details.free_cancellation && (
                  <div className={styles.iconSection}>
                    <CopyX size={14} className={styles.icon} /> {t('_iciFGmP7UF3jaYJd6Tbh')}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.baggageDetails}>
            <p className={styles.baggageNo}>
              {details.max_passengers + '  '}
              <UserRound
                className={styles.baggageIcon}
                size={window && window.innerWidth < 500 ? 14 : 16}
              />
            </p>

            <p className={styles.baggageNo}>
              {details.max_bags + '  '}
              <Briefcase
                className={styles.baggageIcon}
                size={window && window.innerWidth < 500 ? 13 : 16}
              />
            </p>
          </div>
        </div>
        {/* price section */}
        <div className={styles.priceSection}>
          {_renderItineraryPrice(pricingOptions[0])}

          <p className={styles.priceInfo}>{t('birSIucPdU_70a5HskgN5')}</p>
          <p className={styles.priceInfo}>{details.class}</p>

          <Button variant="default" className={styles.button} onClick={() => handleBook()}>
            {t('yHQcSTyS8XDoVZERHxyLC')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AirportTransfersItinerary;
