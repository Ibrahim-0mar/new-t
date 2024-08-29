import { commonImgUrl } from '@/utils/helper/imgUrl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './index.module.css';

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
}

interface Segment {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  marketingCarrier: string;
  operatingCarrier: string;
  marketingFlightNumber: number;
  vehicleType: string;
  duration: number;
  originDetails: { name: string; code: string };
  destinationDetails: { name: string; code: string };
}

interface AirportTransfersAdProps {
  itinerary: { id: string; legs: Leg[] };
}

const AirportTransfersAdMobile = ({ itinerary }: AirportTransfersAdProps) => {
  const t = useTranslations();

  const redirectToAirportTransfers = (): string => {
    return `/airport-transfers?origin=${itinerary?.legs[0]?.segments[0].destinationDetails.name.replace(/ /g, '-').toLowerCase()}&arrival-date=${itinerary?.legs[0]?.segments[0]?.arrival}`;
  };

  return (
    <div className={styles.container}>
      <Image
        src={'/car-airport-traveler.png'}
        alt=""
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.overlay}>
        <Image
          style={{ marginLeft: 'auto', marginRight: '50px' }}
          src={'/white-plane.svg'}
          alt="plane"
          width={50}
          height={50}
          unoptimized
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.gradian}>
          <h2 className={styles.h2}>{t('6KtvWy7kx6ur7fmcMZboX')}</h2>
          <h3 className={styles.h3}>{t('djZy91fHqbHrthYvPReMh')}</h3>
        </div>
        <div className={styles.logoContainer}>
          <div className={styles.innerContainer}>
            <Image
              style={{ objectFit: 'cover' }}
              width={120}
              height={50}
              src={commonImgUrl('coloredLogo.png')}
              alt={t('yfDTemffLrkUoi_u7RiDs')}
              priority
            />
            <a href={redirectToAirportTransfers()} target="_blank" className={styles.link}>
              {t('yHQcSTyS8XDoVZERHxyLC')}
            </a>
          </div>
          <p className={styles.fromAirport}>
            {t('hwDePS6rjszqltzZNQt6p', {
              airport: itinerary?.legs[0]?.segments[0]?.destinationDetails?.name,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirportTransfersAdMobile;
