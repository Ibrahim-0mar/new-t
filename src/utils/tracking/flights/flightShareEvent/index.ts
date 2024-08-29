import { diffBetweenTwoDates } from '@/utils/helper/dates';
import {
  OnViewTicketTrackingData,
  TicketViewTrackingData,
} from '@/utils/types/flights';
import dayjs from 'dayjs';

export const flightShareTrackingEvent = (data: TicketViewTrackingData) => {
  const {
    adults,
    children,
    infants,
    itinerary,
    searchId,
    sortData,
    ticketPosition,
    tripClass,
    currency,
    tripType
  } = data;

  const daysToDeparture = diffBetweenTwoDates(
    dayjs(itinerary.legs[0]?.departure).toDate(),
    dayjs().toDate(),
    'day',
  );

  const formatDate = (date:string) => {
    return dayjs(date).format('YYYY-MM-DDThh:mm:ss')
  }

  const destination = tripType === "multi" ? itinerary.legs[itinerary.legs?.length - 1]?.destination : itinerary.legs[0]?.destination

  const departureDate = formatDate(itinerary.legs[0]?.departure);
  const returnDate =  formatDate(itinerary.legs[itinerary.legs?.length - 1]?.departure)

  const journeyDuration = dayjs(returnDate).diff(departureDate, "days")

  const firstLeg =  {
    departure: departureDate,
    arrival: formatDate(itinerary.legs[0]?.arrival),
    duration: itinerary.legs[0]?.duration
  }
  
  const secondLeg = {
    departure: returnDate,
    arrival: formatDate(itinerary.legs[itinerary.legs.length - 1]?.arrival),
    duration: itinerary.legs[itinerary.legs?.length - 1]?.duration
  }

  const body: OnViewTicketTrackingData = {
    searchId,
    ticketPosition,
    isCheapest: sortData?.cheapest?.id === itinerary?.id,
    isFastest: sortData?.quickest?.id === itinerary?.id,
    isBest: sortData?.best?.id === itinerary?.id,
    originCode: itinerary.legs[0]?.origin,
    destinationCode: destination,
    firstLeg,
    daysToDeparture,
    tripClass,
    adults,
    children,
    infants,
    price: Number(itinerary.minPrice),
    provider: itinerary.pricingOptions[0]?.agentName,
    currency,
    maxBagaggeValues: itinerary.maxBagaggeValues,
    tripType: data.tripType
  };

  const handleTrackingData = (data: any) => {
    const clonedData = {...data}

    if(data.tripType === "round") clonedData.secondLeg = secondLeg
    if(data.tripType !== "oneway") clonedData.journeyDuration = journeyDuration

    return clonedData
  }

  window?.dataLayer?.push({
    event: 'flightShare',
    data: handleTrackingData(body),
  });
};
