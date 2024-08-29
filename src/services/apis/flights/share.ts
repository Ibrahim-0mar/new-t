import { locale } from '@/navigation';
import api from '../api';

export const shareFlightRequest = async (
  toEmailAddress: string,
  shareLink: string,
  token: string,
  locale: locale,
) => {
  try {
    const { data, status } = await api.get(`/share-flight?to=${toEmailAddress}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': locale,
      },
      params: {
        link: shareLink,
      },
    });
    if (status === 200) {
      return data;
    }
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
