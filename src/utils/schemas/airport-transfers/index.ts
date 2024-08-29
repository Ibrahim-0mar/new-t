import * as yup from 'yup';

const placeSchema = yup.object({
  place_id: yup.string().required('place_id_required'),
});

const airportTransfersSearchboxSchema = yup
  .object({
    pickup: yup
      .array()
      .of(placeSchema)
      .min(1, 'transfers_pickup_min')
      .max(1, 'transfers_pickup_max'),
    dropoff: yup
      .array()
      .of(placeSchema)
      .min(1, 'transfers_dropoff_min')
      .max(1, 'transfers_dropoff_max'),
  })
  .test('different-pickup-dropoff', 'transfers_locations_different', function (value) {
    const pickup = value.pickup || [];
    const dropoff = value.dropoff || [];

    if (pickup[0]?.place_id === dropoff[0]?.place_id) {
      return this.createError({
        path: 'conflict',
        message: 'transfers_locations_different',
      });
    }
    return true;
  });

export { airportTransfersSearchboxSchema };
