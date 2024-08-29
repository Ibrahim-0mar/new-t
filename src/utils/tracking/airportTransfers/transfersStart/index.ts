import { TransfersTrackingData } from '@/utils/types/airport-transfers/results';
import dayjs from 'dayjs';

export const airportTransfersStartTracking = (body: TransfersTrackingData, searchId: string) => {
  const departure_date = body.legs[0].departure;
  const return_date = body.legs[1]?.departure;
  const isRoundTrip = body.tripType === 'round';

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.diff(now, 'day');

  // journey_duration
  const returnDate = dayjs(return_date);
  const journeyDuration = isRoundTrip ? returnDate.diff(departureDate, 'day') : -1;

  const data = {
    method: 'normal',
    pickupId: body.pickupId,
    dropoffId: body.dropoffId,
    departure: body.pickupDateTime,
    daysToDeparture,
    journeyDuration,
    tripType: body.tripType,
    adults: body.adults,
    children: body.children,
    infants: body.infants,
    searchId,
  };

  window?.dataLayer?.push({
    event: 'transferSearchStart',
    data: isRoundTrip ? { ...data, return: body.returnDateTime } : data,
  });
};
