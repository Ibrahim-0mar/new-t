'use server';
/* eslint-disable */
import { locale } from '@/navigation';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface Airport {
  code: string;
  name: string;
  phrase: string;
  cityCode: string;
  countryCode: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  city?:{
    name: string;
  }
  placeType: string;
  airports: number;
  stations: number;
  distance: string;
  unit: string;
}

/**
 * Fetches detailed information about an airport based on its code.
 *
 * This function makes a fetch request to retrieve airport information for the given airport code.
 * It includes the locale in the request headers for localized responses. If the request fails or
 * an error occurs, it returns null.
 *
 * @param airportCode - The code of the airport to retrieve information for.
 * @param locale - The locale for localized responses.
 * @returns A promise that resolves to the airport data, or null if an error occurs.
 */
export const getAirport = async (airportCode: string, locale: locale): Promise<Airport | null> => {
  try {
    // Perform a fetch request to get airport data
    const response = await fetch(`${baseURL}/airports/${airportCode.toUpperCase()}`, {
      headers: {
        'Accept-Language': locale,
      },
      next: {
        revalidate: 86400,
      },
    });

    // Check if the response status is OK (status code in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response JSON and return it as an Airport object
    const data = await response.json();
    return data as Airport;
  } catch (error) {
    // Return null in case of an error
    return null;
  }
};

/**
 * Fetches a list of nearby airports.
 *
 * This function makes a fetch request to retrieve nearby airports based on the locale.
 * If the request fails or an error occurs, it returns an empty array.
 *
 * @param locale - The locale for localized responses.
 * @returns A promise that resolves to an array of nearby airports, or an empty array if an error occurs.
 */
export async function fetchNearbyAirports(locale: locale): Promise<Airport[]> {
  try {
    const response = await fetch(`${baseURL}/airports/nearby`, {
      headers: {
        'Accept-Language': locale,
      },
      next: {
        revalidate: 0,
      },
    });

    // Check if the response status is OK (status code in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the data as an array of airports, ensure it matches the Airport type
    return data as Airport[];
  } catch (error) {
    return [];
  }
}

/**
 * Fetches the nearest airport based on the provided locale.
 *
 * This function makes a fetch request to retrieve the nearest airport data.
 * If the request fails or an error occurs, it returns a default airport object.
 *
 * @param locale - The locale for localized responses.
 * @returns A promise that resolves to the nearest airport data or a default airport object if an error occurs.
 */
export async function getNearbyAirport(locale: locale): Promise<Airport> {
  // const controller = new AbortController(); // Create an AbortController instance
  // const timeoutId = setTimeout(() => controller.abort(), 2000); // Set a timeout to abort the request

  try {
    const response = await fetch(`${baseURL}/airports/nearby`, {
      headers: {
        'Accept-Language': locale,
      },
      next: {
        revalidate: 0,
      },
      // signal: controller.signal, // Attach the signal for aborting the request
    });

    // clearTimeout(timeoutId); // Clear the timeout once the request is complete

    if (!response.ok) {
      throw new Error('Failed to fetch nearby airports');
    }

    const data = await response.json();
    return data[0] as Airport; // Return the first item in the response data array
  } catch (error) {
    // Return a default airport object if there's an error
    //@ts-expect-error
    return {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      phrase: 'John F. Kennedy International Airport, New York, United States',
      cityCode: 'NYC',
      countryCode: 'US',
      location: {
        type: 'Point',
        coordinates: [-73.78817, 40.642334],
      },
      placeType: 'airport',
    };
  }
}
