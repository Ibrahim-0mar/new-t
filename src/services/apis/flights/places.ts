import { locale } from '@/navigation';
import { FlightPoint } from '@/utils/types/common/dynamicPages';
import { getAirport } from '../common/airports';
import { getCity } from '../common/cities';
import { getCountry } from '../common/countries';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface Place {
  code: string;
  name: string;
  phrase: string;
  cityCode: string;
  countryCode: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  placeType: string;
}
/**
 * Fetches a list of places based on the provided search code.
 *
 * This function makes a fetch request to search for places related to the given code. It includes the locale in the request headers for localized responses. If the request fails or an error occurs, it returns an empty array.
 *
 * @param code - The search code used to query the places API.
 * @param locale - The locale for localized responses.
 * @returns A promise that resolves to the data from the API response, or an empty array if an error occurs.
 */
export const fetchPlacesRequest = async (code: string, locale: locale): Promise<Place[] | []> => {
  try {
    const response = await fetch(`${baseURL}/places/v2/flights/search?search=${code}`, {
      headers: {
        'Accept-Language': locale,
      },
      next: {
        revalidate: 86400, // Revalidate every 24 hours
        tags: [`places-${code}`], // Unique cache key
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch places:', error);
    return [];
  }
};

export const getPlaceNameByCode = async (place: FlightPoint, locale: locale) => {
  try {
    let placeData;

    switch (place.type) {
      case 'airport':
        placeData = await getAirport(place.code!, locale);
        break;
      case 'city':
        placeData = await getCity(place.code!, locale);
        break;
      case 'country':
        placeData = await getCountry(place.code!, locale);
        break;
      default:
        return place.code; // Return code directly if type does not match
    }

    // After the switch, return the name if data was found or the code otherwise
    return placeData ? placeData.name : place.code;
  } catch (err) {
    return null;
  }
};
