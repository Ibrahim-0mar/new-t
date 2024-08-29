'use client';
import Button from '@/components/common/base/Button';
import { HotelsFilterType } from '@/views/common/results/Flights/utils/filters';
import { BellRing } from 'lucide-react';
import { Control, UseFormReset, UseFormSetValue } from 'react-hook-form';
import HotelClassFilter from './components/HotelClassFilter';
import HotelPriceFilter from './components/HotelPriceFilter';
import RecommendedFilters from './components/RecommendedFilters';
import FreebiesFilter from './components/freebiesFilter';
import ReviewScoreFilter from './components/reviewScoreFilter';
import StaysFilter from './components/staysFilter';
import styles from './index.module.css';

interface HotelsFilterProps {
  // data: FlightResultType;
  // currency: string;
  // filterPrices: FilterPricesType;
  watch: any;
  control: Control<HotelsFilterType, any>;
  setValue: UseFormSetValue<HotelsFilterType>;
  reset: UseFormReset<HotelsFilterType>;
  // handleFilters: (data: FlightResultType) => void;
}

const HotelFilters = ({
  // watch,
  control, // setValue,
  // reset,
}: HotelsFilterProps) => {
  return (
    <div className={styles.filters}>
      <div className={styles.priceAlerts}>
        <Button variant="default">
          <BellRing size={16} strokeWidth={3} /> Price Alerts
        </Button>
        <span>Track prices</span>
      </div>
      <RecommendedFilters />
      <HotelClassFilter />
      <ReviewScoreFilter />
      <HotelPriceFilter
        title={'Price'}
        name="price"
        control={control}
        min={Number(1)}
        max={Number(5000)}
        currency={'USD'} />
      <FreebiesFilter />
      <StaysFilter />
    </div>
  );
};

export default HotelFilters;
