export type FlightPoint = {
  code: string | null;
  type: 'country' | 'city' | 'airport';
  name?: string;
};

export type DynamicPageSectionProps = {
  origin: FlightPoint;
  destination: FlightPoint;
};

export type FlightInformation = {
  Origin: string;
  Destination: string;
  Price: string;
  currency: string;
  Airline: string;
  CheapestMonth: string;
  FlightPerWeekCount: number;
  AirlineName: string;
};

export type PopularFlight = {
  PopularFlights: {
    origin: string;
    destination: string;
    tripType: string;
    cabinClass: string;
    departure: string;
    price: string;
    currency: string;
    monthName: string;
  };
};

export type PopularFlightsData = PopularFlight[];

export type AirlineCompItemType = {
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
    image_url: string;
    image: {
      pathWithFilename: string;
      path: string;
      url: string;
    };
  };
};

export type AirlineCompData = AirlineCompItemType[];

export type FlightPriceData = {
  [key: string]: {
    currency: string;
    price: number;
  };
};

// types for dynamic pages FAQs

type Flight = {
  originalDeparture: string;
  departureDate: string;
  departureTime: string;
  original_arrival: string;
  arrivalDate: string;
  arivalTime: string;
  price: number;
  currency: string;
  stopsCount: number;
  duration: number;
};

type Airline = {
  code: string;
  name: string;
};

type FlightData = {
  airlines: Airline[];
  cheapestFlight: Flight;
  durations: {
    shortest: number;
    longest: number;
  };
};

export type FaqsData = {
  origin?: FlightData;
  originDestination?: FlightData;
};
