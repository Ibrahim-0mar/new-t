'use client';

import BookingSitesFilter from '@/components/airport-transfers/results/filters/components//BookingSitesFilter';
import DurationFilter from '@/components/airport-transfers/results/filters/components//DurationFilter';
import PriceFilter from '@/components/airport-transfers/results/filters/components//PriceFilter';
import FiltersHeader from '@/components/airport-transfers/results/filters/components/FiltersHeader';
import VehicleMakeFilter from '@/components/airport-transfers/results/filters/components/VehicleMakeFilter';
import VehicleTypeFilter from '@/components/airport-transfers/results/filters/components/VehicleTypeFilter';
import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import {
  airportTransferFilterPricesType,
  AirportTransfersResultType,
} from '@/utils/types/airport-transfers/results';
import {
  _getBookingSites,
  AirportTransfersFilterType,
} from '@/views/common/results/AirportTransfers/utils/filters';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Control, UseFormReset, UseFormSetValue } from 'react-hook-form';

interface AirportTransfersFilterProps {
  data: AirportTransfersResultType;
  currency: string;
  filterPrices: airportTransferFilterPricesType;
  watch: any;
  control: Control<AirportTransfersFilterType, any>;
  setValue: UseFormSetValue<AirportTransfersFilterType>;
  reset: UseFormReset<AirportTransfersFilterType>;
  handleFilters: (data: AirportTransfersResultType) => void;
}

const AirportTransfersFilter = ({
  data,
  currency,
  filterPrices,
  watch,
  control,
  setValue,
  reset,
  handleFilters,
}: AirportTransfersFilterProps) => {
  const t = useTranslations();
  const [bookingSites, setBookingSites] = useState<any>([]);
  const [vehicleMake, setVehicleMake] = useState<any>([]);
  const [vehicleType, setVehicleType] = useState<any>([]);

  useEffect(() => {
    setBookingSites(_getBookingSites(data.agents, filterPrices.bookingSites));
    setVehicleMake(
      Object.keys(filterPrices.vehicleMake).map((key) => ({
        name: key,
        price: filterPrices.vehicleMake[key],
      })),
    );
    setVehicleType(
      Object.keys(filterPrices.vehicleType).map((key) => ({
        name: key,
        price: filterPrices.vehicleType[key],
      })),
    );
  }, [data, filterPrices]);

  useEffect(() => {
    handleFilters(data);
  }, [
    watch('bookingSites'),
    watch('price'),
    watch('duration'),
    watch('vehicleMake'),
    watch('vehicleType'),
  ]);

  return (
    <>
      {' '}
      <aside>
        <FiltersHeader reset={reset} numberOfCars={data.itinerariesPrice.length} />
        {/* end Departure Time & return time*/}
        <DurationFilter
          title={t('qkADLkhMtIeF8FGab82gE')}
          name="duration"
          control={control}
          min={
            [...data.itinerariesPrice].reduce((prev, curr) =>
              prev.duration < curr.duration ? prev : curr,
            ).duration
          }
          max={
            [...data.itinerariesPrice].reduce((prev, curr) =>
              prev.duration > curr.duration ? prev : curr,
            ).duration
          }
        />
        <PriceFilter
          title={t('g_SLnsO_PUkukyk-n87md')}
          name="price"
          control={control}
          min={Number(data.itinerariesPrice[0].minPrice)}
          max={Number(data.itinerariesPrice[data.itinerariesPrice.length - 1].minPrice)}
          currency={currency}
        />
        <VehicleMakeFilter
          control={control}
          setValue={setValue}
          vehicleMakes={vehicleMake}
          currency={currency}
        />
        <VehicleTypeFilter
          control={control}
          setValue={setValue}
          vehicleTypes={vehicleType}
          currency={currency}
        />
        <BookingSitesFilter
          control={control}
          setValue={setValue}
          bookingSites={bookingSites}
          currency={currency}
        />
      </aside>
      <AdBanner className="sticky top-24 my-2" dataAdFormat="vertical" dataAdSlot="2213794201" />
    </>
  );
};

export default AirportTransfersFilter;
