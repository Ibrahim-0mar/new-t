import { searchBoxValues } from '@/app/[locale]/hotels/search/[...legs]/page';
import Button from '@/components/common/base/Button';
import Container from '@/components/common/base/Container';
import { OpenedMenuTypes } from '@/sections/airport-transfers/mobile';
import { HotelMobileSearchType } from '@/sections/common/SearchboxSection/hotelsMobile';
import HotelsDatesSelectMobile from '@/sections/common/SearchboxSection/hotelsMobile/HotelsDatesSelectMobile';
import HotelsDestinationInput from '@/sections/common/SearchboxSection/hotelsMobile/HotelsDestinationInput';
import RoomsGuestsMobile from '@/sections/common/SearchboxSection/hotelsMobile/RoomsGuestsMobile';
import { HotelPlace } from '@/services/apis/hotels/places';
import { HotelsMobileSearchSchema } from '@/utils/schemas/hotels';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, FieldError, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './index.module.css';

const HotelsResultsMobileSearchBox = ({
  searchBoxValues,
  destination,
}: {
  searchBoxValues: searchBoxValues;
  destination: HotelPlace;
}) => {
  const { rooms, adults, children, checkIn, checkOut } = searchBoxValues;
  const [openedMenu, setOpenedMenu] = useState<OpenedMenuTypes>('');
  const [openRoomsGuests, setOpenRoomsGuests] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
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
    <Container as="section" className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.mobileSearchBoxForm}>
        <div className={styles.locations}>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className={styles.locations}>
                <Controller
                  name={`trips.${index}.destination`}
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
                  name={`trips.${index}.date`}
                  control={control}
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
    </Container>
  );
};

export default HotelsResultsMobileSearchBox;
