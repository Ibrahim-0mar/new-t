import * as yup from 'yup';

// desktop schema

const HotelsSearchSchema = yup.object({
  destination: yup
    .array()
    .of(
      yup.object().shape({
        code: yup.string().required('hotels_destination_code'),
        name: yup.string().required('hotels_destination_name'),
        phrase: yup.string().required('hotels_destination_phrase'),
        cityCode: yup.string().required('hotels_destination_city'),
        countryCode: yup.string().required('hotels_destination_country'),
        location: yup
          .object()
          .shape({
            type: yup.string().required('hotels_destination_location_type'),
            coordinates: yup
              .array()
              .of(yup.number())
              .min(2, 'hotels_destination_coordinates_min')
              .max(2, 'hotels_destination_coordinates_max')
              .required('hotels_destination_coordinates_required'),
          })
          .required('hotels_destination_location_required'),
        placeType: yup.string().required('hotels_destination_place'),
      }),
    )
    .min(1, 'hotels_destination_min')
    .required('hotels_destination_required'),
  date: yup.tuple([yup.date().required(), yup.date().required()]).required('hotels_date_required'),
  rooms_guests: yup
    .tuple([
      yup.number().required('hotels_guests_room'),
      yup.number().required('hotels_guests_adult'),
      yup.number().required('hotels_guests_child'),
    ])
    .required('hotels_guests_required'),
});

// Schema for a single trip
const tripSchema = yup.object({
  destination: yup
    .array()
    // .of(destinationSchema)
    .min(1, 'trip_destination_min')
    .required('hotels_destination_required'),
  date: yup.tuple([yup.date().required(), yup.date().required()]).required('trip_date_required'),
});

// Main schema for the mobile hotel search
const HotelsMobileSearchSchema = yup.object({
  rooms_guests: yup
    .tuple([
      yup.number().required('hotels_guests_room'),
      yup.number().required('hotels_guests_adult'),
      yup.number().required('hotels_guests_child'),
    ]) // Enforce tuple of three numbers
    .required('hotels_guests_required'),
  trips: yup
    .array()
    .of(tripSchema)
    .min(1, 'searchbox_trips_min')
    .required('searchbox_trips_required'),
});

export { HotelsMobileSearchSchema, HotelsSearchSchema };
