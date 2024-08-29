import { locale } from '@/navigation';
import api from '../api';

export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface HotelPlace {
  code: string;
  name: string;
  phrase: string;
  cityCode: string;
  countryCode: string;
  location: Location;
  placeType: string;
}

/**
 * Fetches a list of hotel places based on the search code and locale.
 *
 * @param {string} code - The search code used to find hotels.
 * @param {locale} locale - The locale to be used for the 'Accept-Language' header.
 * @returns {Promise<HotelPlace[]>} - A promise that resolves to an array of HotelPlace objects. Returns an empty array in case of an error.
 * @example
 * // Example response
 * [
 *   {
 *     code: '63',
 *     name: 'Le Passage Cairo Hotel & Casino',
 *     phrase: 'Le Passage Cairo Hotel & Casino, Cairo, Egypt',
 *     cityCode: '4',
 *     countryCode: 'EG',
 *     location: {
 *       type: 'Point',
 *       coordinates: [31.400856971741, 30.121581888951]
 *     },
 *     placeType: 'hotels'
 *   }
 * ]
 */

const fetchHotelsPlaces = async (code: string, locale: locale): Promise<HotelPlace[]> => {
  try {
    // Use template literals for cleaner URL construction
    const { data } = await api.get<HotelPlace[]>(`/places/v2/hotels/search?search=${code}`, {
      headers: {
        'Accept-Language': locale,
      },
    });

    return data;
  } catch (err) {
    console.error('Failed to fetch hotels places:', err);
    return []; // Return an empty array in case of an error
  }
};

export default fetchHotelsPlaces;
