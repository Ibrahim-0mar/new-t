'use client';
import Button from '@/components/common/base/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import AirportTransfersDateSelectorMobile from './components/CarRentalDateSelectorMobile';
import AirportTransfersTimeSelectorMobile from './components/CarRentalTimeSelectorMobile';
import styles from './index.module.css';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import MobileLocationInput from './components/MobileLocationInput';
import DropOffTypeMobile from './components/DropOffTypeMobile';
import { fetchNearbyAirports } from '@/services/apis/common/airports';
import { placeType } from '@/utils/types/flights';
import { carRentalSearchboxSchema } from '@/utils/schemas/car-rental';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

export type OpenedMenuTypes =
  | ''
  | 'cabin'
  | 'trip-type'
  | 'passengers'
  | 'pickup'
  | 'dropoff'
  | 'pickupDate'
  | 'returnDate'
  | 'pickupTime';

let defaultValues = {
  pickup: [],
  dropoff: [],
  pickupDate: dayjs().add(7, 'days').toDate(),
  returnDate: dayjs().add(8, 'days').toDate(),
  dropoffType: { id: 'same', title: 'Same drop off' },
};

const CarRentalMobileSearchbox = () => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  defaultValues = {
    ...defaultValues,
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
  const [nearbyAirports, setNearbyAirports] = useState<placeType[]>([]);

  const [openedMenu, setOpenedMenu] = useState<any>('');

  const handleSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pickups = watch('pickup');
    const dropoffs = watch('dropoff');
    setValue('pickup', dropoffs);
    setValue('dropoff', pickups);
  };

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { pickup, dropoff, dropoffType, pickupDate, returnDate } = data;
    if (dropoffType.id === 'same') {
      window.open(
        `https://www.kayak.com/in?a=kan_220420&url=/cars/${pickup[0].code}/${dayjs(pickupDate).format('YYYY-MM-DD-HH')}h/${dayjs(returnDate).format('YYYY-MM-DD-HH')}h?enc_lid=searchbox`,
        '_blank',
      );
    } else {
      window.open(
        `https://www.kayak.com/in?a=kan_220420&url=/cars/${pickup[0].code}/${dropoff[0].code}/${dayjs(pickupDate).format('YYYY-MM-DD-HH')}h/${dayjs(returnDate).format('YYYY-MM-DD-HH')}h?enc_lid=searchbox`,
        '_blank',
      );
    }
  };
  const getNearbyAirports = async () => {
    const response = await fetchNearbyAirports(locale);
    setNearbyAirports(response);
  };
  useEffect(() => {
    getNearbyAirports();
  }, []);

  useEffect(() => {
    if (watch('pickupDate') && watch('returnDate')) {
      if (dayjs(watch('pickupDate')).isAfter(dayjs(watch('returnDate')))) {
        setValue('returnDate', dayjs(watch('pickupDate')).add(1, 'hour').toDate());
      }
    }
  }, [watch('pickupDate'), watch('returnDate')]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="mobile form" className={styles.mobileSearchBoxForm}>
      <div className={styles.selectionMobileView}>
        <Controller
          name="dropoffType"
          control={control}
          render={({ field }) => (
            <DropOffTypeMobile
              field={field}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
            />
          )}
        />
      </div>

      <Controller
        name={`pickup`}
        control={control}
        rules={{ required: 'this is required' }}
        render={({ field }) => (
          <div className={styles.locationInput}>
            <MobileLocationInput
              field={field}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
              listData={nearbyAirports}
              listHeader={t('o32z4vxSxBaiBpJyM7FgK')}
              type="pickup"
            />
            {watch('dropoffType').id != 'same' && (
              <Button
                className={styles.swapLocationsBtn}
                variant="default"
                type="button"
                onClick={handleSwap}
              >
                <Icon
                  icon="octicon:arrow-switch-16"
                  width="23"
                  height="23"
                  style={{ color: '#0a425c' }}
                />
              </Button>
            )}
          </div>
        )}
      />
      {errors && errors.pickup && (
        <p className={styles.error}>
          <ValidationFeedback messageSlug={errors?.pickup?.message as string} />
        </p>
      )}
      {watch('dropoffType').id != 'same' && (
        <>
          <Controller
            name={`dropoff`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className={styles.locationInput}>
                <MobileLocationInput
                  field={field}
                  openedMenu={openedMenu}
                  setOpenedMenu={setOpenedMenu}
                  listData={nearbyAirports}
                  listHeader={t('o32z4vxSxBaiBpJyM7FgK')}
                  type="dropoff"
                />
              </div>
            )}
          />
          {errors && errors.dropoff && (
            <p className={styles.error}>
              <ValidationFeedback messageSlug={errors?.dropoff?.message as string} />
            </p>
          )}
        </>
      )}
      <Controller
        name={`pickupDate`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <AirportTransfersDateSelectorMobile
              menu="pickupDate"
              field={field}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
              minDate={dayjs().add(1, 'minutes').toDate()}
            />
          );
        }}
      />
      <Controller
        name={`pickupDate`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return <AirportTransfersTimeSelectorMobile field={field} />;
        }}
      />

      <Controller
        name={`returnDate`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <AirportTransfersDateSelectorMobile
              menu='returnDate'
              field={field}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
              minDate={dayjs(watch('pickupDate')).toDate()}
            />
          );
        }}
      />
      <Controller
        name={`returnDate`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return <AirportTransfersTimeSelectorMobile field={field} />;
        }}
      />

      <Button variant="default" className={styles.searchButton} type="submit">
        {t('TU9YShZXxLKwg34VDopqU')}
      </Button>
    </form>
  );
};

export default CarRentalMobileSearchbox;
