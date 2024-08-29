import dayjs, { Dayjs } from 'dayjs';

export const transferCompleteTracking = (
  body: any,
  results: FlightResultType,
  numberOfProvidersSent: number,
  faildProfiders: string[],
  searchStartTime?: null | Dayjs,
) => {
  const departure_date = body.legs[0].departure;
  const return_date = body.legs[1]?.departure;
  const isRound = body.tripType === 'round';

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.diff(now, 'day');

  // journey_duration
  const returnDate = dayjs(return_date);
  const journeyDuration = isRound ? returnDate.diff(departureDate, 'day') : -1;
    
  const bookingSites = Object.keys(results.agents).map((key) => {
    return results.agents[key].name;
  });

  const numberOfResults = results.itinerariesPrice.length;

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
    searchId: results.searchId,
    searchDuration: dayjs().diff(searchStartTime, 'second'),
    cheapestTicketPrice: results.itinerariesPrice[0]?.minPrice,
    cheapestTicketProvider: results.itinerariesPrice[0]?.pricingOptions[0]?.agentName,
    currency:results?.itinerariesPrice[0]?.pricingOptions[0]?.price?.currency,
    numberOfProvidersSent: numberOfProvidersSent,
    numberOfProvidersFailed: faildProfiders.length,
    failedProviders: faildProfiders,
    numberOfResults,
  }

  const handleFinalData = (data: any) => {
    const clonedDate = {...data}

    if(isRound) clonedDate.return = body.returnDateTime
    if(bookingSites.length > 0) clonedDate.bookingSites = JSON.stringify(bookingSites)

    return clonedDate
  }

  window?.dataLayer?.push({
    event: 'transferSearchComplete',
    data: handleFinalData(data),
  });
};

