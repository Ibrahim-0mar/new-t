'use client';
import Button from '@/components/common/base/Button';
import ChevronLeft from '@/components/common/base/ChevronLeft';
import ChevronRight from '@/components/common/base/ChevronRight';
import { useRouter } from '@/navigation';
import { getAllSegmentsFromItinerary, getFlightTripType } from '@/utils/flights';
import { cn } from '@/utils/helper/tailwind_cn';
import { SortBarData } from '@/views/flights/search/FlightResults';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import LegCard from './components/LegCard';
import AirportTransfersAd from './components/ads/AirportTransfersAd';
import AirportTransfersAdMobile from './components/ads/AirportTransfersAdMobile';
import KayakAdDesktop from './components/ads/KayakAdDesktop';
import KayakMobile from './components/ads/KayakMobile';
import FaresList from './components/faresList';
import FlightDetailsNavbar from './components/navbar';
import styles from './index.module.css';

type FlightDetailsPageProps = {
  itinerary: any;
  searchId: string;
  closeDetails: () => void;
  sortedData: SortBarData;
};

const FlightDetailsPage = ({
  itinerary,
  searchId,
  closeDetails,
  sortedData,
}: FlightDetailsPageProps) => {
  const router = useRouter();
  const t = useTranslations();

  const cabinClasses: any = {
    Economy: t('rIiR0JqFJCgXghbVz0mzU'),
    Premium_Economy: t('ipLZ1siuRxhwd2x_8Efz_'),
    Business: t('YPnMS1LA9yFxZ-uUkc91l'),
    First: t('V5kZRvDl1vU-7uxuJKWNA'),
  };

  const tripTypes = {
    oneway: t('cd_4pzYkVbyTku6JYAIqT'),
    multi: t('oOz1ckD4fnuAlzWv35wph'),
    round: t('qCJNwX_A29mSPMKA1wELp')
  }

  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  const cabin = cabinClasses[searchParams.get('cabin') || 'Economy'];
  const adults = Number(searchParams.get('adults') || 1);
  const children = Number(searchParams.get('children') || 0);
  const infants = Number(searchParams.get('infants') || 0);
  const travellers =
    children + infants === 0 ? adults + ` ${t('_X-1SwqaZn35z4mdjg4-D')}` : adults + children + infants + ` ${t('miF5aclFVGBaTeoBgF3z8')}`;
  const tripType = tripTypes[getFlightTripType(itinerary.legs)];

  useEffect(() => {
    const handleRouteChange = () => {
      closeDetails();
    };
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <FlightDetailsNavbar
        origin={
          itinerary?.legs[0].segments[0]?.originDetails?.city?.name ||
          itinerary?.legs[0].segments[0]?.originDetails?.name
        }
        destination={
          itinerary?.legs[0].segments[itinerary?.legs[0].segments.length - 1]?.destinationDetails
            ?.city?.name ||
          itinerary?.legs[0].segments[itinerary?.legs[0].segments.length - 1]?.destinationDetails
            ?.name
        }
        travellers={travellers}
        cabin={cabin}
        tripType={tripType}
        closeDetails={closeDetails}
      />
      <div className={styles.mainContainer}>
        <div className={styles.detailsContainer}>
          <div className={styles.itenarySection}>
            <h2>{t('C9bNsE2AM1OorkZonaFuI')}</h2>
            {itinerary.legs.length > 2 ? (
              <div className={styles.swiperContainer}>
                {activeIndex !== 0 && (
                  <Button
                    variant="default"
                    className={cn(styles.arrowContainer, styles.prev)}
                    onClick={() => swiperRef.current!.slidePrev()}
                  >
                    <ChevronLeft size={25} className={styles.nextArrow} aria-hidden="true" />
                    <span className="sr-only">previous Leg</span>
                  </Button>
                )}
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onActiveIndexChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                  }}
                  effect="coverflow"
                  grabCursor={true}
                  slidesPerView={2.1}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: false,
                  }}
                  modules={[EffectCoverflow, Navigation]}
                >
                  {itinerary.legs.map((leg: TransformedLegType, index: number) => (
                    <SwiperSlide key={index} className={styles.sweiperSlide}>
                      <LegCard
                        cardTitle={t('msvbH-Lqc5_4tPAKoALrD') + index + 1}
                        cabin={cabin}
                        leg={leg as any}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {activeIndex !== itinerary.legs?.length - 2 && (
                  <Button
                    variant="default"
                    className={cn(styles.arrowContainer, styles.next)}
                    onClick={() => swiperRef.current!.slideNext()}
                  >
                    <ChevronRight size={25} className={styles.nextArrow} aria-hidden="true" />
                    <span className="sr-only">Next leg</span>
                  </Button>
                )}
              </div>
            ) : (
              <div className={styles.withoutSwiperContainer}>
                {itinerary.legs.map((leg: TransformedLegType, index: number) => (
                  <LegCard
                    key={leg.id}
                    cabin={cabin}
                    leg={leg as any}
                    cardTitle={
                      itinerary.legs.length === 1
                        ? ''
                        : index === 0
                          ? t('EaXVvtx5ErD2aOaF7EhwH')
                          : t('ZXa0TtiFTzS97kDf4GqkE')
                    }
                  />
                ))}
              </div>
            )}
          </div>
          <FaresList
            fares={itinerary.pricingOptions}
            adults={adults}
            childrenNo={children}
            infants={infants}
            searchId={searchId}
            itineraryId={itinerary.id}
            allSegments={getAllSegmentsFromItinerary(itinerary)}
            tripType={getFlightTripType(itinerary.legs)}
            cabinClass={cabin}
            sortedData={sortedData}
            legs={itinerary.legs}
          />
          <section className="space-y-4 xl:hidden">
            <KayakMobile itinerary={itinerary} />
            <AirportTransfersAdMobile itinerary={itinerary} />
          </section>
        </div>

        {/* Ads Area */}
        <div className={styles.adsContainer}>
          <KayakAdDesktop itinerary={itinerary} />
          <AirportTransfersAd itinerary={itinerary} />
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;
