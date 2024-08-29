import dayjs from 'dayjs';

export const flightSelectTracking = (flightSelectTrackingData:any) => {
  const formatDate = (date:string) => {
    return dayjs(date).format('YYYY-MM-DDThh:mm:ss')
  }

  const {
    fare,
    searchId,
    adults,
    childrenNo: children,
    infants,
    itineraryId,
    tripType,
    cabinClass: tripClass,
    sortedData,
    legs,
    sponsored
  } = flightSelectTrackingData;

  if(!legs || legs.length === 0) return
  if(!legs[0].origin || !legs[0].destination || !legs[0].departure || !legs[0].arrival) return

  const departure = formatDate(legs[0]?.departure);
  const returnDate =  formatDate(legs[legs.length - 1].departure)

  // days to departure
  const now = dayjs();
  const departure_Date = dayjs(departure);
  const daysToDeparture = departure_Date.isValid() ?  departure_Date.diff(now, 'day') : null;

  const destinationCode = tripType === "multi" ? legs[legs.length - 1].destination : legs[0].destination

  const journeyDuration = dayjs(returnDate).diff(departure, "days")

  const firstLeg =  {
    departure,
    arrival: formatDate(legs[0].arrival),
    duration: legs[0].duration
  }
  
  const secondLeg = {
    departure: returnDate,
    arrival: formatDate(legs[legs.length - 1].arrival),
    duration: legs[legs.length - 1].duration
  }

  const data = {
    price: Number(fare?.price?.amount),
    originCode: legs[0]?.origin,
    destinationCode,
    daysToDeparture,
    tripType,
    adults,
    currency: fare?.price?.currency,
    children,
    infants,
    searchId,
    provider: fare?.agentName,
    tripClass,
    // firstLeg: {departure: departure, arrival: formatDate(legs[0].arrival)},
    firstLeg,
    isCheapest: sortedData?.cheapest?.id === itineraryId,
    isFastest: sortedData?.quickest?.id === itineraryId,
    isBest: sortedData?.best?.id === itineraryId,
    sponsored: sponsored || false
  };

  const handleTrackingData = (data: any) => {
    const clonedData = {...data}

    // if(tripType === "round" ) clonedData.secondLeg = {departure: returnDate, arrival: formatDate(legs[legs.length - 1].arrival)}
    if(tripType === "round" ) clonedData.secondLeg = secondLeg
    if(fare?.meta && fare?.meta?.baggage) clonedData.maxBagaggeValues = fare?.meta?.baggage
    if(tripType !== "oneway") clonedData.journeyDuration = journeyDuration

    return clonedData
  }

  window?.dataLayer?.push({
    event: 'flightSelect',
    data: handleTrackingData(data),
  });
};
