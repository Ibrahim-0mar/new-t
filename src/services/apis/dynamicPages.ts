import { locale } from '@/navigation';
import { currency, language } from '@/utils/types/common';
import {
  AirlineCompData,
  FlightInformation,
  FlightPoint,
  FlightPriceData,
  PopularFlightsData,
} from '@/utils/types/common/dynamicPages';
import { FlightTicket } from '@/utils/types/flights';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Constructs the query parameters for the API request.
 *
 * @param origin - The starting flight point.
 * @param destination - The destination flight point (optional).
 * @param currency - The currency to be used.
 * @param language - The language code (optional).
 * @returns The query string.
 */
const queryParams = (
  origin: FlightPoint,
  destination: FlightPoint,
  currency: currency,
  language?: language,
) => {
  let query = `?origin=${origin?.code}&orig_type=${origin?.type}&currency=${currency?.code}`;
  if (destination) {
    query += `&destination=${destination?.code}&dest_type=${destination?.type || 'airport'}`;
  }
  if (language) {
    query += `&language=${language?.code}`;
  }
  return query;
};

/**
 * Fetches the cheapest tickets based on the given parameters.
 *
 * @param origin - The starting flight point.
 * @param destination - The destination flight point.
 * @param currency - The currency to be used.
 * @param locale - The locale for the response.
 * @param language - The language code.
 * @returns An array of FlightTicket or an empty array if an error occurs.
 */
export const cheapestTicketApi = async (
  origin: FlightPoint,
  destination: FlightPoint,
  currency: currency,
  locale: locale,
  language: language,
): Promise<FlightTicket[] | []> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(
      `${baseURL}/cheapest-flights-search${queryParams(origin, destination, currency, language)}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        signal: controller.signal,
        next: {
          revalidate: 604800, // Revalidate every 1 week (7 days * 24 hours * 60 minutes * 60 seconds)
        },
      },
    );

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok || data?.status === 'error') {
      return [];
    }

    return data?.chepestFlights || [];
  } catch (err) {
    return [];
  }
};

/**
 * Fetches flight information based on the given parameters.
 *
 * @param origin - The starting flight point.
 * @param destination - The destination flight point.
 * @param currency - The currency to be used.
 * @param locale - The locale for the response.
 * @returns FlightInformation or null if an error occurs.
 */
export const flightInformations = async (
  origin: FlightPoint,
  destination: FlightPoint,
  currency: currency,
  locale: locale,
): Promise<FlightInformation | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(
      `${baseURL}/flightInfo${queryParams(origin, destination, currency)}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        signal: controller.signal,
        next: {
          revalidate: 604800, // Revalidate every 1 week (7 days * 24 hours * 60 minutes * 60 seconds)
        },
      },
    );

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok || data?.status === 'error') {
      return null;
    }

    return data?.FlightInfo || null;
  } catch (err) {
    return null;
  }
};

/**
 * Fetches popular flights based on the given parameters.
 *
 * @param origin - The starting flight point.
 * @param destination - The destination flight point.
 * @param currency - The currency to be used.
 * @param locale - The locale for the response.
 * @returns PopularFlightsData or null if an error occurs.
 */
export const popularFlights = async (
  origin: FlightPoint,
  destination: FlightPoint,
  currency: currency,
  locale: locale,
): Promise<PopularFlightsData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(
      `${baseURL}/popularFlights${queryParams(origin, destination, currency)}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        signal: controller.signal,
        next: {
          revalidate: 604800, // Revalidate every 1 week (7 days * 24 hours * 60 minutes * 60 seconds)
        },
      },
    );

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok || data?.status === 'error') {
      return null;
    }

    return data || null;
  } catch (err) {
    return null;
  }
};

/**
 * Fetches the cheapest flights per month based on the given parameters.
 *
 * @param origin - The starting flight point.
 * @param destination - The destination flight point.
 * @param currency - The currency to be used.
 * @param locale - The locale for the response.
 * @param language - The language code.
 * @returns FlightPriceData or null if an error occurs.
 */
export const cheapestPerMonths = async (
  origin: FlightPoint,
  destination: FlightPoint,
  currency: currency,
  locale: locale,
  language: language,
): Promise<FlightPriceData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(
      `${baseURL}/cheapest-flights-per-months${queryParams(origin, destination, currency, language)}&limit=10`,
      {
        headers: {
          'Accept-Language': locale,
        },
        signal: controller.signal,
        next: {
          revalidate: 604800, // Revalidate every 1 week (7 days * 24 hours * 60 minutes * 60 seconds)
        },
      },
    );

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok || data?.status === 'error') {
      return null;
    }

    return data.monthsFlightsPrices || null;
  } catch (err) {
    return null;
  }
};

/**
 * Fetches the cheapest airlines based on the given parameters.
 *
 * @param origin - The starting flight point.
 * @param destination - The destination flight point.
 * @param currency - The currency to be used.
 * @param locale - The locale for the response.
 * @param language - The language code.
 * @returns AirlineCompData or null if an error occurs.
 */
export const cheapestAirlines = async (
  origin: FlightPoint,
  destination: FlightPoint,
  currency: currency,
  locale: locale,
  language: language,
): Promise<AirlineCompData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(
      `${baseURL}/cheapest-airlines-prices${queryParams(origin, destination, currency, language)}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        signal: controller.signal,
        next: {
          revalidate: 604800, // Revalidate every 1 week (7 days * 24 hours * 60 minutes * 60 seconds)
        },
      },
    );

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok || data?.status === 'error') {
      return null;
    }

    return data.chepestAirlinesPrices || null;
  } catch (err) {
    return null;
  }
};

/**
 * Fetches FAQs data based on the given parameters.
 *
 * @param currency - The currency to be used.
 * @param origin - The starting flight point.
 * @param locale - The locale for the response.
 * @param destination - The destination flight point (optional).
 * @returns An array of FAQs data or null if an error occurs.
 */
export const dynamicPagesFAQs = async (
  currency: currency,
  origin: FlightPoint,
  locale: locale,
  destination?: FlightPoint,
) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const url = new URL(`${baseURL}/faqs-data`);
    url.searchParams.append('origin', origin?.code ?? ''); // Default to empty string if null
    url.searchParams.append('orig_type', origin?.type ?? ''); // Default to empty string if null
    url.searchParams.append('currency', currency?.code ?? ''); // Default to empty string if null

    if (destination) {
      url.searchParams.append('destination', destination?.code ?? ''); // Default to empty string if null
      url.searchParams.append('dest_type', destination?.type ?? ''); // Default to empty string if null
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept-Language': locale,
      },
      signal: controller.signal,
      next: {
        revalidate: 604800, // Revalidate every 1 week (7 days * 24 hours * 60 minutes * 60 seconds)
      },
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok || data?.status === 'error') {
      return null;
    }

    return data.faqsData || [];
  } catch (err) {
    return null;
  }
};
