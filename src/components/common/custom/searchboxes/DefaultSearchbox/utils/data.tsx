import { Bus, Car, Hotel, Plane } from 'lucide-react';
import styles from '../index.module.css';

type tabsType = {
  icon: JSX.Element;
  href:
    | 'last-minute-flights'
    | 'airport-transfers'
    | 'last-minute-hotels-deals'
    | 'luxury-car-rental';
  name: 'flights' | 'airport-transfers' | 'hotels' | 'car-rental';
  enabled: boolean;
};
export const tabs: tabsType[] = [
  // name property of a single tab is stored in the translation file, and is accessed by the key of the href property
  {
    icon: <Plane size={26} className={styles.icon} />,
    href: 'last-minute-flights',
    name: 'flights',
    enabled: process.env.NEXT_PUBLIC_FLIGHTS_ENABLED === 'true',
  },
  {
    icon: <Bus size={26} className={styles.icon} />,
    href: 'airport-transfers',
    name: 'airport-transfers',
    enabled: process.env.NEXT_PUBLIC_TRANSFERS_ENABLED === 'true',
  },
  {
    icon: <Hotel size={26} className={styles.icon} />,
    href: 'last-minute-hotels-deals',
    name: 'hotels',
    enabled: process.env.NEXT_PUBLIC_HOTELS_ENABLED === 'true',
  },
  {
    icon: <Car size={26} className={styles.icon} />,
    href: 'luxury-car-rental',
    name: 'car-rental',
    enabled: process.env.NEXT_PUBLIC_CAR_RENTAL_ENABLED === 'true',
  },
];
