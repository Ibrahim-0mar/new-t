'use client';
import Button from '@/components/common/base/Button';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PssengersMobile from './Passengers';
import TripTypeMobile from './TripType/index';
import MobileLocationInput from './components/MobileLocationInput';
import AirportTransfersDateSelectorMobile from './components/AirportTransfersDateSelectorMobile';
import AirportTransfersTimeSelectorMobile from './components/AirportTransfersTimeSelectorMobile';
import styles from './index.module.css';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { airportTransfersSearchboxSchema } from '@/utils/schemas/airport-transfers';
import {
  fetchPlaceCoordinates,
  fetchTransfersPlacesRequest,
} from '@/services/apis/airport-transfers/places';
import { useParams, useSearchParams } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/utils/helper/tailwind_cn';
import CollapsedAirportSearchBox from '../../CollapsedAirportSearchBox';
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
  | 'pickupTime';

const defaultValues = {
  passengers: [1, 0, 0],
  tripType: 'one-way',
  pickup: [],
  dropoff: [],
  pickupDate: dayjs().add(1, 'days').toDate(),
  returnDate: dayjs().add(2, 'days').add(1, 'hours').toDate(),
};

const AirportTransfersResultSearchboxMobile = () => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues,
    resolver: yupResolver(airportTransfersSearchboxSchema),
  });
  const searchParams = useSearchParams();
  const params = useParams();
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(true);
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
    window.open(`/${locale}/airport-transfers/search/` + query, '_self');
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
  const getPlaceDetails = async (value: string) => {
    const response = await fetchTransfersPlacesRequest(value, locale);
    return response[0];
  };

  const getDataFromUrl = async () => {
    const legs = params.legs;

    const pickup = await getPlaceDetails(searchParams.get('origin_name') || '');
    const droppoff = await getPlaceDetails(searchParams.get('destination_name') || '');
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

  return (
    <>
      <div className={cn(collapsed ? 'block lg:hidden' : 'hidden')}>
        <CollapsedAirportSearchBox setCollapsed={setCollapsed} getValues={getValues} />
      </div>
      {!collapsed && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="mobile form"
          className={styles.mobileSearchBoxForm}
        >
          <div className={styles.selectionMobileView}>
            <Controller
              name="tripType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TripTypeMobile
                  openedMenu={openedMenu}
                  setOpenedMenu={setOpenedMenu}
                  field={field}
                />
              )}
            />
            <Controller
              name="passengers"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PssengersMobile
                  field={field}
                  openedMenu={openedMenu}
                  setOpenedMenu={setOpenedMenu}
                />
              )}
            />
            <ChevronUp
              color="#0a425c"
              size={20}
              className="mr-4 ms-auto cursor-pointer"
              onClick={() => setCollapsed(true)}
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
      )}
    </>
  );
};

export default AirportTransfersResultSearchboxMobile;
