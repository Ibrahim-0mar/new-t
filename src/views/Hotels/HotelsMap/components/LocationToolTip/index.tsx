import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { Heart, Star, X } from 'lucide-react';
import Image from 'next/image';
import styles from './index.module.css';

export interface Location {
  id: number;
  lat: number;
  lng: number;
  title: string;
}

interface LocationToolTipProps {
  selectedLocation: Location;
  onClick: any;
}
const LocationToolTip: React.FC<LocationToolTipProps> = ({
  //  selectedLocation,
  onClick,
}) => {
  const currency = 'USD';

  return (
    <div className={styles.infoWindow}>
      {/* top section */}
      <div className={styles.topSection}>
        <Image src="/hotel.webp" alt="hotel" fill style={{ objectFit: 'cover' }} priority />
        {/* controls section */}
        <div className={styles.header}>
          <button
            aria-label="close button"
            className={styles.closeButton}
            onClick={() => onClick(null)}
          >
            <Heart size={17} />
          </button>
          <button
            aria-label="close button"
            className={styles.closeButton}
            onClick={() => onClick(null)}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      {/* bottom section */}
      <div className={styles.bottomSection}>
        <h2 className="whitespace-nowrap text-base font-semibold">Hotel Monterosa - Astotel</h2>
        <div className="mb-1 flex items-center justify-start gap-1">
          <span aria-hidden className="flex items-center justify-start">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={13.5} fill="#212a30" stroke="none" />
            ))}
          </span>
          <p aria-label="rating" className="text-sm leading-none">
            7.7 Good
          </p>
        </div>
        <p className="text-lg font-bold 2xl:text-2xl">
          <FormatPrice price={100} currency={currency} />
        </p>
      </div>
    </div>
  );
};

export default LocationToolTip;
