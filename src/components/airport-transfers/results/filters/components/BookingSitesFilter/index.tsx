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

type bookingSites = {
  name: string;
  id: string;
  isAirline?: boolean;
  price: string;
};

interface BookingSitesProps {
  bookingSites: bookingSites[];
  control: Control<AirportTransfersFilterType, any>;
  setValue: UseFormSetValue<AirportTransfersFilterType>;
  currency: string;
}

const BookingSitesFilter = ({ control, setValue, bookingSites, currency }: BookingSitesProps) => {
  const t = useTranslations();

  const [limit, setLimit] = useState(4);
  const handleChange = (e: any, field: any, id: string) => {
    if (e.target.checked) {
      //  select an airline
      if (!field.value?.includes(id)) {
        field.onChange([...field.value, id]);
      }
    } else {
      // unselect an airline
      if (field.value === 'all') {
        const updatedBookingSites = bookingSites.map((site) => {
          if (site.id != id) {
            return site.id;
          }
        });
        field.onChange(updatedBookingSites);
      } else {
        const updatedArr = field.value.filter((item: any) => item != id);
        field.onChange(updatedArr);
      }
    }
  };

  return (
    <FilterWrapper title={t('Mxs9GrVeePxH6ntSOpiR3')} className="!py-0">
      <div className={style.selectButtonsWrapper}>
        <Button
          aria-label={t('KGlvd46qHwAUB0HY5cWXg')}
          variant="default"
          onClick={() => setValue('bookingSites', 'all')}
        >
          {t('KGlvd46qHwAUB0HY5cWXg')}
        </Button>
        <Button
          aria-label={t('h-cJEkVH0r_Y012wXb3pD')}
          variant="default"
          onClick={() => setValue('bookingSites', [])}
        >
          {t('h-cJEkVH0r_Y012wXb3pD')}
        </Button>
      </div>
      <div className="space-y-2 pt-2">
        {bookingSites
          ?.sort((a: any, b: any) => sortAscending(a.name.toLowerCase(), b.name?.toLowerCase()))
          .slice(0, limit)
          .map((site) => (
            <Controller
              control={control}
              key={site.id}
              name="bookingSites"
              render={({ field }) => (
                <div className={cn('group', style.bookingSiteLabel)}>
                  <div>
                    <label htmlFor={site.id}>
                      <Checkbox
                        id={site.id}
                        checked={field.value === 'all' || field.value?.includes(site.id)}
                        onChange={(e) => {
                          handleChange(e, field, site.id);
                        }}
                      />
                      <p className="truncate">{site.name}</p>
                    </label>
                    <p
                      className="group-hover:inline-block"
                      onClick={() => setValue('bookingSites', [site.id])}
                    >
                      {t('cG-Vrany7RacX0sC_eHJH')}
                    </p>
                  </div>
                  <p>
                    {site.price === '' ? (
                      ''
                    ) : (
                      <FormatPrice price={Number(site.price)} currency={currency} />
                    )}
                  </p>
                </div>
              )}
            />
          ))}
      </div>
      {bookingSites.length > 4 && (
        <>
          {limit < bookingSites.length ? (
            <Button
              variant="default"
              aria-label={t('vI1A0-lOSJue1GN-zymuw')}
              className={style.showMoreButton}
              onClick={() => setLimit(bookingSites.length)}
            >
              {t('vI1A0-lOSJue1GN-zymuw')}
            </Button>
          ) : (
            <Button
              variant="default"
              aria-label={t('Y26aIcSa2boFOTsNVshno')}
              className={style.showMoreButton}
              onClick={() => setLimit(4)}
            >
              {t('Y26aIcSa2boFOTsNVshno')}
            </Button>
          )}
        </>
      )}
    </FilterWrapper>
  );
};

export default BookingSitesFilter;
