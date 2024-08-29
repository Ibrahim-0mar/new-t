export type TrendingTransfersCardType = {
  _id: string;
  origin_country: string;
  lng: number;
  lat: number;
  from_type: string;
  price: string;
  des_from: string;
  name: string;
};

export type AirportTransfersPlace = {
  description: string;
  matched_substrings: [
    {
      length: number;
      offset: number;
    },
  ];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: Array<{
      length: 5;
      offset: 0;
    }>;

    secondary_text: string;
  };
  terms: Array<{
    offset: number;
    value: string;
  }>;
  types: string[];
};

type TransferLeg = {
  pickup: string;
  dropoff: string;
  start_lat: string;
  start_long: string;
  end_lat: string;
  end_long: string;
  origin_name: string;
  destination_name: string;
  from_type: string;
  to_type: string;
  des_from: string;
  des_to: string;
  departure: string;
  time: string;
  pickupDateTime: string;
  returnDateTime: string | null;
};

export type TransferRedirectPayloadType = {
  utm_source: string;
  legs: TransferLeg[];
  searchId: string;
  visitorId: string;
  itineraryId: string;
  adults: string;
  children: string;
  infants: string;
  price: string;
  currency: string;
  token: string;
  type: string;
  viehcleType: string;
  maxPassengers: number;
  maxBags: number;
  isCheapest: boolean
};