import { getFlightTripType } from '@/utils/flights';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import dayjs from 'dayjs';
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
  destinationDetails: { name: string; code: string; city: { name: string } };
}

interface KayakAdDesktopProps {
  itinerary: { id: string; legs: Leg[] };
}

const KayakAdDesktop = ({ itinerary }: KayakAdDesktopProps) => {
  const t = useTranslations();

  const kayakRedirect = () => {
    const tripType = getFlightTripType(itinerary.legs as any);
    const departure = itinerary.legs[0].segments[0].destinationDetails.code;
    const arrival = itinerary?.legs[0]?.segments[0]?.arrival;
    const returnDate = itinerary?.legs[1]?.segments[0]?.departure;

    if (tripType === 'oneway') {
      return `https://www.kayak.com/in?a=kan_220420&url=/cars/${departure}/${dayjs(arrival).format('YYYY-MM-DD-HH')}h/${dayjs(arrival).add(1, 'day').format('YYYY-MM-DD-HH')}h?enc_lid=flight_details`;
    } else {
      return `https://www.kayak.com/in?a=kan_220420&url=/cars/${departure}/${dayjs(arrival).format('YYYY-MM-DD-HH')}h/${dayjs(returnDate).format('YYYY-MM-DD-HH')}h?enc_lid=flight_details`;
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src={commonImgUrl('kayak-partner.png')}
        alt={t('q34X7x_kDhnTmVBCIux4t')}
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.overlay}>
        <Image
          className={styles.travolicLogo}
          src={commonImgUrl('whiteLogo.png')}
          height={50}
          width={120}
          alt={t('lFBbtHy396Muq9ArmFFXL')}
          priority
        />
        <Image
          style={{ marginLeft: 'auto', marginRight: '20px' }}
          src={'/orange-plane.svg'}
          alt="plane"
          width={50}
          height={50}
          priority
          unoptimized
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.gradian}>
          <h2 className={styles.h2}>{t('Jra1mH_1x_oOqF8smXUhS')}</h2>
        </div>
        <div className={styles.logoContainer}>
          <div className={styles.innerContainer}>
            <Image
              style={{ objectFit: 'cover' }}
              width={150}
              height={75}
              src={'/kayak.svg'}
              alt={t('yfDTemffLrkUoi_u7RiDs')}
              priority
            />
            <a href={kayakRedirect()} target="_blank" className={styles.link}>
              {t('yHQcSTyS8XDoVZERHxyLC')}
            </a>
          </div>
          <p className={styles.fromAirport}>
            {t('4fiSfMvKzNsna3oH_efuB', {
              airport: itinerary?.legs[0]?.segments[0]?.destinationDetails?.city?.name || "",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KayakAdDesktop;
