import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { sortAscending } from '@/utils/helper/numbers';
import { cn } from '@/utils/helper/tailwind_cn';
import { AirportTransfersFilterType } from '@/views/common/results/AirportTransfers/utils/filters';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import style from './index.module.css';

type vehicleMakes = {
  name: string;
  price: string;
};

interface BookingSitesProps {
  vehicleMakes: vehicleMakes[];
  control: Control<AirportTransfersFilterType, any>;
  setValue: UseFormSetValue<AirportTransfersFilterType>;
  currency: string;
}

const VehicleMakeFilter = ({ control, setValue, vehicleMakes, currency }: BookingSitesProps) => {
  const t = useTranslations();

  const [limit, setLimit] = useState(4);
  const handleChange = (e: any, field: any, name: string) => {
    if (e.target.checked) {
      //  select an airline
      if (!field.value?.includes(name)) {
        field.onChange([...field.value, name]);
      }
    } else {
      // unselect an airline
      if (field.value === 'all') {
        const updatedBookingSites = vehicleMakes.map((make) => {
          if (make.name != name) {
            return make.name;
          }
        });
        field.onChange(updatedBookingSites);
      } else {
        const updatedArr = field.value.filter((item: any) => item != name);
        field.onChange(updatedArr);
      }
    }
  };

  return (
    <FilterWrapper className="!py-0" title={t('dLb8deOJB110D6pS3qxc9')}>
      <div className={style.selectButtonsWrapper}>
        <Button
          aria-label={t('KGlvd46qHwAUB0HY5cWXg')}
          variant="default"
          onClick={() => setValue('vehicleMake', 'all')}
        >
          {t('KGlvd46qHwAUB0HY5cWXg')}
        </Button>
        <Button
          aria-label={t('h-cJEkVH0r_Y012wXb3pD')}
          variant="default"
          onClick={() => setValue('vehicleMake', [])}
        >
          {t('h-cJEkVH0r_Y012wXb3pD')}
        </Button>
      </div>
      <div className="space-y-2 pt-2">
        {vehicleMakes
          ?.sort((a: any, b: any) => sortAscending(a.name.toLowerCase(), b.name?.toLowerCase()))
          .slice(0, limit)
          .map((make) => (
            <Controller
              control={control}
              key={make.name}
              name="vehicleMake"
              render={({ field }) => (
                <div className={cn('group', style.bookingSiteLabel)}>
                  <div>
                    <label htmlFor={make.name}>
                      <Checkbox
                        name={make.name}
                        checked={field.value === 'all' || field.value?.includes(make.name)}
                        onChange={(e) => {
                          handleChange(e, field, make.name);
                        }}
                      />
                      <p className="truncate">
                        {make.name === '~' ? t('dWSEaPLNEJ7uJpY0MuQmk') : make.name}
                      </p>
                    </label>
                    <p
                      className="group-hover:inline-block"
                      onClick={() => setValue('vehicleMake', [make.name])}
                    >
                      {t('cG-Vrany7RacX0sC_eHJH')}
                    </p>
                  </div>
                  <p>
                    {make.price === '' ? (
                      ''
                    ) : (
                      <FormatPrice price={Number(make.price)} currency={currency} />
                    )}
                  </p>
                </div>
              )}
            />
          ))}
      </div>
      {limit < vehicleMakes.length ? (
        <Button
          variant="default"
          aria-label={t('K2CRbx0eOLGfeCqWH8K1I')}
          className={style.showMoreButton}
          onClick={() => setLimit(vehicleMakes.length)}
        >
          {t('K2CRbx0eOLGfeCqWH8K1I')}
        </Button>
      ) : (
        <Button
          variant="default"
          aria-label={t('xHbJNMMDHIcGxe4Ytga08')}
          className={style.showMoreButton}
          onClick={() => setLimit(4)}
        >
          {t('xHbJNMMDHIcGxe4Ytga08')}
        </Button>
      )}
    </FilterWrapper>
  );
};

export default VehicleMakeFilter;
