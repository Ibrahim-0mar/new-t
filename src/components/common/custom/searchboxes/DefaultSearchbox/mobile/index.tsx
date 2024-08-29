import Container from '@/components/common/base/Container';
import { Link } from '@/navigation';
import AirportTransfersSearchboxMobile from '@/sections/airport-transfers/mobile';
import HotelsSearchMobile from '@/sections/common/SearchboxSection/hotelsMobile';
import FlightSearchMobile from '@/sections/common/SearchboxSection/mobile';
import { cn } from '@/utils/helper/tailwind_cn';
import { SearchboxType, TabType } from '@/utils/types/common';
import { useTranslations } from 'next-intl';
import CarRentalMobileSearchbox from '../components/car-rental/mobile';
import { tabs } from '../utils/data';
import styles from './index.module.css';

const DefaultSearchboxMobile = ({ activeTab, data }: SearchboxType) => {
  const t = useTranslations();

  const tabsName = {
    flights: t('f4Y_o_qrRxXHsasCcDCXX'),
    'airport-transfers': t('6KtvWy7kx6ur7fmcMZboX'),
    hotels: t('NJ-1JLVLFxFl29jtY5L6X'),
    'car-rental': t('jMG-NauYLSJWGCNB-A_SN'),
  };

  const getActiveSearch = () => {
    switch (activeTab) {
      case 'last-minute-flights':
        return <FlightSearchMobile activeTab={activeTab} data={data} />;
      case 'airport-transfers':
        return <AirportTransfersSearchboxMobile />;
      case 'last-minute-hotels-deals':
        return <HotelsSearchMobile />;
      case 'luxury-car-rental':
        return <CarRentalMobileSearchbox />;
      default:
        return <FlightSearchMobile activeTab={activeTab} data={data} />;
    }
  };

  const Tab = ({ name, href, icon }: TabType) => {
    return (
      <div className={cn('!w-full', activeTab === href ? styles.active : '')}>
        <Link
          href={`/${href}` || '#'}
          className={cn(styles.tab, activeTab === href ? '!text-sixth' : '')}
        >
          {icon}
          <h2>{name}</h2>
        </Link>
      </div>
    );
  };

  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => {
            if (tab.enabled) {
              return (
                <Tab key={tab.href} name={tabsName[tab.name]} icon={tab.icon} href={tab.href} />
              );
            }
          })}
        </div>
        <div>{getActiveSearch()}</div>
      </div>
    </Container>
  );
};

export default DefaultSearchboxMobile;
