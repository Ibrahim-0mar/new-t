import { locale } from '@/navigation';
import api from '../api';

export async function fetchTransfersPlacesRequest(code: string, locale: locale) {
  try {
    const { data } = await api.get(
      '/autocomplete?input=' +
        code +
        '&location=30.109929,31.3966993&radius=500&types=establishment&strictbounds=true',
      {
        headers: {
          'Accept-Language': locale,
        },
      },
    ); // location to be replaced with coordinates from nearby places

    return data?.predictions;
  } catch (err) {
    return [];
  }
}

export async function fetchPlaceCoordinates(placeId: string) {
  try {
    const { data } = await api.get(`/place?place_id=${placeId}`);

    return data.result.geometry.location;
  } catch (err) {
    return { lat: '', lng: '' };
  }
}
