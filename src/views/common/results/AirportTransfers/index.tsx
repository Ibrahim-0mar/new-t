'use client';

import Container from '@/components/common/base/Container';
import LottieLoader from '@/components/common/base/LottieLoader';
import { Skeleton } from '@/components/common/base/Skeleton';
import ClearFilters from '@/components/common/custom/ClearFilters';
import AirportTransfersResultsSearch from '@/components/common/custom/searchboxes/DefaultSearchbox/components/airport-transfers/ResultsSearchbox';
import AirportTransfersResultSearchboxMobile from '@/components/common/custom/searchboxes/DefaultSearchbox/components/airport-transfers/ResultsSearchbox/mobile';
import { locale } from '@/navigation';
import { airportTransfersSearchRequest } from '@/services/apis/airport-transfers/search';
import * as loader from '@/services/lotties/airport-transfers/carLoading.json';
import * as noData from '@/services/lotties/common/noData.json';

import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import { eventsOnAirportTransferComplete } from '@/utils/events/airportTransfers/search';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import {
  AirportTransfersResultType,
  TransfersTrackingData,
  airportTransferFilterPricesType,
} from '@/utils/types/airport-transfers/results';
import AirportTransfersAds from '@/views/airport-transfers/AirportTransfersAds';
import AirportTransfersFilter from '@/views/airport-transfers/search/AirportTransfersFilter';
import AirportTransfersMobileFilter from '@/views/airport-transfers/search/AirportTransfersMobileFilter';
import AirportTransfersResults from '@/views/airport-transfers/search/AirportTransfersResults';
import dayjs, { Dayjs } from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UAParser } from 'ua-parser-js';
import styles from './index.module.css';
import {
  _updateBookingSitesPrice,
  _updateVehicleMake,
  _updateVehicleType,
} from './utils/filterPrices';
import {
  AirportTransfersFilterType,
  filterByBookingSites,
  filterByDuration,
  filterByPrice,
  filterByVehicleMake,
  filterByVehicleType
} from './utils/filters';
import { handleItineriesShape, mergeResults } from './utils/results';

let globalData: AirportTransfersResultType = {
  searchId: '',
  agents: {},
  legs: {},
  itineraries: {},
  itinerariesPrice: [],
};
export default function AirportTransfersSearchResultsHome() {
  const locale = useLocale() as locale;
  const t = useTranslations();
  //recaptcha
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [token, setToken] = useState<string | null>(null);

  const [data, setData] = useState<AirportTransfersResultType>(globalData);
  const [userDevice, setUserDevice] = useState<string>('');
  const [filteredData, setFilteredData] = useState<AirportTransfersResultType>(globalData);
  const searchParams = useSearchParams();
  const params = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  const [numberOfProviders, setNumberOfProviders] = useState<number>(0);
  const [providersFailed, setProvidersFailed] = useState<string[]>([]);
  const [numberOfRequestsfinished, setNumberOfRequestsfinished] = useState<number>(0);
  const [searchStartTime, setSearchStartTime] = useState<null | Dayjs>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [filterPrices, setFilterPrices] = useState<airportTransferFilterPricesType>({
    bookingSites: {},
    duration: [0, 0],
    price: [0, 0],
    vehicleMake: {},
    vehicleType: {},
  });
  const tripType = params.legs.length === 2 ? 'round' : 'oneway';
  const currency = globalDataGetter('client', 'currency')?.code || 'USD';

  const filtersDefaultValues: any = {
    duration: 'all',
    price: 'all',
    vehicleMake: 'all',
    vehicleType: 'all',
    bookingSites: 'all',
  };
  const { reset, control, setValue, watch } = useForm<AirportTransfersFilterType>({
    defaultValues: filtersDefaultValues,
  });

  const legData = {
    origin: searchParams.get('pickup'),
    destination: searchParams.get('dropoff'),
    start_lat: searchParams.get('start_lat'),
    start_long: searchParams.get('start_long'),
    end_lat: searchParams.get('end_lat'),
    end_long: searchParams.get('end_long'),
    origin_name: searchParams.get('origin_name'),
    destination_name: searchParams.get('destination_name'),
    from_type: searchParams.get('from_type'),
    to_type: searchParams.get('to_type'),
    des_from: searchParams.get('des_from'),
    des_to: searchParams.get('des_to'),
  };
  const adults = Number(searchParams.get('adults')) || 1;
  const children = Number(searchParams.get('children')) || 0;
  const infants = Number(searchParams.get('infants')) || 0;
  const pickupDateTime = params.legs[0].replace('%3A', ':');
  const returnDateTime = params.legs[1] ? params.legs[1].replace('%3A', ':') : null;
  const legs =
    Array.isArray(params.legs) &&
    params.legs.map((leg: string) => {
      const [departure, time] = leg.split('_');
      return {
        ...legData,
        departure,
        pickupDateTime,
        returnDateTime,
        time: time.replace('%3A', ':'),
      };
    });
  const trackingData: TransfersTrackingData = {
    tripType,
    legs: legs || [],
    currency,
    visitorId: globalDataGetter('client', 'visitorId') ,
    adults,
    children,
    infants,
    language: locale,
    pickupId: searchParams.get('pickup'),
    dropoffId: searchParams.get('dropoff'),
    pickupDateTime,
    returnDateTime,
  };

  const airportTransfersSearchHandling = async () => {
    setSearchStartTime(dayjs());
    const body = {
      tripType,
      legs,
      currency,
      visitorId: globalDataGetter('client', 'visitorId') ,
      adults,
      children,
      infants,
      language: locale,
    };
    await airportTransfersSearchRequest(
      body,
      trackingData,
      handleOnInitSearchDone,
      handleResults,
      handleError,
      handleProvidersSearchError,
      locale,
      token,
    );
    localStorage.setItem('airportTransferredirectLegs', JSON.stringify(legs));
  };

  // Get results
  const handleResults = (payload: AirportTransfersResultType) => {
    setNumberOfRequestsfinished((prev) => prev + 1);
    const mergedResults = mergeResults(globalData, payload);
    const results = handleItineriesShape(mergedResults);
    globalData = results;
    setData(results);
    setFilteredData(results); //TODO : replace this
    // handleFilters(results);
  };

  const handleOnInitSearchDone = (data: any) => {
    const numberOfProviders = data.searchEndpoints.length;
    setNumberOfProviders(numberOfProviders);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setIsLoading(false);
    eventsOnAirportTransferComplete(
      trackingData,
      data,
      numberOfProviders,
      providersFailed,
      searchStartTime,
    );
  };

  const handleProvidersSearchError = (url: any) => {
    setProvidersFailed((prev) => [...prev, url]);
    setNumberOfRequestsfinished((prev) => prev + 1);
  };

  const handleError = () => {
    setIsCompleted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleFilters = (data: AirportTransfersResultType) => {
    const bookingSitesItinerates = filterByBookingSites(
      watch('bookingSites'),
      data.itinerariesPrice,
    );
    const vehicleMakeItinerates = filterByVehicleMake(watch('vehicleMake'), bookingSitesItinerates);
    const vehicleTypeItinerates = filterByVehicleType(watch('vehicleType'), vehicleMakeItinerates);

    const priceItinerates = filterByPrice(watch('price'), vehicleTypeItinerates);
    const durationItinerates = filterByDuration(watch('duration'), priceItinerates);

    setFilteredData({
      ...data,
      itinerariesPrice: durationItinerates,
    });
  };

  //recaptch generation
  const _getRecaptchaToken = async () => {
    const token = await executeRecaptcha('transferstStart');
    setToken(token);
  };

  /* Effects  */

  useEffect(() => {
    if (token) {
      airportTransfersSearchHandling();
    }
  }, [token]);

  useEffect(() => {
    if (showMobileFilters) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [showMobileFilters]);

  useEffect(() => {
    const prices: airportTransferFilterPricesType = {
      bookingSites: {},
      duration: [0, 0],
      price: [0, 0],
      vehicleMake: {},
      vehicleType: {},
    };

    data.itinerariesPrice.forEach((itinerary: TransformedItineraryType) => {
      _updateBookingSitesPrice(itinerary, prices?.bookingSites);
      _updateVehicleMake(itinerary, prices?.vehicleMake);
      _updateVehicleType(itinerary, prices?.vehicleType);
      setFilterPrices(prices);
    });
  }, [data]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parser = new UAParser();
      const result = parser.getResult();
      setUserDevice(result.device.type ? result.device.type : 'desktop');
    }
  }, []);

  useEffect(() => {
    if (!isCompleted) {
      if (
        numberOfProviders > 0 &&
        numberOfRequestsfinished > 0 &&
        numberOfProviders <= numberOfRequestsfinished
      ) {
        handleComplete();
      }
    }
  }, [numberOfProviders, numberOfRequestsfinished, isCompleted]);

  //recaptch
  useEffect(() => {
    if (!token && loaded) {
      _getRecaptchaToken();
    }
  }, [loaded]);

  return (
    <div className="flex flex-col">
      <Container className="order-2">
        <AdBanner
          className="hidden pt-10 lg:block"
          dataAdFormat="horizontal"
          dataAdSlot="8433418315"
        />
        <AdBanner className="my-2 lg:hidden" dataAdFormat="rectangle" dataAdSlot="8687487610" />
      </Container>
      <section className={styles.container}>
        <div className={styles.mobilePlacement}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3467222094751265"
            data-ad-slot="7378490974"
            data-ad-format="horizontal"
            data-full-width-responsive="false"
          ></ins>
        </div>
        {userDevice === 'desktop' ? (
          <AirportTransfersResultsSearch />
        ) : (
          <AirportTransfersResultSearchboxMobile />
        )}
        <Container className={styles.contentContainer}>
          <div className={styles.adsContainer}>
            <AirportTransfersAds />
          </div>
          {data && data.itinerariesPrice.length > 0 ? (
            <>
              <div className={styles.filtersContainer}>
                <AirportTransfersFilter
                  data={data}
                  currency={currency}
                  filterPrices={filterPrices}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  reset={reset}
                  handleFilters={handleFilters}
                />
              </div>

              <AirportTransfersMobileFilter
                data={data}
                currency={currency}
                filterPrices={filterPrices}
                control={control}
                watch={watch}
                setValue={setValue}
                reset={reset}
                handleFilters={handleFilters}
                showMobileFilters={showMobileFilters}
                setShowMobileFilters={setShowMobileFilters}
              />

              <div className={styles.resultsContainer}>
                {filteredData && filteredData.itinerariesPrice.length > 0 ? (
                  <AirportTransfersResults
                    data={filteredData}
                    isLoading={isLoading}
                    isCompleted={isCompleted}
                    currency={currency}
                    setShowMobileFilters={setShowMobileFilters}
                  />
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
                    <LottieLoader animationData={loader} width={300} height={300} />
                  </div>
                </div>
              ) : (
                isCompleted && (
                  <div className={styles.loaderContainer}>
                    <LottieLoader animationData={noData} width={300} height={300} />
                    <h3 className={styles.noDataText}>{t('DCKMYzCsFQ4Q5IlDd-04_')}</h3>
                  </div>
                )
              )}
            </>
          )}
        </Container>
      </section>
      <Container>
        <div className={styles.destkTopFooterPlacement}>
          <AdBanner id="right" dataAdSlot="8734834477" dataAdFormat="rectangle" />
          <AdBanner id="left" dataAdSlot="8153015008" dataAdFormat="rectangle" />
        </div>
      </Container>
    </div>
  );
};

