'use client';
import React, { useEffect } from 'react';
import styles from './index.module.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatesInput from '@/sections/airport-transfers/searchBox/TransfersdateInput';
import Button from '@/components/common/base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/utils/helper/tailwind_cn';
import FlightLocationInput from '@/components/flights/searchbox/inputs/FlightLocationInput';
import { carRentalSearchboxSchema } from '@/utils/schemas/car-rental';
import DropOffSelect from './components/DropOffSelect';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { KayakDomains } from '@/services/data/car-rental/kayakDomains';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { eventsOnClickCarRentalSearch } from '@/utils/events/carRental';

const CarRentalSearch = () => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const country = globalDataGetter('client', 'country')?.code || 'US';

  const defaultValues = {
    pickup: [],
    dropoff: [],
    pickupDate: dayjs().add(7, 'days').toDate(),
    returnDate: dayjs().add(8, 'days').toDate(),
    dropoffType: { id: 'same', title: t('TFVLfTb-QPDwLVyyakcGa') },
  };
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues,
    resolver: yupResolver(carRentalSearchboxSchema),
  });

  const handleSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pickups = watch('pickup');
    const dropoffs = watch('dropoff');
    setValue('pickup', dropoffs);
    setValue('dropoff', pickups);
  };



  useEffect(() => {
    if (watch('pickupDate') && watch('returnDate')) {
      if (dayjs(watch('pickupDate')).isAfter(dayjs(watch('returnDate')))) {
        setValue('returnDate', dayjs(watch('pickupDate')).add(1, 'hour').toDate());
      }
    }
  }, [watch('pickupDate'), watch('returnDate'), locale]);



  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { pickup, dropoff, dropoffType, pickupDate, returnDate } = data;
    const domain = Object(KayakDomains).hasOwnProperty(country)
      ? KayakDomains[country].fullDomainName
      : 'https://www.kayak.com';
    if (dropoffType.id === 'same') {
      window.open(
        `${domain}/in?a=kan_220420&url=/cars/${pickup[0].code}/${dayjs(pickupDate).format('YYYY-MM-DD-HH')}h/${dayjs(returnDate).format('YYYY-MM-DD-HH')}h?enc_lid=searchbox`,
        '_blank',
      );
    } else {
      window.open(
        `${domain}/in?a=kan_220420&url=/cars/${pickup[0].code}/${dropoff[0].code}/${dayjs(pickupDate).format('YYYY-MM-DD-HH')}h/${dayjs(returnDate).format('YYYY-MM-DD-HH')}h?enc_lid=searchbox`,
        '_blank',
      );
    }
    eventsOnClickCarRentalSearch(data);
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.topSectionContainer}>
        <Controller
          name="dropoffType"
          control={control}
          render={({ field }) => <DropOffSelect {...field} />}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.locations}>
          <div
            className={cn(styles.locationContainer, watch('dropoffType').id === 'same' && 'w-[80%]')}
          >
            <Controller
              name="pickup"
              control={control}
              rules={{ required: 'this is required' }}
              render={({ field }) => (
                <div className={styles.locationInput}>
                  {' '}
                  <FlightLocationInput
                    field={field}
                    basedOn={null}
                    variant="CarRental"
                  />
                </div>
              )}
            />
            {errors && errors.pickup && (
              <p className={styles.error}>
                <ValidationFeedback messageSlug={errors?.pickup?.message as string} />
              </p>
            )}
            {errors.conflict && !errors.pickup && !errors.dropoff && (
              <p className={styles.error}>
                <ValidationFeedback messageSlug={errors.conflict.message as string} />
              </p>
            )}
          </div>
          {watch('dropoffType').id === 'different' && (
            <Button
              className={styles.swapLocationsBtn}
              variant="default"
              type="button"
              onClick={handleSwap}
            >
              <Icon
                icon="octicon:arrow-switch-16"
                width="26"
                height="26"
                style={{ color: '#2ba6de' }}
              />
            </Button>
          )}
          {watch('dropoffType').id === 'same' ? null : (
            <div className={styles.locationContainer}>
              <Controller
                name="dropoff"
                control={control}
                render={({ field }) => (
                  <div className={styles.locationInput}>
                    {' '}
                    <FlightLocationInput
                      field={field}
                      basedOn={watch("pickup").length >0 ? watch("pickup")[0]:null}
                      variant="CarRental"
                    />
                  </div>
                )}
              />
              {errors && errors.dropoff && (
                <p className={styles.error}>
                  <ValidationFeedback messageSlug={errors?.dropoff?.message as string} />
                </p>
              )}
            </div>
          )}
        </div>

        <Controller
          name="pickupDate"
          control={control}
          render={({ field }) => (
            <div className={styles.datesContainer}>
              {' '}
              <DatesInput field={field} />
            </div>
          )}
        />

        <Controller
          name="returnDate"
          control={control}
          render={({ field }) => (
            <div className={styles.datesContainer}>
              {' '}
              <DatesInput field={field} />
            </div>
          )}
        />

        <Button variant="default" className={styles.searchButton} type="submit">
          {t('TU9YShZXxLKwg34VDopqU')}
        </Button>
      </div>
    </form>
  );
};

export default CarRentalSearch;
