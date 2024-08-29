'use client';
import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import MoveRight from '@/components/common/base/MoveRight';
import CabinSelect from '@/components/flights/searchbox/inputs/CabinSelect';
import DatesInput from '@/components/flights/searchbox/inputs/DatesInput';
import FlightLocationInput from '@/components/flights/searchbox/inputs/FlightLocationInput';
import PassengersInputs from '@/components/flights/searchbox/inputs/PassengersInput';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { eventsOnClickFlightSearch } from '@/utils/events/flights/search';
import { cn } from '@/utils/helper/tailwind_cn';
import { searchboxSchema } from '@/utils/schemas/flights';
import { FlightSearchData } from '@/utils/types/common';
import { flightSearchboxOriginType } from '@/utils/types/flights';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';
import { RefreshCw, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { useSearchParams } from 'next/navigation';

export interface multiCitySearchType {
  passengers: [number, number, number];
  cabin: { id: string; value:string; title: string };
  tripType: string;
  errors?: FieldError | undefined;
  direct: boolean;
  trips: {
    origin: flightSearchboxOriginType[];
    destination: flightSearchboxOriginType[];
    date: [Date, Date | undefined];
  }[];
}

type PlaceRequest = {
  lang: string;
  place: string;
};

type UpdateType = {
  origin?: PlaceRequest[];
  destination?: PlaceRequest[];
};

interface origin {
  code: string;
  name: string;
  phrase: string;
  cityCode: string;
  countryCode: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  placeType: string;
}

export const tripTypes = [
  {
    name: 'One way',
    href: 'one-way',
    icon: <MoveRight className="rtl:rotate-180" />,
  },
  {
    name: 'Round trip',
    href: 'round-trip',
    icon: <RefreshCw />,
  },
  {
    name: 'Multi city',
    href: 'multi-city',
    icon: (
      <span className="flex w-fit rtl:rotate-180">
        <MoveRight size={15} strokeWidth={2.5} />
        <MoveRight size={15} strokeWidth={2.5} />
      </span>
    ),
  },
];

const FlightSearch = ({ inputs, origin }: { inputs?: FlightSearchData; origin?: origin }) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const searchParams = useSearchParams();



  const typesNames = {
    'one-way': t('cd_4pzYkVbyTku6JYAIqT'),
    'round-trip': t('qCJNwX_A29mSPMKA1wELp'),
    'multi-city': t('oOz1ckD4fnuAlzWv35wph'),
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, defaultValues },
  } = useForm<any>({
    defaultValues: {
      passengers: [1, 0, 0],
      cabin: { id: 'Economy', value: 'Economy', title: t('rIiR0JqFJCgXghbVz0mzU') },
      tripType: 'round-trip',
      direct: false,
      trips: [
        {
          index: 0,
          origin: origin ? [origin] : [],
          destination: [],
          date: [dayjs().add(7, 'days').toDate(), dayjs().add(14, 'days').toDate()],
        },
      ],
    },
    resolver: yupResolver(searchboxSchema),
    mode: 'onChange',
  });

  const activeType = watch('tripType');

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'trips',
  });

  const watchTrips = watch('trips');

  const appendNewFligh = () => {
    const [firstDate, secondDate] = watch('trips').slice(-1)[0].date;
    const lastTrip = watch('trips').slice(-1)[0].destination;

    return append({
      origin: lastTrip,
      destination: [],
      date: [dayjs(firstDate).add(7, 'days').toDate(), dayjs(secondDate).add(14, 'days').toDate()],
    });
  };

  useEffect(() => {
    if (!inputs || origin) return;

    const { origins, destinations } = inputs;
    const updates: UpdateType = { ...defaultValues?.trips[0] };

    const fetchData = async (places: string[], key: keyof UpdateType) => {
      const responses:any = await Promise.all(
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


  const handleSwap = (index: number) => {
    const currentTrip = watch(`trips.${index}`);

    update(index, {
      ...currentTrip,
      origin: currentTrip.destination,
      destination: currentTrip.origin,
    });
  };


  const onSubmit: SubmitHandler<multiCitySearchType> = async (data) => {
   
    const { passengers, cabin, direct, trips } = data;
    const [adults, children, infants] = passengers;

    let pathSegments = [];

    if (activeType === 'round-trip' && trips.length > 0) {
      const { origin, destination, date } = trips[0];
      const originCodes = origin.map((place) => place.placeType ==="airport" ? place.code +"a":place.code).join('_');
      const destinationCodes = destination.map((place) => place.placeType ==="airport" ? place.code +"a":place.code).join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);

      if (date[1]) {
        // If there's a return date, handle it as a round trip
        const returnDate = dayjs(date[1]).format('YYYY-MM-DD');
        pathSegments.push(`${destinationCodes}-${originCodes}/${returnDate}`);
      }
    } else if (activeType === 'multi-city') {
      pathSegments = trips.map(({ origin, destination, date }) => {
        const originCodes = origin.map((place) => place.placeType ==="airport" ? place.code +"a":place.code).join('_');
        const destinationCodes = destination.map((place) => place.placeType ==="airport" ? place.code +"a":place.code).join('_');
        const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
        return `${originCodes}-${destinationCodes}/${departureDate}`;
      });
    } else if (activeType === 'one-way' && trips.length > 0) {
      // Handle one-way trips similarly to round-trip but without return segment
      const { origin, destination, date } = trips[0];
      const originCodes = origin.map((place) => place.placeType ==="airport" ? place.code +"a":place.code).join('_');
      const destinationCodes = destination.map((place) => place.placeType ==="airport" ? place.code +"a":place.code).join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (infants > 0) params.append('infants', String(infants));
    if (children > 0) params.append('children', String(children));
    if (adults > 1) params.append('adults', String(adults));
    if (cabin.id !== 'Economy') params.append('cabin', cabin.id);
    if (direct) params.append('direct', 'true');

   if (params.get('solo_open')) {
     params.delete('solo_open');
     const query = `/flights/search/${pathSegments.join('/')}${params.toString() ? '?' + params : ''}`;
     window.location.assign(query);
   } else {
     params.append('solo_open', 'true');
     const query = `/flights/search/${pathSegments.join('/')}${params.toString() ? '?' + params : ''}`;
     window.open(query, '_blank');
     eventsOnClickFlightSearch(data);
   }
  };

  const handleAddDateClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (activeType === 'one-way') {
      setValue('tripType', 'round-trip');
    } else if (activeType === 'round-trip') {
      update(0, {
        ...watchTrips[0],
        date: [
          dayjs(watchTrips[0].date[0]).toDate(),
          dayjs(watchTrips[0].date[0]).add(7, 'days').toDate(),
        ],
      });
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {/*  top section wich contains flights type tabs , cabin class and passengers */}
      <div className={styles.topSectionContainer}>
        {/* tabs */}
        <div className={styles.tabsContainer}>
          {tripTypes.map((type) => (
            <Button
              key={type.name}
              variant="default"
              className={cn(styles.tab, activeType === type.href && styles.active)}
              type="button"
              onClick={() => setValue('tripType', type.href)}
            >
              {typesNames[type.href as keyof typeof typesNames]}
            </Button>
          ))}
        </div>
        {/* cabinTravellersSection */}
        <div className={styles.cabinTravellersSection}>
          <Controller
            name="passengers"
            control={control}
            render={({ field }) => <PassengersInputs {...field} />}
          />
          <Controller
            name="cabin"
            control={control}
            render={({ field }) => <CabinSelect {...field} />}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-1.5 flex flex-col gap-2">
        {activeType === 'multi-city'
          ? fields.map((field, index) => {
              return (
                <div
                  className={styles.contentContainer}
                  key={field.id}
                >
                  <div className="flex w-full justify-start gap-1.5">
                    {/* here */}
                    <div className={styles.locations}>
                      <div className={styles.input}>
                        <Controller
                          name={`trips[${index}].origin`}
                          control={control}
                          rules={{ required: 'this is required' }}
                          render={({ field }) => (
                            <div className={cn(styles.locationInput)}>
                              <FlightLocationInput
                                field={field}
                                basedOn={index ===0? null:watch("trips")[index -1]?.destination[0]}
                                type="origin"
                                variant="flights"
                              />
                            </div>
                          )}
                        />
                        {errors.trips &&
                          Array.isArray(errors.trips) &&
                          errors.trips[index]?.origin && (
                            <p className={styles.errorMessage}>
                              <ValidationFeedback
                                messageSlug={(errors.trips[index]?.origin as FieldError)?.message}
                              />
                            </p>
                          )}
                      </div>
                      <Button
                        className={styles.swapLocationsBtn}
                        aria-label={t('M6SVwqN3W7gELRKVi4lF5')}
                        variant="default"
                        type="button"
                        onClick={() => handleSwap(index)}
                      >
                        <Icon
                          icon="octicon:arrow-switch-16"
                          width="26"
                          height="26"
                          style={{ color: '#2ba6de' }}
                        />
                      </Button>
                      <div className={styles.input}>
                        <Controller
                          name={`trips[${index}].destination`}
                          control={control}
                          render={({ field }) => (
                            <div className={cn(styles.locationInput)}>
                              <FlightLocationInput
                                field={field}
                                basedOn={index===0?null: watch("trips")[index]?.origin[0]}                         
                                type="destination"
                                variant="flights"
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
                      </div>
                    </div>
                    <Controller
                      name={`trips[${index}].date`}
                      control={control}
                      render={({ field }) => (
                        <div
                          className={cn(
                            styles.datesContainer,
                            activeType === 'multi-city' ? 'w-[30%]' : 'w-[38%]',
                          )}
                        >
                          <DatesInput
                            isRange={activeType === 'round-trip' ? true : false}
                            showTwoInputs={activeType === 'one-way' ? true : false}
                            field={field}
                            handleAddDateClick={handleAddDateClick}
                          />
                        </div>
                      )}
                    />
                  </div>
                  {watchTrips.length > 1 && (
                    <Button
                      variant="outline"
                      className="aspect-square !h-11 !rounded-full !p-0 ltr:mr-8 rtl:ml-8"
                      title={t('DyOgyZcbzst5WN7U4bo8a')}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <X size={25} />
                    </Button>
                  )}
                  {activeType !== 'multi-city' && (
                    <Button variant="default" className={styles.searchButton} type="submit">
                      {t('TU9YShZXxLKwg34VDopqU')}
                    </Button>
                  )}
                </div>
              );
            })
          : fields.slice(0, 1).map((field, index) => {
              return (
                <div className={styles.contentContainer} key={field.id}>
                  <div className="flex w-full justify-start gap-1.5">
                    {/* here */}
                    <div className={styles.locations}>
                      <div className={styles.input}>
                        <Controller
                          name={`trips[${index}].origin`}
                          control={control}
                          rules={{ required: 'this is required' }}
                          render={({ field }) => (
                            <div className={cn(styles.locationInput)}>
                              <FlightLocationInput
                                field={field}
                                basedOn={watch("trips")[index -1]?.destination[0]}
                                type="origin"
                                variant="flights"
                              />
                            </div>
                          )}
                        />
                        {errors.trips &&
                          Array.isArray(errors.trips) &&
                          errors.trips[index]?.origin && (
                            <p className={styles.errorMessage}>
                              <ValidationFeedback
                                messageSlug={(errors.trips[index]?.origin as FieldError)?.message}
                              />
                            </p>
                          )}
                      </div>
                      <Button
                        className={styles.swapLocationsBtn}
                        aria-label={t('M6SVwqN3W7gELRKVi4lF5')}
                        variant="default"
                        type="button"
                        onClick={() => handleSwap(index)}
                      >
                        <Icon
                          icon="octicon:arrow-switch-16"
                          width="26"
                          height="26"
                          style={{ color: '#2ba6de' }}
                        />
                      </Button>
                      <div className={styles.input}>
                        <Controller
                          name={`trips[${index}].destination`}
                          control={control}
                          render={({ field }) => (
                            <div className={cn(styles.locationInput)}>
                              <FlightLocationInput
                                field={field}
                                basedOn={watch("trips")[index]?.origin[0]}
                                type="destination"
                                variant="flights"
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
                      </div>
                    </div>
                    <Controller
                      name={`trips[${index}].date`}
                      control={control}
                      render={({ field }) => (
                        <div
                          className={cn(
                            styles.datesContainer,
                            activeType === 'multi-city' ? 'w-[30%]' : 'w-[45%]',
                          )}
                        >
                          <DatesInput
                            isRange={activeType === 'round-trip' ? true : false}
                            showTwoInputs={activeType === 'one-way' ? true : false}
                            field={field}
                            handleAddDateClick={handleAddDateClick}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <Button variant="default" className={styles.searchButton} type="submit">
                    {t('TU9YShZXxLKwg34VDopqU')}
                  </Button>
                </div>
              );
            })}

        {activeType === 'multi-city' && (
          <div className="flex items-center justify-between py-2.5">
            {
              // if the active type is multi city show the add flight button
              activeType === 'multi-city' && watchTrips.length < 6 && (
                <Button
                  variant="outline"
                  className={styles.addFlightButton}
                  type="button"
                  onClick={appendNewFligh}
                >
                  {t('8F4p6uoEdu4p1EczyaD7n')}
                </Button>
              )
            }
            <Button variant="default" className={styles.searchButton} type="submit">
              {t('TU9YShZXxLKwg34VDopqU')}
            </Button>
          </div>
        )}
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.directOnly}>
          <Controller
            name="direct"
            control={control}
            render={({ field }) => (
              <Checkbox
                aria-label={t('Ja6q4HUnySze0FiwyBSrO')}
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <span className={styles.directOnlyText}>{t('81-1j85l3CDmDH_VE7Tz9')}</span>
        </div>
      </div>
    </form>
  );
};

export default FlightSearch;
