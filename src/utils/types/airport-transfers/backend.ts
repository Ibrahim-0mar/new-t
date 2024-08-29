// type SearchOptionLegTransfers = {
//     start_lat: string;
//     start_long: string;
//     end_lat: string;
//     end_long: string;
//     from_iata?: string;
//     to_iata?: string;
//     departure: string;
//     time: string;
  
//     from_type: string;
//     to_type: string;
//     name: string;
//     description: string;
//     origin: string;
//     destination: string;
//     des_from?: string;
//     des_to?: string;
//   };
//   type TransformedTransferLegWithoutID = {
//     description: string;
//     viehcle_type?: string;
//     model?: string;
//     make?: string;
//     class?: string;
//     time?: number;
//     max_passengers: number;
//     max_bags: number;
//     wait_time?: number;
//     carImage_url?: string;
//     departure_time?: string;
//     free_cancellation?: boolean;
//     review_count?: number;
//     average_rating?: number | string;
//     instruction_for_customer?: string;
//     supporter_providerName?: string;
//     type?: string;
//   };
//   type TransformedTransferLeg = TransformedTransferLegWithoutID & {
//     id: string;
//   };
//   type TransformedTransferResult = {
//     agents: IDictionary<any>;
//     legs: IDictionary<TransformedTransferLeg>;
//     itineraries: IDictionary<TransformedItinerary>;
//     completed?: boolean;
//     provider?: string;
//     error?: any[];
//     transferDetails?: any;
//   };
//   type CollectedTransferResults = {
//     timestamp: string;
//     requestId: string;
//     options: SearchTransfersOptions;
//     providers: string[];
//     agents: any;
//     itineraries: IDictionary<TransformedItinerary>;
//     legs: IDictionary<TransformedTransferLeg>;
//     completed: boolean;
//     lastUpdateted: number;
//     errors: { [key: string]: any };
//   };
  
//   type TransformedSegmentWithoutID = {
//     origin: string;
//     departure: string;
//     destination: string;
//     originName?: string;
//     destinationName?: string;
//     arrival: string;
//     marketingCarrier: string;
//     operatingCarrier?: string;
//     marketingFlightNumber?: string;
//     aircraft?: string;
//     trainNumber?: string;
//     duration?: number;
//     vehicleType?: string;
//     fromLng?: number;
//     fromLat?: number;
//     toLng?: number;
//     toLat?: number;
//     fromTimezone?: string;
//     toTimezone?: string;
//   };
  
//   type TransformedSegment = TransformedSegmentWithoutID & {
//     id: string;
//   };
  
//   type TransformedLegWithoutID = {
//     origin: string;
//     destination: string;
//     departure: string;
//     arrival: string;
//     segments: string[];
//     stopCount: number;
//     marketingCarriers: string[];
//     duration?: number;
//     vehicleType?: string[];
//   };
  
  
//   type TransformedLeg = TransformedLegWithoutID & {
//     id: string;
//   };
//   type RedirectOptions = {
//     itineraryId?: string;
//     itineraryIds?: string[];
//     searchId: string;
//     visitorId: string;
//     price: number;
//     currency: string;
//     country: string;
//     adults: number;
//     children: number;
//     infants: number;
//     type: string;
//     token?: string;
//     tokens?: string[];
//     legs?: {
//       origin_name: string;
//       destination_name: string;
//       originPlaceType: string;
//       destinationPlaceType: string;
//       des_from: string;
//       des_to: string;
//       start_long: string;
//       start_lat: string;
//       end_long: string;
//       end_lat: string;
//       origin: string;
//       destination: string;
//       departure: string;
//       arrival: string;
//       time: string;
//       from_type: string;
//       to_type: string;
//     }[];
//     segments?: TransformedSegment[];
//     language: string;
//     utm_source?: string;
//   };