import { parse } from '@/utils/helper/json';
import api from '../api';
import { eventsOnAirportTransferStart } from '@/utils/events/airportTransfers/search';
import { locale } from '@/navigation';
import { TransfersTrackingData } from '@/utils/types/airport-transfers/results';

export async function airportTransfersSearchRequest(
  body: any,
  trackingData: TransfersTrackingData,
  handleOnInitSearchDone: (data: any) => void,
  onResults: (data: any) => void,
  onError: (data: any) => void,
  handleProvidersSearchError: (searchEndpoint: string) => void,
  locale: locale,
  recaptchaToken: string | null,
) {
  const userAgentData = parse(localStorage.getItem('userAgentDetails') || '{}');

  const headers: any = {
    'Content-Type': 'application/json',
    'g-recaptcha-response': recaptchaToken,
    deviceInfo: userAgentData?.os.name,
    devicePlatform: 'browser',
    devicePlatformName: userAgentData?.browser.name,
    deviceVersion: userAgentData?.engine.version,
    deviceType: userAgentData?.device.type,
    source: 'organic',
    'Accept-Language': locale,
  };

  const initSearch = await api.post('/searchTransfer/init', body, { headers });

  if (initSearch.status != 200) {
    onError(initSearch);
    return;
  } else {
    handleOnInitSearchDone(initSearch.data);
    eventsOnAirportTransferStart(trackingData, initSearch?.data?.searchId);
  }
  const updatedHeaders = {
    ...headers,
    'g-recaptcha-response': initSearch.data?.token,
  };

  const providersSearches = initSearch.data?.searchEndpoints.map((searchEndpoint: any) => {
    return api
      .post(searchEndpoint, body, { headers: updatedHeaders })
      .then((res: any) => {
        const resItineraries = res?.data?.itineraries || {};
        if (res.status != 200 || Object.keys(resItineraries).length <= 0) {
          handleProvidersSearchError(searchEndpoint);
          return null;
        } else {
          return onResults({
            ...res.data,
            searchId: initSearch.data?.searchId,
          });
          // return  onResults(processResults(res.data,initSearch.data?.searchId))
        }
      })
      .catch(() => {
        handleProvidersSearchError(searchEndpoint);
        return null;
      });
  });

  await Promise.all(providersSearches);
}
