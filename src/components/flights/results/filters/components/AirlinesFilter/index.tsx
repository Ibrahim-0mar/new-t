'use client';
import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { sortAscending } from '@/utils/helper/numbers';
import { cn } from '@/utils/helper/tailwind_cn';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import style from './index.module.css';

type Airline = {
  name: string;
  price: number;
  code: string;
};

interface AirlinesFilterProps {
  airlines: Airline[];
  control: Control<FLightsFilterType, any>;
  setValue: UseFormSetValue<FLightsFilterType>;
  currency: string;
  combinationPrice: string | number;
}

const AirlinesFilter = ({
  airlines,
  control,
  setValue,
  currency,
  combinationPrice,
}: AirlinesFilterProps) => {
  const t = useTranslations();
  const [limit, setLimit] = useState(4);

  const handleChange = (e: any, field: any, code: string) => {
    if (e.target.checked) {
      //  select an airline
      if (!field.value?.includes(code)) {
        field.onChange([...field.value, code]);
      }
    } else {
      // unselect an airline
      if (field.value === 'all') {
        const updatedAirlines = airlines.map((airline) => {
          if (airline?.code != code) {
            return airline?.code;
          }
        });
        field.onChange([...updatedAirlines, 'combination']);
      } else {
        const updatedArr = field.value.filter((item: any) => item != code);
        field.onChange(updatedArr);
      }
    }
  };

  return (
    <FilterWrapper title={t('vTkEAtBdQFsWG2nRXPhYM')}>
      <div className={style.selectButtonsWrapper}>
        <Button
          aria-label={t('KGlvd46qHwAUB0HY5cWXg')}
          variant="default"
          onClick={() => setValue('airlines', 'all')}
        >
          {t('KGlvd46qHwAUB0HY5cWXg')}
        </Button>
        <Button
          aria-label={t('h-cJEkVH0r_Y012wXb3pD')}
          variant="default"
          onClick={() => setValue('airlines', [])}
        >
          {t('h-cJEkVH0r_Y012wXb3pD')}
        </Button>
      </div>

      {airlines
        .sort((a: any, b: any) => sortAscending(a.name.toLowerCase(), b.name?.toLowerCase()))
        .slice(0, limit)
        .map((airline: any) => (
          <Controller
            control={control}
            key={airline?.code}
            name="airlines"
            render={({ field }) => (
              <div className={cn('group', style.airlineLabel)}>
                <div>
                  <label htmlFor={airline?.code}>
                    <Checkbox
                      id={airline?.code}
                      disabled={airline.price === ''}
                      checked={field.value === 'all' || field.value?.includes(airline?.code)}
                      onChange={(e) => {
                        handleChange(e, field, airline?.code);
                      }}
                    />
                    <p className="truncate">{airline.name}</p>
                  </label>
                  <p
                    className="group-hover:inline-block"
                    onClick={() => setValue('airlines', [airline?.code])}
                  >
                    {t('cG-Vrany7RacX0sC_eHJH')}
                  </p>
                </div>
                <p>
                  {airline.price === '' ? (
                    ''
                  ) : (
                    <FormatPrice price={airline.price} currency={currency} />
                  )}{' '}
                </p>
              </div>
            )}
          />
        ))}
      <Controller
        control={control}
        name="airlines"
        render={({ field }) => (
          <div className={cn('group', style.airlineLabel)}>
            <div>
              <label htmlFor={'combination'}>
                <Checkbox
                  id={'combination'}
                  checked={field.value === 'all' || field.value?.includes('combination')}
                  onChange={(e) => {
                    handleChange(e, field, 'combination');
                  }}
                />
                <p className="truncate">{t('nH7USW2XAbfWeBZ6Q_Dat')}</p>
              </label>
              <p
                className="group-hover:inline-block"
                onClick={() => setValue('airlines', ['combination'])}
              >
                {t('cG-Vrany7RacX0sC_eHJH')}
              </p>
            </div>
            <p>
              {combinationPrice === '' ? (
                ''
              ) : (
                <FormatPrice price={Number(combinationPrice)} currency={currency} />
              )}
            </p>
          </div>
        )}
      />
      {limit < airlines.length ? (
        <Button
          variant="default"
          aria-label={t('vI1A0-lOSJue1GN-zymuw')}
          className="mt-2 px-0 text-sm capitalize text-sixth duration-200 ease-in-out hover:opacity-80"
          onClick={() => setLimit(airlines.length)}
        >
          {t('vI1A0-lOSJue1GN-zymuw')}
        </Button>
      ) : (
        <Button
          variant="default"
          aria-label={t('Y26aIcSa2boFOTsNVshno')}
          className="mt-2 px-0 text-sm capitalize text-sixth duration-200 ease-in-out hover:opacity-80"
          onClick={() => setLimit(4)}
        >
          {t('Y26aIcSa2boFOTsNVshno')}
        </Button>
      )}
    </FilterWrapper>
  );
};

export default AirlinesFilter;
