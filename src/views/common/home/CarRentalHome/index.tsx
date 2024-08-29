import AppDownloadSection from '@/sections/common/AppDownloadSection';
import SearchboxSection from '@/sections/common/SearchboxSection';
import TopFlightsSection from '@/sections/flights/TopFlightsSection';
import { useTranslations } from 'next-intl';
import styles from './index.module.css';

const CarRentalHome = ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <SearchboxSection activeTab="luxury-car-rental" header={t('Tx8qeKeCJyQiIFJKAThX8')} />
      <AppDownloadSection />
      <TopFlightsSection searchParams={searchParams} />
    </div>
  );
};

export default CarRentalHome;
