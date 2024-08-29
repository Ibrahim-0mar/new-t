import cities from '@/services/data/sitemaps/travolic-development.cities.json';
import getOriginUrl from '@/utils/helper/getOriginUrl';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { changeFrequency } from '@/utils/types/sitemap';
import { MetadataRoute } from 'next';

const MAX_URLS_PER_SITEMAP = 30000;

/**
 * Generates an array of sitemap objects for cities.
 * Each sitemap object contains an 'id' that represents its index.
 * This helps in managing large datasets by splitting them into multiple sitemaps.
 *
 * @returns {Promise<Array<{ id: number }>>} An array of sitemap objects, each with a numeric id.
 */

export async function generateSitemaps() {
  const numberOfSitemaps = Math.ceil(cities.length / MAX_URLS_PER_SITEMAP);

  return [...Array(numberOfSitemaps)].map((_, index) => ({
    id: index + 1,
  }));
}

/**
 * Generates a sitemap for a subset of cities based on the sitemap id.
 * The function calculates the range of cities to include in the sitemap,
 * and then creates URLs for each city. The URL includes the city name,
 * formatted for SEO friendliness.
 *
 * @param {object} params - Parameters object.
 * @param {number} params.id - The id of the sitemap to generate.
 * @returns {Promise<MetadataRoute.Sitemap>} A promise that resolves to an array of URL configurations for the sitemap.
 *
 * @example
 * // In a development environment, preview the English sitemap at:
 * // http://localhost:3000/sitemaps/to/city/hi/sitemap.xml/1
 * // if the total number of cities more than 30000, then the sitemap will be split into multiple sitemaps
 * // replace "1" with the sitemap id to preview the other sitemaps
 *
 *
 * @example
 * // In a production environment, the English sitemap is available at:
 * // http://localhost:3000/sitemaps/to/city/hi/sitemap/1.xml
 * // https://travolic.com/sitemaps/to/city/hi/sitemap/1.xml
 * // if the total number of cities more than 30000, then the sitemap will be split into multiple sitemaps
 * // replace "1" with the sitemap id to preview the other sitemaps
 * @note The sitemap id is 1-based, not 0-based.
 */

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const fullUrl = await getOriginUrl()
  const start = (id - 1) * MAX_URLS_PER_SITEMAP;
  const end = Math.min(start + MAX_URLS_PER_SITEMAP, cities.length);
  const urls = [];

  for (let i = start; i < end; i++) {
    const city = cities[i];

    urls.push({
      url: `${fullUrl}/hi/cheapest-flights/to/city/${city.code}/${formatString(city.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: 0.8,
    });
  }

  return urls;
}

