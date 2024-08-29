import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { cn } from '@/utils/helper/tailwind_cn';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import { useTranslations } from 'next-intl';
import React, { useCallback, useMemo, useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import style from './index.module.css';

// Define the type for a booking site object
interface BookingSite {
  name: string;
  id: string;
  isAirline?: boolean;
  price: string;
}

// Define the props for the BookingSitesFilter component
interface BookingSitesProps {
  bookingSites: BookingSite[];
  control: Control<FLightsFilterType, any>;
  setValue: UseFormSetValue<FLightsFilterType>;
  currency: string;
}

const BookingSitesFilter = ({ control, setValue, bookingSites, currency }: BookingSitesProps) => {
  // Use translations for internationalization
  const t = useTranslations();

  // State to manage the number of items to display
  const [limit, setLimit] = useState(4);

  /**
   * Handles checkbox changes and updates the filter value accordingly.
   * @param e - The change event from the checkbox input
   * @param field - The field object from react-hook-form
   * @param id - The ID of the booking site being toggled
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any, id: string) => {
      const checked = e.target.checked;
      if (checked) {
        if (!field.value.includes(id)) {
          field.onChange([...field.value, id]);
        }
      } else {
        if (field.value === 'all') {
          const updatedBookingSites = bookingSites
            .filter((site) => site.id !== id)
            .map((site) => site.id);
          field.onChange(updatedBookingSites);
        } else {
          const updatedArr = field.value.filter((item: string) => item !== id);
          field.onChange(updatedArr);
        }
      }
    },
    [bookingSites],
  );

  /**
   * Merges duplicate booking sites and sorts them by price.
   * @returns An array of merged booking sites
   */
  const mergedBookingSites = useMemo(() => {
    const map = new Map<string, BookingSite>();

    bookingSites.forEach((item) => {
      if (map.has(item.id)) {
        const existingItem = map.get(item.id)!;
        map.set(item.id, {
          ...existingItem,
          ...item,
          price: String(Math.min(Number(existingItem.price), Number(item.price))), // Merge logic for price
        });
      } else {
        map.set(item.id, item);
      }
    });

    return Array.from(map.values()).sort((a, b) => Number(a.price) - Number(b.price)); // Sort by price
  }, [bookingSites]);

  // Slice the sorted list based on the limit
  const displayedBookingSites = useMemo(() => {
    return mergedBookingSites.slice(0, limit);
  }, [mergedBookingSites, limit]);

  return (
    <FilterWrapper title={t('haCPUmaGSm3CGs50V6DGq')}>
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
      {displayedBookingSites?.map((site) => (
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
                    checked={field.value === 'all' || field.value.includes(site.id)}
                    onChange={(e) => handleChange(e, field, site.id)}
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
                {site.price ? <FormatPrice price={Number(site.price)} currency={currency} /> : ''}
              </p>
            </div>
          )}
        />
      ))}
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
