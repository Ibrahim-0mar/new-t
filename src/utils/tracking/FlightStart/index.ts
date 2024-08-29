import dayjs from 'dayjs';

export const flightStartTracking = (body: any, searchId: string) => {
  //  Verify body and legs are defined and have the required structure
  if (!body.legs || body.legs.length === 0) return
  if (!body.legs[0].departure || !body.legs[body.legs.length - 1]?.departure) return

  const departure_date = body.legs[0].departure;
  const return_date = body.legs[body.legs.length - 1]?.departure;

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.isValid() ? departureDate.diff(now, 'day'): null;

  const destination = body.tripType === "multi" ? body.legs[body.legs.length - 1].destination : body.legs[0].destination

  const journeyDuration = dayjs(return_date).diff(departureDate, "days")

  const trackingData = {
    method: 'normal',
    originCode: JSON.stringify(body.legs[0].origin),
    destinationCode: JSON.stringify(destination),
    daysToDeparture,
    tripType: body.tripType,
    tripClass: body.cabinClass,
    adults: body.adults,
    children: body.children,
    infants: body.infants,
    searchId: searchId,
    directFlightsOnly: body.directFlight,
    firstLeg: {departure: departure_date}
  }
  
  const handleTrackingData = (data: any) => {
    const clonedData = {...data}

    if(data.tripType === "round") clonedData.secondLeg = {departure: return_date}
    if(data.tripType !== "oneway") clonedData.journeyDuration = journeyDuration

    return clonedData
  }

  window?.dataLayer?.push({
    event: 'flightSearchStart',
    data: handleTrackingData(trackingData),
  });
};


