'use client';
import ImageComponent from '@/components/common/base/ImageComponent';
import Tooltip from '@/components/common/base/Tooltip';
import { locale } from '@/navigation';
import { backendImagesUrl, imagesUrl } from '@/utils/config';
import { diffBetweenTwoDates, formatDuration } from '@/utils/helper/dates';
import FormatDate from '@/utils/helper/FormatDateComponent';
import { cn } from '@/utils/helper/tailwind_cn';
import dayjs from 'dayjs';
import { ChevronDown, ChevronUp, Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import LayoverComponent from '../layoverComponent';
import Segment from '../segment';
import styles from './index.module.css';

interface ImageDetails {
  createdAt: string;
  updatedAt: string;
  _id: string;
  pathWithFilename: string;
  mime: string;
  filename: string;
  path: string;
}

interface CarrierDetails {
  _id: string;
  name: string;
  code: string;
  __v: number;
  updatedAt: string;
  image: ImageDetails;
}

interface Currency {
  _id: string;
  code: string;
  name: string;
  symbol: string;
}

interface Country {
  _id: string;
  name: string;
  code: string;
  currency: Currency;
  __v: number;
  updatedAt: string;
}

interface City {
  location: {
    type: string;
    coordinates: number[];
  };
  _id: string;
  name: string;
  code: string;
  saveatrain_code?: string;
  country: Country;
  __v: number;
  agoda_city_id: string;
  updatedAt: string;
  distribusion_code: string;
  image: ImageDetails;
  imageAlt: string;
  combigo_code: string;
  placed: boolean;
}

interface Location {
  type: string;
  coordinates: number[];
}

interface AirportDetails {
  location: Location;
  _id: string;
  name: string;
  code: string;
  timezone: string;
  city: City;
  isActive: boolean;
  __v: number;
  updatedAt: string;
}

interface Segment {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  marketingCarrier: string;
  operatingCarrier: string;
  marketingFlightNumber: string;
  vehicleType: string;
  aircraft: string;
  duration: number;
  operatingCarrierDetails: CarrierDetails;
  marketingCarrierDetails: CarrierDetails;
  originDetails: AirportDetails;
  destinationDetails: AirportDetails;
}

interface Leg {
  id: string;
  origin: string;
  departure: string;
  destination: string;
  arrival: string;
  segments: Segment[];
  stopCount: number;
  marketingCarriers: string[];
  vehicleType: string[];
  duration: number;
  marketingCarriersDetails: CarrierDetails[];
}

interface Props {
  cabin: string;
  leg: Leg;
  cardTitle?: string;
}

const LegCard = ({ cabin, leg, cardTitle }: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const [toggleExtraDetails, setToggleExtraDetails] = useState<boolean>(true);

  const _renderFlightTiming = (date: string) => {
    const hours = dayjs(date).hour();
    if (0 <= hours && hours < 5) {
      return (
        <span className={styles.flightTiming}>
          <Moon size={15} /> {t('HCHwumB92ipd78kwou8jV')}
        </span>
      );
    } else if (5 <= hours && hours < 12) {
      return (
        <span className={styles.flightTiming}>
          <Sunrise size={15} /> {t('SxpyF0i3cuy6bJjy2v5C-')}
        </span>
      );
    } else if (12 <= hours && hours < 17) {
      return (
        <span className={styles.flightTiming}>
          <Sun size={15} /> {t('dTtb5bQXeFWswNsW-jtNc')}
        </span>
      );
    } else if (17 <= hours && hours < 21) {
      return (
        <span className={styles.flightTiming}>
          <Sunset size={15} /> {t('L9qupGRSMlnYB6Rko8-BE')}
        </span>
      );
    } else if (21 <= hours && hours <= 23) {
      return (
        <span className={styles.flightTiming}>
          <Moon size={15} /> {t('PDT6pDZA7F-3Mamr7i_wI')}
        </span>
      );
    }
  };

  const _renderAirportName = (name: string) => {
    if (name.length > 20) {
      return <Tooltip tooltipBody={name}>{name?.slice(0, 20) + '...'}</Tooltip>;
    }
    return name;
  };

  return (
    <div className={styles.itenaryContainer}>
      <div
        className={styles.summaryWithoutArrow}
        onClick={() => setToggleExtraDetails(!toggleExtraDetails)}
      >
        <div>
          <h2 className={styles.cardType}>{cardTitle && cardTitle.toUpperCase()}</h2>
          <div className={styles.summary}>
            <div className={styles.dataSection}>
              <h4 className={styles.flightDate}>
                <FormatDate date={leg?.departure} />
              </h4>
              <h3 className={styles.flightTime}>
                {leg?.origin}{' '}
                <FormatDate
                  date={leg?.departure}
                  replaceFormatWith={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                />
              </h3>
              <h4 className={styles.airportName}>
                {_renderAirportName(leg.segments[0]?.originDetails?.name)}
              </h4>
            </div>
            <Image
              src={imagesUrl + 'flights/plane.svg'}
              alt={t('6VC_9hcLWdAf_9Iy8L-ms')}
              width={30}
              height={0}
              loading="lazy"
              className="rtl:-scale-x-100"
            />
            <div className={styles.dataSection}>
              <h4 className={styles.flightDate}>
                <FormatDate date={leg?.arrival} />
              </h4>
              <h3 className={styles.flightTime}>
                {leg?.destination}{' '}
                <FormatDate
                  date={leg?.arrival}
                  replaceFormatWith={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                />
              </h3>
              <h4 className={styles.airportName}>
                {_renderAirportName(leg.segments.at(-1)?.destinationDetails?.name as string)}
              </h4>
            </div>
          </div>
          <div className={styles.lowerSection}>
            <div>
              <div>
                <span className={styles.summaryText}>
                  {formatDuration(leg?.duration, locale)}{' '}
                  {leg.segments.length > 1 && t('qXGg89auECJUglJQkZbZ9')}{' '}
                  {leg.segments[0]?.originDetails?.name}
                </span>
              </div>

              <span className={styles.overNightSpan}>{_renderFlightTiming(leg?.departure)}</span>
            </div>

            <div className={styles.airlinesLogosSection}>
              {leg.marketingCarriersDetails?.length > 0 &&
                leg.marketingCarriersDetails.slice(0, 2).map((airline: any) => {
                  return (
                    <Tooltip
                      key={airline?.code}
                      parentClassName={styles.airlineTooltip}
                      tooltipBody={<span>{airline?.name}</span>}
                    >
                      <ImageComponent
                        src={
                          backendImagesUrl + `images/airlines/${airline?.code}/${airline?.code}.png`
                        }
                        alt={airline?.name + ' logo'}
                        key={airline?.code}
                        width={
                          leg.marketingCarriersDetails?.length > 1
                            ? 100 / leg.marketingCarriersDetails?.length
                            : 50
                        }
                        height={0}
                        defaultImage={imagesUrl + '/flights/defaultAirline.png'}
                      />
                    </Tooltip>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {toggleExtraDetails && (
        <button
          className={styles.detailsButton}
          onClick={() => setToggleExtraDetails(!toggleExtraDetails)}
        >
          {t('30Cz2B-wjI0s4GA0CJgdn')} <ChevronDown />
        </button>
      )}
      {/* Details */}
      <div className={cn(styles.extraDetails, toggleExtraDetails && styles.hideSummary)}>
        <div className={styles.segmentsContainer}>
          {leg?.segments?.map((segment: any, index: number) => (
            <>
              <Segment
                cabin={cabin}
                segment={segment}
                segmentLine={
                  leg?.segments?.length === 1 ? '' : index === 0 ? 'toTransit' : 'fromTransit'
                }
              />
              {leg?.segments?.length > index + 1 && (
                <LayoverComponent
                  message={
                    segment.destination != leg.segments[index + 1]?.origin
                      ? t('3CYT0dcxk6k2Z3-GKNj4h')
                      : t('ZRcB7MN0rhdNDfS69IMVE') + segment.destinationDetails?.city?.name
                  }
                  layoverDuration={formatDuration(
                    diffBetweenTwoDates(
                      leg.segments[index + 1]?.departure as any,
                      segment?.arrival,
                      'minute',
                    ),
                    locale,
                  )}
                />
              )}
            </>
          ))}
        </div>
        <button
          className={styles.detailsButton}
          onClick={() => setToggleExtraDetails(!toggleExtraDetails)}
        >
          {t('9gsgrxf6XUFYcZYnwFS-s')} <ChevronUp />
        </button>
      </div>
    </div>
  );
};

export default LegCard;
