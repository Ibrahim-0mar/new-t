'use server';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const cacheTime = 604800; // for 1 week in seconds

export const getCountries = async (
  page: number = 1,
  limit: number = 100,
  locale: string,
): Promise<any | null> => {
  try {
    const response = await fetch(`${baseURL}/countries?page=${page}&limit=${limit}`, {
      headers: {
        'Accept-Language': locale,
        'Cache-Control': 'public, max-age=21600', // Cache for 6 hours on the client-side (browser/CDN)
      },
      next: {
        revalidate: cacheTime,
        tags: [`countries-${page}`],
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};

export const getCountry = async (countryCode: string, locale: string): Promise<any | null> => {
  try {
    const response = await fetch(`${baseURL}/country/${countryCode}`, {
      headers: {
        'Accept-Language': locale,
        'Cache-Control': 'public, max-age=21600', // Cache for 6 hours on the client-side (browser/CDN)
      },
      next: {
        revalidate: cacheTime,
        tags: [`country-${countryCode}`],
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};
