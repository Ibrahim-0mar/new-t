'use client';
import Button from '@/components/common/base/Button';
import HotelDateInput from '@/components/hotels/searchBox/HotelDateInput';
import HotelLocationInput from '@/components/hotels/searchBox/HotelLocationInput';
import RoomsGuestsInput from '@/components/hotels/searchBox/RoomsGuests';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { cn } from '@/utils/helper/tailwind_cn';
import { HotelsSearchSchema } from '@/utils/schemas/hotels';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Controller, FieldError, SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.css';

interface Location {
  type: 'Point';
  coordinates: number[]; // Assuming the coordinates array contains two numbers (latitude and longitude).
}

interface Place {
  cityCode: string;
  code: string;
  countryCode: string;
  location: Location;
  name: string;
  phrase: string;
  placeType: 'hotels';
}

interface HotelSearchType {
  destination: Place[];
  date: [Date, Date];
  rooms_guests: [number, number, number] /* [rooms , adults, children] */;
}

const HotelsSearch = () => {
  const {
    handleSubmit,
    control,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<any>({
    defaultValues: {
      rooms_guests: [1, 1, 0],
      date: [dayjs().add(1, 'days').toDate(), dayjs().add(7, 'days').toDate()],
      destination: '',
    },
    resolver: yupResolver(HotelsSearchSchema),
  });

  const onSubmit: SubmitHandler<HotelSearchType> = async (values) => {
    try {
      const { destination, date, rooms_guests } = values;
      const [checkIn, checkOut] = date;
      const [rooms, adults, children] = rooms_guests;

      window.open(
        `/hotels/search/${formatString(destination[0]?.name.toLowerCase())}/${destination[0].code}/${dayjs(checkIn).format('YYYY-MM-DD')}/${dayjs(checkOut).format('YYYY-MM-DD')}?rooms=${rooms}&adults=${adults}&children=${children}`,
        '_blank',
      );
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.bottomSection}>
        <div className={styles.destinationContainer}>
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <HotelLocationInput field={field} listData={[]} listHeader="Nearby airports" />
            )}
          />
          {errors?.destination && (
            <p className={cn(styles.errorMessage, 'px-5')}>
              {(errors?.destination as FieldError)?.message ===
                'destination must be a `array` type, but the final value was: `""`.' ? (
                <ValidationFeedback messageSlug="hotels_destination_min" />
              ) : (
                <ValidationFeedback messageSlug={(errors?.destination as FieldError)?.message} />
              )}
            </p>
          )}
        </div>
        <div className={styles.dateContainer}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <HotelDateInput
                isRange={true}
                showTwoInputs={false}
                field={field}
                handleAddDateClick={() => { }}
              />
            )}
          />
          <div>
            {errors?.date && (
              <p className={cn(styles.errorMessage, 'px-5 text-start')}>
                Check in and check out dates are required
              </p>
            )}
          </div>
        </div>
        <div
          className={styles.rooms}
        >
          <Controller
            name="rooms_guests"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <RoomsGuestsInput {...field} />}
          />
        </div>
        <Button
          isLoading={isLoading || isSubmitting}
          variant="default"
          className={cn(styles.searchButton, 'h-fit !w-fit !px-4')}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default HotelsSearch;
