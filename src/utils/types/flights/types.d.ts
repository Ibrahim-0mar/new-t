
type SearchOptions = {
  orig_city: any;
  tripType: 'multi' | 'round' | 'oneway';
  currency: string;
  country: string;
  language: string;
  legs: SearchOptionLeg[];
  adults: number;
  children: number;
  origin: any;
  destination: any;
  infants: number;
  cabinClass: string;
  visitorId?: string;
  userData: {
    ip: string;
    country_code: string;
    location: number[];
    _id?: string;
  };
  nomadLocation: [{ locations: [string]; nights_range: [number] }];
  type: string;
  logId?: any;
  nearbyAirportOne?: boolean;
  nearbyAirportTwo?: boolean;
  searchId?: string;
};

type SearchTransfersOptions = {
  tripType: 'round' | 'oneway';
  currency: string;
  language: string;
  legs: SearchOptionLegTransfers[];
  adults: number;
  children: number;
  infants: number;
  visitorId?: string;
  userData: {
    ip: string;
    country_code: string;
    location: number[];
    _id?: string;
  };
};

type ExternalSearchInfo = {
  source?: string;
  deviceInfo: string;
  devicePlatform: string;
  devicePlatformName: string;
  deviceVersion: string;
  deviceType: string;
};

type Restrictions = {
  refundable?: boolean;
  changePenalties?: boolean;
  changable?: boolean;
}

type PricingOption = {
  agent: string;
  agentName: string;
  price: {
    from?: number;
    amount: number;
    person?: number;
    currency: string;
    discount?: number;
    type?: string;
  };

  meta?: {
    baggage?: BaggageAllowance;
    restrictions?: Restrictions;
    segments?: IDictionary<{
      bookingCode: string;
    }>;
  };
  deepLink: string;
};

type TransformedItineraryWithoutID = {
  legs: string[];
  pricingOptions: TransfersPricingOption[];
  count?: number;
  isFavorite: boolean;
};

type CodeShare = {
  marketingCarrier: string;
  operatingCarrier?: string;
  aircraftType?: string;
};

type BaggageAllowance = {
  totalPieces?: number | undefined;
  totalKilos?: number | undefined;
  totalBaggages?: number | undefined;
  BaggagesInKilos?: number | undefined;
  totalHandbages?: number | undefined;
  HandbagesInKilos?: number | undefined;
  totalPrice?: number | undefined;
  totalBaggagePrice?: number | undefined;
  totalHandbagPrice?: number | undefined;
};

type TransformedResultMeta = {
  completed: boolean;
  provider: string;
  error?: boolean;
};

type TransformedResultValue = TransformedResult | TransformedResultMeta;

type CollectedResults = {
  timestamp: string;
  requestId: string;
  options: SearchOptions;
  providers: string[];
  airlines: any;
  airports: any;
  agents: any;
  itineraries: IDictionary<TransformedItinerary>;
  legs: IDictionary<TransformedLeg>;
  segments: IDictionary<TransformedSegment>;
  completed: boolean;
  flightDetails?: any;
  codeShare?: any;
  lastUpdateted: number;
  errors: { [key: string]: any };
};
type ProviderCollectedResults = {
  agents: any;
  itineraries: IDictionary<TransformedItinerary>;
  segments: IDictionary<TransformedSegment>;
  legs: IDictionary<TransformedLeg>;
  airlines: any;
  airports: any;
};


type Providers = IDictionary<{
  search: SearchFunction;
  transformResults: TransformFunction;
  interceptor?: any;
  getRedirect?: GetRedirectFunction;
}>;
type ProvidersNomad = IDictionary<{
  search: SearchFunction;
  transformResults: TransformFunction;
  interceptor?: any;
  getRedirect?: GetRedirectFunction;
}>;

type ProvidersCar = IDictionary<{
  search: SearchFunction;
  transformResults: TransformFunction;
  getRedirect?: GetRedirectFunction;
}>;


type RedirectPayload = {
  provider: string;
  agentId: string;
  agentName: string;
  termUrl?: string;
  searchId?: string;
  currency?: string;
  flightSearchKey?: string;
  flightKey?: string;
  url?: string;
  searchID?: string;
  vehicle_id?: string;
  outboundPayload?: string;
  inboundPayload?: string;
  flightData?: any;
};

type RedirectsTrackData = {
  visitor: {
    ip: string;
    city: string;
    countryCode: string;
    countryName: string;
    location: number[];
    timestamp: string;
  };
  device?: {
    os: string;
    type: string;
    platform: string;
    platformName: string;
    version: string;
  };
  searchId: string;
  provider: string;
  agentName: string;
  agentId: string;
  price: number;
  currency: string;
  legs: any[];
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  timestamp: string;
  segments?: TransformedSegment[];
  departureDays: number;
  utm_source?: string;
};

type Index<T> = {
  index: string;
  id: string;
  body: T;
};






type ItinerariesMap = {
  [key: string]: TransformedItinerary;
};
