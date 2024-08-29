import Container from '@/components/common/base/Container';
import { Link } from '@/navigation';
import { cn } from '@/utils/helper/tailwind_cn';
import { SearchboxType, TabType } from '@/utils/types/common';
import { useTranslations } from 'next-intl';
import HotelsSearch from './components/Hotels/HotelsSearch';
import AirportTransfersSearch from './components/airport-transfers/AirportTransfersSearch';
import CarRentalSearch from './components/car-rental/CarRentalSearch';
import FlightSearch from './components/flights/FlightsSearch';
import styles from './index.module.css';
import { tabs } from './utils/data';

interface props extends SearchboxType {
  origin?: {
    code: string;
    name: string;
    phrase: string;
    cityCode: string;
    countryCode: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    placeType: string;
  };
}
const DefaultSearchbox = ({ activeTab, data, origin }: props) => {
  const t = useTranslations();

  const tabsName = {
    flights: t('f4Y_o_qrRxXHsasCcDCXX'),
    'airport-transfers': t('6KtvWy7kx6ur7fmcMZboX'),
    hotels: t('NJ-1JLVLFxFl29jtY5L6X'),
    'car-rental': t('jMG-NauYLSJWGCNB-A_SN'),
  };

  const Tab = ({ name, href, icon }: TabType) => {
    return (
      <div>
        <Link
          href={`/${href}` || '#'}
          className={cn(styles.tab, activeTab === href && styles.active)}
        >
          {icon}
          <h2>{name}</h2>
        </Link>
        {/* {activeTab === href && <hr className={styles.activeLine} />} */}
      </div>
    );
  };

  const getActiveSearch = () => {
    switch (activeTab) {
      case 'last-minute-flights':
        return <FlightSearch inputs={data} origin={origin} />;
      case 'airport-transfers':
        return <AirportTransfersSearch />;
      case 'last-minute-hotels-deals':
        return <HotelsSearch />;
      case 'luxury-car-rental':
        return <CarRentalSearch />;
      default:
        return <FlightSearch inputs={data} origin={origin} />;
    }
  };

  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => {
            if (tab.enabled) {
              return (
                <Tab
                  key={tab.href}
                  name={tabsName[tab.name as keyof typeof tabsName]}
                  icon={tab.icon}
                  href={tab.href}
                />
              );
            }
          })}
        </div>
        <div>{getActiveSearch()}</div>
      </div>
    </Container>
  );
};

export default DefaultSearchbox;
