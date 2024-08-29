import Button from '@/components/common/base/Button';
import LottieLoader from '@/components/common/base/LottieLoader';
import * as loader from '@/services/lotties/airport-transfers/carLoading.json';
import { formatDuration } from '@/utils/helper/dates';
import { cn } from '@/utils/helper/tailwind_cn';
import { useSearchParams } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import styles from './index.module.css';

import {
  sortByDurationAscending,
  sortByPriceAscending,
  sortByPriceDescending,
} from '@/views/common/results/AirportTransfers/utils/sort';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import {
  AirportTransfersItineraryType,
  AirportTransfersResultType,
} from '@/utils/types/airport-transfers/results';

import AirportTransfersItinerary from '@/components/airport-transfers/results/AirportTransfersItinerary';
import GoogleMap from '@/components/common/custom/GoogleMap';

interface AirportTransfersResultsProps {
  data: AirportTransfersResultType;
  isLoading: boolean;
  isCompleted: boolean;
  currency: string;
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
}

const AirportTransfersResults = ({
  data,
  isLoading,
  // isCompleted,
  currency,
  setShowMobileFilters,
}: AirportTransfersResultsProps) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const [sortedData, setSortedData] = useState<AirportTransfersItineraryType[]>(
    data?.itinerariesPrice,
  );
  const [itinerariesShown, setItinerariesShown] = useState<number>(15);
  const [sortType, setSortType] = useState<string>('cheapest');
  const [sortBarData, setSortBarData] = useState({
    cheapest: { minPrice: '', duration: '' },
    priciest: { minPrice: '', duration: '' },
    fastest: { minPrice: '', duration: '' },
  });

  const cheapestTicketPrice = data?.itinerariesPrice[0].minPrice;
  const searchParams = useSearchParams();

  const handleSortData = () => {
    const dataToSorted = [...data?.itinerariesPrice];
    switch (sortType) {
      case 'cheapest':
        setSortedData(sortByPriceAscending(dataToSorted));
        break;
      case 'priciest':
        setSortedData(sortByPriceDescending(dataToSorted));
        break;
      case 'fastest':
        setSortedData(sortByDurationAscending(dataToSorted));
        break;

      default:
        setSortedData(sortByPriceAscending(dataToSorted));
        break;
    }
  };
  const getSortBannerData = () => {
    const cheapest = [...data.itinerariesPrice].reduce((prev, curr) =>
      prev.minPrice < curr.minPrice ? prev : curr,
    );
    const priciest = [...data.itinerariesPrice].reduce((prev, curr) =>
      prev.minPrice > curr.minPrice ? prev : curr,
    );
    const fastest = [...data.itinerariesPrice].reduce((prev, curr) => {
      if (prev.duration < curr.duration) return prev;
      else if (prev.duration === curr.duration) {
        // if the duration equals return the lower price
        if (prev.minPrice < curr.minPrice) {
          return prev;
        } else {
          return curr;
        }
      } else {
        return curr;
      }
    });
    setSortBarData({ cheapest, priciest, fastest });
  };

  useEffect(() => {
    handleSortData();
    getSortBannerData();
  }, [sortType, data]);

  return (
    <>
      <div className={styles.container}>
        {/* if still loading getting more resullts */}
        {isLoading && (
          <div className={styles.loaderContainer}>
            <LottieLoader animationData={loader} width={25} height={25} />
            <p>{t('VQjgn4--_frp4cyFyHMV3')}</p>
          </div>
        )}
        <GoogleMap
          variant="ride"
          from={{
            lat: Number(searchParams.get('start_lat')),
            lng: Number(searchParams.get('start_long')),
          }}
          to={{
            lat: Number(searchParams.get('end_lat')),
            lng: Number(searchParams.get('end_long')),
          }}
          withDetails
          withRouteAlternatives
          className={styles.mapContainer}
        />

        <div className={styles.fliterAndSort}>
          <Button
            variant="default"
            onClick={() => setShowMobileFilters(true)}
            className={styles.filterButton}
          >
            {t('wmtxtgSzxdYaAl1Elc5A_')}
          </Button>
        </div>

        {/* data list  */}
        {data && sortedData && sortedData.length > 0 ? (
          <>
            {/* Sort Section */}
            <div className={styles.sortContainer}>
              <Button
                variant="default"
                className={cn(styles.sortCard, sortType === 'cheapest' ? styles.activeSort : '')}
                onClick={() => setSortType('cheapest')}
              >
                <p className={styles.sortHeader}>{t('ikSpi3Wm9IJUCvQ0ic6qn')}</p>
                {data && data.itinerariesPrice.length > 0 ? (
                  <div className={styles.sortData}>
                    <span className={styles.sortPrice}>
                      {' '}
                      <FormatPrice
                        price={Number(sortBarData.cheapest.minPrice)}
                        currency={currency}
                      />{' '}
                    </span>
                    <span> {formatDuration(Number(sortBarData.cheapest.duration), locale)} </span>
                  </div>
                ) : null}
              </Button>
              <Button
                variant="default"
                className={cn(styles.sortCard, sortType === 'priciest' ? styles.activeSort : '')}
                onClick={() => setSortType('priciest')}
              >
                <p className={styles.sortHeader}>{t('uSjuB4yg1LlTGuwE0J7gr')}</p>
                {data && data.itinerariesPrice.length > 0 ? (
                  <div className={styles.sortData}>
                    <span className={styles.sortPrice}>
                      {' '}
                      <FormatPrice
                        price={Number(sortBarData.priciest.minPrice)}
                        currency={currency}
                      />{' '}
                    </span>
                    <span> {formatDuration(Number(sortBarData.priciest.duration), locale)} </span>
                  </div>
                ) : null}
              </Button>

              <Button
                variant="default"
                className={cn(styles.sortCard, sortType === 'fastest' ? styles.activeSort : '')}
                onClick={() => setSortType('fastest')}
              >
                <p className={styles.sortHeader}>{t('GjTOpagb59SKoEyKOHQ36')}</p>
                {data && data.itinerariesPrice.length > 0 ? (
                  <div className={styles.sortData}>
                    <span className={styles.sortPrice}>
                      {' '}
                      <FormatPrice
                        price={Number(sortBarData.fastest.minPrice)}
                        currency={currency}
                      />{' '}
                    </span>
                    <span> {formatDuration(Number(sortBarData.fastest.duration), locale)} </span>
                  </div>
                ) : null}
              </Button>
            </div>
            {sortedData
              .slice(0, itinerariesShown)
              .map((itinerary: AirportTransfersItineraryType, index: number) => {
                return (
                  <Fragment key={itinerary.id + index}>
                    <AirportTransfersItinerary
                      itinerary={itinerary}
                      searchId={data.searchId}
                      currency={currency}
                      isCheapest={cheapestTicketPrice === itinerary.minPrice}
                    />
                  </Fragment>
                );
              })}
            {sortedData.length > itinerariesShown ? (
              <Button
                variant="default"
                className={styles.showMoreButton}
                onClick={() => setItinerariesShown(itinerariesShown + 15)}
              >
                {t('s8lfBw6wHcO4W9aUVXksF')}
              </Button>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default AirportTransfersResults;
