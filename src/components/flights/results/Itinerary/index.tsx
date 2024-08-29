import Button from '@/components/common/base/Button';
import ImageComponent from '@/components/common/base/ImageComponent';
import Tooltip from '@/components/common/base/Tooltip';
import { locale } from '@/navigation';
import { backendImagesUrl, imagesUrl } from '@/utils/config';
import FormatDate from '@/utils/helper/FormatDateComponent';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { diffBetweenTwoDates, formatDuration } from '@/utils/helper/dates';
import { cn } from '@/utils/helper/tailwind_cn';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Briefcase, Luggage, Receipt } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import ShareModal from './components/shareModal';
import styles from './index.module.css';
import { TicketViewTrackingData } from '@/utils/types/flights';
import dayjs from 'dayjs';

const FlightItinerary = ({
  itinerary,
  ticketPosition,
  isModalOpen,
  openDetails,
  isSponsored,
  buttonText,
  shareFlightTrakingData
}: {
  itinerary: TransformedItineraryType;
  ticketPosition: number;
  isModalOpen: boolean;
  openDetails: (id: string, position: number) => void;
  isSponsored?: boolean;
  buttonText?: string;
  shareFlightTrakingData?: TicketViewTrackingData
}) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const { legs, pricingOptions } = itinerary;
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
  const maxBagaggeValues: FlightBaggageAllowance = {
    totalPieces: 0,
    totalKilos: 0,
    totalBaggages: 0,
    BaggagesInKilos: 0,
    totalHandbages: 0,
    HandbagesInKilos: 0,
    totalPrice: 0,
    totalBaggagePrice: 0,
    totalHandbagPrice: 0,
  };

  Object.keys(maxBagaggeValues).forEach((key) => {
    const baggageKey = key as keyof FlightBaggageAllowance;

    maxBagaggeValues[baggageKey] = pricingOptions.reduce(
      (max: number, option: { meta?: { baggage?: FlightBaggageAllowance } }) => {
        if (option.meta && option.meta.baggage && option.meta.baggage[baggageKey]) {
          return Math.max(max, option.meta.baggage[baggageKey]!);
        }
        return max;
      },
      0,
    );
  });
  const { BaggagesInKilos, HandbagesInKilos, totalBaggages, totalHandbages } = maxBagaggeValues;
  const isHasBaggage =
    totalBaggages !== 0 ||
    BaggagesInKilos ||
    totalHandbages !== 0 ||
    HandbagesInKilos !== 0 ||
    Object.values(itinerary.availableRestrictions).some((value) => value === true);
  const searchParams = useSearchParams();

  const cabin = searchParams.get('cabin') || 'Economy';
  const cabinClasses: any = {
    Economy: t('rIiR0JqFJCgXghbVz0mzU'),
    Premium_Economy: t('ipLZ1siuRxhwd2x_8Efz_'),
    Business: t('YPnMS1LA9yFxZ-uUkc91l'),
    First: t('V5kZRvDl1vU-7uxuJKWNA'),
  };
  const cabinTranslation = cabinClasses[cabin];

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

  const renderStops = (numberOfSegments: number) => {
    switch (numberOfSegments) {
      case 1:
        return t('ySrcfg2EMpLJka7Mn4xx7');
      case 2:
        return t('qoJlyfFaQ0_JIdWac__Nk');
      default:
        return t('phjQPXi-Q83dZmUOGtxBw', { number: numberOfSegments - 1 });
    }
  };

  const _renderItineraryPrice = (option: any) => {
    if (
      searchParams.get('adults') &&
      Number(searchParams.get('adults')) > 1 &&
      option?.price?.person
    ) {
      return (
        <>
          {/* price come with this format 1311773.44 so check the length so check fot the length you need + 3  */}
          <p className={cn(styles.price, option?.price?.person?.length > 8 && '!text-base')}>
            {<FormatPrice price={option.price.person} currency={option.price.currency} />}
            <span className={styles.person}>/{t('deX3dRrJxO_Ep35f7p1xO')}</span>{' '}
          </p>
          <p className={styles.totalPrice}>
            {t('7jDHGjFH7jyGW068QnFF6')}:{' '}
            {<FormatPrice price={option?.price?.amount} currency={option?.price?.currency} />}
          </p>
        </>
      );
    } else {
      return (
        <p className={cn(styles.price, option?.price?.amount?.length > 8 && '!text-lg')}>
          {/* price come with this format 1311773.44 so check the length so check fot the length you need + 3  */}
          {<FormatPrice price={option?.price?.amount} currency={option?.price?.currency} />}
        </p>
      );
    }
  };

  // show if arrival and departure not at same day ex: if departure at 23/8/2024 and arrival at 24/8/2024 show +1 at arrival
  const _renderDiffDays =(departure:string,arrival:string)=>{
    const diff:number =diffBetweenTwoDates(dayjs(arrival).toDate() ,dayjs(departure).toDate(),"day")
    if (diff >0) {
      return <sub>+{diff}</sub>
    }else return null
  }

  return (
    <>
      <div className={styles.container}>
        {/* flightInfoSection section */}
        <div className={styles.flightInfoSection}>
          {legs.map((leg) => {
            const duration = formatDuration(leg.duration, locale);

            return (
              <Fragment key={leg.id}>
                <div
                  className={cn(
                    styles.legsContainer,
                    legs.length > 1 ? styles.multiLegsMargin : styles.marginAuto,
                  )}
                >
                  <div className={styles.newimageContainer}>
                    {leg.marketingCarriersDetails?.length > 0 &&
                      leg.marketingCarriersDetails.slice(0, 2).map((airline: any) => {
                        return (
                          <Tooltip
                            key={airline?.code}
                            parentClassName="flex items-center justify-center"
                            tooltipBody={
                              <span className={styles.tooltipBodySpan}>{airline?.name}</span>
                            }
                          >
                            <ImageComponent
                              src={
                                backendImagesUrl +
                                `images/airlines/${airline?.code}/${airline?.code}.png`
                              }
                              alt={airline?.name + ' logo'}
                              key={airline?.code}
                              width={80 / (leg.marketingCarriersDetails?.length > 1 ? 2 : 1)}
                              height={0}
                              defaultImage={imagesUrl + '/flights/defaultAirline.png'}
                            />
                          </Tooltip>
                        );
                      })}
                  </div>
                  <div id="leg details" className={styles.legDetails}>
                    <div className={styles.timeAndPlaceContainer}>
                      <p className={styles.timeText}>
                      <Tooltip
                        tooltipBody={
                          <span className={styles.tooltipBodySpan}>
                           {t('f2qn5Ti5pJ6XLglRKloNC')}  {" "}
                           <FormatDate
                             date={leg?.departure}
                             additionalFormats={{
                                hour: '2-digit',
                                minute: '2-digit',
                              }}
                            />
                          </span>
                        }
                      >
                       <FormatDate
                          date={leg?.departure}
                          replaceFormatWith={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          }}
                        />
                    
                      </Tooltip>
                      </p>
                      <Tooltip
                        key={leg.origin}
                        tooltipBody={
                          <span className={styles.tooltipBodySpan}>
                            {leg.segments[0].originDetails.name}
                          </span>
                        }
                      >
                        <span className={styles.placeCode}>{leg.origin}</span>
                      </Tooltip>
                    </div>
                    <div className={styles.middleSectionContainer}>
                      <div id="middle" className={styles.middle}>
                        <div id="take off" className={styles.takeOff}>
                          <div className={styles.planeContainer}>
                            <span className={styles.takeOffCircle} />
                            <Icon
                              icon="entypo:aircraft-take-off"
                              width="18"
                              height="18"
                              color="#0a425c"
                              className={styles.planeIcone}
                            />
                            <Icon
                              icon="entypo:aircraft-landing"
                              width="18"
                              height="18"
                              color="#0a425c"
                              className={cn(styles.planeIconeAr, 'hidden rtl:block')}
                            />
                          </div>
                        </div>
                        <div id="middle middle" className={styles.stopsContainer}>
                          <Tooltip
                            parentClassName="w-full"
                            tooltipBody={
                              <span className={styles.tooltipBodySpan}>
                                {leg.segments?.length !== 1
                                  ? leg.segments.map((segment, index) => (
                                      <span key={index}>
                                        {segment.originDetails.name} -{' '}
                                        {segment.destinationDetails.name}
                                        {index < leg.segments.length - 1 && <br />}
                                      </span>
                                    ))
                                  : t('ySrcfg2EMpLJka7Mn4xx7')}
                              </span>
                            }
                          >
                            <p className={styles.stopsText}>{renderStops(leg.segments?.length)}</p>
                          </Tooltip>
                        </div>
                        <div id="landing" className={styles.takeOff}>
                          <div className={styles.landingPlaneContainer}>
                            <Icon
                              icon="entypo:aircraft-landing"
                              width="18"
                              height="18"
                              color="#0a425c"
                              className={styles.planeIcone}
                            />
                            <Icon
                              icon="entypo:aircraft-take-off"
                              width="18"
                              height="18"
                              color="#0a425c"
                              className={cn(styles.planeIconeAr, 'hidden rtl:block')}
                            />
                            <span className={styles.landingCircle} />
                          </div>
                        </div>
                      </div>
                      <span className={styles.durationText}>{duration}</span>
                    </div>
                    <div className={styles.timeAndPlaceContainer}>
                      <p className={styles.timeText}>
                      <Tooltip
                        tooltipBody={
                          <span className={styles.tooltipBodySpan}>
                           {t('Xd_YBCRNyvpqryb6IRbyd')}  {" "}
                           <FormatDate
                          date={leg?.arrival}
                          additionalFormats={{
                            hour: '2-digit',
                            minute: '2-digit',
                          }}
                        />
                          </span>
                        }
                      >
                       <FormatDate
                          date={leg?.arrival}
                          replaceFormatWith={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          }}
                        />
                       {_renderDiffDays(leg?.departure,leg?.arrival)}
                      </Tooltip>
                        
                        
                      </p>
                      <Tooltip
                        tooltipBody={
                          <span className={styles.tooltipBodySpan}>
                            {leg.segments[leg.segments.length - 1].destinationDetails.name}
                          </span>
                        }
                      >
                        <span className={styles.placeCode}>{leg.destination}</span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}

          {(isSponsored || isHasBaggage) && (
            <div className={styles.metaDetails}>
              {isHasBaggage && (
                <div className={styles.baggageContainer}>
                  <p className={styles.baggageTitle}>{t('VNFxMxzxeGSD3Tkw-vTvD')}: </p>
                  <Tooltip
                    tooltipBody={
                      <div className={styles.tooltipContainer}>
                        {Object.entries(maxBagaggeValues).map(([key, value]) => {
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
                    {(totalBaggages !== 0 ||
                      BaggagesInKilos ||
                      totalHandbages !== 0 ||
                      HandbagesInKilos !== 0) && (
                      <div className={styles.baggageDetails}>
                        {(totalBaggages !== 0 || BaggagesInKilos !== 0) && (
                          <div className={styles.totalBaggagesContainer}>
                            <p className={styles.baggageNo}>{totalBaggages ? totalBaggages : 1}</p>
                            <Luggage
                              size={window && window.innerWidth < 500 ? 14 : 18}
                              strokeWidth={1.3}
                            />
                          </div>
                        )}
                        {(totalHandbages !== 0 || HandbagesInKilos !== 0) && (
                          <div className={styles.totalHandbagesContainer}>
                            <p className={styles.baggageNo}>
                              {totalHandbages ? totalHandbages : 1}
                            </p>
                            <Briefcase
                              size={window && window.innerWidth < 500 ? 13 : 16}
                              strokeWidth={1.3}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </Tooltip>
                  <Tooltip
                    className={styles.restrictionsTooltip}
                    tooltipBody={
                      <div>
                        {Object.entries(itinerary.availableRestrictions).map(([key, value]) => {
                          if (value) {
                            return (
                              <p key={key}>
                                {availableRestrictionsNames[key as keyof Restrictions]}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    }
                  >
                    {Object.values(itinerary.availableRestrictions).some(
                      (value) => value === true,
                    ) && (
                      <Receipt
                        strokeWidth={1.3}
                        size={window && window.innerWidth < 500 ? 14 : 17}
                        className={styles.restrictionsIcon}
                      />
                    )}
                  </Tooltip>
                </div>
              )}
              {isSponsored && <p className={styles.sponsoredText}>{t('i8heNgZYGg1H84q9XYrmv')}</p>}
            </div>
          )}
        </div>
        {/* price section */}
        <div className={styles.priceSection}>
          <div id="share and favourite" className={styles.shareAndFavouriteContainer}>
            <ShareModal legs={itinerary.legs} price={pricingOptions[0]?.price?.amount} shareFlightTrakingData={!isSponsored && shareFlightTrakingData}/>
            {/* TODO: show the icon when the integration done */}
            {/* <Icon
              icon="fluent:heart-20-regular"
              width="24"
              height="24"
              style={{ color: 'black' }}
            /> */}
          </div>
          <div className={styles.priceSectionDetails}>
            {_renderItineraryPrice(pricingOptions[0])}
            <p className={styles.priceInfo}>{cabinTranslation}</p>
            <div className={styles.bookingSitesSection}>
              <p className={styles.priceInfo}>{pricingOptions[0]?.agentName}</p>
              {pricingOptions.length > 1 ? (
                <span className={styles.otherSites}>
                  {' +' + `${pricingOptions.length - 1}`}{' '}
                  {pricingOptions.length === 2
                    ? t('3OwDVK6fBZ2xtkCBuh-CT')
                    : t('y_2CDfswwFlsgJSHVH5y0')}{' '}
                </span>
              ) : null}
            </div>
            <Button
              variant="default"
              className={styles.button}
              onClick={() => openDetails(itinerary.id, ticketPosition)}
            >
              {buttonText || t('RY4Hb3PWMJntIyajFkSWc')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightItinerary;
