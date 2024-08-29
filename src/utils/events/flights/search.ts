import soloAdvertiser from '@/utils/ads/medialpha/soloAdvertiser';
import { flightStartTracking } from '@/utils/tracking/FlightStart';
import { flightCompleteTracking } from '@/utils/tracking/flightComplete';
import { flightRedirectTracking } from '@/utils/tracking/flightRedirect';
import { viewTicketDetailsTracking } from '@/utils/tracking/flights/viewTicketDetails';
import {
  TicketViewTrackingData,
  flightRedirectTrackingData,
} from '@/utils/types/flights';
import { Dayjs } from 'dayjs';
import { withDataLayerClearing } from '../dataLayerClearing';
import { multiCitySearchType } from '@/components/common/custom/searchboxes/DefaultSearchbox/components/flights/FlightsSearch';
import { flightSelectTracking } from '@/utils/tracking/flights/flightSelect';
import { kayakInlineAdsTraking } from '@/utils/tracking/flights/kayakInlineAdEvent';
import { flightShareTrackingEvent } from '@/utils/tracking/flights/flightShareEvent';

/* 
  Make sure to use the withDataLayerClearing function (HOF) with every event tracking function.
  This approach to clear the dataLayer before every time you push any new data/event to the dataLayer.
*/

export const eventsOnClickFlightSearch = withDataLayerClearing(
  (data: multiCitySearchType) => {
    soloAdvertiser(data);
  },
);

export const eventsOnFlightStart = withDataLayerClearing(
  (body: any, searchId: string) => {
    flightStartTracking(body, searchId);
  },
);

export const eventsOnFlightComplete = withDataLayerClearing(
  (
    body: any,
    results: FlightResultType,
    numberOfProvidersSent: number,
    faildProfiders: string[],
    searchStartTime?: null | Dayjs,
  ) => {
    flightCompleteTracking(
      body,
      results,
      numberOfProvidersSent,
      faildProfiders,
      searchStartTime,
    );
  },
);

export const eventsOnFlightRedirect = withDataLayerClearing(
  (data: flightRedirectTrackingData, agentName: string) => {
    flightRedirectTracking(data, agentName, true);
  },
);

export const eventsOnViewTicketDetails = withDataLayerClearing(
  (data: TicketViewTrackingData) => {
    viewTicketDetailsTracking(data);
  },
);
export const eventsOnFlightSelect = withDataLayerClearing(
  (flightSelectTrackingData: any) => {
    flightSelectTracking(flightSelectTrackingData);
  },
);
export const eventsOnClickKayakAds = withDataLayerClearing(
  (data: any) => {
    kayakInlineAdsTraking(data);
  },
);
export const eventsOnFlightShare = withDataLayerClearing(
  (data: TicketViewTrackingData) => {
    flightShareTrackingEvent(data);
  },
);
