import { airportTransfersStartTracking } from '@/utils/tracking/airportTransfers/transfersStart';
import { withDataLayerClearing } from '../dataLayerClearing';
import { transferCompleteTracking } from '@/utils/tracking/airportTransfers/transferSearchComplete';
import { Dayjs } from 'dayjs';
import { transfersRedirectTracking } from '@/utils/tracking/airportTransfers/transfersRedirect';
import { TransferRedirectPayloadType } from '@/utils/types/airport-transfers';
import { TransfersTrackingData } from '@/utils/types/airport-transfers/results';

export const eventsOnAirportTransferStart = withDataLayerClearing(
  (body: TransfersTrackingData, searchId: string) => {
    airportTransfersStartTracking(body, searchId);
  },
);

export const eventsOnAirportTransferComplete = withDataLayerClearing(
  (
    body: any,
    results: FlightResultType,
    numberOfProvidersSent: number,
    faildProfiders: string[],
    searchStartTime?: null | Dayjs,
  ) => {
    transferCompleteTracking(body, results, numberOfProvidersSent, faildProfiders, searchStartTime);
  },
);

export const eventsOnAirportTransferRedirect = withDataLayerClearing(
  (data: TransferRedirectPayloadType, agentName: string, success: boolean) => {
    transfersRedirectTracking(data, agentName, success);
  },
);
