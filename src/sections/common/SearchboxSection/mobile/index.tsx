'use client';
import Button from '@/components/common/base/Button';
import { multiCitySearchType } from '@/components/common/custom/searchboxes/DefaultSearchbox/components/flights/FlightsSearch';
import { fetchNearbyAirports } from '@/services/apis/common/airports';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { eventsOnClickFlightSearch } from '@/utils/events/flights/search';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { searchboxSchema } from '@/utils/schemas/flights';
import { SearchboxType } from '@/utils/types/common';
import { placeType } from '@/utils/types/flights';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';
import { Plus, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import PssengersMobile from './Passengers';
import TripTypeMobile from './TripType/index';
import CabinClassMobile from './cabinClass/index';
import MobileLocationInput from './components/MobileLocationInput';
import DatesSelectorMobile from './components/datesSelectorMobile';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { fetchTopFlighRequest } from '@/services/apis/flights/trending/fetchTopFlights';
import { revalidateData } from '@/utils/helper/cacheHelpers';

export type OpenedMenuTypes =
  | ''
  | 'cabin'
  | 'trip-type'
  | 'passengers'
  | 'origin'
  | 'distention'
  | 'date';

type PlaceRequest = {
  lang: string;
  place: string;
};

type UpdateType = {
  origin?: PlaceRequest[];
  destination?: PlaceRequest[];
};

export const defaultMultiCityValues: multiCitySearchType = {
  passengers: [1, 0, 0],
  tripType: 'round-trip',
  cabin: { id: 'Economy', value: 'Economy', title: 'Economy' },
  direct: false,
  trips: [
    {
      origin: [],
      destination: [],
      date: [dayjs().add(7, 'days').toDate(), dayjs().add(14, 'days').toDate()],
    },
  ],
};

const FlightSearchMobile = ({ data: inputs }: SearchboxType) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const [nearbyAirports, setNearbyAirports] = useState<placeType[]>([]);
  const [trendingDestinations, setTrendingDestinations] = useState<placeType[]>([]);
  const [openedMenu, setOpenedMenu] = useState<OpenedMenuTypes>('');

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { defaultValues, errors },
  } = useForm<any>({
    defaultValues: {
      ...defaultMultiCityValues,
      cabin: { id: 'Economy', value: 'Economy', title: t('rIiR0JqFJCgXghbVz0mzU') },
    },
    resolver: yupResolver(searchboxSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'trips',
  });
  const watchTrips = watch('trips');
  const activeType = watch('tripType');

  const nearbyAirport = useMemo(() => globalDataGetter('client', 'nearbyAirport'), []);

  const getNearbyAirports = useCallback(async () => {
    const response = await fetchNearbyAirports(locale);
    setNearbyAirports(response);
  }, [locale]);

  const getTrendingDestinations = async () => {
    const value = watch('origin') > 0 ? watch('origin')[watch('origin').length - 1] : nearbyAirport;
    const response = await fetchTopFlighRequest(
    
      {
        code: value?.code,
        currency: 'USD',
        limit: 10,
        type: value?.placeType || 'airport',
        locale,
      }
    );
    if (!response || response.length === 0) {
      const code = value?.code;
      const type = value?.placeType || 'airport';
    revalidateData(`top-flight-${code}-${type}-${locale}-tag`);
    }

    const transformedResponse = response.map((item: any) => {
      return {
        name: item.airport.name,
        phrase: item.airport.phrase,
        placeType: 'airport',
        cityCode: item.destinationCity,
        code: item.destination,
        countryCode: item.destination,
        location: { type: 'Point', coordinates: [0, 0] },
      };
    });
    setTrendingDestinations(transformedResponse);
  };

  const handleSwap = (index: number) => {
    const currentTrip = watch(`trips[${index}]`);

    update(index, {
      ...currentTrip,
      origin: currentTrip.destination,
      destination: currentTrip.origin,
    });
  };

  const appendNewFligh = () => {
    const [firstDate, secondDate] = watch('trips').slice(-1)[0].date;

    return append({
      origin: [],
      destination: [],
      date: [dayjs(firstDate).add(7, 'days').toDate(), dayjs(secondDate).add(14, 'days').toDate()],
    });
  };

  useEffect(() => {
    if (!inputs) return;

    const { origins, destinations } = inputs;
    const updates: UpdateType = { ...defaultValues?.trips[0] };

    const fetchData = async (places: string[], key: keyof UpdateType) => {
      const responses = await Promise.all(
        places.map(async (place) => await fetchPlacesRequest(place, locale)),
      );
      updates[key] = responses
        .filter((response:any) => response && response.length > 0)
        .map((response:any) => response[0]);
    };

    const updateData = async () => {
      if (origins) await fetchData(origins, 'origin');
      if (destinations) await fetchData(destinations, 'destination');
      update(0, updates);
    };

    updateData();
  }, [inputs]);

  useEffect(() => {
    if (watch('trips').length > 0 || nearbyAirport) {
      getTrendingDestinations();
    }
    getNearbyAirports();
  }, [getNearbyAirports, nearbyAirport]);

  useEffect(() => {
    const currentTrip = watch(`trips`)[0];
    if (activeType === 'one-way') {
      update(0, {
        ...currentTrip,
        date: [dayjs().add(7, 'days').toDate()],
      });
    }
  }, []);


  const onSubmit: SubmitHandler<multiCitySearchType> = (data) => {

    const { passengers, cabin, direct, trips } = data;
    const [adults, children, infants] = passengers;

    let pathSegments = [];

    if (activeType === 'round-trip' && trips.length > 0) {
      const { origin, destination, date } = trips[0];
      const originCodes = origin.map((place) => place.code).join('_');
      const destinationCodes = destination.map((place) => place.code).join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);

      if (date[1]) {
        // If there's a return date, handle it as a round trip
        const returnDate = dayjs(date[1]).format('YYYY-MM-DD');
        pathSegments.push(`${destinationCodes}-${originCodes}/${returnDate}`);
      }
    } else if (activeType === 'multi-city') {
      pathSegments = trips.map(({ origin, destination, date }) => {
        const originCodes = origin.map((place) => place.code).join('_');
        const destinationCodes = destination.map((place) => place.code).join('_');
        const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
        return `${originCodes}-${destinationCodes}/${departureDate}`;
      });
    } else if (activeType === 'one-way' && trips.length > 0) {
      // Handle one-way trips similarly to round-trip but without return segment
      const { origin, destination, date } = trips[0];
      const originCodes = origin.map((place) => place.code).join('_');
      const destinationCodes = destination.map((place) => place.code).join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);
    }

    const params = new URLSearchParams();
    if (infants > 0) params.append('infants', String(infants));
    if (children > 0) params.append('children', String(children));
    if (adults > 1) params.append('adults', String(adults));
    if (cabin.id !== 'Economy') params.append('cabin', cabin.id);
    if (direct) params.append('direct', 'true');
    params.append('solo_open', 'true');
    const query = `/flights/search/${pathSegments.join('/')}${
      params.toString() ? '?' + params : ''
    }`;

   
    window.open(query, '_blank');
    eventsOnClickFlightSearch(data);
  };

  const handleTripsFields = (activeType: string)=>{
    if (activeType === 'one-way' || activeType === 'round-trip') {
      // Only keep the first element if `activeType` is 'one-way'
      if (fields.length > 1) {
        // We should remove elements in reverse order to avoid index shifting issues
        for (let i = fields.length - 1; i > 0; i--) {
          remove(i);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="mobile form" className={styles.mobileSearchBoxForm}>
      <div className={styles.selectionMobileView}>
        <Controller
          name="tripType"
          control={control}
          render={({ field }) => {
            return (
              <TripTypeMobile field={field} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} onChange={handleTripsFields} />
            );
          }}
        />
        <Controller
          name="cabin"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CabinClassMobile field={field} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
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
      {fields.map((field, index) => {
        return (
          <div key={field.id} className={styles.locations}>
            {activeType === 'multi-city' && (
              <div className="flex w-full items-center justify-between p-5 font-semibold">
                <div>
                  <p>{t('ln29_KjOxQJfub4vdr1FQ', { number: index + 1 })}</p>
                </div>
                {watchTrips.length > 1 && (
                  <Button
                    variant="outline"
                    className="mx-2 !rounded-full !p-0.5"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            )}
            <Controller
              name={`trips[${index}].origin`}
              control={control}
              render={({ field }) => (
                <div className={styles.locationInput}>
                  <MobileLocationInput
                    field={field}
                    openedMenu={openedMenu}
                    setOpenedMenu={setOpenedMenu}
                    listData={nearbyAirports}
                    listHeader={t('o32z4vxSxBaiBpJyM7FgK')}
                    type="origin"
                  />
                  <Button
                    className={styles.swapLocationsBtn}
                    variant="default"
                    type="button"
                    onClick={() => handleSwap(index)}
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
            {errors.trips && Array.isArray(errors.trips) && errors.trips[index]?.origin && (
              <p className={styles.errorMessage}>
                <ValidationFeedback
                  messageSlug={(errors.trips[index]?.origin as FieldError)?.message}
                />
              </p>
            )}
            <Controller
              name={`trips[${index}].destination`}
              control={control}
              render={({ field }) => (
                <div className={styles.locationInput}>
                  <MobileLocationInput
                    field={field}
                    openedMenu={openedMenu}
                    setOpenedMenu={setOpenedMenu}
                    listData={trendingDestinations}
                    listHeader={t('nvpTmU3WJW1KS1Rkx9A0z')}
                    type="distention"
                  />
                </div>
              )}
            />
            {errors.trips && Array.isArray(errors.trips) && errors.trips[index]?.destination && (
              <p className={styles.errorMessage}>
                <ValidationFeedback
                  messageSlug={(errors.trips[index]?.destination as FieldError)?.message}
                />
              </p>
            )}
            <Controller
              name={`trips[${index}].date`}
              control={control}
              render={({ field }) => {
                return (
                  <DatesSelectorMobile
                    field={field}
                    openedMenu={openedMenu}
                    setOpenedMenu={setOpenedMenu}
                    setValue={setValue}
                    tripType={watch('tripType')}
                    showTwoInputs={activeType === 'round-trip'}
                  />
                );
              }}
            />
            {errors.trips && Array.isArray(errors.trips) && errors.trips[index]?.date && (
              <p className={styles.errorMessage}>
                <ValidationFeedback
                  messageSlug={(errors.trips[index]?.date as FieldError)?.message}
                />
              </p>
            )}
          </div>
        );
      })}
      {
        // if the active type is multi city show the add flight button
        activeType === 'multi-city' && watchTrips.length < 6 && (
          <Button
            variant="default"
            className="mx-5 mb-3 ml-auto block !px-0 text-sm text-[#36AEE5]"
            type="button"
            onClick={appendNewFligh}
          >
            <Plus size={14} /> {t('5ppDs3sJd5NCMLLTSUOCW')}
          </Button>
        )
      }

      <Button variant="default" className={styles.searchButton} type="submit">
        {t('TU9YShZXxLKwg34VDopqU')}
      </Button>
    </form>
  );
};

export default FlightSearchMobile;
