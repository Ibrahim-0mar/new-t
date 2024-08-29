'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatesInput from '@/sections/airport-transfers/searchBox/TransfersdateInput';
import TransfersComboBox from '@/sections/airport-transfers/searchBox/transfersLoctionInput';
import Button from '@/components/common/base/Button';
import PassengersInput from '@/sections/airport-transfers/searchBox/PassengerInput';
import { Plus } from 'lucide-react';
import {
  fetchPlaceCoordinates,
  fetchTransfersPlacesRequest,
} from '@/services/apis/airport-transfers/places';
import { yupResolver } from '@hookform/resolvers/yup';
import { airportTransfersSearchboxSchema } from '@/utils/schemas/airport-transfers';
import TripTypeSelect from '../components/TripTypeSelect';
import { useParams, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { getNearbyAirport } from '@/services/apis/common/airports';

const AirportTransfersResultsSearch = () => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const params = useParams();
  const adults = Number(searchParams.get('adults')) || 1;
  const children = Number(searchParams.get('children')) || 0;
  const infants = Number(searchParams.get('infants')) || 0;

  const defaultValues = {
    passengers: [adults, children, infants],
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
  });

  const handleSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pickups = watch('pickup');
    const dropoffs = watch('dropoff');
    setValue('pickup', dropoffs);
    setValue('dropoff', pickups);
  };

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
    getNearbyAirport(locale).then((airports) => {
      if (airports) {
        fetchTransfersPlacesRequest(airports?.city?.name || airports.name, locale).then(
          (airports) => setNearbyPlaces(airports),
        );
      }
    });
  }, [locale]);

  const getDataFromUrl = async () => {
    const legs = params.legs;
    const pickup = (
      await fetchTransfersPlacesRequest(searchParams.get('origin_name') || '', locale)
    )[0];
    const droppoff = (
      await fetchTransfersPlacesRequest(searchParams.get('destination_name') || '', locale)
    )[0];
    const pickupDate = dayjs(
      params.legs[0].split('_')[0] + ' ' + params.legs[0].split('_')[1].replace('%3A', ':'),
    ).toDate();
    setValue('pickup', [pickup]);
    setValue('dropoff', [droppoff]);
    setValue('pickupDate', pickupDate);

    if (legs.length === 2) {
      setValue('tripType', 'round-trip');
      const returnData = dayjs(
        params.legs[1].split('_')[0] + ' ' + params.legs[1].split('_')[1].replace('%3A', ':'),
      ).toDate();

      setValue('returnDate', returnData);
    } else {
      setValue('tripType', 'one-way');
    }
  };
  useEffect(() => {
    getDataFromUrl();
  }, []);

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
    window.open(`/${locale}/airport-transfers/search/` + query, '_self');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contentContainer}>
        <div className={styles.tripTypeContainer}>
          <Controller
            name="tripType"
            control={control}
            render={({ field }) => <TripTypeSelect field={field} />}
          />
        </div>
        <div className={styles.locationContainer}>
          <Controller
            name="pickup"
            control={control}
            rules={{ required: t('xck9Gn2ceetmS3MF9VXn-') }}
            render={({ field }) => (
              <div className={styles.locationInput}>
                {' '}
                <TransfersComboBox
                  field={field}
                  listData={nearbyPlaces}
                  listHeader={t('nI--L5MUmTV3hLBLjcdfr')}
                />
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
              </div>
            )}
          />
          {errors && errors.pickup && (
            <p className={styles.error}>
              <ValidationFeedback messageSlug={errors?.pickup?.message as string} />
            </p>
          )}
        </div>
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
            <Plus size={18} />
            {t('tuYsqZXxQwckGBFo81Y8p')}
          </Button>
        )}
        <div className={styles.cabinTravellersSection}>
          <Controller
            name="passengers"
            control={control}
            render={({ field }) => <PassengersInput {...field} />}
          />
        </div>

        <Button variant="default" className={styles.searchButton} type="submit">
          {t('TU9YShZXxLKwg34VDopqU')}
        </Button>
      </div>
    </form>
  );
};

export default AirportTransfersResultsSearch;
