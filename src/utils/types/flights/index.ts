import { SortBarData } from '@/views/flights/search/FlightResults';
import { FieldError } from 'react-hook-form';

export type placesType = {
  data: Array<placeType>;
};

export type placeType = {
  code: string;
  name: string;
  phrase: string;
  cityCode: string;
  countryCode: string;
  location?: {
    type: string;
    coordinates: Array<number>;
  };
  placeType: string;
};

export type BestDealsCardType = {
  id: string;
  origin: placeType;
  destination?: string;
  city: { name: string; code: string };
  prices: { oneway: string; round: string };
  image: string;
  currencyCode: string;
  destinationCity: string;
  cardClassName?: string;
};

export type TopFlightType = {
  id: string;
  image: string;
  destination?: string;
  prices: {
    oneway: string;
    round: string;
  };
  airport?: {
    name: string;
    phrase: string;
  };
  href: string;
  origin?: string;
};

export type TopCountryType = {
  id: string;
  origin: string;
  destination: string;
  rank?: number;
  originCity?: string;
  destinationCity?: string;
  prices: {
    oneway: string;
    round: string;
  };
  country: {
    code: string;
    name: string;
  };
  image: string;
  href: string;
};

export type segmentType = {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  marketingCarrier: string;
  operatingCarrier: string;
  marketingFlightNumber: string;
  vehicleType: string;
  duration: number;
};
export type vehicleTypes = 'FLIGHT' | 'TRAINS' | 'BUS';

export type marketingCarriers = {
  name: string;
  image: { pathWithFilename: string };
  city: { name: string };
};
export type legType = {
  id: string;
  origin: string;
  departure: string;
  destination: string;
  arrival: string;
  segments: segmentType[];
  stopCount: number;
  marketingCarriers: marketingCarriers[];
  marketingCarriersDetails: marketingCarriers[];
  vehicleType: vehicleTypes[];
  duration: 590;
};
export type pricingOptionType = {
  agent: string;
  agentName: string;
  deepLink: string;
  price: {
    amount: string | number;
    currency: string;
    person?: string;
  };
};

export type TransformedFlightItineraryProps = {
  id: string;
  legs: legType[];
  pricingOptions: pricingOptionType[];
  isFavorite: false;
};

export type flightSearchboxOriginType = {
  name: string;
  phrase: string;
  placeType: string;
  cityCode: string;
  code: string;
  countryCode: string;
  location: { type: string; coordinates: Array<number> };
};

export type flightSearchboxType = {
  passengers: [number, number, number];
  cabin: { id: string; title: string };
  tripType: string;
  origin: flightSearchboxOriginType[];
  destination: flightSearchboxOriginType[];
  date: [Date, Date | undefined];
  errors: FieldError | undefined;
  direct: boolean;
};

export type flightRedirectPayloadType = {
  searchId: string;
  visitorId: string;
  itineraryId: string;
  adults: number | string;
  children: number | string;
  infants: number | string;
  price: string;
  currency: string;
  token: string;
  type: string;
  country: string;
  utm_source: string | undefined;
  segments: any;
};

export type flightRedirectTrackingData = {
  searchId: string;
  visitorId: string;
  itineraryId: string;
  adults: number | string;
  children: number | string;
  infants: number | string;
  price: string;
  currency: string;
  token: string;
  type: string;
  country: string;
  utm_source: string | undefined;
  segments: any;
  cabin: string;
  itenraries: {
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    marketingCarriers: string[];
    stopCount: string | number;
}[]
};

export type FlightTicket = {
  cabinClass: string;
  adults: number;
  children: number;
  infants: number;
  language: string;
  tripType: string;
  legs: {
    origin: string;
    originName: string;
    destination: string;
    destinationName: string;
  };
  departure: string;
  currency: string;
  price: number;
  airline: {
    code: string;
    name: string;
    image_url:string;
  };
};

export interface TicketViewTrackingData {
  searchId: string;
  ticketPosition: number;
  itinerary: any;
  tripClass: string;
  sortData: SortBarData;
  adults: number;
  children: number;
  infants: number;
  currency: string;
  tripType: string
  // amenities?: any;
}

export type OnViewTicketTrackingData = {
  searchId: string;
  ticketPosition: number;
  isCheapest: boolean;
  isFastest: boolean;
  isBest: boolean;
  originCode: string;
  destinationCode: string;
  firstLeg: {departure: string, arrival: string};
  secondLeg?: {departure: string, arrival: string};
  return?: string | null;
  daysToDeparture: number;
  tripClass: string;
  adults: number;
  children: number;
  infants: number;
  price: number;
  provider: string;
  currency: string;
  maxBagaggeValues: BaggageAllowance;
  tripType: string
  // amenities?: any;
};
