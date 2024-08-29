import { locales } from '@/navigation';
import cities from '@/services/data/sitemaps/travolic-development.cities.json';
import getOriginUrl from '@/utils/helper/getOriginUrl';
import { MetadataRoute } from 'next';

type changeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullUrl = await getOriginUrl()

  const mainRoutes = [
    'last-minute-flights',
    'airport-transfers',
    // 'last-minute-hotels-deals',
    'luxury-car-rental',
    'evisa',
    'about-us',
    'blogs',
    'career',
    'contact-us',
    'faq',
    'how-travolic-works',
    'privacy-policy',
    'terms-and-conditions',
    "best-app-for-booking-flights-hotels"
  ];

  const MAX_URLS_PER_SITEMAP = 30000;
  const numberOfSitemaps = Math.ceil(cities.length / MAX_URLS_PER_SITEMAP);

  return [
    ...locales.map((lang) => ({
      url: `${fullUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: lang === 'en' ? 1 : 0.5,
    })),
    ...mainRoutes.flatMap((route) =>
      locales.map((lang) => ({
        url: `${fullUrl}/${lang}/${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as changeFrequency,
        priority: lang === 'en' ? 1 : 0.5,
      })),
    ),
    // from airport sitemap
    ...locales.map((lang) => ({
      url: `${fullUrl}/sitemaps/from/airport/${lang}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: lang === 'en' ? 1 : 0.5,
    })),
    // to airport sitemap
    ...locales.map((lang) => ({
      url: `${fullUrl}/sitemaps/to/airport/${lang}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: lang === 'en' ? 1 : 0.5,
    })),
    // from country sitemap
    ...locales.map((lang) => ({
      url: `${fullUrl}/sitemaps/from/country/${lang}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: lang === 'en' ? 1 : 0.5,
    })),
    // to country sitemap
    ...locales.map((lang) => ({
      url: `${fullUrl}/sitemaps/to/country/${lang}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as changeFrequency,
      priority: lang === 'en' ? 1 : 0.5,
    })),
    // from city sitemap
    ...Array.from({ length: numberOfSitemaps }, (_, index) => index + 1).flatMap((sitemapNumber) =>
      locales.map((lang) => ({
        url: `${fullUrl}/sitemaps/from/city/${lang}/sitemap/${sitemapNumber}.xml`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as changeFrequency,
        priority: lang === 'en' ? 1 : 0.5,
      })),
    ),
    // airport-transfer sitemaps
    ...Array.from({ length: numberOfSitemaps }, (_, index) => index + 1).flatMap((sitemapNumber) =>
      locales.map((lang) => ({
        url: `${fullUrl}/sitemaps/airport-transfer/from-airport/${lang}/sitemap/${sitemapNumber}.xml`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as changeFrequency,
        priority: lang === 'en' ? 1 : 0.5,
      })),
    ),
  ];
}
