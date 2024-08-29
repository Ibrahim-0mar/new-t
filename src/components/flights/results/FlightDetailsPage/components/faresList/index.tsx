'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';
import { backendImagesUrl, imagesUrl } from '@/utils/config';
import Button from '@/components/common/base/Button';
import ImageComponent from '@/components/common/base/ImageComponent';
import Tooltip from '@/components/common/base/Tooltip';
import { Luggage, Briefcase, Repeat } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { eventsOnFlightSelect } from '@/utils/events/flights/search';
import { SortBarData } from '@/views/flights/search/FlightResults';
import { useTranslations } from 'next-intl';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
type FaresListTpe = {
  fares: FlightPricingOption[];
  searchId: string;
  adults: number;
  childrenNo: number;
  infants: number;
  itineraryId: string;
  allSegments: TransformedSegmentType[];
  tripType: 'oneway' | 'round' | 'multi';
  cabinClass: string;
  sortedData: SortBarData;
  legs: TransformedLegType[];
};
const FaresList = ({
  fares,
  searchId,
  adults,
  childrenNo,
  infants,
  itineraryId,
  allSegments,
  tripType,
  cabinClass,
  sortedData,
  legs,
}: FaresListTpe) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const selectedProviders = searchParams.get('providers');
  const selectedFares = selectedProviders
    ? fares.filter((fare) => selectedProviders.includes(fare.agent))
    : [];
  const restFares = selectedProviders
    ? fares.filter((fare) => !selectedProviders.includes(fare.agent))
    : fares;

  const handleViewDeal = (fare: FlightPricingOption) => {
    if (typeof window != 'undefined') {
      localStorage.setItem('redirectSegments', JSON.stringify(allSegments));
      window.open(
        `/flights/book?adults=${adults}&agentName=${fare.agentName}&children=${childrenNo}&country=US&currency=${fare?.price?.currency}&infants=${infants}&itineraryId=${itineraryId}&price=${fare?.price?.amount}&searchId=${searchId}&token=${fare.deepLink}&&tripType=${tripType}&cabin=${cabinClass}`,
        '_blank',
      );
    }

    const flightSelectTrackingData = {
      fare,
      searchId,
      adults,
      childrenNo,
      infants,
      itineraryId,
      tripType,
      cabinClass,
      sortedData,
      legs,
    };
    eventsOnFlightSelect(flightSelectTrackingData);
    /*
    TODO: flightSelect event
    1- isCheapest || isFastest ..etc [done]
    2- baggageAllawance if founded [done]
    3- ticketPosition [Not applicable]
    4- The rest of redirect event data [done]
    */
  };
  const maxBagaggeValuesNames = {
    totalPieces: t('v2vtG3EJJxYDZT0mGDVMX'),
    totalKilos: t('yV9xLfy_ypYbZWUiEYtJh'),
    totalBaggages: t('Oj2N0Mh5T5PflG08Q5EAX'),
    BaggagesInKilos: t('9vT5PWEHWUJHB0C8BOBmT'),
    totalHandbages: t('QOjcm__Y0fTumjIXCPZ_W'),
    HandbagesInKilos: t('-J8-TbRzOD88O2AI5zRVL'),
    totalPrice: t('kiytwY0LMHFs0F82_V7R7'),
    totalBaggagePrice: t('xS23StcUy5m0vhWNAHpZ8'),
    totalHandbagPrice: t('kjqH9Cu5pwpH0NIV_c8jL'),
  };
  const availableRestrictionsNames = {
    refundable: t('kc2FkjjrY5B66cGyR3E-5'),
    changePenalties: t('oz1dSB6GhoK6C7WMYyUy8'),
    changable: t('HcrRo46iAurAibI_ESF6E'),
  };


  const renderFareContent = (fare: FlightPricingOption) => (
    <div key={fare.agent} className={cn(styles.fareCard, 'last:border-0')}>
      <Tooltip tooltipBody={fare.agentName}>
        <ImageComponent
          src={
            backendImagesUrl +
            'public/images/agentsPng/' +
            fare.agentName.toLowerCase().replace(/\s/g, '') +
            '.png'
          }
          alt={fare.agentName + ' logo'}
          width={100}
          height={0}
          loading="lazy"
          className={styles.imgContainer}
          defaultImage={imagesUrl + '/flights/defaultAgent.png'}
        />
      </Tooltip>

      <div className={styles.fareDetailsContainer}>
        <div className={styles.metaDetailsContainer}>
          {fare.meta?.baggage && Object.entries(fare.meta?.baggage).length > 0 && (
            <Tooltip
              tooltipBody={
                <div className={styles.tooltipContainer}>
                  {Object.entries(fare.meta?.baggage).map(([key, value]) => {
                    if (value > 0) {
                      return (
                        <div key={key} className={styles.tooltipItem}>
                          <span className={styles.tooltipItemKey}>
                            {maxBagaggeValuesNames[key as keyof FlightBaggageAllowance]}:
                          </span>
                          <span>{value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              }
            >
              {(fare.meta.baggage?.totalBaggages !== 0 ||
                fare.meta.baggage?.BaggagesInKilos ||
                fare.meta.baggage?.totalHandbages !== 0 ||
                fare.meta.baggage?.HandbagesInKilos !== 0) && (
                <div className={styles.baggageDetails}>
                  {(fare.meta.baggage?.totalBaggages !== 0 ||
                    fare.meta.baggage?.BaggagesInKilos !== 0) && (
                    <span className={styles.baggage}>
                      <p className={styles.baggageNo}>
                        {fare.meta.baggage?.totalBaggages ? fare.meta.baggage?.totalBaggages : 1}
                      </p>
                      <Luggage
                        size={window && window.innerWidth < 500 ? 14 : 18}
                        strokeWidth={1.3}
                      />
                    </span>
                  )}
                  {(fare.meta.baggage?.totalHandbages !== 0 ||
                    fare.meta.baggage?.HandbagesInKilos !== 0) && (
                    <span className={styles.baggage}>
                      <p className={styles.baggageNo}>
                        {fare.meta.baggage?.totalHandbages ? fare.meta.baggage?.totalHandbages : 1}
                      </p>
                      <Briefcase
                        size={window && window.innerWidth < 500 ? 13 : 16}
                        strokeWidth={1.3}
                      />
                    </span>
                  )}
                </div>
              )}
            </Tooltip>
          )}
          {fare.meta?.restrictions &&
            Object.values(fare.meta?.restrictions).some((value) => value == true) && (
              <Tooltip
                tooltipBody={
                  <div className={styles.tooltipContainer}>
                    {Object.entries(fare.meta?.restrictions).map(([key, value]) => {
                      if (value) {
                        return (
                          <p key={key}>{availableRestrictionsNames[key as keyof Restrictions]}</p>
                        );
                      }
                      return null;
                    })}
                  </div>
                }
              >
                {Object.values(fare.meta?.restrictions).some((value) => value == true) && (
                  <div className="flex items-center">
                    {Object.values(fare.meta?.restrictions).some((value) => value === true) && (
                      <Repeat size={window && window.innerWidth < 500 ? 14 : 15} className="mx-1" />
                    )}
                  </div>
                )}
              </Tooltip>
            )}
        </div>

        <div className={styles.fareCost}>
          <span>{<FormatPrice price={fare.price.amount} currency={fare.price.currency} />}</span>
        </div>
      </div>

      <Button
        variant="default"
        onClick={() => handleViewDeal(fare)}
        className={styles.viewDealButton}
      >
        {t('RY4Hb3PWMJntIyajFkSWc')}
      </Button>
    </div>
  );

  return (
    <div className={styles.faresContainer}>
      <h2>
        {t('wL9l9px35VwknY3qtVCE-')} ({fares.length})
      </h2>
      <h3>{t('SswpiEp2TJoUBWsuOulfw')}</h3>

      {selectedFares.length > 0 && (
        <p className={styles.faresListHeader}>{t('Qd_acxYghdU9q74a4JYBl')}</p>
      )}
      <div className={styles.faresList}>
        {selectedFares.map((fare: FlightPricingOption) => renderFareContent(fare))}
      </div>
      {selectedFares.length > 0 && restFares.length > 0 && (
        <p className={styles.faresListHeader}>{t('EzBJEy9sX8EAymQbTDful')}</p>
      )}
      <div className={styles.faresList}>
        {restFares.length > 0 &&
          restFares.map((fare: FlightPricingOption) => renderFareContent(fare))}
      </div>
    </div>
  );
};

export default FaresList;
