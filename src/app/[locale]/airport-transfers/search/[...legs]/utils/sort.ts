import { sortAscending, sortDescending } from '@/utils/helper/numbers';
import { AirportTransfersItineraryType } from '@/utils/types/airport-transfers/results';

export const sortByDurationAscending = (itineraries: AirportTransfersItineraryType[]) => {
  const sorted = itineraries.sort(
    (a: AirportTransfersItineraryType, b: AirportTransfersItineraryType) =>
      sortAscending(a.duration, b.duration),
  );
  return sorted;
};
export const sortByDurationDescending = (itineraries: AirportTransfersItineraryType[]) => {
  const sorted = itineraries.sort(
    (a: AirportTransfersItineraryType, b: AirportTransfersItineraryType) =>
      sortDescending(a.duration, b.duration),
  );
  return sorted;
};

export const sortByPriceAscending = (itineraries: AirportTransfersItineraryType[]) => {
  const sorted = itineraries.sort(
    (a: AirportTransfersItineraryType, b: AirportTransfersItineraryType) =>
      sortAscending(a.minPrice, b.minPrice),
  );
  return sorted;
};

export const sortByPriceDescending = (itineraries: AirportTransfersItineraryType[]) => {
  const sorted = itineraries.sort(
    (a: AirportTransfersItineraryType, b: AirportTransfersItineraryType) =>
      sortDescending(a.minPrice, b.minPrice),
  );
  return sorted;
};
