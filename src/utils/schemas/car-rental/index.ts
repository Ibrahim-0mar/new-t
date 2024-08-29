import * as yup from 'yup';

const placeSchema = yup.object({
  code: yup.string().required('place_id_required'),
});

const carRentalSearchboxSchema = yup
  .object({
    pickup: yup
      .array()
      .of(placeSchema)
      .min(1, 'transfers_pickup_min')
      .max(1, 'transfers_pickup_max'),
    dropoff: yup.array().of(placeSchema).max(1, 'transfers_dropoff_max').optional(),
    dropoffType: yup.object({id: yup.string(), title: yup.string()}).optional()
  })
  .test('different-pickup-dropoff', 'transfers_locations_different', function (values) {
    const pickup = values.pickup || [];
    const dropoff = values.dropoff || [];

    if (pickup[0]?.code === dropoff[0]?.code) {
      return this.createError({
        path: 'conflict',
        message: 'transfers_locations_different',
      });
    }

    // If the dropoff type is set to different but there's no dropoff value, throw an error
    if (values.dropoffType?.id === "different" && !dropoff[0]?.code) {
      return this.createError({
        path: 'dropoff',
        message: 'transfers_dropoff_min',
      });
    }
    return true;
  });

export { carRentalSearchboxSchema };
