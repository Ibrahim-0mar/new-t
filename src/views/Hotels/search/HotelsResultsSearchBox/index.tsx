import { searchBoxValues } from '@/app/[locale]/hotels/search/[...legs]/page';
import Button from '@/components/common/base/Button';
import DatesInput from '@/components/flights/searchbox/inputs/DatesInput';
import HotelLocationInput from '@/components/hotels/searchBox/HotelLocationInput';
import { HotelMobileSearchType } from '@/sections/common/SearchboxSection/hotelsMobile';
import RoomsGuestsMobile from '@/sections/common/SearchboxSection/hotelsMobile/RoomsGuestsMobile';
import { HotelPlace } from '@/services/apis/hotels/places';
import { HotelsMobileSearchSchema } from '@/utils/schemas/hotels';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { UserRound } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './index.module.css';

const HotelsResultsSearchBox = ({
  searchBoxValues,
  destination,
}: {
  searchBoxValues: searchBoxValues;
  destination: HotelPlace;
}) => {
  const { rooms, adults, children, checkIn, checkOut } = searchBoxValues;
  const [openRoomsGuests, setOpenRoomsGuests] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<HotelMobileSearchType>({
    defaultValues: {
      rooms_guests: [rooms, adults, children],
      trips: [
        {
          destination: [destination],
          date: [dayjs(checkIn).toDate(), dayjs(checkOut).toDate()],
        },
      ],
    },
    resolver: yupResolver(HotelsMobileSearchSchema),
  });
  const { fields } = useFieldArray({
    control,
    name: 'trips',
  });
  const rooms_guests = watch('rooms_guests');

  const onSubmit: SubmitHandler<HotelMobileSearchType> = (values) => {
    try {
      const { rooms_guests, trips } = values;
      const [checkIn, checkOut] = trips[0].date;
      const destination = trips[0].destination[0].name.toLowerCase();
      const code = trips[0].destination[0].code;
      const [rooms, adults, children] = rooms_guests;

      window.location.href = `/hotels/search/${destination}/${code}/${dayjs(checkIn).format('YYYY-MM-DD')}/${dayjs(checkOut).format('YYYY-MM-DD')}?rooms=${rooms}&adults=${adults}&children=${children}`;
    } catch (err: any) {}
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className={styles.bottomSection}>
              <div className={styles.destinationContainer}>
                <Controller
                  name={`trips.${index}.destination`}
                  control={control}
                  render={({ field }) => (
                    <HotelLocationInput field={field} listData={[]} listHeader="Nearby airports" />
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
              <div className="flex w-[40%] items-end justify-between 2xl:w-[35%] ">
                <Controller
                  name={`trips.${index}.date`}
                  control={control}
                  render={({ field }) => (
                    <DatesInput
                      isRange={true}
                      showTwoInputs={false}
                      field={field}
                      handleAddDateClick={() => {}}
                    />
                  )}
                />
                <div>
                  {errors.trips && Array.isArray(errors.trips) && errors.trips[index]?.date && (
                    <p className={styles.errorMessage}>
                      <ValidationFeedback
                        messageSlug={(errors.trips[index]?.date as FieldError)?.message}
                      />
                    </p>
                  )}
                </div>
              </div>
              <div className="relative">
                <Controller
                  name="rooms_guests"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RoomsGuestsMobile
                      field={field}
                      openRoomsGuests={openRoomsGuests}
                      setOpenRoomsGuests={setOpenRoomsGuests}
                      desktop={true}
                    />
                  )}
                />

                <div className="flex w-full items-center justify-between">
                  <div
                    onClick={() => setOpenRoomsGuests(!openRoomsGuests)}
                    className="flex w-[80%] cursor-pointer select-none items-center justify-start gap-5 rounded-full border border-primary px-5 py-2.5"
                  >
                    <UserRound size={23} className="text-sixth" />
                    <p>
                      {rooms_guests[0]}
                      {rooms_guests[0] > 1 ? ' Rooms' : ' Room'}
                      <span className="px-1">,</span>
                      {rooms_guests[1]}
                      {rooms_guests[1] > 1 ? ' Adults' : ' Adult'}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <Button variant="default" type="submit" className={styles.searchButton}>
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </form>
    </section>
  );
};

export default HotelsResultsSearchBox;
