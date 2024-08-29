'use client';
import Button from '@/components/common/base/Button';
import { useState } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './index.module.css';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { OpenedMenuTypes } from '../mobile';
import { HotelsMobileSearchSchema } from '@/utils/schemas/hotels';
import HotelsDatesSelectMobile from './HotelsDatesSelectMobile';
import HotelsDestinationInput from './HotelsDestinationInput';
import RoomsGuestsMobile from './RoomsGuestsMobile';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

export interface HotelMobileSearchType {
  rooms_guests: [number, number, number];
  trips: {
    destination: {
      name: string;
      code: string;
    }[];
    date: [Date, Date];
  }[];
}

const defaultValues: HotelMobileSearchType = {
  rooms_guests: [1, 1, 0], // rooms, adults, children
  trips: [
    {
      destination: [],
      date: [dayjs().add(7, 'days').toDate(), dayjs().add(14, 'days').toDate()],
    },
  ],
};

const HotelsSearchMobile = () => {
  const [openedMenu, setOpenedMenu] = useState<OpenedMenuTypes>('');
  const [openRoomsGuests, setOpenRoomsGuests] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(HotelsMobileSearchSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: 'trips',
  });

  const onSubmit: SubmitHandler<HotelMobileSearchType> = async (values) => {
    try {
      const { rooms_guests, trips } = values;
      const [checkIn, checkOut] = trips[0].date;
      const destination = trips[0].destination[0].name.toLowerCase();
      const code = trips[0].destination[0].code;
      const [rooms, adults, children] = rooms_guests;

      window.open(
        `/hotels/search/${destination}/${code}/${dayjs(checkIn).format('YYYY-MM-DD')}/${dayjs(checkOut).format('YYYY-MM-DD')}?rooms=${rooms}&adults=${adults}&children=${children}`,
        '_blank',
      );
    } catch (err: any) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.mobileSearchBoxForm}>
      <div className={styles.selectionMobileView}></div>
      <div className={styles.locations}>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className={styles.locations}>
              <Controller
                name={`trips[${index}].destination`}
                control={control}
                render={({ field }) => (
                  <div className={styles.locationInput}>
                    <HotelsDestinationInput
                      field={field}
                      openedMenu={openedMenu}
                      setOpenedMenu={setOpenedMenu}
                      listData={[]}
                      listHeader="Nearby airports"
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
                name="rooms_guests"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RoomsGuestsMobile
                    field={field}
                    openRoomsGuests={openRoomsGuests}
                    setOpenRoomsGuests={setOpenRoomsGuests}
                  />
                )}
              />
              <Controller
                name={`trips[${index}].date`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <HotelsDatesSelectMobile
                      field={field}
                      openedMenu={openedMenu}
                      setOpenedMenu={setOpenedMenu}
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
      </div>

      <Button variant="default" className={styles.searchButton} type="submit">
        Search
      </Button>
    </form>
  );
};

export default HotelsSearchMobile;
