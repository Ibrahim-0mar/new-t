'use client';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import style from './index.module.css';
import { cn } from '@/utils/helper/tailwind_cn';
import Checkbox from '@/components/common/base/CheckBox';
import { oneWorld, skyTeam, starAlliance, valueAlliance } from '@/services/data/flights/aliances';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import {  useTranslations } from 'next-intl';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
interface AliancesFilterProps {
  control: Control<FLightsFilterType, any>;
  setValue: UseFormSetValue<FLightsFilterType>;
  currency: string;
  itineraries: TransformedItineraryType[];
}

const AliancesFilter = ({ control, setValue, currency, itineraries }: AliancesFilterProps) => {
  const t=useTranslations();

  const cheapestOneWorldFlight = itineraries.find((itinerary) =>
    itinerary.legs.every((leg: TransformedLegType) =>
      leg.marketingCarriers.every((airline: string) => oneWorld.includes(airline)),
    ),
  );
  const cheapestSkyTeamFlight = itineraries.find((itinerary) =>
    itinerary.legs.every((leg: TransformedLegType) =>
      leg.marketingCarriers.every((airline: string) => skyTeam.includes(airline)),
    ),
  );
  const cheapestStarAllianceFlight = itineraries.find((itinerary) =>
    itinerary.legs.every((leg: TransformedLegType) =>
      leg.marketingCarriers.every((airline: string) => starAlliance.includes(airline)),
    ),
  );
  const cheapestValueAllianceFlight = itineraries.find((itinerary) =>
    itinerary.legs.every((leg: TransformedLegType) =>
      leg.marketingCarriers.every((airline: string) => valueAlliance.includes(airline)),
    ),
  );




  const aliances = [
    {
      label: "One world",
      id: 'oneWorld',
      price: typeof cheapestOneWorldFlight != 'undefined' ? cheapestOneWorldFlight?.minPrice : '',
    },
    {
      label: "Sky Team",
      id: 'skyTeam',
      price: typeof cheapestSkyTeamFlight != 'undefined' ? cheapestSkyTeamFlight?.minPrice : '',
    },
    {
      label:"Star Alliance",
      id: 'starAlliance',
      price:
        typeof cheapestStarAllianceFlight != 'undefined'
          ? cheapestStarAllianceFlight?.minPrice
          : '',
    },
    {
      label: "Value Alliance",
      id: 'valueAlliance',
      price:
        typeof cheapestValueAllianceFlight != 'undefined'
          ? cheapestValueAllianceFlight?.minPrice
          : '',
    },
  ];

  return (
    <FilterWrapper title={t('proI9phNtWdeS1Lsvwpqt')}>
      {aliances.map((alliance) =>
        alliance.price === '' ? null : (
          <Controller
            control={control}
            key={alliance.id}
            name="aliances"
            render={({ field }) => (
              <div className={cn('group', style.allianceLabel)}>
                <div>
                  <label htmlFor={alliance.id}>
                    <Checkbox
                      id={alliance.id}
                      checked={field.value?.includes(alliance.id)}
                      disabled={alliance.price === ''}
                      onChange={(e) => {
                        return e.target.checked
                          ? field.onChange([...field.value, alliance.id])
                          : field.onChange(field.value.filter((v: any) => v !== alliance.id));
                      }}
                    />
                    <p className="truncate">{alliance.label}</p>
                  </label>
                  {alliance.price != '' && (
                    <p
                      className="group-hover:inline-block"
                      onClick={() => setValue('aliances', [alliance.id])}
                    >
                      {t('cG-Vrany7RacX0sC_eHJH')}
                    </p>
                  )}
                </div>
                <p>
                  {alliance.price === ''
                    ? ''
                    :
                    <FormatPrice price={Number(alliance.price)} currency={currency} />
                }
                </p>
              </div>
            )}
          />
        ),
      )}
    </FilterWrapper>
  );
};

export default AliancesFilter;
