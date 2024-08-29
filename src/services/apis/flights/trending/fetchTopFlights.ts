'use server';

import { TopFlightType } from '@/utils/types/flights';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface TopFlightParams {
  code: string;
  currency: string;
  limit: number;
  type: string;
  locale: string;
}

/**
 * Fetches top flight data from the API with caching.
 *
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.code - The airport code.
 * @param {string} params.currency - The currency code.
 * @param {number} params.limit - The number of items to fetch.
 * @param {string} params.type - The type of flight (e.g., "domestic", "international").
 * @param {string} params.locale - The locale code.
 * @returns {Promise<TopFlightType[]>} - A promise that resolves to the fetched data, or an empty array if the request fails.
 */

export const fetchTopFlighRequest = async ({
  code,
  currency,
  limit,
  type,
  locale,
}: TopFlightParams): Promise<TopFlightType[]> => {
  try {
    const response = await fetch(
      `${baseURL}/v2/trending/airports?code=${code}&currency=${currency}&limit=${limit}&type=${type}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        next: {
          revalidate: 604800, // Cache revalidation time in seconds (1 week)
          tags: [`top-flight-${code}-${type}-${locale}-tag`], // Cache tag for invalidation
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (err) {
    console.error('Failed to fetch top flights:', err);
    return [];
  }
};
