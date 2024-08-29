import { locale } from '@/navigation';

type AirportTransfersResultType = {
  searchId: string;
  agents: AgentsType;
  legs: BackendLegsType;
  itineraries: BackendItinerariesType;
  itinerariesPrice: any;
};

type LocationType = {
  type: string;
  coordinates: [number, number];
};
type CurrencyType = {
  _id: string;
  code: string;
  name: string;
  symbol: string;
};
type CountryType = {
  _id: string;
  name: string;
  code: string;
  currency: CurrencyType;
};

type CityType = {
  location: LocationType;
  _id: string;
  name: string;
  code: string;
  country: CountryType;
  __v: 2;
  image: {
    _id: string;
    path: string;
    pathWithFilename: string;
    filename: string;
    mime: string;
  };
  agoda_city_id: string;
  imageAlt: string;
  distribusion_code: string;
  placed: boolean;
  combigo_code: string;
};

type AgentType = {
  id: string;
  name: string;
  iataCode: string;
  isAirline: boolean;
};
type AgentsType = { [code: string]: AgentType };

type BackendLegsType = { [code: string]: BackendLegType };

type AirportTransfersLegType = {
  description: string;
  viehcle_type: string;
  model: string;
  make: string;
  time: number;
  max_passengers: number;
  max_bags: number;
  carImage_url: string;
  supporter_providerName: string;
  class: string;
  free_cancellation: boolean;
  id: any;
};

type BackendItineraryType = {
  id: string;
  legs: string[];
  pricingOptions: TransfersPricingOption[];
  isFavorite: boolean;
};
type BackendItinerariesType = { [code: string]: BackendItineraryType };

type AirportTransfersItineraryType = {
  id: string;
  legs: AirportTransfersLegType[];
  pricingOptions: TransfersPricingOption[];
  isFavorite: boolean;
  minPrice: number;
  duration: number;
};

type TransfersPricingOption = {
  agent: string;
  agentName: string;
  deepLink: string;
  price: priceType;
};

type airportTransferPriceType = {
  amount: number;
  person?: number;
  currency: string;
  discount?: number;
  type?: string;
};

type airportTransferFilterPricesType = {
  bookingSites: { [id: string]: number };
  duration: [number, number];
  price: [number, number];
  vehicleMake: { [id: string]: number };
  vehicleType: { [id: string]: number };
};
type airportTransferSortType =
  | 'cheapest'
  | 'best'
  | 'quickiest'
  | 'airlinesAZ'
  | 'airlinesZA'
  | 'durationShort'
  | 'durationLong'
  | 'departureEarliest'
  | 'departureLatest'
  | 'arrivalEarliest'
  | 'arrivalLatest';

type AirportTransfersRedirectPayloadType = {
  searchId: string;
  visitorId: string;
  itineraryId: string;
  adults: number | string;
  children: number | string;
  infants: number | string;
  price: string;
  currency: string;
  token: string;
  type: 'transfer';
  utm_source: string | undefined;
  legs: any;
};

type TransfersLeg = {
  departure: string;
};

type TransfersTrackingData = {
  tripType: 'round' | 'oneway';
  legs: TransfersLeg[];
  currency: CurrencyType;
  visitorId: string;
  adults: number;
  children: number;
  infants: number;
  language: locale;
  pickupId: string | null;
  dropoffId: string | null;
  pickupDateTime: string;
  returnDateTime: string | null;
};
