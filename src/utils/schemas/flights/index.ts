import * as yup from 'yup';

// Assuming flightSearchboxOriginType can be validated similarly to this example schema
const flightSearchboxOriginTypeSchema = yup.object({
  code: yup.string().required('flights_code_required'),
});

const tripSchema = yup.object({
  origin: yup.array().of(flightSearchboxOriginTypeSchema).min(1, 'trip_origin_min'),
  destination: yup.array().of(flightSearchboxOriginTypeSchema).min(1, 'trip_destination_min'),
  date: yup
    .array()
    .of(yup.date().nullable('trip_date_required'))
    .min(1, 'trip_date_min')
    .max(2, 'trip_date_max'),
});

const searchboxSchema = yup.object({
  trips: yup
    .array()
    .of(tripSchema)
    .min(1, 'searchbox_trips_min')
    .test('different-origin-destination', 'searchbox_trips_different', function (trips) {
      if (!trips) {
        return true; // No trips to validate
      }

      const errors: any = trips
        .map((trip, index) => {
          if (trip.origin?.[0]?.code === trip.destination?.[0]?.code) {
            return this.createError({
              path: `trips[${index}].origin`,
              message: `searchbox_trip_different`,
            });
          }
          return null;
        })
        .filter((error) => error !== null);

      if (errors.length > 0) {
        throw new yup.ValidationError(errors);
      }

      return true;
    }),
});

export { searchboxSchema };
