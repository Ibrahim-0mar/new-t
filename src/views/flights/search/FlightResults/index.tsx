import { getLegs } from '@/views/common/results/AirportTransfers/utils/search';
import { _getLegsFromParams } from '@/views/common/results/Flights/utils/filters';
import {
  sortByArrivalAscending,
  sortByArrivalDescending,
  sortByDepartureAscending,
  sortByDepartureDescending,
  sortByDurationAscending,
  sortByDurationDescending,
  sortByPriceAscending,
} from '@/views/common/results/Flights/utils/sort';
import Button from '@/components/common/base/Button';
import LottieLoader from '@/components/common/base/LottieLoader';
import FlightDetailsPage from '@/components/flights/results/FlightDetailsPage';
import FlightItinerary from '@/components/flights/results/Itinerary';
import { locale, useRouter } from '@/navigation';
import * as loader from '@/services/lotties/flights/planeLoading.json';
import { kayakInlineAdType } from '@/utils/ads/kayak/flights/types';
import CompareAllMobile from '@/utils/ads/medialpha/CompareAll/CompareAllMobile';
import InlineDealsPlacement from '@/utils/ads/medialpha/InlineDealsPlacement';
import { MediaalphaInlineAdType } from '@/utils/ads/medialpha/utils/types';
import { eventsOnClickKayakAds, eventsOnViewTicketDetails } from '@/utils/events/flights/search';
import { getFlightTripType } from '@/utils/flights';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { formatDuration } from '@/utils/helper/dates';
import { cn } from '@/utils/helper/tailwind_cn';
import { TicketViewTrackingData, legType, pricingOptionType } from '@/utils/types/flights';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import OtherSorts from './components/OtherSorts';
import styles from './index.module.css';
import AdServerTicket from '@/utils/ads/AdServer/componets/AdServerTicket';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';


interface FlightResultsProps {
  data: FlightResultType;
  isLoading: boolean;
  currency: string;
  showMobileSort: boolean;
  setShowMobileSort: Dispatch<SetStateAction<boolean>>;
  mediaAlphaAds: MediaalphaInlineAdType[];
  kayakAds: kayakInlineAdType[];
  selectedBookingSites: 'all' | string[];
  searchPayload: any;
  AdServerData:any
}
type SortDataGenreType = {
  id?: string;
  minPrice?: string;
  duration?: string;
  legs?: legType[];
  pricingOptions?: pricingOptionType[];
};
export type SortBarData = {
  cheapest: SortDataGenreType;
  best: SortDataGenreType;
  quickest: SortDataGenreType;
};

const FlightResults = ({
  data,
  isLoading,
  currency,
  showMobileSort,
  setShowMobileSort,
  mediaAlphaAds,
  kayakAds,
  selectedBookingSites,
  searchPayload,
  AdServerData
}: FlightResultsProps) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const [sortedData, setSortedData] = useState<TransformedItineraryType[]>(data?.itinerariesPrice);

  const [itinerariesShown, setItinerariesShown] = useState<number>(15);
  const [sortType, setSortType] = useState<string>('best');
  const otherSortsSelected = !['best', 'cheapest', 'quickiest'].includes(sortType);
  const [sortBarData, setSortBarData] = useState<SortBarData>({
    cheapest: { minPrice: '', duration: '' },
    best: { minPrice: '', duration: '' },
    quickest: { minPrice: '', duration: '' },
  });

  let mediaAlphaAdIndex = -1;
  let kayakAdIndex = -1;
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ locale: locale; legs: string[] }>();
  const cabin = searchParams.get('cabin') || 'Economy';

  const nearbyAirport = globalDataGetter('client', 'nearbyAirport') || {code:"JFK"}
  
  const cabinClasses = [
    { id: 'Economy', value: 'Economy', title: t('rIiR0JqFJCgXghbVz0mzU') },
    { id: 'Premium_Economy', value: 'Premium Economy	', title: t('ipLZ1siuRxhwd2x_8Efz_') },
    { id: 'Business', value: 'Business', title: t('YPnMS1LA9yFxZ-uUkc91l') },
    { id: 'First', value: 'First class	', title: t('V5kZRvDl1vU-7uxuJKWNA') },
  ];
  const selectedCabinClass =
    cabinClasses.find((item) => item.id === cabin)?.title || cabinClasses[0].title;

  const handleSortData = () => {
    const dataToSorted = [...data?.itinerariesPrice];
    switch (sortType) {
      case 'cheapest':
        setSortedData(sortByPriceAscending(dataToSorted));
        break;
      case 'best':
        setSortedData(sortByPriceAscending(dataToSorted));
        break;
      case 'quickiest':
        setSortedData(sortByDurationAscending(dataToSorted));
        break;
      case 'durationShort':
        setSortedData(sortByDurationAscending(dataToSorted));
        break;
      case 'durationLong':
        setSortedData(sortByDurationDescending(dataToSorted));
        break;

      default:
        const legNumber = sortType.slice(-1);
        if (sortType.includes('departure')) {
          if (sortType.includes('Earliest')) {
            setSortedData(sortByDepartureAscending(dataToSorted, Number(legNumber)));
          } else {
            setSortedData(sortByDepartureDescending(dataToSorted, Number(legNumber)));
          }
        } else if (sortType.includes('arrival')) {
          if (sortType.includes('Earliest')) {
            setSortedData(sortByArrivalAscending(dataToSorted, Number(legNumber)));
          } else {
            setSortedData(sortByArrivalDescending(dataToSorted, Number(legNumber)));
          }
        } else {
          setSortedData(sortByPriceAscending(dataToSorted));
        }

        break;
    }
  };
  const getSortBannerData = () => {
    const cheapest = [...data.itinerariesPrice].reduce((prev, curr) =>
      prev.minPrice < curr.minPrice ? prev : curr,
    );
    const quickest = [...data.itinerariesPrice].reduce((prev, curr) => {
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
    setSortBarData({ cheapest: cheapest, best: cheapest, quickest: quickest });
  };

  useEffect(() => {
    handleSortData();
    getSortBannerData();
  }, [sortType, data]);

  const _renderKayakAd = () => {
    kayakAdIndex++;
    const ad = kayakAds[kayakAdIndex];
    const kayakTrackingFunc = () => {
      eventsOnClickKayakAds({ ...ad, ...searchPayload, searchId: data.searchId });
    };
    return (
      <InlineDealsPlacement
        providerName={ad?.companyName}
        cabinClass={selectedCabinClass}
        image={ad?.logoUrl}
        link={ad?.deepLink}
        title={ad?.headline}
        description={ad.description}
        impressionUrl={ad.impressionUrl}
        trackUrl={ad.trackUrl}
        kayakTrackingFunc={kayakTrackingFunc}
      />
    );
  };
  const _renderMediaalphaAd = () => {
    mediaAlphaAdIndex++;
    const ad = mediaAlphaAds[mediaAlphaAdIndex];
    return (
      <InlineDealsPlacement
        providerName={ad?.buyer}
        cabinClass={selectedCabinClass}
        image={ad?.small_image_url ? `https://` + ad?.small_image_url : '/'}
        link={ad?.click_url}
        title={ad?.headline}
      />
    );
  };

  const renderAds = () => {
    if (kayakAds.length > kayakAdIndex + 1) return _renderKayakAd();
    else if (mediaAlphaAds.length > mediaAlphaAdIndex + 1) return _renderMediaalphaAd();
    else return null;
  };

  const ticketViewTrakingData: (ticketPosition: number , itineraryId: any) => TicketViewTrackingData = (ticketPosition , itineraryId) => {
    
    return {
      searchId: data.searchId,
      ticketPosition,
      itinerary: data.itineraries[itineraryId],
      tripClass: selectedCabinClass,
      sortData: sortBarData,
      adults: Number(searchParams.get('adults')) || 1,
      children: Number(searchParams.get('children')) || 0,
      infants: Number(searchParams.get('infants')) || 0,
      currency,
      tripType: getFlightTripType(getLegs(params.legs, nearbyAirport?.code))
  };
}
  const openDetails = async (itineraryId: string, ticketPosition: number) => {
    const providers =
      selectedBookingSites != 'all' ? '&providers=' + selectedBookingSites.toString() : null;
    if (searchParams.has('showDetails')) {
      let query = `?showDetails=${itineraryId}`;
      if (providers) {
        query += providers;
      }
      router.push(query);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      let query = `?${newSearchParams.toString()}&showDetails=${itineraryId}`;
      if (providers) {
        query += providers;
      }
      router.push(query);
    }

    eventsOnViewTicketDetails(ticketViewTrakingData(ticketPosition, itineraryId));
  };
  const closeDetails = () => {
    if (searchParams.has('showDetails')) {
      router.back();
    }
  };


 

  return (
    <>
      <div className={styles.container}>
        {/* if still loading getting more resullts */}
        {isLoading && (
          <div className={styles.loaderContainer}>
            <p>{t('E_DKb4WDXCiWGLQGAAs6N')}</p>
            <LottieLoader animationData={loader}  width={100} height={30} />
          </div>
        )}

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
                <p className={styles.sortHeader}>{t('Iu1BqU52XtJ4FjiILHMo1')}</p>
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
                className={cn(styles.sortCard, sortType === 'best' ? styles.activeSort : '')}
                onClick={() => setSortType('best')}
              >
                <p className={styles.sortHeader}>{t('ytOsO9H3YCGCrWE6D9voI')}</p>
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
                className={cn(
                  styles.sortCard,
                  sortType === 'quickiest' ? styles.activeSort : '',
                  '!border-e-0 lg:!border-e',
                )}
                onClick={() => setSortType('quickiest')}
              >
                <p className={styles.sortHeader}>{t('sDW9asIudBdoOOyBJuQx_')}</p>
                {data && data.itinerariesPrice.length > 0 ? (
                  <div className={styles.sortData}>
                    <span className={styles.sortPrice}>
                      {' '}
                      <FormatPrice
                        price={Number(sortBarData.quickest.minPrice)}
                        currency={currency}
                      />{' '}
                    </span>
                    <span> {formatDuration(Number(sortBarData.quickest.duration), locale)} </span>
                  </div>
                ) : null}
              </Button>
              <div className={styles.otherSorts}>
                <OtherSorts
                  selectedSort={sortType}
                  setSelected={setSortType}
                  focused={otherSortsSelected}
                  legs={_getLegsFromParams(params.legs)}
                  showMobileSort={showMobileSort}
                  setShowMobileSort={setShowMobileSort}
                />
              </div>
            </div>
            {AdServerData.ticket && (
              <AdServerTicket
                data={AdServerData}
                searchPayload={searchPayload}
                searchId={data.searchId}
                sortedData={sortBarData}
              />
            )}
            {sortedData
              .slice(0, itinerariesShown)
              .map((itinerary: TransformedItineraryType, index: number) => {
                return (
                  <Fragment key={itinerary.id + index}>
                    <FlightItinerary
                      itinerary={itinerary}
                      ticketPosition={index + 1}
                      openDetails={openDetails}
                      isModalOpen={
                        searchParams.has('showDetails') &&
                        data.itineraries.hasOwnProperty(`${searchParams.get('showDetails')}`)
                      }
                      shareFlightTrakingData={ticketViewTrakingData((index + 1), itinerary.id)}
                    />
                    {index % 3 === 0 && renderAds()}
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
      <CompareAllMobile />
      {searchParams.has('showDetails') &&
        data.itineraries.hasOwnProperty(`${searchParams.get('showDetails')}`) && (
          <FlightDetailsPage
            itinerary={data.itineraries[searchParams.get('showDetails') || '']}
            searchId={data.searchId}
            closeDetails={closeDetails}
            sortedData={sortBarData}
          />
        )}
    </>
  );
};

export default FlightResults;
