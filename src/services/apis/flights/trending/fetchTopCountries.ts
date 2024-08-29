'use server';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface TopCountriesParams {
  code: string;
  currency: string;
  limit: number;
  locale: string;
}

/**
 * Fetches top countries data from the API with caching.
 *
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.code - The country code.
 * @param {string} params.currency - The currency code.
 * @param {number} params.limit - The number of items to fetch.
 * @param {string} params.locale - The locale to set the `Accept-Language` header.
 * @returns {Promise<any[]>} - A promise that resolves to the fetched data, or an empty array if the request fails.
 */

export const fetchTopCountriesRequest = async ({
  code,
  currency,
  limit,
  locale,
}: TopCountriesParams): Promise<any[]> => {
  try {
    const response = await fetch(
      `${baseURL}/trending/countries?code=${code}&currency=${currency}&limit=${limit}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        next: {
          revalidate: 604800, // Cache revalidation time in seconds (1 week)
          tags: [`top-countries-${code}-${locale}-tag`], // Cache tag for invalidation
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (err) {
    console.error('Failed to fetch top countries:', err);
    return [];
  }
};
