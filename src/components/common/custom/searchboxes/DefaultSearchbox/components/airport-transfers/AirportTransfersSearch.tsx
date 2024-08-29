'use client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.css';

import Button from '@/components/common/base/Button';
import { locale } from '@/navigation';
import PassengersInput from '@/sections/airport-transfers/searchBox/PassengerInput';
import DatesInput from '@/sections/airport-transfers/searchBox/TransfersdateInput';
import TransfersComboBox from '@/sections/airport-transfers/searchBox/transfersLoctionInput';
import {
  fetchPlaceCoordinates,
  fetchTransfersPlacesRequest,
} from '@/services/apis/airport-transfers/places';
import { getNearbyAirport } from '@/services/apis/common/airports';
import { cn } from '@/utils/helper/tailwind_cn';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { airportTransfersSearchboxSchema } from '@/utils/schemas/airport-transfers';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

const AirportTransfersSearch = () => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin') as string;
  const arrivalDate = searchParams.get('arrival-date') as string;

  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const defaultValues = {
    passengers: [1, 0, 0],
    tripType: 'one-way',
    pickup: [],
    dropoff: [],
    pickupDate: dayjs().add(7, 'days').toDate(),
    returnDate: dayjs().add(8, 'days').toDate(),
  };
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues,
    resolver: yupResolver(airportTransfersSearchboxSchema),
    mode: 'onChange',
  });
  const pickup = watch('pickup')[0]?.place_id || '';
  const dropoff = watch('dropoff')[0]?.place_id || '';

  console.log({
    pickup,
    dropoff,
  });

  const tripTypes = {
    'one-way': {
      name: t('cd_4pzYkVbyTku6JYAIqT'),
      value: 'one-way',
    },
    'round-trip': {
      name: t('qCJNwX_A29mSPMKA1wELp'),
      value: 'round-trip',
    },
  };

  useEffect(() => {
    getNearbyAirport(locale).then((airports) => {
      if (airports) {
        fetchTransfersPlacesRequest(airports?.city?.name || airports.name, locale).then(
          (airports) => setNearbyPlaces(airports),
        );
      }
    });
  }, [locale]);

  const handleSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pickups = watch('pickup');
    const dropoffs = watch('dropoff');
    setValue('pickup', dropoffs);
    setValue('dropoff', pickups);
  };

  const activeType = watch('tripType') || 'one-way';

  const getPlaceCoordinte = async (placeId: string, field: 'pickup' | 'dropoff') => {
    const coordinates = await fetchPlaceCoordinates(placeId);
    setValue(field, [
      {
        ...watch(field)[0],
        lat: coordinates?.lat,
        long: coordinates.lng,
      },
    ]);
  };
  useEffect(() => {
    if (watch('pickupDate') && watch('returnDate')) {
      if (dayjs(watch('pickupDate')).isAfter(dayjs(watch('returnDate')))) {
        setValue('returnDate', dayjs(watch('pickupDate')).add(1, 'hour').toDate());
      }
    }
  }, [watch('pickupDate'), watch('returnDate')]);
  useEffect(() => {
    if (watch('pickup') && watch('pickup').length > 0) {
      if (!watch('pickup')[0]?.lat || !watch('pickup')[0]?.long) {
        getPlaceCoordinte(watch('pickup')[0].place_id, 'pickup');
      }
    }
  }, [watch('pickup')]);
  useEffect(() => {
    if (watch('dropoff') && watch('dropoff').length > 0) {
      if (!watch('dropoff')[0]?.lat || !watch('dropoff')[0]?.long) {
        getPlaceCoordinte(watch('dropoff')[0].place_id, 'dropoff');
      }
    }
  }, [watch('dropoff')]);

  useEffect(() => {
    if (!origin || !arrivalDate) return;

    const fetchData = async () => {
      try {
        const places = await fetchTransfersPlacesRequest(origin, locale);
        if (places.length > 0) {
          setValue('pickup', [places[0]]);
          setValue('pickupDate', dayjs(arrivalDate).toDate());
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    };

    fetchData();
  }, [origin, arrivalDate, locale]);

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { pickup, dropoff, passengers, pickupDate, returnDate, tripType } = data;
    const [adults, children, infants] = passengers;
    let query = `${dayjs(pickupDate).format('YYYY-MM-DD_HH:mm')}`;
    

    if (tripType === 'round-trip' && returnDate) {
      query += `/${dayjs(returnDate).format('YYYY-MM-DD_HH:mm')}`;
    }
    query += `?pickup=${pickup[0].place_id}&dropoff=${dropoff[0].place_id}&end_lat=${dropoff[0]?.lat}&end_long=${dropoff[0]?.long}&start_lat=${pickup[0]?.lat}&start_long=${pickup[0]?.long}&origin_name=${pickup[0].terms[0].value}&destination_name=${dropoff[0].terms[0].value}&from_type=${pickup[0].types[0]}&to_type=${dropoff[0].types[0]}&des_from=${pickup[0].terms[0].value}&des_to=${dropoff[0].terms[0].value}`;

    if (infants > 0) {
      query += query.includes('?') ? `&infants=${infants}` : `?infants=${infants}`;
    }
    if (children > 0) {
      query += query.includes('?') ? `&children=${children}` : `?children=${children}`;
    }
    if (adults > 1) {
      query += query.includes('?') ? `&adults=${adults}` : `?adults=${adults}`;
    }

    window.open(`/${locale}/airport-transfers/search/` + query, '_blank');
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.topSectionContainer}>
        <div className={styles.tabsContainer}>
          {Object.keys(tripTypes).map((t) => {
            const type = tripTypes[t as keyof typeof tripTypes];
            return (
              <Button
                className={cn(styles.tab, activeType === type.value ? styles.active : '')}
                variant="default"
                key={type.name}
                type="button"
                onClick={() => setValue('tripType', type.value)}
              >
                {tripTypes[type.value as keyof typeof tripTypes].name}
              </Button>
            );
          })}
        </div>

        <div className={styles.cabinTravellersSection}>
          <Controller
            name="passengers"
            control={control}
            render={({ field }) => <PassengersInput {...field} />}
          />
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.locations}>
          <div className={styles.locationContainer}>
            <Controller
              name="pickup"
              control={control}
              rules={{ required: t('dyKL0UAT1R1U9pB0YrUHc') }}
              render={({ field }) => (
                <div className={styles.locationInput}>
                  {' '}
                  <TransfersComboBox
                    field={field}
                    listData={nearbyPlaces}
                    listHeader={t('nI--L5MUmTV3hLBLjcdfr')}
                  />
                </div>
              )}
            />
            {errors && errors.pickup && (
              <p className={styles.error}>
                <ValidationFeedback messageSlug={errors?.pickup?.message as string} />
              </p>
            )}
            {errors.conflict && !errors.pickup && !errors.dropoff && pickup === dropoff && (
              <p className={styles.error}>
                <ValidationFeedback messageSlug={errors.conflict.message as string} />
              </p>
            )}
          </div>
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
          <div className={styles.locationContainer}>
            <Controller
              name="dropoff"
              control={control}
              render={({ field }) => (
                <div className={styles.locationInput}>
                  {' '}
                  <TransfersComboBox
                    field={field}
                    listData={nearbyPlaces}
                    listHeader={t('nI--L5MUmTV3hLBLjcdfr')}
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
        {watch('tripType') === 'round-trip' ? (
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
        ) : (
          <Button
            variant="default"
            className={styles.addDateContainer}
            onClick={() => setValue('tripType', 'round-trip')}
          >
            <Plus size={14} />
            {t('tuYsqZXxQwckGBFo81Y8p')}
          </Button>
        )}

        <Button variant="default" className={styles.searchButton} type="submit">
          {t('TU9YShZXxLKwg34VDopqU')}
        </Button>
      </div>
    </form>
  );
};

export default AirportTransfersSearch;
