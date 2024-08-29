import { locale } from '@/navigation';
import { eventsOnFlightStart } from '@/utils/events/flights/search';
import { parse } from '@/utils/helper/json';
import api from '../api';

export async function flightSearchRequest(
  body: any,
  onInit: (data: any) => void,
  onResults: (data: any) => void,
  onError: (data: any) => void,
  onProvidersError: (searchEndpoint: string) => void,
  locale: locale,
  recaptchaToken: string | null,
  options?: { source: string },
) {
  const userAgentData = parse(localStorage.getItem('userAgentDetails') || '{}');

  const headers: any = {
    'Content-Type': 'application/json',
    'g-recaptcha-response': recaptchaToken,
    // replace the following with the actual values
    deviceInfo: userAgentData?.os.name,
    devicePlatform: 'browser',
    devicePlatformName: userAgentData?.browser.name,
    deviceVersion: userAgentData?.engine.version,
    deviceType: userAgentData?.device.type,
    source: options && options.source ? options.source : 'organic',
    'Accept-Language': locale,
  };
  try {
    const initSearch = await api.post('/search/init/v3', body, { headers });

    if (initSearch.status != 200) {  
      onError(initSearch);
      return;
    } else {
      onInit(initSearch.data);
      eventsOnFlightStart(body, initSearch?.data?.searchId);
    }
    const updatedHeaders = {
      ...headers,
      'g-recaptcha-response': initSearch.data?.token,
    };

    const providersSearches = initSearch.data?.searchEndpoints.map((searchEndpoint: any) => {
      searchEndpoint.searchUrl?.map((url: any) => {
        return api
          .post(url, searchEndpoint?.payload, { headers: updatedHeaders })
          .then((res: any) => {
            const resItineraries = res?.data?.itineraries || {};
            if (res.status != 200 || Object.keys(resItineraries).length <= 0) {
              onProvidersError(url);
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
            onProvidersError(url);
            return null;
          });
      });
    });
    await Promise.all(providersSearches);
  } catch (err) {
    onError(err?.response);
    return;
  }
}
