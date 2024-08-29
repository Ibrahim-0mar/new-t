'use server';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface TrendingDestion {
  code: string;
  currency: string;
  limit: number;
  locale: string;
}

/**
 * Fetches trending destination data from the API with caching.
 *
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.code - The destination code.
 * @param {string} params.currency - The currency code.
 * @param {string} params.locale - The locale code.
 * @param {number} params.limit - The number of items to fetch.
 * @returns {Promise<any[]>} - A promise that resolves to the fetched data, or an empty array if the request fails.
 */

export const fetchTredingDestionRequest = async ({
  code,
  currency,
  limit,
  locale,
}: TrendingDestion): Promise<any[]> => {
  try {
    const response = await fetch(
      `${baseURL}/v2/trending?code=${code}&currency=${currency}&limit=${limit}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        next: {
          revalidate: 604800, // Cache revalidation time in seconds (1 week)
          tags: [`trending-${code}-${locale}-tag`], // Cache tag for invalidation
        },
      },
    );

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      return [];
    }

    return data;
  } catch (err) {
    return [];
  }
};
