import countries from '@/services/data/sitemaps/travolic-development.countries.json';
import getOriginUrl from '@/utils/helper/getOriginUrl';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { changeFrequency } from '@/utils/types/sitemap';
import { MetadataRoute } from 'next';

/**
 * Generates a sitemap for a specific language version of the site.
 * Based on the provided 'id', this function constructs a sitemap with URLs tailored to the specified language.
 * Each URL in the sitemap corresponds to a country, with the country's name and code formatted for the given language.
 *
 * @param {object} params - Parameters object.
 * @param {number} params.id - Numeric identifier for the sitemap, correlating to a language code in the 'languagesMap' array.
 * @returns {Promise<MetadataRoute.Sitemap>} A promise resolving to a sitemap structure for the specified language.
 *
 * @example
 * // In a development environment, preview the English sitemap at:
 * // http://localhost:3000/sitemaps/to/country/fr/sitemap.xml
 *
 * @example
 * // In a production environment, the English sitemap is available at:
 * // http://localhost:3000/sitemaps/to/country/fr/sitemap.xml
 * // https://travolic.com/sitemaps/to/country/fr/sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullUrl = await getOriginUrl()
  return countries.map((country) => {


    return {
      url: `${fullUrl}/fr/cheapest-flights/to/country/${country.code.toLowerCase()}/${formatString(country.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: 1,
    };
  });
}
