import { flightRedirectTrackingData } from '@/utils/types/flights';
import dayjs from 'dayjs';

export const flightRedirectTracking = (
  data: flightRedirectTrackingData,
  agentName: string,
  success: boolean,
) => {
  if(!data.itenraries || !Array.isArray(data.itenraries) || data.itenraries.length === 0) return
  if(!data.itenraries[0].departure || !data.itenraries[0].arrival || !data.itenraries[0].origin || !data.itenraries[0].destination) return
  
  const formatDate = (date:string) => {
    return dayjs(date).format('YYYY-MM-DDThh:mm:ss')
  }

  const departure_date = formatDate(data.itenraries[0].departure);
  const return_date = formatDate(data.itenraries[data.itenraries.length - 1].departure);

  // days_to_departure
  const now = dayjs();
  const departureDate = dayjs(departure_date);
  const daysToDeparture = departureDate.isValid() ?  departureDate.diff(now, 'day') : null;

  const destination = data.type === "multi" ? data.itenraries[data.itenraries.length - 1].destination : data.itenraries[0].destination

  const firstLeg =  {
    departure: departure_date,
    arrival: formatDate(data.itenraries[0].arrival),
    duration: dayjs(data.itenraries[0].arrival).diff(data.itenraries[0].departure, "minutes")
  }
  
  const secondLeg = {
    departure: return_date,
    arrival: formatDate(data.itenraries[data.itenraries.length - 1].arrival),
    duration: dayjs(data.itenraries[data.itenraries.length - 1].arrival).diff(data.itenraries[data.itenraries.length - 1].departure, "minutes"),
  }

  const journeyDuration = dayjs(return_date).diff(departure_date, "days")

  const trackingData = {
    price: data.price,
    originCode: data.itenraries[0].origin,
    destinationCode: destination,
    daysToDeparture,
    tripType: data.type,
    adults: data.adults,
    currency: data.currency,
    children: data.children,
    infants: data.infants,
    searchId: data.searchId,
    provider: agentName,
    tripClass: data.cabin,
    success,
    // firstLeg: {departure: departure_date, arrival: formatDate(data.itenraries[0].arrival)}
    firstLeg
  }

  const handleTrackingData = (trackingData: any) => {
    const clonedData = {...trackingData}

    if(data.type === "round") clonedData.secondLeg = secondLeg
    if(data.type !== "oneway") clonedData.journeyDuration = journeyDuration

    return clonedData
  }

  window?.dataLayer?.push({
    event: 'flightRedirect',
    // data: data.type === "round" ? {...trackingData, secondLeg: {departure: return_date, arrival: formatDate(data.itenraries[data.itenraries.length - 1].arrival)}} : trackingData,
    data: handleTrackingData(trackingData),
  });
};

// mediaalpha
// clicktripx
// googleads
// kayak