import api from '../api';
import { locale } from '@/navigation';

export async function hotelsSearchRequest(
  body: any,
  onResults: (data: any) => void,
  onError: (data: any) => void,
  locale: locale,
  options?: { source: string },
) {
  const headers: any = {
    'Content-Type': 'application/json',
    'g-recaptcha-response':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aXNpdG9ySWQiOiI5YzI5MjcxZC01MzhhLTRiYmYtOGI4NS1mYTQ4YmQyMTc3N2IiLCJkYXRlIjoiMjAyNC0wMS0wMVQxMzo0MDo0My4zNjdaIiwiaWF0IjoxNzA0MTE2NDQzfQ.XKGJSbX5seQVQlT0cwTZZ67LSaIAU3Lm4yVo1e7lf44',
    deviceInfo: 'windows',
    devicePlatform: 'browser',
    devicePlatformName: 'chrome',
    deviceVersion: 120,
    deviceType: 'pc',
    source: options && options.source ? options.source : 'organic',
    'Accept-Language': locale,
  };
  const initSearch = await api.post('/searchHotel/init', body, { headers });

  if (initSearch.status != 200) {
    onError(initSearch);
    return;
  }
  const updatedHeaders = {
    ...headers,
    'g-recaptcha-response': initSearch.data?.token,
  };

  const providersSearches = initSearch.data?.searchEndpoints.map((searchEndpoint: any) => {
    return api
      .post(searchEndpoint, body, { headers: updatedHeaders })
      .then((res: any) => {
        const resItineraries = res?.data || {};
        if (res.status != 200 || Object.keys(resItineraries).length <= 0) {
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
        return null;
      });
  });

  await Promise.all(providersSearches);
}
