'use client';
import Button from '@/components/common/base/Button';
import CabinSelect from '@/components/flights/searchbox/inputs/CabinSelect';
import DatesInput from '@/components/flights/searchbox/inputs/DatesInput';
import FlightLocationInput from '@/components/flights/searchbox/inputs/FlightLocationInput';
import PassengersInput from '@/components/flights/searchbox/inputs/PassengersInput';
import TripTypeSelect from '@/components/flights/searchbox/inputs/TripTypeSelect';
import { locale } from '@/navigation';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { KayakDomains } from '@/services/data/car-rental/kayakDomains';
import { eventsOnClickFlightSearch } from '@/utils/events/flights/search';
import FormatDate from '@/utils/helper/FormatDateComponent';
import { areTwoArraysEqual } from '@/utils/helper/arrays';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { cn } from '@/utils/helper/tailwind_cn';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { searchboxSchema } from '@/utils/schemas/flights';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';
import { Plus, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { multiCitySearchType } from '../FlightsSearch';
import styles from './index.module.css';

interface Props {
  cabin: { id: string; value:string; title: string };
  adults: number;
  childs: number;
  infants: number;
  legs: { origin: []; destination: []; departure: string }[];
}

const ResultSearchBox = ({ cabin, childs, infants, legs, adults }: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const [showMultiCityForm, setShowMultiCityForm] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const country = globalDataGetter('client', 'country')?.code || 'US';

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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultSearchValues,
    resolver: yupResolver(searchboxSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'trips',
  });

  const watchTrips: [] = watch('trips');
  const tripType = watch('tripType');

  const handleSwap = (index: number) => {
    const currentTrip = watch(`trips[${index}]`);
    update(index, {
      ...currentTrip,
      origin: currentTrip.destination,
      destination: currentTrip.origin,
    });
  };

  const handleAddDateClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setValue('tripType', 'round-trip');
  };

  const onSubmit: SubmitHandler<multiCitySearchType> = (data) => {
    const { passengers, cabin, direct, trips } = data;
    const [adults, children, infants] = passengers;

    let pathSegments = [];

    if (tripType === 'round-trip' && trips.length > 0) {
      const { origin, destination, date } = trips[0];
      const originCodes = origin
        .map((place) => (place.placeType === 'airport' ? place.code + 'a' : place.code))
        .join('_');
      const destinationCodes = destination
        .map((place) => (place.placeType === 'airport' ? place.code + 'a' : place.code))
        .join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);

      if (date[1]) {
        // If there's a return date, handle it as a round trip
        const returnDate = dayjs(date[1]).format('YYYY-MM-DD');
        pathSegments.push(`${destinationCodes}-${originCodes}/${returnDate}`);
      }
    } else if (tripType === 'multi-city') {
      pathSegments = trips.map(({ origin, destination, date }) => {
        const originCodes = origin
          .map((place) => (place.placeType === 'airport' ? place.code + 'a' : place.code))
          .join('_');
        const destinationCodes = destination
          .map((place) => (place.placeType === 'airport' ? place.code + 'a' : place.code))
          .join('_');
        const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
        return `${originCodes}-${destinationCodes}/${departureDate}`;
      });
    } else if (tripType === 'one-way' && trips.length > 0) {
      // Handle one-way trips similarly to round-trip but without return segment
      const { origin, destination, date } = trips[0];
      const originCodes = origin
        .map((place) => (place.placeType === 'airport' ? place.code + 'a' : place.code))
        .join('_');
      const destinationCodes = destination
        .map((place) => (place.placeType === 'airport' ? place.code + 'a' : place.code))
        .join('_');
      const departureDate = dayjs(date[0]).format('YYYY-MM-DD');
      pathSegments.push(`${originCodes}-${destinationCodes}/${departureDate}`);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (infants > 0) params.set('infants', String(infants)); else params.delete('infants');
    if (children > 0) params.set('children', String(children)); else params.delete('children');
    if (adults > 1) params.set('adults', String(adults)); else params.delete('adults');
    if (direct) params.set('direct', 'true'); else params.delete('direct');
    if (cabin.id !== 'Economy') {
      params.set('cabin', cabin.id);
    } else {
      params.delete('cabin');
    }

    if (params.get('solo_open')) {
      params.delete('solo_open');
      const query = `/flights/search/${pathSegments.join('/')}${params.toString() ? '?' + params : ''}`;
      window.open(query, '_blank');
      if(process.env.NODE_ENV ==="production"){
      const domain = country && Object(KayakDomains).hasOwnProperty(country?.code?.toUpperCase())
      ? KayakDomains[country?.code?.toUpperCase()].fullDomainName
      : 'https://www.kayak.com';
      window.location.replace(
        `${domain}/in?a=kan_220420&url=/cars/${data?.trips[0]?.destination[0]?.code?.substring(0, 3)}/${dayjs(data?.trips[0]?.date[0]).format('YYYY-MM-DD-HH')}h/${dayjs(data?.trips[0]?.date[0]).add(3,"days").format('YYYY-MM-DD-HH')}h?enc_lid=solo_ad`,
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
    const lastTrip = watch('trips').slice(-1)[0].destination;

    return append({
      origin: lastTrip,
      destination: [],
      date: [dayjs(firstDate).add(7, 'days').toDate(), dayjs(secondDate).add(14, 'days').toDate()],
    });
  };

  const fetchPlace = async (code: string) => {
    const response = await fetchPlacesRequest(code, locale);
    return response[0];
  };

  const getPlaces = async (codes: string[]) => {
    const places = await Promise.all(codes.map((code: string) => fetchPlace(code)));
    return places;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      {/* Content */}
      <div className={styles.contentContainer}>
        {/* header */}
        <div
          className={cn(styles.topSectionContainer, errors.trips ? 'items-start' : 'items-center')}
        >
          <div className={styles.tripTypeContainer}>
            <Controller
              name="tripType"
              control={control}
              render={({ field }) => <TripTypeSelect field={field} />}
            />
          </div>
          {tripType !== 'multi-city' && (
            <>
              {fields.slice(0, 1).map((field, index) => {
                return (
                  <div key={field.id} className="flex w-full">
                    <div className="w-[30%]">
                      <Controller
                        name={`trips[${index}].origin`}
                        control={control}
                        render={({ field }) => (
                          <div className={cn(styles.locationInput)}>
                            <FlightLocationInput
                              field={field}
                              basedOn={
                                index === 0 ? null : watch('trips')[index - 1].destination[0]
                              }
                              variant="flights"
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
                                width="26"
                                height="26"
                                style={{ color: '#2ba6de' }}
                              />
                            </Button>
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
                    <div className="w-[30%]">
                      <Controller
                        name={`trips[${index}].destination`}
                        control={control}
                        render={({ field }) => (
                          <div className={cn(styles.locationInput)}>
                            <FlightLocationInput
                              field={field}
                              basedOn={watch('trips')[index].origin[0]}
                              variant="flights"
                              type="destination"
                            />
                          </div>
                        )}
                      />
                      {errors.trips &&
                        Array.isArray(errors.trips) &&
                        errors.trips[index]?.destination && (
                          <p className={styles.errorMessage}>
                            <ValidationFeedback
                              messageSlug={
                                (errors.trips[index]?.destination as FieldError)?.message
                              }
                            />
                          </p>
                        )}
                    </div>
                    <div className="w-[40%]">
                      <Controller
                        name={`trips[${index}].date`}
                        control={control}
                        render={({ field }) => (
                          <div className={cn(styles.datesContainer)}>
                            <DatesInput
                              isRange={tripType === 'round-trip' ? true : false}
                              showTwoInputs={tripType === 'one-way' ? true : false}
                              field={field}
                              handleAddDateClick={handleAddDateClick}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {tripType === 'multi-city' && !showMultiCityForm ? (
            <div className="flex w-full gap-2">
              <div onClick={() => setShowMultiCityForm(true)} className={styles.multiCityContainer}>
                {legs.map((leg, index) => (
                  <p key={index} className="text-sm font-medium text-primary 2xl:text-base">
                    {leg.origin} - {leg.destination}
                    {index < legs.length - 1 && <span className="px-1">,</span>}
                  </p>
                ))}
              </div>
              <div onClick={() => setShowMultiCityForm(true)} className={styles.multiCityContainer}>
                {legs.map((leg, index) => (
                  <p key={index} className="text-sm font-medium text-primary 2xl:text-base">
                    <FormatDate date={leg.departure} replaceFormatWith={{ dateStyle: 'medium' }} />
                    {index < legs.length - 1 && (
                      <span className="mx-2 h-full border border-gray-400"></span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
          <div className={styles.cabinTravellersSection}>
            <Controller
              name="passengers"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <PassengersInput {...field} />}
            />
            <Controller
              name="cabin"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <CabinSelect {...field} />}
            />
          </div>
          {tripType !== 'multi-city' && (
            <Button variant="default" className={styles.searchButton} type="submit">
              {t('TU9YShZXxLKwg34VDopqU')}
            </Button>
          )}
          {tripType === 'multi-city' && !showMultiCityForm ? (
            <Button variant="default" className={styles.searchButton} type="submit">
              {t('TU9YShZXxLKwg34VDopqU')}
            </Button>
          ) : null}
        </div>

        {/* multi-city section */}
        {tripType === 'multi-city' && showMultiCityForm ? (
          <div className="mx-auto flex w-full flex-col gap-5 py-5 2xl:max-w-[85rem]">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex w-full">
                  <div className="w-[32%]">
                    <Controller
                      name={`trips[${index}].origin`}
                      control={control}
                      render={({ field }) => (
                        <div className={cn(styles.locationInput)}>
                          <FlightLocationInput
                            field={field}
                            basedOn={index === 0 ? null : watch('trips')[index - 1].destination[0]}
                            variant="flights"
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
                              width="26"
                              height="26"
                              style={{ color: '#2ba6de' }}
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
                  </div>

                  <div className="w-[32%]">
                    <Controller
                      name={`trips[${index}].destination`}
                      control={control}
                      render={({ field }) => (
                        <div className={cn(styles.locationInput)}>
                          <FlightLocationInput
                            field={field}
                            basedOn={watch('trips')[index].origin[0]}
                            variant="flights"
                            type="destination"
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
                  <Controller
                    name={`trips[${index}].date`}
                    control={control}
                    render={({ field }) => (
                      <div className={cn(styles.multiCitydatesContainer)}>
                        <DatesInput
                          isRange={tripType === 'round-trip' ? true : false}
                          showTwoInputs={tripType === 'one-way' ? true : false}
                          field={field}
                          handleAddDateClick={handleAddDateClick}
                        />
                      </div>
                    )}
                  />
                  {watchTrips.length > 1 && (
                    <Button
                      variant="outline"
                      className="mx-2 mt-1.5 h-10 w-10 !rounded-full border-none bg-gray-200 !p-0"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <X size={25} />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
        {tripType === 'multi-city' && showMultiCityForm ? (
          <div className={styles.topSectionContainer}>
            {
              // if the active type is multi city show the add flight button
              tripType === 'multi-city' && watchTrips?.length < 6 && (
                <Button
                  variant="outline"
                  className={cn(styles.searchButton, '!bg-transparent hover:!text-primary')}
                  type="button"
                  onClick={appendNewFligh}
                >
                  <Plus />
                  {t('8F4p6uoEdu4p1EczyaD7n')}
                </Button>
              )
            }
            <Button variant="default" className={styles.searchButton} type="submit">
              {t('TU9YShZXxLKwg34VDopqU')}
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ResultSearchBox;
