import { parse } from '@/utils/helper/json';
import { TransferRedirectPayloadType } from '@/utils/types/airport-transfers';
import dayjs from 'dayjs';

export const transfersRedirectTracking = (
  data: TransferRedirectPayloadType,
  agentName: string,
  success: boolean,
) => {
  const departure_date = dayjs(data.legs[0].departure).format('YYYY-MM-DD');
  const return_date = dayjs(data.legs[1]?.departure).format('YYYY-MM-DD');

  const tripType = data.legs.length === 2 ? 'round' : 'oneway';
  const isRound = tripType === 'round';

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.diff(now, 'day');

  // journey_duration
  const returnDate = dayjs(return_date);
  const journeyDuration = isRound ? returnDate.diff(departureDate, 'day') : -1;

  const legs =
    typeof window !== 'undefined'
      ? parse(localStorage.getItem('airportTransferResultsLegs') || '[]')
      : [];

  const trackingData = {
    price: data.price,
    pickupId: data.legs[0].pickup,
    dropoffId: data.legs[0].dropoff,
    departure: data.legs[0].pickupDateTime,
    daysToDeparture,
    legDuration: legs[0].time,
    tripType,
    adults: data.adults,
    children: data.children,
    infants: data.infants,
    searchId: data.searchId,
    provider: agentName,
    currency: data.currency,
    maxPassengers: data.maxPassengers,
    maxBags: data.maxBags,
    isCheapest: data.isCheapest,
    vehicleType: data.viehcleType,
    success,
  };
  window?.dataLayer?.push({
    event: 'transferRedirect',
    data: isRound
      ? { ...trackingData, return: data.legs[0].returnDateTime, journeyDuration }
      : trackingData,
  });
};
