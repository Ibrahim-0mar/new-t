import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, userAgent } from 'next/server';
import { defaultLocale, locale, localePrefix, locales } from './navigation';

import type { NextRequest } from 'next/server';
import { getNearbyAirport } from './services/apis/common/airports';

/**
 * A middleware created using the next-intl library to handle routing based on locales
 */
const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

/**
 * A Next.js function that runs on every request (or on matched requests from the matcher array)
 * @param request The request that is coming from the client side
 * @returns {NextResponse} The response that will be passed to the client side
 */
export default async function middleware(request: NextRequest): Promise<NextResponse> {
  // Get the pathname (e.g., '/en')
  const pathname = request.nextUrl.pathname;
  const ip = request.headers.get('x-real-ip');
  const otherIp = request.headers.get('x-forwarded-for');
  const geo = request.geo;

  console.log(`request ip is:`, {
    ip,
    otherIp,
    geo,
  });

  // Split the pathname and extract the locale (assuming it's the first segment)
  const segments = pathname.split('/');
  const locale = (segments[1] ?? defaultLocale) as locale; // This will give you 'en'
  const airports = await getNearbyAirport(locale);

  // Check if the request is for the service worker
  if (request.nextUrl.pathname === '/service-worker.js') {
    // Handle or bypass middleware logic for service worker
    return NextResponse.next();
  }

  // Pass the request to next-intl to handle redirects and rewrites
  const response = handleI18nRouting(request);

  // Parse user agent and determine the viewport
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  // Set the custom header based on the viewport on every request
  response.headers.set('x-viewport', viewport);
  response.cookies.set('nearbyAirport', JSON.stringify(airports));
  console.log(`Nearby airports from middlreware:`, airports);

  // Handle 307 redirects specifically
  if (response.status === 307) {
    const redirectUrl = response.headers.get('location');
    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl, 308); // Use 308 for permanent redirect
    }
  }

  return response;
}

export const config = {
  // ***** new matcher *****
  matcher: ['/', '/((?!api|static|.*\\..*|_next|sitemap|sitemaps).*)'],
};
