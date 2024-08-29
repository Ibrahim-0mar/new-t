'use server';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const cacheTime = 604800; // for 1 week in seconds

export const getCity = async (cityCode: string, locale: string): Promise<any | null> => {
  try {
    const response = await fetch(`${baseURL}/cities/${cityCode.toUpperCase()}`, {
      headers: {
        'Accept-Language': locale,
        'Cache-Control': `public, max-age=${cacheTime}`, // Cache on the client-side (browser/CDN)
      },
      next: {
        revalidate: cacheTime,
        tags: [`cities-${cityCode}`],
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

export const getCities = async <T>(
  page: number = 1,
  limit: number = 100,
  locale: string,
): Promise<T[] | null> => {
  try {
    const response = await fetch(`${baseURL}/cities?page=${page}&limit=${limit}`, {
      headers: {
        'Accept-Language': locale,
        'Cache-Control': `public, max-age=${cacheTime}`, // Cache on the client-side (browser/CDN)
      },
      next: {
        revalidate: cacheTime,
        tags: [`cities-${page}`],
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
