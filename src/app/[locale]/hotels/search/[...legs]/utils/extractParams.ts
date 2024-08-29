/**
 * Extracts and converts parameters for the hotel search page.
 *
 * Handles cases where searchParams might be undefined or missing properties.
 *
 * @param {Object} params - The params object containing locale and legs array.
 * @param {Object} params.legs - An array of strings containing the hotel name, destination code, check-in, and check-out dates.
 * @param {Object} [searchParams] - The searchParams object containing room, adult, and children counts as strings or arrays.
 * @param {string | string[]} [searchParams.rooms] - The number of rooms as a string or array of strings.
 * @param {string | string[]} [searchParams.adults] - The number of adults as a string or array of strings.
 * @param {string | string[]} [searchParams.children] - The number of children as a string or array of strings.

 * @example
 * const params = {
 *   legs: ['hotel-name', '63', '2024-07-30', '2024-08-05'],
 * };
 * const searchParams = {
 *   rooms: '2',
 *   adults: '2',
 *   children: '1',
 * };
 *
 * const result = extractHotelParams(params, searchParams);
 * console.log(result);
 * // Output:
 * // {
 * //   hotelName: 'hotel-name',
 * //   destinationCode: '63',
 * //   checkIn: '2024-07-30',
 * //   checkOut: '2024-08-05',
 * //   rooms: 2,
 * //   adults: 2,
 * //   children: 1,
 * // }
 */

export const extractHotelParams = (
  params: { legs: string[] },
  searchParams?: { [key: string]: string | string[] | undefined },
) => {
  const [hotelName, destinationCode, checkIn, checkOut] = params.legs; // Destructure legs array

  // Extract and convert searchParams properties
  const rooms = searchParams?.rooms ? Number(searchParams.rooms) : 1;
  const adults = searchParams?.adults ? Number(searchParams.adults) : 1;
  const children = searchParams?.children ? Number(searchParams.children) : 0;

  return {
    hotelName: decodeURIComponent(hotelName), // Decode URL-encoded hotel name
    destinationCode,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
  };
};
