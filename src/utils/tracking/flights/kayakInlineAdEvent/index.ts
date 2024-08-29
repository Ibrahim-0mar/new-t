import dayjs from 'dayjs';

export const kayakInlineAdsTraking = (data: any) => {
  //  Verify data and legs are defined and have the required structure
  if (!data.legs || data.legs.length === 0) return;
  if (!data.legs[0].departure || !data.legs[data.legs.length - 1]?.departure) return;

  const departure_date = data.legs[0].departure;
  const return_date = data.legs[data.legs.length - 1]?.departure;

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.isValid() ? departureDate.diff(now, 'day') : null;

  const destination =
    data.tripType === 'multi'
      ? data.legs[data.legs.length - 1].destination[0]
      : data.legs[0].destination[0];

  const journeyDuration = dayjs(return_date).diff(departureDate, 'days');

  const trackingData = {
    placement: 'inline',
    journeyDuration,
    originCode: data.legs[0].origin[0],
    destinationCode: destination,
    daysToDeparture,
    tripType: data.tripType,
    tripClass: data.cabinClass,
    adults: data.adults,
    children: data.children,
    infants: data.infants,
    searchId: data.searchId,
    firstLeg: { departure: departure_date },

    cpcEstimatePrice: data.cpcEstimate.price,
    cpcEstimateCurrency: data.cpcEstimate.currency,
    rank: data.rank,
    site: data.site,
    companyName: data.companyName,
  };

  const handleTrackingData = (data: any) => {
    const clonedData = { ...data };

    if (data.tripType === 'round') clonedData.secondLeg = { departure: return_date };
    if (data.tripType !== 'oneway') clonedData.journeyDuration = journeyDuration;

    return clonedData;
  };

  window.dataLayer.push({
    event: 'kayakClick',
    data: handleTrackingData(trackingData),
  });
};
