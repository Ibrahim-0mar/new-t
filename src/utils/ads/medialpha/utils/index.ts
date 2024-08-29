import { locale } from '@/navigation';
import api from '@/services/apis/api';
import { parse } from '@/utils/helper/json';
import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  getSessionId,
  getUtmCampaign,
  getUtmContent,
  getUtmMedium,
  getUtmSource,
  getUtmTerm,
} from '../../actions';
import { UserAgentDetails } from '../soloAdvertiser';

/**
 * Removes the airport code from a location name if it is longer than 3 characters.
 */
const remove_airport_code = (name: string[]): string[] => {
  return [name[0].length === 3 ? name[0] : name[0].slice(0, 3)];
};

const basePath = window.location.origin; // Get the origin of the current page
const userAgent = navigator.userAgent; // Get the user's browser user agent string

/**
 * Fetches Mediaalpha inline ads based on the provided parameters.
 *
 * @param {string} pathname - The current pathname of the page.
 * @param {ReadonlyURLSearchParams} searchParams - The URL search parameters.
 * @param {Object} params - The additional parameters needed for fetching ads.
 * @param {locale} params.locale - The current locale.
 * @param {string[]} params.legs - The flight leg details in the format `[departureOrigin, departureDate, returnOrigin, returnDate]`.
 *
 * @returns {Promise<any[]>} - A promise that resolves to an array of ads.
 */

export const fetchMediaalphaInlineAds = async (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  params: { locale: locale; legs: string[] },
) => {
  const visitorId = parse(localStorage.getItem('visitorId') as string); // Retrieve and parse the visitor ID from localStorage
  const userEmail = parse(localStorage.getItem('HUE') as string); // Retrieve and parse the user email from localStorage
  const localStorateData: UserAgentDetails = parse(
    localStorage.getItem('userAgentDetails') as string,
  ); // Retrieve and parse user agent details from localStorage

  // Extracting departure and return flight details from params
  const departureOrigins = params.legs[0].split('-')[0].split('_');
  const departureDestinations = params.legs[0].split('-')[1].split('_');
  const departureDate = params.legs[1];

  const returnOrigins = params.legs[2]?.split('-')[0]?.split('_');
  const returnDestinations = params.legs[2]?.split('-')[1]?.split('_');
  const returnDate = params.legs[3];

  // Extracting passenger details and cabin class from searchParams
  const infants = searchParams.get('infants') ?? 0;
  const children = searchParams.get('children') ?? 0;
  const adults = searchParams.get('adults') ?? 1;
  const cabin = searchParams.get('cabin') ?? 'Economy';

  // Fetch various session and UTM parameters asynchronously
  const [sessionID, utmSource, utmCampaign, utmTerm, utmContent, utmMedium] = await Promise.all([
    getSessionId(),
    getUtmSource(),
    getUtmCampaign(),
    getUtmTerm(),
    getUtmContent(),
    getUtmMedium(),
  ]);

  const flights = [
    {
      date: departureDate,
      origin: remove_airport_code(departureOrigins),
      destination: remove_airport_code(departureDestinations),
    },
  ];

  if (returnOrigins && returnDestinations && returnDate) {
    flights.push({
      date: returnDate,
      origin: remove_airport_code(returnOrigins),
      destination: remove_airport_code(returnDestinations),
    });
  }

  // Sending a request to fetch Mediaalpha ads
  try {
    const { data } = await api.post('/mediaalpha-ads', {
      url: `${basePath}${pathname}`,
      flights,
      adults,
      children,
      infants,
      cabin,
      ua: userAgent,
      sub_1: `id=${userEmail || visitorId}&BW=${localStorateData.browser.name}&OS=${localStorateData.os.name}&DV=${localStorateData.device.type}`,
      sub_2: `O=${departureOrigins}&D=${departureDestinations}&TT=${returnDate ? 'round' : 'oneway'}&DP=${departureDate}&RE=${returnDate}&AD=${adults}&CD=${children}&IF=${infants}&TC=${cabin}`,
      sub_3: `SC=${utmSource}&CA=${utmCampaign}&TM=${utmTerm}&CN=${utmContent}&MM=${utmMedium}&SI=${parse(sessionID as string)}`,
    });
    return data.ads;
  } catch (err) {
    return [];
  }
};
