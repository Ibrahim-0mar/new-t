'use client';
import { searchBoxValues } from '@/app/[locale]/hotels/search/[...legs]/page';
import {
  handleItineriesShape,
  mergeResults,
} from '@/app/[locale]/hotels/search/[...legs]/utils/results';
import Button from '@/components/common/base/Button';
import Container from '@/components/common/base/Container';
import LottieLoader from '@/components/common/base/LottieLoader';
import { Skeleton } from '@/components/common/base/Skeleton';
import ClearFilters from '@/components/common/custom/ClearFilters';
import { locale } from '@/navigation';
import { HotelPlace } from '@/services/apis/hotels/places';
import { hotelsSearchRequest } from '@/services/apis/hotels/search';
import * as noData from '@/services/lotties/common/noData.json';
import * as loader from '@/services/lotties/flights/planeLoading.json';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import HotelFilters from '@/views/Hotels/search/hotelFilters';
import HotelsResultsMobileSearchBox from '@/views/Hotels/search/HotelsResultsMobileSearchBox';
import HotelsResultsSearchBox from '@/views/Hotels/search/HotelsResultsSearchBox';
import HotelsResults from '@/views/Hotels/search/results';
import dayjs, { Dayjs } from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.css';

let globalData: HotelResultType = {
  searchId: '',
  hotels: {},
  data: {},
  agents: {},
  dataList: {},
};

const HotelsSearch = ({
  searchBoxValues,
  destination,
}: {
  searchBoxValues: searchBoxValues;
  destination: HotelPlace;
}) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const [data, setData] = useState<HotelResultType>(globalData);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<HotelResultType>(globalData);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastChangeTime, setLastChangeTime] = useState<null | Dayjs>(null);

  const searchParams = useSearchParams();
  const currency = globalDataGetter('client', 'currency')?.code || 'USD';

  const searchPayload = {
    adults: 2,
    children: 1,
    checkIn: '2024-05-22',
    checkOut: '2024-05-25',
    currency: 'USD',
    countryCode: 'KM',
    language: 'fr',
    isCity: true,
    cityId: '9395',
  };

  const filtersDefaultValues: any = {
    stops: searchParams.get('direct') === 'true' ? [0] : [0, 1, 2],
    departure: 'all',
    return: 'all',
    duration: 'all',
    price: 'all',
    airlines: 'all',
    aliances: ['oneWorld', 'skyTeam', 'starAlliance', 'valueAlliance'],
    stopover: 'all',
    bookingSites: 'all',
  };
  const { reset, control, setValue, watch } = useForm<any>({
    defaultValues: filtersDefaultValues,
  });

  const hotelsSearchHandling = async () => {
    await hotelsSearchRequest(searchPayload, handleResults, handleError, locale, {
      source: searchParams.get('utm_source') || 'organic',
    });
  };

  // useEffect(() => {
  //   if (showMobileFilters) {
  //     document.body.style.overflow = 'hidden';
  //   } else if (!showMobileFilters) {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [showMobileFilters]);

  // Get results
  const handleResults = (payload: HotelResultType) => {
    const mergedResults = mergeResults(globalData, payload);
    const results = handleItineriesShape(mergedResults);
    globalData = results;
    setData(results);
    setFilteredData(results);
    // handleFilters(results);
    setLastChangeTime(dayjs());
  };
  const handleComplete = () => {
    setIsCompleted(true);
    setIsLoading(false);
  };

  const handleError = () => {
    setIsCompleted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    hotelsSearchHandling();
  }, []);

  // handle search compelte
  useEffect(() => {
    // check if the search is completed
    // by checking if the last change time is more than 3 seconds after lastChangeTime is changed with 5 seconds
    // lastChangeTime updated every time the data are changed
    if (!isCompleted) {
      const timer1 = setTimeout(() => {
        if (dayjs().diff(lastChangeTime, 'second') > 3) {
          handleComplete();
        } else {
          setIsCompleted(false);
        }
      }, 5000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [lastChangeTime]);

  // const locations = [
  //   { id: 1, lat: 29.9773, lng: 31.1325, title: '1325' },
  //   { id: 2, lat: 25.7007, lng: 32.6421, title: '6421' },
  //   { id: 3, lat: 24.0889, lng: 32.8998, title: '8998' },
  //   { id: 4, lat: 27.9158, lng: 34.3299, title: '3299' },
  //   { id: 5, lat: 30.0434, lng: 31.2338, title: '2338' },
  //   { id: 6, lat: 31.2338, lng: 29.9489, title: '9489' },
  //   { id: 7, lat: 27.2579, lng: 33.8129, title: '8129' },
  //   { id: 8, lat: 27.3041, lng: 33.6785, title: '6785' },
  //   { id: 9, lat: 31.4595, lng: 30.6897, title: '6897' },
  //   { id: 10, lat: 27.9253, lng: 34.3287, title: '3287' },
  // ];

  return (
    <div className={styles.container}>
      <HotelsResultsSearchBox searchBoxValues={searchBoxValues} destination={destination} />
      <HotelsResultsMobileSearchBox searchBoxValues={searchBoxValues} destination={destination} />

      <Container className="lg:hidden">
        <div className="flex items-center justify-between gap-2 px-2">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className={styles.filterButton}
          >
            Filter
          </Button>
        </div>
      </Container>

      {/* <SimpleMap locations={locations} /> */}

      {/* Desktop results */}
      <Container className={styles.contentContainer}>
        {data && data.dataList.length > 0 ? (
          <>
            <div className={styles.filtersContainer}>
              <HotelFilters
                control={control}
                watch={watch}
                setValue={setValue}
                reset={reset}
                // filterPrices={}
              />
            </div>
            <div
              className={cn(styles.filtersMobileContainer, showMobileFilters ? 'fixed' : 'hidden')}
            ></div>

            <div className={styles.resultsContainer}>
              {filteredData && filteredData.dataList.length > 0 ? (
                <HotelsResults data={filteredData} isLoading={isLoading} currency={currency} />
              ) : (
                <ClearFilters imageSrc={commonImgUrl('clearFilters.svg')} handleClear={reset} />
              )}
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <div className={styles.loaderContainer}>
                <Skeleton className={styles.skeleton} />
                <div className={styles.lottieContainer}>
                  <LottieLoader animationData={loader} width={390} height={190} />
                </div>
              </div>
            ) : (
              isCompleted && (
                <div className={styles.loaderContainer}>
                  <LottieLoader animationData={noData} width={300} height={300} />
                  <h3 className={styles.noDataText}>{t('OOd6DT8-T7e-6mLJOuHNL')}</h3>
                </div>
              )
            )}
          </>
        )}

        <div className={styles.adsContainer}></div>
      </Container>
    </div>
  );
};

export default HotelsSearch;
