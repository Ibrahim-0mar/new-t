'use client';
import AirlinesFilter from '@/components/flights/results/filters/components/AirlinesFilter';
import AliancesFilter from '@/components/flights/results/filters/components/AliancesFilter';
import BookingSitesFilter from '@/components/flights/results/filters/components/BookingSitesFilter';
import DepartureFilter from '@/components/flights/results/filters/components/DepartureFilter';
import DurationFilter from '@/components/flights/results/filters/components/DurationFilter';
import FilterWrapper from '@/components/flights/results/filters/components/FilterWrapper';
import FiltersHeader from '@/components/flights/results/filters/components/FiltersHeader';
import PriceFilter from '@/components/flights/results/filters/components/PriceFilter';
import StopsFilter from '@/components/flights/results/filters/components/StopsFilter';
import style from './index.module.css';

import {
  FLightsFilterType,
  _getAirlines,
  _getBookingSites,
  _getLegsFromParams,
  _getStopovers,
} from '@/views/common/results/Flights/utils/filters';
import AirportsFilter from '@/components/flights/results/filters/components/AirportsFilter';
import StopoverFilter from '@/components/flights/results/filters/components/StopoverFilter';
import BaggageFilter from '@/components/flights/results/filters/components/baggageFilter';
import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { Control, UseFormReset, UseFormSetValue } from 'react-hook-form';
// Hold this filter untill it been fixed by back-end
// import FareRestrictionsFilter from '@/components/flights/results/filters/components/fareRestrictionsFilter';

interface FlightsFilterProps {
  data: FlightResultType;
  filteredData:FlightResultType;
  currency: string;
  filterPrices: FilterPricesType;
  watch: any;
  control: Control<FLightsFilterType, any>;
  setValue: UseFormSetValue<FLightsFilterType>;
  reset: UseFormReset<FLightsFilterType>;
  handleFilters: (data: FlightResultType) => void;
  isCompleted: boolean;
  selectAll:()=>void
}

const FlightsFilter = ({
  data,
  currency,
  filterPrices,
  watch,
  control,
  setValue,
  reset,
  handleFilters,
  isCompleted,
  filteredData,
  selectAll
}: FlightsFilterProps) => {
  const parmas = useParams();
  const t = useTranslations();

  const [airlines, setAirlines] = useState<any>([]);
  const [stopovers, setStopovers] = useState<any>([]);
  const [bookingSites, setBookingSites] = useState<any>([]);

  useEffect(() => {
    setAirlines(_getAirlines(data.airlines, filterPrices.airlines));
    setStopovers(_getStopovers(data.airports, filterPrices.stopovers));
    setBookingSites(_getBookingSites(data.agents, filterPrices.bookingSites));
  }, [data, filterPrices]);

  useEffect(() => {
    handleFilters(data);
  }, [
    watch('stops'),
    watch('aliances'),
    watch('airlines'),
    watch('bookingSites'),
    watch('stopover'),
    watch('price'),
    watch('duration'),
    watch('departure'),
    watch('return'),
    watch('airports.arrival'),
    watch('airports.departure'),
    watch('baggages.0'),
    watch('baggages.1'),
    // Hold this filter untill it been fixed by back-end
    // watch('fareRestrictions'),
  ]);

  return (
    <>
      <aside>
        <FiltersHeader reset={reset} selectAll={selectAll} numberOfFlights={data.itinerariesPrice.length} filteredFlightsNo={filteredData.itinerariesPrice.length} />
        {/* // Hold this filter untill it been fixed by back-end */}
        {/* <FareRestrictionsFilter control={control} currency={currency} itineraries={data.itinerariesPrice} /> */}
        <StopsFilter control={control} currency={currency} itineraries={data.itinerariesPrice} />
        <BaggageFilter
          control={control}
          itineraries={data.itinerariesPrice}
          isCompleted={isCompleted}
        />

        {/* Departure Time  */}
        <FilterWrapper title={t('PwWSifXgjKGVNww_vz1Ph')}>
          {parmas.legs &&
            _getLegsFromParams(parmas.legs).map((leg: any, index: number) => {
              const departures = data.itinerariesPrice.map((itinerary: any) =>
                dayjs(itinerary?.legs[index]?.departure).valueOf(),
              );

              return (
                <Fragment key={leg.id}>
                  <p className={style.subText}>
                    {t('LPHA4rtlUJXa75Kt6jRAb', { place: leg[0] }) +
                      ' ' +
                      t('hdKNcn7duuxUaZhebq_xG', { place: leg[1] })}
                  </p>
                  <DepartureFilter
                    index={index}
                    name="departure"
                    title={t('PwWSifXgjKGVNww_vz1Ph')}
                    control={control}
                    min={Math.min(...departures)}
                    max={Math.max(...departures)}
                  />
                </Fragment>
              );
            })}
        </FilterWrapper>

        {/* Return time  show */}
        {
          <FilterWrapper title={t('1nQ8-_rqZA8RV12Nzfb4e')}>
            {parmas.legs &&
              _getLegsFromParams(parmas.legs).map((leg: any, index: number) => {
                // [0] just for get the legs number of thr itineraries

                const arrivals = data.itinerariesPrice.map((itinerary: any) =>
                  dayjs(itinerary?.legs[index]?.arrival).valueOf(),
                );

                return (
                  <Fragment key={leg.id}>
                    <p className={style.subText}>
                      {t('0xPoVeXvMMeyuo21kMe3R', { place: leg[1] }) +
                        ' ' +
                        t('zYOB9ltkf0351gXli2EMW', { place: leg[0] })}
                    </p>
                    <DepartureFilter
                      index={index}
                      name="return"
                      title={t('0vYZeklftkP6rmv3Nia0E')}
                      control={control}
                      min={Math.min(...arrivals)}
                      max={Math.max(...arrivals)}
                    />
                  </Fragment>
                );
              })}
          </FilterWrapper>
        }
        {/* end Departure Time & return time*/}
        <DurationFilter
          title={t('qkADLkhMtIeF8FGab82gE')}
          name="duration"
          control={control}
          min={Number(data.itinerariesDuration[0].duration)}
          max={Number(data.itinerariesDuration[data.itinerariesDuration.length - 1].duration)}
        />
        <PriceFilter
          title={t('g_SLnsO_PUkukyk-n87md')}
          name="price"
          control={control}
          min={Number(data.itinerariesPrice[0].minPrice)}
          max={Number(data.itinerariesPrice[data.itinerariesPrice.length - 1].minPrice)}
          currency={currency}
        />
        <AirportsFilter
          filterAirports={data.filterAirports}
          control={control}
          setValue={setValue}
          currency={currency}
          prices={filterPrices.airports}
        />
        <AirlinesFilter
          airlines={airlines}
          control={control}
          setValue={setValue}
          currency={currency}
          combinationPrice={
            filterPrices?.airlines?.combination ? filterPrices?.airlines?.combination : ''
          }
        />
        <AliancesFilter
          control={control}
          setValue={setValue}
          currency={currency}
          itineraries={data.itinerariesPrice}
        />
        <StopoverFilter
          control={control}
          setValue={setValue}
          stopover={stopovers}
          currency={currency}
          watch={watch}
        />
        <BookingSitesFilter
          control={control}
          setValue={setValue}
          bookingSites={bookingSites}
          currency={currency}
        />
      </aside>
      <AdBanner className="sticky top-24 my-2" dataAdSlot="6970489029" dataAdFormat="vertical" />
    </>
  );
};

export default FlightsFilter;
