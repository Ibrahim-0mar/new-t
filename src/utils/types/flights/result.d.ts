type NearbyAirportType = {
  name: string;
  code:string;
  countryCode: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  phrase: string;
  placeType:string;
  airports: number;
  stations: number;
  distance: string;
  unit: string;
};

type FlightResultType = {
    searchId: string;
    airlines: AirlinesType;
    airports: AirportsType;
    agents:  AgentsType;
    legs: BackendLegsType;
    segments: BackendSegmentsType;
    itineraries: BackendItinerariesType;
    flightDetails: any; //To be defined after discuss with backend team
    codeShare: any;//To be defined after discuss with backend team
    itinerariesDuration: any;
    itinerariesPrice:any;
    filterAirports: { departure: {[code:string]:CitiesFilterType}; arrival: {[code:string]:CitiesFilterType} };
    filterPrices?: FilterPricesType;
  };
  

  type CitiesFilterType = {
    location: LocationType;
    _id: string;
    name: string;
    code: string;
    country: CountryType;
    airports:AirportType;
    __v: 2;
    image: {
      _id: string;
      path: string;
      pathWithFilename: string;
      filename: string;
      mime: string;
    };
    imageAlt: string;
  };
  
   type AirlineType = {
    _id: string;
    name: string;
    code: string;
    image: {
      _id: string;
      pathWithFilename: string;
      mime: string;
      filename: string;
      path: string;
    };
  };
   type AirlinesType = { [code: string]: AirlineType }
  
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
   type AirportType = {
    location: LocationType;
    _id: string;
    name: string;
    code: string;
    timezone: string;
    city: CityType;
    isActive: boolean;
    
  };
   type AirportsType = { [code: string]: AirportType }
  
   type AgentType = {
    id: string;
    name: string;
    iataCode: string;
    isAirline: boolean;
  };
   type AgentsType = { [code: string]: AgentType }
  
   type BackendLegType = {
    id: string;
    origin: string;
    departure: string;
    destination: string;
    arrival: string;
    segments: string[];
    stopCount: number;
    marketingCarriers: string[];
    vehicleType: string[];
    duration: number;
  };
   type BackendLegsType = { [code: string]: BackendLegType }
  
   type TransformedLegType = {
     id: string;
     origin: string;
     origName?: string;
     departure: string;
     destName?: string;
     destination: string;
     arrival: string;
     segments: TransformedSegmentType[];
     stopCount: number;
     marketingCarriers: string[];
     vehicleType: string[];
     duration: number;
     marketingCarriersDetails: AirlineType[];
   };
   type BackendSegmentType = {
      id: string;
      origin: string;
      destination: string;
      departure: string;
      arrival: string;
      marketingCarrier: string;
      operatingCarrier: string;
      marketingFlightNumber: string;
      vehicleType: string;
      aircraft: string;
      duration: number;
    };
   type BackendSegmentsType = { [code: string]: BackendSegmentType}
   type TransformedSegmentType = {
    id: string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    marketingCarrier: string;
    operatingCarrier: string;
    marketingFlightNumber: string;
    vehicleType: string;
    aircraft: string;
    duration: number;
    originDetails: AirportType;
    destinationDetails: AirportType;
    marketingCarrierDetails: AirlineType;
  };
  
   type BackendItineraryType = {
      id: string;
      legs: string[];
      pricingOptions: FlightPricingOption[];
      isFavorite: boolean;
  };
   type BackendItinerariesType = { [code: string]: BackendItineraryType }
  
  
   type TransformedItineraryType = {
    id: string;
    legs: TransformedLegType[];
    pricingOptions: FlightPricingOption[];
    isFavorite: boolean;
    availableRestrictions: Restrictions;
    minPrice: number;
    duration: number;
  };
  
   type FlightBaggageAllowance = {
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
    BaggageLength?: number | undefined;
    BaggageWidth?: number | undefined;
    BaggageHeight?: number | undefined;
    HandbagesLength?: number | undefined;
    HandbagesWidth?: number | undefined;
    HandbagesHeight?: number | undefined;
  };
  type FlightPricingOption = {
    agent: string;
    agentName: string;
    deepLink: string;
    price: priceType;
    meta?: MetaType;
  };
  
  type MetaType = {
    segments: MetaTypeSegment[];
    baggage?: FlightBaggageAllowance;
    restrictions?: {
      refundable?: boolean;
      changePenalties?: boolean;
      changable?: boolean;
    };
  };
  
  type MetaTypeSegment = {
    baggageInfo: string;
    fareBasis: string;
    segmentId: string;
  };
  
  type priceType = {
    from?: number;
    amount: number;
    person?: number;
    currency: string;
    discount?: number;
    type?: string;
  };
  
   type CodeShareType = {
    [code: string]: {
      marketingCarrier: string;
      operatingCarrier: string;
      aircraftType: string;
    };
  };
  
   type FilterAirportsType = {
    departure: { [code: string]: CityType };
    arrival: { [code: string]: CityType };
  };
  
   type FilterPricesType = {
    bookingSites: { [id: string]: number };
    stops: { [index: string]: number };
    airlines: { [code: string]: number };
    airports: { departure:{[code: string]: number},arrival:{[code: string]: number} };
    alliances: {
      [code: string]: number;
    };
    stopovers: { [code: string]: number };
  };
  type sortTypes =
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