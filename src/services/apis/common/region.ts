import { locale } from '@/navigation';
import api from '../api';

export async function fetchCountries(locale: locale): Promise<CountryType[]> {
  try {
    const { data } = await api.get('/countries?page=1&limit=300', {
      headers: {
        'Accept-Language': locale,
      },
    });

    return data.docs;
  } catch (er) {
    return [];
  }
}

export async function fetchCurrencies(locale: locale) {
  try {
    const { data } = await api.get('/currencies?limit=200', {
      headers: {
        'Accept-Language': locale,
      },
    });

    return data.docs;
  } catch (err) {
    return [];
  }
}

export async function fetchCurrency(searchValue: string, locale: locale): Promise<CurrencyType[]> {
  try {
    const { data } = await api.get(`/currencies/search?searchKey=${searchValue}`, {
      headers: {
        'Accept-Language': locale,
      },
    });

    return data;
  } catch (err) {
    return [];
  }
}
