'use client';
import Button from '@/components/common/base/Button';
import { locale } from '@/navigation';
import { OpenedMenuTypes } from '@/sections/common/SearchboxSection/mobile';
import PssengersMobile from '@/sections/common/SearchboxSection/mobile/Passengers';
import TripTypeMobile from '@/sections/common/SearchboxSection/mobile/TripType';
import CabinClassMobile from '@/sections/common/SearchboxSection/mobile/cabinClass';
import MobileLocationInput from '@/sections/common/SearchboxSection/mobile/components/MobileLocationInput';
import DatesSelectorMobile from '@/sections/common/SearchboxSection/mobile/components/datesSelectorMobile';
import { fetchNearbyAirports } from '@/services/apis/common/airports';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { fetchTopFlighRequest } from '@/services/apis/flights/trending/fetchTopFlights';
import { KayakDomains } from '@/services/data/car-rental/kayakDomains';
import { eventsOnClickFlightSearch } from '@/utils/events/flights/search';
import { areTwoArraysEqual } from '@/utils/helper/arrays';
import { revalidateData } from '@/utils/helper/cacheHelpers';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { cn } from '@/utils/helper/tailwind_cn';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { searchboxSchema } from '@/utils/schemas/flights';
import { placeType } from '@/utils/types/flights';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';
import { ChevronUp, Plus, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import CollapsedResultSearchBox from '../CollapsedResultSearchBox';
import { multiCitySearchType } from '../FlightsSearch';
import styles from './index.module.css';

interface Props {
  cabin: { id: string; value: string; title: string };
  adults: number;
  childs: number;
  infants: number;
  legs: { origin: []; destination: []; departure: string }[];
}

const MobileResultSearchBox = ({ cabin, childs, infants, legs, adults }: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const searchParams = useSearchParams();
  const country = globalDataGetter('client', 'country')?.code || 'US';

  const [openedMenu, setOpenedMenu] = useState<OpenedMenuTypes>('');
  const [nearbyAirports, setNearbyAirports] = useState<placeType[]>([]);
  const [trendingDestinations, setTrendingDestinations] = useState<placeType[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const nearbyAirport = globalDataGetter('client', 'nearbyAirport');

  const defaultSearchValues: multiCitySearchType = {
    passengers: [adults, childs, infants],
    cabin,
    tripType: 'round-trip',
    direct: false,
    trips: [
      {
        origin: [],
        destination: [],
        date: [dayjs().add(7, 'days').toDate(), dayjs().add(14, 'days').toDate()],
      },
    ],
  };

  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultSearchValues,
    resolver: yupResolver(searchboxSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'trips',
  });
  const tripType = watch('tripType');
  const watchTrips: multiCitySearchType['trips'] = watch('trips');
  const fetchPlace = async (code: string) => {
    const response = await fetchPlacesRequest(code, locale);
    return response[0];
  };

  const getPlaces = async (codes: string[]) => {
    const places = await Promise.all(codes.map((code: string) => fetchPlace(code)));
    return places;
  };

  const handleSwap = (index: number) => {
    const currentTrip = watch(`trips[${index}]`);
    update(index, {
      ...currentTrip,
      origin: currentTrip.destination,
      destination: currentTrip.origin,
    });
  };

  const getTrendingDestinations = async () => {
    const lastTripIndex = fields.length - 1;
    const lastOrigin = watch(`trips[${lastTripIndex}].origin`);

    const value =
      lastOrigin && lastOrigin.length > 0 ? lastOrigin[lastOrigin.length - 1] : nearbyAirport;

    const response = await fetchTopFlighRequest({
      code: value?.code,
      currency: 'USD',
      limit: 10,
      type: value?.placeType || 'airport',
      locale,
    });

    if (!response || response.length === 0) {
      const code = value?.code;
      const type = value?.placeType || 'airport';
      revalidateData(`top-flight-${code}-${type}-${locale}-tag`);
    }
    const transformedResponse = response.map((item: any) => {
      return {
        name: item?.airport?.name,
        phrase: item?.airport?.phrase,
        placeType: 'airport',
        cityCode: item?.destinationCity,
        code: item?.destination,
        countryCode: item?.destination,
        location: { type: 'Point', coordinates: [0, 0] },
      };
    });
    setTrendingDestinations(transformedResponse);
  };

  const getNearbyAirports = async () => {
    const response = await fetchNearbyAirports(locale);
    setNearbyAirports(response);
  };

  const onSubmit: SubmitHandler<multiCitySearchType> = (data) => {
    const { passengers, cabin, direct, trips } = data;
    const [adults, children, infants] = passengers;

    let pathSegments = [];

    if (tripType === 'round-trip' && trips.length > 0) {
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
    } else if (tripType === 'multi-city') {
      pathSegments = trips.map(({ origin, destination, date }) => {
        const originCodes = origin.map((place) => place.code).join('_');
        const destinationCodes = destination.map((place) => place.code).join('_');
        const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
        return `${originCodes}-${destinationCodes}/${departureDate}`;
      });
    } else if (tripType === 'one-way' && trips.length > 0) {
      // Handle one-way trips similarly to round-trip but without return segment
      const { origin, destination, date } = trips[0];
      const originCodes = origin.map((place) => place.code).join('_');
      const destinationCodes = destination.map((place) => place.code).join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (infants > 0) params.set('infants', String(infants));
    if (children > 0) params.set('children', String(children));
    if (adults > 1) params.set('adults', String(adults));
    if (direct) params.set('direct', 'true');
    if (cabin.id !== 'Economy') {
      params.set('cabin', cabin.id);
    } else {
      params.delete('cabin');
    }

    if (params.get('solo_open')) {
      params.delete('solo_open');
      const query = `/flights/search/${pathSegments.join('/')}${params.toString() ? '?' + params : ''}`;
      window.open(query, '_blank');
      if (process.env.NODE_ENV === 'production') {
        const domain =
          country && Object(KayakDomains).hasOwnProperty(country?.code?.toUpperCase())
            ? KayakDomains[country?.code?.toUpperCase()].fullDomainName
            : 'https://www.kayak.com';
        window.location.replace(
          `${domain}/in?a=kan_220420&url=/cars/${data?.trips[0]?.destination[0]?.code?.substring(0, 3)}/${dayjs(data?.trips[0]?.date[0]).format('YYYY-MM-DD-HH')}h/${dayjs(data?.trips[0]?.date[0]).add(3, 'days').format('YYYY-MM-DD-HH')}h?enc_lid=solo_ad`,
        );
      }
    } else {
      params.append('solo_open', 'true');
      const query = `/flights/search/${pathSegments.join('/')}${params.toString() ? '?' + params : ''}`;
      window.open(query, '_blank');
      eventsOnClickFlightSearch(data);
    }
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
    const fetchData = async () => {
      if (legs.length === 1) {
        const {
          origin,
          destination,
          departure,
        }: {
          origin: string[];
          destination: string[];
          departure: string;
        } = legs[0];
        const originCode = origin[0];
        const destinationCode = destination[0];
        const origins = await fetchPlace(originCode);
        const destinations = await fetchPlace(destinationCode);

        if (origins && destinations) {
          update(0, {
            origin: [origins],
            destination: [destinations],
            date: [dayjs(departure).toDate(), dayjs(departure).add(7, 'days').toDate()],
          });
        }
      } else if (areTwoArraysEqual(legs[0].origin, legs[1].destination)) {
        const {
          origin,
          destination,
          departure,
        }: {
          origin: string[];
          destination: string[];
          departure: string;
        } = legs[0];
        const returnDate =
          dayjs(legs[1].departure).toDate() ?? dayjs(departure).add(7, 'days').toDate();
        const originCode = origin[0];
        const destinationCode = destination[0];
        const origins = await fetchPlace(originCode);
        const destinations = await fetchPlace(destinationCode);
        if (origins && destinations) {
          update(0, {
            origin: [origins],
            destination: [destinations],
            date: [dayjs(departure).toDate(), returnDate],
          });
        }
      } else if (legs.length > 1 && !areTwoArraysEqual(legs[0].origin, legs[1].destination)) {
        // Limit the process to the first 6 legs
        const maxLegs = Math.min(legs.length, 6);

        for (let i = 0; i < maxLegs; i++) {
          const leg = legs[i];
          const origins = await getPlaces(leg.origin);
          const destinations = await getPlaces(leg.destination);
          const departureDate = dayjs(leg.departure).toDate();

          update(i, {
            origin: origins,
            destination: destinations,
            date: [departureDate, departureDate],
          });
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (legs.length === 1) {
      setValue('tripType', 'one-way');
    } else if (legs.length > 1 && legs.length <= 2) {
      const type = areTwoArraysEqual(legs[0].origin, legs[1].destination);
      setValue('tripType', type ? 'round-trip' : 'multi-city');
    } else {
      setValue('tripType', 'multi-city');
    }
  }, []);

  useEffect(() => {
    if (watch('trips').length > 0 || nearbyAirport) {
      getTrendingDestinations();
    }
    getNearbyAirports();
  }, []);

  return (
    <>
      <div className={cn(collapsed ? 'block lg:hidden' : 'hidden')}>
        <CollapsedResultSearchBox setCollapsed={setCollapsed} getValues={getValues} />
      </div>
      {!collapsed && (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.mobileSearchBoxForm}>
          <div className={styles.selectionMobileView}>
            <Controller
              name="tripType"
              control={control}
              render={({ field }) => {
                return (
                  <TripTypeMobile
                    field={field}
                    openedMenu={openedMenu}
                    setOpenedMenu={setOpenedMenu}
                  />
                );
              }}
            />
            <Controller
              name="cabin"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CabinClassMobile
                  field={field}
                  openedMenu={openedMenu}
                  setOpenedMenu={setOpenedMenu}
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
              className="mr-4 ms-auto cursor-pointer self-end"
              onClick={() => setCollapsed(true)}
            />
          </div>
          {tripType === 'multi-city'
            ? fields.map((field, index) => {
                return (
                  <div key={field.id} className={styles.locations}>
                    {tripType === 'multi-city' && (
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
                      rules={{ required: 'this is required' }}
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
                      rules={{ required: true }}
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
                    {errors.trips &&
                      Array.isArray(errors.trips) &&
                      errors.trips[index]?.destination && (
                        <p className={styles.errorMessage}>
                          <ValidationFeedback
                            messageSlug={(errors.trips[index]?.destination as FieldError)?.message}
                          />
                        </p>
                      )}
                    <Controller
                      name={`trips[${index}].date`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => {
                        return (
                          <DatesSelectorMobile
                            field={field}
                            openedMenu={openedMenu}
                            setOpenedMenu={setOpenedMenu}
                            showTwoInputs={false}
                            setValue={setValue}
                            tripType={watch('tripType')}
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
              })
            : fields.slice(0, 1).map((field, index) => {
                return (
                  <div key={field.id} className={styles.locations}>
                    {tripType === 'multi-city' && (
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
                      rules={{ required: 'this is required' }}
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
                      rules={{ required: true }}
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
                    {errors.trips &&
                      Array.isArray(errors.trips) &&
                      errors.trips[index]?.destination && (
                        <p className={styles.errorMessage}>
                          <ValidationFeedback
                            messageSlug={(errors.trips[index]?.destination as FieldError)?.message}
                          />
                        </p>
                      )}
                    <Controller
                      name={`trips[${index}].date`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => {
                        return (
                          <DatesSelectorMobile
                            field={field}
                            openedMenu={openedMenu}
                            setOpenedMenu={setOpenedMenu}
                            showTwoInputs={tripType === 'round-trip'}
                            setValue={setValue}
                            tripType={watch('tripType')}
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
            tripType === 'multi-city' && watchTrips.length < 6 && (
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
      )}
    </>
  );
};

export default MobileResultSearchBox;
