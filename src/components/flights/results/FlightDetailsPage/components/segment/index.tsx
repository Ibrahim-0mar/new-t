import Button from '@/components/common/base/Button';
import { locale } from '@/navigation';
import { fetchAmenitiesRequest, fetchSeatMapRequest } from '@/services/apis/flights/results';
import { formatDuration } from '@/utils/helper/dates';
import FormatDate from '@/utils/helper/FormatDateComponent';
import { segmentType } from '@/utils/types/flights';
import dayjs from 'dayjs';
import { Armchair, Timer, Utensils } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FlightLineVector from '../flightLineVector';
import { AmenitiesContent } from './components/AminitiesContent';
import styles from './index.module.css';

interface Props {
  cabin: string;
  segmentLine?: 'fromTransit' | 'toTransit' | '';
  segment: TransformedSegmentType;
}

const Segment = ({ cabin, segmentLine, segment }: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [isSeatmapLoading, setIsSeatmapLoading] = useState(false);
  const [aminities, setAminities] = useState<any>('');
  const [seatmap, setSeatmap] = useState<null | { seatmapLink: string } | ''>('');
  const [isAminetiesLoading, setIsAminetiesLoading] = useState(false);
  const cabinClassInEnglish = searchParams.get('cabin') || 'Economy'; // to get the first charachter  at ameniteis and seatmap

  const openLink = (link: string, title: string) => {
    window?.open(link, title, 'width=320,height=700');
  };
  const checkSeatmap = async (segment: segmentType) => {
    setIsSeatmapLoading(true);
    const data = [
      {
        id: segment.id,
        departure: segment.origin,
        arrival: segment.destination,
        airlineCode: segment.marketingCarrier,
        flightNo: `${segment.marketingFlightNumber}`,
        departureDate: dayjs(segment.departure).format('YYYY-MM-DD'),
        cabinClass: cabinClassInEnglish?.charAt(0) || 'E',
      },
    ];

    const seatmapResponse = await fetchSeatMapRequest(data, locale);

    if (seatmapResponse && seatmapResponse[segment.id]?.seatmapLink) {
      setSeatmap(seatmapResponse[segment.id]);
      openLink(seatmapResponse[segment.id].seatmapLink, 'Seatmap');
    } else {
      setSeatmap(null);
    }
    setIsSeatmapLoading(false);
  };
  const checkAmineties = async (segment: segmentType) => {
    setIsAminetiesLoading(true);
    const data = [
      {
        id: segment.id,
        departure: segment.origin,
        arrival: segment.destination,
        airlineCode: segment.marketingCarrier,
        flightNo: `${segment.marketingFlightNumber}`,
        departureDate: dayjs(segment.departure).format('YYYY-MM-DD'),
        cabinClass: cabinClassInEnglish?.charAt(0) || 'E',
      },
    ];

    const response = await fetchAmenitiesRequest(data, locale);
    if (response && response[segment.id]) {
      setAminities(response[segment.id]);
    } else {
      setAminities(null);
    }

    setIsAminetiesLoading(false);
  };

  return (
    <div className={styles.segmentContainer}>
      <div id="left col" className={styles.leftCol}>
        <div className={styles.time}>
          <span>
            <FormatDate date={segment.departure} />
          </span>
          <span>
            <FormatDate
              date={segment.departure}
              replaceFormatWith={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
            />
          </span>
        </div>
        <div className={styles.opacity}>
          <Timer />
          <span className={styles.duration}>{formatDuration(segment.duration, locale)}</span>
        </div>
        <div className={styles.time}>
          <span>
            <FormatDate date={segment.arrival} />
          </span>
          <span>
            <FormatDate
              date={segment.arrival}
              replaceFormatWith={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
            />
          </span>
        </div>
      </div>

      <div id="right col" className={styles.rightCol}>
        {segmentLine && segmentLine.length > 0 ? (
          <FlightLineVector
            isFirstSolid={segmentLine === 'fromTransit' ? false : true}
            isLastSolid={segmentLine === 'fromTransit' ? true : false}
          />
        ) : (
          <FlightLineVector isFirstSolid={true} isLastSolid={true} />
        )}
        <div className={styles.segmentDetails}>
          <span>
            <strong>{segment.origin}</strong> {segment.originDetails?.name}
          </span>
          <span>{segment?.marketingCarrierDetails?.name}</span>
          <span>
            {t('RF3otvliJEjE_UPAYFeX4')}{' '}
            <strong>{segment.marketingCarrier + segment?.marketingFlightNumber}</strong>{' '}
          </span>

          <span className={styles.bottomBorderDashed}>{cabin}</span>

          {aminities && aminities != '' ? (
            <AmenitiesContent aminities={aminities} />
          ) : aminities === '' ? (
            <Button
              variant="default"
              className={styles.aminitiesButton}
              onClick={() => checkAmineties(segment)}
              disabled={isAminetiesLoading}
            >
              <Utensils size={18} className={styles.buttonIcon} />
              {isAminetiesLoading ? t('MnHrzlTFTXRI8yhN2vclB') : t('gIvXUxGacJ4txM2pS2UR_')}
            </Button>
          ) : (
            <p>{t('3R-iX5Dunkp7dp11ldXnI')}</p>
          )}
          {seatmap === null ? (
            <p>{t('3SQORmvGT_ZSMbkDTkeM2')}</p>
          ) : (
            <Button
              variant="default"
              className={styles.aminitiesButton}
              onClick={() =>
                seatmap === ''
                  ? checkSeatmap(segment)
                  : openLink(seatmap.seatmapLink, t('57nFJLwz8K0onLGXHcF16'))
              }
              disabled={isSeatmapLoading}
            >
              <Armchair size={18} className={styles.buttonIcon} />
              {isSeatmapLoading ? t('MnHrzlTFTXRI8yhN2vclB') : t('57nFJLwz8K0onLGXHcF16')}
            </Button>
          )}

          <span>{segment.destination + '-' + segment.destinationDetails?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Segment;
