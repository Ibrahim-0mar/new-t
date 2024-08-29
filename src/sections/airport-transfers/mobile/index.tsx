'use client';
import Button from '@/components/common/base/Button';
import { locale } from '@/navigation';
import {
  fetchPlaceCoordinates,
  fetchTransfersPlacesRequest,
} from '@/services/apis/airport-transfers/places';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { airportTransfersSearchboxSchema } from '@/utils/schemas/airport-transfers';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PssengersMobile from './Passengers';
import TripTypeMobile from './TripType/index';
import AirportTransfersDateSelectorMobile from './components/AirportTransfersDateSelectorMobile';
import AirportTransfersTimeSelectorMobile from './components/AirportTransfersTimeSelectorMobile';
import MobileLocationInput from './components/MobileLocationInput';
import styles from './index.module.css';

export type OpenedMenuTypes =
  | ''
  | 'cabin'
  | 'trip-type'
  | 'passengers'
  | 'pickup'
  | 'dropoff'
  | 'pickupDate'
  | 'pickupTime';

const AirportTransfersSearchboxMobile = () => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin') as string;
  const arrivalDate = searchParams.get('arrival-date') as string;

  const defaultValues = {
    passengers: [1, 0, 0],
    tripType: 'one-way',
    pickup: [],
    dropoff: [],
    pickupDate: dayjs().add(1, 'days').toDate(),
    returnDate: dayjs().add(2, 'days').add(1, 'hours').toDate(),
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
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

  const [openedMenu, setOpenedMenu] = useState<OpenedMenuTypes>('');
  const nearbyAirport = globalDataGetter('client', 'nearbyAirport');
  const handleSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pickups = watch('pickup');
    const dropoffs = watch('dropoff');
    setValue('pickup', dropoffs);
    setValue('dropoff', pickups);
  };

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
    window.open('/en/airport-transfers/search/' + query, '_blank');
  };
  const getNearbyPlaces = async () => {
    const response = await fetchTransfersPlacesRequest(
      nearbyAirport?.city?.name || nearbyAirport.name,
      locale,
    );
    setNearbyPlaces(response);
  };

  useEffect(() => {
    getNearbyPlaces();
  }, []);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="mobile form" className={styles.mobileSearchBoxForm}>
      <div className={styles.selectionMobileView}>
        <Controller
          name="tripType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TripTypeMobile openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} field={field} />
          )}
        />
        <Controller
          name="passengers"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PssengersMobile field={field} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
          )}
        />
      </div>
      <p className={styles.header}>{t('SNvUmukMPRbPt3wfHU_Hn')}</p>
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
              listData={nearbyPlaces}
              listHeader={t('nI--L5MUmTV3hLBLjcdfr')}
              type="pickup"
            />
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
          </div>
        )}
      />
      {errors && errors.pickup && (
        <p className={styles.error}>
          <ValidationFeedback messageSlug={errors?.pickup?.message as string} />
        </p>
      )}
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
              listData={nearbyPlaces}
              listHeader={t('nI--L5MUmTV3hLBLjcdfr')}
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
      <Controller
        name={`pickupDate`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <AirportTransfersDateSelectorMobile
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

      {watch('tripType') === 'round-trip' && (
        <>
          <Controller
            name={`returnDate`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <AirportTransfersDateSelectorMobile
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
        </>
      )}

      <Button variant="default" className={styles.searchButton} type="submit">
        {t('TU9YShZXxLKwg34VDopqU')}
      </Button>
    </form>
  );
};

export default AirportTransfersSearchboxMobile;
