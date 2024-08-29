'use server';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface TopNearbyParams {
  currency: string;
  limit: number;
  locale: string;
}

/**
 * Fetches top nearby destinations from the API with caching.
 *
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.currency - The currency code.
 * @param {number} params.limit - The number of items to fetch.
 * @param {number} params.locale - The locale to set the `Accept-Language` header.
 * @returns {Promise<any[]>} - A promise that resolves to the fetched data, or an empty array if the request fails.
 */

export const fetchTopNearbyRequest = async ({
  currency,
  limit,
  locale,
}: TopNearbyParams): Promise<any[]> => {
  try {
    const response = await fetch(`${baseURL}/trending/nearBy?currency=${currency}&limit=${limit}`, {
      headers: {
        'Accept-Language': locale,
      },
      next: {
        revalidate: 604800,
        tags: [`top-nearby-${currency}-${locale}-tag`],
      },
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (err) {
    return [];
  }
};
