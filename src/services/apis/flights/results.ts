import { locale } from '@/navigation';
import api from '../api';

export const fetchSeatMapRequest = async (flights: any, locale: locale) => {
  try {
    const { data, status } = await api.post(
      '/seatMaps-data',
      {
        flights,
        lang: locale.toUpperCase(),
      },
      {
        headers: {
          'Accept-Language': locale,
        },
      },
    );
    if (status === 200) {
      return data;
    }
  } catch (error: any) {
    return null;
  }
};

export const fetchAmenitiesRequest = async (flights: any, locale: locale) => {
  try {
    const { data, status } = await api.post(
      '/amenities-package',
      {
        flights,
        lang: locale.toUpperCase(),
      },
      {
        headers: {
          'Accept-Language': locale,
        },
      },
    );
    if (status === 200) {
      return data;
    }
  } catch (error: any) {
    return null;
  }
};

export const redirectRequest = async (
  data: any,
  locale: locale,
  recaptchaToken?: string | null,
) => {
  try {
    const { data: response, status } = await api.post(
      '/redirect',
      {
        ...data,
      },
      {
        headers: {
          'Accept-Language': locale,
          'g-recaptcha-response': recaptchaToken,
        },
      },
    );
    if (status === 200) {
      return response;
    }
  } catch (error: any) {
    return null;
  }
};

export const sendRedirectFailureDataRequest = async (data: any, locale: locale,token:string) => {
  try {
    const { data: response, status } = await api.post(
      '/redirect/failure',
      {
        ...data,
      },
      {
        headers: {
          'Accept-Language': locale,
          'g-recaptcha-response':token
        },
      },
    );
    if (status === 200) {
      return response;
    }
  } catch (error: any) {
    return null;
  }
};
