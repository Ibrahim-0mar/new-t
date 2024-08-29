import getOriginUrl from '@/utils/helper/getOriginUrl';
import { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const fullUrl = await getOriginUrl()

  return {
    rules: {
      userAgent: '*',
      allow: ['/api/og/*', '/api/dynamic-og*'],
      disallow: [
        '/api/*',
        '/oauth',
        '/*/sign-in/',
        '/*/sign-in/*',
        '/*/profile/',
        '/*/profile/*',
        '/*/flights/search/*',
        '/*/airport-transfers/search/*',
        '/*/hotels/search/*',
      ],
    },
    sitemap: `${fullUrl}/sitemap.xml`,
  };
}
