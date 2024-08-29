'use client';
import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import ShowHideButton from '@/components/common/custom/ShowHideButton';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { cn } from '@/utils/helper/tailwind_cn';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import useStopoverFilter from './hooks/useStopoverFilter';
import style from './index.module.css';

//Interface for the Stopover object.
interface Stopover {
  country: string;
  airport: string;
  code: string;
  price: string;
}

// Props for the StopoverFilter component.
interface StopoverProps {
  stopover: Stopover[];
  control: Control<FLightsFilterType, any>;
  setValue: UseFormSetValue<FLightsFilterType>;
  currency: string;
  watch: UseFormWatch<FLightsFilterType>;
}

/**
 * StopoverFilter component allows users to filter flight options based on stopover airports.
 *
 * @param {StopoverProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered StopoverFilter component or null if there's only one stop with direct flights.
 */
const StopoverFilter = ({ control, setValue, stopover, currency, watch }: StopoverProps) => {
  const t = useTranslations();

  // Custom hook to handle logic related to stopover filtering
  const { isShowAll, setShowAll, countriesWithAirports, handleChange, stops } = useStopoverFilter(
    stopover,
    watch,
  );

  // If there's only one stop and it's direct (0 stops), don't render the filter
  if (stops.length === 1 && stops[0] === 0) {
    return null;
  }

  // Constants for controlling the number of countries and airports displayed by default
  const MAX_COUNTRIES_DISPLAY = 4;
  const MAX_AIRPORTS_DISPLAY = 5;

  return (
    <FilterWrapper title={t('W7Ncih92ltPsNBJoJDbes')}>
      <div className={style.selectButtonsWrapper}>
        {/* Button to select all stopovers */}
        <Button
          aria-label={t('KGlvd46qHwAUB0HY5cWXg')}
          variant="default"
          onClick={() => setValue('stopover', 'all')}
        >
          {t('KGlvd46qHwAUB0HY5cWXg')}
        </Button>
        {/* Button to clear all selected stopovers */}
        <Button
          aria-label={t('h-cJEkVH0r_Y012wXb3pD')}
          variant="default"
          onClick={() => setValue('stopover', [])}
        >
          {t('h-cJEkVH0r_Y012wXb3pD')}
        </Button>
      </div>
      {Object.keys(countriesWithAirports)
        .slice(0, isShowAll ? undefined : MAX_COUNTRIES_DISPLAY)
        .map((country) => (
          <Fragment key={country}>
            <p className={style.countryName}>{country}</p>
            {countriesWithAirports[country]
              .slice(0, isShowAll ? undefined : MAX_AIRPORTS_DISPLAY)
              .map((airport: any) => (
                <Controller
                  control={control}
                  key={airport.code}
                  name="stopover"
                  render={({ field }) => (
                    <div className={cn('group', style.stopoverLabel)}>
                      <div>
                        <label htmlFor={airport.code}>
                          {/* Checkbox for selecting a stopover */}
                          <Checkbox
                            id={airport.code}
                            checked={field.value === 'all' || field.value?.includes(airport.code)}
                            onChange={(e) => handleChange(e, field, airport.code)}
                          />
                          <p className="truncate">
                            <strong>{airport.code}</strong>: {airport.name}
                          </p>
                          {/* Text for setting a stopover as the only one */}
                          <p
                            className={cn('group-hover:inline-block', style.onlyText)}
                            onClick={(e) => {
                              e.preventDefault();
                              setValue('stopover', [airport.code]);
                            }}
                          >
                            {t('cG-Vrany7RacX0sC_eHJH')}
                          </p>
                        </label>
                      </div>
                      {/* Display the price if available */}
                      {airport.price && (
                        <p>
                          <FormatPrice price={airport.price} currency={currency} />
                        </p>
                      )}
                    </div>
                  )}
                />
              ))}
          </Fragment>
        ))}
      {/* Button to toggle the display of all stopovers */}
      <ShowHideButton show={isShowAll} setShow={setShowAll} />
    </FilterWrapper>
  );
};

export default StopoverFilter;
