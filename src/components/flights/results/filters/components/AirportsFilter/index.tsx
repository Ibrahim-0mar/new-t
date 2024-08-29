'use client';
import style from './index.module.css';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Checkbox from '@/components/common/base/CheckBox';
import { cn } from '@/utils/helper/tailwind_cn';
import FilterWrapper from '../FilterWrapper';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import {  useTranslations } from 'next-intl';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

interface AirportsFilterProps {
  filterAirports: any;
  control: Control<FLightsFilterType, any>;
  setValue: UseFormSetValue<FLightsFilterType>;
  currency: string;
  prices: any;
}

const AirportsFilter = ({
  filterAirports,
  control,
  setValue,
  currency,
  prices
}: AirportsFilterProps) => {
  const t=useTranslations()


  return (
    <FilterWrapper title={t('xgN06eBsRCEmN_wdiIGZD')}>
      <p className={style.heeader}>{t('i9JJxmJsF5r0Df1j2S5n-')}</p>
      {Object.keys(filterAirports.departure).map((cityCode) => {
        const city = filterAirports.departure[cityCode];
        return (
          <>
            <p className={style.cityName}>{city?.city?.name}</p>
            {Object.keys(city?.airports)?.map((airportCode: any) => {
              const airport = city?.airports[airportCode];
              const hasPrice = prices?.departure[airport.code];
              if (!airport.code.includes('test') || !airport?.name.includes('test')) {
                return (
                  <Controller
                    control={control}
                    key={airport.code}
                    name="airports.departure"
                    render={({ field }) => (
                      <div className={cn('group', style.airportLabel)}>
                        <div>
                          <label htmlFor={airport.code}>
                            <Checkbox
                              id={airport.code}
                              checked={field.value==="all" || field.value?.includes(airport.code)}
                              disabled={!hasPrice}
                              onChange={(e) => {
                                // The airports.status should be 'changed' if the user unselect some airports
                                setValue('airports.status', 'changed');
                                return e.target.checked
                                  ? field.onChange([...field.value, airport.code])
                                  : field.onChange(
                                      field.value.filter((v: any) => v !== airport.code),
                                    );
                              }}
                            />
                            <p className={cn('truncate', !hasPrice ? style.disabled : '')}>
                              {' '}
                              <strong>{airport.code}</strong>:{airport?.name}
                            </p>
                            {hasPrice && (
                              <p
                                className={cn('group-hover:inline-block', style.onlyText)}
                                
                                onClick={(e) => {
                                  e.preventDefault();
                                  setValue('airports.departure', [
                                    ...field.value.filter(
                                      (code: string) => !Object.keys(city?.airports).includes(code),
                                    ),
                                    airport.code,
                                  ]);
                                  setValue('airports.status', 'changed');
                                }}
                              >
                                {t('cG-Vrany7RacX0sC_eHJH')}
                              </p>
                            )}
                          </label>
                        </div>
                        <p>
                          {!hasPrice
                            ? ''
                            :
                            <FormatPrice price={prices?.departure[airport.code]} currency={currency} />
                            }
                        </p>
                      </div>
                    )}
                  />
                );
              }
            })}
          </>
        );
      })}
      <p className={style.heeader}>{t('zXN9vT_AwL66uAFq8RyGk')}</p>
      {Object.keys(filterAirports.arrival).map((cityCode) => {
        const city = filterAirports.arrival[cityCode];
        return (
          <>
            <p className={style.cityName}>{city?.city?.name}</p>
            {Object.keys(city?.airports)?.map((airportCode: any) => {
              const airport = city?.airports[airportCode];
              const hasPrice = prices?.arrival[airport.code];
              if (!airport.code.includes('test') || !airport?.name.includes('test')) {
                return (
                  <Controller
                    control={control}
                    key={airport.code}
                    name="airports.arrival"
                    render={({ field }) => (
                      <div className={cn('group', style.airportLabel)}>
                        <div>
                          <label htmlFor={airport.code}>
                            <Checkbox
                              id={airport.code}
                              checked={field.value==="all" || field.value?.includes(airport.code)}
                              disabled={!hasPrice}
                              onChange={(e) => {
                                // The airports.status should be 'changed' if the user unselect some airports
                                setValue('airports.status', 'changed');
                                return e.target.checked
                                  ? field.onChange([...field.value, airport.code])
                                  : field.onChange(
                                      field.value.filter((v: any) => v !== airport.code),
                                    );
                              }}
                            />
                            <p className={cn('truncate', !hasPrice ? style.disabled : '')}>
                              {' '}
                              <strong>{airport.code}</strong>:{airport?.name}
                            </p>
                            {hasPrice && (
                              <p
                                className={cn('group-hover:inline-block', style.onlyText)}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setValue('airports.arrival', [
                                    ...field.value.filter(
                                      (code: string) => !Object.keys(city?.airports).includes(code),
                                    ),
                                    airport.code,
                                  ]);
                                  setValue('airports.status', 'changed');
                                }}
                              >
                                {t('cG-Vrany7RacX0sC_eHJH')}
                              </p>
                            )}
                          </label>
                        </div>
                        <p>
                          {!hasPrice ? (
                            ''
                          ) : (
                            <FormatPrice
                              price={prices?.arrival[airport.code]}
                              currency={currency}
                            />
                          )}
                        </p>
                      </div>
                    )}
                  />
                );
              }
            })}
          </>
        );
      })}
    </FilterWrapper>
  );
};

export default AirportsFilter;
