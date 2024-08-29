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

type vehicleTypes = {
  name: string;
  price: string;
};

interface BookingSitesProps {
  vehicleTypes: vehicleTypes[];
  control: Control<AirportTransfersFilterType, any>;
  setValue: UseFormSetValue<AirportTransfersFilterType>;
  currency: string;
}

const VehicleTypeFilter = ({ control, setValue, vehicleTypes, currency }: BookingSitesProps) => {
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
        const updatedBookingSites = vehicleTypes.map((type) => {
          if (type.name != name) {
            return type.name;
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
    <FilterWrapper title={t('lypyUaDplz7xErLwB-h3N')} className="!py-0">
      <div className={style.selectButtonsWrapper}>
        <Button
          aria-label={t('KGlvd46qHwAUB0HY5cWXg')}
          variant="default"
          onClick={() => setValue('vehicleType', 'all')}
        >
          {t('KGlvd46qHwAUB0HY5cWXg')}
        </Button>
        <Button
          aria-label={t('h-cJEkVH0r_Y012wXb3pD')}
          variant="default"
          onClick={() => setValue('vehicleType', [])}
        >
          {t('h-cJEkVH0r_Y012wXb3pD')}
        </Button>
      </div>
      <div className="space-y-2 pt-2">
        {vehicleTypes
          ?.sort((a: any, b: any) => sortAscending(a.name.toLowerCase(), b.name?.toLowerCase()))
          .slice(0, limit)
          .map((type) => (
            <Controller
              control={control}
              key={type.name}
              name="vehicleType"
              render={({ field }) => (
                <div className={cn('group', style.bookingSiteLabel)}>
                  <div>
                    <label htmlFor={type.name}>
                      <Checkbox
                        name={type.name}
                        checked={field.value === 'all' || field.value?.includes(type.name)}
                        onChange={(e) => {
                          handleChange(e, field, type.name);
                        }}
                      />
                      <p className="truncate">
                        {type.name === '~' ? t('RQrLA23xsW8KXSLu7H_R2') : type.name}
                      </p>
                    </label>
                    <p
                      className="group-hover:inline-block"
                      onClick={() => setValue('vehicleType', [type.name])}
                    >
                      {t('cG-Vrany7RacX0sC_eHJH')}
                    </p>
                  </div>
                  <p>
                    {type.price === '' ? (
                      ''
                    ) : (
                      <FormatPrice price={Number(type.price)} currency={currency} />
                    )}
                  </p>
                </div>
              )}
            />
          ))}
      </div>
      {limit < vehicleTypes.length ? (
        <Button
          variant="default"
          aria-label={t('K2CRbx0eOLGfeCqWH8K1I')}
          className={style.showMoreButton}
          onClick={() => setLimit(vehicleTypes.length)}
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

export default VehicleTypeFilter;
