import Button from '@/components/common/base/Button';
// import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import { imagesUrl } from '@/utils/config';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './index.module.css';

type FlightDetailsNavbarType = {
  origin: string;
  destination: string;
  travellers: string;
  cabin: string;
  tripType: string;
  closeDetails: () => void;
};
const FlightDetailsNavbar = ({
  origin,
  destination,
  travellers,
  cabin,
  tripType,
  closeDetails,
}: FlightDetailsNavbarType) => {
  const t = useTranslations();

  return (
    <>
      <div className={styles.upper}>
        <Button variant="default" onClick={closeDetails}>
          <ChevronLeft size={25} />
          {t('NZ-R_mo3KuuhtlixQ4LjU')}
        </Button>
        <Image
          src={commonImgUrl('coloredLogo.png')}
          alt={t('lFBbtHy396Muq9ArmFFXL')}
          width={115}
          height={0}
          loading="lazy"
        />
      </div>
      <AdBanner
        className="bg-gray-50 lg:hidden"
        dataAdFormat="horizontal"
        dataAdSlot="1340572602"
        responsive={false}
      />
      <div className={styles.lower}>
        <h1>
          {origin} {t('TR6HhuwzTSU-9TAtZMbxL')} {destination}
        </h1>
        <Image
          src={imagesUrl + 'flights/flights-adult.svg'}
          alt={t('RwMjWIoejpjblhJtNf4dI')}
          width={9}
          height={0}
          loading="lazy"
        />
        <span>
          {/* Passengers Count */}
          {travellers}
        </span>
        <span className={styles.middleDot}>·</span>
        <span>{tripType}</span>
        <span className={styles.middleDot}>·</span>
        <span>{cabin}</span>
      </div>
    </>
  );
};

export default FlightDetailsNavbar;
