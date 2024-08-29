'use client';
import style from './index.module.css';
import Checkbox from '@/components/common/base/CheckBox';
import FilterWrapper from '../FilterWrapper';
import { cn } from '@/utils/helper/tailwind_cn';
import { Control, Controller } from 'react-hook-form';
import Button from '@/components/common/base/Button';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import { useTranslations } from 'next-intl';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

interface StopsFilterProps {
  control: Control<FLightsFilterType, any>;
  currency: string;
  itineraries: any[];
}

const StopsFilter = ({ control, currency, itineraries }: StopsFilterProps) => {
  const t=useTranslations()

  // dynamic checkbox incase of adding more stops

  const cheapestDirectFlight = itineraries.find((itinerary: any) =>
    itinerary.legs.every((leg: any) => leg.segments.length === 1),
  );
  const cheapestOneStopFlight = itineraries.find((itinerary: any) =>
    itinerary.legs.some((leg: any) => leg.segments.length === 2),
  );
  const CheapestTwoPlusStopsFlights = itineraries.find((itinerary: any) =>
    itinerary.legs.some((leg: any) => leg.segments.length > 2),
  );


  const stops = [
    {
      id: 0,
      label: t('ySrcfg2EMpLJka7Mn4xx7'),
      price: typeof cheapestDirectFlight != 'undefined' ? cheapestDirectFlight?.minPrice : '',
    },
    {
      id: 1,
      label: t('GHvljxMkpmsdB67iNlRaX'),
      price: typeof cheapestOneStopFlight != 'undefined' ? cheapestOneStopFlight?.minPrice : '',
    },
    {
      id: 2,
      label: t('GosX-aM5zy-lbRlKJwW1a'),
      price:
        typeof CheapestTwoPlusStopsFlights != 'undefined'
          ? CheapestTwoPlusStopsFlights?.minPrice
          : '',
    },
  ];

  return (
    <FilterWrapper title={t('OwWn_9v8VcZDBMmnzAtJt')}>
      {stops.map((stop) => (
        <Controller
          control={control}
          key={stop.id}
          name="stops"
          render={({ field }) => {
            return (
              <label key={stop.id} htmlFor={stop.label} className={cn('group', style.directLabel)}>
                <div>
                  <Checkbox
                    id={stop.label}
                    checked={field.value?.includes(stop.id)}
                    disabled={stop.price === ''}
                    onChange={(e) => {
                      return e.target.checked
                        ? field.onChange([...field.value, stop.id])
                        : field.onChange(field.value.filter((v: any) => v !== stop.id));
                    }}
                  />
                  <p>{stop.label}</p>
                  {stop.price != '' && (
                    <Button
                      variant="default"
                      className={cn('group-hover:inline-block', style.onlyButton)}
                      onClick={() => field.onChange([stop.id])}
                    >
                      <p>{t('cG-Vrany7RacX0sC_eHJH')}</p>
                    </Button>
                  )}
                </div>
                <p>{stop.price === '' ? '' : 
                <FormatPrice price={Number(stop.price)} currency={currency} />}</p>
              </label>
            );
          }}
        />
      ))}
    </FilterWrapper>
  );
};

export default StopsFilter;
