'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import AirportTransfersFilter from '../AirportTransfersFilter';
import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import { AirportTransfersFilterType } from '@/views/common/results/AirportTransfers/utils/filters';
import { Control, UseFormSetValue, UseFormReset } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import {
  airportTransferFilterPricesType,
  AirportTransfersResultType,
} from '@/utils/types/airport-transfers/results';

interface Props {
  showMobileFilters: boolean;
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
  data: AirportTransfersResultType;
  currency: string;
  filterPrices: airportTransferFilterPricesType;
  watch: any;
  control: Control<AirportTransfersFilterType, any>;
  setValue: UseFormSetValue<AirportTransfersFilterType>;
  reset: UseFormReset<AirportTransfersFilterType>;
  handleFilters: (data: AirportTransfersResultType) => void;
}

const AirportTransfersMobileFilter = ({
  showMobileFilters,
  data,
  currency,
  filterPrices,
  control,
  watch,
  setValue,
  reset,
  handleFilters,
  setShowMobileFilters,
}: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        styles.filtersMobileContainer,
        showMobileFilters ? 'fixed translate-y-0' : 'hidden translate-y-full',
      )}
    >
      <div className={styles.header}>
        <span className={styles.filtersHeading}>{t('FttOwYRjhKXO3HOPD56ef')}</span>
        <Button
          variant="default"
          className={styles.doneBtn}
          onClick={() => {
            setShowMobileFilters(!showMobileFilters);
          }}
        >
          {t('hGBYhJKUK2tCg9j_xaosr')}
        </Button>
      </div>

      <div className={styles.countAndResetAll}>
        <p>{t('erc0L0IZ5h81b8N6p_uQ5', { numbers: data.itinerariesPrice.length })}</p>
        <Button
          variant="default"
          className={styles.resetAllBtn}
          type="button"
          onClick={() => {
            reset();
          }}
        >
          {t('CifSeSk-yn3LsUcveiBu0')}
        </Button>
      </div>

      <div className={styles.filtersContainer}>
        <AirportTransfersFilter
          data={data}
          currency={currency}
          filterPrices={filterPrices}
          control={control}
          watch={watch}
          setValue={setValue}
          reset={reset}
          handleFilters={handleFilters}
        />
      </div>
    </div>
  );
};

export default AirportTransfersMobileFilter;
