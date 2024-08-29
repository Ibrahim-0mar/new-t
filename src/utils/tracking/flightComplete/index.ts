
import dayjs, { Dayjs } from 'dayjs';

/*
1- delete journeyDuration [done]
2- firstLeg & secondLeg (without arrival) [done]
3- faildProfiders (only the hashed part) [done]
4- if no results, don't pass the airlines & bookingSites [done]
*/


export const flightCompleteTracking = async (
  body: any,
  results: FlightResultType,
  numberOfProvidersSent: number,
  faildProfiders: string[],
  searchStartTime?: null | Dayjs,
) => {
  //  Verify body and legs are defined and have the required structure
  if (!body.legs || body.legs.length === 0) return
  if (!body.legs[0].departure || !body.legs[body.legs.length - 1]?.departure) return

  const departure_date = body.legs[0].departure;
  const return_date = body.legs[body.legs.length - 1]?.departure;

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.diff( now, 'day');
  
  const journeyDuration = dayjs(return_date).diff(departureDate, "days")

  const allAirlines = Object.values(results.airlines).map(
    (airline: any) => airline.name,
  );

  const bookingSites = Object.keys(results.agents).map((key) => {
    return results.agents[key].name;
  });

  const numberOfResults = results.itinerariesPrice.length;

  const trackingData = {
    method: 'normal',
    originCode: JSON.stringify(body.legs[0].origin),
    destinationCode: JSON.stringify(body.legs[0].destination),
    firstLeg: {departure: departure_date},
    daysToDeparture: daysToDeparture,
    tripType: body.tripType,
    tripClass: body.cabinClass,
    adults: body.adults,
    children: body.children,
    infants: body.infants,
    searchId: results.searchId,
    directFlightsOnly: body.directFlight,
    searchDuration: dayjs().diff(searchStartTime, 'second'),
    numberOfResults: numberOfResults,
    currency: body.currency,
    numberOfProvidersSent: numberOfProvidersSent,
    numberOfProvidersFailed: faildProfiders.length,
    failedProviders: faildProfiders,
  }

  const handleTrackingData = (data: any) => {
    const clonedData = {...data}

    if(body.tripType === "round") clonedData.secondLeg =  {departure: return_date}
    if(allAirlines.length > 0) clonedData.airlines = JSON.stringify(allAirlines)
    if(bookingSites.length > 0) clonedData.bookingSites = JSON.stringify(bookingSites)
    if(results.itinerariesPrice[0]?.pricingOptions[0]?.agentName) clonedData.cheapestTicketProvider = results.itinerariesPrice[0]?.pricingOptions[0]?.agentName
    if(results.itinerariesPrice[0]?.minPrice) clonedData.cheapestTicketPrice = results.itinerariesPrice[0]?.minPrice
    if(data.tripType !== "oneway") clonedData.journeyDuration = journeyDuration
    
    return clonedData
  }

  window?.dataLayer?.push({
    event: 'flightSearchComplete',
    data: handleTrackingData(trackingData),
  });
};

