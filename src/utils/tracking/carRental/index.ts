import dayjs from 'dayjs';

export const carRentalSearchStart = (data: any) => {
  const {
    pickup,
    dropoff,
    dropoffType,
    pickupDate: dateOfPickup,
    returnDate: dateOfDropoff,
  } = data;
  const sameDropOff = dropoffType.id === 'same';
  const pickupCode = pickup[0].code;
  const dropoffCode = sameDropOff ? pickup[0].code : dropoff.length > 0 ? dropoff[0].code : null;
  const pickupDate = dayjs(dateOfPickup).format('YYYY-MM-DDThh:mm:ss');
  const dropoffDate = dayjs(dateOfDropoff).format('YYYY-MM-DDThh:mm:ss');

  const trackingData = {
    sameDropOff,
    pickupCode,
    dropoffCode,
    pickupDate,
    dropoffDate,
  };

  window.dataLayer.push({
    event: 'carRentalSearchStart',
    data: trackingData,
  });
};
