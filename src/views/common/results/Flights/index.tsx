// 'use client';
// import Button from '@/components/common/base/Button';
// import Container from '@/components/common/base/Container';
// import LottieLoader from '@/components/common/base/LottieLoader';
// import { Skeleton } from '@/components/common/base/Skeleton';
// import ClearFilters from '@/components/common/custom/ClearFilters';
// import MobileResultSearchBox from '@/components/common/custom/searchboxes/DefaultSearchbox/components/flights/MobileResultSearchBox';
// import ResultSearchBox from '@/components/common/custom/searchboxes/DefaultSearchbox/components/flights/ResultSearchbox';
// import { locale, usePathname } from '@/navigation';
// import { flightSearchRequest } from '@/services/apis/flights/search';
// import * as noData from '@/services/lotties/common/noData.json';
// import * as loader from '@/services/lotties/flights/planeLoading.json';
// import { fetchAdServerData, fetchProviderData } from '@/utils/ads/AdServer/apis';
// import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
// import { fetchKayakInlineAds } from '@/utils/ads/kayak/flights/apis';
// import { kayakInlineAdType } from '@/utils/ads/kayak/flights/types';
// import InlineDealsPlacement from '@/utils/ads/medialpha/InlineDealsPlacement';
// import { fetchMediaalphaInlineAds } from '@/utils/ads/medialpha/utils';
// import { MediaalphaInlineAdType } from '@/utils/ads/medialpha/utils/types';
// import { eventsOnFlightComplete } from '@/utils/events/flights/search';
// import { getFlightTripType } from '@/utils/flights';
// import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
// import { commonImgUrl } from '@/utils/helper/imgUrl';
// import { cn } from '@/utils/helper/tailwind_cn';
// import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
// import FlightAdds from '@/views/flights/search/FlightAdds';
// import FlightResults from '@/views/flights/search/FlightResults';
// import FlightsFilter from '@/views/flights/search/FlightsFilter';
// import FlightsFilterMobile from '@/views/flights/search/FlightsFilterMobile';
// import dayjs, { Dayjs } from 'dayjs';
// import { useLocale, useTranslations } from 'next-intl';
// import { useReCaptcha } from 'next-recaptcha-v3';
// import { useParams, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { UAParser } from 'ua-parser-js';
// import styles from './index.module.css';
// import {
//   _updateAirlinesPrices,
//   _updateAirportsPrices,
//   _updateBookingSitesPrice,
//   _updateStopoversPrices,
// } from './utils/filterPrices';
// import { handleItineriesShape, mergeResults } from './utils/results';
// import { getLegs } from './utils/search';
// import { sortByPriceAscending } from './utils/sort';
// import { _getInitialAirports, FLightsFilterType, handleFilterData } from './utils/filters';
// import RefreshModal from './refreshModal';
// import YouRobot from '@/components/common/custom/YouRobot';

// let globalData: FlightResultType = {
//   searchId: '',
//   airlines: {},
//   airports: {},
//   agents: {},
//   legs: {},
//   segments: {},
//   itineraries: {},
//   flightDetails: {},
//   codeShare: {},
//   itinerariesDuration: [],
//   itinerariesPrice: [],
//   filterAirports: { departure: {}, arrival: {} },
// };
// const FlightsSearch = () => {
//   const locale = useLocale() as locale;
//   const t = useTranslations();

//   //router
//   const searchParams = useSearchParams();
//   const params = useParams<{ locale: locale; legs: string[] }>();
//   const pathname = usePathname();
//   // storage data
//   const currency = globalDataGetter('client', 'currency')?.code || 'USD';
//   const country = globalDataGetter('client', 'country')?.code || 'US';
//   const nearbyAirport = globalDataGetter('client', 'nearbyAirport') || {code:"JFK"}

//   //recaptcha
//   const { executeRecaptcha, loaded  ,error} = useReCaptcha();
//   const [token, setToken] = useState<string | null>(null);
//   const [isRecaptchaFailed, setIsRecaptchaFailed] = useState<boolean>(false);
//   //Geting data states
//   const [data, setData] = useState<FlightResultType>(globalData);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const searchPayload = {
//     cabinClass: searchParams.get('cabin') || 'Economy',
//     directFlight: searchParams.get('direct') === 'true' ? true : false,
//     nearbyAirportOne: false,
//     nearbyAirportTwo: false,
//     currency,
//     country,
//     legs: getLegs(params.legs,nearbyAirport?.code),
//     tripType: getFlightTripType(getLegs(params.legs,nearbyAirport?.code)),
//     visitorId: globalDataGetter('client', 'visitorId') ,
//     adults: searchParams.get('adults') || 1,
//     children: searchParams.get('children') || 0,
//     infants: searchParams.get('infants') || 0,
//     language: params.locale,
//   };

//   //filter data states
//   const [filteredData, setFilteredData] = useState<FlightResultType>(globalData);
//   const [filterPrices, setFilterPrices] = useState<FilterPricesType>({
//     airlines: {},
//     airports: { departure: {}, arrival: {} },
//     stopovers: {},
//     bookingSites: {},
//     alliances: {},
//     stops: {},
//   });
//   const departureAirports = _getInitialAirports(params.legs, 'origin',nearbyAirport?.code);
//   const arrivalAirports = _getInitialAirports(params.legs, 'destination',nearbyAirport?.code);
//   const filtersDefaultValues: FLightsFilterType = {
//     stops: searchParams.get('direct') === 'true' ? [0] : [0, 1, 2],
//     departure: 'all',
//     return: 'all',
//     duration: 'all',
//     price: 'all',
//     airlines: 'all',
//     aliances: ['oneWorld', 'skyTeam', 'starAlliance', 'valueAlliance'],
//     stopover: 'all',
//     bookingSites: 'all',
//     airports: {
//       status:"init",
//       departure: "all",
//       arrival: "all",
//     },
//     baggages: 'all',
//     // Hold this filter untill it been fixed by back-end
//     // fareRestrictions: "all"
//   };
//   const { reset, control, setValue, watch } = useForm<FLightsFilterType>({
//     defaultValues: filtersDefaultValues,
//   });

//   // Mobile spesification states
//   const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
//   const [showMobileSort, setShowMobileSort] = useState<boolean>(false);
//   const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();
//   const [userDevice, setUserDevice] = useState<string>('');

//   // tracking data states
//   const [searchStartTime, setSearchStartTime] = useState<null | Dayjs>(null);
//   const [numberOfProviders, setNumberOfProviders] = useState<number>(0);
//   const [numberOfRequestsfinished, setNumberOfRequestsfinished] = useState<number>(0);
//   const [providersFailed, setProvidersFailed] = useState<string[]>([]);

//   //ads status
//   const [mediaAlphaAds, setMediaAlphaAds] = useState<MediaalphaInlineAdType[]>([]);
//   const [kayakAds, setKayakAds] = useState<kayakInlineAdType[]>([]);

//   //server ad
//   const [AdServerData, setAdServerData] = useState<{
//     ticket: null | TransformedItineraryType;
//     adData: any;
//   }>({ ticket: null, adData: null });

//   const cabinClasses = [
//     { id: 'Economy', title: t('rIiR0JqFJCgXghbVz0mzU') },
//     { id: 'Premium_Economy', title: t('ipLZ1siuRxhwd2x_8Efz_') },
//     { id: 'Business', title: t('YPnMS1LA9yFxZ-uUkc91l') },
//     { id: 'First', title: t('V5kZRvDl1vU-7uxuJKWNA') },
//   ];

//   /************************* function parts ******************************/

//   /* search related functions*/
//   //geting search results
//   const flightSearchHandling = async () => {
//     setSearchStartTime(dayjs());
//     await flightSearchRequest(
//       searchPayload,
//       handleOnInitSearchDone,
//       handleResults,
//       handleError,
//       handleProvidersSearchError,
//       locale,
//       token,
//       { source: searchParams.get('utm_source') || 'organic' },
//     );
//   };

//   // this function to get the number of providers to calculate number of succuess & fail
//   const handleOnInitSearchDone = (data: any) => {
//     const numberOfProviders = data.searchEndpoints.reduce(
//       (acc: any, searchEndpoint: any) => acc + searchEndpoint.searchUrl.length,
//       0,
//     );
//     setNumberOfProviders(numberOfProviders);
//   };
//   // calculate number of faild providers
//   const handleProvidersSearchError = (url: any) => {
//     // if this function is implemented just for tracking, convert the url to only the hashed part. [done]
//     const parts = url.split('/');
//     const lastPart = parts[parts.length - 1];
//     setProvidersFailed((prev) => [...prev, lastPart]);
//     setNumberOfRequestsfinished((prev) => prev + 1);
//   };

//   // Get results
//   const handleResults = (payload: FlightResultType) => {
//     setNumberOfRequestsfinished((prev) => prev + 1);
//     const mergedResults = mergeResults(globalData, payload);
//       const results = handleItineriesShape(mergedResults);
//     globalData = results;
//     setData(results);
//     handleFilters(results);
//   };

//   const handleComplete = () => {
//     setIsCompleted(true);
//     setIsLoading(false);
//     eventsOnFlightComplete(
//       searchPayload,
//       data,
//       numberOfProviders,
//       providersFailed,
//       searchStartTime,
//     );
//   };

//   const handleError = (results:any) => {
//     if (results.status ===400) { // if get recaptcha token invalid
//       // _getRecaptchaToken();
//       // setTimeout(() => {
//       //   flightSearchHandling()
//       // }, 2000);
//       setIsRecaptchaFailed(true)
     
//     }else{
//     setIsCompleted(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }
//   };

//   /* Function related to filter data */

//   const handleReset =()=>{
//     reset();
//     _handleAirportsSelected()
//   }
//   const handleFilters = (data: FlightResultType) => {
//     handleFilterData(data, watch, setFilteredData);
//   };
//   // This function to test if the IATA code at the url for origin or destination not found of the trip airport
//   // it will select all airports this handle case of when city code != any airport code so it's city so select all airports
//   const _handleAirportsSelected = () => {
//     const departure: any = [];
//     const arrival: any = [];
//     if (watch("airports.status") === 'init') {
//       Object.keys(departureAirports).map((code) => {
//         if (Object.keys(data.filterAirports.departure).includes(code)) {
//           if (departureAirports[code]==="airport") {
//             departure.push(code);
//           } else {
//             Object.keys(data.filterAirports.departure[code].airports).forEach((code) => {
//               if (!departure.includes(code)) {
//                 departure.push(code);
//               }
//             });
//           }
//         } else {
//           departure.push(code);
//         }
//       });
//       Object.keys(arrivalAirports).map((code) => {
//         if (Object.keys(data.filterAirports.arrival).includes(code)) {
//           if (arrivalAirports[code]==="airport") {
//             arrival.push(code);
//           } else {
//             Object.keys(data.filterAirports.arrival[code].airports).forEach((code) => {
//               if (!arrival.includes(code)) {
//                 arrival.push(code);
//               }
//             });
//           }
//         } else {
//           arrival.push(code);
//         }
//       });
//       setValue('airports.departure', departure);
//       setValue('airports.arrival', arrival); 
//     }
//   };

//   /* Function related to ads */
//   const _renderKayakAd = (ad: kayakInlineAdType) => {
//     return (
//       <InlineDealsPlacement
//         providerName={ad?.companyName}
//         cabinClass={searchParams.get('cabin') || 'Economy'}
//         image={ad?.logoUrl}
//         link={ad?.deepLink}
//         title={ad?.headline}
//         description={ad.description}
//         impressionUrl={ad.impressionUrl}
//         trackUrl={ad.trackUrl}
//       />
//     );
//   };
//   const _renderMediaalphaAd = (ad: MediaalphaInlineAdType) => {
//     return (
//       <InlineDealsPlacement
//         providerName={ad?.buyer}
//         cabinClass={searchParams.get('cabin') || 'Economy'}
//         image={ad?.small_image_url ? `https://` + ad?.small_image_url : '/'}
//         link={ad?.click_url}
//         title={ad?.headline}
//       />
//     );
//   };

//   //recaptch generation
//   const _getRecaptchaToken = async () => {
//     const token = await executeRecaptcha('flightStart');
//     setToken(token);
//   };

//   /************  Effects part   ******** */

//   //searc start
//   useEffect(() => {
//     if (token) {
//       flightSearchHandling();
//     }
//   }, [token]);

//   // handle search compelte  by counting the number of success & faild providers
//   useEffect(() => {
//     if (!isCompleted) {
//       if (
//         numberOfProviders > 0 &&
//         numberOfRequestsfinished > 0 &&
//         numberOfProviders <= numberOfRequestsfinished
//       ) {
//         handleComplete();
//       }
//     }
//   }, [numberOfProviders, numberOfRequestsfinished, isCompleted]);

//   // filter related effects
//   useEffect(() => {
//     const prices: FilterPricesType = {
//       airlines: {},
//       airports: { departure: {}, arrival: {} },
//       stopovers: {},
//       bookingSites: {},
//       alliances: {},
//       stops: {},
//     };

//     data.itinerariesPrice.forEach((itinerary: TransformedItineraryType) => {
//       _updateAirlinesPrices(itinerary, prices?.airlines);
//       _updateAirportsPrices(itinerary, prices?.airports);
//       _updateStopoversPrices(itinerary, prices?.stopovers);
//       _updateBookingSitesPrice(itinerary, prices?.bookingSites);
//       setFilterPrices(prices);
//     });
//     // This function to test if the IATA code at the url for origin or destination not found of the trip airport
//     // it will select all airports this handle case of when city code != any airport code so it's city so select all airports
//     if (data) {
//       _handleAirportsSelected();
//     }
//   }, [data]);

//   // handle modal open by block the parent scroll when full screen modal open
//   useEffect(() => {
//     if (showMobileFilters || showMobileSort) {
//       lockBodyScroll();
//     } else {
//       unlockBodyScroll();
//     }
//     return () => {
//       unlockBodyScroll();
//     };
//   }, [showMobileFilters, showMobileSort]);

//   // mobile speciication
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const parser = new UAParser();
//       const result = parser.getResult();
//       setUserDevice(result.device.type ? result.device.type : 'desktop');
//     }
//   }, []);

//   // ads effects
//   useEffect(() => {
//     const getAds = async () => {
//       const ad = await fetchMediaalphaInlineAds(pathname, searchParams, params);
//       const kayakAds = await fetchKayakInlineAds(searchPayload);
//       setMediaAlphaAds(ad);
//       setKayakAds(kayakAds);
//     };
//     getAds();
//   }, []);

//   //recaptch
//   useEffect(() => {
//     if (!token && loaded) {
//       _getRecaptchaToken();
//     }
//   }, [loaded,error]);

//   const _renderAdsWhenNoData = () => {
//     return (
//       <>
//         {(kayakAds.length > 0 || mediaAlphaAds.length > 0) && (
//           <h3 className={styles.adsHeader}>{t('03Js-MdvQRaw1m25IhQgl')}</h3>
//         )}
//         {kayakAds.length > 0 && kayakAds.map((ad) => _renderKayakAd(ad))}
//         {mediaAlphaAds.length > 0 && mediaAlphaAds.map((ad) => _renderMediaalphaAd(ad))}
//       </>
//     );
//   };

//   const _checkAirportsHasData = () => {
//     const isOriginSelectedAirportHasData = Object.keys(departureAirports).every((code) =>
//       Object.hasOwn(filterPrices.airports.departure, code),
//     );
//     const isDestinationSelectedAirportHasData = Object.keys(arrivalAirports).every((code) =>
//       Object.hasOwn(filterPrices.airports.arrival, code),
//     );
//     if (!isOriginSelectedAirportHasData || !isDestinationSelectedAirportHasData) return true;
//     else return false;
//   };


//   //ad server
//   const getAdServerData = async () => {
//     const response = await fetchAdServerData();

//     const payload = {
//       ...searchPayload,
//       legs: searchPayload.legs.map((leg: any) => {
//         return {
//           ...leg,
//           origin: leg.origin[0],
//           destination: leg.destination[0],
//         };
//       }),
//     };
//     if (response && response?.customization ) {
//       const globalData: FlightResultType = {
//         searchId: '',
//         airlines: {},
//         airports: {},
//         agents: {},
//         legs: {},
//         segments: {},
//         itineraries: {},
//         flightDetails: {},
//         codeShare: {},
//         itinerariesDuration: [],
//         itinerariesPrice: [],
//         filterAirports: { departure: {}, arrival: {} },
//       };
//       const providerResult = await fetchProviderData(response?.customization?.brand, payload);
//       const mergedResults = mergeResults(globalData, providerResult);
//         const results = handleItineriesShape(mergedResults);
//       if (results.itinerariesPrice && results.itinerariesPrice.length > 0) {
//         const sorted = sortByPriceAscending(results.itinerariesPrice);
//         setAdServerData({ ticket: sorted[0], adData: response });
//       }
//     }
//   };

//   useEffect(() => {
//     getAdServerData();
//   }, []);
//   return (
//     <>
//     {isRecaptchaFailed ? <YouRobot/>:
//     <>
      
//       <section className={styles.container}>
//         <div className={styles.mobilePlacement}>
//           <ins
//             className="adsbygoogle"
//             style={{ display: 'block' }}
//             data-ad-client="ca-pub-3467222094751265"
//             data-ad-slot={'8400804970'}
//             data-ad-format="horizontal"
//             data-full-width-responsive="false"
//           ></ins>
//         </div>
//         {userDevice === 'desktop' ? (
//           <ResultSearchBox
//             cabin={
//               cabinClasses.find((item) => item.id === searchParams.get('cabin')) || cabinClasses[0]
//             }
//             adults={Number(searchParams.get('adults')) || 1}
//             childs={Number(searchParams.get('children')) || 0}
//             infants={Number(searchParams.get('infants')) || 0}
//             legs={getLegs(params.legs,nearbyAirport?.code)}
//           />
//         ) : null}
//         <MobileResultSearchBox
//           cabin={
//             cabinClasses.find((item) => item.id === searchParams.get('cabin')) || cabinClasses[0]
//           }
//           adults={Number(searchParams.get('adults')) || 1}
//           childs={Number(searchParams.get('children')) || 0}
//           infants={Number(searchParams.get('infants')) || 0}
//           legs={getLegs(params.legs,nearbyAirport?.code)}
//         />

//         <Container className="lg:hidden">
//           <div className="flex items-center justify-between gap-2">
//             <Button
//               variant="default"
//               onClick={() => setShowMobileFilters(true)}
//               className={styles.filterButton}
//             >
//               {t('McF67Ay1bit-NgkO7-S2L')}
//             </Button>
//             <Button
//               variant="default"
//               onClick={() => setShowMobileSort(true)}
//               className={styles.filterButton}
//             >
//               {t('dFcpX0YG8HqTnTijaSKn4')}
//             </Button>
//           </div>
//         </Container>

//         {/* Desktop results */}
//         <Container className={styles.contentContainer}>
//           <div className={styles.adsContainer}>
//             <FlightAdds />
//           </div>
//           {data && data.itinerariesPrice.length > 0 ? (
//             <>
//               <div className={styles.filtersContainer}>
//                 <FlightsFilter
//                   data={data}
//                   currency={currency}
//                   filterPrices={filterPrices}
//                   control={control}
//                   watch={watch}
//                   setValue={setValue}
//                   reset={handleReset}
//                   handleFilters={handleFilters}
//                   isCompleted={isCompleted}
//                 />
//               </div>
//               <div
//                 className={cn(
//                   styles.filtersMobileContainer,
//                   showMobileFilters ? 'fixed translate-y-0' : 'hidden translate-y-full',
//                 )}
//               >
//                 <FlightsFilterMobile
//                   data={data}
//                   currency={currency}
//                   filterPrices={filterPrices}
//                   control={control}
//                   watch={watch}
//                   setValue={setValue}
//                   reset={reset}
//                   handleFilters={handleFilters}
//                   setShowMobileFilters={setShowMobileFilters}
//                 />
//               </div>

//               <div className={styles.resultsContainer}>
//                 {filteredData && filteredData.itinerariesPrice.length > 0 ? (
//                   <FlightResults
//                     data={filteredData}
//                     isLoading={isLoading}
//                     currency={currency}
//                     showMobileSort={showMobileSort}
//                     setShowMobileSort={setShowMobileSort}
//                     kayakAds={kayakAds}
//                     mediaAlphaAds={mediaAlphaAds}
//                     selectedBookingSites={watch('bookingSites')}
//                     searchPayload={searchPayload}
//                     AdServerData={AdServerData}
//                   />
//                 ) : isCompleted ? (
//                   <>
//                      {watch('airports.status') === 'init' && _checkAirportsHasData() ? (
//                       <ClearFilters
//                         imageSrc={commonImgUrl('clearFilters.svg')}
//                         handleClear={() => {
//                           setValue('airports.status', 'init');
//                           setValue('airports.departure',"all");
//                           setValue('airports.arrival',"all")
//                         }}
//                         errorMessage={t('iVdFJ_mkVdd3bRyvF5a1F')}
//                         buttonText={t('guLGltQxhy45pQOmHLeKq')}
//                       />
//                     ) : (

          
//                       <ClearFilters
//                         imageSrc={commonImgUrl('clearFilters.svg')}
//                         handleClear={reset}
//                       />
//                     )}
//                     {_renderAdsWhenNoData()}
//                   </>
//                 ) : (
//                   <div className={styles.lottieContainer}>
//                     <LottieLoader animationData={loader} width={390} height={190} />
//                     <h3 className={styles.loadingText}>{t('DgmN5yWrVOiO1fA77JdS1')}</h3>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               {isLoading ? (
//                 <div className={styles.loaderContainer}>
//                   <Skeleton className={styles.skeleton} />
//                   <div className={styles.lottieContainer}>
//                     <LottieLoader animationData={loader}  width={320} height={150} />
//                     <h3 className={styles.loadingText}>{t('DgmN5yWrVOiO1fA77JdS1')}</h3>
//                   </div>
//                 </div>
//               ) : isCompleted ? (
//                 <div className={styles.noDataContainer}>
//                   <LottieLoader animationData={noData} width={250} height={250} />
//                   <h3 className={styles.noDataText}>{t('DCKMYzCsFQ4Q5IlDd-04_')}</h3>
//                   {_renderAdsWhenNoData()}
//                 </div>
//               ) : null}
//             </>
//           )}
//         </Container>
//       </section>
//       <Container>
//         <div className={styles.destkTopFooterPlacement}>
//           <AdBanner dataAdSlot="7762966681" dataAdFormat="rectangle" />
//           <AdBanner dataAdSlot="3628280550" dataAdFormat="rectangle" />
//         </div>
//         <AdBanner
//           className={styles.mobileFooterPlacement}
//           dataAdFormat="rectangle"
//           dataAdSlot="1340572602"
//         />
//       </Container>
//       <RefreshModal/>
//       <div className="sr-only" aria-hidden={true} id="solo_advertiser" />
//     </>
//     }
//     </>

//   );
// };

// export default FlightsSearch;
