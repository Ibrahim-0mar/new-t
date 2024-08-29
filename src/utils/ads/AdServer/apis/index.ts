import api from '@/services/apis/api';
import dayjs from 'dayjs';

export const fetchAdServerData = async (
  origin: string,
  destination: string,
  adults: number | string,
  children: number | string,
  infants: number | string,
  cabin: string,
  tripType: string,
  departureDate: string,
  locale:string,
  returnDate?: string,
) => {
  let url = `https://aj2640.bid/ads-api-native?key=3cbc56f97bb9fa9abb24199d44d30d64&native_bs=1&cp.origin=${origin}&cp.route=${origin}-${destination}&cp.destination=${destination}&cp.cabin=${cabin}&cp.type=${tripType}&cp.departure=${dayjs(departureDate).unix()}&cp.adults=${adults}&cp.children=${children}&cp.infants=${infants}&cp.language=${locale}`;
  if (returnDate) {
    url += `&cp.return=${dayjs(returnDate).unix()}`;
  }
  try {
    return fetch(url)
      .then((res) => res.json())
      .then((response) => response)
      .catch(() => null);
  } catch (err) {
    return null;
  }
};

export const fetchProviderData = async (providerName: string, payload: any) => {
  try {
    const { data, status } = await api.post('/search/' + providerName, payload);
    const resItineraries = data?.itineraries || {};

    if (status !== 200 || Object.keys(resItineraries).length <= 0) {
      return null;
    } else {
      return data;
    }
  } catch (err) {
    return null;
  }
};
