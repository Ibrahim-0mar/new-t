import { sortAscending, sortDescending } from '@/utils/helper/numbers';
import dayjs from 'dayjs';

export const sortByDepartureAscending = (
  itineraries: TransformedItineraryType[],
  legNumber: number,
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortAscending(
        dayjs(a.legs[legNumber].departure).valueOf(),
        dayjs(b.legs[legNumber].departure).valueOf(),
      ),
  );
  return sorted;
};

export const sortByDepartureDescending = (
  itineraries: TransformedItineraryType[],
  legNumber: number,
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortAscending(
        dayjs(b.legs[legNumber].departure).valueOf(),
        dayjs(a.legs[legNumber].departure).valueOf(),
      ),
  );
  return sorted;
};

export const sortByArrivalAscending = (
  itineraries: TransformedItineraryType[],
  legNumber: number,
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortAscending(
        dayjs(a.legs[legNumber].departure).valueOf(),
        dayjs(b.legs[legNumber].departure).valueOf(),
      ),
  );
  return sorted;
};

export const sortByArrivalDescending = (
  itineraries: TransformedItineraryType[],
  legNumber: number,
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortAscending(
        dayjs(b.legs[legNumber].arrival).valueOf(),
        dayjs(a.legs[legNumber].arrival).valueOf(),
      ),
  );
  return sorted;
};

export const sortByDurationAscending = (
  itineraries: TransformedItineraryType[],
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortAscending(a.duration, b.duration),
  );
  return sorted;
};
export const sortByDurationDescending = (
  itineraries: TransformedItineraryType[],
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortDescending(a.duration, b.duration),
  );
  return sorted;
};

export const sortByPriceAscending = (
  itineraries: TransformedItineraryType[],
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortAscending(a.minPrice, b.minPrice),
  );
  return sorted;
};

export const sortByPriceDescending = (
  itineraries: TransformedItineraryType[],
) => {
  const sorted = itineraries.sort(
    (a: TransformedItineraryType, b: TransformedItineraryType) =>
      sortDescending(a.minPrice, b.minPrice),
  );
  return sorted;
};
