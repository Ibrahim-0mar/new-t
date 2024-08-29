/**
 * Redirects configuration for Next.js.
 *
 * Each redirect object in this array defines a redirection rule:
 *
 * - `source`: The source path pattern to match the incoming request. It can include dynamic segments and wildcards.
 * - `destination`: The target path where the request should be redirected. It can also include dynamic segments.
 * - `permanent`: A boolean indicating whether the redirect is permanent (HTTP 301) or temporary (HTTP 302). Permanent redirects are cached by browsers and search engines.
 * - `locale`: A boolean indicating whether to preserve the locale in the redirect. If `true`, the locale is kept; if `false`, the locale is not preserved.
 *
 * @type {import('next').NextConfig['redirects']}
 */

//Note: Whenever changes are made to this file, you need to restart the project for the Next.js configuration to recognize the updates.
const redirects = async () => [
  {
    source: '/:locale/cheapest-flights/:path*(.*\\..*)', // Match paths containing a dot (.) in the last segment
    destination: '/:locale/last-minute-flights', // Redirect to the last-minute-flights page
    permanent: true, // Indicate that the redirect is permanent (HTTP 301)
    locale: false, // Preserve the original locale in the redirect
  },
  {
    source: '/:locale/privacy', // Match the /privacy page
    destination: '/:locale/privacy-policy', // Redirect to the /privacy-policy page
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/flights/to/:path*', // Match paths starting with /flights/to/
    destination: '/:locale/last-minute-flights', // Redirect to last-minute-flights
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/flights/from/:path*', // Match paths starting with /flights/from/
    destination: '/:locale/last-minute-flights', // Redirect to last-minute-flights
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/flights', // Match the /flights page
    destination: '/:locale/last-minute-flights', // Redirect to last-minute-flights
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/hotels', // Match the /hotels page
    destination: '/:locale/last-minute-hotels', // Redirect to last-minute-hotels
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/car-rental', // Match the /car-rental page
    destination: '/:locale/luxury-car-rental', // Redirect to luxury-car-rental
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/airports', // Match the /airports page
    destination: '/:locale/airport-transfers', // Redirect to airport-transfers
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/download-app', // Match the /download-app page
    destination: '/:locale/best-app-for-booking-flights-hotels', // Redirect to best-app-for-booking-flights-hotels
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/flights/routes/:path*', // Match paths starting with /flights/routes/
    destination: '/:locale/last-minute-flights', // Redirect to last-minute-flights
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/airport-transfers/routes/:path*', // Match paths starting with /airport-transfers/routes/
    destination: '/:locale/airport-transfers', // Redirect to airport-transfers
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/cities/:page(-\\d+|0|[^\\d]+)', // Match negative numbers, zero, and non-numeric strings in the /cities page
    destination: '/:locale/cities/1', // Redirect to the first page of cities
    permanent: true,
    locale: false,
  },
  {
    source: '/:locale/countries/:page(-\\d+|0|[^\\d]+)', // Match negative numbers, zero, and non-numeric strings in the /countries page
    destination: '/:locale/countries/1', // Redirect to the first page of countries
    permanent: true,
    locale: false,
  },
];

module.exports = redirects;
